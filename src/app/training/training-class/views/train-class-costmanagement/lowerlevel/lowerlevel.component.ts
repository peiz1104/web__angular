import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd';
import { Pagination } from 'app/core/entity/pagination';
import { UserGroup } from './../../../../entity/user-group';
import { TrainingClassApiService } from './../../../../service/training-class-api.service';
import {
    FormBuilder,
    FormGroup,
    Validators,
    FormControl
} from '@angular/forms';
import * as moment from 'moment'
import { tipMessage } from 'app/account/entity/message-tip';
@Component({
    selector: 'spk-lowerlevel',
    templateUrl: './lowerlevel.component.html',
    styleUrls: ['./lowerlevel.component.scss']
})
export class LowerlevelComponent implements OnInit {
    _searchForm: FormGroup;
    validateForm: FormGroup;
    spinning: boolean = true;
    selection: any[] = [];
    testListData: any;
    trainId: any;
    api: string;
    ugId: any;
    isVisible: boolean = false;
    submitloading: boolean = false;
    editspinning: boolean = false;
    trainoptions: any = [];
    edittrafficId: any;
    isVisibleAduit: boolean = false;
    auditOpinion: any;
    passStatus: boolean = false;
    refuseStatus: boolean = false;
    searchBy: {
        username?: string,
        displayName?: string,
        userGroup?: UserGroup[]
    } = {};
    columns = [
        { title: '用户名', tpl: 'username' },
        { title: '姓名', tpl: 'displayName' },
        // { title: '组织/机构', tpl: 'group' },
        { title: '交通方式', tpl: 'transportation' },
        { title: '费用（元）', tpl: 'price' },
        { title: '开始时间', tpl: 'startDate' },
        { title: '结束时间', tpl: 'endDate' },
        { title: '是否从SAP拉取', tpl: 'isFromSAP', styleClass: 'text-center' },
        { title: '状态', tpl: 'status', styleClass: 'text-center' },
        { title: '操作', tpl: 'actions', styleClass: 'text-center' }
    ]
    loadData(page?: Pagination<any>) {
        this.spinning = true;
        let params = {
            page: page ? page.number : 0,
            size: page ? page.size : 10,
            'offering.id': this.trainId,
            'isSelf': false,
        };
        if (this.searchBy.username) {
            params['username'] = this.searchBy.username;
        }
        if (this.searchBy.displayName) {
            params['displayName'] = this.searchBy.displayName;
        }
        if (this.searchBy.userGroup != null) {
            params['orgIds'] = this.searchBy.userGroup.map(it => it.id);
        }
        this.costservice.gettrafficlist(params).subscribe(
            res => {
                // console.log(res);
                this.spinning = false;
                this.testListData = res;
                this.selection = [];
            },
            err => {
                this.spinning = false;
                return tipMessage(err);
            }
        )

    }
    constructor(
        private route: Router,
        private routeInfo: ActivatedRoute,
        private confirmServ: NzModalService,
        private fb: FormBuilder,
        private costservice: TrainingClassApiService
    ) { }

