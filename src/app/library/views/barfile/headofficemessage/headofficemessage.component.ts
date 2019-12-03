import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { Pagination } from 'app/core/entity/pagination';
import {
    FormBuilder,
    FormGroup,
    Validators,
    FormControl
} from '@angular/forms';
import { TrainBaseService } from '../../../service/train-base.service';
import { UserGroup } from 'app/system/entity/user-group';
import { AuthService } from 'app/core';
import { tipMessage } from '../../../../account/entity/message-tip';
import { NzModalService, NzModalSubject } from 'ng-zorro-antd';
import { EmploymentDocumentsService } from '../../../service/employment-documents.service';

@Component({
    selector: 'spk-headofficemessage',
    templateUrl: './headofficemessage.component.html',
    styleUrls: ['./headofficemessage.component.scss']
})
export class HeadofficemessageComponent implements OnInit {
    @ViewChild('tableHandle') tableHandle;
    @ViewChild("lookupDialog") lookupDialog: TemplateRef<any>;
    @ViewChild("ugLookup") ugLookup;
    isHeadCompany: boolean = false;
    isEditor: boolean = true;
    editorId: number;
    _form: FormGroup;
    spinning: boolean = false;
    btnstate:boolean = false;
    testListData: any;
    filePath: any;
    selection: any[] = [];
    _searchForm: FormGroup;
    searchBy: {
        startDate?: any,
        endDate?: any,
        fileName?: any,
        fileNumber?: any,
        userGroup?: UserGroup,
    } = {}
    modalSubject: NzModalSubject;
    columns: any = [
        // { title: '序号', data: 'order' },
        { title: '文件名', tpl: 'declareUserName', styleClass: 'text-left' },
        { title: '文件号', tpl: 'declaredisPlayName', styleClass: 'text-left' },
        { title: '发文时间', tpl: 'userGroupNamePath', styleClass: 'text-center time-width' },
        { title: '下载附件', tpl: 'trainName', styleClass: 'text-center train-name-width' },
        { title: '操作者', tpl: 'periodTrainingTheme', styleClass: 'text-left' },
        { title: '操作时间', tpl: 'trainContent', styleClass: 'text-center time-width' },
        { title: '开始时间', tpl: 'startDate', styleClass: 'text-center time-width' },
        { title: '结束时间', tpl: 'endDate', styleClass: 'text-center time-width' },
        { title: '是否共享', tpl: 'isShare', styleClass: 'text-center' },
        { title: '操作', tpl: 'actions', styleClass: 'text-center' },

    ];
    constructor(
        private fb: FormBuilder,
        private trainBaseService: TrainBaseService,
        private traingapiServer: AuthService,
        private modal: NzModalService,
        private service: EmploymentDocumentsService,
    ) { }
    ngOnInit() {
        this._searchForm = this.fb.group({
            startDate: [],
            endDate: [],
            fileName: [],
            fileNumber: [],
            userGroup: [],
        })
        this.tableHandle.isComplexSearch = true;
        this.trainBaseService.getTopUserGroup().subscribe(
            userGroup => {
                if (userGroup) {
                    this.searchBy.userGroup = userGroup;
                    this._searchForm.get('userGroup').setValue(userGroup)
                }
                this.trainBaseService.getIsHeadCompany().subscribe(
                    res => {
                        for(let i = 0; i< res.length;i++) {
                            if(res[i] == userGroup.id) {
                                this.isHeadCompany = true;
                                return;
                            }
                        }
                    }
                )
                this.loadData();
            }
        )
        this.initForm();
    }
    loadData(page?: Pagination<any>) {
        if (!this.searchBy.userGroup) {
            return tipMessage('组织为必选项！');
        }
        this.spinning = true;
        let params = {
            page: page ? page.number : 0,
            size: page ? page.size : 10,
            // knowledgeId: this.selectTreeId
        };
        if (this.searchBy.endDate) {
            params['endDate'] = this.searchBy.endDate.getTime();
        }
        if (this.searchBy.startDate) {
            params['startDate'] = this.searchBy.startDate.getTime();
        }
        if (this.searchBy.fileName) {
            params['fileName'] = this.searchBy.fileName;
        }
        if (this.searchBy.fileNumber) {
            params['publicName'] = this.searchBy.fileNumber;
        }
        if (this.searchBy.userGroup) {
            params['userGroup.id'] = this.searchBy.userGroup.id;
        }
        this.trainBaseService.getCompanyNotice(params).subscribe(data => {
            this.spinning = false;
            this.testListData = data;
           // this.judgeCheckable();
        })
    }
    judgeCheckable() {
        this.testListData.content.map((item) => {
            if (!item.myself) {
                item.checkable = false;
            }
        })
    }


    // 搜索的加载列表
    _submitForm($event, value) {
        $event.preventDefault();
        this.searchBy = value;
        if (!this.searchBy.userGroup) {
            return tipMessage('组织为必选项！');
        }
        this.loadData();
        return;
    }

