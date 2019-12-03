import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { CuiPagination, CuiLayer } from 'console-ui-ng';
import { tipMessage } from 'app/account/entity/message-tip';

@Component({
    selector: 'spk-training-class-train-course',
    templateUrl: './training-class-train-course.component.html',
    styleUrls: ['./training-class-train-course.component.scss']
})
export class TrainingClassTrainCourseComponent implements OnInit {
    // 培训班课程列表页
    pagination: CuiPagination;
    _searchForm: FormGroup;
    selection: any[] = [];
    columns: any = [
        { title: '缩略图', tpl: 'examName', styleClass: 'text-center' },
        { title: '名称/日期', tpl: 'budget', styleClass: 'text-center' },
        { title: '学习方式/学时', tpl: 'GroupName', styleClass: 'text-center' },
        { title: '授权方式', tpl: 'paperName', styleClass: 'text-center' },
        { title: '操作', tpl: 'examId', styleClass: 'text-center', style: { width: '320px', 'max-width': '320px' } }
    ];
    columnsData: any[] = [
        {
            examName: '10.22课程体系',
            budget: '在线课程',
            GroupName: '所有终端',
            paperName: '10.5',
            startTime: '1510823762000',
            enterExamTime: '1510823762000',
            createdUserName: 'EMST-H-RR-Z-015',
            createdDate: '授权课程',
            ifAllow: 'T',
            examId: '2131',
        }, {
            examName: '10.22课体系',
            budget: '在线课程',
            GroupName: '所有终端',
            paperName: '10.5',
            startTime: '1510823762000',
            enterExamTime: '1510823762000',
            createdUserName: 'EMST-H-RR-Z-015',
            createdDate: '授权课程',
            ifAllow: 'F',
            examId: '2131',
        }, {
            examName: '10.22课程体',
            budget: '在线课程',
            GroupName: '所有终端',
            paperName: '10.5',
            startTime: '1510823762000',
            enterExamTime: '1510823762000',
            createdUserName: 'EMST-H-RR-Z-015',
            createdDate: '非授权课程',
            ifAllow: 'F',
            examId: '2131',
        }
    ];
    // Model 体系添加课程列表页
    selectCourse: boolean = false;
    courseLoading: boolean = false;
    loading: boolean;
    coursePagin: CuiPagination;
    courseSwitch: string;
    courseSelection: any[] = [];
    courseColumns: any = [
        { title: '缩略图', tpl: 'examName', styleClass: 'text-center' },
        { title: '名称/日期', tpl: 'budget', styleClass: 'text-center' },
        { title: '学习方式/学时', tpl: 'GroupName', styleClass: 'text-center' },
        { title: '操作', tpl: 'examId', styleClass: 'text-center' }
    ];
    courseColumnsData: any[] = [
        {
            examName: '10.22课程体系',
            budget: '在线课程',
            GroupName: '所有终端',
            paperName: '10.5',
            startTime: '1510823762000',
            enterExamTime: '1510823762000',
            examId: '2131',
        }, {
            examName: '10.22课体系',
            budget: '在线课程',
            GroupName: '所有终端',
            paperName: '10.5',
            startTime: '1510823762000',
            enterExamTime: '1510823762000',
            examId: '2131',
        }, {
            examName: '10.22课程体',
            budget: '在线课程',
            GroupName: '所有终端',
            paperName: '10.5',
            startTime: '1510823762000',
            enterExamTime: '1510823762000',
            examId: '2131',
        }
    ];
    // 弹出层导入课程步骤条model
    LeadingCourse: boolean = false;
    stepNumber: number = 0; // 步骤条数
    validateForm: FormGroup;
    leadPagination: CuiPagination;
    leadSelection: any[] = [];
    leadLoading: boolean = false;
    leadSelectFile: string;
    leadProgress: number = 30;
    trainingName: string;
    leadColumns: any = [
        { title: '课程名称', data: 'examName', styleClass: 'text-center', style: { width: '320px', 'max-width': '320px' } },
        { title: '授权码', data: 'budget', styleClass: 'text-center' },
        { title: '学分', data: 'GroupName', styleClass: 'text-center' },
        { title: '学时', data: 'paperName', styleClass: 'text-center' },
        { title: '操作', tpl: 'examId', styleClass: 'text-center' }
    ];
    leadColumnsData: any[] = [
        {
            examName: '10.22课程体系',
            budget: 'EMST-H-RR-Z-015',
            GroupName: '10.5',
            paperName: '4',
            examId: '2131',
        }, {
            examName: '10.22课程体系',
            budget: 'EMST-H-RR-Z-015',
            GroupName: '13.5',
            paperName: '4',
            examId: '2133',
        }, {
            examName: '10.22课程体系',
            budget: 'EMST-H-RR-Z-015',
            GroupName: '6.5',
            paperName: '4',
            examId: '21315',
        }
    ];
    constructor(private fb: FormBuilder, private router: Router, private route: ActivatedRoute) { }

    ngOnInit() {
        this._searchForm = this.fb.group({
            examName: [], // 考试名称
            selectedOption: ['XFS'], // 学习方式
        });
        this.route.data.subscribe(
            (obj: { trainingClass: any }) => {
                this.trainingName = obj.trainingClass.name;
            }
        );
        this.loadData();
    }
    loadData(page?: CuiPagination) {
        // this.loading = true;
        this.pagination = page;
        // this.loading = false;
    }
    _submitForm($event, value) {
        $event.preventDefault();
        // this.switchExam = value;
        this.loadData();
    }
    resetForm($event: MouseEvent) {
        $event.preventDefault();
        this._searchForm.reset();
    }
    // Model 体系添加课程列表页
    showCourseModule() {
        this.selectCourse = true;
        // this.courseLoadData();
    }
    courseLoadData(page?: CuiPagination) {
        this.courseLoading = true;
        this.coursePagin = page;
    }
    handleCancelCourse(event) {
        this.selectCourse = false;
    }
    selectUserGroup(groupData) {
        console.log(groupData);
    }
    sublimtPerson(event) {
        this.selectCourse = false;
    }
    // 弹出层导入课程步骤条model
    loadLeadData() {
        this.validateForm = this.fb.group({
            category: ['前端开发', [Validators.required]], // 所属分类
            organisation: ['通明教育', [Validators.required]], // 所属组织
            fileImg: ['assets/images/logo.jpg', [Validators.required]] // 默认图片
        });
    }
    leadLoadData(page?: CuiPagination) {
        this.leadLoading = true;
        this.leadPagination = page;
    }
    leadingCourseModel() {
        this.loadLeadData();
        this.LeadingCourse = true;
    }
    handleCancelLeadCourse(event) {
        this.LeadingCourse = false;
    }
    previousStep() {
        this.stepNumber = --this.stepNumber;
    }
    nextStep(num: number) {
        if (num == 1) {
            // tslint:disable-next-line:forin
            for (const i in this.validateForm.controls) {
                this.validateForm.controls[i].markAsDirty();
            }
            if (!this.validateForm.valid) {
                tipMessage('表单验证不通过！');
                return;
            }
        }
        this.stepNumber = ++this.stepNumber;
    }
    doneStep() {
        console.log(this.stepNumber);
    }
    cancelStep() {
        this.LeadingCourse = false;
    }
}
