/*
 * @Author: mozhengqian
 * @Date: 2017-11-07 09:52:05
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2017-11-28 13:43:33
 */
import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  OnChanges
} from "@angular/core";
import { TestQuestionService } from "app/exam/service/test-question.service";
import { Router, ActivatedRoute } from "@angular/router";
import { NzModalService, NzMessageService } from "ng-zorro-antd";
import { Observable } from "rxjs/Observable";

import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl
} from "@angular/forms";
import * as moment from "moment";

@Component({
  selector: "spk-test-choice-questions-add",
  templateUrl: "./test-choice-questions-add.component.html",
  styleUrls: ["./test-choice-questions-add.component.scss"]
})
export class TestChoiceQuestionsAddComponent implements OnInit {
  @Input() validateUPForm: FormGroup; // 获取test-add中表单，获取数据一起提交
  @Input() baseCodeType: any;
  @Input() formupbtn: any; // 获取test-add 提交按钮，主要是模拟提交test-add中的表单，触发校验表单
  @Output() returnFun: any = new EventEmitter<string>(); // 获取test-add 中的returnFun方法，作为添加成功后的返回
  validateForm: FormGroup;
  saveLoading: boolean = false; // 保存loading
  baseCode: string = "";
  knowledgeId: string = "";
  userGroupId: string = "";
  typeName: string = "";

  // add-byldd
  selectTextType: boolean = false; // 是否使用富文本
  selectTextAnalysisType: boolean = true; // 是否使用富文本

  bigTextStuts: any[] = [];
  difficult: any;
  questionType: any;
  checkBoxList: any[] = [];
  answerList: any = [
    // 选项集合
    {},
    {},
    {},
    {}
  ];
  checkboxbool: boolean = false;
  question: any = {
    clobCasual: "", // 类型：String  必有字段  备注：富文本题干
    isAvail: true, // 类型：Boolean  必有字段  备注：是否发布 默认发布true
    isBigText: false, // 类型：Boolean  必有字段  备注：题干是否为大文本；true：大文本；false：不是大文本
    isDeleted: false, // 类型：Boolean  必有字段  备注：是否删除 默认false
    queAnalysis: "", // 类型：String    备注：富文本解析
  };

  constructor(
    private testQuestionService: TestQuestionService,
    public activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private nzModalService: NzModalService,
    private nzMessageService: NzMessageService,
    private router: Router
  ) {}

