/*
 * @Author: majunfeng
 * @Date: 2017-11-01 14:21:04
 * @Last Modified by: kxx
 * @Last Modified time: 2017-11-30 22:58:57
 */
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { User } from 'app/system/entity/user';
import { ExaminationService } from '../../service/examination.service';
import { NzModalService } from 'ng-zorro-antd';
import * as moment from 'moment';
import { CuiPagination } from 'console-ui-ng';
import { UserLookupService } from 'app/system/service/user-lookup.service';
import { error } from 'util';
import { UserLookupComponent } from '../../../../shared/widget/user-lookup/user-lookup.component';
import { setTimeout } from 'timers';
import { tipMessage } from 'app/account/entity/message-tip';

@Component({ selector: 'spk-exam-allot', templateUrl: './exam-allot.component.html', styleUrls: ['./exam-allot.component.scss'] })
export class ExamAllotComponent implements OnInit {
    examId: number;
    ShowEditJKtime: boolean = false;
    selectedTabIndex = 0;
    stCode: String = "JK";
    validateForm: FormGroup;
    paperId: number;
    zc: boolean = true;
    loading: boolean = false;
    ZCloading: boolean = true;
    selectPJ: boolean = false;
    FPListLoading: boolean;
    personColumnsData: User[];
    selectType: String;
    pagination: CuiPagination;
    markQueId: any;
    copyType: string;
    groupId: number = 1;
    ZCSelection: any[];
    selectZC: boolean = false;
    FPpersonColumnsData: any[];
    examStartTime: any;
    ZCColumnsData: any[] = [];
    searchtext: string; // 搜索内容
    personSelection: any = [];
    copyListLoading: boolean = true; // 待复制题目列表是否loading
    markSlection: any;
    readType: string; // 单行的阅卷方式
    FPcolumnsData: any;
    examEndTime: any;
    PJstartdate: any; // 阅卷开始时间
    PJenddate: any; // 阅卷结束时间
    FPstartdate: any; // 复评开始时间
    FPenddate: any; // 复评结束时间
    jkSubmitLoading: boolean;
    spinning: boolean = true; // 页面起始loading
    spin: boolean;   //  复评loading
    copyListvisible: boolean = false; // 显示待复制列表
    CopyListColumnsData: any; // 待复制题目列表数据
    // 待复制题目的定义变量
    CopyListColumns: any = [
        { title: '题号', data: 'queSort', styleClass: 'text-center' },
        { title: '题目类型', data: 'typeName', styleClass: 'text-center' },
        {
            title: '题目内容', tpl: 'casual', styleClass: 'text-center',
            style: { 'max-width': '400px', width: '400px' }
        }
    ]
    //  阅卷人员的定义变量
    columns2: any[] = [{
        title: '题号',
        data: 'queSort',
        styleClass: 'text-center',
        style: { width: '40px' }
    }, {
        title: '试题类型',
        data: 'typeName',
        styleClass: 'text-center',
        style: { width: '100px' }
    }, {
        title: '题目内容',
        tpl: 'casual',
        styleClass: 'text-center',
        style: { 'max-width': '130px', width: '130px' }
    }, {
        title: '阅卷方式',
        tpl: 'readType',
        styleClass: 'text-center'
    }, {
        title: '阅卷人',
        tpl: 'PJname',
        style: { 'white-space': 'inherit', 'width': '100px' },
        styleClass: 'text-center'
    }, {
        title: '是否仲裁',
        tpl: 'createdDate',
        style: { 'white-space': 'inherit', 'width': '50px' },
        styleClass: 'text-center'
    }, {
        title: '仲裁阅卷人',
        tpl: 'ZCname',
        style: { 'white-space': 'inherit', 'width': '120px' },
        styleClass: 'text-center'
    }, {
        title: '分数',
        data: 'subjectiveScore',
        styleClass: 'text-center'
    }, {
        title: '分数基准差',
        tpl: 'score',
        styleClass: 'text-center',
        style: { 'white-space': 'inherit', 'width': '80px', 'max-width': '80px' },
    }, {
        title: '阅卷设置',
        tpl: 'createdSet',
        styleClass: 'text-center',
        style: { 'width': '70px' }
    }
    ];
    FPcolumn: any[] = [
        {
            title: '题号',
            data: 'queSort',
            styleClass: 'text-center',
        },
        {
            title: '试题类型',
            data: 'typeName',
            styleClass: 'text-center',
            style: { 'max-width': '80px', width: '80px' }
        }, {
            title: '题目内容',
            tpl: 'casual',
            styleClass: 'text-center',
            style: { 'max-width': '300px', width: '300px' }
        }, {
            title: '复评人',
            tpl: 'FPName',
            styleClass: 'text-center'
        }, {
            title: '阅卷设置',
            tpl: 'createdSet',
            styleClass: 'text-center'
        }
    ];
    columnsData2: any[] = [];
    createOrEditor: boolean = true;
    _data: any = [];
    //  复评人员的定义变量
    validateFormR: FormGroup;
    startTime: any;
    endTime: any;
    selectFP: boolean = false;
    startdate;
    enddate;
    // 审核人员变量
    @ViewChild(UserLookupComponent)
    private SHuserLookup: UserLookupComponent;
    SHcolumns: any[] = [
        {
            title: '用户名',
            data: 'username',
            styleClass: 'text-center examination-room-table-col',
            style: { 'max-width': '140px' }
        },
        {
            title: '姓名',
            data: 'displayName',
            styleClass: 'text-center examination-room-table-col',
            style: { 'max-width': '140px' }
        }, {
            title: '所属机构',
            data: 'siteName',
            styleClass: 'text-center examination-room-table-col',
            style: { 'max-width': '140px' }
        }, {
            title: '审核范围',
            tpl: 'name',
            styleClass: 'text-center examination-room-table-col',
            style: { 'max-width': '140px' }
        }, {
            title: '创建人',
            tpl: 'administrator',
            styleClass: 'text-center examination-room-table-col',
            style: { 'max-width': '140px' }
        }, {
            title: '创建时间',
            tpl: 'createdDate',
            styleClass: 'text-center examination-room-table-col',
            style: { 'max-width': '140px' }
        }, {
            title: '开始时间',
            tpl: 'startTime',
            styleClass: 'text-center examination-room-table-col',
            style: { 'max-width': '140px' }
        }, {
            title: '结束时间',
            tpl: 'endTime',
            styleClass: 'text-center examination-room-table-col',
            style: { 'max-width': '140px' }
        }, {
            title: '操作',
            tpl: 'actSet',
            styleClass: 'text-center'
        }
    ];
    SHcolumnsData: any[] = [];
    SHselectData: any;
    SHListLoading: Boolean = false;
    SHqueryValue: any = {};
    SHpagination: CuiPagination;
    SHvisible: Boolean = false;
    SHmodalLoading: Boolean = false;
    SHrangeData: any;
    SHuserSelectData: any;
    SHstartdate: any;
    SHenddate: any;
    SHrangeClick: any;
    // 考场安排人员变量
    APcolumns: any[] = [
        {
            title: '用户名',
            data: 'username',
            styleClass: 'text-center examination-room-table-col',
            style: { 'max-width': '140px' }
        },
        {
            title: '姓名',
            data: 'displayName',
            styleClass: 'text-center examination-room-table-col',
            style: { 'max-width': '140px' }
        }, {
            title: '所属机构',
            data: 'siteName',
            styleClass: 'text-center examination-room-table-col',
            style: { 'max-width': '140px' }
        }, {
            title: '审核范围',
            tpl: 'name',
            styleClass: 'text-center examination-room-table-col',
            style: { 'max-width': '140px' }
        }, {
            title: '创建人',
            tpl: 'administrator',
            styleClass: 'text-center examination-room-table-col',
            style: { 'max-width': '140px' }
        }, {
            title: '创建时间',
            tpl: 'createdDate',
            styleClass: 'text-center examination-room-table-col',
            style: { 'max-width': '140px' }
        }, {
            title: '开始时间',
            tpl: 'startTime',
            styleClass: 'text-center examination-room-table-col',
            style: { 'max-width': '140px' }
        }, , {
            title: '结束时间',
            tpl: 'endTime',
            styleClass: 'text-center examination-room-table-col',
            style: { 'max-width': '140px' }
        }, {
            title: '操作',
            tpl: 'actSet',
            styleClass: 'text-center'
        }
    ];
    APcolumnsData: any[] = [];
    APselectData: any;
    APListLoading: Boolean = false;
    APqueryValue: any = {};
    APpagination: CuiPagination;
    APvisible: Boolean = false;
    APmodalLoading: Boolean = false;
    APrangeData: any;
    APuserSelectData: any;
    APstartdate: any;
    APenddate: any;
    APrangeClick: any;
    constructor(
        private route: ActivatedRoute,
        private examinationService: ExaminationService,
        private fb: FormBuilder,
        private userService: UserLookupService,
        private confirmServ: NzModalService,
    ) { }

