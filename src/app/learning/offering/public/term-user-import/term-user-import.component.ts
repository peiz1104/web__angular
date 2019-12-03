import { Condition } from './../../entity/condition';
import { TermService } from './../../service/term.service';
import { Component, OnInit, TemplateRef, ContentChild, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { NzModalService, NzModalSubject } from 'ng-zorro-antd';
import { NzMessageService } from 'ng-zorro-antd';
import { CuiLayer } from 'console-ui-ng';
import { Location } from '@angular/common';

@Component({
    selector: 'spk-term-user-import',
    templateUrl: './term-user-import.component.html',
    styleUrls: ['./term-user-import.component.scss']
})
export class TermUserImportComponent implements OnInit {

    @ContentChild("echoTpl") echoTpl: TemplateRef<any>;

    @ViewChild("lookupModalContent") lookupModalContent: TemplateRef<any>;
    @ViewChild("lookupModalFooter") lookupModalFooter: TemplateRef<any>;

    @Input() condition: Condition;
    @Output() ok: EventEmitter<any> = new EventEmitter();

    modalSubject: NzModalSubject;

    importErrInfo: string = "";
    excelInfo: any = {};
    right: any[];
    stepNumber: number = 0; // 导入步骤步数
    leadSelectFile: string;
    leadProgress: number = 50; // 加载进度条
    ifSubmitImport: boolean = true;
    canNextStep: boolean = true;
    loading: boolean = true;
    judgeTbcMax: string;
    leadColumns: any = [
        { title: '用户名', data: 'username' },
        { title: '姓名', data: 'firstName' },
        { title: '所属组织编码', data: 'userGroupCode' },
        { title: '所属组织名称', data: 'userGroupName' },
        { title: '错误信息', data: 'errInfo' },
    ];
    fileExecle: any = {};
    constructor(
        private modal: NzModalService,
        private dialog: CuiLayer,
        private location: Location,
        private message: NzMessageService,
        private termService: TermService
    ) { }

    ngOnInit() {

    }

    initImport(file) {
        this.fileExecle = file;
        this.loading = true;
        this.leadSelectFile = file['originFileName'];
        this.termService.termUserImport(file["fullPath"], this.condition.id).subscribe(
            success => {
                this.excelInfo = success;
                this.loading = false;
                this.canNextStep = false;
                this.importErrInfo = "";
                this.doneStepOK();
            },
            err => {
                this.canNextStep = true;
                this.importErrInfo = err;
                this.ifSubmitImport = true;
                this.loading = false;
            }
        );
    }

    downloadExcelModel() {
        window.location.href = window.location.origin + `/api/condition/${this.condition.id}/terms/excelModel`;
    }

    previousStep() {
        this.stepNumber = --this.stepNumber;
    }

    nextStep(num: number) {
        if (num == 0) {
            if (!this.leadSelectFile) {
                this.importErrInfo = "请选择导入的文件！";
                return;
            }
        }
        this.stepNumber = ++this.stepNumber;
    }
    doneStep() {
        this.ifSubmitImport = true;
        this.termService.termUserSave(this.fileExecle["fullPath"], this.condition.id).subscribe(
            success => {
                // 判断返回的最大注册人数
                this.judgeTbcMax = success.judgeTbcMax
                this.stepNumber = ++this.stepNumber;
            },
            err => { this.dialog.confirm(err) }
        );
    }
    doneStepOK() {
        this.right = this.excelInfo.right || [];
        if (this.right.length <= 0) {
            this.ifSubmitImport = true;
        } else {
            this.ifSubmitImport = false;
        }
    }
    importOk() {
        this.modalSubject.destroy('onOk');
        this.ok.emit(true);
    }
    cancelStep() {
        // this.location.back();
        this.modalSubject.destroy('onCancel');

    }

    openLookup() {
        this.excelInfo = {};
        this.right = [];
        this.stepNumber = 0; // 导入步骤步数
        this.leadSelectFile = null;
        this.leadProgress = 50; // 加载进度条
        this.ifSubmitImport = true;
        this.canNextStep = true;
        this.importErrInfo = "";
        this.fileExecle = {};
        this.modalSubject = this.modal.open({
            content: this.lookupModalContent,
            footer: this.lookupModalFooter,
            maskClosable: false,
            width: 1000,
            zIndex: 1003,
            onOk: () => { },
            onCancel: () => { }
        });
        console.log(this.condition, 4444)
    }
}
