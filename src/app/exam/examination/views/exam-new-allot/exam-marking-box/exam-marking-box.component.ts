import {
    Component,
    OnInit,
    ViewChild,
    Input,
    Output,
    EventEmitter
} from "@angular/core";
import {
    FormGroup,
    FormBuilder,
    Validators,
    FormControl
} from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { ExaminationService } from "../../../service/examination.service";
import { NzModalService } from "ng-zorro-antd";
import * as moment from "moment";
import { CuiPagination } from "console-ui-ng";
import { UserLookupService } from "app/system/service/user-lookup.service";
import { UserLookupComponent } from "../../../../../shared/widget/user-lookup/user-lookup.component";
import { error } from "util";
import { Pagination } from 'app/core/entity/pagination';
import { tipMessage } from "app/account/entity/message-tip";
import { NzToolTipModule } from "ng-zorro-antd/src/tooltip/nz-tooltip.module";

@Component({
    selector: "spk-exam-marking-box",
    templateUrl: "./exam-marking-box.component.html",
    styleUrls: ["./exam-marking-box.component.scss"]
})
export class ExamMarkingBoxComponent implements OnInit {
    @Input() markTypeData;
    @Input() examId;
    @Input() selectedTabIndex;
    @Input() markType;
    @Input() paperId;
    @Output() _PMedit: EventEmitter<any> = new EventEmitter();
    @Output() _PSedit: EventEmitter<any> = new EventEmitter();
    @Output() _bindGroup: EventEmitter<any> = new EventEmitter();
    @Output() _showGroup: EventEmitter<any> = new EventEmitter();
    @Output() getMarkId: EventEmitter<any> = new EventEmitter();
    @Output() _showCopyList: EventEmitter<any> = new EventEmitter();
    @Output() _showMemberGroup: EventEmitter<any> = new EventEmitter();
    @Output() _PMeditGroup: EventEmitter<any> = new EventEmitter();
    @Output() _showViewPaper: EventEmitter<any> = new EventEmitter();
    @ViewChild("PSuserAdd") PSuserAdd;
    @ViewChild("PMuserAdd") PMuserAdd;
    pagination: CuiPagination;
    PMpagination: CuiPagination;
    markMode: number = 1; // 阅卷方式
    markRange: number = 1; // 阅卷规模
    wholeMarkRange: number = 1; // 全局阅读规模
    isOne: boolean = true; // 是否第一次进来，配合全局阅读规模使用
    userCount: number; // 参考总人数
    published: boolean = false; // 阅卷信息是否已发布
    TQLoading: boolean = false;
    PSLoading: boolean = false;
    PMLoading: boolean = false;
    loading: boolean = false;
    title: string;
    TQcolumns = [
        { title: "题号", data: "queSort", styleClass: "text-center" },
        { title: "试题", data: "category", styleClass: "text-center" },
        { title: "试题类型", data: "typeName", styleClass: "text-center" },
        {
            title: "题目内容",
            tpl: "casual",
            styleClass: "text-center",
            style: { "max-width": "100px", width: "100px" }
        },
        { title: "阅卷人", tpl: "groupCount", styleClass: "text-center" },
        {
            title: "阅卷策略",
            tpl: "markScoreMode",
            styleClass: "text-center",
            style: { "max-width": "200px", width: "200px" }
        },
        { title: "操作", tpl: "action", styleClass: "text-center" }
    ]; // 试题分配列表格式
    TQcolumnsData: any[] = [];
    PMcolumns = [
        { title: "组织名称", data: "markGroupName", styleClass: "text-center" },
        { title: "阅卷开始时间", tpl: "startTime", styleClass: "text-center" },
        { title: "阅卷结束时间  ", tpl: "endTime", styleClass: "text-center" },
        { title: "创建人", data: "displayName", styleClass: "text-center" },
        { title: "阅卷人", tpl: "markTeacherCount", styleClass: "text-center" },
        { title: "阅卷策略", data: "markScoreModeInfo", styleClass: "text-center" },
        { title: "阅卷人数", tpl: "markUserCount", styleClass: "text-center" },
        {
            title: "操作",
            tpl: "action",
            styleClass: "text-center",
            style: { width: "200px" }
        }
    ]; // 多人试卷分配
    PMcolumnsData: any[] = [];
    PScolumns = [
        { title: "组织名称", data: "markGroupName", styleClass: "text-center" },
        { title: "阅卷开始时间", tpl: "startTime", styleClass: "text-center" },
        { title: "阅卷结束时间  ", tpl: "endTime", styleClass: "text-center" },
        { title: "创建人", data: "displayName", styleClass: "text-center" },
        { title: "阅卷人", data: "markerDisplayName", styleClass: "text-center" },
        { title: "阅卷策略", data: "markScoreModeInfo", styleClass: "text-center" },
        { title: "操作", tpl: "action", styleClass: "text-center" }
    ]; // 单人试卷分配
    PScolumnsData: any[] = [];
    PSeditModal: boolean = false; // 编辑模态框显示
    PSMarkingOptions = [
        { value: 1, label: "第一次" },
        { value: 2, label: "最后一次" },
        { value: 3, label: "最高分" }
    ];
    PMMarkingOptions = [
        { value: "1", label: "第一次" },
        { value: "2", label: "最后一次" },
        { value: "3", label: "平均分" },
        { value: "4", label: "最高分" },
        { value: "5", label: "去掉最高分、最低分取平均分" }
    ];
    markModeId: any;
    examUserCount: any;
    singleGroupId: number; // 单人阅卷组Id
    markGroupUserId: string; // 单人阅卷修改要传的id
    _searchForm: FormGroup;
    ShowPMadd: boolean = false;
    params: any;
    columns = [
        { title: "用户名", data: "username", styleClass: "text-center" },
        { title: "姓名", data: "displayName", styleClass: "text-center" },
        { title: "归属组织", data: "userGroupName", styleClass: "text-center" },
        { title: "联系电话", data: "phoneNumber", styleClass: "text-center" },
        { title: "创建人", data: "createdUser", styleClass: "text-center" },
        { title: "创建时间", tpl: "createdDate", styleClass: "text-center" },
        { title: "操作", tpl: "action", styleClass: "text-center" }
    ];
    columnsData: any[] = [];
    markModeData: any;
    markScoreModeData: any;
    markRangeData: any;
    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private examinationService: ExaminationService,
        private fb: FormBuilder,
        private userService: UserLookupService,
        private confirmServ: NzModalService
    ) { }

    ngOnInit() {
        // 阅卷模式
        this.examinationService
            .getDictionaries({ dicType: "MARK_MODE_" + this.markType })
            .subscribe(
            data => {
                this.markModeData = data.map(it => {
                    // tslint:disable-next-line:radix
                    return { value: parseInt(it.dicCode), label: it.dicName };
                });
            },
            err => {
                tipMessage(err);
            }
            );
        // 阅卷规模
        this.examinationService
            .getDictionaries({ dicType: "MARK_RANGE_" + this.markType })
            .subscribe(
            data => {
                this.markRangeData = data.map(it => {
                    // tslint:disable-next-line:radix
                    return { value: parseInt(it.dicCode), label: it.dicName };
                });
                console.log(this.markRangeData);
            },
            err => {
                tipMessage(err);
            }
            );
        // 评分规则
        this.examinationService
            .getDictionaries({ dicType: "MARK_SCORE_MODE_" + this.markType })
            .subscribe(
            data => {
                this.markScoreModeData = data.map(it => {
                    return { value: it.dicCode, label: it.dicName };
                });
            },
            err => {
                tipMessage(err);
            }
            );
        this.loadMarking(this.markType);
        switch (this.markType) {
            case "PJ":
                this.title = "阅卷";
                this.TQcolumns = [
                    { title: "题号", data: "queSort", styleClass: "text-center" },
                    { title: "试题", data: "category", styleClass: "text-center" },
                    { title: "试题类型", data: "typeName", styleClass: "text-center" },
                    {
                        title: "题目内容",
                        tpl: "casual",
                        styleClass: "text-center",
                        style: { "max-width": "100px", width: "100px" }
                    },
                    { title: "阅卷人", tpl: "groupCount", styleClass: "text-center" },
                    {
                        title: "阅卷策略",
                        tpl: "markScoreMode",
                        styleClass: "text-center",
                        style: { "max-width": "200px", width: "200px" }
                    },
                    { title: "操作", tpl: "action", styleClass: "text-center" }
                ]; // 试题分配列表格式
                this.PMcolumns = [
                    { title: "组织名称", data: "markGroupName", styleClass: "text-center" },
                    { title: "阅卷开始时间", tpl: "startTime", styleClass: "text-center" },
                    { title: "阅卷结束时间  ", tpl: "endTime", styleClass: "text-center" },
                    { title: "创建人", data: "displayName", styleClass: "text-center" },
                    { title: "阅卷人", tpl: "markTeacherCount", styleClass: "text-center" },
                    { title: "阅卷策略", data: "markScoreModeInfo", styleClass: "text-center" },
                    { title: "阅卷人数", tpl: "markUserCount", styleClass: "text-center" },
                    {
                        title: "操作",
                        tpl: "action",
                        styleClass: "text-center",
                        style: { width: "200px" }
                    }
                ]; // 多人试卷分配
                this.PScolumns = [
                    { title: "组织名称", data: "markGroupName", styleClass: "text-center" },
                    { title: "阅卷开始时间", tpl: "startTime", styleClass: "text-center" },
                    { title: "阅卷结束时间  ", tpl: "endTime", styleClass: "text-center" },
                    { title: "创建人", data: "displayName", styleClass: "text-center" },
                    { title: "阅卷人", data: "markerDisplayName", styleClass: "text-center" },
                    { title: "阅卷策略", data: "markScoreModeInfo", styleClass: "text-center" },
                    { title: "操作", tpl: "action", styleClass: "text-center" }
                ]; // 单人试卷分配
                break;
            case "FP":
                this.title = "复评";
                this.TQcolumns = [
                    { title: "题号", data: "queSort", styleClass: "text-center" },
                    { title: "试题", data: "category", styleClass: "text-center" },
                    { title: "试题类型", data: "typeName", styleClass: "text-center" },
                    {
                        title: "题目内容",
                        tpl: "casual",
                        styleClass: "text-center",
                        style: { "max-width": "100px", width: "100px" }
                    },
                    { title: "复评人", tpl: "groupCount", styleClass: "text-center" },
                    {
                        title: "复评策略",
                        tpl: "markScoreMode",
                        styleClass: "text-center",
                        style: { "max-width": "200px", width: "200px" }
                    },
                    { title: "操作", tpl: "action", styleClass: "text-center" }
                ]; // 试题分配列表格式
                this.PMcolumns = [
                    { title: "组织名称", data: "markGroupName", styleClass: "text-center" },
                    { title: "复评开始时间", tpl: "startTime", styleClass: "text-center" },
                    { title: "复评结束时间  ", tpl: "endTime", styleClass: "text-center" },
                    { title: "创建人", data: "displayName", styleClass: "text-center" },
                    { title: "复评人", tpl: "markTeacherCount", styleClass: "text-center" },
                    { title: "复评策略", data: "markScoreModeInfo", styleClass: "text-center" },
                    { title: "复评人数", tpl: "markUserCount", styleClass: "text-center" },
                    {
                        title: "操作",
                        tpl: "action",
                        styleClass: "text-center",
                        style: { width: "200px" }
                    }
                ]; // 多人试卷分配
                this.PScolumns = [
                    { title: "组织名称", data: "markGroupName", styleClass: "text-center" },
                    { title: "复评开始时间", tpl: "startTime", styleClass: "text-center" },
                    { title: "复评结束时间  ", tpl: "endTime", styleClass: "text-center" },
                    { title: "创建人", data: "displayName", styleClass: "text-center" },
                    { title: "复评人", data: "markerDisplayName", styleClass: "text-center" },
                    { title: "复评策略", data: "markScoreModeInfo", styleClass: "text-center" },
                    { title: "操作", tpl: "action", styleClass: "text-center" }
                ]; // 单人试卷分配
                break;
        }
        this._searchForm = this.fb.group({
            username: [""],
            displayName: [""]
        });
    }
    // 跳转新增阅卷人组
    toAddGroup() {
        let obj = {
            // id: this.examId,
            id: this.markModeId,
            index: this.selectedTabIndex,
            sort: this.markType
        };
        this.route.data.subscribe(data => {
            obj["examId"] = data.examination.id;
        });
        this.router.navigate([
            `/exam/examination/${this.markModeId}/addGroup`,
            obj
        ]);
    }
    // 跳转到添加阅卷人
    toAddTeacher(data) {
        // if (window.location.origin == 'http://localhost:4200') {
        //   window.open(`/exam/examination/${row.id}/addPerson`, '_blank')
        // } else {
        //   window.open(`/console/exam/examination/${row.id}/addPerson`, '_blank')
        // }t
        if (!data || data.length == 0) {
            return;
        }
        let ids = data.map(it => it.id);
        let params = {
            userIds: ids,
            markGroupId: this.params.markGroupId,
            markSettingId: this.markModeId
        };
        this.PMLoading = true;
        this.examinationService.addMarker(params).subscribe(
            res => {
                if (res.errcode == "ok") {
                    tipMessage("添加成功", 'success');
                    this.loadData();
                } else {
                    tipMessage(res.errmsg, 'success');
                }
                this.loadPM();
            },
            err => {
                tipMessage(err);
            }
        );
        console.log(data);
    }
    // 发布
    publish() {
        let that = this;
        this.confirmServ.confirm({
            content: "是否确认发布！",
            okText: "确定",
            cancelText: "取消",
            zIndex: 1003,
            onOk() {
                that.examinationService
                    .publish({
                        markSettingId: that.markModeId
                    })
                    .subscribe(
                    data => {
                        if (data.errcode == "ok") {
                            tipMessage("发布成功", 'success');
                            that.loadMarking(that.markType);
                        } else {
                            tipMessage(data.errmsg, 'success');
                        }
                    },
                    err => {
                        tipMessage(err);
                    }
                    );
            }
        });
    }
    // 改变阅卷人员分配方式
    changeDistributionType(e) {
        let that = this;
        this.confirmServ.confirm({
            content: "是否确认切换分配方式！切换将会删除之前设置！",
            okText: "确定",
            cancelText: "取消",
            zIndex: 1003,
            onOk() {
                // tslint:disable-next-line:no-unused-expression
                let params = {
                    examId: that.examId,
                    id: that.markModeId,
                    markMode: that.markMode,
                    markRange: that.markMode == 2 ? 2 : 1,
                    markType: that.markType
                };
                that.markRange = params.markRange;
                that.loading = true;
                that.examinationService.changeMarkingModel(params).subscribe(
                    data => {
                        that.markModeId = data.markSettingDto.id;
                        that.markMode == 2
                            ? that.loadTQ()
                            : that.markRange == 2
                                ? that.loadPM()
                                : that.loadPS();
                        that.loading = false;
                    },
                    error => {
                        tipMessage(error);
                        that.loading = false;
                    }
                );
            },
            onCancel() {
                that.markMode = that.markMode == 1 ? 2 : 1;
            }
        });
    }
    // 多人阅卷单人阅卷切换
    changeMarkingModel() {
        if (!this.isOne) {
            if (this.markRange == this.wholeMarkRange) {
                return;
            }
        }
        let that = this;
        this.confirmServ.confirm({
            content: "是否确认切换阅卷规模！切换将会删除之前设置！",
            okText: "确定",
            cancelText: "取消",
            zIndex: 1003,
            onOk() {
                let params = {
                    examId: that.examId,
                    id: that.markModeId,
                    markMode: that.markMode,
                    markRange: that.markRange,
                    markType: that.markType
                };
                that.loading = true;
                that.examinationService.changeMarkingModel(params).subscribe(
                    data => {
                        that.markModeId = data.markSettingDto.id;
                        that.markRange == 2 ? that.loadPM() : that.loadPS();
                        that.loading = false;
                        that.isOne = false;
                        that.wholeMarkRange = that.markRange;
                    },
                    err => {
                        tipMessage(err);
                    }
                );
            },
            onCancel() {
                that.markRange = that.markRange == 1 ? 2 : 1;
            }
        });
    }
    // 单人添加阅卷人
    submitUser(users) {
        let ids = users.map(it => it.id);
        let params = {
            markGroupId: this.singleGroupId,
            userIds: ids
        };
        this.examinationService.addMarker(params).subscribe(
            data => {
                console.log(data);
                this.loadPS();
            },
            error => {
                tipMessage(error);
            }
        );
    }
    // 单人修改阅卷人
    updatePerson(users) {
        if (!users || users.length == 0) {
            return;
        }
        let ids = users.map(it => it.id);
        let params = {
            markGroupId: this.singleGroupId,
            userIds: ids,
            markSettingId: this.markModeId
        };
        this.examinationService.addMarker(params).subscribe(
            data => {
                this.loadPS();
            },
            err => {
                tipMessage(err);
            }
        );
    }
    // 返回id
    returnId() {
        return this.markModeId;
    }
    loadTQ(page?: CuiPagination) {
        this.pagination = page;
        this.TQLoading = true;
        if (!this.paperId) {
            this.TQLoading = false;
            return;
        }
        let params = {
            paperId: this.paperId,
            examId: this.examId,
            markSettingId: this.markModeId
        };
        this.examinationService.getSubjective(params).subscribe(
            data => {
                this.TQcolumnsData = data;
                this.TQcolumnsData.map(it => (it.markScoreMode += ""));
                this.TQLoading = false;
            },
            err => {
                tipMessage(err);
                this.TQLoading = false;
            }
        );
    }
    loadPM(page?: CuiPagination) {
        console.log(page);
        this.PMpagination = page;
        this.PMLoading = true;
        let params = {
            markSettingId: this.markModeId,
            page: page ? page.number : 0,
            size: page ? page.size : 10
        };
        this.examinationService.getGroupList(params).subscribe(
            data => {
                this.PMcolumnsData = data.content;
                this.PMpagination = data;
                this.PMLoading = false;
            },
            err => {
                tipMessage(err);
            }
        );
        this.examinationService
            .getExamUserCount({ examId: this.examId })
            .subscribe(data => {
                if (typeof data == "object") {
                    this.userCount = 0;
                } else {
                    this.userCount = data;
                }
            });
    }
    loadPS() {
        let params = {
            markSettingId: this.markModeId
        };
        this.PSLoading = true;
        this.examinationService.getGroupList(params).subscribe(data => {
            this.PScolumnsData = data.content;
            this.singleGroupId = data.content[0].id;
            this.markGroupUserId = data.content[0].markGroupUserId;
            this.PSLoading = false;
        });
    }
    // PS编辑模态框
    PSedit(row) {
        this._PSedit.emit({ row: row, markType: this.markType });
    }
    // PM添加模态框
    PMedit(id?) {
        this._PMedit.emit({ markSettingId: id, markType: this.markType });
    }
    // PM编辑模态框
    PMeditGroup(row) {
        this._PMeditGroup.emit({ row: row, markType: this.markType });
    }
    bindGroup(row?) {
        this._bindGroup.emit({ row: row, markType: this.markType });
    }
    showGroup(row?) {
        this._showGroup.emit({ row: row, markType: this.markType });
    }
    showCopyList(row) {
        this._showCopyList.emit({
            row: row,
            type: this.markType
        });
    }
    showMemberGroup(row?) {
        console.log("showMemberGroup");
        this._showMemberGroup.emit({ row: row, markType: this.markType });
    }
    showViewPaper() {
        this._showViewPaper.emit({
            markSettingId: this.markModeId,
            markType: this.markType
        });
    }
    loadMarking(type) {
        let params = {
            examId: this.examId,
            markType: type
        };
        this.examinationService.getSettingInfo(params).subscribe(
            data => {
                this.markMode = data.markMode;
                this.markRange = data.markRange;
                this.published = data.isPublish;
                this.markModeId = data.id;
                this.getMarkId.emit(this.markModeId);
                this.markMode == 1
                    ? this.markRange == 1
                        ? this.loadPS()
                        : this.loadPM()
                    : this.loadTQ();
            },
            err => {
                this.loadPS();
            }
        );
    }
    deleteGroup(row) {
        let that = this;
        this.confirmServ.confirm({
            content: "是否确认删除！",
            okText: "确定",
            cancelText: "取消",
            zIndex: 1003,
            onOk() {
                let params = {
                    markSettingId: that.markModeId,
                    markGroupId: row.id
                };
                that.examinationService.deleteGroup(params).subscribe(data => {
                    that.loadPM();
                });
            }
        });
    }
    removeQuestion(row) {
        let that = this;
        this.confirmServ.confirm({
            content: "是否确认删除",
            okText: "确定",
            cancelText: "取消",
            zIndex: 1003,
            onOk() {
                that.examinationService
                    .removeQuestion({
                        markSettingId: that.markModeId,
                        markQueId: row.markQueId
                    })
                    .subscribe(data => {
                        tipMessage("删除成功", 'success');
                        that.loadTQ();
                    });
            }
        });
    }
    // 切换阅卷策略
    toggleMarkScoreMode(row) {
        let params = {
            markSettingId: this.markModeId,
            markQueId: row.markQueId,
            markScoreMode: row.markScoreMode
        };
        this.examinationService.toggleMarkScoreMode(params).subscribe(
            data => {
                tipMessage("切换成功", 'success');
            },
            err => {
                tipMessage(err);
            }
        );
    }
    // 打开多人新增人员页面
    showPMuserAdd = row => {
        // this.PMuserAdd.openLookup()
        this.ShowPMadd = true;
        this.params = { markGroupId: row.id };
        this.loadData();
    };
    addPMuser() {
        this.PMuserAdd._value = [];
        this.PMuserAdd.selection = [];
        this.PMuserAdd.openLookup();
    }
    // 打开单人新增人员页面
    showPSuserAdd() {
        this.PSuserAdd._value = [];
        this.PSuserAdd.selection = [];
        this.PSuserAdd.openLookup();
    }
    loadData(page?: CuiPagination) {
        this.params = {
            ...this.params,
            page: page ? page.number : 0,
            size: page ? page.size : 10
        };
        this.pagination = page;
        this.examinationService.getTeacherList(this.params).subscribe(
            data => {
                this.columnsData = data.content;
                this.pagination = data;
                this.loading = false;
            },
            err => {
                this.loading = false;
                tipMessage(err);
            }
        );
    }
    closeShowAdd() {
        this.ShowPMadd = false;
        this.loadPM();
    }
    _submitForm(value, content) {
        this.params = { ...this.params, ...content };
        this.loadData();
    }
    delectTeacher(row) {
        let that = this;
        this.confirmServ.confirm({
            content: "是否确认删除！",
            okText: "确定",
            cancelText: "取消",
            zIndex: 1003,
            onOk() {
                that.examinationService
                    .deletePerson({ id: row.markGroupUserId })
                    .subscribe(
                    data => {
                        tipMessage("删除成功", 'success');
                        that.loadData();
                    },
                    error => {
                        tipMessage(error);
                    }
                    );
            }
        });
    }
}
