import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from "@angular/core";
import { CuiPagination } from "console-ui-ng";
import { ExaminationService } from "../../../service/examination.service";
import { NzModalService } from "ng-zorro-antd";
import { Title } from "@angular/platform-browser/src/browser/title";
import { error } from "util";
import * as moment from 'moment';
import { tipMessage } from "app/account/entity/message-tip";

@Component({
    selector: 'spk-new-exam-jk-box',
    templateUrl: './exam-jk-box.component.html',
    styleUrls: ['./exam-jk-box.component.scss']
})
export class ExamNewJkBoxComponent implements OnInit {
    @Input() examId;
    @Input() stCode;
    @ViewChild('JKAdd') JKAdd;
    username: string;
    startdate: any;
    enddate: any;
    displayName: string;
    ShowEditJKcode: boolean = false;
    ShowEditJKtime: boolean = false;
    selection: any;
    JKcode;
    JKcolumns: any[] = [
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
        }, {
            title: "监考码",
            tpl: "jkCode",
            styleClass: "text-center examination-room-table-col",
            style: { "max-width": "140px" }
        },
        {
            title: "操作",
            tpl: "actSet",
            styleClass: "text-center"
        }
    ];
    JKcolumnsData: any[] = [];
    JKselectData: any;
    JKListLoading: Boolean = false;
    JKqueryValue: any = {};
    JKpagination: CuiPagination;
    JKvisible: Boolean = false;
    JKmodalLoading: Boolean = false;
    JKrangeData: any;
    JKuserSelectData: any;
    JKstartdate: any;
    JKenddate: any;
    JKrangeClick: any;
    constructor(
        private examinationService: ExaminationService,
        private confirmServ: NzModalService,
    ) { }
    ngOnInit() {
        this.JKloadList();
    }
    JKaddList = () => {
        this.JKAdd.openLookup()
    }
    JKuserChangeHandler(id, row) {
        let arr = id.map(it => it.id)
        let sendData = {
            userIds: arr,
            examId: this.examId,
            stCode: "JK"
        };
        this.examinationService.setInvigilatorCode(sendData).subscribe(
            // tslint:disable-next-line:no-shadowed-variable
            data => {
                tipMessage("操作成功", 'success');
                this.JKloadList();
            },
            // tslint:disable-next-line:no-shadowed-variable
            e => {
                tipMessage("操作失败");
            }
        );
    }
    // 加载监考列表
    JKloadList(page?: CuiPagination) {
        this.JKListLoading = true;
        this.JKpagination = page;
        let params = {
            stCode: "JK",
            examId: this.examId,
            username: this.username || '',
            displayName: this.displayName || '',
            page: page ? page.number : 0,
            size: page ? page.size : 10
            // sort: page && page.sort ? page.sort : null
        };
        this.examinationService.getApproverList(params).subscribe(
            data => {
                this.JKcolumnsData = data.content;
                this.JKpagination = data;
                this.JKListLoading = false;
            }
        )
    }
    JKremove(row) {
        let self = this;
        this.confirmServ.confirm({
            title: "确认",
            content: "确认要删除？",
            showConfirmLoading: true,
            zIndex: 1003,
            onOk() {
                self.examinationService
                    .deleteApprover({ id: row.id, stCode: "JK" })
                    .subscribe(
                    d => {
                        tipMessage("操作成功");
                        self.JKloadList();
                    },
                    e => {
                        tipMessage("操作失败");
                    }
                    );
            },
            onCancel() { }
        });
    }
    selectionChange() {
        console.log(this.selection);
    }
    submitJKcode() {
        if (!this.JKcode) {
            tipMessage("请设置监考码！");
            return;
        }
        if (this.JKcode !== null) {
            let jkBoolean: boolean = /^[0-9]*$/.test(this.JKcode);
            if (!jkBoolean) {
                tipMessage("监考码只能为纯数字！");
                return;
            }
        }
        let params = {
            jkCode: this.JKcode,
            examId: this.examId,
            stCode: this.stCode
        }
        this.JKListLoading = true;
        this.examinationService.setJKcode(params).subscribe(
            data => {
                this.ShowEditJKcode = false;
                this.JKcode = null;
                this.JKloadList();
            }
        )
    }
    clearJKcode() {
        let that = this;
        this.confirmServ.confirm({
            content: '是否确认清除监考码！',
            okText: '确定',
            cancelText: '取消',
            zIndex: 1003,
            onOk() {
                that.examinationService.setJKcode({
                    examId: that.examId,
                    stCode: that.stCode,
                    jkCode: ''
                }).subscribe(
                    data => {
                        tipMessage('清除成功', 'success');
                        that.JKloadList();
                    }, error => {
                        tipMessage(error);
                        that.JKloadList();
                    }
                    )
            }
        })

    }
    // 设置监考时间
    submitJKtime() {
        if (!this.selection || this.selection.length <= 0) {
            this.selection = [];
        }
        let ids = this.selection.map(it => it.id);
        if (!this.startdate && !this.enddate) {
            tipMessage('请设置监考时间！');
            return;
        }
        console.log(ids);
        let params = {
            startTime: moment(this.startdate).format('x'),
            endTime: moment(this.enddate).format('x'),
            stCode: this.stCode,
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
                this.JKloadList();
                // this.selection = [];
            },
            err => {
                tipMessage(err);
            }
        )
    }
    clearJKtime() {
        let that = this;
        let str;
        if (this.selection && this.selection.length > 0) {
            str = "确定清除勾选数据监考时间？"
        } else {
            str = "确定清除所有数据监考时间？"
        }
        if (!this.selection || this.selection.length <= 0) {
            this.selection = [];
        }
        let ids = this.selection.map(it => it.id);
        this.confirmServ.confirm({
            content: str,
            okText: '确定',
            cancelText: '取消',
            zIndex: 1003,
            onOk() {
                that.examinationService.setMarkTime({
                    stCode: that.stCode,
                    examId: that.examId,
                    ids: ids
                }).subscribe(
                    data => {
                        tipMessage('清除成功', 'success')
                        that.JKloadList();
                        // this.selection = [];
                    },
                    err => {
                        tipMessage('err');
                        that.JKaddList();
                    }
                    )
            }
        })
    }
}
