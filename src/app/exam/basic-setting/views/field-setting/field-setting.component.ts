import { Router, ActivatedRoute } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { CuiPagination, CuiLayer } from 'console-ui-ng';
import { BasicSettingService } from "app/exam/service/basic-setting.service";
import { UserGroup } from '../../../exam-paper/entity/user-group';
import { AccountService } from 'app/account/service/account.service';
import * as moment from 'moment';
import { FormDataUtil } from 'app/core';
import * as _ from 'lodash';
import { tipMessage } from 'app/account/entity/message-tip';
const { isArray } = _;

@Component({
    selector: 'spk-field-setting',
    templateUrl: './field-setting.component.html',
    styleUrls: ['./field-setting.component.scss']
})
export class FieldSettingComponent implements OnInit {
    pagination: CuiPagination;
    _searchForm: FormGroup;
    selection: any[] = [];
    loading: boolean = true;
    managerGroup: any = [];
    accountInfo: any = {};
    isVisibleMove: boolean = false;
    _startDate;
    _endDate;
    _startTime;
    _endTime;
    moveStateLoading: boolean = false;
    userGroup: UserGroup;
    columns: any = [
        {
            title: '场地名称', tpl: 'roomName',
            styleClass: 'text-center',
            style: { 'max-width': '200px', width: '200px', 'over-flow': 'hiden' }
        },
        { title: '所属机构', data: 'groupName', styleClass: 'text-center' },
        { title: '场地类型', data: 'dicName', styleClass: 'text-center' },
        { title: '最大容量（人）', data: 'maximumSeat', styleClass: 'text-center' },
        { title: '发布状态', tpl: 'roomStatus', styleClass: 'text-center' },
        { title: '场地地址', data: 'roomAddress', styleClass: 'text-center' },
        { title: '创建时间', tpl: 'createdDate', styleClass: 'text-center' },
        { title: '操作', tpl: 'action', styleClass: 'text-center' }
    ];
    columnsData: any[];
    searchData: any;
    routerId: any; // 新增返回后的ID
    routertName: any; // 新增返回后的名字
    constructor(
        private fb: FormBuilder,
        private confirmServ: NzModalService,
        private basicSettingService: BasicSettingService,
        private accountInfoService: AccountService,
        private router: Router,
        private route: ActivatedRoute
    ) {

        this.accountInfoService.findUser().subscribe(
            user => {
                this.accountInfo = user;
                console.log('this.routerId', this.routerId)
                console.log('this.routertName', this.routertName)
                // this.managerGroup = {
                //   id: this.routerId ? this.routerId : user.userGroupId,
                //   name: this.routertName ? this.routertName : user.userGroupName
                // };
                this.loadData();
            }
        )


    }
    ngOnInit() {
        // console.log(this.managerGroup);
        this.routerId = this.route.snapshot.params["id"]
        this.routertName = this.route.snapshot.params["name"]
        this._searchForm = this.fb.group({
            roomName: [], // 考试名称
            createdDate: ['', this.confirmStartTimeValidator], // 创建开始时间
            createdEndDate: ['', this.confirmEndTimeValidator], // 创建结束时间
            isPutout: [], // 是否发布；1：发布，0：未发布
            startTime: ['', this.confirmStartDateValidator], // 考试起始时间
            enterExamTime: ['', this.confirmEndDateValidator], // 考试结束时间
            createdUserName: [], // 创建人
        });
        // this.loadData();
    }
    add() {
        console.log('managerGroup', this.managerGroup)
        if (this.managerGroup.length == 0) {
            tipMessage('请选择组织机构！', 'info');
        } else {
            // tslint:disable-next-line:max-line-length
            this.router.navigate(['../add-field'], { queryParams: { userGroupId: this.managerGroup.id, name: this.managerGroup.name }, relativeTo: this.route })
            tipMessage('请先选择组织！', 'error');
        }
    }
    changeSite(e) {
        console.log(this.managerGroup)
        this.loadData();
    }
    loadData(page?: CuiPagination) {
        this.loading = true;
        this.pagination = page;
        this.selection = [];
        let params = {
            userGroupId: this.managerGroup && this.managerGroup['id'] || '',
            page: page ? page.number : 0,
            size: page ? page.size : 10,
            ...this.searchData
        };
        this.basicSettingService.getInationRoomList(params).subscribe(
            data => {
                this.pagination = data;
                this.columnsData = data['content'];
                this.loading = false;
                console.log('data', data)
                console.log('managerGroup', this.managerGroup)
            }
        );
    }
    // 选择组织机构点击OK时调用
    logSelectGroup(event) {
        this.loadData();
    }
    _submitForm($event, value) {
        $event.preventDefault();
        if (value.roomName) {
            this.searchData = value;
        } else {
            this.searchData = {
                createdDate: value.createdDate,
                createdEndDate: value.createdEndDate,
                createdUserName: value.createdUserName,
                enterExamTime: value.enterExamTime,
                isPutout: value.isPutout,
                startTime: value.startTime,
            }
        }
        this.loadData();
    }
    resetForm($event: MouseEvent) {
        $event.preventDefault();
        this._searchForm.reset();
        // tslint:disable-next-line:forin
        // for (const key in this._searchForm.controls) {
        //   this._searchForm.controls[key].markAsPristine();
        // }
    }
    // 重置搜索信息
    resetSearch() {
        this._searchForm = this.fb.group({
            examName: [], // 考试名称
            createdDate: [], // 创建开始时间
            createdEndDate: [], // 创建结束时间
            isPutout: [], // 是否发布；1：发布，0：未发布
            startTime: [], // 考试起始时间
            enterExamTime: [], // 考试结束时间
            createdUserName: [], // 创建人
        });
    }


