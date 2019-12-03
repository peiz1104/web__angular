import { Component, OnInit, Input } from '@angular/core';
import { TrainingClassApiService } from './../../../service/training-class-api.service';
import { tipMessage } from 'app/account/entity/message-tip';

@Component({
    selector: 'spk-training-class-teaching-management',
    templateUrl: './training-class-teaching-management.component.html',
    styleUrls: ['./training-class-teaching-management.component.scss']
})
export class TrainingClassTeachingManagementComponent implements OnInit {
    total: number = 50;
    @Input() traingId: any;
    isTeacher: boolean = false;
    inputValue: any;
    inputValueTeacherName: any = "111111";
    inputValueCourseHour: any;
    options = [];
    _options = [];
    choseTeacher = []
    selectedOption;
    _selectedOption;
    choseTeacherSelect;
    isSearching: boolean = false;
    isVisible: boolean = false;
    _checked: boolean = false;
    inputValueEvaluationResults: any;
    isBlock: boolean = true;
    lessonListData: any;
    ids: any = [];
    teachingRecordId: number;
    isVisibleAdd: boolean = false;
    inputValueCourseHours: any;
    inputValueEvaName: any;
    inputValueEvaNameRes: any;
    isConfirmLoading: boolean = false;
    isConfirmLoadingNext: boolean = false;
    idAll: any = [];
    courseId: number;
    teacherId: number;
    isEdit: boolean = true; // 能编辑;
    isDelete: boolean = false;
    isGenerate: boolean = false;
    isGenerateLoading: boolean = false;
    isDeleteLoading: boolean = false;
    IsConfirmationReviewLoading: boolean = false;
    IsConfirmationReviewVisibile: boolean = false;
    IsRevokeReviewVisible: boolean = false;
    IsRevokeReviewLoading: boolean = false;
    indexPage: number = 1

    constructor(
        private apiservice: TrainingClassApiService,
    ) { }

    ngOnInit() {
        this.getStatus(this.traingId); // 获取状态
        let data = {
            page: '',
            size: 10
        };
        this.GenerateLessonsList(this.traingId, data)// 列表
        setTimeout(_ => {
            this.options = [
                { value: '', label: '全部' },
                { value: 'leader', label: '班主任' },
                { value: 'assistant', label: '助教' },
                { value: 'teacher', label: '讲师' },
            ];
            this.selectedOption = this.options[0];
        }, 100);
        setTimeout(_ => {
            this._options = [
                { value: '', label: '选择课程' },
            ];
            this._selectedOption = this._options[0];
        }, 100);
        this.chooseTeacherStart()
    }

    // 不能操作
    notEdit = () => {
        // this.message.info("记录已复核，禁止操作！")
    }

    // 初始化 选择讲师
    chooseTeacherStart = () => {
        setTimeout(_ => {
            this.choseTeacher = [
                { value: '', label: '选择讲师' },
            ];
            this.choseTeacherSelect = this.choseTeacher[0];
        }, 100);
    }

    // 确认复核
    handelConfirmationReview = () => {
        this.IsConfirmationReviewVisibile = true;
    }

    // 取消
    teacherreview = (e) => {
        this.IsConfirmationReviewVisibile = false;
        this.IsConfirmationReviewLoading = false;
    }

    // 确认
    handleIsConfirmationReviewOk = (e, confirm) => {
        this.IsConfirmationReviewLoading = true;
        let data = {
            teacherRecordStatus: "Y"
        }
        this.setStatus(this.traingId, data, confirm)
    }
    // 取消
    handleIsConfirmationReviewCancel = (e) => {
        this.IsConfirmationReviewVisibile = false;
        this.IsConfirmationReviewLoading = false;
        console.log(this.IsConfirmationReviewLoading);
    }

    // 撤销复核
    handelRevokeReview = () => {
        this.IsRevokeReviewVisible = true;
    }

    // 确认
    handleRevokeReviewOk = (e, concel) => {
        this.IsRevokeReviewLoading = true;
        let data = {
            teacherRecordStatus: "N"
        };
        this.setStatus(this.traingId, data, concel);
    }

