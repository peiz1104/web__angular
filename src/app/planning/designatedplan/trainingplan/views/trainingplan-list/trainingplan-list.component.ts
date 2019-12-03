import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CuiLayer, Column } from 'console-ui-ng';
import { Pagination } from './../../../../../core/entity/pagination';
import { TrainingPlan } from './../../entity/trainingplan'
import { ApprovalInfo } from './../../entity/approvalinfo'
import { CourseTeacherService } from './../../../../../learning/course/service/course-teacher.service';
import { CourseService } from './../../../../../learning/course/service/course.service';
import { TrainingPlanService } from './../../service/trainingplan.service';
import { UserGroup } from './../../../../../system/entity/user-group';
import { NzModalService } from 'ng-zorro-antd';
import { Course } from './../../../../../learning/course/entity/course';
import {
    FormBuilder,
    FormGroup,
    Validators
} from '@angular/forms';
import { tipMessage } from 'app/account/entity/message-tip';

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'app-trainingplan-list',
    templateUrl: './trainingplan-list.component.html',
    styleUrls: ['./trainingplan-list.component.scss']
})
export class TrainingPlanListComponent implements OnInit {
    searchBy: {
        annualPlanId?: number, // 年度计划id
        name?: string, // 计划名称
        approvalStatus?: string, // 培训时间
        createBy?: string;
        isQuote?: string;
    } = {};
    trainingPlans: Pagination<TrainingPlan>;
    trainingPlanHistorys: Pagination<TrainingPlan>;
    approvalInfos: Pagination<ApprovalInfo>;
    selection: TrainingPlan[];
    historySelection: TrainingPlan[];
    approvalInfoSelection: ApprovalInfo[];
    id: number;
    thisId: string[] = [];
    columns = [
        { title: '指定计划编号', tpl: 'colprojectnumber', styleClass: 'text-center' },
        { title: '指定计划名称', tpl: 'colname', styleClass: 'text-center' },
        { title: '预算 (元)', tpl: 'coltrainingbudget', styleClass: 'text-center' },
        { title: '填报机构', tpl: 'colgroupname', styleClass: 'text-center' },
        { title: '填报人', tpl: 'coldisplayname', styleClass: 'text-center' },
        { title: '填报日期', tpl: 'colcreateddate', styleClass: 'text-center' },
        { title: '审核状态', tpl: 'colapprovalstatus', styleClass: 'text-center' },
        { title: '指定课程', tpl: 'colisdesignatingcourse', styleClass: 'text-center' },
        { title: '是否必办', tpl: 'colisquote', styleClass: 'text-center' },
        { title: '添加课程', tpl: 'coladdcourse', styleClass: 'text-center' },
        { title: '操作', styleClass: 'text-center', tpl: 'rowAction' },
        { title: '历史记录', styleClass: 'text-center', tpl: 'colhistory' }
    ];
    historyColumns = [
        { title: '计划编号', tpl: 'colprojectnumber', styleClass: 'text-center' },
        { title: '计划名称', tpl: 'colname', styleClass: 'text-center' },
        { title: '预算 (元)', tpl: 'coltrainingbudget', styleClass: 'text-center' },
        { title: '培训时间', tpl: 'coltrainingdate', styleClass: 'text-center' },
        { title: '修改人', tpl: 'coldisplayname', styleClass: 'text-center' },
        { title: '修改时间', tpl: 'collastmodifieddate', styleClass: 'text-center' },
        { title: '详细', styleClass: 'text-center', tpl: 'rowAction' }
    ];
    approvalColumns = [
        { title: '审核人', tpl: 'colcreatedbydisplayname', styleClass: 'text-center' },
        { title: '审核机构', tpl: 'colusergroupname', styleClass: 'text-center' },
        { title: '审核时间', tpl: 'colcreateddate', styleClass: 'text-center' },
        { title: '审核状态', tpl: 'colapprovalstatus', styleClass: 'text-center' },
        { title: '审核意见', tpl: 'colcomments', styleClass: 'text-center' }
    ];
    argus: any;
    inputValue: string;
    validateForm: FormGroup;
    isVisible = false;
    isVisibleForCopy = false;
    isVisibleHistory = false;
    isVisibleApproval = false;
    message = "";
    copyCounts = 1;
    copyEntity: TrainingPlan;
    userGroup: UserGroup;
    isAdvancedQuery: boolean = true;
    loading: boolean = true;

    isVisibleAddPlan: boolean = false;
    course: Course;
    dat: any;
    searchForm: FormGroup;
    loadin: boolean;
    selectio: any[] = [];
    column: Column[] = [
        { title: '缩略图', tpl: 'thumbnail' },
        { title: '名称/编码', tpl: 'nameAndCode' },
        { title: '类型/学时', tpl: 'typeAndDuration' },
        { title: '组织/分类', tpl: 'orgAndCate' },
    ];

    isSeeOrAdd: boolean = false;
    planId: number;
    _submitForm = ($event, value) => {
        $event.preventDefault();
        // tslint:disable-next-line:forin
        for (const key in this.validateForm.controls) {
            this.validateForm.controls[key].markAsDirty();
        }
        this.searchBy = value;
        this.searchBy.annualPlanId = this.id;
        this.loadData();
    };


