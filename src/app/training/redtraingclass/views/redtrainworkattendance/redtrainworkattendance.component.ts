import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ServiceService } from '../../service/service.service';
import { NzModalService } from 'ng-zorro-antd';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Pagination } from 'app/core';
import { tipMessage } from 'app/account/entity/message-tip';

@Component({
    selector: 'spk-redtrainworkattendance',
    templateUrl: './redtrainworkattendance.component.html',
    styleUrls: ['./redtrainworkattendance.component.scss']
})
export class RedtrainworkattendanceComponent implements OnInit {
    _searchForm: FormGroup;
    redId: any;
    spinning: boolean = false;
    selection: any[] = [];
    data: any;
    isVisible: boolean = false;
    editspinning: boolean = false;
    userId: any;
    spinningAttendce: boolean = false;
    testListData: any;
    selectionAttendce: any = [];
    searchBy: {
        coursename?: any,
        coursecode?: any,
        trainForm?: any,
        phoneNumber?: any
    } = {};
    columns: any[] = [
        { title: '用户名', tpl: 'username' },
        { title: '姓名', tpl: 'displayName' },
        { title: '手机号', tpl: 'phoneNumber', styleClass: 'text-center' },
        { title: '缺勤次数', data: 'time', styleClass: 'text-right' },
        { title: '操作', tpl: 'actions', styleClass: 'text-center' }
    ];
    attendanceColumns: any[] = [
        { title: '用户名', data: 'username' },
        { title: '姓名', data: 'displayName' },
        { title: '类型', tpl: 'type' },
        { title: '缺勤日期', tpl: 'date' },
        { title: '扣除分数', data: 'score' },
        { title: '描述信息', data: 'description' }
    ];
    // 加载数据
    loadData(page?: Pagination<any>) {
        let params = {
            page: page ? page.number : 0,
            size: page ? page.size : 10,
        };
        this.spinning = true;

        if (this.searchBy.phoneNumber) {
            params['phoneNumber'] = this.searchBy.phoneNumber
        }

        this.service.getUserAttendanceList(this.redId, params).subscribe(
            res => {
                this.data = res;
                this.spinning = false;
                this.selection = [];
            },
            err => {
                this.spinning = false;
                tipMessage(err);
            }
        )
    }
    // 初始化表单
    initSearchForm() {
        this._searchForm = this.fb.group({
            coursename: [],
            coursecode: [],
            trainForm: [],
            phoneNumber: []
        });
    }
    constructor(
        private router: Router,
        private routeInfo: ActivatedRoute,
        private service: ServiceService,
        private confirmv: NzModalService,
        private fb: FormBuilder
    ) { }

    ngOnInit() {
        this.routeInfo.parent.params.subscribe(
            (params) => {
                this.redId = params.redId
            }
        )
        this.initSearchForm();
        this.loadData();
    }
    _submitForm($event, value) {
        $event.preventDefault();
        // tslint:disable-next-line:forin
        this.searchBy = value;
        this.loadData();
        console.log(value);
    }
    resetForm($event: MouseEvent) {
        $event.preventDefault();
        this._searchForm.reset();
        // tslint:disable-next-line:forin
        for (const key in this._searchForm.controls) {
            this._searchForm.controls[key].markAsPristine();
        }
    }
    loadDataAttendance(page?: Pagination<any>) {
        this.spinningAttendce = true;
        let params = {
            page: page ? page.number : 0,
            size: page ? page.size : 10,
            'offering.id': this.redId,
            'user.id': this.userId,
            // knowledgeId: this.selectTreeId
        };
        this.service.attendancepersonlist(params).subscribe(
            res => {
                this.spinningAttendce = false;
                this.testListData = res;
                this.selectionAttendce = [];
            },
            err => {
                this.spinningAttendce = false;
                return tipMessage(err);
            }
        )

    }
    // 查看考勤详情
    viewsDetail(id) {
        this.userId = id;
        this.isVisible = true;
        this.loadDataAttendance()
    }
    handleCancel(event) {
        this.isVisible = false;
        this.userId = undefined;
        this.selectionAttendce = [];
    }
}
