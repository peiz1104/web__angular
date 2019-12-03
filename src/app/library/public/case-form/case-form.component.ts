import { NzMessageService } from 'ng-zorro-antd';
import { Component, OnInit, Input, ViewChild, EventEmitter, Output, TemplateRef } from '@angular/core';
import { FormDataUtil } from '../../../core/utils/form-data-util';
import { NgForm, FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { DocumentInfo } from '../../entity/document-info';
import { CaseInfo } from 'app/library/entity/case-info';
import { Image } from '../../entity/image';
import { CuiLayer, CuiPagination } from 'console-ui-ng';
import { CaseInfoService } from '../../service/case.service';
import { element } from 'protractor';
import { Category } from '../../../system/category/entity/category';
import { UserGroup } from 'app/system/entity/user-group';

@Component({
  selector: 'spk-case-form',
  templateUrl: './case-form.component.html',
  styleUrls: ['./case-form.component.scss']
})
export class CaseFormComponent implements OnInit {

  codeIsExist: boolean = false;
  nameIsExist: boolean = false;

  @Input() caseInfo: CaseInfo;
  @Input() actionsViewRef: TemplateRef<any>;
  @Input() library: boolean;
  @Input() loading: boolean;
  @Input() userGroup: number;

  @Output() doSubmit: EventEmitter<any> = new EventEmitter();
  @Output() cancel: EventEmitter<any> = new EventEmitter();

  categoryType: boolean = false;
  userGroupType: boolean = false;

  _form: FormGroup;

  columns = [
    { title: "文件名称", data: 'originFileName' },
    { title: "删除操作", tpl: 'deleteFile' },
  ];
  attachements: DocumentInfo[];
  attachementsLoading: boolean;
  public get valid() {
    return !!this._form && this._form.valid;
  }

  public get invalid() {
    return !this._form || this._form.invalid;
  }

  get isCreate() {
    return this.caseInfo && !this.caseInfo.id;
  }

  constructor(private dialog: CuiLayer,
    private CaseInfoService: CaseInfoService,
    private fb: FormBuilder,
    private message: NzMessageService, ) {
  }

  ngOnInit() {
    this.attachements = this.caseInfo.attachements;
    this._initForm();
  }

  _initForm() {
    let m = this.caseInfo || new CaseInfo();
    this._form = this.fb.group({
      id: [m.id],
      caseCode: [m.caseCode, Validators.required],
      name: [m.name, [Validators.required, Validators.maxLength]],
      author: [m.author, Validators.maxLength],
      coverUrl: [m.coverUrl],
      endtime: [m.endtime],
      userObject: [m.userObject, Validators.maxLength],
      developmentUnit: [m.developmentUnit, Validators.maxLength],
      category: [m.category, Validators.required],
      userGroup: [m.userGroup || this.userGroup, Validators.required],
      source: [m.source || 'AUTONOMY', Validators.required],
      isClassic: [m.isClassic || 'N', Validators.required],
      theme: [m.theme || 'DESCRIBE', Validators.required],
      keyword: [m.keyword],
      introduction: [m.introduction, Validators.maxLength],
      content: [m.content, Validators.required],
      isPublished: [m.isPublished || 'N'],
      isLibrary: [m.isLibrary || false],
      caseFiles: [],
    });

    let keywords = m.keyword ? m.keyword.split(',') : [];
    this._form.addControl('_keywords', new FormControl(keywords));
  }

  getFormControl(name) {
    return this._form.controls[name];
  }

  markAsDirty() {
    for (let key of Object.keys(this._form.controls)) {
      this._form.controls[key].markAsDirty();
    }
  }

  onSubmit(event: Event) {
    this.markAsDirty();
    let isSubmit = this.validateForm();
    if (isSubmit) {
      this.doSubmit.emit({ originalEvent: event, value: this._form.value });
    }
  }

  validateForm() {
    this.categoryType = this.getFormControl('category').value ? (this.getFormControl('category').value.id ? false : true) : true;
    this.userGroupType = this.getFormControl('userGroup').value ? (this.getFormControl('userGroup').value.id ? false : true) : true;
    if (this.categoryType || this.userGroupType) {
      return false;
    }
    return true;
  }
  logSelectCategory(event) {
    this.categoryType = event ? false : true;
  }
  logSelectGroup(event) {
    this.userGroupType = event ? false : true;
  }

  doCancel(event) {
    this.cancel.emit({ originalEvent: event });
  }

  initImage(result) {
    if (result) {
      this.getFormControl("coverUrl").setValue(result["relativePath"]);
    }
  }

  hasAttachements() {
    if (this.caseInfo.id) {
      return false;
    } else {
      return true;
    }
  }

  getAttachements(caseId) {
    this.attachementsLoading = true;
    this.CaseInfoService.get(caseId).subscribe(
      formCaseInfo => {
        this.caseInfo = formCaseInfo;
        this.attachements = this.caseInfo.attachements;
        this.attachementsLoading = false;
      },
      err => {
        this.caseInfo.attachements = [];
        this.attachementsLoading = false;
      }
    );
  }

  initDocument(file) {
    let files = [];
    if (file) {
      file.forEach(element => {
        files.push(element);
      });
      this.getFormControl("caseFiles").setValue(files);
    }
  }

  downloadFile(relativePath) {
    location.href = window.location.origin + relativePath;
  }

  deleteFile(id) {
    this.CaseInfoService.deleteFile(id).subscribe(
      () => {
        this.dialog.msg('删除成功');
        this.getAttachements(this.caseInfo.id);
      },
      err => { this.dialog.confirm(err) }
    );
  }

  codeExist() {
    if (!this.getFormControl("caseCode").dirty) {
      return;
    } else {
      this.CaseInfoService.codeExist(this.getFormControl('caseCode').value).subscribe(
        ok => {
          this.codeIsExist = false;
        },
        err => {
          this.codeIsExist = true;
        }
      );
    }
  }

  nameExist() {
    if (!this.getFormControl("name").dirty) {
      return;
    } else {
      this.CaseInfoService.nameExist(this.getFormControl('name').value).subscribe(
        ok => {
          this.nameIsExist = false;
        },
        err => {
          this.nameIsExist = true;
        }
      );
    }
  }

  keyUp() {
    let reg = /[^\w_]/g;
    let valueInfo = this.getFormControl('caseCode').value;
    if (valueInfo) {
      this._form.get('caseCode').setValue(valueInfo.replace(reg, ""));
    }
  }

  keywordsChange(value) {
    if (!!value) {
      this.getFormControl('keyword').setValue(Array.isArray(value) ? value.join(',') : value);
    } else {
      this.getFormControl('keyword').setValue(undefined);
    }
  }
}