    ngOnInit() {
        this._searchForm = this.fb.group({
            username: [],
            displayName: [],
            userGroup: [null]
        })
        this.routeInfo.parent.params.subscribe((params) => {
            this.trainId = params.tbcId;
        })
        this.routeInfo.data.subscribe(
            (obj: { trainingClass }) => {
                this.ugId = obj.trainingClass.userGroupId;
                // console.log(this.traingClass);
            }
        )
        this.api = `/api/trainfee/${this.ugId}/lower-user/${this.trainId}`;
        this.costservice.gettrafficType().subscribe(
            res => {
                // console.log(res, '交通类型')tra
                this.trainoptions = res;
            }
        )
        this.loadData()
    }
    // 搜索的加载列表
    _submitForm($event, value) {
        $event.preventDefault();
        // tslint:disable-next-line:forin
        // console.log(value)
        this.searchBy = value;

        this.loadData();
        return;
    }
    // 批量删除
    mutipledelete() {
        if (this.selection.length) {
            // 如果选中有从SAP中拉取的则判断给提示不能进行删除
            let candelete = this.judgeFromSap(this.selection);
            let status = this.judgeDelete(this.selection);
            if (candelete) {
                return tipMessage('请取消从SAP拉取项');
            } else if (status == 'A') {
                return tipMessage('请取消已提交项！');
            } else if (status == 'P') {
                return tipMessage('请取消已通过项！');
            } else {
                let self = this;
                let ids = this.getuserid(this.selection);
                this.confirmServ.confirm({
                    title: '删除',
                    content: '确定要删除所选项？',
                    showConfirmLoading: true,
                    zIndex: 1003,
                    onOk() {
                        self.costservice.deletetraffic(ids).subscribe((res) => {
                            tipMessage('删除成功！', 'success');

                            self.loadData();
                        },
                            err => {
                                return tipMessage(err);
                            }
                        )
                    },
                    onCancel() { }
                })
            }

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
    // 判断能否进行审核只有已提交可以审核
    aduitFee(arary: any[]) {
        if (this.selection.length) {
            let status = this.judgeAuditCondition(this.selection);
            if (status == 'N') {
                return tipMessage('请取消未提交的项！');
            } else if (status == 'P') {
                return tipMessage('请取消审核已通过的项！');
            } else if (status == 'R') {
                return tipMessage('请取消审核已拒绝的项！');
            }
            this.isVisibleAduit = true;
        } else {
            return tipMessage('请选择要审核的项！');
        }
    }
    // shenhe
    changeOption($event) {
        // console.log($event)
        if ($event.target.value.replace(/\^s*|\s*$/g, '').length > 500) {
            return tipMessage('字数不能超过500！');
        }

    }
    // 审核通过拒绝
    pass(value) {
        this.passStatus = true;
        let params = {
            ids: this.getuserid(this.selection),
            status: value,
        }
        if (this.auditOpinion.replace(/\^s*|\s*$/g, '') > 500) {
            return tipMessage('审核意见不能超过500字！');
        }
        if (this.auditOpinion) {
            params['auditOpinion'] = this.auditOpinion.replace(/^\s*|\s*$/g, '');
        }
        this.costservice.trafficFeeAudit(params).subscribe(
            res => {
                this.auditOpinion = undefined;
                this.isVisibleAduit = false;
                this.passStatus = false;
                tipMessage('审核通过', 'success');
                this.loadData();
            },
            err => {
                tipMessage(err);
                this.passStatus = false;
            }
        )
    }
    refuse(value) {
        this.refuseStatus = true;
        let params = {
            ids: this.getuserid(this.selection),
            status: value,
        }
        if (this.auditOpinion.replace(/\^s*|\s*$/g, '') > 500) {
            return tipMessage('审核意见不能超过500字！');
        }
        if (this.auditOpinion) {
            params['auditOpinion'] = this.auditOpinion.replace(/^\s*|\s*$/g, '');
        }
        this.costservice.trafficFeeAudit(params).subscribe(
            res => {
                this.auditOpinion = undefined;
                this.isVisibleAduit = false;
                this.refuseStatus = false;
                tipMessage('拒绝审核成功', 'success');
                this.loadData();
            },
            err => {
                tipMessage(err);
                this.refuseStatus = false;
            }
        )
    }
    // 拒绝
    handleCancelAduit(event) {
        this.isVisibleAduit = false;
        this.passStatus = false;
        this.refuseStatus = false;
        this.auditOpinion = undefined;
    }
    // 判断审核条件
    judgeAuditCondition(array: any[]) {
        let status;
        array.map((item, index) => {
            if (item.status == 'N') {
                status = 'N'
            } else if (item.status == 'P') {
                status = 'P'
            } else if (item.status == 'R') {
                status = 'R'
            } else {
                return undefined
            }
        })
        return status;
    }
    judgeFromSap(array: any[]) {
        return array.some((item, index) => {
            return item.isFromSAP == true;
        })
    }
    // 编辑交通费用
    viewdetail(id) {
        this.isVisible = true;
        this.edittrafficId = id;
        this.editspinning = true;
        this.validateForm = this.fb.group({
            trainTrafficManner: ['', [Validators.required]],
            fee: ['', [Validators.required, this.feeControl]],
            userIds: [[], [Validators.required]],
            startDate: [null, [Validators.required]],
            endDate: [null, [Validators.required]]
        });
        this.costservice.getsingletraffic(id).subscribe(
            (res) => {
                this.editspinning = false;
                this.validateForm = this.fb.group({
                    trainTrafficManner: [res['trainTrafficManner'].id, [Validators.required]],
                    fee: [res.fee, [Validators.required, this.feeControl]],
                    userIds: [[res['user']], [Validators.required]],
                    startDate: [moment(res['endDate']), [Validators.required]],
                    endDate: [moment(res['startDate']), [Validators.required]]
                });
            },
            err => {
                return tipMessage(err);
            }
        )

    }
    // 添加交通费用
    showmodal() {
        this.isVisible = true;
        this.validateForm = this.fb.group({
            trainTrafficManner: ['', [Validators.required]],
            fee: ['', [Validators.required, this.feeControl]],
            userIds: [[], [Validators.required]],
            startDate: [null, [Validators.required]],
            endDate: [null, [Validators.required]]
        })
    }
    // modal框的显示关闭
    handleCancel(event) {
        this.isVisible = false;
        this.edittrafficId = undefined;
    }
    handleOk(event) {
        this.isVisible = false;
        this.edittrafficId = undefined;
    }
    // 删除选择的人员
    // 删除人员
    remove(value) {
        // console.log(value, 2344);
        if (value.v.length) {
            let m = value.v.filter((item, index) => {
                return item.id !== value.u.id;
            })
            // console.log(m)
            this.validateForm.get("userIds").setValue(m)
        }
    }
    // 添加提交
    submitForm = ($event, value) => {
        $event.preventDefault();
        // tslint:disable-next-line:forin
        for (const key in this.validateForm.controls) {
            this.validateForm.controls[key].markAsDirty();
        }
        if (this.validateForm.invalid) {
            return tipMessage('内容填写不完整！');
        }
        let userid = this.getuserid(value.userIds).join(',');
        let paramsObj = {
            ...value,
            offering: { id: this.trainId },
            trainTrafficManner: { id: value.trainTrafficManner },
            userIds: userid,
            isSelf: 0,
            status: 0,
            isFromSAP: false,
            startDate: moment(value.startDate).format('YYYY-MM-DD'),
            endDate: moment(value.endDate).format('YYYY-MM-DD')
        }
        if (this.edittrafficId) {
            // paramsObj['id'] = this.edittrafficId;
            paramsObj['isDeleted'] = false;
        }
        console.log(paramsObj);
        this.submitloading = true;
        // 添加交通费用的保存
        if (this.edittrafficId) {
            this.costservice.edittraffic(this.edittrafficId, paramsObj).subscribe(
                res => {
                    tipMessage('编辑成!', 'success');
                    this.submitloading = false;
                    this.isVisible = false;
                    this.edittrafficId = undefined;
                    this.loadData()
                },
                error => {
                    this.submitloading = false;
                    return tipMessage(error);
                }
            )
        } else {
            this.costservice.addtraffic(paramsObj).subscribe(
                res => {
                    tipMessage('添加成功！', 'success');
                    this.submitloading = false;
                    this.isVisible = false;
                    this.edittrafficId = undefined;
                    this.loadData()
                },
                error => {
                    this.submitloading = false;
                    return tipMessage(error);
                }
            )
        }
    };
    // 添加人员获取人员的ids
    getuserid(array: any[]) {
        let ids = [];
        array.map((item, index) => {
            ids.push(item.id);
        })
        return ids;
    }
    resetForm($event: MouseEvent) {
        $event.preventDefault();
        this.validateForm.reset();
        // tslint:disable-next-line:forin
        for (const key in this.validateForm.controls) {
            this.validateForm.controls[key].markAsPristine();
        }
    }
    // 金额限制
    feeControl = (control: FormControl): { [s: string]: boolean } => {
        let controls = this.validateForm && this.validateForm.controls;

        if (controls) {
            if (control && control.value) {
                if (!/^[0-9]+([.]{1}[0-9]*){0,1}$/.test(control.value)) {
                    tipMessage('输入的金额格式错误！', '', 3000);
                    return { confirm: true, error: true };
                }
                if (control.value > 10000000) {
                    tipMessage('金额不能超过1000万', '', 2000)
                    return { confirm: true, error: true };
                }
            }
        }
    }

}
