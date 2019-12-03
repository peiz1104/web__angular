import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Message } from 'console-ui-ng';
import { AnnualSubPlan } from './../../entity/annualsubplan'
import { OtherPlanService } from './../../service/otherplan.service';
import { ResearchPlanService } from './../../service/researchplan.service';
import { TrainingPlanService } from './../../service/trainingplan.service';
import { TrainingSchoolService } from './../../../trainingschool/service/trainingschool.service';
import { TrainingSchool } from './../../../trainingschool/entity/trainingschool';
import { PersonnelClassification } from './../../../personnel-classification/entity/personnel-classification';
import { PersonnelClassificationService } from './../../../personnel-classification/service/personnel-classification.service';
import { TrainingClassification } from './../../../training-classification/entity/training-classification';
import { TrainingLevel } from './../../../training-level/entity/training-level';
import { AnnualplanService } from './../../service/annualplan.service';
import { AnnualSubPlanService } from './../../service/annualsubplan.service';
import { tipMessage } from 'app/account/entity/message-tip';
import {
    FormBuilder,
    FormGroup,
    Validators,
    FormControl
} from '@angular/forms';
@Component({
    // tslint:disable-next-line:component-selector
    selector: 'app-childrenplan-edit',
    templateUrl: './childrenplan-edit.component.html',
    styleUrls: ['./childrenplan-edit.component.scss']
})
export class ChildrenplanEditComponent implements OnInit {
    init_options = [];
    settingAttibutes: any = [];
    annualPlanId: number; // 年度计划id
    instituteIf: string = 'nohold'; // 是否在研究院举办
    msg: Message[] = [];
    type: string; // 进入单个表单页面
    annualSubPlan: AnnualSubPlan;
    validateInternalTrainingInForm: FormGroup;
    validateInExternalTrainingForm: FormGroup;
    validateOverseasTrainingForm: FormGroup;
    validateResearchDevelopmentCoursewareForm: FormGroup;
    validateOtherForm: FormGroup;
    trainingSchools: TrainingSchool[];
    isFirst: boolean = false
    // 培训经费余额
    trainingBudgetOverage: number;
    // 研发经费余额
    researchBudgetOverage: number;
    periorGroup: number = 0;
    // 提交按钮失效标识
    submitLoading: boolean;

    // 培训名额分配情况
    trainingDistribution: any = [];