  ngOnInit() {
    this.baseCode =
      this.baseCodeType || this.activatedRoute.snapshot.params["baseCode"];
    this.typeName = this.activatedRoute.snapshot.params["typeName"];
    this.knowledgeId = this.activatedRoute.snapshot.params["knowledgeId"];
    this.userGroupId = this.activatedRoute.snapshot.params["userGroupId"];
    this.setFormInit();
  }
  // tslint:disable-next-line:use-life-cycle-interface
  ngOnChanges() {
    this.baseCode =
      this.baseCodeType || this.activatedRoute.snapshot.params["baseCode"];
  }
  setDefalutForm() {
    if (this.validateForm && this.validateForm.controls) {
      let params = {};
      let i = this.answerList.length;
      while (this.validateForm.controls[`answer${i}`]) {
        this.validateForm.removeControl(`answer${i}`);
        this.bigTextStuts[i] = false;
        i++;
      }
      // .patchValue(params);
    }
  }
  checkMaxLength = (index, control: FormControl): any => {
    let isBigText = this.selectTextType;
    if (index !== null) {
      isBigText = this.bigTextStuts[index];
    }
    return Observable.create(function(observer) {
      let reg = /<[^<>]+>/g;
      let value = control.value || "";
      if (isBigText) {
        // 是富文本
        value = control.value.replace(reg, "");
      }
      if (value.trim() == "") {
        if (
          isBigText &&
          (control.value.indexOf("img") > -1 ||
            control.value.indexOf("video") > -1)
        ) {
          observer.next(null);
        } else {
          observer.next({ required: true });
        }
      } else if (value.length > 300) {
        observer.next({ error: true });
      } else {
        observer.next(null);
      }
      observer.complete();
    });
  };
  setFormInit(flag?) {
    let params = {};
    if (this.baseCode == "DANX") {
      // 单选题选中选项初始化
      params[`radio_index`] = [
        this.validateForm && this.validateForm.controls["radio_index"].value,
        [Validators.required]
      ];
    }
    this.answerList.forEach((answer, index) => {
      if (this.validateForm && this.validateForm.controls[`answer${index}`]) {
        // this.validateForm.get(`answer${index}`).setValue(answer.validate[0]);
        this.validateForm.controls[`answer${index}`].setValue(
          answer.validate[0]
        );
      } else {
        // tslint:disable-next-line:max-line-length
        params[`answer${index}`] = this.answerList[index].validate || [
          null,
          [Validators.required],
          this.checkMaxLength.bind(null, index)
        ]; // 选项数据初始化
      }
    });
    this.setDefalutForm();
    if (this.baseCode == "DANX") {
      let indexvalue =
        this.validateForm && this.validateForm.controls["radio_index"].value;
      let radio_index = null;
      if (indexvalue || indexvalue === 0) {
        radio_index = indexvalue;
      }
      params[`radio_index`] = [radio_index, [Validators.required]];
    }
    if (flag) {
      params = {
        ...this.validateForm.controls,
        ...params
      };
    } else {
      params = {
        // tslint:disable-next-line:max-line-length
        casual: [
          this.validateForm && this.validateForm.controls["casual"].value,
          [Validators.required],
          this.checkMaxLength.bind(null, null)
        ],
        isBigText: [
          (this.validateForm &&
            this.validateForm.controls["isBigText"].value) ||
            false,
          [Validators.required]
        ],
        isBigTextAnalysis: [this.selectTextAnalysisType,
          [Validators.required]],
        queAnalysis: [
          this.validateForm && this.validateForm.controls["queAnalysis"].value,
          [Validators.maxLength(300)],
          // this.checkMaxLength.bind(null, null)
        ],
        ...params
      };
    }
    this.validateForm = this.fb.group(params);
  }
  _submitForm = ($event, value) => {
    this.saveLoading = true;
    $event.preventDefault();
    this.formupbtn.click(); // 校验test-add表单
    // tslint:disable-next-line:forin
    for (const key in this.validateForm.controls) {
      this.validateForm.controls[key].markAsDirty();
    }
    /**
     * this.validateUPForm.valid test-add 表单校验，true：通过
     * this.validateForm.valid  当前页面表单校验，true：通过
     * !this.validatorCheckBox(value) 手动校验多选是否通过
     */
    if (
      this.validateUPForm.valid &&
      this.validateForm.valid &&
      !this.validatorCheckBox(value)
    ) {
      let upForm = this.validateUPForm.value;
      let answerList = [];
      this.answerList.forEach((answer, index) => {
        let bool = false;
        if (this.baseCode == "DANX") {
          bool = value.radio_index == index;
        } else if (this.baseCode == "DUOX") {
          bool = this.checkBoxList[index];
        }
        answerList[index] = {
          answer: index,
          answerText: value[`answer${index}`],
          isBigText: !!this.bigTextStuts[index],
          isCorrect: bool ? "Y" : "N"
        };
      });
      let params = {
        answerList: [...answerList],
        knowledgeId: this.knowledgeId,
        question: {
          baseCode: this.baseCode,
          casual: this.selectTextType ? "" : value.casual,
          ...this.question,
          isBigText: this.selectTextType,
          clobCasual: this.selectTextType ? value.casual : "",
          queAnalysis: value.queAnalysis ,
          ...upForm,
          endTime: upForm.endTime && moment(upForm.endTime),
          startTime: upForm.startTime && moment(upForm.startTime)
        }
      };
      this.testQuestionService.addQuestion(params).subscribe(
        data => {
          this.saveLoading = false;
          this.returnFun.emit();
        },
        error => {
          this.saveLoading = false;
          this.nzMessageService.error(error);
        }
      );
    } else {
      console.log(this.validateForm, this.validateForm.valid);
      this.nzMessageService.error("表单还有未通过的项!");
      this.saveLoading = false;
    }
  };
  validatorCheckBox(value) {
    // 校验多选数据
    if (this.baseCode == "DUOX") {
      // 多选
      let checkboxboolLength = 0;
      this.checkBoxList.forEach(item => {
        // tslint:disable-next-line:no-unused-expression
        item && checkboxboolLength++;
      });
      if (checkboxboolLength < 2) {
        this.checkboxbool = true;
        return true;
      } else {
        this.checkboxbool = false;
      }
    }
    return false; // 单选
  }
  resetCheckboxBool = () => {
    // 重置多选选中项
    this.checkboxbool = false;
  };
  setOptionInit(id?) {
    // 重新配置answerList 已经填写的数据填充进去
    if (this.validateForm) {
      // tslint:disable-next-line:forin
      let oldData = [];
      this.answerList.forEach((answer, index) => {
        oldData.push({
          validate: [
            this.validateForm.get(`answer${index}`).value,
            [Validators.required],
            this.checkMaxLength.bind(null, index)
          ]
        });
      });
      if (id || id === 0) {
        this.bigTextStuts.splice(id, 1);
        oldData.splice(id, 1);
        if (this.baseCode == "DUOX") {
          this.checkBoxList.splice(id, 1);
        }
      }
      this.answerList = oldData;
    }
  }
  radioChange($event) {
    // tslint:disable-next-line:no-unused-expression
    this.validateForm &&
      this.validateForm.get("radio_index") &&
      this.validateForm.get("radio_index").setValue($event);
  }
  checkChange($event, i) {
    this.checkBoxList[i] = $event.target.checked;
  }
  // 题干切换富文本
  changeCausBigText() {
    // tslint:disable-next-line:no-unused-expression
    this.validateForm &&
      this.validateForm.get("casual") &&
      this.validateForm.get("casual").setValue("");
  }
  // 解析切换富文本
  changeCausBigTextAnalysis() {
    // tslint:disable-next-line:no-unused-expression
    this.validateForm &&
      this.validateForm.get("analysis") &&
      this.validateForm.get("analysis").setValue("");
  }
  // 选项切换选项富文本模式
  changeBigText(key) {
    this.bigTextStuts[key] = !this.bigTextStuts[key];
    // tslint:disable-next-line:no-unused-expression
    this.validateForm &&
      this.validateForm.get(`answer${key}`) &&
      this.validateForm.get(`answer${key}`).setValue("");
  }
  adOption() {
    if (this.answerList.length >= 26) {
      this.nzMessageService.error("选项不能超过26个!");
      return;
    }
    this.setOptionInit();
    this.answerList.push({
      validate: [
        "",
        [Validators.required],
        this.checkMaxLength.bind(null, this.answerList.length)
      ]
    });
    this.setFormInit(true);
  }

  deleteOption(id) {
    if (this.baseCode == "DANX") {
      let index =
        this.validateForm.controls.radio_index &&
        this.validateForm.controls.radio_index.value;
      if (id < index) {
        index--;
      } else if (id == index) {
        index = null;
      }
      // tslint:disable-next-line:no-unused-expression
      this.validateForm.get("radio_index") &&
        this.validateForm.get("radio_index").setValue(index);
    }
    this.setOptionInit(id);
    setTimeout(() => {
      this.setFormInit(true);
    }, 0);
  }
}