    // 取消
    handleRevokeReviewCancel = (e) => {
        this.IsRevokeReviewVisible = false;
    }

    // 选择课程
    handelChooseCourse = (e) => {
        this.courseId = e.value;
        this.chooseTeacher(this.traingId, this.courseId);
    }

    // 选择讲师
    handelChooseTeacher = (e) => {
        this.teacherId = e.value;
        this.getTeacherDetail(this.traingId, this.courseId, this.teacherId);
    }

    // 获取状态
    setStatus = (id, data, type) => {
        this.apiservice.moreSetStatus(id, data).subscribe(
            res => {
                if (res.isSuccess == "Y") {
                    if (type == "confirm") {
                        tipMessage("复核成功！", 'success');

                        this.IsConfirmationReviewLoading = false;
                        this.IsConfirmationReviewVisibile = false;
                        this.isEdit = false;
                    } else {
                        tipMessage("撤销复核成功！", 'success');

                        this.IsRevokeReviewVisible = false;
                        this.IsRevokeReviewLoading = false;
                        this.isEdit = true;
                    }




                } else {
                    if (type == "confirm") {
                        this.failStatus(res)
                    } else {
                        tipMessage("撤销复核失败！")
                    }
                    this.isEdit = true;
                }

                let datas = {
                    page: '',
                    size: 10
                }
                this.GenerateLessonsList(this.traingId, datas)
            },
            err => {
                tipMessage(err);
            }
        )
    }
    // 失败判断状态
    failStatus(res) {
        if (res.isSuccess == 'J') {
            tipMessage('确定讲师信息已添加完毕，再进行讲师复核', '', 5000)
        } else if (res.isSuccess == 'X') {
            tipMessage('确定个险讲师授的课程都有课程小类，再进行讲师复', '', 5000)
        } else if (res.isSuccess == 'S') {
            tipMessage('确定讲师的授课质量是否在0-100之间，再进行讲师复核', '', 5000)
        } else if (res.isSuccess == 'P') {
            tipMessage('确定评估达标率达标，再进行讲师复核', '', 5000);
        } else if (res.isSuccess == 'Z') {
            tipMessage('确定培训班是否注册人员，再进行讲师复核', '', 5000);
        }
    }
    // 获取状态
    getStatus = (id) => {
        this.apiservice.getStatus(id).subscribe(
            res => {
                if (res.teacherRecordStatus == "N") {
                    this.isEdit = true;
                } else {
                    this.isEdit = false;
                }
            },
            err => {
            }
        )
    }
    // 保存并添加的接口
    saveAndAdd = (data) => {
        this.apiservice.teacherSave(data).subscribe(
            res => {
                this.chooseCourse(this.traingId);
                this.chooseTeacherStart();
                this.inputValueCourseHours = "请输入课时量!";
                this.inputValueEvaName = "请输入评估名称!";
                this.inputValueEvaNameRes = "请输入授课质量评估结果!";
                this.isVisibleAdd = true;
                this.isConfirmLoadingNext = false;
                let data = {
                    page: '',
                    size: 10
                }
                this.GenerateLessonsList(this.traingId, data)
            },
            err => {
            }
        )
    }

    // 保存接口
    teacherSave = (data) => {
        this.apiservice.teacherSave(data).subscribe(
            res => {
                this.isVisibleAdd = false;
                this.isConfirmLoading = false;
                let data = {
                    page: '',
                    size: 10
                }
                this.GenerateLessonsList(this.traingId, data)
            },
            err => {
            }
        )
    }

    // 选择老师接口
    getTeacherDetail = (id, userId, detailId) => {
        this.apiservice.getTeacherDetail(id, userId, detailId).subscribe(
            res => {
                this.inputValueCourseHours = res.assess.teachingPeriod;
                this.inputValueEvaName = res.assess.evaluationName;
                this.inputValueEvaNameRes = res.assess.evaluationScore;
            },
            err => {
            }
        )
    }

