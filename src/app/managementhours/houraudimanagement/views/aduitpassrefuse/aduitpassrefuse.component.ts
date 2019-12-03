import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { HourService } from '../../../managementservice/hour.service';
import { Pagination } from 'app/core/entity/pagination';
import {
    FormBuilder,
    FormGroup,
    Validators,
    FormControl
} from '@angular/forms';
declare let $: any;
@Component({
    selector: 'spk-aduitpassrefuse',
    templateUrl: './aduitpassrefuse.component.html',
    styleUrls: ['./aduitpassrefuse.component.scss']
})
export class AduitpassrefuseComponent implements OnInit {
    _searchForm: FormGroup;
    paramsId: any;
    periodUserInformationId: any;
    spinning: boolean = true;
    btnpass: boolean = false;
    btnrefuse: boolean = false;
    isVisible: boolean = false;
    textcontent: any = '';
    auditMethod: any;
    paramsData: any;
    isSingleUser: boolean = false;
    userListVisible: boolean = false;
    userSpinning: boolean = false;
    testListData: any;
    selection: any[] = [];
    searchBy: any = {};
    cpbtnstate: boolean = false;
    crbtnstate: boolean = false;
    columns: any = [
        { title: '姓名', tpl: 'displayName' },
        { title: '工号', tpl: 'username' },
        { title: '组织', tpl: 'group' },
        { title: '状态', tpl: 'status' }
    ]
    constructor(
        private route: Router,
        private routeInfo: ActivatedRoute,
        private message: NzMessageService,
        private hourservice: HourService,
        private fb: FormBuilder,
        private confirmServ: NzModalService
    ) { }

    ngOnInit() {
        this.routeInfo.params.subscribe((params) => {
            this.paramsId = params.id;
            // 请求学员学时数据
            this.hourservice.getstaffaduitingmessage(this.paramsId).subscribe(
                res => {
                    // console.log(res, 553);
                    this.paramsData = res;
                    this.spinning = false;
                    this.isSingleUser = true;
                },
                err => {
                    this.spinning = false;
                    return this.tipMessage('error', err);
                }
            )
        })
    }
    // 返回列表
    goBack(event) {
        window.history.back()
    }
    // 审核通过
    pass(event, type) {
        this.btnpass = true;
        this.isVisible = true;
        this.auditMethod = type;
    }