    deleteFile() {
        let ids = [];
        if (this.selection && this.selection.length) {
            if(this.selection.some((item)=>{return !item.myself})){
                return tipMessage('请取消所选项中是共享的项！','',5000);
            }
            this.modal.confirm({
                title: '删除',
                content: '确定要删除所选项？',
                showConfirmLoading: true,
                zIndex: 1003,
                onOk: () => {
                    for (let item of this.selection) {
                        ids.push(item.id);
                    }
                    this.trainBaseService.deleteConditionFile(ids).subscribe(
                        res => {
                            tipMessage('删除成功！', 'success');
                            this.loadData();
                        },
                        error => {
                            tipMessage(error);
                        }
                    )
                }
            })
        } else {
            tipMessage('请选择删除项！')
        }
    }
    cancelFile() {
        let ids = [];
        if (this.selection && this.selection.length) {
            if(this.selection.some((item)=>{return !item.myself})){
                return tipMessage('请取消所选项中是共享的项！','',5000);
            }
            for (let item of this.selection) {
                ids.push(item.id);
            }
            this.trainBaseService.cancelConditionFile(ids).subscribe(data => {
                tipMessage(`取消共享成功！`, 'success');
                this.loadData();
            })
        } else {
            tipMessage('请选择取消共享项！')
        }
    }
    initForm() {
        this._form = this.fb.group({
            fileName: ['', [Validators.required]],
            publicName: ['', [Validators.required]],
            startDate: [null, [Validators.required]],
            endDate: [null, [Validators.required]],
            fileType: ['总公司通知', [Validators.required]]
        })
    }
    // 添加
    add() {
        this.isEditor = false;
        this.initForm();
        this._form.get('fileType').disable();
        this.modalSubject = this.modal.open({
            title: '添加',
            content: this.lookupDialog,
            width: 1000,
            footer: false,
            zIndex: 1002,
            onOk: () => {
                this.filePath = undefined;
                this.editorId = undefined;
            },
            onCancel: () => {
                this.filePath = undefined;
                this.editorId = undefined;
            }
        })
    }
    // 编辑
    editor(id) {
        this.editorId = id;
        this.isEditor = true;
        if (id) {
            this.trainBaseService.getFileSingle(id).subscribe(data => {
                console.log(data);

                this._form.setValue({
                    fileName: data.fileName,
                    publicName: data.publicName,
                    startDate: data.startDate,
                    endDate: data.endDate,
                    fileType: '总公司通知',
                })
                this._form.get('fileType').disable();
                this.modalSubject = this.modal.open({
                    title: '添加',
                    content: this.lookupDialog,
                    width: 1000,
                    footer: false,
                    zIndex: 1002,
                })
            })
        }

    }
    _saveformmessage($event, value) {
        this.btnstate = true;
        $event.preventDefault();
        if (this.isEditor) {
            // let params = {};
            // params['fileName'] = '44hh4';
            // params['publicName'] = '44hh44';
            if (this.filePath) value['fileUrl'] = this.filePath;
            this.trainBaseService.updateFileSingle(this.editorId, value).subscribe(data => {
                this.btnstate = false;
                this.modalSubject.destroy()
                this.loadData();
                return tipMessage('保存成功', 'success');
            })
        } else {
            if (!!this.filePath) {
                value['fileUrl'] = this.filePath
            } else {
                tipMessage('请上传文件', '')
                this.btnstate = false;
                return
            }
            value.stripeType = 'NOTICE';
            this.trainBaseService.addOfficeFile(value).subscribe(
                ok => {
                    this.btnstate = false;
                    this.modalSubject.destroy()
                    this.loadData();
                    this.filePath = null;
                    return tipMessage('编辑成功！', 'success');
                },
                err => {
                    this.btnstate = false;
                    return tipMessage(err);
                }
            )
        }
    }

    // 上传文件
    onFileUpload(file) {
        if (file) {
            this.filePath = file["fullPath"];
            let i = file.originFileName.lastIndexOf('.');
            let filename = file.originFileName.substring(0,i);
            this._form.get('fileName').setValue(filename)
        }
    }
    // 批量共享弹出组织
    mutipleShare() {
        if (this.selection && this.selection.length) {
            if(this.selection.some((item)=>{return !item.myself})){
                return tipMessage('请取消所选项中是共享的项！','',5000);
            }
            this.modal.confirm({
                title: '批量共享!',
                content: '将所选文件批量共享，此操作需要花费一些时间，是否继续？',
                showConfirmLoading: true,
                zIndex: 1002,
                onOk: () => {
                    this.ugLookup.openLookup();
                },
                onCancel: () => { }
            })
        } else {
            return tipMessage('请选择批量共享的项!');
        }
    }
    userGroupLookupOk(value) {
        if (value.length) {
            let stripeFileIds = this.selection.map(item => item.id);
            let userGroupIds = value.map(it => it.id);
            this.service.mutipleShare(stripeFileIds, userGroupIds).subscribe(
                res => {
                    tipMessage('共享成功!', 'success');
                    this.loadData();
                },
                err => {
                    tipMessage(err);
                }
            )
        } else {
            return tipMessage('请选择共享的组织!');
        }
    }
}