    // 选择老师接口
    chooseTeacher = (id, userId) => {
        this.apiservice.chooseTeacher(id, userId).subscribe(
            res => {
                let data = res.user;
                let newArr = []
                for (let i = 0; i < data.length; i++) {
                    newArr.push({
                        value: data[i].teacherId,
                        label: data[i].teacherName
                    })
                }
                newArr.unshift({
                    value: '',
                    label: '选择讲师'
                })
                this.choseTeacher = newArr;
                this.choseTeacherSelect = this.choseTeacher[0]
            },
            err => {
            }
        )
    }

    // 选择课程接口
    chooseCourse = (id) => {
        this.apiservice.chooseCourse(id).subscribe(
            res => {
                let data = res.course;
                let newArr = []
                for (let i = 0; i < data.length; i++) {
                    newArr.push({
                        value: data[i].courseId,
                        label: data[i].courseName
                    })
                }

                newArr.unshift({
                    value: '',
                    label: '选择课程'
                })
                this._options = newArr;
                this._selectedOption = this._options[0]
            },
            err => {
            }
        )
    }
    // 添加
    handelAdd = () => {
        this.isVisibleAdd = true;
        this.chooseCourse(this.traingId)
    }

    // 添加 保存并添加
    handleAddOkNext = (e) => {
        this.isConfirmLoadingNext = true;
        let data = {
            "trainingClass.id": this.traingId,
            'teacher.id': this.teacherId,
            "offeringCourse.course.id": this.courseId,
            teachingPeriod: this.inputValueCourseHours,
            evaluationScore: this.inputValueEvaNameRes
        }
        this.saveAndAdd(data)
    }

    // 添加 确认
    handleAddOk = (e) => {
        this.isConfirmLoading = true;
        let data = {
            "trainingClass.id": this.traingId,
            'teacher.id': this.teacherId,
            "offeringCourse.course.id": this.courseId,
            teachingPeriod: this.inputValueCourseHours,
            evaluationScore: this.inputValueEvaNameRes
        }
        this.teacherSave(data)
    }

    // 添加取消
    handleAddCancel = (e) => {
        this.isVisibleAdd = false;
        this.restForm();
    }
    restForm() {
        this.inputValueCourseHours = "请输入课时量!";
        this.inputValueEvaName = "请输入评估名称!";
        this.inputValueEvaNameRes = "请输入授课质量评估结果!";
        this._selectedOption = undefined;
        this.choseTeacherSelect = undefined;
        this.isVisibleAdd = false;
        this.isConfirmLoadingNext = false;
        this.isConfirmLoading = false;
    }
    // 生成授课记录接口
    GenerateLessons = (id) => {
        this.isTeacher = true;
        this.apiservice.GenerateLessons(id).subscribe(
            res => {
                let data = {
                    page: '',
                    size: 10
                }
                this.isGenerateLoading = false;
                this.isGenerate = false;
                this.GenerateLessonsList(id, data)
            },
            err => {
            }
        )
    }

    // 确认接口
    GenerateLessonsUpdate = (data) => {
        this.apiservice.GenerateLessonsUpdate(data).subscribe(
            res => {
                let data = {
                    page: '',
                    size: 10
                }
                this.GenerateLessonsList(this.traingId, data)
            },
            err => {
            }
        )
    }

    // list接口
    GenerateLessonsList = (id, data) => {
        this.apiservice.GenerateLessonsList(id, data).subscribe(
            res => {
                this.lessonListData = res.content;
                this.total = res.totalElements;
                this.isTeacher = false;
                this.isSearching = false;
            },
            err => {
                this.isTeacher = false;
                this.isSearching = false;
            }
        )
    }

    // 删除接口
    GenerateLessonsDelete = (ids) => {
        this.apiservice.GenerateLessonsDelete(ids).subscribe(
            res => {
                tipMessage('删除成功！', 'success');
                this.isDeleteLoading = false;
                this.isDelete = false;
                let data = {
                    page: '',
                    size: 10
                }
                this.GenerateLessonsList(this.traingId, data)
            },
            err => {
                tipMessage('删除失败！');
            }
        )
    }

    teacherLevel = (type) => {
        if (type == "leader") {
            return "班主任"
        } else if (type == "assistant") {
            return "助教"
        } else {
            return "讲师"
        }
    }