    // 拒绝refuse
    refuse(event, type) {
        this.btnrefuse = true;
        this.isVisible = true;
        this.auditMethod = type;
    }
    // modal框的显示
    handleOk(event) {
        let value = this.textcontent.replace(/^\s*|\s*$/g, '');
        if (value != null && value.length > 2000) {
            return this.tipMessage('error', '字数不能超过2000字', 3000);
        }
        let params = {
            status: this.auditMethod == 'pass' ? 0 : 1,
            auditOpinion: value
        };
        if (this.auditMethod == 'pass') {
            this.hourservice.passrefusehour(this.paramsId, params).subscribe(
                res => {
                    // console.log(res, 222);
                    this.btnpass = false;
                    this.tipMessage('success', '审批通过！');
                    window.history.back();
                },
                err => {
                    this.btnpass = false;
                    return this.tipMessage('error', err);
                }
            )
        } else if (this.auditMethod == 'refuse') {
            // console.log('refuse')
            this.hourservice.passrefusehour(this.paramsId, params).subscribe(
                res => {
                    // console.log(res, 222);
                    this.btnrefuse = false;
                    this.tipMessage('success', '拒绝审核');
                    window.history.back();
                },
                err => {
                    this.btnrefuse = false;
                    return this.tipMessage('error', err);
                }
            )
        }

    }
    handleCancel(event) {
        this.isVisible = false;
        this.textcontent = '';
        this.auditMethod = undefined;
        this.btnpass = false;
        this.btnrefuse = false;
    }
    // 加载人员列表
    loadUserListData(page?: Pagination<any>) {

        this.userSpinning = true;
        let params = {
            page: page ? page.number : 0,
            size: page ? page.size : 10,
            activeId: this.paramsId,
            ...this.searchBy
            // knowledgeId: this.selectTreeId
        };
        this.hourservice.userRefuseList(params).subscribe(
            res => {
                this.testListData = res;
                this.userSpinning = false;
                this.selection = [];
                // console.log(res, 44)
            },
            err => {
                this.userSpinning = false;
                return this.tipMessage('error', err);
            }
        )


    }
    // 多人的审核拒绝
    moreRefuse() {
        this.userListVisible = true;
        this._searchForm = this.fb.group({
            username: [''],
            idcardNumber: [''],
        })
        this.loadUserListData();

    }
    handleCancelUserList(event) {
        this.userListVisible = false;
        this.selection = [];
    }
    handleOkUserList(event) {
        this.userListVisible = false;
    }
    // 搜索的加载列表
    _submitForm($event, value) {
        $event.preventDefault();
        // tslint:disable-next-line:forin
        console.log(value)
        this.searchBy = value;
        this.loadUserListData();
        return;
    }
    // 选择性通过
    chooseUserPass() {
        if (this.selection.length) {
            let p = this.judgePass(this.selection);
            let r = this.judgeRefuse(this.selection);
            if (p && !r) {
                return this.tipMessage('error', '请取消已通过人员！');
            } else if (!p && r) {
                return this.tipMessage('error', '请取消已拒绝人员！');
            } else if (p && r) {
                return this.tipMessage('error', '请取消已通过和已拒绝人员！');
            }
            let ids = this.getIds(this.selection);
            this.cpbtnstate = true;
            this.confirmServ.confirm({
                title: '审核通过',
                content: '确定对所选人员审核通过',
                showConfirmLoading: true,
                zIndex: 1003,
                onOk: () => {
                    let params = {
                        status: 0,
                        periodUserInformationIds: ids,
                    };
                    this.hourservice.passrefusehour(this.paramsId, params).subscribe(
                        res => {
                            this.tipMessage('success', '审核通过');
                            this.selection = [];
                            this.userListVisible = false;
                            this.cpbtnstate = false;
                            window.history.back();
                        },
                        err => {
                            this.cpbtnstate = false;
                            this.tipMessage('error', err);
                        }
                    )
                },
                onCancel: () => {
                    this.cpbtnstate = false;
                }
            })
        } else {
            return this.tipMessage('error', '请选择要通过的人员');
        }
    }
    // 返回
    goBackAduit() {
        window.history.back();
    }
    // 选择性拒绝
    chooseUserRefuse() {
        if (this.selection.length) {
            let p = this.judgePass(this.selection);
            let r = this.judgeRefuse(this.selection);
            if (p && !r) {
                return this.tipMessage('error', '请取消已通过人员！');
            } else if (!p && r) {
                return this.tipMessage('error', '请取消已拒绝人员！');
            } else if (p && r) {
                this.tipMessage('error', '请取消已通过和已拒绝人员！', 5000);
                return
            }
            let ids = this.getIds(this.selection);
            this.crbtnstate = true;
            this.confirmServ.confirm({
                title: '审核拒绝',
                content: '确定对所选人员审核拒绝',
                showConfirmLoading: true,
                zIndex: 1003,
                onOk: () => {
                    let params = {
                        status: 1,
                        periodUserInformationIds: ids,
                    };
                    this.hourservice.passrefusehour(this.paramsId, params).subscribe(
                        res => {
                            this.tipMessage('success', '审核已拒绝！');

                            this.selection = [];
                            this.userListVisible = false;
                            this.crbtnstate = false;
                            window.history.back();
                        },
                        err => {
                            this.crbtnstate = false;
                            this.tipMessage('error', err);
                        }
                    )
                },
                onCancel: () => {
                    this.crbtnstate = false;
                }
            })
        } else {
            return this.tipMessage('error', '请选择要拒绝的人员！');
        }
    }

    // 判所选人员中是否有已拒绝和审核已通过的人员
    judgePass(array: any[]) {
        return array.some((item) => {
            return item.status == 'P'
        })
    }
    judgeRefuse(array: any[]) {
        return array.some((item) => {
            return item.status == 'R'
        })
    }
    // 获取ids
    getIds(array: any[]) {
        let ids = [];
        array.map((item) => {
            ids.push(item.id);
        })
        return ids;
    }
    // 获取组织
    getNamePath(value) {
        if (value) {
            if (value.indexOf(',') != -1) {
                return value.replace(/(\，|\,)/g, '/')
            } else {
                return value
            }

        } else {
            return '--'
        }
    }
    tipMessage(type: string, text: string, duration?: number) {
        $.toast({
            icon: type,
            text: text,
            position: 'top-center',
            allowToastClose: false,
            hideAfter: duration || 1000
        })
    }
}
