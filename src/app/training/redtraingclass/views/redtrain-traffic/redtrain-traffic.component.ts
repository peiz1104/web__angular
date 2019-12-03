import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ServiceService } from '../../service/service.service';
import { NzModalService } from 'ng-zorro-antd';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Pagination } from 'app/core';
import * as moment from 'moment';
import { tipMessage } from 'app/account/entity/message-tip';

@Component({
    selector: 'spk-redtrain-traffic',
    templateUrl: './redtrain-traffic.component.html',
    styleUrls: ['./redtrain-traffic.component.scss']
})
export class RedtrainTrafficComponent implements OnInit {
    _searchForm: FormGroup;
    _form: FormGroup;
    redId: any;
    spinning: boolean = false;
    selection: any[] = [];
    data: any;
    isVisible: boolean = false;
    editId: any;
    editspinning: boolean = false;
    trainoptions: any = [];
    submitloading: boolean = false;
    searchBy: {
        username?: any,
        name?: any,
        userGroup?: any
    } = {};
    columns: any[] = [
        { title: '用户名', data: 'user.username' },
        { title: '姓名', tpl: 'displayName' },
        { title: '所属组织', tpl: 'group' },
        { title: '交通方式', tpl: 'traffictype' },
        { title: '费用', data: 'fee', styleClass: 'text-right' },
        { title: '开始时间', tpl: 'startDate', styleClass: 'text-center' },
        { title: '结束时间', tpl: 'endDate', styleClass: 'text-center' },
        { title: '状态', tpl: 'status', styleClass: 'text-center' },
        { title: '操作', tpl: 'actions', styleClass: 'text-center' }
    ];
    // 加载数据
    loadData(page?: Pagination<any>) {
        let params = {
            page: page ? page.number : 0,
            size: page ? page.size : 10,
        };
        this.spinning = true;
        if (this.searchBy.name) {
            params['displayName'] = this.searchBy.name;
        }
        if (this.searchBy.username) {
            params['username'] = this.searchBy.username;
        }
        if (this.searchBy.userGroup) {
            params['orgIds'] = this.searchBy.userGroup.map(it => it.id);
        }
        this.service.getTrafficList(this.redId, params).subscribe(
            res => {
                this.selection = [];
                this.spinning = false;

                this.data = res;
                this.judgeEditable();
                // console.log(this.data, 444)
            },
            err => {
                tipMessage(err);
                this.spinning = false;
            }
        )
    }
    // initformData表单初始化数据
    // tslint:disable-next-line:member-ordering
    initFormData: any = {
        trainTrafficManner: ['', [Validators.required]],
        fee: ['', [Validators.required, Validators.pattern(/^[0-9]+([.]{1}[0-9]+){0,1}$/)]],
        userIds: [[], [Validators.required]],
        startDate: [null, [Validators.required]],
        endDate: [null, [Validators.required]]
    }
    // 初始化表单
    initSearchForm() {
        this._searchForm = this.fb.group({
            name: [],
            username: [],
            userGroup: [],
            phonenumber: []
        });
    }
    constructor(
        private router: Router,
        private routeInfo: ActivatedRoute,
        private service: ServiceService,
        private confirmv: NzModalService,
        private fb: FormBuilder
    ) { }

