import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { CuiLayer, Column } from 'console-ui-ng';
import { TrainingClass } from './../../../entity/training-class';
import { TrainingClassApiService } from './../../../service/training-class-api.service';
import { Pagination } from 'app/core';
import { AuthService } from 'app/core';
import { User } from 'app/system/entity/user';
import { FormGroup, FormBuilder } from '@angular/forms';
declare let $: any;

@Component({
    selector: 'spk-training-class-list-new',
    templateUrl: './training-class-list-new.component.html',
    styleUrls: ['./training-class-list-new.component.scss']
})
export class TrainingClassListNewComponent implements OnInit {
    @ViewChild("endClassDialog") endClassDialog: TemplateRef<any>;
    @ViewChild("endClassTitle") endClassTitle: TemplateRef<any>;
    data: Pagination<any>;
    datatTraining: any[] = [];
    loading: boolean;
    spinning: boolean = true;
    selection: TrainingClass[] = [];
    isFormDisplay: boolean = false;
    isList: boolean = false;
    listState: boolean = true;
    nowYear: any = new Date().getFullYear();
    user: User;
    endClassErrorData: any[] = [];
    endclassSuccessData: any[] = [];
    searchBy: {
        name?: any,
        id?: any,
        ownProject?: any,
        isRelease?: any,
        startDateBegin?: any,
        startDateEnd?: any,
        endDateBegin?: any,
        endDateEnd?: any,
        planTypes?: any,
        planName?: any,
        trainingLeve?: any,
        stage?: any,
        planYear?: any,
        leaderSearch?: any,
        performerSearch?: any
    } = {};
    columns: Column[] = [
        { title: 'ID', data: 'id' },
        { title: '班级名称', tpl: 'name' },
        { title: '所属组织', data: 'userGroup.name' },
        { title: '开始日期', tpl: 'startDate', styleClass: 'text-center' },
        { title: '结束日期', tpl: 'endDate', styleClass: 'text-center' },
        { title: '执行人', tpl: 'performers' },
        { title: '人数', data: 'regPersonNumber', styleClass: 'text-right' },
        { title: '培训地点', data: 'address' },
        { title: '状态', tpl: 'status', styleClass: 'text-center' },
        { title: '班级通知', tpl: 'message', styleClass: 'text-center' },
        { title: '班级考试', tpl: 'exam', styleClass: 'text-center' },
        { title: '操作', tpl: 'actions', styleClass: 'text-right' },
    ];
    isVisibleExport: boolean = false;
    _searchForm: FormGroup;
    isComplexSearch: boolean = false;
    _options: any;
    informationData: any;
    courseListData: any;
    id: number;
    pageIndex: number = 1;
    total: number = 50;
    pageSize: number = 10;
    pageIndexTrain: number = 1;
    nzPageSize: number = 10;
    totalTrain: number = 50;
    ids: any = [];
    _allChecked = false;
    _indeterminate = false;
    informLoading: boolean = false;
    informLoadingCourseList: boolean = false;
    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private trainingClassApi: TrainingClassApiService,
        private message: NzMessageService,
        private fb: FormBuilder,
        private modal: NzModalService,
        private authService: AuthService
    ) { }

    ngOnInit() {
        this.trainingClassApi.trainingapi().subscribe((res) => {
            this._options = res;
        })
        this.initSearchForm();
        this.searchBy.planYear = this.nowYear;
        this.authService.getCurrentUser().subscribe(
            user => {
                if (user.managerGroup) {
                    this.searchBy.ownProject = [user.managerGroup.id];
                    this._searchForm.get('ownProject').setValue([user.managerGroup])
                }
                this.loadData();

            }
        )

    }
    /* modal start */
    handelIsList = () => {
        this.isList = false;
        this.listState = true;
    }
    handelNotList = () => {
        this.isList = true;
        this.listState = false;
    }
    /* 全选 */
    handleCheckedAll = () => {
        let allIds = []
        this.datatTraining.map((item) => {
            allIds.push(item.id)
        })
        this.ids = allIds;
        let newIds = [];
        this.ids.map((item) => {
            newIds.push({
                id: item
            })
        })
        this.selection = newIds;
    }
    // 多选框
    handelChecked = (e, id) => {
        let ids = this.ids;
        if (ids.indexOf(id) == -1) {
            ids.push(id);
        } else {
            ids.splice(ids.indexOf(id), 1);
        }
        let newIds = [];
        ids.map((item) => {
            newIds.push({
                id: item
            })
        })
        this.selection = newIds;
    }
    handelChangePage = (e) => {
        console.log(this.pageIndexTrain)
        this.loadData()
    }
    handelClickName = (data) => {
        // console.log(data)
        this.id = data.id;
        this.isVisibleExport = true;
        this.informLoading = true;
        this.informLoadingCourseList = true;
        this.trainingClassApi.getInformation(data.id).subscribe((res) => {
            this.informationData = res;
            this.informLoading = false;
            // console.log(this.informationData)
        },
            err => {
                this.informLoading = false;
            }
        )
        let param = {
            size: this.pageSize,
            page: 0
        }
        this.courselist(data.id, param)
    }
    courselist = (id, param) => {
        this.trainingClassApi.getCourseList(id, param).subscribe((res) => {
            this.courseListData = res.content;
            this.total = res.totalElements;
            this.selection = [];
            this._allChecked = false;
            this._indeterminate = false;
            this.informLoadingCourseList = false;
            // console.log(this.courseListData)
        })
    }
    handelPageIndex = (e) => {
        console.log(11)
        // console.log(this.pageIndex)
        let param = {
            size: this.pageSize,
            page: e - 1
        }
        this.courselist(this.id, param)
    }
    handelExport = () => {
        this.trainingClassApi.export(this.id).subscribe(
            (res) => {
                this.trainingClassApi.downloadCourse(this.id)
            },
            err => {
                return this.tipMessage('error', err, 4000);
            }
        )
    }
    handleCancelExport = (e) => {
        this.isVisibleExport = false;
    }
    handleOkExport = (e) => {
        this.isVisibleExport = false;
    }
    trainingType = (type) => {
        if (type == "ONLINE") {
            return "在线培训"
        } else if (type == "OFFLINE") {
            return "面授培训"
        } else if (type == "MIXED") {
            return "混合培训"
        }
    }
    courseType = (type) => {
        if (type == "ONLINE") {
            return "在线学习"
        } else if (type == "LIVE") {
            return "直播课程"
        } else if (type == "OFFLINE") {
            return "面授课程"
        }
    }
    /* modal end */
    initSearchForm() {
        this._searchForm = this.fb.group({

            name: [],
            id: [],
            ownProject: [],
            isRelease: [],
            startDateBegin: [],
            startDateEnd: [],
            endDateBegin: [],
            endDateEnd: [],
            planTypes: [''],
            planName: [],
            trainingLeve: [[]],
            stage: [''],
            planYear: [this.nowYear],
            leaderSearch: [],
            performerSearch: []

        });
        // this._searchForm.value['startDateBegin'];
        // this._searchForm.controls['startDateBegin'].value
    }

    loadData(page?: any) {
        if (page) {
            this.nzPageSize = page.size;
        }
        let params = {
            page: page && page.number || this.pageIndexTrain - 1,
            size: page && page.size || this.nzPageSize,
        };
        this.loading = true;
        this.spinning = true;
        this.ids = [];

        if (this.searchBy.isRelease) {
            if (this.searchBy.isRelease == '1') {
                params['isPublished'] = '0';
            } else if (this.searchBy.isRelease == '2') {
                params['isPublished'] = '1';
                params['isArchived'] = '0';
            } else if (this.searchBy.isRelease == '3') {
                params['isArchived'] = '1';
            }
        };
        if (this.searchBy.name) {
            params['name'] = this.searchBy.name;
        };
        if (this.searchBy.id) {
            params['id'] = this.searchBy.id;
        }
        // console.log(3333, this.searchBy.ownProject);
        if (this.searchBy.ownProject) {
            params['userGroupIds'] = this.searchBy.ownProject;
            if (Object.prototype.toString.call(this.searchBy.ownProject) == "[object Object]") {
                params['userGroupIds'] = this.searchBy.ownProject;
            } else {
                // console.log(444, this.searchBy.ownProject);
                if (this.searchBy.ownProject[0] && this.searchBy.ownProject[0].id) {
                    params['userGroupIds'] = this.searchBy.ownProject.map(item => item.id)
                } else {
                    params['userGroupIds'] = this.searchBy.ownProject
                }

            }

        };
        if (this.searchBy.planTypes) {
            params['planType'] = this.searchBy.planTypes;
        };
        if (this.searchBy.stage) {
            params['stage'] = this.searchBy.stage;
        }
        if (this.searchBy.trainingLeve && this.searchBy.trainingLeve.length) {
            params['personnelClassificationId'] = this.searchBy.trainingLeve[0];
            if (this.searchBy.trainingLeve.length > 1) {
                params['trainingClassificationId'] = this.searchBy.trainingLeve[1];
                if (this.searchBy.trainingLeve.length > 2) {
                    params['trainingLevel'] = this.searchBy.trainingLeve[2];
                }
            }
        }
        if (this.searchBy.planName) {
            params['planName'] = this.searchBy.planName;
        };
        //  如果培训阶段已选择开始时间结束时间置为null,如果开始时间结束时间任选其一则培训阶段置为全部
        if (params['stage']) {
            params['endDateLessEqual'] = null;
            params['startDateGreaterEqual'] = null;
            this._searchForm.get('endDateBegin').setValue(null);
            this._searchForm.get('startDateBegin').setValue(null);
            this._searchForm.get('startDateEnd').setValue(null);
            this._searchForm.get('endDateEnd').setValue(null);

        } else if (params['endDateLessEqual'] || params['startDateGreaterEqual']) {
            this._searchForm.get('stage').setValue('');
            params['stage'] = '';
        }
        if (this.searchBy.startDateBegin) {
            params['startDateBegin'] = this._searchForm.value['startDateBegin'];
        };
        if (this.searchBy.startDateEnd) {
            params['startDateEnd'] = this._searchForm.value['startDateEnd'];
        };
        if (this.searchBy.endDateBegin) {
            params['endDateBegin'] = this._searchForm.value['endDateBegin'];
        }
        if (this.searchBy.endDateEnd) {
            params['endDateEnd'] = this._searchForm.value['endDateEnd'];
        }
        if (this.searchBy.planYear) {
            params['planYear'] = this.searchBy.planYear;
        };
        if (this.searchBy.leaderSearch) {
            params['leaderSearch'] = this.searchBy.leaderSearch;
        };
        if (this.searchBy.performerSearch) {
            params['performerSearch'] = this.searchBy.performerSearch;
        };
        // console.log(params)
        this.trainingClassApi.planTraininglevelList(params).subscribe(
            data => {
                this.data = data;
                // console.log(data)
                this.datatTraining = data.content;
                this.totalTrain = data.totalElements;
                this.loading = false;
                this.spinning = false;
                this.pageSize = 10;
                this.pageIndex = 1;
                this.selection = [];
            },
            err => {
                this.tipMessage('error', err);
                this.loading = false;
                this.spinning = false;
            }
        );
    }

    hasSelection() {
        return this.selection && this.selection.length > 0;
    }

    _submitForm($event, value) {
        $event.preventDefault();
        // tslint:disable-next-line:forin
        this.searchBy = value;
        this.pageIndexTrain = 1;
        this.nzPageSize = 10;
        let page = {
            size: this.nzPageSize,
            number: this.pageIndex - 1
        }
        this.loadData(page);
        // console.log(value);
    }
    resetForms() {
        this.isFormDisplay = true;
    }
    resetForm($event: MouseEvent) {
        $event.preventDefault();
        this._searchForm.reset();
        // tslint:disable-next-line:forin
        for (const key in this._searchForm.controls) {
            this._searchForm.controls[key].markAsPristine();
        }
    }
    goExame(id, trainlevelId, type) {
        this.trainingClassApi.goexame(id, trainlevelId).subscribe(
            res => {
                this.router.navigate([`/training/class/assist/${id}/${type}`]);
            },
            err => {
                this.router.navigate([`/training/class/assist/${id}/${type}`]);
            }
        )
    }
    resetFormEasys = () => {
        this.isFormDisplay = false;
    }

    delete(trainingClass?: TrainingClass) {
        this.batchOperate('delete', '删除', trainingClass, false);
    }

    publish(trainingClass?: TrainingClass) {
        this.batchOperate('publish', '发布', trainingClass, true);
    }

    disPublish(trainingClass?: TrainingClass) {
        this.batchOperate('disPublish', '撤销发布', trainingClass, true);
    }

    archive(trainingClass?: TrainingClass) {
        this.batchOperate('archive', '结班', trainingClass, true);
    }

    disArchive(trainingClass?: TrainingClass) {
        this.batchOperate('disArchive', '撤销结班', trainingClass, true);
    }

    private batchOperate(action: string, actionName: string, trainingClass?: any, keepFilter?: boolean) {
        let selected = trainingClass ? [trainingClass] : this.selection;
        // console.log(this.selection)
        if (!selected || selected.length == 0) {
            this.tipMessage('error', `请选择要${actionName}的培训班`, 3000);
            return;
        }
        if (action == 'archive') {
            let apprStatus = this.judgeCanDoEndClass(selected);
            // console.log(apprStatus, 234)
            this.endClassErrorData = this.getEndClassErrorData(selected);
            this.endclassSuccessData = this.getEndClassSuccessData(selected);
            // console.log(this.endClassErrorData, 3343)
            this.modal.confirm({
                title: this.endClassTitle,
                content: this.endClassDialog,
                width: 800,
                showConfirmLoading: true,
                zIndex: 1003,
                onOk: () => {
                    if (this.endclassSuccessData.length) {
                        this.trainingClassApi[action](this.endclassSuccessData.map(it => it.id)).subscribe(
                            ok => {
                                this.tipMessage('success', `${actionName}成功`, 3000);
                                this.loadData();
                            },
                            err => {
                                this.tipMessage('error', `${actionName}失败`, 3000);
                            }
                        );
                    }
                },
                onCancel() { }
            })
        } else {
            this.modal.confirm({
                title: `确定要${actionName}选择的培训班吗？`,
                zIndex: 1003,
                onOk: () => {

                    this.trainingClassApi[action](selected.map(it => it.id)).subscribe(
                        ok => {
                            this.tipMessage('success', `${actionName}成功`, 3000);
                            this.loadData();
                        },
                        err => {
                            this.tipMessage('error', `${actionName}失败`, 3000);
                        }
                    );
                }
            });
        }
    }

    _console(event) {
        // console.log(event, 234)
    }
    // 判断是否可以结班
    judgeEndClass(array) {
        return array.every((item, index) => {
            return item.evaluationRateStatus == true;
        })
    }
    // 判断是否可以进行结班
    judgeCanDoEndClass(array) {
        return array.map((item) => {
            if (item.trainBaseFeeStatus == 'N') {
                return 'TBFN'
            }
            // if (item.apportionFeeStatus == 'N') {
            //     return 'AFN'
            // }
            if (item.documentStatus == 'N') {
                return 'DN'
            }
            if (item.teacherRecordStatus == 'N') {
                return 'TRN'
            }
            if (item.evaluationRateStatus) {
                return 'ERN'
            }
        })
    }
    getEndClassErrorData(array: any[]) {
        return array.filter((item) => {
            // tslint:disable-next-line:max-line-length
            return item.trainBaseFeeStatus == 'N' || item.documentStatus == 'N' || item.teacherRecordStatus == 'N' || item.evaluationRateStatus == 'N';
        })
    }
    getEndClassSuccessData(array: any[]) {
        return array.filter((item) => {
            // tslint:disable-next-line:max-line-length
            return item.trainBaseFeeStatus !== 'N' && item.documentStatus !== 'N' && item.teacherRecordStatus !== 'N' && item.evaluationRateStatus !== 'N';
        })
    }
    editmargin(id) {
        this.router.navigate([`/training/class/${id}/edit`])
    }
    // 培训阶段选择
    chageStage(value) {
        if (value) {
            this._searchForm.get('endDateBegin').setValue(null);
            this._searchForm.get('startDateBegin').setValue(null);
            this._searchForm.get('startDateEnd').setValue(null);
            this._searchForm.get('endDateEnd').setValue(null);
        }
    }
    // 表单日期处理
    // 开始日期
    _startDateBeginChange = () => {
        if (this._searchForm.value['startDateBegin'] > this._searchForm.value['startDateEnd']) {
            this._searchForm.value['startDateEnd'] = null;
        } else {
            if (this._searchForm.value['startDateBegin'] || this._searchForm.value['startDateEnd']) {
                this._searchForm.get('stage').setValue('');
            }
        }
    };
    _startDateEndChange = () => {
        if (this._searchForm.value['startDateBegin'] > this._searchForm.value['startDateEnd']) {
            this._searchForm.value['startDateBegin'] = null;
        } else {
            if (this._searchForm.value['startDateEnd'] || this._searchForm.value['startDateBegin']) {
                this._searchForm.get('stage').setValue('');
            }
        }
    };
    _disabledStartDateBegin = (startValue) => {
        if (!startValue || !this._searchForm.value['startDateEnd']) {
            return false;
        }
        return startValue.getTime() >= this._searchForm.value['startDateEnd'].getTime();
    };
    _disabledStartDateEnd = (endValue) => {
        if (!endValue || !this._searchForm.value['startDateBegin']) {
            return false;
        }
        return endValue.getTime() <= this._searchForm.value['startDateBegin'].getTime();
    };
    // 结束日期
    _endDateBeginChange = () => {
        if (this._searchForm.value['endDateBegin'] > this._searchForm.value['endDateEnd']) {
            this._searchForm.value['endDateEnd'] = null;
        } else {
            // tslint:disable-next-line:max-line-length
            if (this._searchForm.value['endDateBegin'] || this._searchForm.value['endDateEnd'] || this._searchForm.value['startDateBegin']) {
                this._searchForm.get('stage').setValue('');
            }
        }
    };
    _endDateEndChange = () => {
        if (this._searchForm.value['startDateBegin'] > this._searchForm.value['startDateEnd']) {
            this._searchForm.value['startDateBegin'] = null;
        } else {
            // tslint:disable-next-line:max-line-length
            if (this._searchForm.value['endDateEnd'] || this._searchForm.value['endDateBegin'] || this._searchForm.value['startDateBegin']) {
                this._searchForm.get('stage').setValue('');
            }
        }
    };
    _disabledEndDateBegin = (startValue) => {
        if (!startValue || !this._searchForm.value['endDateEnd']) {
            return false;
        }
        return startValue.getTime() >= this._searchForm.value['endDateEnd'].getTime();
    };
    _disabledEndDateEnd = (endValue) => {
        if (!endValue || !this._searchForm.value['endDateBegin']) {
            return false;
        }
        return endValue.getTime() <= this._searchForm.value['endDateBegin'].getTime();
    };
    _refreshStatus() {
        const allChecked = this.data.content.every(value => value.checked === true);
        const allUnChecked = this.data.content.every(value => !value.checked);
        this._allChecked = allChecked;
        this._indeterminate = (!allChecked) && (!allUnChecked);
    }
    singlechecked(event, value) {
        // console.log(event, value)
        if (event && value.checked) {
            this.selection.push(value);
        } else {
            this.selection = this.selection.filter((item, index) => {
                return item.id !== value.id
            })
        }
        this._refreshStatus();
    }
    // 全选
    _checkAll(value) {
        if (this.data.content.length) {
            if (value) {
                this.data.content.forEach(data => {
                    data.checked = true;
                });
                this.selection = this.data.content;
            } else {
                this.data.content.forEach(data => {
                    data.checked = false;
                });
                this.selection = [];
            }
            this._refreshStatus();
        }
    }
    goClassLearn(id) {
        let url;
        if (!window.location.origin) {
            url = window.location.protocol + "//" + window.location.hostname + (window.location.port ? ':' + window.location.port : '');
        } else {
            url = window.location.origin;
        }
        window.open(`${url}/console/training/class/${id}`, '_blank');
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