    // 获取组织数据
    onUgSelectionChange(ugs) {
        ugs = ugs && isArray(ugs) ? ugs : (ugs ? [ugs] : []);
        let ug = ugs[0];
        this.userGroup = ug;
        console.log(ug, 888)
    }

    // 进行选择
    onSelectionChange(selection) {
        let datas = selection.map(it => it.data);
        // this.selectionChange.emit(datas);
    }
    handleCancel = (e) => {
        this.isVisibleMove = false;
    }

    deleteField(id) {
        let self = this;
        this.confirmServ.confirm({
            content: '是否确认删除！',
            okText: '确定',
            cancelText: '取消',
            zIndex: 1003,
            // 弹窗操作
            onOk(e) {
                self.basicSettingService.deleteInationRoom({ id: id }).subscribe(
                    obj => {
                        tipMessage('删除成功！', 'success');
                        self.loadData();
                    },
                    err => tipMessage(err)
                )
            }
        });
    }
    changeRoomStatus(row) {
        let self = this;
        this.confirmServ.confirm({
            content: '是否确认改变发布状态！',
            okText: '确定',
            cancelText: '取消',
            zIndex: 1003,
            // 弹窗操作
            onOk(e) {
                self.basicSettingService.isStatus({ id: row.id, roomStatus: !row.roomStatus }).subscribe(
                    obj => {
                        tipMessage('保存成功！', 'success');
                        self.loadData();
                    },
                    err => tipMessage(err)
                )
            }
        });
    }
    // 时间验证方法
    confirmStartDateValidator = (control: FormControl): { [s: string]: boolean } => {
        let controls = this._searchForm && this._searchForm.controls;
        if (controls) {
            const endTime = moment(controls[`enterExamTime`].value).unix();
            if (control.value) {
                if (endTime < moment(control.value).unix()) {
                    this._searchForm.get(`enterExamTime`).setValue(null);
                    tipMessage('结束时间不能小于开始时间！', '', 4000);
                    return;
                }
            }
        }
    }
    // 时间验证方法
    confirmStartTimeValidator = (control: FormControl): { [s: string]: boolean } => {
        let controls = this._searchForm && this._searchForm.controls;
        if (controls) {
            const endTime = moment(controls[`createdEndDate`].value).unix();
            if (control.value) {
                if (endTime < moment(control.value).unix()) {
                    this._searchForm.get(`createdEndDate`).setValue(null);
                    tipMessage('结束时间不能小于开始时间！', '', 3000);
                    return;
                }
            }
        }
    }
    // 时间验证方法
    confirmEndTimeValidator = (control: FormControl): { [s: string]: boolean } => {
        let controls = this._searchForm && this._searchForm.controls;
        if (controls) {
            const startTime = moment(controls[`createdDate`].value).unix();
            if (control.value) {
                if (startTime > moment(control.value).unix()) {
                    this._searchForm.get(`createdDate`).setValue(null);
                    tipMessage('结束时间不能小于开始时间！', '', 3000);
                    return;
                }
            }
        }
    }
    // 时间验证方法
    confirmEndDateValidator = (control: FormControl): { [s: string]: boolean } => {
        let controls = this._searchForm && this._searchForm.controls;
        if (controls) {
            const startTime = moment(controls[`startTime`].value).unix();
            if (control.value) {
                if (startTime > moment(control.value).unix()) {
                    this._searchForm.get(`startTime`).setValue(null);
                    tipMessage('结束时间不能小于开始时间！', '', 3000);
                    return;
                }
            }
        }
    }
}