    autosize = {
        minRows: 7,
        maxRows: 7
    };
    layoutData = {
        layout1: '8',
        layout2: '12',
        layout3: '4',
    }
    isVisible = false; // modal
    isHidden: boolean = false;
    isVisibleEdit = false;
    // 提交按钮失效标识
    groupFir: any; // 右边每一列的数据
    groupSec: any;
    groupThi: any;
    groupIndex: any = 0; // 默认第一个分组
    groupFirIs: boolean; // 右边显示 添加
    groupSecIs: boolean;
    groupThiIs: boolean;
    isLogSelect: boolean = false;
    inputValue: any = [];
    groupDataLeft: any;
    groupDataRight: any;
    deleteId: any;
    TrainingNumber: any = 0;
    CorrespondingNumber: any = 0;
    totalQuota: any = 0; // 总名额
    remainingQuota: any = 0; // 剩余名额
    groupDataRight_log: any;
    showId: any;
    showType: any;
    pageNumber: number = 0;

    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private fb: FormBuilder,
        private trainingPlanService: TrainingPlanService,
        private researchPlanService: ResearchPlanService,
        private otherPlanService: OtherPlanService,
        private trainingSchoolService: TrainingSchoolService,
        private personnelClassificationService: PersonnelClassificationService,
        private annualPlanService: AnnualplanService,
        private annualSubPlanService: AnnualSubPlanService,
    ) { }

    ngOnInit() {
        this.submitLoading = false;
        let planType = this.activatedRoute.snapshot.params.planType;
        this.type = planType;
        this.activatedRoute.parent.params.subscribe(
            params => {
                this.showId = params.id;
                this.showType = params.planType;
            }
        )
        this.activatedRoute.params.subscribe(
            (params) => {
                this.pageNumber = params.pageNumber;
            }
        )
        this.activatedRoute.data.subscribe((data: { annualSubPlan: AnnualSubPlan }) => {
            this.annualSubPlan = data.annualSubPlan;
            this.annualPlanId = this.annualSubPlan.annualPlan ? this.annualSubPlan.annualPlan.id : this.showId;
            this.trainingDistribution = this.annualSubPlan.quotaAllocation ? this.annualSubPlan.quotaAllocation : [];
        });
        if (this.type == 'CT') {
            this.trainingSchoolService.getAll().subscribe(
                trainingSchools => {
                    this.trainingSchools = trainingSchools;
                }
            );
            this.personnelClassificationService.getAllTrainingSettingAttributes().subscribe(
                settingAttributes => {
                    this.init_options = settingAttributes;
                    if (this.annualSubPlan.personnelClassification) {
                        this.settingAttibutes = [{
                            value: this.annualSubPlan.personnelClassification,
                            label: this.annualSubPlan.personnelClassification.name
                        }, {
                            value: this.annualSubPlan.trainingClassification,
                            label: this.annualSubPlan.trainingClassification.name
                        }, {
                            value: this.annualSubPlan.trainingLevel,
                            label: this.annualSubPlan.trainingLevel.name
                        }];
                    }
                }
            )
        }

        this.annualPlanService.getTrainingBudget(this.annualPlanId).subscribe(
            budget => this.trainingBudgetOverage = budget.trainingBudget
        )
        this.annualPlanService.getResearchBudget(this.annualPlanId).subscribe(
            budget => this.researchBudgetOverage = budget.researchBudget
        )

        this.setDefaultFormData();

    }
    /******************************* modal start **************************/
    handleModal = () => {
        if (this.TrainingNumber > this.CorrespondingNumber) {
            this.annualSubPlanService.getModalGroupLeft().subscribe(
                (budget) => {
                    // console.log(budget, 45464)
                    if (budget.length == 0) {
                        this.groupDataLeft = [];
                        this.clickGroup(0, 'null')
                    } else {
                        this.groupDataLeft = budget;
                        this.clickGroup(0, this.groupDataLeft[0].id)
                    }
                }
            )
            this.isVisible = true;
            const num = this.TrainingNumber - this.CorrespondingNumber
            this.totalQuota = num;
            this.remainingQuota = num;
        } else {
            tipMessage('培训人数必须大于本级人数', 'warning', 3000);
        }
    }

    /* handleOk = (e) => {
        this.trainingDistribution = this.inputValue;
        // 组装表单中名额分配数据
        if (this.trainingDistribution && this.trainingDistribution.length > 0) {
            for (let i = 0; i < this.trainingDistribution.length; i++) {
                this.trainingDistribution[i]['id'] = null;
                this.trainingDistribution[i]['userGroup'].createdDate = null;
                this.trainingDistribution[i]['userGroup'].lastModifiedDate = null;
            }
        }
        this.isVisible = false;
        this.isVisibleEdit = false;
        this.validateInternalTrainingInForm.get('quotaAllocationList').setValue(this.trainingDistribution);
    } */
    handleOk = (e) => {
        this.trainingDistribution = this.inputValue;
        // 组装表单中名额分配数据
        if (this.trainingDistribution && this.trainingDistribution.length > 0) {
            for (let i = 0; i < this.trainingDistribution.length; i++) {
                this.trainingDistribution[i]['id'] = null;
                this.trainingDistribution[i].userGroup.createdDate = null;
                this.trainingDistribution[i].userGroup.lastModifiedDate = null;
                delete this.trainingDistribution[i].userGroup.lastModifiedBy;
                delete this.trainingDistribution[i].userGroup.createdBy;
                delete this.trainingDistribution[i].userGroup.site;
                if (this.trainingDistribution[i].userGroup.parent) {
                    delete this.trainingDistribution[i].userGroup.parent;
                }
                if (this.trainingDistribution[i].userGroup.code) {
                    delete this.trainingDistribution[i].userGroup.childrenCount;
                    delete this.trainingDistribution[i].userGroup.code;
                    delete this.trainingDistribution[i].userGroup.createdBy;
                    delete this.trainingDistribution[i].userGroup.isDeleted;
                    delete this.trainingDistribution[i].userGroup.lastModifiedBy;
                    delete this.trainingDistribution[i].userGroup.regionType;
                    delete this.trainingDistribution[i].userGroup.site;
                }
            }
        }
        this.isVisibleEdit = false;
        this.isVisible = false;
        this.validateInternalTrainingInForm.get('quotaAllocationList').setValue(this.trainingDistribution);
    }

    handleCancel = (e) => {
        this.isVisible = false;
    }
    handleCancels = (e) => {
        this.isVisibleEdit = false;
    }

    // 右边数据
    clickGroup = (index, id) => {
        const num = this.TrainingNumber - this.CorrespondingNumber
        this.totalQuota = num;
        this.remainingQuota = num;
        this.groupIndex = index;
        this.isFirst = false;
        if (id == 'null') {
            this.groupDataRight = [];
            this.isLogSelect = false;
            this.modalData(this.groupDataRight)
        } else {
            this.annualSubPlanService.getModalGroupRight(id).subscribe(
                (budget) => {
                    // console.log(budget, '要处理的数据');
                    if (budget.length > 0) {
                        this.groupDataRight = budget
                    } else {
                        this.groupDataRight = [];
                    }
                    this.isLogSelect = false;
                    this.modalData(this.groupDataRight)
                }
            )
        }
    }

    modalData = (data) => {
        if (data.length <= 0) {
            this.groupFir = [];
            this.groupSec = [];
            this.groupThi = [];
            this.groupFirIs = true;
            this.groupSecIs = false;
            this.groupThiIs = false;
            this.inputValue = [];
            return;
        }
        if (this.isLogSelect) {
            this.groupDataRight_log = data;
        } else {
            this.groupDataRight = data;
        }
        const contentLength = [];
        this.inputValue = [];
        this.deleteId = [];
        console.log(data)
        this.periorGroup = 0;
        for (let i = 0; i < data.length; i++) {
            if (data[i].perior) {
                this.periorGroup++; // 优先组织的个数
            }
            contentLength.push(data[i])
            this.inputValue.push({
                id: data[i].org.id,
                quotaCount: data[i].orderNo,
                userGroup: data[i].org,
                perior: data[i].perior
            })
            this.deleteId.push(data[i].org.id)
        }
        // console.log(this.remainingQuota, '分配完剩余的名额')
        // console.log(this.periorGroup, '优先组织数')
        if (this.isFirst) {
            if (this.periorGroup) {
                // console.log("优先组织")
                if (this.periorGroup >= this.remainingQuota) {
                    for (let i = 0; i < this.remainingQuota; i++) {
                        this.inputValue[i].quotaCount++
                        contentLength[i].orderNo++
                    }
                    this.remainingQuota = 0
                } else if (this.periorGroup < this.remainingQuota) {
                    let parseNum = this.remainingQuota / this.periorGroup
                    let num = parseInt(JSON.stringify(parseNum))
                    let yu = this.remainingQuota % this.periorGroup
                    console.log(yu)
                    console.log(num)
                    for (let i = 0; i < this.periorGroup; i++) {
                        this.inputValue[i].quotaCount = this.inputValue[i].quotaCount + num;
                        contentLength[i].orderNo = contentLength[i].orderNo + num
                    }
                    for (let i = 0; i < yu; i++) {
                        this.inputValue[i].quotaCount = this.inputValue[i].quotaCount + 1;
                        contentLength[i].orderNo = contentLength[i].orderNo + 1;
                    }
                    this.remainingQuota = 0
                }
            } else {
                // console.log("无优先组织")
                for (let i = 0; i < this.remainingQuota; i++) {
                    this.inputValue[i].quotaCount++
                    contentLength[i].orderNo++
                }
                this.remainingQuota = 0
            }
        }
        this.isFirst = true;

        console.log(this.inputValue)
        console.log(contentLength)
        this.groupFir = [];
        this.groupSec = [];
        this.groupThi = [];
        if (contentLength.length < 13) {
            this.groupFir = contentLength;
            this.groupSec = [];
            this.groupThi = [];
            this.groupFirIs = true;
            this.groupSecIs = false;
            this.groupThiIs = false;
        } else if (contentLength.length > 12 && contentLength.length < 25) {
            for (let i = 0; i < 12; i++) {
                this.groupFir.push(contentLength[i])
            }
            for (let i = 12; i < contentLength.length; i++) {
                this.groupSec.push(contentLength[i])
            }
            this.groupFirIs = false;
            this.groupSecIs = true;
            this.groupThiIs = false;
        } else if (contentLength.length > 24) {
            for (let i = 0; i < 12; i++) {
                this.groupFir.push(contentLength[i])
            }
            for (let i = 12; i < 24; i++) {
                this.groupSec.push(contentLength[i])
            }
            for (let i = 24; i < contentLength.length; i++) {
                this.groupThi.push(contentLength[i])
            }
            this.groupFirIs = false;
            this.groupSecIs = false;
            this.groupThiIs = true;
        }
    }
    /* 点击分组 */
    handleClickGroup = (index, id) => {
        this.clickGroup(index, id);
    }

    // 改变 input 值

    changeInput = (e, id) => {

        if (e.target.value < 0) {
            e.target.value = 0;
        }
        let total = [];
        for (let i = 0; i < this.inputValue.length; i++) {
            if (id == this.inputValue[i].id) {
                this.inputValue[i].quotaCount = e.target.value;
            }
            total.push(this.inputValue[i].quotaCount);
        }
        let groupData = [];
        if (this.isLogSelect) {
            groupData = this.groupDataRight_log
        } else {
            groupData = this.groupDataRight;
        }
        // console.log(total, this.groupDataRight_log, this.groupDataRight, 34456)
        // tslint:disable-next-line:no-eval
        let remQuota = this.totalQuota - eval(total.join("+"));
        if (remQuota < 0) {
            for (let i = 0; i < groupData.length; i++) {
                if (groupData[i].org.id == id) {
                    // console.log(this.inputValue[i].quotaCount, remQuota, groupData, 3442)
                    // tslint:disable-next-line:radix
                    e.target.value = parseInt(this.inputValue[i].quotaCount) + remQuota;
                    // tslint:disable-next-line:radix
                    groupData[i].orderNo = parseInt(this.inputValue[i].quotaCount) + remQuota;
                }
            }
            this.isLogSelect = false;
            // console.log(groupData, 33221)
            this.modalData(groupData);
            this.remainingQuota = 0;
            tipMessage('已超总额数', 'warning');
        } else {
            this.remainingQuota = remQuota;
        }

    }

    // 重新分配
    anginchangeInput = (e, id) => {

        if (e.target.value < 0) {
            e.target.value = 0;
        }
        let total = [];
        for (let i = 0; i < this.inputValue.length; i++) {
            if (id == this.inputValue[i].id) {
                this.inputValue[i].quotaCount = e.target.value;
            }
            total.push(this.inputValue[i].quotaCount);
        }
        let groupData = [];
        if (this.isLogSelect) {
            for (let i = 0; i < this.groupDataRight_log.length; i++) {
                // tslint:disable-next-line:radix
                this.groupDataRight_log[i].orderNo = parseInt(total[i])
            }
            groupData = this.groupDataRight_log
        } else {
            for (let i = 0; i < this.groupDataRight.length; i++) {
                // tslint:disable-next-line:radix
                this.groupDataRight[i].orderNo = parseInt(total[i])
            }
            groupData = this.groupDataRight;
        }
        // console.log(total, this.groupDataRight_log, this.groupDataRight, 34456)
        // tslint:disable-next-line:no-eval
        let remQuota = this.totalQuota - eval(total.join("+"));
        if (remQuota < 0) {
            for (let i = 0; i < groupData.length; i++) {
                if (groupData[i].org.id == id) {
                    // console.log(this.inputValue[i].quotaCount, remQuota, groupData, 3442)
                    // tslint:disable-next-line:radix
                    e.target.value = parseInt(this.inputValue[i].quotaCount) + remQuota;
                    // tslint:disable-next-line:radix
                    groupData[i].orderNo = parseInt(this.inputValue[i].quotaCount) + remQuota;
                }
            }
            this.isLogSelect = false;
            // console.log(groupData, 33221)
            this.modalData(groupData);
            this.remainingQuota = 0;
            tipMessage('已超总额数', 'warning');
        } else {
            this.remainingQuota = remQuota;
        }

    }

    // 删除 右边 数据
    handleDelete = (id, num) => {
        let groupData = [];
        if (this.isLogSelect) {
            groupData = this.groupDataRight_log;
        } else {
            groupData = this.groupDataRight;

        }
        for (let i = 0; i < this.inputValue.length; i++) {
            if (id == this.inputValue[i].id) {
                this.inputValue.splice(i, 1)
            }
            if (groupData[i].org.id == id) {
                groupData.splice(i, 1)
            }
        }
        // tslint:disable-next-line:radix
        let number = this.remainingQuota + parseInt(num);
        this.remainingQuota = number;
        this.isLogSelect = false;
        this.isFirst = false;
        this.modalData(groupData)
    }

    // 平均分配
    handleAverageDistribution = () => {
        const length = this.inputValue.length;
        if (length == 0) {
            return;
        }
        if (this.totalQuota < length) {
            tipMessage('总名额小于组织，无法平均分配', 'warning');
        } else {
            const num = Math.floor(this.totalQuota / length);
            let groupData = [];
            if (this.isLogSelect) {
                groupData = this.groupDataRight_log
            } else {
                groupData = this.groupDataRight;
            }
            for (let i = 0; i < groupData.length; i++) {
                groupData[i].orderNo = num;
            }
            this.isLogSelect = false;
            this.remainingQuota = this.totalQuota - length * num;
            this.modalData(groupData);
        }
    }

    unique2 = (data) => {
        let res = [];
        let json = {};
        for (let i = 0; i < data.length; i++) {
            if (!json[data[i].id]) {
                res.push(data[i]);
                json[data[i].id] = 1;
            }
        }
        return res;
    }

    logSelectGroup = (e) => {
        this.isFirst = false;
        let newData = e;
        let newArr = [];
        this.isLogSelect = true;
        for (let i = 0; i < newData.length; i++) {
            newArr.push(
                {
                    id: newData[i].id,
                    orderNo: 0,
                    org: {
                        name: newData[i].name,
                        id: newData[i].id,
                    }
                }
            )
        }
        let groupData = [];
        groupData = this.groupDataRight.concat(newArr);
        let newGroupData = []
        for (let i = 0; i < groupData.length; i++) {
            newGroupData.push({
                id: groupData[i].org.id,
                orderNo: groupData[i].orderNo,
                org: {
                    name: groupData[i].org.name,
                    id: groupData[i].org.id,
                }
            })
        }
        this.modalData(this.unique2(newGroupData));
    }

    handelTrainingNumber = (e) => {
        this.TrainingNumber = e;
    }

    handelCorrespondingNumber = (e) => {
        this.CorrespondingNumber = e;
        let trainingNumber = this.validateInternalTrainingInForm.value.trainingNumber;
        if (e > trainingNumber) {
            this.trainingDistribution = [];
        }
    }

    // 编辑
    handleModalEdit = () => {
        if (this.TrainingNumber > this.CorrespondingNumber) {
            let newData = this.trainingDistribution ? this.trainingDistribution : this.annualSubPlan.quotaAllocation;
            let newArr = [];
            let allocationCount = 0;
            for (let i = 0; i < newData.length; i++) {
                newArr.push(
                    {
                        id: newData[i].trainingPlanId,
                        orderNo: newData[i].quotaCount,
                        org: {
                            name: newData[i].userGroup.name,
                            id: newData[i].userGroup.id,
                        },
                        perior: newData[i].perior
                    }
                )
                // tslint:disable-next-line:radix
                allocationCount += parseInt(newData[i].quotaCount);
            }
            this.groupDataRight = newArr;
            this.modalData(newArr);
            const num = this.TrainingNumber - this.CorrespondingNumber
            this.totalQuota = num;
            this.remainingQuota = num - allocationCount;
            this.isVisibleEdit = true;
        } else {
            tipMessage('培训人数必须大于本级人数', 'warning');
        }


    }
    handelHidden = () => {
        this.isHidden = !this.isHidden;
    }
    /**************************** modal end*****************/

    _submitForm = ($event, type) => { // 表单提交
        $event.preventDefault();
        if (type == 'CT') { // 境内内部培训
            let validateForm = this.validateInternalTrainingInForm;
            let correspondingNumber = this.validateInternalTrainingInForm.controls['correspondingNumber'];
            // tslint:disable-next-line:forin
            for (const key in validateForm.controls) {
                if (key == "correspondingNumber" && correspondingNumber.errors) {
                    if (correspondingNumber.errors.confirm == false && correspondingNumber.errors.error == false) {
                        validateForm.controls[key].setErrors(null);
                    }
                } else {
                    validateForm.controls[key].markAsDirty();
                }
            }
            if (validateForm.valid) {

                let personnelClassification = new PersonnelClassification();
                personnelClassification.id = validateForm.value.personnelClassificationId;
                validateForm.value.personnelClassification = personnelClassification;
                if (validateForm.value.trainingClassificationId != null) {
                    let trainingClassification = new TrainingClassification();
                    trainingClassification.id = validateForm.value.trainingClassificationId;
                    validateForm.value.trainingClassification = trainingClassification;
                }
                if (validateForm.value.trainingLevelId != null) {
                    let trainingLevel = new TrainingLevel();
                    trainingLevel.id = validateForm.value.trainingLevelId;
                    validateForm.value.trainingLevel = trainingLevel;
                }
                if (validateForm.value.settingAttibutes.length == 0) {
                    return tipMessage('请选择培训级别！');
                }
                this.doSubmit(validateForm.value, 'CT');
            } else {
                tipMessage('请完成所有必填项的输入！');
            }
        } else if (type == 'CD') { // 境内外部培训
            let validateForm = this.validateInExternalTrainingForm;
            // tslint:disable-next-line:forin
            for (const key in validateForm.controls) {
                validateForm.controls[key].markAsDirty();
            }
            if (validateForm.valid) {
                this.doSubmit(validateForm.value, 'CD');
            } else {
                // 境内外部培训表单校验失败
                tipMessage('请完成所有必填项的输入！', 'warning');
            }
        } else if (type == 'OT' || type == 'OD') { // 境外培训
            let validateForm = this.validateOverseasTrainingForm;
            // tslint:disable-next-line:forin
            for (const key in validateForm.controls) {
                validateForm.controls[key].markAsDirty();
            }
            if (validateForm.valid) {
                this.doSubmit(validateForm.value, 'OT');
            } else {
                // 境外培训表单校验失败
                tipMessage('请完成所有必填项的输入！', 'warning');
            }
        } else if (type == 'RE') { // 课件研发
            let validateForm = this.validateResearchDevelopmentCoursewareForm;
            // tslint:disable-next-line:forin
            for (const key in validateForm.controls) {
                validateForm.controls[key].markAsDirty();
            }
            if (validateForm.valid) {
                this.doSubmit(validateForm.value, 'RE');
            } else {
                // 课件研发表单校验失败
                tipMessage('请完成所有必填项的输入！', 'warning', 5000);
            }
        } else if (type == 'EL') { // 其他
            let validateForm = this.validateOtherForm;
            // tslint:disable-next-line:forin
            for (const key in validateForm.controls) {
                validateForm.controls[key].markAsDirty();
            }
            if (validateForm.valid) {
                this.doSubmit(validateForm.value, 'EL');
            } else {
                // 其他表单校验失败
                tipMessage('请完成所有必填项的输入！', 'warning', 5000);
            }
        }
    };
    _resetForm() { // 重置表单
        if (this.validateInternalTrainingInForm) {
            this.validateInternalTrainingInForm.reset();
            // tslint:disable-next-line:forin
            for (const key in this.validateInternalTrainingInForm.controls) {
                this.validateInternalTrainingInForm.controls[key].markAsPristine();
            }
        }
        if (this.validateInExternalTrainingForm) {
            this.validateInExternalTrainingForm.reset();
            // tslint:disable-next-line:forin
            for (const key in this.validateInExternalTrainingForm.controls) {
                this.validateInExternalTrainingForm.controls[key].markAsPristine();
            }
        }
        if (this.validateOverseasTrainingForm) {
            this.validateOverseasTrainingForm.reset();
            // tslint:disable-next-line:forin
            for (const key in this.validateOverseasTrainingForm.controls) {
                this.validateOverseasTrainingForm.controls[key].markAsPristine();
            }
        }
        if (this.validateResearchDevelopmentCoursewareForm) {
            this.validateResearchDevelopmentCoursewareForm.reset();
            // tslint:disable-next-line:forin
            for (const key in this.validateResearchDevelopmentCoursewareForm.controls) {
                this.validateResearchDevelopmentCoursewareForm.controls[key].markAsPristine();
            }
        }
        if (this.validateOtherForm) {
            this.validateOtherForm.reset();
            // tslint:disable-next-line:forin
            for (const key in this.validateOtherForm.controls) {
                this.validateOtherForm.controls[key].markAsPristine();
            }
        }
        this.setDefaultFormData();

    }


    setDefaultFormData() { //  设置表单数据初始化
        this.TrainingNumber = this.annualSubPlan.trainingNumber;
        this.CorrespondingNumber = this.annualSubPlan.correspondingNumber;
        if (this.type == 'CT') {
            this.validateInternalTrainingInForm = this.fb.group({
                projectNumber: [this.annualSubPlan.projectNumber, [Validators.required]],
                name: [this.annualSubPlan.name, [Validators.required]],
                trainingDate: [this.annualSubPlan.trainingDate, [Validators.required]],
                trainingPlace: [this.annualSubPlan.trainingPlace],
                trainingDays: [this.annualSubPlan.trainingDays, [Validators.required]],
                trainingNumber: [this.annualSubPlan.trainingNumber, [this.JoinNumber]],
                correspondingNumber: [this.annualSubPlan.correspondingNumber, [this.correspondingNumberValidator]],
                trainingObject: [this.annualSubPlan.trainingObject, [Validators.required]],
                // tslint:disable-next-line:max-line-length
                personnelClassificationId: [this.annualSubPlan.personnelClassification == null ? '' : this.annualSubPlan.personnelClassification.id, [Validators.required]],
                trainingClassificationId: [this.annualSubPlan.trainingClassification == null ? '' : this.annualSubPlan.trainingClassification.id, [Validators.required]],
                // tslint:disable-next-line:max-line-length
                trainingLevelId: [this.annualSubPlan.trainingLevel == null ? '' : this.annualSubPlan.trainingLevel.id, [Validators.required]],
                trainingCostPer: [this.annualSubPlan.trainingCostPer, [Validators.required]],
                lectuerTransportationFee: [this.annualSubPlan.lectuerTransportationFee],
                lectuerBoard: [this.annualSubPlan.lectuerBoard],
                outsideLectuerPretaxFee: [this.annualSubPlan.outsideLectuerPretaxFee],
                commission: [this.annualSubPlan.commission],
                wages: [this.annualSubPlan.wages],
                otherCosts: [this.annualSubPlan.otherCosts],
                trafficFee: [this.annualSubPlan.trafficFee, [Validators.required]],
                trafficFeeLower: [this.annualSubPlan.trafficFeeLower ? this.annualSubPlan.trafficFeeLower : 0],
                trainingBudget: [this.annualSubPlan.trainingBudget, [Validators.required]],
                expenseLevel: [this.annualSubPlan.expenseLevel],
                expenseLower: [this.annualSubPlan.expenseLower],
                trainingContent: [this.annualSubPlan.trainingContent, [Validators.required]],
                remark: [this.annualSubPlan.remark],
                isTrainingSchoolPlan: [this.annualSubPlan.isTrainingSchoolPlan == null ? false : this.annualSubPlan.isTrainingSchoolPlan],
                quotaAllocationList: [this.annualSubPlan.quotaAllocation],
                // tslint:disable-next-line:max-line-length
                settingAttibutes: [this.settingAttibutes]
            });
            if (this.annualSubPlan.isTrainingSchoolPlan && this.annualSubPlan.isTrainingSchoolPlan == true) {
                this.instituteIf = 'hold';
                this.validateInternalTrainingInForm.get('trainingPlace').setValue(this.annualSubPlan.trainingSchool.id + '');
                this.validateInternalTrainingInForm.get('isTrainingSchoolPlan').setValue(this.annualSubPlan.isTrainingSchoolPlan);
            }
        } else if (this.type == 'CD') {
            this.validateInExternalTrainingForm = this.fb.group({
                projectNumber: [this.annualSubPlan.projectNumber, [Validators.required]],
                name: [this.annualSubPlan.name, [Validators.required]],
                trainingDate: [this.annualSubPlan.trainingDate, [Validators.required]],
                trainingPlace: [this.annualSubPlan.trainingPlace],
                trainingDays: [this.annualSubPlan.trainingDays, [Validators.required]],
                trainingNumber: [this.annualSubPlan.trainingNumber, [Validators.required]],
                trainingObject: [this.annualSubPlan.trainingObject, [Validators.required]],
                trafficFee: [this.annualSubPlan.trafficFee],
                trainingCostPer: [this.annualSubPlan.trainingCostPer, [Validators.required]],
                trainingBudget: [this.annualSubPlan.trainingBudget, [Validators.required]],
                trainingContent: [this.annualSubPlan.trainingContent, [Validators.required]],
                remark: [this.annualSubPlan.remark],
                isTrainingSchoolPlan: [false]
            });
        } else if (this.type == 'OT' || this.type == 'OD') {
            this.validateOverseasTrainingForm = this.fb.group({
                projectNumber: [this.annualSubPlan.projectNumber, [Validators.required]],
                name: [this.annualSubPlan.name, [Validators.required]],
                trainingDate: [this.annualSubPlan.trainingDate, [Validators.required]],
                trainingPlace: [this.annualSubPlan.trainingPlace],
                trainingDays: [this.annualSubPlan.trainingDays, [Validators.required]],
                trainingNumber: [this.annualSubPlan.trainingNumber, [Validators.required]],
                trainingObject: [this.annualSubPlan.trainingObject, [Validators.required]],
                planType: [this.annualSubPlan.planType, [Validators.required]],
                trainingCostPer: [this.annualSubPlan.trainingCostPer, [Validators.required]],
                trafficFee: [this.annualSubPlan.trafficFee, [Validators.required]],
                trainingBudget: [this.annualSubPlan.trainingBudget, [Validators.required]],
                trainingContent: [this.annualSubPlan.trainingContent, [Validators.required]],
                remark: [this.annualSubPlan.remark],
                isTrainingSchoolPlan: [false]
            });
        } else if (this.type == 'RE') {
            this.validateResearchDevelopmentCoursewareForm = this.fb.group({
                projectNumber: [this.annualSubPlan.projectNumber, [Validators.required]],
                name: [this.annualSubPlan.name, [Validators.required]],
                trainingDate: [this.annualSubPlan.trainingDate, [Validators.required]],
                trainingPlace: [this.annualSubPlan.trainingPlace],
                trainingDays: [this.annualSubPlan.trainingDays, [Validators.required]],
                trainingNumber: [this.annualSubPlan.trainingNumber, [Validators.required]],
                meetingCosts: [this.annualSubPlan.meetingCosts, [Validators.required]],
                researchCost: [this.annualSubPlan.researchCost, [Validators.required]],
                transportCosts: [this.annualSubPlan.transportCosts, [Validators.required]],
                trainingBudget: [this.annualSubPlan.trainingBudget, [Validators.required]],
                researchContent: [this.annualSubPlan.researchContent, [Validators.required]],
                remark: [this.annualSubPlan.remark]
            });
        } else if (this.type == 'EL') {
            this.validateOtherForm = this.fb.group({
                projectNumber: [this.annualSubPlan.projectNumber, [Validators.required]],
                name: [this.annualSubPlan.name, [Validators.required]],
                category: [this.annualSubPlan.category, [Validators.required]],
                trainingBudget: [this.annualSubPlan.trainingBudget, [Validators.required]],
                isTrainingBudget: [this.annualSubPlan.isTrainingBudget],
                trainingContent: [this.annualSubPlan.trainingContent, [Validators.required]],
                remark: [this.annualSubPlan.remark]
            });
        }

    }

    correspondingNumberValidator = (control: FormControl): { [s: string]: boolean } => {
        let value = control.value;
        if (control.parent && control.parent.value) {
            if (value > this.validateInternalTrainingInForm.controls['trainingNumber'].value) {
                return { confirm: true, error: true };
            } else {
                return { confirm: false, error: false };
            }
        }
    };
    JoinNumber = (control: FormControl): any => { // 校验 correspondingNumber<=trainingNumber
        let value = control.value;
        if (control.parent && control.parent.value) {
            let correspondingNumber = this.validateInternalTrainingInForm.controls['correspondingNumber'];
            if (correspondingNumber.errors) {
                if (correspondingNumber.value <= value) {
                    correspondingNumber.setErrors({
                        confirm: false,
                        error: false
                    });
                } else {
                    correspondingNumber.setErrors({
                        confirm: true,
                        error: true
                    });
                }
            }
        }
    };

    doSubmit(event, type) {
        this.submitLoading = true;
        event.id = this.annualSubPlan.id;
        event.annualId = this.annualPlanId;
        let service = null;
        if (type == 'RE') {
            service = this.researchPlanService;
        } else if (type == 'EL') {
            service = this.otherPlanService;
        } else {
            service = this.trainingPlanService;
        }
        service.save(event).subscribe(
            c => {
                if (c.isFinish) {
                    tipMessage(c.mes, 'success');
                    this.toList();
                } else {
                    tipMessage(c.mes);
                    this.submitLoading = false;
                }
            },
            e => {
                this.msg = e;
                this.submitLoading = false;
            }
        );
    }

    toList() {
        this.router.navigate(['../../../../'], { queryParams: { pageNumber: this.pageNumber }, relativeTo: this.activatedRoute });
    }

    _console(value) {
        // this.instituteIf = value ? 'hold' : 'nohold';
        if (value == true) {
            this.instituteIf = 'hold';
        } else {
            this.instituteIf = 'nohold';
            this.validateInternalTrainingInForm.get('trainingPlace').setValue('');
        }
        this.instituteIf = value ? 'hold' : 'nohold';
    }

    // 计算境内内部培训计划经费
    evaluateTrainingBudget() {
        // 培训人数
        let trainingNumber = this.validateInternalTrainingInForm.value.trainingNumber;
        // 本级人数
        let correspondingNumber = this.validateInternalTrainingInForm.value.correspondingNumber;
        // 培训天数
        let trainingDays = this.validateInternalTrainingInForm.value.trainingDays;
        // 培训经费标准
        let trainingCostPer = this.validateInternalTrainingInForm.value.trainingCostPer;
        // 讲师交通费
        let lectuerTransportationFee = this.validateInternalTrainingInForm.value.lectuerTransportationFee;
        // 本级交通费
        let trafficFee = this.validateInternalTrainingInForm.value.trafficFee;
        // 其它费用
        let otherCosts = this.validateInternalTrainingInForm.value.otherCosts;
        // 讲师食宿
        let lectuerBoard = this.validateInternalTrainingInForm.value.lectuerBoard;
        // 外部讲师税前授课费
        let outsideLectuerPretaxFee = this.validateInternalTrainingInForm.value.outsideLectuerPretaxFee;
        // 佣金
        let commission = this.validateInternalTrainingInForm.value.commission;
        // 计算获得培训总预算
        let trainingBudget = trainingNumber * trainingDays * trainingCostPer +
            lectuerTransportationFee + trafficFee + otherCosts + lectuerBoard + outsideLectuerPretaxFee +
            commission;
        this.validateInternalTrainingInForm.get('trainingBudget').setValue(trainingBudget.toFixed(2));
        if (trainingNumber != 0) {
            // 本级公司承担费用
            let expenseLevel = (trainingBudget - trafficFee) / trainingNumber * correspondingNumber + trafficFee;
            expenseLevel = Math.round(expenseLevel * 100) / 100;
            this.validateInternalTrainingInForm.get('expenseLevel').setValue(expenseLevel.toFixed(2));
            // 下级公司承担费用
            let expenseLower = trainingBudget - expenseLevel;
            this.validateInternalTrainingInForm.get('expenseLower').setValue(expenseLower.toFixed(2));
        }

    }

    evaluateExpenseLower() {
        // 培训经费预算
        let trainingBudget = this.validateInternalTrainingInForm.value.trainingBudget;
        let expenseLevel = this.validateInternalTrainingInForm.value.expenseLevel;
        let expenseLower = this.validateInternalTrainingInForm.value.expenseLower;
        if (expenseLevel > trainingBudget) {
            tipMessage('本级公司承担费用不能超出培训经费预算', 'warning', 3000);
            this.validateInternalTrainingInForm.get('expenseLevel').setValue((trainingBudget - expenseLower).toFixed(2));
            return;
        }
        this.validateInternalTrainingInForm.get('expenseLevel').setValue(expenseLevel.toFixed(2));
        this.validateInternalTrainingInForm.get('expenseLower').setValue((trainingBudget - expenseLevel).toFixed(2));
    }

    evaluateExpenseLevel() {
        // 培训经费预算
        let trainingBudget = this.validateInternalTrainingInForm.value.trainingBudget;
        let expenseLevel = this.validateInternalTrainingInForm.value.expenseLevel;
        let expenseLower = this.validateInternalTrainingInForm.value.expenseLower;
        if (expenseLower > trainingBudget) {
            tipMessage('下级公司承担费用不能超出培训经费预算', 'warning', 5000);
            this.validateInternalTrainingInForm.get('expenseLower').setValue((trainingBudget - expenseLevel).toFixed(2));
            return;
        }
        this.validateInternalTrainingInForm.get('expenseLevel').setValue((trainingBudget - expenseLower).toFixed(2));
        this.validateInternalTrainingInForm.get('expenseLower').setValue(expenseLower.toFixed(2));
    }

    // 计算境内外部培训计划经费
    evaluateTrainingBudgetCD() {
        // 培训人数
        let trainingNumber = this.validateInExternalTrainingForm.value.trainingNumber;
        // 培训天数
        let trainingDays = this.validateInExternalTrainingForm.value.trainingDays;
        // 培训经费标准
        let trainingCostPer = this.validateInExternalTrainingForm.value.trainingCostPer;
        // 本级交通费
        let trafficFee = this.validateInExternalTrainingForm.value.trafficFee;
        // 计算获得培训总预算
        let trainingBudget = trainingNumber * trainingDays * trainingCostPer + trafficFee;
        this.validateInExternalTrainingForm.get('trainingBudget').setValue(trainingBudget.toFixed(2));
    }

    // 计算境外培训计划经费
    evaluateTrainingBudgetOTOD() {
        // 培训人数
        let trainingNumber = this.validateOverseasTrainingForm.value.trainingNumber;
        // 培训天数
        let trainingDays = this.validateOverseasTrainingForm.value.trainingDays;
        // 培训经费标准
        let trainingCostPer = this.validateOverseasTrainingForm.value.trainingCostPer;
        // 本级交通费
        let trafficFee = this.validateOverseasTrainingForm.value.trafficFee;
        // 计算获得培训总预算
        let trainingBudget = trainingNumber * trainingDays * trainingCostPer + trafficFee;
        this.validateOverseasTrainingForm.get('trainingBudget').setValue(trainingBudget.toFixed(2));
    }

    setAttibutes(value) {
        if (value != null && value.length > 0) {
            this.validateInternalTrainingInForm.get("personnelClassificationId").setValue(value[0]);
            this.validateInternalTrainingInForm.get("trainingClassificationId").setValue(value[1]);
            this.validateInternalTrainingInForm.get("trainingLevelId").setValue(value[2]);
        }
    }

}
