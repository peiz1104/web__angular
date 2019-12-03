import { Component, OnInit, Input } from '@angular/core';
import { Column } from 'console-ui-ng';
import { Pagination } from 'app/core';
import { AuthService } from 'app/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormGroup, FormBuilder } from '@angular/forms';
import { CourseTeacherService } from './../../../../learning/course/service/course-teacher.service';
import { TrainingClassApiService } from './../../../service/training-class-api.service';
import { fail } from 'assert';
import { tipMessage } from '../../../../account/entity/message-tip';
@Component({
    selector: 'spk-train-class-evaluation',
    templateUrl: './train-class-evaluation.component.html',
    styleUrls: ['./train-class-evaluation.component.scss']
})
export class TrainClassEvaluationComponent implements OnInit {
    @Input() traingId: any;
    curriculumData: any;
    teacherData: any = [];
    trainingClassData: any = [];
    isCurriculumIng: boolean = false;
    isTrainingClass: boolean = false;
    isTeacher: boolean = false;
    index: any = 0;
    total: number = 10;
    totalTeacher: number;
    inputValue: any
    dat: any;
    loadin: boolean = false;
    selectio: any;
    isVisible: boolean = false;
    courseId: number;
    teacherId: number;
    teacherIndex: number = 1;
    courseIndex: number = 1;
    isLoadingOne: boolean = false;
    userGroupId:any;
    searchBy: {
        teacherNo?: any,
        displayName?: any,
        teacherType?: any,
        publishStatus?: any,
        rank?: any,
        userGroupId?: any,
        classHourD?: any,
        classHourH?: any,
        courseId?: any,
        ageOne?: any,
        ageTwo?: any,
        yearOne?: any,
        yearTwo?: any,
        userName?: any;
    } = {};
    _searchForm: FormGroup;
    column: Column[] = [
        { title: '讲师编号', data: 'teacherNo', styleClass: 'text-left' },
        { title: '讲师工号', data: 'username', styleClass: 'text-left' },
        { title: '讲师姓名', data: 'name', styleClass: 'text-left' },
        { title: '性别', tpl: 'sex', styleClass: 'text-center' },
        { title: '所属机构', tpl: 'group', styleClass: 'text-left' },
        { title: '讲师类型', tpl: 'type', styleClass: 'text-center' },
        { title: '讲师级别', tpl: 'rank', styleClass: 'text-center' },
        { title: '累计课时量', data: 'classHour', styleClass: 'text-center' },
        /* { title: '发布状态', tpl: 'isPost', styleClass: 'text-center' },
        { title: '查看授权', tpl: 'look', styleClass: 'text-center' },
        { title: '授权', tpl: 'actions', styleClass: 'text-center' }, */
    ];

    constructor(
        private apiservice: TrainingClassApiService,
        private teacherService: CourseTeacherService,
        private traingapiServer: AuthService,
        private fb: FormBuilder,
    ) { }

    ngOnInit() {
      this.initSearchForm();
        this.trainingClassEvaluation()
        this.traingapiServer.getCurrentUser().subscribe(
            user => {
                if (user.managerGroup) {
                    this.searchBy.userGroupId = user.managerGroup;
                    this.userGroupId = user.managerGroup;
                    this._searchForm.get('userGroupId').setValue([user.managerGroup])
                }
                if (!user.managerGroup) {
                    this.searchBy.userGroupId = user.userGroup;
                    this.userGroupId = user.userGroup;
                    this._searchForm.get('userGroupId').setValue([user.userGroup])
                }
            }
        )
        // this.authService.getCurrentUser().subscribe(
        //     user => {
        //         if (user.managerGroup) {
        //             this.teacher.userGroupId = user.managerGroup;
        //             this._searchForm.get('userGroupId').setValue([user.managerGroup])
        //         }
        //         if (!user.managerGroup) {
        //             this.teacher.userGroupId = user.userGroup;
        //             this._searchForm.get('userGroupId').setValue([user.userGroup])
        //         }
        //         this.loadData();
        //     }
        // )
    }
    initSearchForm() {
        this._searchForm = this.fb.group({
            userName: [],
            displayName: [],
            userGroupId: [],
        });
    }
    // 培训班接口
    trainingClassEvaluation = () => {
        this.isTrainingClass = true;
        let data = {
            classId: this.traingId
        }
        this.apiservice.trainingClassEvaluation(data).subscribe(
            res => {

                this.curriculumData = res.offeringAssess;
                this.isTrainingClass = false;
            },
            err => {
                this.isTrainingClass = true;
            }
        )
    }
    handelGenerationEvaluation = () => {
        this.isLoadingOne = true;
        let data = {
            classId: this.traingId
        }
        this.apiservice.GenerationEvaluation(data).subscribe(
            res => {
                let e = this.index;
                if (e == 0) {
                    this.trainingClassEvaluation()
                } else if (e == 1) {
                    this.teacherIndex = 1;
                    let data = {
                        page: this.teacherIndex - 1,
                        size: 10,
                        classId: this.traingId
                    }
                    this.teacherEvaluation(data)
                } else if (e == 2) {
                    this.courseIndex = 1;
                    let data = {
                        page: this.courseIndex - 1,
                        size: 10,
                        classId: this.traingId
                    }
                    this.curriculumEvaluation(data)
                }
                this.isLoadingOne = false;
            },
            err => {
                this.isVisible = false;
            }
        )
    }
    // 调换接口
    exchange = (data) => {
        this.apiservice.exchange(data).subscribe(
            res => {
                this.isVisible = false;
                let dat = {
                    page: 0,
                    size: 10,
                    classId: this.traingId
                }
                this.teacherEvaluation(dat)
            },
            err => {
                this.isVisible = false;
            }
        )
    }
    loadDat(page?: Pagination<any>) {
        this.loadin = true;
        let params = {
            page: page ? page.number : 0,
            size: page ? page.size : 10,

        };
        if (this.searchBy.displayName) {
            params['displayName'] = this.searchBy.displayName;
        }
        if (this.searchBy.userName) {
            params['userName'] = this.searchBy.userName;
        }
        params['courseId'] = this.courseId;
        if (this.searchBy.userGroupId) {
            if (Object.prototype.toString.call(this.searchBy.userGroupId) == "[object Object]") {
                params['userGroupId'] = this.searchBy.userGroupId.id;
            } else {
                if (this.searchBy.userGroupId[0] && this.searchBy.userGroupId[0].id) {
                    params['userGroupId'] = this.searchBy.userGroupId.id;
                } else {
                    params['userGroupId'] = this.searchBy.userGroupId.id;
                }
            }
        };
        this.teacherService.pageList(params).subscribe(
            data => {
                this.dat = data
                this.loadin = false;
            },
            err => {
                this.loadin = false;
            }
        );
    }

