import { Component, OnInit } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd';
import { Router, ActivatedRoute } from '@angular/router';
import { PeriodApiService } from '../period-api.service';
import { tipMessage } from 'app/account/entity/message-tip';

import {
    FormBuilder,
    FormControl,
    FormGroup,
    Validators
} from '@angular/forms';

@Component({
    selector: 'spk-period-declare',
    templateUrl: './period-declare.component.html',
    styleUrls: ['./period-declare.component.scss']
})
export class PeriodDeclareComponent implements OnInit {
    columns: any = [
        { title: '员工编号', tpl: 'username' },
        { title: '姓名', tpl: 'displayName' },
        { title: '培训名称', data: 'trainName' },
        { title: '开始时间', tpl: 'startDate' },
        { title: '结束时间', tpl: 'endDate' },
        { title: '培训天数', data: 'trainDays', styleClass: 'text-center' },
        { title: '学时数', data: 'periodNumber', styleClass: 'text-center' },
        { title: '审核状态', tpl: 'status' },
        { title: '操作', tpl: 'actions', styleClass: 'text-center' }
    ]
    _searchForm: FormGroup;
    spinning: boolean = true;
    refuspinning: boolean = true;
    periodmessageData: any = {};
    isVisible: boolean = false;
    reasonisVisible: boolean = false;
    isConfirmLoading: boolean = false;
    _allChecked = false; // 表格的选择
    _indeterminate = false;
    PRstatus: any;
    periodUserInformationId: any;
    reasonText: any = '';
    _displayData = []; // 当前页数据
    selection: any[] = []; // 选择的数据
    pageSize = 10;
    pageIndex = 1;
    total: any = 0;
    data: any[] = [];
    textcontent: any;
    isVisibleRefuse: boolean = false;
    cpbtnstate: boolean = false;
    crbtnstate: boolean = false;
    searchBy: {
        trainName?: string,
        startDate?: any,
        endDate?: any,
        status?: any,
    } = {};
    activeId: any;

    initSearchForm() {
        this._searchForm = this.fb.group({
            trainName: [],
            startDate: [null],
            endDate: [null],
            status: ['A'],
        });
    }

    // 加载列表数据
    loadListData() {
        this.spinning = true;
        let params = {
            page: this.pageIndex - 1,
            size: this.pageSize,
        }
        if (this.searchBy.trainName) {
            params['trainName'] = this.searchBy.trainName;
        }
        if (this.searchBy.startDate) {
            let y = new Date(this.searchBy.startDate).getTime();
            params['startDate'] = y
        }
        if (this.searchBy.endDate) {
            let y = new Date(this.searchBy.endDate).getTime();
            params['endDate'] = y;
        }
        if (this.searchBy.status) {
            params['status'] = this.searchBy.status;
        }
        this.service.getauditinglist(params).subscribe(
            res => {
                // console.log(res);
                this.data = res.content;
                this.spinning = false;
                this.total = res.totalElements;
                this._displayData = res.content;
                this.selection = [];
                this._allChecked = false;
                this._indeterminate = false;
            },
            err => {
                this.spinning = false;
                return tipMessage(err);
            }
        )
    }

    constructor(
        private confirmServ: NzModalService,
        private service: PeriodApiService,
        private route: Router,
        private routeInfo: ActivatedRoute,
        private fb: FormBuilder) {
    }

    ngOnInit() {
        this.searchBy.status = 'A';
        this.initSearchForm();
        this.loadListData()
    }

    _submitForm($event, value) {
        $event.preventDefault();
        this.pageIndex = 1;
        this.pageSize = 10;
        // tslint:disable-next-line:forin
        this.searchBy = value;
        this.loadListData();
        // console.log(value);
    }

    // 切换分页
    _changePage(event) {
        // console.log(event, '改变page')
        this.pageIndex = event;
        this.loadListData();
    }
    // 分页条数修改
    _pageSizeChane(event) {
        this.pageSize = event;
        this.loadListData();
    }
    // 单选多选操作

    _refreshStatus(event?: any) {
        // 请求数据将数据赋值给this._displayData
        // console.log(event, 4444)
        const allChecked = this._displayData.every(value => value.checked === true);
        const allUnChecked = this._displayData.every(value => !value.checked);
        this._allChecked = allChecked;
        this._indeterminate = (!allChecked) && (!allUnChecked);
    }

    // 全选操作
    _checkAll(value) {
        if (value) {
            this._displayData.forEach(data => {
                data.checked = true;
            });
        } else {
            this._displayData.forEach(data => {
                data.checked = false;
            });
        }
        this._refreshStatus();
    }

    // 审核
    toexamine(id) {
        this.isVisible = true;
        this.refuspinning = true;
        this.service.getdeclaremesage(id).subscribe(
            res => {
                this.periodmessageData = res;
                this.refuspinning = false;
                this.activeId = res.id;
                this.periodUserInformationId = res.user && res.user.id;
            },
            error => {
                this.refuspinning = false;
                return tipMessage(error);
            }
        )

    }
    getUserGroupNamePath(value) {
        if (value) {
            if (value.indexOf(',') != -1 || value.indexOf('，') != -1) {
                return value.replace(/(\,|\，)*/g, '/');
            } else {
                return value;
            }
        } else {
            return '暂无'
        }
    }
    // 弹窗的关闭
    handleCancel(event) {
        this.isVisible = false;
        this.periodmessageData = {};
        this.PRstatus = undefined;
        this.reasonText = '';
        this.periodUserInformationId = undefined;
    }

