import { Component, OnInit, ViewChild } from "@angular/core";
import { NzModalService } from "ng-zorro-antd";
import { FormGroup, FormBuilder, FormControl } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { CuiPagination } from "console-ui-ng";
import { ExaminationService } from "../../service/examination.service";
import { ExaminationManagementService } from "app/exam/service/examination.service";
import * as moment from "moment";
import { Location } from '@angular/common';
import { error } from "util";
import { tipMessage } from "app/account/entity/message-tip";
import { NzToolTipModule } from "ng-zorro-antd/src/tooltip/nz-tooltip.module";

@Component({
    selector: "spk-exam-add-group",
    templateUrl: "./exam-add-group.component.html",
    styleUrls: ["./exam-add-group.component.scss"]
})
export class ExamAddGroupComponent implements OnInit {
    @ViewChild('userAdd') userAdd;
    columns: any[] = [
        {
            title: "组名称",
            data: "markGroupName",
            styleClass: "text-center"
        },
        {
            title: "组内成员",
            tpl: "markTeacherCount",
            styleClass: "text-center"
        },
        {
            title: "创建人",
            data: "displayName",
            styleClass: "text-center"
        },
        {
            title: "创建时间",
            tpl: "createdDate",
            styleClass: "text-center"
        },
        {
            title: "操作",
            tpl: "action",
            styleClass: "text-center"
        }
    ];
    columnsData: any[] = []; // 模拟数据
    groupColumns: any[] = [
        {
            title: "用户名",
            data: "username",
            styleClass: "text-center"
        },
        {
            title: "姓名",
            data: "displayName",
            styleClass: "text-center"
        },
        {
            title: "归属组织",
            data: "userGroupName",
            styleClass: "text-center"
        },
        {
            title: "操作",
            tpl: "action",
            styleClass: "text-center"
        }
    ];
    groupColumnsData: any[] = []; // 组内成员数据
    _searchForm: FormGroup;
    groupName: string; // 组名称
    description: string; // 描述
    createOrEditor: boolean = true;
    cache: any;
    managerGroup: any;
    gradeSearch: any = {};
    pagination: CuiPagination;
    loading: boolean = true;
    showAddGroup: boolean = false; // 显示添加组织模态框
    showGroupMember: boolean = false; // 显示组内成员模态框
    showAddUser: boolean = false; // 添加用户模态
    markStartTime;
    markEndTime;
    showNewAdd: boolean = false; // 新增用户模态框
    groupId: any; // 组ID
    markSettingId: any; // 阅卷id
    id: any;
    markGroupId: number; // 阅卷组id
    prosonSearch: FormGroup;
    constructor(
        private fb: FormBuilder,
        private route: ActivatedRoute,
        private examinationService: ExaminationService,
        private router: Router,
        private _location: Location,
        private confirmServ: NzModalService
    ) { }

    ngOnInit() {
        this._searchForm = this.fb.group({
            markGroupName: [""],
            markTeacherCount: [""],
        });
        this.prosonSearch = this.fb.group({
            displayName: [""],
            userName: [""]
        })
        this.route.params.subscribe(
            data => {
                this.markSettingId = data.id;
            }
        )
        this.loadData();
    }
    loadData(params?) {
        if (!params) {
            params = {
                markSettingId: this.markSettingId,
                dataType: ''
            }
        }
        this.examinationService.getGroupListBuQue(params).subscribe(
            data => {
                console.log(data);
                this.loading = false;
                this.columnsData = data;
            },
            err => { tipMessage(err) }
        )
    }
    _submitForm($event, value) {
        $event.preventDefault();
        // tslint:disable-next-line:forin
        console.log(value);
        let params = {
            markSettingId: this.markSettingId,
            dataType: "",
            markGroupName: value.markGroupName,
            markTeacherCount: value.markTeacherCount,
        };
        this.loadData(params);
    }
    // 添加组织
    addGroup = () => {
        this.showAddGroup = true;
    };
    delectGroup = (row) => {
        let that = this;
        this.confirmServ.confirm({
            content: "是否确认删除！",
            okText: "确定",
            cancelText: "取消",
            zIndex: 1003,
            onOk() {
                that.examinationService.deleteGroup(
                    { markSettingId: that.markSettingId, markGroupId: row.id }
                ).subscribe(
                    data => {
                        tipMessage('删除成功', 'success');
                        that.loadData();
                    },
                    error => { tipMessage(error) }
                    )
            }
        })
    }
    submitAddGroup = () => {
        if (!this.groupName || this.groupName.trim() == '') {
            tipMessage('请输入组名称！');
            return;
        }
        let params = {
            markSettingId: this.markSettingId,
            markGroupName: this.groupName,
            remark: this.description,
            markScoreMode: 3,  // 默认加上
            "markUserCount": -1,
            "markTeacherCount": 0,
            startTime: this.markStartTime,
            endTime: this.markEndTime
        }
        this.examinationService.addGroup(params).subscribe(
            data => {
                this.groupName = '';
                this.description = '';
                this.markStartTime = '';
                this.markEndTime = '';
                this.showAddGroup = false;
                if (data.errcode == 'ok') {
                    tipMessage('添加成功', 'success');
                } else {
                    tipMessage(data.errmsg)
                }
                this.loadData();
            },
            err => { tipMessage(err) }
        )
    }
    // 显示组内成员模态框
    showGroupMemberModal = (id) => {
        this.showGroupMember = true;
        this.groupId = id;
        this.loadGroupMember(id);
    }
    // 添加新用户
    submitUser(data) {
        if (!data || data.length == 0) {
            return;
        }
        let ids = data.map(it => it.id)
        let params = {
            markGroupId: this.markGroupId,
            userIds: ids,
            markSettingId: this.markSettingId
        }
        this.examinationService.addMarker(params).subscribe(
            res => {
                tipMessage('添加成功', 'success');
                this.showNewAdd = false;
                this.loadData();
            },
            err => {
                tipMessage(err);
                this.showNewAdd = false;
            }
        )
    }
    toReview(row) {
        // tslint:disable-next-line:max-line-length
        this.router.navigate([`/exam/examination/edit/${this.cache.id}/review`], {
            queryParams: { userId: row.userId, examId: row.examId }
        });
    }
    // 加载组内成员
    loadGroupMember(id?) {
        let params = {
            markGroupId: id
        }
        this.markGroupId = id;
        this.examinationService.getGroupUserList(params).subscribe(
            data => {
                this.groupColumnsData = data.content
            },
            err => {
                tipMessage(err)
            }
        )
    }
    deletePerson(row) {
        let that = this;
        this.confirmServ.confirm({
            content: "是否确认删除！",
            okText: "确定",
            cancelText: "取消",
            zIndex: 1003,
            onOk() {
                that.examinationService.deletePerson({ id: row.markGroupUserId }).subscribe(
                    data => {
                        tipMessage("删除成功", 'success');
                        that.loadGroupMember(that.markGroupId);
                    },
                    err => {
                        tipMessage(err)
                    }
                )
            }
        })
    }
    back() {
        this._location.back();
    }
    showUserAdd(row) {
        this.markGroupId = row.id
        this.userAdd._value = [];
        this.userAdd.selection = [];
        this.userAdd.openLookup();
    }
}