    handleOk = (e) => {
        if(!this.selectio.length) {
            return tipMessage('请选择讲师')
        }
        let data = {
            courseId: this.courseId,
            oriTeacherId: this.teacherId,
            excTeacherId: this.selectio[0].id
        }
        this.exchange(data)
    }
    _console = (e) => {
        this.inputValue = e
    }
    handelSearch = (e, value) => {
        this.searchBy.displayName = value.displayName;
        this.searchBy.userGroupId = value.userGroupId;
        this.searchBy.userName = value.userName;
        this.userGroupId = value.userGroupId;
        this.inputValue = value.displayName;
        this.loadDat();
    }
    handleCancel = (e) => {
        this.isVisible = false;
    }

    // 课程接口
    curriculumEvaluation = (data) => {
        this.isCurriculumIng = true;
        this.apiservice.curriculumEvaluation(data).subscribe(
            res => {
                this.trainingClassData = res.content;
                this.total = res.totalElements;
                this.isCurriculumIng = false;
            },
            err => {
                this.isCurriculumIng = true;
            }
        )
    }
    // 讲师接口
    teacherEvaluation = (data) => {
        this.isTeacher = true;
        this.apiservice.teacherEvaluation(data).subscribe(
            res => {
                this.teacherData = res.content;
                this.totalTeacher = res.totalElements;
                this.isTeacher = false;
            },
            err => {
                this.isTeacher = true;
            }
        )
    }

    // 当前 选项卡
    handelSelectedIndexChange = (e) => {
        this.index = e
        if (e == 0) {
            this.trainingClassEvaluation()
        } else if (e == 1) {
            this.teacherIndex = 1;
            let data = {
                page: this.teacherIndex - 1,
                size: 10,
                classId: this.traingId
            }
            this.teacherEvaluation(data)
        } else if (e == 2) {
            this.courseIndex = 1;
            let data = {
                page: this.courseIndex - 1,
                size: 10,
                classId: this.traingId
            }
            this.curriculumEvaluation(data)
        }
    }
    isLvs(row) {
        if (row.teacherType == 'FULLTIME') {
            if (row.rank == 'PREPARATORY') {
                return '预备讲师';
            } else if (row.rank == 'ASSISTANT') {
                return '助理讲师';
            } else if (row.rank == 'LECTURER') {
                return '中级讲师';
            } else {
                return '高级讲师';
            }
        } else if (row.teacherType == 'PARTTIME') {
            if (row.rank == 'JUNIOR') {
                return '初级讲师';
            } else if (row.rank == 'LECTURER') {
                return '中级讲师';
            } else {
                return '高级讲师';
            }
        } else {
            if (row.rank == 'PREPARATORY') {
                return '讲师';
            } else if (row.rank == 'ASSISTANT') {
                return '副教授';
            } else if (row.rank == 'LECTURER') {
                return '教授';
            } else {
                return '社会培训机构讲师';
            }
        }

    }
    handelChange = (courseId, teacherId) => {
        this.isVisible = true;
        this.courseId = courseId;
        this.teacherId = teacherId;
        this.loadDat()
    }
    // 当前页数
    handleIndexChange = (e) => {
        if (this.index == 1) {
            let data = {
                page: this.teacherIndex - 1,
                size: 10,
                classId: this.traingId
            }
            this.teacherEvaluation(data)
        } else if (this.index == 2) {
            let data = {
                page: this.courseIndex - 1,
                size: 10,
                classId: this.traingId
            }
            this.curriculumEvaluation(data)
        }
    }
}
