import { Component, OnInit, Input, ViewChild, TemplateRef } from '@angular/core';
import { Rco } from '../../entity/rco';
import { FormGroup, FormBuilder, FormArray, Validators, AbstractControl, ValidatorFn } from '@angular/forms';
import { NzModalSubject, NzMessageService, NzModalService } from 'ng-zorro-antd';
import { RcoService } from '../../service/rco.service';
import { AfterViewInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { tipMessage } from 'app/account/entity/message-tip';

@Component({
  selector: 'spk-rco-upload',
  templateUrl: './rco-upload.component.html',
  styleUrls: ['./rco-upload.component.scss']
})
export class RcoUploadComponent implements OnInit {
  @Input() parent: Rco;

  @ViewChild("fileuploader") fileuploader;

  currentStep: number = 0;
  currentStepTpl: TemplateRef<any>;

  formArray: FormArray;
  fileForm: FormGroup;
  propertyForm: FormGroup;

  submiting;
  importError;

  maxFileSize = 1024 * 1024 * 1024 * 1024;
  fileValidating: boolean = false;
  fileValidError: any;

  imsmanifest: any[];
  fileEntries: any[];

  _STANDARDS = {
    'CMI': { value: 'CMI', label: 'SCORM 1.2 内容集合（具有IMS元数据 1.2 的IMS内容打包1.1）', extra: '从ZIP文件导入内容对象和结构，属性和物理内容文件（如果有的话）。' },
    'AUTO': { value: 'AUTO', label: '非标准内容集合', extra: '从ZIP文件导入物理内容文件，你需要在稍后手动指定内容对象属性。' },
    'VIDEO': {
      value: 'VIDEO', label: '视频文件',
      extra: '上传单个可播放视频文件，视频文件可支持格式转码和清晰度转码，支持如下视频格式：mp4, rmvb, rm, mkv, 3gp, avi, mov, mpg, wmv'
    },
    'DOC': { value: 'DOC', label: '文档文件', extra: '上传单个可查看的文档文件，文档文件可支持查看格式转码，支持如下文档格式：pdf, doc, docx, ppt, pptx, xls, xlsx' },
  };

  _FILEUPLOAD_ACCEPT = {
    'CMI': { accept: '.zip', extra: '请选择一个不大于 1GB 的标准课件 zip 包，且里边包含 `./imsmanifest.xml` 文件' },
    'AUTO': { accept: '.zip', extra: '请选择一个不大于 1GB 的课件 zip 包，且里边包含可查看的单入口网页文件' },
    'VIDEO': {
      accept: '.mp4, .rmvb, .rm, .mkv, .3gp, .avi, .mov, .mpg, .wmv',
      extra: '请选择一个视频格式的文件，支持格式：mp4, rmvb, rm, mkv, 3gp, avi, mov, mpg, wmv'
    },
    'DOC': {
      accept: '.pdf, .doc, .docx, .ppt, .pptx, .xls, .xlsx',
      extra: '请选择一个文档格式的文件，支持格式：pdf, doc, docx, ppt, pptx, xls, xlsx'
    },
  };

  get fileControlInfo() {
    if (this.fileForm) {
      return this._FILEUPLOAD_ACCEPT[this.fileForm.value['standard']];
    }
  }

  get isCmi() {
    if (this.fileForm) {
      return this.fileForm.value['standard'] == 'CMI';
    }
  }

  get isSimpleZip() {
    if (this.fileForm) {
      return this.fileForm.value['standard'] == 'AUTO';
    }
  }

  get isVideo() {
    if (this.fileForm) {
      return this.fileForm.value['standard'] == 'VIDEO';
    }
  }

  get isDoc() {
    if (this.fileForm) {
      return this.fileForm.value['standard'] == 'DOC';
    }
  }

  get fileupload() {
    if (this.fileForm) {
      return this.fileForm.value['fileUpload'];
    }
  }

  constructor(
    private subject: NzModalSubject,
    private fb: FormBuilder,
    private rcoApi: RcoService,
    private message: NzMessageService,
    private modal: NzModalService
  ) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.initFileForm();
  }

  initFileForm(value?) {
    this.fileForm = this.fb.group({
      standard: ['CMI', Validators.required],
      fileUpload: [null, Validators.required],
    });

    if (value) {
      this.fileForm.patchValue(value);
    }
  }

  initPropertyForm() {
    let fileFormValue = this.fileForm.value;
    let defaultTitle = fileFormValue['fileUpload']['originFileName'];
    let defaultTrackingType = fileFormValue['standard'];

    let titleValidator = this.isCmi ? null : Validators.required;
    let startingUrlValidator = this.isSimpleZip ? [Validators.required, this.smpleZipStartingUrlValidator()] : null;

    this.propertyForm = this.fb.group({
      title: [defaultTitle, Validators.required],
      startingUrl: [null, startingUrlValidator], // TODO: 校验链接是否可用，不可用时，警告，再点确定可以提交
      trackingType: [defaultTrackingType, Validators.required],
      description: [],
    });
  }

  onStandardChange(value) {
    let fileuplad = this.fileForm.value['fileUpload'];
    let accepts = this._FILEUPLOAD_ACCEPT[value].accept.split(/,|，/);
    let fileAllowd = fileuplad && accepts.some(it => it.toLowerCase() == '.' + fileuplad.extention.toLowerCase());
    if (fileAllowd) {
      this.modal.confirm({
        title: '你已上传了一个符合格式的文件，是否需要重新上传',
        okText: '是',
        cancelText: '否',
        zIndex: 1050,
        onOk: () => {
          this.fileuploader.clearQueue(true);
          this.validFileUpload();
        },
        onCancel: () => {
          this.validFileUpload(fileuplad);
        }
      });
    } else {
      this.fileuploader.clearQueue(true);
      this.validFileUpload();
    }
  }

  onUploadComplete(result) {
    this.validFileUpload(result);
  }

  validFileUpload(result?) {
    if (!result) {
      this.fileForm.controls['fileUpload'].setValue(null);
      this.imsmanifest = null;
      this.fileEntries = null;
      return;
    }

    let uploadFile = result;
    this.imsmanifest = null;
    this.fileEntries = null;
    this.fileValidating = true;
    this.fileValidError = null;
    this.fileForm.controls['fileUpload'].setValue(null);
    if (this.isCmi || this.isSimpleZip) {
      if (this.isCmi) {
        this.rcoApi.parseImsZip(uploadFile).subscribe(
          imsmanifest => {
            if (imsmanifest && imsmanifest.length > 0) {
              // this.fileForm.controls['fileUpload'].setValue(result);
              this.imsmanifest = imsmanifest;
            } else {
              this.fileValidError = '解析 imsmanifest.xml 错误，请确认课件ZIP包中根目录下存在文件名为 "imsmanifest.xml" 的文件，且格式正确。';
            }

            this.fileValidating = false;
          },
          err => {
            this.fileValidError = '解析 imsmanifest.xml 错误，请确认课件ZIP包中根目录下存在文件名为 "imsmanifest.xml" 的文件，且格式正确。';
            this.fileValidating = false;
          }
        );
      }

      this.rcoApi.parseSimpleZip(uploadFile).subscribe(
        fileEntries => {
          if (fileEntries && fileEntries.length > 0) {
            // TODO 校验是否有html文件，否则给警告
            this.fileForm.controls['fileUpload'].setValue(result);
            this.fileEntries = fileEntries;
          } else {
            this.fileValidError = '没有从文件中扫描到任何文件，请确认文件内容和格式是否正确';
          }
          this.fileValidating = false;
        },
        err => {
          this.fileValidError = '文件校验失败，请确认文件格式是否正确';
          this.fileValidating = false;
        }
      );
    } else {
      this.fileForm.controls['fileUpload'].setValue(result);
      this.fileValidating = false;
    }
    /*else if (standard == 'VIDEO') {
      this.fileForm.controls['fileUpload'].setValue(result);
      this.fileValidating = false;
    } else if (standard == 'DOC') {
      this.fileForm.controls['fileUpload'].setValue(result);
      this.fileValidating = false;
    }*/
  }

  smpleZipStartingUrlValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      const value: String = control.value;
      if (!value) {
        return
      }

      const inFileList = this.fileEntries.some(it => it == value);
      const allowType = value.lastIndexOf('.') > 0 && /\.htm(l?)$/.test(value.toLowerCase());
      if (!allowType) {
        return { 'forbiddenFileType': { value: control.value }, error: true };
      }
      if (!inFileList) {
        return { 'forbiddenUrl': { value: control.value }, error: true }
      }
    };
  }

  doImport(event) {
    const form: FormArray = new FormArray([
      this.fileForm,
      this.propertyForm
    ]);
    if (this.fileForm.invalid || this.propertyForm.invalid) {
      tipMessage('表单填写错误, 请检查上一步操作是否正确', 'error', 2000);
      return;
    }

    let value = {...this.fileForm.value, ...this.propertyForm.value};
    if (this.parent) {
      value['parentId'] = this.parent.id;
    }
    this.submiting = true;
    this.importError = null;
    // console.log(value);
    this.rcoApi.doImport(value).subscribe(
      rcos => {
        this.submiting = false;
        this.subject.next({ code: 'addOk', rcos: rcos });
        this.next();
      },
      err => {
        this.importError = err;
        this.submiting = false;
        this.next();
      }
    );
  }

  onCancel(event) {
    // this.subject.destroy('onCancel');
    // 问题：这个做法只能组织点击自定义的取消按钮，并不能阻止点击右上角的关闭按钮，查阅了API没有提供组织窗口关闭的接口或方案。
    // 是否可以从 Subject 对象寻找突破口，待查阅相关资料
    if (this.fileForm.controls['fileUpload'].value) {
      this.modal.confirm({
        title: '取消上传内容?',
        content: '取消操作后上传的内容会被丢弃，下次操作需要重新上传。',
        zIndex: 1050,
        onOk: () => {
          this.subject.destroy('onCancel');
        }
      });
    } else {
      this.subject.destroy('onCancel');
    }
  }

  onOk() {
    this.subject.destroy('onOk');
  }

  next() {
    const maxStep = 3;
    if (this.currentStep == 0) {
      this.initPropertyForm();
    }

    if (this.currentStep == 0 && this.isCmi) {
      this.currentStep += 2;
    } else if (this.currentStep + 1 <= maxStep) {
      this.currentStep += 1;
    }
  }

  prev() {
    const minStep = 0;
    if (this.currentStep == 2 && this.isCmi) {
      this.currentStep -= 2;
    } else if (this.currentStep - 1 >= minStep) {
      this.currentStep -= 1;
    }
  }

  reset() {
    const preStandard = this.fileForm.value['standard'];

    this.initFileForm( preStandard ? {standard: preStandard} : undefined);
    this.imsmanifest = [];
    this.fileEntries = [];
    this.fileuploader.clearQueue(true);
    this.currentStep = 0;
  }

}