    constructor(private trainingPlanService: TrainingPlanService,
        private layer: CuiLayer,
        private fb: FormBuilder,
        private teacherService: CourseTeacherService,
        private courseService: CourseService,

        private routerIonfo: ActivatedRoute) {
    }

    ngOnInit() {
        this.id = this.routerIonfo.snapshot.params.id;
        this.searchBy.annualPlanId = this.id;
        this.validateForm = this.fb.group({
            name: ['', []],
            approvalStatus: ['', []],
            isQuote: ['', []],
            createBy: ['', []],
        });
        this.loadData();
    }

    // form表单初始化
    initSearchForm() {
        this.searchForm = this.fb.group({
            searchText: [],
            type: [],
            category: [],
            userGroup: []
        });
    }

    _submitSearchForm(e, v) {
        this.loadDat();
    }

    // modal 里面的搜索
    handelSearch = () => {
        this.loadDat();
    }

    // modal 里面的列表数据
    loadDat(page?: Pagination<any>) {
        console.log(page)
        this.loadin = true;
        if (this.isSeeOrAdd) {
            // 查看的课程接口
            let searchText = this.searchForm.value.searchText;
            let params = {
                planId: this.planId,
                page: page ? page.number : '' || 0,
                size: 10
            }
            this.courseService.getaddcourse(params).subscribe(
                data => {
                    this.dat = data
                    console.log(data)
                    this.loadin = false;
                },
                err => {
                    this.loadin = false;
                }
            );
        } else {
            // 添加的课程接口
            let searchText = this.searchForm.value.searchText;
            console.log(searchText)
            let params = {
                planId: this.planId,
                searchText: searchText || null,
                page: page ? page.number : '' || 0,
                size: 10
            }
            this.courseService.getnewcourse(params).subscribe(
                data => {
                    this.dat = data
                    console.log(data)
                    this.loadin = false;
                },
                err => {
                    this.loadin = false;
                }
            );
        }
    }

    // 判断类型
    _getCourseTypeText(key) {
        let texts = { 'ONLINE': '在线学习', 'LIVE': '直播课堂', 'OFFLINE': '面授课程' };
        return texts[key] || '';
    }

    // 点击添加里面确认 modal
    handleOkAdd = (e) => {
        if (this.isSeeOrAdd) {
            this.isVisibleAddPlan = false;
        } else {
            let selection = this.selectio;
            let courseIds = []
            for (let i = 0; i < selection.length; i++) {
                courseIds.push(selection[i].id)
            }
            let params = {
                planId: this.planId,
                courseIds: courseIds
            }
            this.courseService.addcourse(params).subscribe(
                data => {
                    this.isVisibleAddPlan = false;
                    tipMessage('添加成功！', 'success');
                },
                err => {
                    this.isVisibleAddPlan = false;
                }
            );
        }

    }

    // 点击查看里面的删除 modal
    handelDeleteSee = () => {
        let selection = this.selectio;
        // console.log(this.selectio)
        if (this.selectio.length == 0) {
            return tipMessage('请选择要删除的项');
        }
        let courseIds = []
        for (let i = 0; i < selection.length; i++) {
            courseIds.push(selection[i].id)
        }
        // console.log(courseIds)
        let params = {
            planId: this.planId,
            courseIds: courseIds
        }
        this.courseService.deletecourse(params).subscribe(
            data => {
                tipMessage('删除成功！', 'success');
                this.loadDat();
            },
            err => {
            }
        );
    }

    // 取消 modal
    handleCancelAdd = (e) => {
        this.isVisibleAddPlan = false;
    }

    // 点击添加
    handelAddPlan = (row) => {
        console.log(row)
        this.planId = row.id;
        this.isVisibleAddPlan = true;
        this.isSeeOrAdd = false;
        this.initSearchForm()
        this.loadDat()
    }

    // 点击查看
    handelSeePlan = (row) => {
        this.planId = row.id
        this.isVisibleAddPlan = true;
        this.isSeeOrAdd = true;
        this.initSearchForm()
        this.loadDat()
    }


    /* 点击高级查询 */
    handelClickAdvancedQuery() {
        this.isAdvancedQuery = false;
    }
    handleClickSimpleQuery() {
        this.isAdvancedQuery = true;
    }


    loadData(page?: Pagination<any>) {
        this.loading = true;
        this.trainingPlanService.getAllOfPageNew(this.getSearchParams(), page).subscribe(
            trainingPlans => {
                this.trainingPlans = trainingPlans;
                this.loading = false;
            }
        );
    }
    getSearchParams() {
        if (this.searchBy) {
            let params = {};
            params['annualPlanId'] = this.searchBy.annualPlanId;
            params['name'] = this.searchBy.name;
            params['approvalStatus'] = this.searchBy.approvalStatus;
            params['createBy'] = this.searchBy.createBy;
            params['isQuote'] = this.searchBy.isQuote;

            return params;
        }
        return null;
    }

    delete(trainingPlan?: TrainingPlan) {
        this.batchOperate('delete', '删除', trainingPlan, false);
    }

