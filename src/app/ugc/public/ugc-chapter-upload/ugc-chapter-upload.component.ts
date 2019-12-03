import { Component, OnInit, Input, ViewChild, TemplateRef } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators, AbstractControl, ValidatorFn } from '@angular/forms';
import { NzModalSubject, NzMessageService, NzModalService } from 'ng-zorro-antd';
import { AfterViewInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { UgcChapterService } from '../../service/ugc-chapter.service';
import { UgcChapter } from '../../entity/ugc-chapter';
import { tipMessage } from 'app/account/entity/message-tip';

@Component({
    selector: 'spk-ugc-chapter-upload',
    templateUrl: './ugc-chapter-upload.component.html',
    styleUrls: ['./ugc-chapter-upload.component.scss']
})
export class UgcChapterUploadComponent implements OnInit {
    // @Input() parent: UgcChapter;
    @Input() courseId: number;
    @ViewChild("fileuploader") fileuploader;
    currentStep: number = 0;
    currentStepTpl: TemplateRef<any>;
    uploadUrl: string;
    formArray: FormArray;
    fileForm: FormGroup;
    propertyForm: FormGroup;
    uploadFile: any;

    submiting;
    importError;

    maxFileSize = 1024 * 1024 * 1024 * 1024;
    fileValidating: boolean = false;
    fileValidError: any;

    imsmanifest: any[];
    fileEntries: any[];

    _TYPES = {
        'AUTO': { value: 'AUTO', label: '非标准内容集合', extra: '从ZIP文件导入物理内容文件，你需要在稍后手动指定内容对象属性。' },
        'VIDEO': {
            value: 'VIDEO', label: '视频文件',
            extra: '上传单个可播放视频文件，支持如下视频格式：mp4'
        },
    }
    _FILEUPLOAD_ACCEPT = {
        'AUTO': { accept: '.zip', extra: '请选择一个不大于 1GB 的课件 zip 包，且里边包含可查看的单入口网页文件' },
        'VIDEO': {
            accept: '.mp4',
            extra: '请选择一个视频格式的文件，支持格式：mp4'
        }
    };

    get fileControlInfo() {
        if (this.fileForm) {
            return this._FILEUPLOAD_ACCEPT[this.fileForm.value['type']];
        }
    }

    get isSimpleZip() {
        // this.fileuploader.formData
        if (this.fileForm) {
            return this.fileForm.value['type'] == 'AUTO';
        }
    }

    get isVideo() {
        if (this.fileForm) {
            return this.fileForm.value['type'] == 'VIDEO';
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
        private chapterApi: UgcChapterService,
        private message: NzMessageService,
        private modal: NzModalService
    ) { }

    ngOnInit() {
        this.uploadUrl = '/api/ugc/courses/' + this.courseId + "/chapters/upload";
        this.initForm();
    }

    initForm() {
        this.initFileForm();
    }

    initFileForm(value?) {
        this.fileForm = this.fb.group({
            type: ['AUTO', Validators.required],
            id: [null, Validators.required],
        });

        if (value) {
            this.fileForm.patchValue(value);
        }
    }

    initPropertyForm() {
        let fileFormValue = this.fileForm.value;
        let defaultTitle = this.uploadFile['originFileName'];
        let defaultTrackingType = fileFormValue['type'];


        let startingUrlValidator = this.isSimpleZip ? [Validators.required, this.smpleZipStartingUrlValidator()] : null;

        this.propertyForm = this.fb.group({
            title: [defaultTitle, Validators.required],
            enterFileName: [null, startingUrlValidator], // TODO: 校验链接是否可用，不可用时，警告，再点确定可以提交
            trackingType: [defaultTrackingType, Validators.required],
            intro: [],
        });
    }


    onStandardChange(value) {
        let fileuplad = this.uploadFile;
        let accepts = this._FILEUPLOAD_ACCEPT[value].accept.split(/,|，/);
        let fileAllowd = fileuplad && accepts.some(it => it.toLowerCase() == '.' + fileuplad.originFileName.split(".")[1].toLowerCase());
        if (fileAllowd) {
            this.modal.confirm({
                title: '你已上传了一个符合格式的文件，是否需要重新上传',
                okText: '是',
                cancelText: '否',
                zIndex: 1050,
                onOk: () => {
                    this.fileuploader.clearQueue(true);
                },
                onCancel: () => {
                    // this.validFileUpload(fileuplad);
                }
            });
        } else {
            this.fileuploader.clearQueue(true);
            // this.validFileUpload();
        }
    }


    onUploadComplete(result) {

        if (!result) {
            return;
        }

        this.uploadFile = result;
        this.fileForm.controls['id'].setValue(result.id);
    }



    smpleZipStartingUrlValidator(): ValidatorFn {
        return (control: AbstractControl): { [key: string]: any } => {
            const value: String = control.value;
            if (!value) {
                return
            }
            const allowType = value.lastIndexOf('.') > 0 && /\.htm(l?)$/.test(value.toLowerCase());
            if (!allowType) {
                return { 'forbiddenFileType': { value: control.value }, error: true };
            }
        };
    }

    doImport(event) {
        const form: FormArray = new FormArray([
            this.fileForm,
            this.propertyForm
        ]);
        if (this.fileForm.invalid || this.propertyForm.invalid) {
            tipMessage('表单填写错误, 请检查上一步操作是否正确', 'error', 4000);
            return;
        }


        let value = { ...this.fileForm.value, ...this.propertyForm.value };

        this.submiting = true;
        this.importError = null;



        this.chapterApi.addInfo(this.courseId, value).subscribe(
            chapter => {
                this.submiting = false;
                this.subject.next({ code: 'addOk', chapters: chapter });
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
        if (this.uploadFile != null) {
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

        if (this.currentStep + 1 <= maxStep) {
            this.currentStep += 1;
        }
    }

    prev() {
        const minStep = 0;
    }

    reset() {
        const pretype = this.fileForm.value['type'];

        this.initFileForm(pretype ? { type: pretype } : undefined);
        this.imsmanifest = [];
        this.fileEntries = [];
        this.fileuploader.clearQueue(true);
        this.currentStep = 0;
    }

}
