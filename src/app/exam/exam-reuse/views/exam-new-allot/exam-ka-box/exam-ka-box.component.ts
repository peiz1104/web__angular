import { Router, ActivatedRoute } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd';
import { Component, OnInit, ViewChild, Input } from "@angular/core";
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { CuiPagination, CuiLayer } from 'console-ui-ng';
import { ExaminationService } from "../../../service/examination.service";
import { UserLookupComponent } from "../../../../../shared/widget/user-lookup/user-lookup.component";
import * as moment from 'moment';
import { tipMessage } from 'app/account/entity/message-tip';
@Component({
    selector: 'spk-exam-ka-box',
    templateUrl: './exam-ka-box.component.html',
    styleUrls: ['./exam-ka-box.component.scss']
})
export class ExamKaBoxComponent implements OnInit {
    @Input() examId;
    @Input() startTime;
    @Input() endTime;
    @Input() userGroupName;
    @Input() userGroupId;
    @ViewChild('KCTREE') KCTREE;
    startDate;
    endDate;
    showAddField: boolean = false;
    columns: any = [
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
            title: "安排范围",
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
    ]
    addFieldColumns = [
        {
            title: '场地名称', data: 'roomName',
            styleClass: 'text-center',
            style: {
                'max-width': '200px', width: '200px', 'overflow': 'hidden',
                'white-space': 'nowrap',
                'text-overflow': 'ellipsis'
            },
        },
        { title: '场地类型', data: 'dicName', styleClass: 'text-center' },
        { title: '最大容量（人）', data: 'maximumSeat', styleClass: 'text-center' },
        { title: '场地地址', tpl: 'roomAddress', styleClass: 'text-center' },
        { title: '创建时间', tpl: 'createdDate', styleClass: 'text-center' }
    ]
    columnsData: any;
    addFieldColumnsData: any;
    pagination: CuiPagination;
    addFieldpagination: CuiPagination;
    addTeacherPagination: CuiPagination;
    loading: boolean;
    addFieldLoading: boolean;
    _searchForm: FormGroup;
    selection: any = [];
    addFieldSelection: any = [];
    searchData: any = {};
    addFieldSearchData: any;
    _addFieldSearchForm: FormGroup;
    showEditField: boolean = false;
    seatTypesetting: any;
    seatTypesettingData: any = [];
    ShowEditTime: boolean = false;
    editStartdate: any = '';
    editEnddate: any = '';
    seatTypesettingGroup: any = {};
    _userGroupId: any;
    _userGroupName: any;
    showEditFieldModal: boolean = false;
    editRoomName: any;
    useSeat: any;
    showAddTeacher: boolean = false;
    addTeacheLoading: boolean;
    userName: any;
    displayName: any;
    roomId: any;
    KCvisible: Boolean = false;
    KCmodalLoading: Boolean = false;
    KCrangeData: any;
    KCselectData: any;
    ShowEditKCtime: boolean = false;
    startdate;
    enddate;
    KCrangeClick: any;
    KCuserSelectData: any;
    expanded: boolean = false;
    KCisLoading: boolean = false;
    addTeacherColumns = [
        { title: '用户名', data: 'userName', styleClass: 'text-center' },
        { title: '姓名', data: 'displayName', styleClass: 'text-center' },
        { title: '归属组织', data: 'groupName', styleClass: 'text-center' },
        { title: '操作', tpl: 'action ', styleClass: 'text-center' }
    ]
    addTeacherColumnsData: any = [];
    KCqueryValue: any = {};
    // 审核人员变量
    @ViewChild(UserLookupComponent) private KCuserLookup: UserLookupComponent;
    constructor(
        private examinationService: ExaminationService,
        private fb: FormBuilder,
        private confirmServ: NzModalService,
    ) {
        // 获取座位排版下拉框数据
        this.examinationService.getDictionaries({ dicType: 'SEAT_TYPESETTING' }).subscribe(
            data => {
                this.seatTypesettingData = data.map(it => {
                    return { value: it.dicCode, label: it.dicName }
                })
                this.seatTypesetting = this.seatTypesettingData[0].value;
                this.seatTypesettingData.map(it => {
                    this.seatTypesettingGroup[it.value] = it.label;
                })
            },
            err => {
                tipMessage(err)
            }
        )
    }
    ngOnInit() {
        this._searchForm = this.fb.group({
            roomName: [''], // 考试名称
        });
        this.startDate = this.startTime;
        this.endDate = this.endTime;
        this._userGroupId = this.userGroupId;
        this._userGroupName = this.userGroupName;
        this._addFieldSearchForm = this.fb.group({
            userGroup: [{ id: this.userGroupId, name: this.userGroupName } || ''],
            roomName: ['']
        })
        this.KCloadList();
    }