    ngOnInit() {
        this.routeInfo.parent.params.subscribe(
            (params) => {
                this.redId = params.redId
            }
        )
        this.service.gettrafficType().subscribe(
            res => {
                // console.log(res, '交通类型')
                this.trainoptions = res;
            }
        )
        this.initSearchForm();
        this.loadData();
    }
    _submitForm($event, value) {
        $event.preventDefault();
        // tslint:disable-next-line:forin
        this.searchBy = value;
        this.loadData();
        // console.log(value);
    }
    resetForm($event: MouseEvent) {
        $event.preventDefault();
        this._searchForm.reset();
        // tslint:disable-next-line:forin
        for (const key in this._searchForm.controls) {
            this._searchForm.controls[key].markAsPristine();
        }
    }
    // 删除
    delete() {
        if (this.selection.length) {
            // 如果选中有从SAP中拉取的则判断给提示不能进行删除

            let self = this;
            let status = this.judgeDelete(this.selection);
            if (status == 'A') {
                return tipMessage('请取消已提交项！');
            } else if (status == 'P') {
                return tipMessage('请取消已通过项！');
            }
            let ids = this.getuserid(this.selection);
            this.confirmv.confirm({
                title: '删除',
                content: '确定要删除所选项？',
                showConfirmLoading: true,
                zIndex: 1003,
                onOk() {
                    self.service.deletetraffic(ids).subscribe((res) => {
                        tipMessage('删除成功', 'success');
                        self.loadData();
                    },
                        err => {
                            return tipMessage(err);
                        }
                    )
                },
                onCancel() { }
            })
        } else {
            return tipMessage('请选择删除的项！');
        }
    }
    // 判断是否可以删除
    judgeDelete(array: any[]) {
        let status;
        array.map((item, index) => {
            if (item.status == 'A') {
                status = 'A'
            } else if (item.status == 'P') {
                status = 'P'
            } else {
                return undefined
            }
        })
        return status;
    }
    // 提交审核
    submitAudit() {
        if (this.selection.length) {
            let js = this.judgeTrafficStatus(this.selection);
            if (js == 'A') {
                return tipMessage('请取消已提交的项！');
            } else if (js == 'P') {
                return tipMessage('请取消已审批通过的项！');
            }
            let ids = this.getuserid(this.selection);
            this.confirmv.confirm({
                title: '提交审核',
                content: '确定要提交这些选项？',
                showConfirmLoading: true,
                zIndex: 1003,
                onOk: () => {
                    this.service.trafficFeeAudit(
                        {
                            ids: ids,
                            status: 'A'
                        }
                    ).subscribe(
                        res => {
                            tipMessage('提交成功!', 'success');
                            this.loadData();
                        },
                        error => {
                            tipMessage(error);
                        }
                        )
                },
                onCancel() { }
            })
        } else {
            return tipMessage('请选择要提交的费用');
        }
    }
    // 添加交通费用
    addTraffic() {
        this.isVisible = true;
        // tslint:disable-next-line:forin
        for (let key in this.initFormData) {
            this.initFormData[key] = [null, this.initFormData[key][1]];
        }
        this._form = this.fb.group(this.initFormData);
    }
    handleCancel(event) {
        this.isVisible = false;
        this.editId = undefined;
        this._form.reset();
    }
    // 编辑交通费用
    viewdetail(id) {
        this.isVisible = true;
        this.editId = id;
        this.editspinning = true;
        this._form = this.fb.group(this.initFormData);
        this.service.getsingletraffic(id).subscribe(
            (res) => {
                this.editspinning = false;
                // console.log(res, '编辑交通费用');
                // tslint:disable-next-line:forin
                for (let key in this.initFormData) {
                    this.initFormData[key] = [res[key], this.initFormData[key][1]];
                    if (key == 'trainTrafficManner') {
                        // tslint:disable-next-line:max-line-length
                        this.initFormData['trainTrafficManner'] = [res['trainTrafficManner'].id, this.initFormData['trainTrafficManner'][1]];
                    }
                    if (key == 'endDate') {
                        this.initFormData['endDate'] = [moment(res['endDate']), this.initFormData['endDate'][1]];
                    }
                    if (key == 'startDate') {
                        this.initFormData['startDate'] = [moment(res['startDate']), this.initFormData['startDate'][1]];
                    }
                    if (key == 'userIds') {
                        this.initFormData['userIds'] = [[res['user']], this.initFormData['userIds'][1]];
                    }
                }

                this._form = this.fb.group(this.initFormData);
            },
            err => {
                this.editspinning = false;
                return tipMessage(err);
            }
        )

    }
    // 删除人员
    remove(value) {
        // console.log(value, 2344);
        if (value.v.length) {
            let m = value.v.filter((item, index) => {
                return item.id !== value.u.id;
            })
            // console.log(m)
            this._form.get("userIds").setValue(m)
        }
    }
    // 提交添加表单
    _saveformmessage($event, value) {
        $event.preventDefault();
        // tslint:disable-next-line:forin
        for (const key in this._form.controls) {
            this._form.controls[key].markAsDirty();
        }
        if (this._form.invalid) {
            return tipMessage('内容填写不完整！');
        }
        let userid = this.getuserid(value.userIds).join(',');
        let paramsObj = {
            ...value,
            offering: { id: this.redId },
            trainTrafficManner: { id: value.trainTrafficManner },
            userIds: userid,
            isSelf: false,
            status: 0,
            startDate: moment(value.startDate).format('YYYY-MM-DD'),
            endDate: moment(value.endDate).format('YYYY-MM-DD')
        }
        if (this.editId) {
            // paramsObj['id'] = this.edittrafficId;
            paramsObj['isDeleted'] = false;
        }
        // console.log(paramsObj);
        this.submitloading = true;
        // 添加交通费用的保存
        if (this.editId) {
            this.service.edittraffic(this.editId, paramsObj).subscribe(
                res => {
                    tipMessage('编辑成功！', 'success');
                    this.submitloading = false;
                    this.isVisible = false;
                    this.editId = undefined;
                    this.loadData()
                },
                error => {
                    this.submitloading = false;
                    return tipMessage(error);
                }
            )
        } else {
            this.service.addtraffic(paramsObj).subscribe(
                res => {
                    tipMessage('添加成功！', 'success');
                    this.submitloading = false;
                    this.isVisible = false;
                    this.editId = undefined;
                    this.loadData()
                },
                error => {
                    this.submitloading = false;
                    return tipMessage(error);
                }
            )
        }
    }
    _resetForm($event?: MouseEvent) {
        $event.preventDefault();
        this._form.reset();
        // tslint:disable-next-line:forin
        for (const key in this._form.controls) {
            this._form.controls[key].markAsPristine();
        }
    }
    // 添加人员获取人员的ids
    getuserid(array: any[]) {
        let ids = [];
        array.map((item, index) => {
            ids.push(item.id);
        })
        return ids;
    }
    // 判断费用是否已提交已通过
    judgeTrafficStatus(array: any[]) {
        let status;
        array.forEach((item, index) => {
            if (item.status == 'A' && item.status == 'P') {
                status = 'AP'
            } else if (item.status == 'A') {
                status = 'A'
            } else if (item.status == 'P') {
                status = 'P'
            } else {
                status = null
            }
        })
        return status;
    }
    getFullPath(value) {
        if (value) {
            if (value.indexOf(',') !== -1 || value.indexOf('，') !== -1) {
                return value.replace(/(\,)|(\，)/g, '/')
            } else {
                return value
            }
        } else {
            return '--'
        }
    }
    // 判断status为A/P则不可编辑
    judgeEditable() {
        this.data.content.forEach((item) => {
            if (item.status == 'A' || item.status == 'P') {
                item.checkable = false;
            }
        })
    }
}