    handleOk(event) {
        this.isVisible = false;
    }

    // 通过拒绝
    pass(type) {
        this.PRstatus = type;
        this.reasonisVisible = true;
    }

    refuse(type) {
        this.PRstatus = type;
        this.reasonisVisible = true;
    }

    handleCancelReason(event) {
        // console.log("dawdq");
        this.reasonisVisible = false;
        this.reasonText = '';
        this.isConfirmLoading = false;
        this.PRstatus = undefined;
        // console.log("dawdq111");
    }

    handleOkReason($event) {
        let value = this.reasonText.replace(/^\s*|\s$/g, '');
        if (value != null && value.length > 1000) {
            return tipMessage('字数不能超过1000字！')
        }
        let params = {
            status: this.PRstatus == 'P' ? 0 : 1,
            auditOpinion: value,
            periodUserInformation: {
                id: this.periodUserInformationId
            }
        };
        this.isConfirmLoading = true;
        if (this.PRstatus == 'P') {
            // 审核通过
            this.service.passrefusehour(this.activeId, params).subscribe(
                res => {
                    // console.log(res, 222);
                    this.isConfirmLoading = false;
                    tipMessage('审核通过！', 'success');
                    this.isVisible = false;
                    this.reasonisVisible = false;
                    this.PRstatus = undefined;
                    this.reasonText = '';
                    this.periodUserInformationId = undefined;
                    this.loadListData();
                },
                err => {
                    this.isConfirmLoading = false;
                    return tipMessage(err);
                }
            )
        } else if (this.PRstatus == 'R') {
            // 审核拒绝
            this.service.passrefusehour(this.activeId, params).subscribe(
                res => {
                    // console.log(res, 222);
                    this.isConfirmLoading = false;
                    tipMessage('拒绝审核！', 'success')
                    this.isVisible = false;
                    this.reasonisVisible = false;
                    this.PRstatus = undefined;
                    this.reasonText = '';
                    this.periodUserInformationId = undefined;
                    this.loadListData();
                },
                err => {
                    this.isConfirmLoading = false;
                    return tipMessage(err);
                }
            )
        }
    }
    mutipleAprove() {
        this.selection = this.getselection(this._displayData);
        if (this.selection && this.selection.length) {
            if (!this.judgeRefuse(this.selection)) {
                return tipMessage('只可审核待审核项,请只选择待审核项！', '', 4000);
            } else {
                this.isVisibleRefuse = true;
            }
        } else {
            tipMessage('请选择批量审核项！')
        }
    }
    handleCancelRefuse(event) {
        this.isVisibleRefuse = false;
        this.cpbtnstate = false;
        this.textcontent = '';
        this.crbtnstate = false;
        this.selection = [];
    }

    chooseUserPass() {
        let value = this.textcontent ? this.textcontent.replace(/^\s*|\s*$/g, '') : '';
        if (value != null && value.length > 2000) {
            return tipMessage('字数不能超过2000字！', '', 4000);
        }
        this.cpbtnstate = true;
        let ids = this.getids(this.selection);
        let params = {
            status: 'P',
            auditOpinion: value,
            ids: ids,
        };
        this.publicRefuseMethod(params);
    }
    chooseUserRefuse() {
        let value = this.textcontent ? this.textcontent.replace(/^\s*|\s*$/g, '') : '';
        if (value != null && value.length > 2000) {
            return tipMessage('字数不能超过2000字！', '', 3000);
        }
        this.crbtnstate = true;
        let ids = this.getids(this.selection);
        let params = {
            status: 'R',
            auditOpinion: value,
            ids: ids,
        };
        this.publicRefuseMethod(params);
    }
    publicRefuseMethod(params) {
        this.service.mutipleRfuse(params).subscribe(
            res => {
                this.cpbtnstate = false;
                this.textcontent = '';
                this.crbtnstate = false;
                this.isVisibleRefuse = false;
                this.selection = [];
                this.loadListData();
            },
            err => {
                this.cpbtnstate = false;
                this.textcontent = '';
                this.crbtnstate = false;
                this.isVisibleRefuse = false;
                tipMessage(err);
            }
        )
    }
    judgeRefuse(array: any[]) {
        return array.every((item) => {
            return item.status == 'A';
        })
    }
    // 获取选中项 的ids
    getids(array: any[]) {
        let ids = [];
        array.map((item, index) => {
            ids.push(item.id)
        })
        return ids;
    }
    // 选择的selection数据
    getselection(array: any[]) {
        let selection = [];
        array.map((item, index) => {
            if (item.checked) {
                selection.push(item);
            }
        })
        return selection;
    }
}