    toAMISType = (type) => {
        if (type == "SUCCESS") {
            return "成功"
        } else if (type == "FALSE") {
            return "失败"
        } else if (type == "NOCALL") {
            return "没有调用"
        }
    }
    // 反选
    handelNoCheckedAll = () => {
        let noData = this.ids;
        if (noData.length == 0) {
            this.handelCheckedAll()
        } else {
            this.getAllIds()
            let allIds = this.idAll;
            let newArr = []
            for (let i = 0; i < allIds.length; i++) {
                if (noData.indexOf(allIds[i]) == -1) {
                    newArr.push(allIds[i])
                }
            }
            this.ids = newArr;
        }
    }
    // 获取ids 所有
    getAllIds = () => {
        let data = this.lessonListData;
        let newDataList = [];
        let ids = [];
        for (let i = 0; i < data.length; i++) {
            let arr = data[i].detailList
            for (let j = 0; j < arr.length; j++) {
                newDataList.push(arr[j])
            }
        }
        for (let i = 0; i < newDataList.length; i++) {
            ids.push(newDataList[i].teachingRecordId)
        }
        this.idAll = ids;
    }

    // 全选
    handelCheckedAll = () => {
        this.getAllIds();
        this.ids = this.idAll;
    }

    // 多选框
    handelChecked = (e, id) => {
        let ids = this.ids;
        if (ids.indexOf(id) == -1) {
            ids.push(id);
        } else {
            ids.splice(ids.indexOf(id), 1);
        }
    }

    // 搜索
    handelSearch = () => {
        this.indexPage = 1
        this.isSearching = true; // loading
        let data = {
            teacherType: this.selectedOption ? this.selectedOption.value : '',
            userName: this.inputValue,
            page: 0,
            size: 10
        }
        console.log(data)
        this.GenerateLessonsList(this.traingId, data)
    }

    // 分页
    handleIndexChange = (e) => {
        console.log(e)
        let index = e - 1;
        let data = {
            page: index,
            size: 10,
            teacherType: this.selectedOption.value,
            userName: this.inputValue,
        }
        this.GenerateLessonsList(this.traingId, data)

    }

    // 编辑
    handelEdit = (userName, id, inputValueCourseHour, inputValueEvaluationResults) => {
        this.inputValueTeacherName = userName;
        this.teachingRecordId = id;
        this.inputValueCourseHour = inputValueCourseHour;
        this.inputValueEvaluationResults = inputValueEvaluationResults;
        this.isVisible = true;
    }

    // 弹窗确认
    handleOk = (e) => {
        this.isVisible = false;
        this.isTeacher = true;
        let data = {
            evaluationScore: this.inputValueEvaluationResults,
            teachingPeriod: this.inputValueCourseHour,
            id: this.teachingRecordId
        }
        this.GenerateLessonsUpdate(data)
    }

    // 弹窗取消
    handleCancel = (e) => {
        console.log(e);
        this.isVisible = false;
    }



    // 生成授课记录
    handelGenerateLessons = () => {
        this.isGenerate = true;

    }
    handleIsGenerateOk = (e) => {
        this.isGenerateLoading = true;
        this.GenerateLessons(this.traingId)
    }
    handleIsGenerateCancel = (e) => {
        this.isGenerate = false;
    }

    // 删除
    handelDelete = () => {
        this.isDelete = true
    }

    // modal 确认删除
    handleIsDeledtOk = (e) => {
        this.isDeleteLoading = true;
        if (this.ids.length > 0) {
            let data = {
                ids: this.ids
            }
            this.GenerateLessonsDelete(data)
        } else {
            tipMessage("请选择要删除的授课记录！", 'info');
        }
    }

    // modal 确认删除
    handleIsDeledtCancel = (e) => {
        this.isDelete = false;
    }

    toAmisTeacherRecord = () => {
        this.apiservice.toAmisTeacherRecord(this.traingId).subscribe(
            res => {
                if (res.isSuccess == "Y") {
                    tipMessage("复核成功！", 'success');
                }

            },
            err => {
                tipMessage(err);
            }
        )
    }


}