    copy(trainingPlan?: TrainingPlan) {
        this.isVisibleForCopy = true;
        this.copyEntity = trainingPlan;
    }

    commitToApproval(trainingPlan?: TrainingPlan) {
        this.batchOperate('commitToApproval', '提交', trainingPlan, false);
    }

    cancelApproval(trainingPlan?: TrainingPlan) {
        this.batchOperate('cancelApproval', '取消审核', trainingPlan, false);
    }

    private batchOperate(action: string, actionName: string, trainingPlan?: any,
        keepFilter?: boolean, message?: string, operate?: string) {
        let selected = trainingPlan ? [trainingPlan] : this.selection;
        if (!selected || selected.length == 0) {
            tipMessage(`请选择要${actionName}的计划`, 'warning');
            return;
        }
        let selectedArr = selected.map(it => it.approvalStatus);
        let idsArr = selected.map(it => it.id);
        if (action == "commitToApproval") {
            if (selectedArr.includes("A") || selectedArr.includes("P") || selectedArr.includes("C")) {
                tipMessage('只能选择未提交和已拒绝的计划！', 'warning');
                return;
            }
            this.argus = idsArr;
        } else if (action == "delete") {
            this.argus = idsArr;
        } else if (action == "cancelApproval") {
            if (selectedArr.includes("N") || selectedArr.includes("A") || selectedArr.includes("R")
                || selectedArr.includes("C")) {
                tipMessage('只能选择已通过的计划！', 'warning');
                return;
            }
            this.argus = idsArr;
        } else {
            this.argus = selected;
        }
        this.layer.confirm(`确定要${actionName}选择的计划吗？`, () => {
            this.doService(action, actionName);
        });
    }

    showModal = () => {
        let selected = this.selection;
        if (!selected || selected.length == 0) {
            tipMessage('请选择要审核的计划')
            return;
        }
        let selectedArr = this.selection.map(it => it.approvalStatus);
        if (selectedArr.includes("N") || selectedArr.includes("P") || selectedArr.includes("R") || selectedArr.includes("C")) {
            tipMessage('只能选择待审核的计划！');
            return;
        }
        this.isVisible = true;
    }

    handleOk = (e) => {
        this.isVisible = false;
        // 通过
        this.approve(this.selection, this.message, 'P');

    }

    handleCancel = (e) => {
        this.isVisible = false;
    }

    handleNO = (e) => {
        this.isVisible = false;
        // 拒绝
        this.approve(this.selection, this.message, 'R');
    }

    approve(trainingPlan?: any,
        message?: string, operate?: string) {
        let selected = trainingPlan ? [trainingPlan] : this.selection;
        let argusTemp = { selected: null, message: '', operate: '' };
        argusTemp.selected = this.selection;
        argusTemp.message = message;
        argusTemp.operate = operate;
        this.argus = argusTemp;
        this.doService('approve', '审核');
    }

    handleOkForCopy = (e) => {
        this.isVisibleForCopy = false;
        if (this.copyCounts <= 0) {
            tipMessage('只能输入大于0的整数！', 'warning');
            return;
        }
        this.copyEntity.copyCount = this.copyCounts;
        this.trainingPlanService.copy(this.copyEntity).subscribe(
            ok => {
                tipMessage('复制成功', 'success');
                this.loadData();
            },
            err => {
                tipMessage('复制失败');
            }
        );
    }

    handleCancelForCopy = (e) => {
        this.isVisibleForCopy = false;
    }

    handleCancelHsitory = (e) => {
        this.isVisibleHistory = false;
    }

    handleCancelApproval = (e) => {
        this.isVisibleApproval = false;
    }

    showHistory(trainingPlan?: TrainingPlan) {
        this.isVisibleHistory = true;
        this.trainingPlanService.getAllHistoryPlan(trainingPlan.id).subscribe(
            trainingPlanHistorys => this.trainingPlanHistorys = trainingPlanHistorys
        );
    }

    showApprovalInfo(trainingPlan?: TrainingPlan) {
        this.isVisibleApproval = true;
        this.trainingPlanService.getApprovalInfo(trainingPlan.id).subscribe(
            approvalInfos => this.approvalInfos = approvalInfos
        );
    }

    doService(action: string, actionName: string) {
        this.trainingPlanService[action](this.argus).subscribe(
            ok => {
                tipMessage(`${actionName}成功`, 'success');
                this.loadData();
                this.selection = [];
                if (action == 'approve') {
                    this.message = '';
                }
            },
            err => {
                tipMessage(`${actionName}失败`);
                this.selection = [];
            }
        );
    }

    getPath(ug: UserGroup) {
        if (!ug) {
            return null;
        }
        if (ug.parents) {
            return ug.parents.map(it => it.name);
        } else {
            return [ug.name];
        }
    }

    // 点击隐藏 文字
    handleHiddenWord(data) {
        let id = data.id;
        let ids = this.thisId;
        if (ids.indexOf(id) == -1) {
            ids.push(id)
        } else {
            ids.splice(ids.indexOf(id), 1)
        }
    }

}
