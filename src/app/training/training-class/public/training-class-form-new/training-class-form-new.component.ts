/*
 * @Author: peimingjun
 * @Date: 2018-01-19 15:26:57
 * @Last Modified by: peimingjun
 * @Last Modified time: 2018-05-09 15:53:39
 */
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, OnChanges, Input, Output, EventEmitter } from '@angular/core';
import { TrainingClass } from './../../../entity/training-class';
import { UserGroup } from 'app/system/entity/user-group';
import { NzModalService } from 'ng-zorro-antd';
import { TrainingClassApiService } from '../../../service/training-class-api.service';
import { Router, ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { error } from 'selenium-webdriver';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { tipMessage } from 'app/account/entity/message-tip';
declare let $: any;
// import { TrainBase } from 'app/library/entity/train-base';


@Component({
    selector: 'spk-training-class-form-new',
    templateUrl: './training-class-form-new.component.html',
    styleUrls: ['./training-class-form-new.component.scss']
})
export class TrainingClassFormNewComponent implements OnInit, OnChanges {

    @Input() trainingClass: any;
    @Input() loading: boolean = false;
    @Input() isDisabled: boolean;

    @Output() save: EventEmitter<any> = new EventEmitter();
    @Output() cancel: EventEmitter<any> = new EventEmitter();

    validateForm: FormGroup;
    performerOption: any;
    imageUrl: string;
    // spinning: boolean = true;
    _options: any;
    _value: any[] = [];
    _optionsobj = {};
    tbcNum: any;
    switchValue: boolean = false;
    attendanceData: any[] = [];
    attendanceobj: any;
    isAdjust: boolean = false;
    _startDate = null;
    _endDate = null;
    _enrollStart = null;
    _enrollEnd = null;
    searchOptionsLeaders = []; // 人员搜索项
    searchOptionsPerformers = []; // 执行人
    searchOptionsAssistants = []; // 助教
    leadersHolder: any;
    performersHolder: any;
    assistantsHolder: any;
    searchTipLeaders = []; // 班级负责人搜索提示
    searchTipPerformers = []; // 班级执行人搜索提示
    searchTipAssistants = []; // 班级主教搜索提示
    leaderStatus: boolean = true;
    performerStatus: boolean = false;
    assistantStatus: boolean = false;
    leaderToggle: boolean = true;
    performersToggle: boolean = true;
    assistantsToggle: boolean = true;
    // isVisible: boolean = false; // modal框的显影
    // createAnnplanState: boolean = false; // 生成计划时按钮的loading
    trainBase: any[] = [];
    showAddTrainBase: boolean = false;
    selection: any[] = [];
    searchtext;
    tbcBaseName;
    userGroupIds;
    _baseAddress;
    _baseNo;
    trainBaseData: any;
    spinning: boolean = false;
    isVisible: boolean = false;
    isVisibleTrainBase: boolean = false;
    spinningTrainBase: boolean = false;
    bssIdData: any;
    pageIndex: number = 1;
    pageSize: number = 10;
    showTrainingLevel: boolean = true;
    isArchived: boolean = false;
    budgetStatus: boolean;
    isDisabledLeve: boolean;
    trainBaseLoading: boolean = false;
    _trainingTypes = [
        { value: 'ONLINE', label: '在线培训', disabled: false },
        { value: 'OFFLINE', label: '面授培训', disabled: false },
        { value: 'MIXED', label: '混合培训', disabled: false },
    ];
    _trainClassify = [
        { value: 'ONLINE', label: '在线培训', disabled: false },
        { value: 'OFFLINE', label: '面授培训', disabled: false },
        { value: 'MIXED', label: '混合培训', disabled: false },
    ];
    _trainLevel = [
        { value: 'ONLINE', label: '在线培训', disabled: false },
        { value: 'OFFLINE', label: '面授培训', disabled: false },
        { value: 'MIXED', label: '混合培训', disabled: false },
    ];
    columns = [
        { title: '基地名称', data: 'baseName', styleClass: 'text-left' },
        { title: '地址', data: 'baseAddress', styleClass: 'text-left' },
        { title: '编号', data: 'baseNo', styleClass: 'text-left' },
        { title: '面积', data: 'buildArea', styleClass: 'text-right' }

    ];

    constructor(
        private fb: FormBuilder,
        private apiservice: TrainingClassApiService,
        private route: Router,
        private routeInfo: ActivatedRoute,
        private http: Http
    ) { }

    getAssessCode = () => {
        this.apiservice.getAssessCode().subscribe(
            (obj) => {
                this.tbcNum = obj.code;
                this.validateForm.get('code').setValue(this.tbcNum);
            }
        )
    }
    ngOnChanges() {
        document.onclick = () => {
            this.leadersHolder = false;
            this.performersHolder = false;
            this.assistantsHolder = false;
            $('#searchLeaders').val('');
            $('#searchAssistants').val('');
            $('#searchPerformers').val('');
        }
    }
    ngOnInit() {
        // console.log(this.trainingClass, 999)
        if (this.trainingClass) {
            if (this.trainingClass.createdDate != this.trainingClass.lastModifiedDate) {
                // 相同可以编辑动支预算开始时间与lastupdate
                this.budgetStatus = true;
            }

            if (this.trainingClass.leaders) {
                this.searchOptionsLeaders = this.getSelectValue(this.trainingClass.leaders);
            }
            if (this.trainingClass.performers) {
                this.searchOptionsPerformers = this.getSelectValue(this.trainingClass.performers);
            }
            if (this.trainingClass.assistants) {
                this.searchOptionsAssistants = this.getSelectValue(this.trainingClass.assistants);
            }
            if (this.trainingClass.trainBase) {
                this.trainBase = [this.trainingClass.trainBase];
                this.showAddTrainBase = false;
            } else {
                this.showAddTrainBase = true;
            }
            if (this.trainingClass.isArchived) {
                this.isArchived = this.trainingClass.isArchived;
            }

        } else {
            this.getAssessCode();
        }
        // 请求判断显示哪一个的api
        if (this.trainingClass && this.trainingClass.endDate) {
            this._endDate = new Date(this.trainingClass.endDate);
            this._startDate = new Date(this.trainingClass.startDate);
            // console.log(this._startDate, this._endDate)
        }
        if (this.trainingClass && this.trainingClass.enrollEnd) {
            this._enrollEnd = new Date(this.trainingClass.enrollEnd);
            this._enrollStart = new Date(this.trainingClass.enrollStart);
        }
        this.apiservice.getattendancemessage().subscribe(
            res => {
                // console.log(res, 'attendance')
                this.attendanceData = res;
                // 编辑的时候
                if (this.trainingClass && this.trainingClass.trainingLevel) {
                    this.isAdjust = !this.trainingClass.isAdjust;
                    this.attendanceobj = this.getrelativeattendance(this.attendanceData, this.trainingClass.trainingLevel)
                }

            },
            err => {
                return this.tipMessage('error', err);
            }
        )
        this.initForm();

        if (!this.trainingClass || this.trainingClass.planType == 'CT') {
            this.apiservice.trainingapi().subscribe((res) => {
                let selectedarray = [];
                let m = this.trainingClass || {};
                this._options = Object.keys(res).length ? res : [];
                this.gettrainlevelmethod(this._options);
                if (m.personnelClassificationId) {
                    selectedarray.push(this._optionsobj[m.personnelClassificationId])
                }
                if (m.trainingClassificationId) {
                    selectedarray.push(this._optionsobj[m.trainingClassificationId])
                }
                if (m.trainingLevel) {
                    selectedarray.push(this._optionsobj[m.trainingLevel]);
                    this.isDisabledLeve = true;
                } else {
                    this.isDisabledLeve = false;
                }

                // this.spinning = false;
                this._value = selectedarray;
                this.initForm()
            },
                err => {
                    // this.spinning = false;
                    return this.tipMessage('error', err);
                }
            )
        }
        if (this.trainingClass && this.trainingClass.planType !== 'CT') {
            this.isAdjust = false;
            this.showTrainingLevel = false;
            this.validateForm.removeControl('trainingLeve');
        }

        this.switchValue = this.trainingClass ? this.trainingClass.isOpenEnroll : false;
    }
    // 通过trainingLevel去寻找对应的数据
    getrelativeattendance(array: any[], trainingLevel) {
        return array.filter((item, index) => {
            return item.id == trainingLevel
        })
    }
    handelModelChange = (e) => {
        const isBlock = e.target.className;
        this.switchValue = isBlock.indexOf("checked") == -1;
        this.initForm();
        // this.validateForm.get('enrollStart').setValidators([Validators.required]);
        // this.validateForm.get('enrollEnd').setValidators([Validators.required]);
    }

    initForm() {
        // console.log(this.trainingClass, 4443)

        let m = this.trainingClass || {};
        // console.log(this.trainingClass)
        this.imageUrl = m.imageUrl;
        let sponsorDept: UserGroup
        let undertakeDept: UserGroup
        let userGroup: UserGroup;
        if (m.sponsorDeptId && m.sponsorDeptName) {
            sponsorDept = new UserGroup();
            sponsorDept.id = m.sponsorDeptId;
            sponsorDept.name = m.sponsorDeptName;
        }
        if (m.undertakeDeptId && m.undertakeDeptName) {
            undertakeDept = new UserGroup();
            undertakeDept.id = m.undertakeDeptId;
            undertakeDept.name = m.undertakeDeptName;
        }
        if (m.userGroupId && m.userGroupName) {
            userGroup = new UserGroup();
            userGroup.id = m.userGroupId;
            userGroup.name = m.userGroupName;
        }
        this.validateForm = this.fb.group({
            name: [m.name, [Validators.required]],
            imageUrl: [m.imageUrl],
            isPublished: [m.isPublished ? 1 : 0, [Validators.required]],
            // leaders: [m.leaders && this.pullDataInArray(m.leaders), [Validators.required]],
            // assistants: [m.assistants && this.pullDataInArray(m.assistants)],
            // performers: [m.performers && this.pullDataInArray(m.performers), [Validators.required]],
            address: [m.address],
            startDate: [m.startDate, [Validators.required]],
            endDate: [m.endDate, [Validators.required]],
            switch: [true, [Validators.required]],
            enrollStart: [m.enrollStart, [Validators.required]],
            enrollEnd: [m.enrollEnd, [Validators.required]],
            code: [m.code ? m.code : this.tbcNum, [Validators.required]], // TODO: 添加系统配置之培训班编码规则
            trainingType: [m.trainingType || 'MIXED', [Validators.required]],
            // trainClassify: [''],
            sponsorDept: [sponsorDept], // 主办单位
            undertakeDept: [undertakeDept], // 协办单位
            mobileStudy: [true],
            openCourse: [this.switchValue],
            messageInput: [true],
            message: [''],
            description: [m.description],
            maxPersonNumber: [m.maxPersonNumber, [Validators.required, Validators.pattern(/^[0-9]*$/)]],
            maxAbsence: [m.maxAbsence, [Validators.pattern(/^[0-9]*$/)]],
            shouldAbsence: [m.shouldAbsence, [Validators.pattern(/^[0-9]*$/)]],
            trainingLeve: [m.trainingLevel, [Validators.required]],
            personnelClassificationId: [m.personnelClassificationId],
            trainingClassificationId: [m.trainingClassificationId],
            trainingLevel: [m.trainingLevel],
            trainingBudget: [m.trainingBudget, [Validators.required, Validators.pattern(/^\d*\.?\d*$/)]],
            supportBudget: [m.supportBudget, [Validators.required, Validators.pattern(/^\d*\.?\d*$/)]],
            trainingObject: [m.trainingObject]
        });


    }

    getFormControl(name) {
        return this.validateForm.controls[name];
    }

    markAsDirty() {
        for (let name of Object.keys(this.validateForm.controls)) {
            this.validateForm.controls[name].markAsDirty();
        }
    }

    onImageUpload(image) {
        if (image) {
            this.imageUrl = image.relativePath
        }
    }

    _save(event) {
        // console.log(this.validateForm.value)
        this.markAsDirty();
        if (!this.switchValue) {
            this.validateForm.removeControl('enrollStart');
            this.validateForm.removeControl('enrollEnd');
        }
        if (this.validateForm.invalid) {
            this.tipMessage('error', '表单验证失败！');
            return;
        }

        if (this.searchOptionsLeaders.length == 0) {
            return this.tipMessage('error', '请填写班级负责人！');
        }
        if (this.searchOptionsPerformers.length == 0) {
            return this.tipMessage('error', '请填写班级执行人！');
        }
        // 不能传递trainingLevel
        let params = {
            ...this.validateForm.value,
            leaders: this.pullDataInArray(this.searchOptionsLeaders),
            performers: this.pullDataInArray(this.searchOptionsPerformers),
            assistants: this.searchOptionsAssistants.length ? this.pullDataInArray(this.searchOptionsAssistants) : null,
            "isAdjust": !this.isAdjust
        };
        params.imageUrl = this.imageUrl;
        if (!this.switchValue) {
            delete params.enrollStart;
            delete params.enrollEnd
            params.isOpenEnroll = false;
        } else {
            params.isOpenEnroll = true;
        }
        // tslint:disable-next-line:no-unused-expression
        delete params.trainingLeve;
        // console.log(params, 556)
        // 最大缺勤次数不能大于应考勤次数
        if (!params.shouldAbsence && params.maxAbsence) {
            return this.tipMessage('error', '请填写应考勤次数！');
        } else if (params.shouldAbsence && params.maxAbsence) {
            if (Number(params.maxAbsence) > Number(params.shouldAbsence)) {
                return this.tipMessage('error', '最大缺勤次数不可以大于应考勤次数！', 5000);
            }
        }
        if (!params.shouldAbsence) {
            delete params.shouldAbsence;
        }
        if (!params.maxAbsence) {
            delete params.maxAbsence;
        }
        if (!params.trainingClassificationId) {
            delete params.trainingClassificationId;
        }
        if (!params.trainingLevel) {
            delete params.trainingLevel;
        }
        // if (this.trainBase.length) {
        //     params['trainBase.id'] = this.trainBase[0].id;
        // }
        /*判断有无年度计划有的话带上id参数，没有的话生成年度计划*/
        this.loading = true;
        this.judgeHasAnnplan(event, params)
        // console.log(params, 233)
        // this.save.emit({ originalEvent: event, value: params });
    }
    // 判断有无年度计划及生成年度计划
    judgeHasAnnplan(event, params) {
        this.save.emit({ originalEvent: event, value: params });
    }

    _cancel(event) {
        this.cancel.emit({ originalEvent: event });
    }
    _console(value) {
        if (value != null && value.length > 0) {

            if (value.length == 1) {
                this.validateForm.get("personnelClassificationId").setValue(value[0]);
            } else if (value.length == 2) {
                this.validateForm.get("personnelClassificationId").setValue(value[0]);
                this.validateForm.get("trainingClassificationId").setValue(value[1]);
            } else {
                this.validateForm.get("personnelClassificationId").setValue(value[0]);
                this.validateForm.get("trainingClassificationId").setValue(value[1]);
                this.validateForm.get("trainingLevel").setValue(value[2]);
                let obj = this.getrelativeattendance(this.attendanceData, value[2])[0];
                // console.log(obj);
                this.validateForm.get("maxAbsence").setValue(obj.maxAbsence);
                this.validateForm.get("shouldAbsence").setValue(obj.shouldAbsence);
                this.isAdjust = obj.isAdjust == undefined ? false : !obj.isAdjust;
            }
        }
    }
    // 得到级别的方法
    gettrainlevelmethod(array: any[]) {
        if (array) {
            array.map((item, index) => {
                this._optionsobj[item.value] = item.label
                this.gettrainlevelmethod(item.children)
            })
        }
    }
    // quxiao
    cancelgoback(event) {
        this.route.navigate(['../../'], { relativeTo: this.routeInfo })
    }
    // 培训开始时间结束时间判断
    // 进行倒着选择的时间的判断

    _startValueChange = () => {
        if (this._startDate > this._endDate) {
            this._endDate = null;
        }
    };
    _endValueChange = () => {
        if (this._startDate > this._endDate) {
            this._startDate = null;
        }
    };
    // 如果选择了报名开始时间，则培训的开始时间要在这个时间的下边
    // 如果选择了报名开始时间报名结束时间 则培训的开始时间要在报名的开始时间下边，培训的结束时间要在报名的结束时间下边
    _disabledStartDate = (startValue) => {
        // 只选择报名开始时间
        if (this._enrollStart && !this._enrollEnd) {
            return startValue.getTime() <= this._enrollStart.getTime();
        }
        if (this._enrollStart && this._enrollEnd) {
            return startValue.getTime() <= this._enrollStart.getTime();
        }

        if (!startValue || !this._endDate) {
            return false;
        }
        // console.log(startValue, this._endDate, 12)
        if (Object.prototype.toString.call(this._endDate) == "[object Number]") {
            this._endDate = new Date(this._endDate);
        }
        return startValue.getTime() >= this._endDate.getTime();
    };
    _disabledEndDate = (endValue) => {
        // 只选择报名结束时间pei训的结束时间要在他的下边
        if (!this._enrollStart && this._enrollEnd) {
            return endValue.getTime() <= this._enrollEnd.getTime()
        }
        if (!endValue || !this._startDate) {
            return false;
        }
        if (Object.prototype.toString.call(this._startDate) == "[object Number]") {
            this._startDate = new Date(this._startDate);
        }
        return endValue.getTime() <= this._startDate.getTime();
    };



    // 报名开始结束时间的判断


    _enrollStartValueChange = () => {
        if (this._enrollStart > this._enrollEnd) {
            this._enrollEnd = null;
        }
    };
    _enrollEndValueChange = () => {
        if (this._enrollStart > this._enrollEnd) {
            this._enrollStart = null;
        }
    };
    _disabledenrollStart = (startValue) => {
        if (this._startDate) {
            if (this._enrollEnd) {
                if (this._enrollEnd < this._startDate) {
                    return startValue.getTime() >= this._enrollEnd.getTime();
                }
            }
            return startValue.getTime() >= this._startDate.getTime();
        }
        if (!startValue || !this._enrollEnd) {
            return false;
        }
        // console.log(this._startDate, 434)

        return startValue.getTime() >= this._enrollEnd.getTime();
    };
    _disabledenrollEnd = (endValue) => {
        if (this._endDate) {
            if (this._enrollStart && this._endDate) {
                return endValue.getTime() <= this._enrollStart.getTime() || endValue.getTime() >= this._endDate.getTime();
            }
            return endValue.getTime() >= this._endDate.getTime();
        }
        if (!endValue || !this._enrollStart) {
            return false;
        }

        // console.log(this._startDate)
        // if (this._startDate) {
        //     if (this._enrollStart > this._startDate) {
        //         return false;
        //     }
        // }
        return endValue.getTime() <= this._enrollStart.getTime();
    };
    // 事件冒泡
    stopProgation() { }
    // keydownLeaders(event) {
    //     console.log(event)
    //     if (event.keyCode == 13) {
    //         if (event.target.value) {

    //         } else {

    //         }
    //     }
    // }
    // 输入人员
    searchChangeLeaders(event) {
        if (event) {
            let username = event.target.value.replace(/^\s*|\s*$/g, '');
            this.leadersHolder = true;
            this.leaderStatus = true;
            // console.log(this.getTextWidth(event.target.value));
            if (this.getTextWidth(event.target.value) < 10) {
                $('#searchLeaders').css({
                    width: 100 + '%'
                });
            } else {
                $('#searchLeaders').css({
                    width: this.getTextWidth(event.target.value) + 'px'
                });
            }
            // tslint:disable-next-line:max-line-length
            (this.http.get(`/api/user/expand/getUser?username=${username}`).map(res => res.json()) as Observable<Response>).subscribe((data: any) => {
                this.searchTipLeaders = [];
                this.leaderStatus = false;
                if (data) {
                    event.target.value = '';
                    $('#searchLeaders').css({
                        width: 100 + '%'
                    });
                    this.searchTipLeaders = [data]
                    if (this.judgeUserHas(data.id, this.searchOptionsLeaders)) {
                        return this.tipMessage('error', '此人员已添加', 3000);
                    } else {
                        this.searchOptionsLeaders.push(data);
                    }
                }
            });
        }
    }
    // change他
    // changeHolder(event) {
    //     this.leadersHolder = true;
    // }
    // 删除某个班级负责人
    removeLeaders(evt, id, value) {
        evt.stopPropagation ? evt.stopPropagation() : evt.cancelBubble = true;
        this.searchOptionsLeaders = this.searchOptionsLeaders.filter((item, index) => {
            return item.id !== id;
        })
    }
    // 切换选择与未选
    toggleChooseLearders(evt, id, value) {
        evt.stopPropagation ? evt.stopPropagation() : evt.cancelBubble = true;
        this.leadersHolder = true;
        this.leaderToggle = !this.leaderToggle;
        if (this.pullDataInArray(this.searchOptionsLeaders).indexOf(id) != -1) {
            this.searchOptionsLeaders = this.searchOptionsLeaders.filter((item, index) => {
                return item.id != id
            })
        } else {
            this.searchOptionsLeaders.push(value);
        }
    }
    // 班级执行人
    searchChangePerformers(event) {
        if (event) {
            let username = event.target.value.replace(/^\s*|\s*$/g, '');
            this.performersHolder = true;
            this.performerStatus = true;
            if (this.getTextWidth(event.target.value) < 10) {
                $('#searchPerformers').css({
                    width: 100 + '%'
                });
            } else {
                $('#searchPerformers').css({
                    width: this.getTextWidth(event.target.value) + 'px'
                });
            }
            // tslint:disable-next-line:max-line-length
            (this.http.get(`/api/user/expand/getUser?username=${username}`).map(res => res.json()) as Observable<Response>).subscribe((data: any) => {
                this.searchTipPerformers = [];
                this.performerStatus = false;
                if (data) {
                    event.target.value = '';
                    $('#searchPerformers').css({
                        width: 100 + '%'
                    });
                    this.searchTipPerformers = [data];
                    this.searchOptionsPerformers = [data];
                }
            });
        }
    }
    // changePerformHolder(event) {
    //     this.performersHolder = true;
    // }
    // 删除某个班级执行人
    removePerformers(evt, id, value) {
        evt.stopPropagation ? evt.stopPropagation() : evt.cancelBubble = true;
        this.searchOptionsPerformers = this.searchOptionsPerformers.filter((item, index) => {
            return item.id != id
        })
    }
    // 切换显示影藏
    toggleChoosePerformers(evt, id, value) {
        evt.stopPropagation ? evt.stopPropagation() : evt.cancelBubble = true;
        this.performersHolder = true;
        this.performersToggle = !this.performersToggle;
        if (this.pullDataInArray(this.searchOptionsPerformers).indexOf(id) != -1) {
            this.searchOptionsPerformers = this.searchOptionsPerformers.filter((item, index) => {
                return item.id != id
            })
        } else {
            this.searchOptionsPerformers.push(value);
        }
    }
    // 班级助教
    searchChangeAssistants(event) {
        if (event) {
            let username = event.target.value.replace(/^\s*|\s*$/g, '');
            this.assistantsHolder = true;
            this.assistantStatus = true;
            if (this.getTextWidth(event.target.value) < 10) {
                $('#searchAssistants').css({
                    width: 100 + '%'
                });
            } else {
                $('#searchAssistants').css({
                    width: this.getTextWidth(event.target.value) + 'px'
                });
            }
            // tslint:disable-next-line:max-line-length
            (this.http.get(`/api/user/expand/getUser?username=${username}`).map(res => res.json()) as Observable<Response>).subscribe((data: any) => {
                this.searchTipAssistants = [];
                this.assistantStatus = false;
                if (data) {
                    this.searchTipAssistants = [data];
                    event.target.value = '';
                    $('#searchAssistants').css({
                        width: 100 + '%'
                    });
                    if (this.judgeUserHas(data.id, this.searchOptionsAssistants)) {
                        return this.tipMessage('warning', '此人员已添加', 3000);
                    } else {
                        this.searchOptionsAssistants.push(data);
                    }
                }
            });
        }
    }
    // 光标移开tip消失
    // changeAssistantsHolder(event) {
    //     this.assistantsHolder = true;
    // }
    // 删除
    removeAssistants(evt, id, value) {
        evt.stopPropagation ? evt.stopPropagation() : evt.cancelBubble = true;
        this.searchOptionsAssistants = this.searchOptionsAssistants.filter((item, index) => {
            return item.id !== id;
        })
    }
    // toggle
    toggleChooseAssistants(evt, id, value) {
        evt.stopPropagation ? evt.stopPropagation() : evt.cancelBubble = true;
        this.assistantsHolder = true;
        this.assistantsToggle = !this.assistantsToggle;
        if (this.pullDataInArray(this.searchOptionsAssistants).indexOf(id) != -1) {
            this.searchOptionsAssistants = this.searchOptionsAssistants.filter((item, index) => {
                return item.id != id
            })
        } else {
            this.searchOptionsAssistants.push(value);
        }
    }
    // 将list转化
    getSelectValue(array: any[]) {
        let selectValue = [];
        array.map((item, index) => {
            selectValue.push({
                id: item.id,
                displayName: item.displayName,
                username: item.username
            })
        })
        return selectValue;
    }
    // 将数据放入数组
    pullDataInArray(array: any[]) {
        let array1 = [];
        array.map((item, index) => {
            array1.push(item.id)
        })
        return array1;
    }
    // 判断人员是否存在
    judgeUserHas(id, array: any[]) {
        return array.some((item, index) => {
            return item.id == id;
        })
    }
    getTextWidth(value) {
        let sensor = $('<pre>' + value + '</pre>').css({ display: 'none' });
        $('body').append(sensor);
        let width = sensor.width();
        sensor.remove();
        return width;
    }
    // 删除培训基地
    removeTrainBase(event, id, value) {
        let offeringId = this.trainingClass.id;
        this.apiservice.deleteTrainBase(offeringId, [id]).subscribe(
            res => {
                this.showAddTrainBase = true;
                this.trainBase = this.trainBase.filter((item) => {
                    return item.id !== id;
                })
                tipMessage('删除基地成功！', 'success');
            },
            err => {
                tipMessage(err);
            }
        )
    }
    addTrainBase() {
        this.isVisible = true;
        this.loadData();
    }
    handleCancel(event) {
        this.isVisible = false;
        this.selection = [];

    }
    handleOk(event) {
        if (this.selection.length) {
            this.trainBaseLoading = true;
            let trainBasesId = this.selection[0].id;
            let offeringId = this.trainingClass.id;
            // tslint:disable-next-line:max-line-length
            this.apiservice.trainBaseSave(offeringId, trainBasesId).subscribe(
                res => {
                    this.trainBase = this.selection;
                    this.showAddTrainBase = false;
                    this.isVisible = false;
                    tipMessage('添加保存基地成功！', 'success', 2000);
                    this.trainBaseLoading = false;
                },
                err => {
                    this.trainBaseLoading = false;
                    tipMessage(err);
                }
            )
        } else {
            return this.tipMessage('warning', '请选择基地');
        }

    }
    loadData(page?: any) {
        let params = {
            offeringId: this.trainingClass.id,
            baseName: this.searchtext,
            baseAddress: this._baseAddress,
            baseNo: this._baseNo,
            page: page ? page.number : 0,
            size: page ? page.size : 10,
            sort: page && page.sort ? page.sort : '',
            userGroupId: this.userGroupIds && this.userGroupIds.id || ''
        };
        this.spinning = true;
        this.apiservice.pageList(params).subscribe(
            pag => {
                this.trainBaseData = pag;
                this.spinning = false;
                this.selection = [];
            }
        );
    }
    lookviewTrainBase() {
        this.isVisibleTrainBase = true;
        this.loadBssIDList();
    }
    // 请求BSSID列表
    loadBssIDList(page?: any) {
        this.spinningTrainBase = true;
        let params = {
            size: page && page.size || 10,
            page: page && page.number || 0,
            baseId: this.trainBase[0].id
        }
        this.apiservice.lookWifi(params).subscribe((res) => {
            this.bssIdData = res;
            this.spinningTrainBase = false;
        },
            err => {
                this.tipMessage('error', err);
                this.spinningTrainBase = false;
            }
        )
    }
    handelChangePage(event) {
        // console.log(event);
        let page = {
            number: event - 1,
            size: this.pageSize
        }
        this.loadBssIDList(page)
    }
    handelPageSize(event) {
        // console.log(event)
        this.pageIndex = 1;
        let page = {
            number: this.pageIndex - 1,
            size: event
        }
        this.loadBssIDList(page)
    }
    handleCancelTrainBase() {
        this.isVisibleTrainBase = false;
        this.pageSize = 10;
        this.pageIndex = 1;
    }
    handleOkTrainBase() {
        this.isVisibleTrainBase = false;
        this.pageSize = 10;
        this.pageIndex = 1;
    }
    userLookupOkLeaders(value) {
        // console.log(value)
        let getUseData = this.getSelectValue(value);
        let idsArray = this.getUserId(this.searchOptionsLeaders);
        let filterArray = []
        if (this.judgeBooleanpeoplehas(idsArray, getUseData)) {

            filterArray = this.judgepopelhas(idsArray, getUseData)
            this.searchOptionsLeaders = this.searchOptionsLeaders.concat(filterArray)
        } else {
            this.searchOptionsLeaders = this.searchOptionsLeaders.concat(getUseData)
        }

    }
    userLookupOkPerformers(value) {
        let getUseData = this.getSelectValue(value);
        this.searchOptionsPerformers = getUseData;
    }
    userLookupOkAssistants(value) {
        let getUseData = this.getSelectValue(value);
        let idsArray = this.getUserId(this.searchOptionsAssistants);
        let filterArray = []
        if (this.judgeBooleanpeoplehas(idsArray, getUseData)) {

            filterArray = this.judgepopelhas(idsArray, getUseData)
            this.searchOptionsAssistants = this.searchOptionsAssistants.concat(filterArray)
        } else {
            this.searchOptionsAssistants = this.searchOptionsAssistants.concat(getUseData)
        }
    }
    // 判断人员是否有添加过滤
    judgepopelhas(array: any[], addArray: any[]) {
        return addArray.filter((item, index) => {
            return array.indexOf(item.id) == -1;
        })
    }
    // 判断是否有重复的用户
    judgeBooleanpeoplehas(array: any[], addArray: any[]) {
        return addArray.some((item) => {
            return array.indexOf(item.id) != -1
        })
    }
    getUserId(array) {
        let ids = [];
        array.map((item) => {
            ids.push(item.id)
        })
        return ids;
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
