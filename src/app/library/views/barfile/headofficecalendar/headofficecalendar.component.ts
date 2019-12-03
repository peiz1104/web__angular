import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { Pagination } from 'app/core/entity/pagination';
import {
    FormBuilder,
    FormGroup,
    Validators,
    FormControl
} from '@angular/forms';
import { NzModalService, NzModalSubject } from 'ng-zorro-antd';
import { AuthService } from 'app/core';
import { EmploymentDocumentsService } from '../../../service/employment-documents.service';
import { tipMessage } from 'app/account/entity/message-tip';
import { TrainBaseService } from 'app/library/service/train-base.service';
@Component({
    selector: 'spk-headofficecalendar',
    templateUrl: './headofficecalendar.component.html',
    styleUrls: ['./headofficecalendar.component.scss']
})
export class HeadofficecalendarComponent implements OnInit {
    testListData: any;
    selection: any[] = [];
    _searchForm: FormGroup;
    _form: FormGroup;
    spinning: boolean = false;
    fileUrl: any;
    editId: any;
    btnstate: boolean = false;
    editSpinning: boolean = false;
    searchBy: {
        startDate?: any,
        endDate?: any,
        fileName?: any,
        systemName?: any,
        userGroup?: any
    } = {}
    @ViewChild('tableHandle') tableHandle;
    @ViewChild("lookupDialog") lookupDialog: TemplateRef<any>;
    @ViewChild("ugLookup") ugLookup;
    modalSubject: NzModalSubject;
    columns: any = [
        { title: '文件名', data: 'fileName', styleClass: 'text-left' },
        { title: '分公司名称', tpl: 'declaredisPlayName', styleClass: 'text-left' },
        { title: '发文时间', tpl: 'createdDate', styleClass: 'text-center time-width' },
        { title: '下载附件', tpl: 'trainName', styleClass: 'text-center train-name-width' },
        { title: '操作者', tpl: 'periodTrainingTheme', styleClass: 'text-left' },
        { title: '操作时间', tpl: 'lastModifiedDate', styleClass: 'text-center time-width' },
        { title: '开始时间', tpl: 'startDate', styleClass: 'text-center time-width' },
        { title: '结束时间', tpl: 'endDate', styleClass: 'text-center time-width' },
        { title: '是否共享', tpl: 'myself' },
        { title: '操作', tpl: 'actions', styleClass: 'text-center' }
    ];
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
        if (this.searchBy.systemName) {
            params['userGroup.name'] = this.searchBy.systemName;
        }
        if (this.searchBy.userGroup) {
            if (Object.prototype.toString.call(this.searchBy.userGroup) == "[object Array]") {
                params['userGroup.id'] = this.searchBy.userGroup.map(item => item.id)
            } else if (Object.prototype.toString.call(this.searchBy.userGroup) == "[object Object]") {
                params['userGroup.id'] = this.searchBy.userGroup.id;
            }
        }
        this.service.candelerList(params).subscribe(
            res => {
                this.spinning = false;
                this.testListData = res;
                this.selection = [];
              //  this.judgeCheckable();
            },
            err => {
                tipMessage(err);
                this.spinning = false;
            }
        )
    }
    constructor(
        private fb: FormBuilder,
        private authService: AuthService,
        private service: EmploymentDocumentsService,
        private trainBaseService: TrainBaseService,
        private modal: NzModalService
    ) { }

    ngOnInit() {
        this._searchForm = this.fb.group({
            startDate: [],
            endDate: [],
            fileName: [],
            systemName: [],
            userGroup: [],
        })
        this.tableHandle.isComplexSearch = true;
        this.trainBaseService.getTopUserGroup().subscribe(
            userGroup => {
                if (userGroup) {
                    this.searchBy.userGroup = userGroup;
                    this._searchForm.get('userGroup').setValue(userGroup)
                }
                this.loadData();
            }
        )
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
    // 删除
    delete(event) {
        if (this.selection && this.selection.length) {
            if(this.selection.some((item)=>{return !item.myself})){
                return tipMessage('请取消所选项中是共享的项！','',5000);
            }
            let ids = this.selection.map(item => item.id);
            this.modal.confirm({
                title: '删除',
                content: '确定要删除所选项？',
                showConfirmLoading: true,
                zIndex: 1003,
                onOk: () => {
                    this.service.candelerDelete(ids).subscribe(
                        res => {
                            tipMessage('删除成功！','success');
                            this.loadData();
                        },
                        error => {
                            tipMessage(error);
                        }
                    )
                }
            })
        } else {
            return tipMessage('请选择要删除的项！');
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
            this.spinning = true;
            this.service.mutipleShare(stripeFileIds, userGroupIds).subscribe(
                res => {
                    tipMessage('共享成功!', 'success');
                    this.loadData();
                },
                err => {
                    this.spinning = false;
                    tipMessage(err);
                }
            )
        } else {
            return tipMessage('请选择共享的组织!');
        }
    }
    // 取消共享
    cancelShare() {
        if (this.selection && this.selection.length) {
            if(this.selection.some((item)=>{return !item.myself})){
                return tipMessage('请取消所选项中是共享的项！','',5000);
            }
            let ids = this.selection.map(item => item.id);
            this.modal.confirm({
                title: '取消共享',
                content: '确定要取消共享所选项？',
                showConfirmLoading: true,
                zIndex: 1003,
                onOk: () => {
                    this.service.candelercancelShare(ids).subscribe(
                        res => {
                            tipMessage('取消共享成功！','success');
                            this.loadData();
                        },
                        error => {
                            tipMessage(error);
                        }
                    )
                }
            })
        } else {
            return tipMessage('请选择要取消共享的项！');
        }
    }
    initForm() {
        this._form = this.fb.group({
            fileName: ['', [Validators.required]],
            userGroup: ['', [Validators.required]],
            startDate: [null, [Validators.required]],
            endDate: [null, [Validators.required]],
            fileType: ['行事历', [Validators.required]]
        })
    }
    // 添加
    add() {
        this.initForm();
        this._form.get('fileType').disable();
        this.modalSubject = this.modal.open({
            title: '添加',
            content: this.lookupDialog,
            width: 900,
            footer: false,
            zIndex: 1003,
            onOk: () => {
                this.fileUrl = undefined;
                this.editId = undefined;
            },
            onCancel: () => {
                this.fileUrl = undefined;
                this.editId = undefined;
            }
        })
    }
    // 编辑
    editCalendar(value) {
        this.editId = value.id;
        this.editSpinning = true;
        this.add();
        this.service.getCandelerFileSingle(this.editId).subscribe(
            res => {
                this.editSpinning = false;
                this.fileUrl = res.fileUrl;
                this._form = this.fb.group({
                    fileName: [res.fileName, [Validators.required]],
                    userGroup: [res.userGroup, [Validators.required]],
                    startDate: [res.startDate, [Validators.required]],
                    endDate: [res.endDate, [Validators.required]],
                    fileType: ['行事历', [Validators.required]]
                })
            }
        )
    }
    _saveformmessage($event, value) {
        console.log(value);
        $event.preventDefault();
        if (!this.fileUrl && !this.editId) {
            return tipMessage('请上传文件!');
        }
        this.btnstate = true;
        let params = {
            fileName: value.fileName,
            startDate: value.startDate,
            endDate: value.endDate,
            'userGroup.id': value.userGroup.id,
            stripeType: 'CALENDAR'
        }
        if(this.fileUrl){
            params['fileUrl'] =  this.fileUrl
        }
        if (this.editId) {
            this.service.updateCandelerFileSingle(this.editId, params).subscribe(
                res => {
                    tipMessage('编辑成功！', 'success');
                    this.loadData();
                    this.btnstate = false;
                    this.modalSubject.destroy('onOk')
                },
                error => {
                    tipMessage(error);
                    this.btnstate = false;
                }
            )
        } else {
            this.service.candelerAdd(params).subscribe(
                res => {
                    tipMessage('添加成功！', 'success');
                    this.loadData();
                    this.btnstate = false;
                    this.modalSubject.destroy('onOk')
                },
                error => {
                    tipMessage(error);
                    this.btnstate = false;
                }
            )
        }
    }
    onFileUpload(fileData) {
        this.fileUrl = fileData.fullPath;
        let i = fileData.originFileName.lastIndexOf('.');
        let filename = fileData.originFileName.substring(0,i);
        this._form.get('fileName').setValue(filename)
    }
}