    ngOnInit() {
        this.route.data.subscribe(
            (obj: { examination: any }) => {
                this.createOrEditor = obj.examination ? false : true;
                this.examId = obj.examination['examId'];
                if (!this.examId) {
                    this.examinationService.getOffering(obj.examination['id']).subscribe(
                        req => {
                            if (!req.examId) {
                                tipMessage("请先完善考试信息");
                                return;
                            } else {
                                this.examId = req.examId;
                                this.pageStart()
                            }
                        },
                        err => tipMessage(err)
                    )
                } else {
                    this.pageStart()
                }
            }
        );
    }
    pageStart() {
        this.examinationService.getExamDetail(this.examId + '').subscribe(
            data => {
                console.log('success');
                this.paperId = data.paperId;
                console.log(this.paperId);
                this.examStartTime = data.startTime;
                this.examEndTime = data.endTime;
                console.log(this.examStartTime, 'start')
                this.spinning = false;
            },
            err => tipMessage(err)
        )
    }
    // tabs翻页
    changeTabs(e) {
        if (e == 1) {
            this.loadMarking('PJ');
        } else if (e == 2) {
            this.loadFPList('FP');
        } else if (e == 3) {
            this.SHqueryValue = {};
            this.SHloadList();
        } else if (e == 4) {
            this.APqueryValue = {};
            this.APloadList();
        }
    }
    // 加载阅卷人员表单
    loadMarking(type) {
        let params = {
            paperId: this.paperId,
            examId: this.examId,
            stCode: type
        }
        this.spinning = true;
        // this.spinning = true;
        // 阅卷人列表初始数据处理
        this.examinationService.getSubjectiveQuestion(params).subscribe(
            data => {
                this.columnsData2 = data;
                for (let i = 0; i < this.columnsData2.length; i++) {
                    this.columnsData2[i].zc = false;
                    this.columnsData2[i].PJlist = [];
                    this.columnsData2[i].ZClist = [];
                    this.columnsData2[i].PJlist1 = [];
                    this.columnsData2[i].PJlist2 = [];
                    if (this.columnsData2[i].readType == null) {
                        this.columnsData2[i].readType = "ALONE";
                    }
                    for (let n = 0, list = this.columnsData2[i].staffList; n < list.length; n++) {
                        if (list[n].stCode == "ZC") {
                            this.columnsData2[i].zc = true;
                            this.columnsData2[i].ZClist.push(list[n]);
                            console.log('i', i, 'n', n);
                        } else if (list[n].stCode == "PJ") {
                            this.columnsData2[i].PJlist.push(list[n]);
                            console.log('i', i, 'n', n);
                            if (list[n].groupNum == 1) {
                                this.columnsData2[i].PJlist1.push(list[n]);
                                console.log('i', i, 'n', n);
                            } else if (list[n].groupNum == 2) {
                                this.columnsData2[i].PJlist2.push(list[n]);
                                console.log('i', i, 'n', n);
                            }
                        }
                    }

                    if (this.columnsData2[i].PJlist && this.columnsData2[i].PJlist.length > 0) {
                        this.PJstartdate = this.columnsData2[i].PJlist[0].startTime || '';
                        this.PJenddate = this.columnsData2[i].PJlist[0].endTime || '';
                    }
                }
                // this.spinning = false;
                this.spinning = false;
            },
            err => {
                tipMessage(err);
                this.spinning = false;
            }
        )
        // this.columnsData2 = this.json;
    }
    // 加载复评人员表单
    loadFPList(type) {
        // this.FPListLoading = true;
        this.spinning = true;
        let params = {
            paperId: this.paperId,
            examId: this.examId,
            stCode: type
        }
        this.examinationService.getSubjectiveQuestion(params).subscribe(
            data => {
                this.FPcolumnsData = data;
                for (let i = 0; i < this.FPcolumnsData.length; i++) {
                    this.FPcolumnsData[i].FPlist = [];
                    for (let n = 0, list = this.FPcolumnsData[i].staffList; n < list.length; n++) {
                        if (list[n].stCode == "FP") {
                            console.log('FP get');
                            this.FPcolumnsData[i].FPlist.push(list[n]);
                            console.log(this.FPcolumnsData[i].FPlist)
                        }
                    }

                    if (this.FPcolumnsData[i].FPlist && this.FPcolumnsData[i].FPlist.length > 0) {
                        this.FPstartdate = this.FPcolumnsData[i].FPlist[0].startTime || '';
                        this.FPenddate = this.FPcolumnsData[i].FPlist[0].endTime || '';
                    }
                }
                // this.FPListLoading = false;
                this.spinning = false;
            },
            err => {
                tipMessage(err);
                this.spinning = false;
            }
        )
    }
    deleteZC(item, row, stCode) {
        let self = this;
        console.log(item);
        console.log(row);
        this.confirmServ.confirm({
            content: '是否确认删除！',
            okText: '确定',
            cancelText: '取消',
            zIndex: 1003,
            // 弹窗操作
            onOk(e) {
                let params = {};
                self.spinning = true;
                if (stCode == 'PJ') {
                    params = {
                        markQueId: row.markQueId,
                        id: item.u.id,
                        examId: row.examId,
                        stCode: stCode
                    }
                } else {
                    params = {
                        markQueId: row.markQueId,
                        id: item.u.id,
                        examId: row.examId,
                    }
                }
                self.examinationService.deleteMark(params).subscribe(
                    date => {
                        tipMessage('删除成功', 'success')
                        self.loadMarking('PJ');
                    },
                    err => {
                        tipMessage(err);
                        self.spinning = false;
                    })
            }
        })
    }
    deleteZCAll(row) {
        let self = this;
        this.confirmServ.confirm({
            title: '修改提示',
            content: '确定修改仲裁人状态！',
            okText: '确定',
            cancelText: '取消',
            zIndex: 1003,
            // 弹窗操作
            onOk(e) {
                if (row.zc == false) {
                    if (row['ZClist'].length > 0) {
                        let ids = row['ZClist'].map(it => it.id);
                        let params = {
                            markQueId: row.markQueId,
                            id: ids,
                            examId: row.examId,
                        }

                        self.examinationService.deleteMark(params).subscribe(date => {
                            tipMessage('清除仲裁人成功', 'success');
                            self.loadMarking('PJ');
                        },
                            err => tipMessage(err))
                    }
                } else {
                    return;
                }
            },
            onCancel(e) { },
        }
        )
    }
    deleteFP(item, row) {
        let self = this;
        this.confirmServ.confirm({
            content: '是否确认删除！',
            okText: '确定',
            cancelText: '取消',
            zIndex: 1003,
            // 弹窗操作
            onOk(e) {
                let params = {
                    markQueId: row.markQueId,
                    id: item.u.id,
                    examId: row.examId
                }
                self.examinationService.deleteMark(params).subscribe(date => {
                    tipMessage('删除成功', 'success');
                    self.loadFPList('FP');
                },
                    err => tipMessage(err))
            }
        })
    }
    // 选择完监考人
    chooseJK(e) {
        if (!e) {
            return;
        }
        let ids = e.map(it => it.id);
        console.log(e);
        this.validateForm.get(`userIds`).setValue(ids);
        console.log(this.validateForm.get(`userIds`).value)
    }
    // 选择完阅卷人
    choosePJ(e, row, groupNum?: number) {
        if (!e) {
            return;
        }
        this.spinning = true;
        let startTime = this.PJstartdate && new Date(this.PJstartdate).getTime();
        let endTime = this.PJenddate && new Date(this.PJenddate).getTime();
        let ids = e.map(it => it.id);
        let value = {
            stCode: "PJ",
            examId: this.examId,
            userIds: ids,
            markQueId: row.markQueId,
            readType: row.readType,
            groupNum: groupNum,
            startTime: startTime || '',
            endTime: endTime || ''
        };
        this.examinationService.setInvigilatorCode(value).subscribe(
            data => {
                tipMessage('设置成功', 'success');
                this.loadMarking('PJ');
            },
            err => {
                tipMessage(err);
                this.loadMarking('PJ');
            }
        )
    }
    // 选择完仲裁人
    chooseZC(e, row) {
        if (!e) {
            return;
        }
        if (e.length > 1) {
            tipMessage('仲裁人只能选择一位');
            row.ZClist = [];
            return;
        }
        this.spinning = true;
        let startTime = this.PJstartdate && new Date(this.PJstartdate).getTime();
        let endTime = this.PJenddate && new Date(this.PJenddate).getTime();
        let ids = e.map(it => it.id);
        console.log(row, 'row');
        let value = {
            stCode: "ZC",
            examId: this.examId,
            userIds: ids,
            markQueId: row.markQueId,
            readType: row.readType,
            startTime: startTime || '',
            endTime: endTime || ''
        };
        this.examinationService.setInvigilatorCode(value).subscribe(
            data => {
                tipMessage('设置成功', 'success');
                this.loadMarking('PJ');
            },
            err => {
                tipMessage(err);
                this.spinning = false;
                row.ZClist = [];
            }
        )
    }
    // 选择完复评人
    chooseFP(e, row) {
        if (!e) {
            return;
        }
        this.spinning = true;
        let startTime = this.FPstartdate && new Date(this.FPstartdate).getTime();
        let endTime = this.FPenddate && new Date(this.FPenddate).getTime();
        let ids = e.map(it => it.id);
        console.log(row, 'row');
        let value = {
            stCode: "FP",
            examId: this.examId,
            userIds: ids,
            markQueId: row.markQueId,
            readType: row.readType,
            startTime: startTime || '',
            endTime: endTime || ''
        };
        this.examinationService.setInvigilatorCode(value).subscribe(
            data => {
                tipMessage('设置成功', 'success');
                this.loadFPList('FP');
            },
            err => {
                tipMessage(err);
                this.loadFPList('FP');
            })
    }