    loadData(page?: CuiPagination) {
        this.loading = true;
        this.pagination = page;
        this.selection = [];
        this.searchData = {
            examId: this.examId,
            ...this._searchForm.value
        }
        let params = {
            page: page ? page.number : 0,
            size: page ? page.size : 10,
            ...this.searchData
        };
        this.examinationService.getRoomList(params).subscribe(
            data => {
                this.pagination = data;
                this.columnsData = data && data.content;
                this.loading = false;
            },
            err => {
                tipMessage(err);
            }
        );
    }
    toAddFiedld = () => {
        this.showAddField = true;
        this.addFieldLoadData();
    }
    toShowSetTime = () => {
        if (!this.selection || this.selection.length == 0) {
            tipMessage('请先选择考场');
            return;
        }
        this.ShowEditTime = true;
        this.editStartdate = '';
        this.editEnddate = '';
    }
    toEditField = () => {
        if (!this.addFieldSelection || this.addFieldSelection.length == 0) {
            tipMessage('请先选择场地');
            return;
        }
        this.showAddField = false;
        this.showEditField = true;
    }
    toSetTime = () => {
        if (!this.editStartdate || !this.editEnddate) {
            tipMessage('请先填写时间');
            return;
        }
        let params = {
            examRoomIds: this.selection.map(it => it.id),
            startTime: moment(this.editStartdate).format('YYYY-MM-DD HH:mm:ss'),
            endTime: moment(this.editEnddate).format('YYYY-MM-DD HH:mm:ss')
        }
        this.examinationService.setDistributionTime(params).subscribe(
            data => {
                tipMessage('保存成功!', 'success');
                this.KCloadList();
                this.ShowEditTime = false;
            }, err => {
                tipMessage(err)
            }
        )
    }
    toShowEditModal(row) {
        this.showEditFieldModal = true;
        this.editRoomName = '';
        this.useSeat = '';
        this.seatTypesetting = this.seatTypesettingData[0].value;
        this.roomId = row.id;
    }
    addFieldLoadData(page?: CuiPagination) {
        this.addFieldLoading = true;
        this.addFieldpagination = page;
        this.addFieldSelection = [];
        this.addFieldSearchData = {
            ...this._addFieldSearchForm.value,
            userGroupId: this._addFieldSearchForm.value.userGroup.id
        }
        let params = {
            page: page ? page.number : 0,
            size: page ? page.size : 10,
            roomStatus: true,
            examId: this.examId,
            ...this.addFieldSearchData
        };
        this.examinationService.getInationRoomList(params).subscribe(
            data => {
                this.addFieldpagination = data;

                this.addFieldColumnsData = data["content"];
                this.addFieldLoading = false;
            },
            err => {
                tipMessage(err);
            }
        );
    }
    saveDistribution() {
        let params = {
            roomIds: this.addFieldSelection.map(it => it.id),
            examId: this.examId,
            seatTypesetting: this.seatTypesetting,
            startTime: this.startDate,
            endTime: this.endDate
        }
        this.examinationService.saveDistribution(params).subscribe(
            data => {
                tipMessage('保存成功！', 'success');
                this.showEditField = false;
                this.KCloadList();
            },
            err => {
                tipMessage(err);
            }
        )
    }
    deleteField(row) {
        let self = this;
        this.confirmServ.confirm({
            content: '是否确认删除！',
            okText: '确定',
            cancelText: '取消',
            zIndex: 1003,
            // 弹窗操作
            onOk(e) {
                self.examinationService.removeDistribution({ examRoomId: row.id }).subscribe(
                    obj => {
                        tipMessage('删除成功！', 'success');
                        self.KCloadList();
                    },
                    err => tipMessage(err)
                )
            }
        });
    }
    addTeacheLoadData(page?: CuiPagination) {
        this.addTeacheLoading = true;
        this.addTeacherPagination = page;
        this.addFieldSearchData = {
            userName: this.userName,
            displayName: this.displayName,
            examId: this.examId
        }
        let params = {
            page: page ? page.number : 0,
            size: page ? page.size : 10,
            ...this.addFieldSearchData
        };
        this.examinationService.getExamStaffList(params).subscribe(
            data => {
                this.addTeacherPagination = data;
                this.addTeacherColumnsData = data.content;
                this.addTeacheLoading = false;
            },
            err => {
                tipMessage(err);
            }
        );
    }
    toShowAddTeacher(row) {
        this.showAddTeacher = true;
        this.userName = '';
        this.displayName = '';
        this.addTeacheLoadData();
    }
    toUpdateField() {
        let params = {
            seatTypesetting: this.seatTypesetting,
            roomName: this.editRoomName,
            useSeat: this.useSeat,
            id: this.roomId
        };
        this.examinationService.modifyDistribution(params).subscribe(
            data => {
                this.showEditFieldModal = false;
                this.KCloadList();
            },
            err => {
                tipMessage(err);
            }
        )
    }
    KCloadList = (page?: CuiPagination) => {
        this.loading = true;
        this.pagination = page;
        // this.selection = [];
        let params: any;
        params = {
            stCode: "KC",
            examId: this.examId,
            page: page ? page.number : 0,
            size: page ? page.size : 10
            // sort: page && page.sort ? page.sort : null
        };
        if (this.KCqueryValue.username) {
            params.username = this.KCqueryValue.username;
        }
        if (this.KCqueryValue.displayName) {
            params.displayName = this.KCqueryValue.displayName;
        }
        this.examinationService.getExamRoomList(params).subscribe(
            data => {
                this.pagination = data;
                let newData = data["content"].map(item => {
                    item.KCrangeSelectId = 1
                    return item
                }
                )
                console.log('newData', newData)
                this.columnsData = newData;
                this.loading = false;
            },
            e => {
                tipMessage("查询失败");
                this.loading = false;
            }
        );
    }
    KChandleCancel = () => {
        // 审核范围取消
        this.KCvisible = false;
    }
    KChandleOk = data1 => {
        this.KCvisible = false;
        let _KCTREEID = data1.map(item => item.id)
        let sendData: any;
        sendData = {
            userGroupIds: _KCTREEID.toString(),
            id: this.KCrangeClick.id
        };
        this.examinationService.setExamRoomAudit(sendData).subscribe(
            data => {
                tipMessage("操作成功", 'success');
                this.KCloadList();
            },
            e => {
                tipMessage("操作失败");
            }
        );
    }
    KCSelectionChange = data => {
        // 审核范围框值change
        this.KCrangeData = data;
    }
    ShowEditKCtimeModal() {
        if (!this.columnsData || this.columnsData.length == 0) {
            tipMessage("请先添加审核人");
            return;
        }
        this.ShowEditKCtime = true;
    }
    submitKCtime() {
        if (!this.KCselectData || this.KCselectData.length <= 0) {
            this.KCselectData = [];
        }
        let ids = this.KCselectData.map(it => it.id);
        if (!this.startdate && !this.enddate) {
            tipMessage('请设置审核时间！');
            return;
        }
        this.KCisLoading = true;
        let params = {
            startTime: moment(this.startdate).format('x'),
            endTime: moment(this.enddate).format('x'),
            stCode: 'KC',
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
                this.ShowEditKCtime = false;
                this.KCloadList();
                this.KCselectData = [];
                this.KCisLoading = false;
            },
            err => {
                tipMessage(err);
                this.KCisLoading = false;
            }
        )
    }
    clearKCtime() {
        if (!this.columnsData || this.columnsData.length == 0) {
            tipMessage("请先添加审核人");
            return;
        }
        let that = this;
        let str;
        if (this.KCselectData && this.KCselectData.length > 0) {
            str = "确定清除勾选数据审核时间？"
        } else {
            str = "确定清除所有数据审核时间？"
        }
        if (!this.KCselectData || this.KCselectData.length <= 0) {
            this.KCselectData = [];
        }
        let ids = this.KCselectData.map(it => it.id);
        this.confirmServ.confirm({
            content: str,
            okText: '确定',
            cancelText: '取消',
            zIndex: 1003,
            onOk() {
                that.examinationService.setMarkTime({
                    stCode: 'KC',
                    examId: that.examId,
                    ids: ids
                }).subscribe(
                    data => {
                        tipMessage('清除成功', 'success');
                        that.KCloadList();
                        that.KCselectData = [];
                    },
                    err => {
                        tipMessage('err');
                        that.KCloadList();
                    }
                    )
            }
        })
    }
    KCaddList = () => {
        this.KCuserLookup.openLookup();
    }
    KCrangeHandler = data => {
        // this.KCvisible = true;
        this.KCrangeClick = data;
        this.KCTREE.openLookup()
    }
    KCremove = data => {
        console.log(data, "删除用户");
        let self = this;
        this.confirmServ.confirm({
            title: "确认",
            content: "确认要删除？",
            showConfirmLoading: true,
            zIndex: 1003,
            onOk() {
                self.examinationService
                    .deleteExamRoom({ id: data.id, stCode: "KC" })
                    .subscribe(
                    d => {
                        tipMessage("操作成功", 'success');
                        self.KCloadList();
                    },
                    e => {
                        tipMessage("操作失败");
                    }
                    );
            },
            onCancel() { }
        });
    }
    KCuserChangeHandler = (e, data) => {
        // 添加用户框确定回调
        console.log(this.KCuserSelectData, "添加用户框确定回调");
        if (
            (!!this.startdate && !!this.enddate) ===
            (!!this.startdate || !!this.enddate)
        ) {
            let arr = [];
            for (let i = 0; i < this.KCuserSelectData.length; i++) {
                arr.push(this.KCuserSelectData[i].id);
            }
            let sendData = {
                userIds: arr,
                startTime: this.startdate,
                endTime: this.enddate,
                examId: this.examId,
                stCode: "KC"
            };
            this.loading = true;
            this.examinationService.addExamRoom(sendData).subscribe(
                // tslint:disable-next-line:no-shadowed-variable
                data => {
                    tipMessage("操作成功", 'success');
                    this.KCloadList();
                },
                // tslint:disable-next-line:no-shadowed-variable
                e => {
                    tipMessage("操作失败");
                }
            );
        } else {
            tipMessage("添加失败，请填写完整时间后重试", '', 4000);
        }
    }
    openLookup() {
        this.expanded = true;
    }
    selectKCTree(tree) {
        console.log(tree)
    }
    KCrangeSelectChange(row, id) {
        switch (id) {
            case 1:
                this.KCrangeHandler(row)
                break;
            case 2:
                this.KCrangeClear(row)
                break;
            case 3:
                this.KCremove(row)
                break;
            default:
                throw Error('unknown id')
        }
    }
    KCrangeClear(row) {
        let params = {
            id: row.id
        }
        this.examinationService.clearExamRoomAudit(params).subscribe(
            data => {
                this.KCloadList()
                tipMessage("操作成功", '', 4000);
            },
            e => {
                tipMessage("操作失败");
            }
        );
    }
}

