import { Router } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { CuiPagination, CuiLayer } from 'console-ui-ng';
import { ExaminationService } from '../../service/examination.service';
import { ExamList } from '../../entity/examination';
import { UserGroup } from '../../../exam-paper/entity/user-group';
import { AccountService } from 'app/account/service/account.service';
import * as moment from 'moment';
import { FormDataUtil } from 'app/core';
import * as _ from 'lodash';
import { tipMessage } from 'app/account/entity/message-tip';
import { NzToolTipModule } from 'ng-zorro-antd/src/tooltip/nz-tooltip.module';
const { isArray } = _;
@Component({
    selector: 'spk-exam-list',
    templateUrl: './exam-list.component.html',
    styleUrls: ['./exam-list.component.scss']
})
export class ExamListComponent implements OnInit { // [routerLink]="['/exam/examination/add']"
    pagination: CuiPagination;
    _searchForm: FormGroup;
    selection: any[] = [];
    switchExam: ExamList;
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
            title: '考试名称', tpl: 'examName',
            styleClass: 'text-center',
            style: { 'max-width': '200px', width: '200px', 'over-flow': 'hiden' }
        },
        { title: '所属机构', data: 'siteName', styleClass: 'text-center' },
        // { title: '所属分类', data: 'GroupName' },
        // { title: '试卷名称', data: 'paperName' },
        { title: '考试起始时间', tpl: 'startTime' },
        { title: '允许进入截止时间', tpl: 'enterExamTime', styleClass: 'text-center' },
        { title: '创建人', data: 'createdUserName', styleClass: 'text-center' },
        { title: '创建时间', tpl: 'createdDate', styleClass: 'text-center' },
        { title: '发布状态', tpl: 'isPutout', styleClass: 'text-center' },
        { title: '操作', tpl: 'examId', styleClass: 'text-center' }
    ];
    columnsData: any[];

    constructor(
        private fb: FormBuilder,
        private confirmServ: NzModalService,
        private examinationService: ExaminationService,
        private accountInfoService: AccountService,
        private router: Router
    ) {
        this.accountInfoService.findUser().subscribe(
            user => {
                this.accountInfo = user;
                this.managerGroup = user.managerGroup;
                this.loadData();
            }
        )
    }
    ngOnInit() {
        // console.log(this.managerGroup);
        this._searchForm = this.fb.group({
            examName: [], // 考试名称
            createdDate: ['', this.confirmStartTimeValidator], // 创建开始时间
            createdEndDate: ['', this.confirmEndTimeValidator], // 创建结束时间
            isPutout: [], // 是否发布；1：发布，0：未发布
            startTime: ['', this.confirmStartDateValidator], // 考试起始时间
            enterExamTime: ['', this.confirmEndDateValidator], // 考试结束时间
            createdUserName: [], // 创建人
        });
        // this.loadData();
    }
    changeSite(e) {
        this.loadData();
    }
    loadData(page?: CuiPagination) {
        this.loading = true;
        this.pagination = page;
        this.selection = [];
        let params = {
            ...this.switchExam,
            userGroupId: this.managerGroup && this.managerGroup['id'] || '',
            page: page ? page.number : 0,
            size: page ? page.size : 10,
            // sort: page && page.sort ? page.sort : null
        };
        this.examinationService.getExaminationList(params).subscribe(
            data => {
                this.pagination = data;
                this.columnsData = data['content'];
                this.loading = false;
            }
        );
    }
    // 选择组织机构点击OK时调用
    logSelectGroup(event) {
        this.loadData();
    }
    _submitForm($event, value) {
        $event.preventDefault();
        this.switchExam = value;
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
    // 复制考试
    copyExam(offeringId: number) {
        this.examinationService.copyExam(offeringId).subscribe(
            obj => {
                tipMessage('保存成功！', 'success');
                this.loadData();
            },
            err => tipMessage(err)
        )
    }
    // 发布，取消发布 考试
    ifPublishExam(selects, bool: boolean) {
        console.log(selects)
        if (!selects[0]) {
            tipMessage('请选择考试！', 'warning');
            return;
        }
        if (selects.length > 1) {
            tipMessage('该项不能批量操作');
            return;
        }
        if (selects[0].isPutout && bool) {
            tipMessage('考试已经发布无需再次发布！', '', 4000);
            return;
        }
        if (!selects[0].isPutout && !bool) {
            tipMessage('考试未发布无需取消发布！', '', 3000);
            return;
        }
        this.examinationService.isPublishExam(selects.map(it => it.offeringId), bool).subscribe(
            obj => {
                tipMessage('操作成功！', 'success');
                this.loadData();
            },
            err => tipMessage(err)
        );
    }
    // 删除选中的考试
    deleteExamination(select: any[]) {
        let self = this;
        if (select.length > 1) {
            tipMessage('该项不能批量操作');
            return;
        }
        if (!select[0]) {
            tipMessage('请选择考试！');
            return;
        }
        console.log(select);
        if (select[0].isPutout) {
            tipMessage('已发布的考试不允许删除');
            return;
        }
        select = select.map(it => it.offeringId);
        this.confirmServ.confirm({
            content: '是否确认删除！',
            okText: '确定',
            cancelText: '取消',
            zIndex: 1003,
            // 弹窗操作
            onOk(e) {
                self.examinationService.deleteExam(select).subscribe(
                    obj => {
                        tipMessage('删除成功！', 'success');
                        self.loadData();
                    },
                    err => tipMessage(err)
                )
            },

            onCancel(e) {
            }
        });
    }

    // 获取组织数据
    onUgSelectionChange(ugs) {
        ugs = ugs && isArray(ugs) ? ugs : (ugs ? [ugs] : []);
        let ug = ugs[0];
        this.userGroup = ug;
        console.log(ug, 888)
    }
    // 迁移考试
    moveExam(event) {
        if (this.selection.length) {
            this.isVisibleMove = true;
        } else {
            return tipMessage('请选择要迁移的试卷！', 'success');
        }
    }
    // 进行选择
    onSelectionChange(selection) {
        let datas = selection.map(it => it.data);
        // this.selectionChange.emit(datas);
    }
    handleCancel = (e) => {
        this.isVisibleMove = false;
    }
    handleOk = (e) => {
        this.moveStateLoading = true;
        if (!this.userGroup.id) {
            this.moveStateLoading = false;
            return tipMessage('请选择组织！');
        } else {
            let siteid = this.userGroup.id;
            let str = this.selection.map((value: any, index: number) => {
                return value.offeringId
            })
            this.examinationService.moveExams(str, siteid).subscribe((res) => {
                console.log(res, 333)
                this.moveStateLoading = false;
                this.isVisibleMove = false;
                this.loadData();
                this.selection = [];
            }, err => { tipMessage(err) })
        }
    }
    // 跳转到添加考试页
    skipAddExam() {
        if (this.managerGroup && this.managerGroup['id']) {
            this.router.navigate(['/exam/examination-learning/add', this.managerGroup['id'], { name: this.managerGroup['name'] }])
        } else {
            tipMessage('请选择组织机构!', 'info');
        }
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
