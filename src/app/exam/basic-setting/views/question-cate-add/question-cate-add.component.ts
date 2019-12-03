import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  OnChanges
} from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators
} from "@angular/forms";
import { Observable } from "rxjs/Observable";
import { BasicSettingService } from "app/exam/service/basic-setting.service";
import { NzMessageService } from "ng-zorro-antd";

@Component({
  selector: "spk-question-cate-add",
  templateUrl: "./question-cate-add.component.html",
  styleUrls: ["./question-cate-add.component.scss"]
})
export class QuestionCateAddComponent implements OnInit {
  @Output() handleaddSite: any = new EventEmitter<string>();
  @Input() managerGroup: any = {};
  @Input() editObj: any;
  @Input() selectSiteObj: any;
  btnLoading: boolean = false;
  validateForm: FormGroup;
  inputNum: any = 0; // 已经输入字符数量
  constructor(
    private fb: FormBuilder,
    private basicSettingService: BasicSettingService,
    private nzMessageService: NzMessageService
  ) {}
  ngOnInit() {
    this.inItForm();
  }
  inItForm() {
    this.validateForm = this.fb.group({
      // tslint:disable-next-line:max-line-length
      qkName: [
        (this.editObj && this.selectSiteObj && this.selectSiteObj.label) || "",
        [Validators.required, Validators.maxLength(30)],
        this.userNameAsyncValidator
      ],
      qkDesc: [
        (this.editObj && this.selectSiteObj && this.selectSiteObj.qkDesc) || "",
        [Validators.maxLength(200)]
      ]
    });
  }
  // tslint:disable-next-line:use-life-cycle-interface
  ngOnChanges() {
    if (this.editObj) {
      this.inItForm();
    }
    // this.inItForm();
  }
  // 迁移试题
  qianyi() {
    console.log("迁移");
  }
  userNameAsyncValidator = (control: FormControl): any => {
    return Observable.create(function(observer) {
      if (control.value.trim() == "") {
        observer.next({ error: true, required: true });
      } else {
        observer.next(null);
      }
      observer.complete();
    });
  };
  submitForm = ($event, value) => {
    $event.preventDefault();
    if ((!this.managerGroup || !this.managerGroup.id) && !this.editObj) {
      this.nzMessageService.error("请选择组织!");
      return;
    }
    this.btnLoading = true;
    // tslint:disable-next-line:forin
    for (const key in this.validateForm.controls) {
      this.validateForm.controls[key].markAsDirty();
    }
    if (this.validateForm.valid) {
      let params = {
        ...this.validateForm.value,
        qkName: this.validateForm.value["qkName"].trim()
      };
      let isEdit = !!this.editObj;
      if (this.editObj) {
        params = {
          ...params,
          parentId: this.selectSiteObj && this.selectSiteObj.parentId,
          knowledgeId: this.selectSiteObj && this.selectSiteObj.id
          // userGroupId: this.managerGroup.id
        };
      } else {
        params = {
          ...params,
          parentId: (this.selectSiteObj && this.selectSiteObj.id) || -1,
          userGroupId: this.managerGroup && this.managerGroup.id
        };
      }
      this.basicSettingService
        .changeQuestionKonwledge(params, isEdit)
        .subscribe(
          data => {
            this.nzMessageService.success("操作成功!");
            this.btnLoading = false;
            this.handleaddSite.emit();
          },
          err => {
            this.btnLoading = false;
            this.nzMessageService.error(err);
          }
        );
    }
  };
  getFormControl(name) {
    return this.validateForm.controls[name];
  }
  resetForm($event: MouseEvent) {
    $event.preventDefault();
    this.validateForm.reset();
    // tslint:disable-next-line:forin
    for (const key in this.validateForm.controls) {
      this.validateForm.controls[key].markAsPristine();
    }
  }
  qkDescChange = $event => {
    this.inputNum = $event.length;
  };
  reset() {
    this.handleaddSite.emit();
  }
}
