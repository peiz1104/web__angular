import { Component, OnInit, ViewChild, ContentChild } from "@angular/core";
import {
    FormGroup,
    FormBuilder,
    Validators,
    FormControl
} from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { User } from "app/system/entity/user";
import { ExaminationService } from "../../service/examination.service";
import { NzModalService } from "ng-zorro-antd";
import * as moment from "moment";
import { CuiPagination } from "console-ui-ng";
import { UserLookupService } from "app/system/service/user-lookup.service";
import { error } from "util";
import { UserLookupComponent } from "../../../../shared/widget/user-lookup/user-lookup.component";
import { setTimeout } from "timers";
import { tipMessage } from "app/account/entity/message-tip";
// import ExamMarkingBoxComponent from './exam-marking-box/exam-marking-box.component';

@Component({
    selector: "spk-exam-new-allot",
    templateUrl: "./exam-new-allot.component.html",
    styleUrls: ["./exam-new-allot.component.scss"]
})
export class ExamNewAllotComponent implements OnInit {
    @ViewChild('PJMarking') PJMarking;
    @ViewChild('FPMarking') FPMarking;
    @ViewChild('SHTREE') SHTREE;
    ShowEditSPtime: boolean = false;
    examId: number;
    selectedTabIndex = 0;
    stCode: String = "JK";
    validateForm: FormGroup;
    paperId: number;
    loading: boolean = false;
    selectPJ: boolean = false;
    FPListLoading: boolean;
    personColumnsData: User[];
    selectType: String;
    submitGroupLoading: boolean;
    pagination: CuiPagination;
    markQueId: any;
    copyType: string;
    groupId: number = 1;
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
    jkSubmitLoading: boolean;
    spinning: boolean = false; // 页面起始loading
    spin: boolean; //  复评loading
    copyListvisible: boolean = false; // 显示待复制列表
    CopyListColumnsData: any; // 待复制题目列表数据
    // 待复制题目的定义变量
    CopyListColumns: any = [
        { title: "题号", data: "queSort", styleClass: "text-center" },
        { title: "题目类型", data: "typeName", styleClass: "text-center" },
        {
            title: "题目内容",
            tpl: "casual",
            styleClass: "text-center",
            style: { "max-width": "400px", width: "400px" }
        }
    ];
    createOrEditor: boolean = true;
    _data: any = [];
    //  复评人员的定义变量
    validateFormR: FormGroup;
    startTime: any;
    endTime: any;
    selectFP: boolean = false;
    // 审核人员变量
    @ViewChild(UserLookupComponent) private SHuserLookup: UserLookupComponent;
    SHcolumns: any[] = [
        {
            title: "用户名",
            data: "username",
            styleClass: "text-center examination-room-table-col",
            style: { "max-width": "140px" }
        },
        {
            title: "姓名",
            data: "displayName",
            styleClass: "text-center examination-room-table-col",
            style: { "max-width": "140px" }
        },
        {
            title: "所属机构",
            data: "siteName",
            styleClass: "text-center examination-room-table-col",
            style: { "max-width": "140px" }
        },
        {
            title: "审核范围",
            tpl: "name",
            styleClass: "text-center examination-room-table-col",
            style: { "max-width": "140px" }
        },
        {
            title: "创建人",
            tpl: "administrator",
            styleClass: "text-center examination-room-table-col",
            style: { "max-width": "140px" }
        },
        {
            title: "创建时间",
            tpl: "createdDate",
            styleClass: "text-center examination-room-table-col",
            style: { "max-width": "140px" }
        },
        {
            title: "开始时间",
            tpl: "startTime",
            styleClass: "text-center examination-room-table-col",
            style: { "max-width": "140px" }
        },
        {
            title: "结束时间",
            tpl: "endTime",
            styleClass: "text-center examination-room-table-col",
            style: { "max-width": "140px" }
        },
        {
            title: "操作",
            tpl: "actSet",
            styleClass: "text-center"
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
    startdate;
    enddate;
    SHrangeClick: any;
    groupMemberPagination: CuiPagination;
    // 考场安排人员变量
    APcolumns: any[] = [
        {
            title: "用户名",
            data: "username",
            styleClass: "text-center examination-room-table-col",
            style: { "max-width": "140px" }
        },
        {
            title: "姓名",
            data: "displayName",
            styleClass: "text-center examination-room-table-col",
            style: { "max-width": "140px" }
        },
        {
            title: "所属机构",
            data: "siteName",
            styleClass: "text-center examination-room-table-col",
            style: { "max-width": "140px" }
        },
        {
            title: "审核范围",
            tpl: "name",
            styleClass: "text-center examination-room-table-col",
            style: { "max-width": "140px" }
        },
        {
            title: "创建人",
            tpl: "administrator",
            styleClass: "text-center examination-room-table-col",
            style: { "max-width": "140px" }
        },
        {
            title: "创建时间",
            tpl: "createdDate",
            styleClass: "text-center examination-room-table-col",
            style: { "max-width": "140px" }
        },
        {
            title: "开始时间",
            tpl: "startTime",
            styleClass: "text-center examination-room-table-col",
            style: { "max-width": "140px" }
        },
        ,
        {
            title: "结束时间",
            tpl: "endTime",
            styleClass: "text-center examination-room-table-col",
            style: { "max-width": "140px" }
        },
        {
            title: "操作",
            tpl: "actSet",
            styleClass: "text-center"
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
    PSeditModal: boolean = false; // 编辑模态框显示
    PSMarkingOptions = [
        { value: '1', label: '第一次' },
        { value: '2', label: '最后一次' },
        { value: '4', label: '最高分' }
    ];
    PJPMMarkingOptions = [];
    FPPMMarkingOptions = [];
    PMAddGroupModal: boolean = false; // 新增阅卷人组模态框
    bindGroupModal: boolean = false; // 绑定阅卷人组模态框
    groupListModal: boolean = false; // 阅卷组列表模态框
    showGroupMember: boolean = false; // 显示组内成员模态框
    PMEditGroupModal: boolean = false; // 编辑阅卷人组模态框
    viewPaper: boolean = false; // 显示客观题列表
    bindGroupColumns = [
        { title: "组名称", data: "markGroupName", styleClass: "text-center" },
        { title: "组内成员", tpl: "markTeacherCount", styleClass: "text-center" },
        { title: "创建人", data: "displayName", styleClass: "text-center" },
        { title: "创建时间", tpl: "createdDate", styleClass: "text-center" },
        { title: "引用试题（序号）", data: "queSortList", styleClass: "text-center" }
    ]
    bindGroupColumnsData: any[] = [];
    markModeId: number; // 阅卷id
    markEndTime: any; // 阅卷人组设置结束时间
    markStartTime: any;
    markUserCount: number; // 阅卷人组分配人数
    markGroupName: string; // 阅卷人组名称
    markScoreMode: any; // 阅卷人组评分规则
    description: string; // 阅卷组描述
    _MemberSearch: FormGroup;
    bingGroupSearch: FormGroup;
    markGroupId: number; // 编辑时传的阅卷组ID
    groupMemberColumns = [
        { title: "用户名", data: "username", styleClass: "text-center" },
        { title: "姓名", data: "displayName", styleClass: "text-center" },
        { title: "归属组织", data: "userGroupName", styleClass: "text-center" }
    ]
    groupMemberColumnsData = [];
    userCount: number; // 参加考试用户数量
    bindGroupSelection: any[] = []; // 选中的绑定组
    bindMarkQueId: number; // 待绑定题目id
    teacherListParams: any; // 阅卷组老师列表参数
    viewPaperParams: any; // 获取客观题列表参数
    queSort: number; // 绑定题目题号
    markTypeData: any = [];
    markScoreModeData: any;
    showJK: boolean; // tab切换到JK
    showPJ: boolean; // tab切换到PJ
    showFP: boolean; // tab切换到FP
    showSP: boolean; // tab切换到SP
    showKA: boolean; // tab切换到KA
    constructor(
        private route: ActivatedRoute,
        private examinationService: ExaminationService,
        private fb: FormBuilder,
        private userService: UserLookupService,
        private confirmServ: NzModalService
    ) { }

    ngOnInit() {
        // 异步加载下拉列表
        // 管理员类型
        this.examinationService.getDictionaries({ dicType: 'STAFF_TYPE' }).subscribe(
            data => {
                this.markTypeData = data.map(it => {
                    return { value: it.dicCode, label: it.dicName }
                })
            },
            err => {
                tipMessage(err);
            }
        )
        // 阅卷评分规则
        this.examinationService.getDictionaries({ dicType: 'MARK_SCORE_MODE_PJ' }).subscribe(
            data => {
                this.PJPMMarkingOptions = data.map(it => {
                    return { value: it.dicCode, label: it.dicName }
                })
            }, err => {
                tipMessage(err);
            }
        )
        // 复评评分规则
        this.examinationService.getDictionaries({ dicType: 'MARK_SCORE_MODE_FP' }).subscribe(
            data => {
                this.FPPMMarkingOptions = data.map(it => {
                    return { value: it.dicCode, label: it.dicName }
                })
            }, err => {
                tipMessage(err);
            }
        )
        this._MemberSearch = this.fb.group({
            username: [""],
            displayName: [""],
        });
        this.bingGroupSearch = this.fb.group({
            markGroupName: [""],
            markTeacherCount: [""]
        })
        this.spinning = true;
        this.route.data.subscribe((obj: { examination: any }) => {
            this.createOrEditor = obj.examination ? false : true;
            this.examId = obj.examination["examId"];
            if (!this.examId) {
                this.examinationService.getOffering(obj.examination["id"]).subscribe(
                    req => {
                        if (!req.examId) {
                            tipMessage("请先完善考试信息");
                            return;
                        } else {
                            this.examId = req.examId;
                            this.pageStart();
                        }
                    },
                    err => tipMessage(err)
                );
            } else {
                this.pageStart();
            }
        });
    }
    pageStart() {
        this.examinationService.getExamDetail(this.examId + "").subscribe(
            data => {
                console.log("success");
                this.paperId = data.paperId;
                this.examStartTime = data.startTime;
                this.examEndTime = data.endTime;
                console.log(this.examStartTime, "start");
                this.spinning = false;
            },
            err => tipMessage(err)
        );
    }
    // 判断是否显示tab
    showTab(code) {
        for (let i = 0; i < this.markTypeData.length; i++) {
            if (this.markTypeData[i].value == code) {
                return true;
            }
        }
        return false;
    }
    // tabs翻页
    changeTabs(e) {
        if (e == 3) {
            this.SHqueryValue = {};
            this.SHloadList();
        } else if (e == 4) {
            this.APqueryValue = {};
            this.APloadList();
        }
    }

    // 关闭组内成员模态框
    closeShowGroupMember() {
        this.showGroupMember = false;
        this._MemberSearch.get('username').setValue('');
        this._MemberSearch.get('displayName').setValue('');
    }
    // PS编辑模态框
    PSedit(obj) {
        this.PSeditModal = true;
        this.markGroupId = obj.row.id;
        this.markGroupName = obj.row.markGroupName;
        this.copyType = obj.markType;
        this.markEndTime = obj.row.endTime;
        this.markStartTime = obj.row.startTime;
    }
    // PM编辑模态框
    PMedit(obj) {
        this.copyType = obj.markType;
        this.PMAddGroupModal = true;
        this.markUserCount = -1;
        this.examinationService.getAllotUserCount({ opType: 'add', opId: obj.markSettingId }).subscribe(
            data => {
                if (data.errcode == 'ok') {
                    this.userCount = data.userCount
                } else {
                    tipMessage(data.errcode)
                }
            },
            err => {
                tipMessage(err);
            }
        )
    }
    PMeditGroup(obj) {
        this.examinationService.getAllotUserCount({ opType: 'update', opId: obj.row.id }).subscribe(
            data => {
                if (data.errcode == 'ok') {
                    this.userCount = data.userCount
                } else {
                    tipMessage(data.errcode)
                }
            },
            err => {
                tipMessage(err);
            }
        )
        this.examinationService.getMarkGroupInfo({ markGroupId: obj.row.id }).subscribe(
            data => {
                this.markGroupName = data.markGroupName;
                this.markScoreMode = data.markScoreMode + '';
                this.markStartTime = data.startTime;
                this.markEndTime = data.endTime;
                this.markUserCount = data.markUserCount;
                this.markGroupId = data.id;
                this.description = data.remark;
            },
            err => { tipMessage(err) }
        )
        this.copyType = obj.markType;
        this.PMEditGroupModal = true;
    }
    bindGroup(obj?) {
        this.bindGroupModal = true;
        this.bindMarkQueId = obj.row.markQueId;
        this.copyType = obj.markType;
        let params = {
            markSettingId: this.copyType == 'PJ' ? this.PJMarking.returnId() : this.FPMarking.returnId(),
            dataType: ''
        }
        this.queSort = obj.row.queSort
        this.loadBindGroup(params);
    }
    showGroup(obj) {
        this.groupListModal = true;
        this.copyType = obj.markType;
        console.log(obj);
        let params = {
            markSettingId: this.copyType == 'PJ' ? this.PJMarking.returnId() : this.FPMarking.returnId(),
            markQueId: obj.row.markQueId
        }
        this.showBindGroup(params);
    }
    showBindGroup(params) {
        this.examinationService.viewGroupListByQue(params).subscribe(
            data => {
                this.bindGroupColumnsData = data;
            },
            error => { tipMessage(error) }
        )
    }
    bindGroupSubmit(content, value) {
        let num: boolean = /^[0-9]*$/.test(value.markTeacherCount);
        if (!num) {
            tipMessage("人数只能为纯数字！");
            return;
        }
        let params = {
            markSettingId: this.copyType == 'PJ' ? this.PJMarking.returnId() : this.FPMarking.returnId(),
            dataType: '',
            ...value
        };
        this.loadBindGroup(params);
    }
    getMarkId(id) {
        this.markModeId = id;
    }
    _showMemberGroup(obj) {
        this.showGroupMember = true;
        this.copyType = obj.markType;
        this.teacherListParams = { markGroupId: obj.row.id };
        this.loadGroupMember();
    }
    // 显示客观题列表
    showViewPaper(obj) {
        this.viewPaper = true;
        this.copyType = obj.markType;
        this.viewPaperParams = {
            paperId: this.paperId,
            markSettingId: obj.markSettingId
        }
    }
    // 单人阅卷编辑提交
    submitPSEdit() {
        if (this.markGroupName.trim() == '') {
            tipMessage('请输入组织名');
            return;
        }
        let params = {
            id: this.markGroupId,
            markGroupName: this.markGroupName,
            markSettingId: this.copyType == 'PJ' ? this.PJMarking.returnId() : this.FPMarking.returnId(),
            startTime: this.markStartTime,
            markUserCount: -1,
            endTime: this.markEndTime
        }
        this.examinationService.editMarkGroup(params).subscribe(
            data => {
                console.log(data);
                this.PSeditModal = false;
                let i;
                this.markGroupName = i;
                this.markStartTime = i;
                this.markEndTime = i;
                this.copyType == 'PJ' ? this.PJMarking.loadPS() : this.FPMarking.loadPS();
            }, err => {
                tipMessage(err);
            }
        )
    }
    // 单人阅卷取消编辑
    cancelPSEdit() {
        this.PSeditModal = false;
        this.PMEditGroupModal = false;
        let i;
        this.markGroupName = i;
        this.markScoreMode = i;
        this.markStartTime = i;
        this.markEndTime = i;
        this.markUserCount = i;
        this.description = i;

    }
    // 试卷分配 多人新增阅卷人组提交
    submitAddGroup() {
        if (!this.markGroupName || this.markGroupName.trim() == '') {
            tipMessage('请输入组织名!');
            return;
        }
        if (!this.markScoreMode) {
            tipMessage('请选择评分规则!');
            return;
        }
        if (!this.markUserCount && this.markUserCount !== 0) {
            tipMessage('请分配阅卷人');
            return;
        }
        if (this.markUserCount > this.userCount) {
            tipMessage("不能大于可分配人数");
            return;
        }
        let params = {
            markGroupName: this.markGroupName,
            markScoreMode: this.markScoreMode,
            markSettingId: this.copyType == 'PJ' ? this.PJMarking.returnId() : this.FPMarking.returnId(),
            startTime: this.markStartTime,
            remark: this.description,
            endTime: this.markEndTime,
            markUserCount: this.markUserCount
        }
        this.examinationService.addGroup(params).subscribe(
            data => {
                console.log(data);
                this.PMAddGroupModal = false;
                let i;
                this.markGroupName = i;
                this.markScoreMode = i;
                this.markStartTime = i;
                this.markEndTime = i;
                this.markUserCount = i;
                this.description = i;
                this.copyType == 'PJ' ? this.PJMarking.loadPM() : this.FPMarking.loadPM();
            }, err => {
                tipMessage(err);
            }
        )
    }
    // 试卷分配 多人编辑阅卷人组提交
    submitEditGroup() {
        if (!this.markGroupName || this.markGroupName.trim() == '') {
            tipMessage('请输入组织名!');
            return;
        }
        if (!this.markScoreMode) {
            tipMessage('请选择评分规则!');
            return;
        }
        if (!this.markUserCount && this.markUserCount !== 0) {
            tipMessage('请分配阅卷人');
            return;
        }
        if (this.markUserCount > this.userCount) {
            tipMessage("不能大于可分配人数");
            return;
        }
        let params = {
            id: this.markGroupId,
            markGroupName: this.markGroupName,
            markScoreMode: this.markScoreMode,
            markSettingId: this.copyType == 'PJ' ? this.PJMarking.returnId() : this.FPMarking.returnId(),
            startTime: this.markStartTime,
            endTime: this.markEndTime,
            remark: this.description,
            markUserCount: this.markUserCount
        }
        this.examinationService.editMarkGroup(params).subscribe(
            data => {
                console.log(data);
                this.PMEditGroupModal = false;
                let i;
                this.markGroupName = i;
                this.markScoreMode = i;
                this.markStartTime = i;
                this.markEndTime = i;
                this.markUserCount = i;
                this.copyType == 'PJ' ? this.PJMarking.loadPM() : this.FPMarking.loadPM();
            }, err => {
                tipMessage(err);
            }
        )
    }
    // 提交复制题目列表
    sublimtCopy() {
        this.copyListvisible = false;
        this.copyListLoading = true;
        let ids = [];
        if (!this.markSlection || this.markSlection.length <= 0) {
            return;
        }
        this.markSlection.map(it => ids.push(it.markQueId));
        if (!ids || ids.length <= 0) {
            return;
        }
        let params = {
            examId: this.examId,
            markQueId: this.markQueId,
            markQueIds: ids,
            markSettingId: this.copyType == 'PJ' ? this.PJMarking.returnId() : this.FPMarking.returnId()
        };
        this.examinationService.submitCopy(params).subscribe(
            data => {
                this.markSlection = [];
                this.copyType == "PJ" ? this.PJMarking.loadTQ() : this.FPMarking.loadTQ();
            },
            err => tipMessage(err)
        );
    }
    // 试题分配绑定阅卷组
    submitBindGroup() {
        console.log(this.bindGroupSelection)
        this.submitGroupLoading = true;
        let ids = this.bindGroupSelection.map(
            it => it.id
        )
        let params = {
            markSettingId: this.copyType == 'PJ' ? this.PJMarking.returnId() : this.FPMarking.returnId(),
            markQueId: this.bindMarkQueId,
            arrMarkGroupId: ids
        }
        this.examinationService.addMarkGroupQuestion(params).subscribe(
            data => {
                this.bindGroupModal = false;
                this.submitGroupLoading = false;
                this.copyType == 'PJ' ? this.PJMarking.loadTQ() : this.FPMarking.loadTQ();
            },
            error => {
                tipMessage(error);
                this.bindGroupModal = false;
            }
        )
    }
    // 多人阅卷显示组内成员
    showGroupMemberModal(id) {
        this.teacherListParams = {
            markGroupId: id
        }
        this.showGroupMember = true;
        this.loadGroupMember();
    }
    // 添加客观题
    addQuestion(arr) {
        let params = {
            paperId: this.paperId,
            examId: this.examId,
            markSettingId: this.copyType == 'PJ' ? this.PJMarking.returnId() : this.FPMarking.returnId(),
        };
        let body = arr;
        this.examinationService.addQuestion(body, params).subscribe(
            data => {
                this.viewPaper = false;
                this.copyType == 'PJ' ? this.PJMarking.loadTQ() : this.FPMarking.loadTQ();
            }
        )
    }
    // 阅卷组老师列表搜索
    submitMemberSearch(content, value) {
        this.teacherListParams = {
            ...this.teacherListParams,
            ...value
        };
        this.loadGroupMember();
    }
    loadBindGroup(params) {
        this.examinationService.getGroupListBuQue(params).subscribe(
            data => {
                this.bindGroupColumnsData = data;
                this.bindGroupColumnsData.map(
                    it => {
                        if (it.queSortList.indexOf(this.queSort) != -1) {
                            it.checked = true;
                            // this.bindGroupSelection.push(it);
                            console.log(this.bindGroupSelection)
                        }
                    }
                )
            },
            error => { tipMessage(error) }
        )
    }
    loadGroupMember(page?: CuiPagination, id?) {
        this.groupMemberPagination = page;
        this.teacherListParams = {
            ...this.teacherListParams,
            page: page ? page.number : 0,
            size: page ? page.size : 10,
        }
        this.examinationService.getTeacherList(this.teacherListParams).subscribe(
            data => {
                this.groupMemberColumnsData = data.content;
                this.groupMemberPagination = data;
            }
        )
    }

    // 选择待复制题目
    showCopyList(obj) {
        this.copyListvisible = true;
        this.markQueId = obj.row.markQueId;
        this.copyType = obj.type;
        this.loadCopyListData();
    }
    // 加载复制题目列表
    loadCopyListData() {
        this.copyListLoading = true;
        let params = {
            examId: this.examId,
            markQueId: this.markQueId,
            markType: this.copyType
        };
        this.examinationService.getMarkQuestion(params).subscribe(
            pag => {
                // this.CopyListColumnsData = pag;
                this.copyListLoading = false;
                this.CopyListColumnsData = pag;
            },
            err => tipMessage(err)
        );
    }
    SHrangeSelectChange(row, id) {
        console.log('rowData', row);
        console.log('idData', id);
        switch (id) {
            case 1:
                this.SHrangeHandler(row)
                break;
            case 2:
                this.SHrangeClear(row)
                break;
            case 3:
                this.SHremove(row)
                break;
            default:
                throw Error('unknown id')
        }
    }
    SHrangeClear(row) {
        let params = {
            id: row.id
        }
        this.examinationService.clearApproverAudit(params).subscribe(
            data => {
                this.SHloadList()
                tipMessage("操作成功", 'success');
            },
            e => {
                tipMessage("操作失败");
            }
        );
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
            stCode: "SP",
            examId: this.examId,
            page: page ? page.number : 0,
            size: page ? page.size : 10
            // sort: page && page.sort ? page.sort : null
        };
        if (this.SHqueryValue.username) {
            params.username = this.SHqueryValue.username;
        }
        if (this.SHqueryValue.displayName) {
            params.displayName = this.SHqueryValue.displayName;
        }
        this.examinationService.getApproverList(params).subscribe(
            data => {
                this.SHpagination = data;
                this.SHcolumnsData = data["content"];
                let newData = data["content"].map(item => {
                    item.SHrangeSelectId = 1
                    return item
                }
                )
                console.log('newData', newData)
                this.SHcolumnsData = newData;
                this.SHListLoading = false;
            },
            e => {
                tipMessage("查询失败");
                this.SHListLoading = false;
            }
        );
    };
    ShowEditSPtimeModal() {
        if (!this.SHcolumnsData || this.SHcolumnsData.length == 0) {
            tipMessage("请先添加审核人");
            return;
        }
        this.ShowEditSPtime = true;
    }
    submitSPtime() {
        if (!this.SHselectData || this.SHselectData.length <= 0) {
            this.SHselectData = [];
        }
        let ids = this.SHselectData.map(it => it.id);
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
                tipMessage('设置成功', 'succcess');
                this.startdate = '';
                this.enddate = '';
                this.ShowEditSPtime = false;
                this.SHloadList();
                // this.SHselectData = [];
            },
            err => {
                tipMessage(err);
            }
        )
    }
    clearSPtime() {
        if (!this.SHcolumnsData || this.SHcolumnsData.length == 0) {
            tipMessage("请先添加审核人");
            return;
        }
        let that = this;
        let str;
        if (this.SHselectData && this.SHselectData.length > 0) {
            str = "确定清除勾选数据审核时间？"
        } else {
            str = "确定清除所有数据审核时间？"
        }
        if (!this.SHselectData || this.SHselectData.length <= 0) {
            this.SHselectData = [];
        }
        let ids = this.SHselectData.map(it => it.id);
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
                        that.SHselectData = [];
                    },
                    err => {
                        tipMessage('err');
                        that.SHloadList();
                    }
                    )
            }
        })
    }
    openLookup() {
        this.SHvisible = true;
    }
    SHaddList = () => {
        this.SHuserLookup.openLookup();
    };
    SHrangeHandler = data => {
        // this.SHvisible = true;
        this.SHrangeClick = data;
        this.SHTREE.openLookup();
    };
    SHupdate = data => {
        if (this.SHstartdate && this.SHenddate) {
            this.examinationService
                .updateApprover({
                    examId: this.examId,
                    startTime: this.SHstartdate,
                    endTime: this.SHenddate
                })
                .subscribe(
                d => {
                    tipMessage("操作成功", 'success');
                    this.SHloadList();
                },
                e => {
                    tipMessage("操作失败");
                }
                );
        } else {
            tipMessage("请选择正确时间");
        }
    };
    SHremove = data => {
        console.log(data, "删除用户");
        let self = this;
        this.confirmServ.confirm({
            title: "确认",
            content: "确认要删除？",
            showConfirmLoading: true,
            zIndex: 1003,
            onOk() {
                self.examinationService
                    .deleteApprover({ id: data.id, stCode: "SP" })
                    .subscribe(
                    d => {
                        tipMessage("操作成功", 'success');
                        self.SHloadList();
                    },
                    e => {
                        tipMessage("操作失败");
                    }
                    );
            },
            onCancel() { }
        });
    };
    SHhandleCancel = () => {
        // 审核范围取消
        this.SHvisible = false;
    };
    SHhandleOk = data1 => {
        // 审核范围确定
        this.SHvisible = false;
        let _SHTREEID = data1.map(item => item.id)
        let sendData: any;
        sendData = {
            userGroupIds: _SHTREEID.toString(),
            id: this.SHrangeClick.id
        };
        this.examinationService.setApproverAudit(sendData).subscribe(
            data => {
                console.log('SHhandleOkResult', data);
                tipMessage("操作成功", 'success');
                this.SHloadList();
            },
            e => {
                tipMessage("操作失败");
            }
        );
    };
    SHSelectionChange = data => {
        // 审核范围框值change
        this.SHrangeData = data;
    };
    SHuserChangeHandler = (e, data) => {
        // 添加用户框确定回调
        console.log(this.SHuserSelectData, "添加用户框确定回调");
        if (
            (!!this.SHstartdate && !!this.SHenddate) ===
            (!!this.SHstartdate || !!this.SHenddate)
        ) {
            let arr = [];
            for (let i = 0; i < this.SHuserSelectData.length; i++) {
                arr.push(this.SHuserSelectData[i].id);
            }
            let sendData = {
                userIds: arr,
                startTime: this.SHstartdate,
                endTime: this.SHenddate,
                examId: this.examId,
                stCode: "SP"
            };
            this.examinationService.addApprover(sendData).subscribe(
                // tslint:disable-next-line:no-shadowed-variable
                data => {
                    tipMessage("操作成功", 'success');
                    this.SHloadList();
                },
                // tslint:disable-next-line:no-shadowed-variable
                e => {
                    tipMessage("操作失败");
                }
            );
        } else {
            tipMessage("添加失败，请填写完整时间后重试", '', 4000);
        }
    };
    SHstartdateChange = val => {
        if (this.SHstartdate > this.SHenddate) {
            this.SHenddate = null;
        }
    };
    SHenddateChange = val => {
        if (this.SHstartdate > this.SHenddate) {
            this.SHstartdate = null;
        }
    };
    SHstartDisabledDate = startValue => {
        if (!startValue || !this.SHenddate) {
            return false;
        }
        return startValue && startValue.getTime() > this.SHenddate;
    };
    SHendDisabledDate = endValue => {
        if (!endValue || !this.SHstartdate) {
            return false;
        }
        return endValue && endValue.getTime() < this.SHstartdate;
    };
    /*
    考场安排人员
    */
    APloadList = (page?: CuiPagination) => {
        this.APListLoading = true;
        this.APpagination = page;
        let params: any;
        params = {
            stCode: "CK",
            examId: this.examId,
            page: page ? page.number : 0,
            size: page ? page.size : 10
            // sort: page && page.sort ? page.sort : null
        };
        if (this.APqueryValue.username) {
            params.username = this.APqueryValue.username;
        }
        if (this.APqueryValue.displayName) {
            params.displayName = this.APqueryValue.displayName;
        }
        this.examinationService.getApproverList(params).subscribe(
            data => {
                this.APpagination = data;
                this.APcolumnsData = data["content"];
                this.APListLoading = false;
            },
            e => {
                tipMessage("查询失败");
                this.APListLoading = false;
            }
        );
    };
    APdoQuery = () => { };
    APaddList = () => {
        this.SHuserLookup.openLookup();
    };
    APrangeHandler = data => {
        this.APvisible = true;
        this.APrangeClick = data;
    };
    APremove = data => {
        console.log(data, "删除用户");
        let self = this;
        this.confirmServ.confirm({
            title: "确认",
            content: "确认要删除？",
            showConfirmLoading: true,
            zIndex: 1003,
            onOk() {
                self.examinationService
                    .deleteApprover({ id: data.id, stCode: "CK" })
                    .subscribe(
                    // tslint:disable-next-line:no-shadowed-variable
                    data => {
                        tipMessage("操作成功", 'success');
                        self.APloadList();
                    },
                    e => {
                        tipMessage("操作失败");
                    }
                    );
            },
            onCancel() { }
        });
    };
    APhandleCancel = () => {
        // 审核范围取消
        this.APvisible = false;
    };
    APhandleOk = () => {
        // 审核范围确定
        this.APvisible = false;
        console.log(this.APrangeData, "审核范围确定");
        let sendData: any;
        sendData = {
            userGroupId: this.APrangeData.id,
            id: this.APrangeClick.id
        };
        this.examinationService.setApproverAudit(sendData).subscribe(
            data => {
                tipMessage("操作成功", 'success');
                this.APloadList();
            },
            e => {
                tipMessage("操作失败");
            }
        );
    };
    APSelectionChange = data => {
        // 审核范围框值change
        this.APrangeData = data;
    };
    APuserChangeHandler = (e, data) => {
        // 添加用户框确定回调
        console.log(this.APuserSelectData, "添加用户框确定回调");
        if (
            (!!this.APstartdate && !!this.APenddate) ===
            (!!this.APstartdate || !!this.APenddate)
        ) {
            let arr = [];
            for (let i = 0; i < this.APuserSelectData.length; i++) {
                arr.push(this.APuserSelectData[i].id);
            }
            let sendData = {
                userIds: arr,
                startTime: this.APstartdate,
                endTime: this.APenddate,
                examId: this.examId,
                stCode: "CK"
            };
            this.examinationService.addApprover(sendData).subscribe(
                // tslint:disable-next-line:no-shadowed-variable
                data => {
                    tipMessage("操作成功", 'success');
                    this.APloadList();
                },
                // tslint:disable-next-line:no-shadowed-variable
                e => {
                    tipMessage("操作失败");
                }
            );
        } else {
            tipMessage("添加失败，请填写完整时间后重试", '', 4000);
        }
    };
    APstartdateChange = val => {
        if (this.APstartdate > this.APenddate) {
            this.APenddate = null;
        }
    };
    APenddateChange = val => {
        if (this.APstartdate > this.APenddate) {
            this.APstartdate = null;
        }
    };
    APstartDisabledDate = startValue => {
        if (!startValue || !this.APenddate) {
            return false;
        }
        return startValue && startValue.getTime() > this.APenddate;
    };
    APendDisabledDate = endValue => {
        if (!endValue || !this.APstartdate) {
            return false;
        }
        return endValue && endValue.getTime() < this.APstartdate;
    };
    _disabledStartDate = startValue => {
        return startValue.getTime() < this.examStartTime;
    };
    _disabledFPenDate = startValue => {
        return startValue.getTime() < this.examEndTime;
    };
    changemarkUserCount = (num) => {
        if (num > this.userCount) {
            tipMessage("不能大于可分配人数");
        }
    }
}