    //  切换阅卷方式
    readTypeChange(obj, e) {
        this.spinning = true;
        let params = {
            markQueId: obj.markQueId,
            readType: obj.readType,
            examId: obj.examId,
            stCode: "PJ"
        }
        console.log(e)
        this.examinationService.setReadType(params).subscribe(
            data => {
                tipMessage('切换阅卷方式成功', 'success');
                if (e == "ALONE") {
                    obj.score = '';
                    obj.zc = false;
                }
                obj.staffList = [];
                obj.ZClist = [];
                obj.PJlist = [];
                this.spinning = false;
            },
            err => tipMessage(err))
    }

    // 选择待复制题目
    showCopyList(row, type) {
        this.copyListvisible = true;
        this.markQueId = row.markQueId;
        this.copyType = type;
        this.loadCopyListData(row);
    }
    // 提交复制题目列表
    sublimtCopy() {
        console.log(this.markSlection);
        this.copyListvisible = false;
        this.copyListLoading = true;
        let ids = [];
        this.markSlection.map(it =>
            ids.push(it.markQueId))
        console.log(ids);
        let params = {
            examId: this.examId,
            stCode: this.copyType,
            markQueId: this.markQueId,
            markQueIds: ids
        }
        this.examinationService.copySubject(params).subscribe(
            data => {
                this.markSlection = [];
                if (this.copyType == "FP") {
                    this.loadFPList('FP')
                } else if (this.copyType == "PJ") {
                    this.loadMarking('PJ')
                }
            }, err => tipMessage(err)
        )
    }
    // 加载复制题目列表
    loadCopyListData(row) {
        this.copyListLoading = true;
        let params = {
            examId: this.examId,
            markQueId: row.markQueId
        };
        this.examinationService.getCopyList(params).subscribe(
            pag => {
                // this.CopyListColumnsData = pag;
                this.copyListLoading = false;
                this.CopyListColumnsData = pag;
            },
            err => tipMessage(err)
        );
    }
    // 设置基准分
    setScore(row) {
        if (!row.score) { row.score = 1 }
        if (row.score <= 0) {
            row.score = 1
        }
        if (row.subjectiveScore && row.score > row.subjectiveScore) {
            row.score = row.subjectiveScore;
        }
        let params = {
            id: row.markQueId,
            queScore: row.score || 1
        }
        this.examinationService.setScore(params).subscribe(data => {
            tipMessage('设置基准分成功', 'success')
        },
            error => tipMessage(error))
    }
    // 设置阅卷复评时间
    updateTime(type) {
        let params = {}, startTime, endTime;
        if (type == 'PJ') {
            startTime = this.PJstartdate && new Date(this.PJstartdate).getTime();
            endTime = this.PJenddate && new Date(this.PJenddate).getTime();
            if (startTime < this.startTime) {
                tipMessage('阅卷开始时间不能小于考试开始时间', '', 4000);
                this.PJstartdate = '';
                this.PJenddate = '';
                return;
            }
            if (endTime < this.startTime) {
                tipMessage('阅卷结束时间不能小于考试开始时间', '', 4000);
                this.PJstartdate = '';
                this.PJenddate = '';
                return;
            }
        } else if (type == 'FP') {
            startTime = this.FPstartdate && new Date(this.FPstartdate).getTime();
            endTime = this.FPenddate && new Date(this.FPenddate).getTime();
            if (startTime < this.startTime) {
                tipMessage('复评开始时间不能小于考试开始时间', '', 4000);
                this.FPstartdate = '';
                this.FPenddate = '';
                return;
            }
            if (endTime < this.endTime) {
                tipMessage('复评结束时间不能小于考试结束时间', '', 4000);
                this.FPstartdate = '';
                this.FPenddate = '';
                return;
            }
        }
        let i;
        if (startTime == null) {
            startTime = i;
        }
        if (endTime == null) {
            endTime = i;
        }
        params = {
            startTime: startTime,
            endTime: endTime,
            examId: this.examId,
            stCode: type
        }
        this.examinationService.setMarkTime(params).subscribe(
            data => {
                tipMessage('设置成功', 'success')
            },
            err => {
                tipMessage(err);
            }
        )
    }
    // 时间验证方法
    confirmStartDateValidator = (control: FormControl): { [s: string]: boolean } => {
        let controls = this.validateForm && this.validateForm.controls;
        if (controls) {
            const endTime = moment(controls[`enddate`].value).unix();
            if (control.value) {
                if (endTime < moment(control.value).unix()) {
                    this.validateForm.get(`enddate`).setValue(null);
                    tipMessage('结束时间不能小于开始时间！', '', 4000);
                    return;
                }
                if (moment(this.examEndTime).unix() < moment(control.value).unix()) {
                    tipMessage('监考时间不能大于考试结束时间', '', 4000);
                    return;
                }
                console.log(this.examStartTime, moment(control.value).unix())
                if (moment(this.examStartTime).unix() > moment(control.value).unix()) {
                    tipMessage('监考时间不能小于考试开始时间', '', 4000);
                    return;
                }
            }
        }
    }
    // 时间验证方法
    confirmEndDateValidator = (control: FormControl): { [s: string]: boolean } => {
        let controls = this.validateForm && this.validateForm.controls;
        if (controls) {
            const startTime = moment(controls[`startdate`].value).unix();
            if (control.value) {
                if (startTime > moment(control.value).unix()) {
                    this.validateForm.get(`startdate`).setValue(null);
                    tipMessage('结束时间不能小于开始时间！', '', 3000);
                    return;
                }
                if (moment(this.examEndTime).unix() < moment(control.value).unix()) {
                    tipMessage('监考时间不能大于考试结束时间', '', 3000);
                    return;
                }
                if (moment(this.examStartTime).unix() > moment(control.value).unix()) {
                    tipMessage('监考时间不能小于考试开始时间', '', 4000);
                    return;
                }
            }
        }
    }
    deleteJK(obj) {
        console.log(obj);
        // console.log(list, 'lise');
        let ids = obj.v.map(it => it.id);
        this.validateForm.get('users').setValue(obj.v);
        this.validateForm.get('userIds').setValue(ids);
        console.log(this.validateForm.value.userIds);
    }
    /*
     审核人员
     */
    SHloadList = (page?: CuiPagination) => {
        this.SHListLoading = true;
        this.SHpagination = page;
        // this.selection = [];
        let params: any;
        params = {
            stCode: 'SP',
            examId: this.examId,
            page: page ? page.number : 0,
            size: page ? page.size : 10,
            // sort: page && page.sort ? page.sort : null
        };
        if (this.SHqueryValue.username) {
            params.username = this.SHqueryValue.username
        }
        if (this.SHqueryValue.displayName) {
            params.displayName = this.SHqueryValue.displayName
        }
        this.examinationService.getApproverList(params).subscribe(
            data => {
                this.SHpagination = data;
                this.SHcolumnsData = data['content'];
                this.SHListLoading = false;
            },
            e => {
                tipMessage('查询失败')
                this.SHListLoading = false;
            }
        );
    }
    SHaddList = () => {
        this.SHuserLookup.openLookup();
    }
    SHrangeHandler = (data) => {
        this.SHvisible = true;
        this.SHrangeClick = data;
    }
    SHupdate = (data) => {
        if (this.SHstartdate && this.SHenddate) {
            this.examinationService.updateApprover({
                examId: this.examId,
                startTime: this.SHstartdate,
                endTime: this.SHenddate
            })
                .subscribe(
                d => {
                    tipMessage('操作成功', 'success');
                    this.SHloadList()
                },
                e => {
                    tipMessage('操作失败')
                }
                );
        } else {
            tipMessage('请选择正确时间')
        }
    }
    SHremove = (data) => {
        console.log(data, '删除用户')
        let self = this;
        this.confirmServ.confirm({
            title: '确认',
            content: '确认要删除？',
            showConfirmLoading: true,
            zIndex: 1003,
            onOk() {
                self.examinationService.deleteApprover({ id: data.id, stCode: 'SP' }).subscribe(
                    d => {
                        tipMessage('操作成功', 'success')
                        self.SHloadList()
                    },
                    e => {
                        tipMessage('操作失败')
                    }
                );
            },
            onCancel() {
            }
        });
    }
    SHhandleCancel = () => {// 审核范围取消
        this.SHvisible = false;
    }
    SHhandleOk = () => {// 审核范围确定
        this.SHvisible = false;
        console.log(this.SHrangeData.id, '审核范围确定')
        let sendData: any;
        sendData = {
            userGroupId: this.SHrangeData.id,
            id: this.SHrangeClick.id
        }
        this.examinationService.setApproverAudit(sendData).subscribe(
            data => {
                tipMessage('操作成功', 'success');
                this.SHloadList()
            },
            e => {
                tipMessage('操作失败')
            }
        );
    }
    SHSelectionChange = (data) => {// 审核范围框值change
        this.SHrangeData = data;
    }
    SHuserChangeHandler = (e, data) => {// 添加用户框确定回调
        console.log(this.SHuserSelectData, '添加用户框确定回调');
        if ((!!this.SHstartdate && !!this.SHenddate) === (!!this.SHstartdate || !!this.SHenddate)) {
            let arr = [];
            for (let i = 0; i < this.SHuserSelectData.length; i++) {
                arr.push(this.SHuserSelectData[i].id)
            }
            let sendData = {
                userIds: arr,
                startTime: this.SHstartdate,
                endTime: this.SHenddate,
                examId: this.examId,
                stCode: 'SP'
            }
            this.examinationService.addApprover(sendData).subscribe(
                // tslint:disable-next-line:no-shadowed-variable
                data => {
                    tipMessage('操作成功', 'success')
                    this.SHloadList()
                },
                // tslint:disable-next-line:no-shadowed-variable
                e => {
                    tipMessage('操作失败')
                }
            );
        } else {
            tipMessage('添加失败，请填写完整时间后重试', '', 4000)
        }
    }
    SHstartdateChange = (val) => {
        if (this.SHstartdate > this.SHenddate) {
            this.SHenddate = null;
        }
    }
    SHenddateChange = (val) => {
        if (this.SHstartdate > this.SHenddate) {
            this.SHstartdate = null;
        }
    }
    SHstartDisabledDate = (startValue) => {
        if (!startValue || !this.SHenddate) {
            return false;
        }
        return startValue && startValue.getTime() > this.SHenddate;
    }
    SHendDisabledDate = (endValue) => {
        if (!endValue || !this.SHstartdate) {
            return false;
        }
        return endValue && endValue.getTime() < this.SHstartdate;
    }
    submitJKtime() {
        let ids = this.SHselectData && this.SHselectData.length > 0 && this.SHselectData.map(it => it.id);
        if (!this.startdate && !this.enddate) {
            tipMessage('请设置审核时间！');
            return;
        }
        let params = {
            startTime: moment(this.startdate).format('x'),
            endTime: moment(this.enddate).format('x'),
            stCode: 'SP',
            examId: this.examId,
            ids: ids
        }
        if (!this.startdate) {
            delete params.startTime
        }
        if (!this.enddate) {
            delete params.endTime
        }
        this.examinationService.setMarkTime(params).subscribe(
            data => {
                tipMessage('设置成功', 'success');
                this.startdate = '';
                this.enddate = '';
                this.ShowEditJKtime = false;
                this.SHloadList();
            },
            err => {
                tipMessage(err);
            }
        )
    }
    clearJKtime() {
        let that = this;
        let str;
        if (this.SHselectData && this.SHselectData.length > 0) {
            str = "确定清除勾选数据审核时间？"
        } else {
            str = "确定清除所有数据审核时间？"
        }
        let ids = this.SHselectData && this.SHselectData.length > 0 && this.SHselectData.map(it => it.id);
        this.confirmServ.confirm({
            content: str,
            okText: '确定',
            cancelText: '取消',
            zIndex: 1003,
            onOk() {
                that.examinationService.setMarkTime({
                    stCode: 'SP',
                    examId: that.examId,
                    ids: ids
                }).subscribe(
                    data => {
                        tipMessage('清除成功', 'success')
                        that.SHloadList();
                    },
                    err => {
                        tipMessage(err);
                        that.SHloadList();
                    }
                    )
            }
        })
    }
    /*
    考场安排人员
    */
    APloadList = (page?: CuiPagination) => {
        this.APListLoading = true;
        this.APpagination = page;
        let params: any;
        params = {
            stCode: 'CK',
            examId: this.examId,
            page: page ? page.number : 0,
            size: page ? page.size : 10,
            // sort: page && page.sort ? page.sort : null
        };
        if (this.APqueryValue.username) {
            params.username = this.APqueryValue.username
        }
        if (this.APqueryValue.displayName) {
            params.displayName = this.APqueryValue.displayName
        }
        this.examinationService.getApproverList(params).subscribe(
            data => {
                this.APpagination = data;
                this.APcolumnsData = data['content'];
                this.APListLoading = false;
            },
            e => {
                tipMessage('查询失败');
                this.APListLoading = false;
            }
        );
    }
    APdoQuery = () => {

    }
    APaddList = () => {
        this.SHuserLookup.openLookup();
    }
    APrangeHandler = (data) => {
        this.APvisible = true;
        this.APrangeClick = data;
    }
    APremove = (data) => {
        console.log(data, '删除用户')
        let self = this;
        this.confirmServ.confirm({
            title: '确认',
            content: '确认要删除？',
            showConfirmLoading: true,
            zIndex: 1003,
            onOk() {
                self.examinationService.deleteApprover({ id: data.id, stCode: 'CK' }).subscribe(
                    // tslint:disable-next-line:no-shadowed-variable
                    data => {
                        tipMessage('操作成功', 'success')
                        self.APloadList()
                    },
                    e => {
                        tipMessage('操作失败')
                    }
                );
            },
            onCancel() {
            }
        });
    }
    APhandleCancel = () => {// 审核范围取消
        this.APvisible = false;
    }
    APhandleOk = () => {// 审核范围确定
        this.APvisible = false;
        console.log(this.APrangeData, '审核范围确定')
        let sendData: any;
        sendData = {
            userGroupId: this.APrangeData.id,
            id: this.APrangeClick.id
        }
        this.examinationService.setApproverAudit(sendData).subscribe(
            data => {
                tipMessage('操作成功', 'success')
                this.APloadList()
            },
            e => {
                tipMessage('操作失败')
            }
        );
    }
    APSelectionChange = (data) => {// 审核范围框值change
        this.APrangeData = data;
    }
    APuserChangeHandler = (e, data) => {// 添加用户框确定回调
        console.log(this.APuserSelectData, '添加用户框确定回调');
        if ((!!this.APstartdate && !!this.APenddate) === (!!this.APstartdate || !!this.APenddate)) {
            let arr = [];
            for (let i = 0; i < this.APuserSelectData.length; i++) {
                arr.push(this.APuserSelectData[i].id)
            }
            let sendData = {
                userIds: arr,
                startTime: this.APstartdate,
                endTime: this.APenddate,
                examId: this.examId,
                stCode: 'CK'
            }
            this.examinationService.addApprover(sendData).subscribe(
                // tslint:disable-next-line:no-shadowed-variable
                data => {
                    tipMessage('操作成功', 'success');
                    this.APloadList()
                },
                // tslint:disable-next-line:no-shadowed-variable
                e => {
                    tipMessage('操作失败')
                }
            );
        } else {
            tipMessage('添加失败，请填写完整时间后重试', '', 5000)
        }
    }
    APstartdateChange = (val) => {
        if (this.APstartdate > this.APenddate) {
            this.APenddate = null;
        }
    }
    APenddateChange = (val) => {
        if (this.APstartdate > this.APenddate) {
            this.APstartdate = null;
        }
    }
    APstartDisabledDate = (startValue) => {
        if (!startValue || !this.APenddate) {
            return false;
        }
        return startValue && startValue.getTime() > this.APenddate;
    }
    APendDisabledDate = (endValue) => {
        if (!endValue || !this.APstartdate) {
            return false;
        }
        return endValue && endValue.getTime() < this.APstartdate;
    }
    PJstartChange(e) {
        console.log(e);
        if (moment(e).unix() > moment(this.PJenddate).unix()) {
            tipMessage('阅卷开始时间不能大于结束时间', '', 4000);
            this.PJenddate = '';
        }
    }
    PJendChange(e) {
        console.log(e);
        if (moment(e).unix() < moment(this.PJstartdate).unix()) {
            tipMessage('阅卷开始时间不能大于结束时间', '', 4000);
            this.PJstartdate = '';
        }
    }
    FPstartChange(e) {
        if (moment(e).unix() > moment(this.FPenddate).unix()) {
            tipMessage('复评开始时间不能大于结束时间', '', 4000);
            this.FPenddate = '';
        }
    }
    FPendChange(e) {
        if (moment(e).unix() < moment(this.FPstartdate).unix()) {
            tipMessage('复评开始时间不能大于结束时间', '', 4000);
            this.FPstartdate = '';
        }
    }
    _disabledStartDate = (startValue) => {
        return startValue.getTime() < this.examStartTime;
    };
    _disabledFPenDate = (startValue) => {
        return startValue.getTime() < this.examEndTime;
    }
}

