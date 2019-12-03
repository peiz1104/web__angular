import { Component, OnInit, Input } from '@angular/core';
import { TrainBaseService } from '../../../service/train-base.service';
import { TrainBase } from 'app/library/entity/train-base';
import { Pagination } from 'app/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd';
import { tipMessage } from 'app/account/entity/message-tip';

@Component({
    selector: 'spk-record',
    templateUrl: './record.component.html',
    styleUrls: ['./record.component.scss']
})
export class RecordComponent implements OnInit {
    @Input() teacherId;
    _searchForm: FormGroup;
    spinning: boolean = false;
    selection: any[] = [];
    data: any;
    searchBy: {
        tbcName?: any,
        startDate?:any,
        endDate?:any,
        courseName?:any,
    } = {};

    columns: any[] = [
        { title: '培训班名称', tpl: 'courseName' },
        { title: '课程名称', tpl: 'name' },
        { title: '课时量', data: 'teachingPeriod', styleClass: 'text-right' },
        { title: '评估得分', data: 'evaluationScore', styleClass: 'text-right' },
        { title: '开始时间', tpl: 'startDate', styleClass: 'text-center' },
        { title: '结束时间', tpl: 'endDate', styleClass: 'text-center' },
        { title: '操作时间', tpl: 'operaDate', styleClass: 'text-center' },


    ];
    // 初始化表单title
    initSearchForm() {
        this._searchForm = this.fb.group({
            tbcName: [],
            startDate: [],
            endDate: [],
            courseName:[],
        });
    }
    // 加载数据
    loadData(page?: Pagination<any>) {
        let params = {
            page: page ? page.number : 0,
            size: page ? page.size : 10,
        };
        this.spinning = true;
        if (this.searchBy.tbcName) {
            params['tbcName'] = this.searchBy.tbcName;
        }
        if (this.searchBy.startDate) {
            params['startDate'] = this.searchBy.startDate;
        }
        if (this.searchBy.endDate) {
            params['endDate'] = this.searchBy.endDate;
        }
        if (this.searchBy.courseName) {
            params['courseName'] = this.searchBy.courseName;
        }

        this.service.getCourseRecordList(this.teacherId, params).subscribe(
            res => {
                // console.log(res);
                this.spinning = false;
                this.data = res;
                this.selection = [];
            },
            err => {
                this.spinning = false;
                tipMessage(err);
            }
        )
    }
    constructor(
        private service: TrainBaseService,
        private fb: FormBuilder,
        private message: NzMessageService
    ) { }

    ngOnInit() {
        this.initSearchForm()
        this.loadData();
    }
    _submitForm($event, value) {
        $event.preventDefault();
        // tslint:disable-next-line:forin
        this.searchBy = value;
        this.loadData();
        // console.log(value);
    }
    resetForm($event: MouseEvent) {
        $event.preventDefault();
        this._searchForm.reset();
        // tslint:disable-next-line:forin
        for (const key in this._searchForm.controls) {
            this._searchForm.controls[key].markAsPristine();
        }
    }

    export() {
        let params = {};
        if (this.searchBy.tbcName) {
            params['tbcName'] = this.searchBy.tbcName;
        }
        if (this.searchBy.startDate) {
            params['startDate'] = this.searchBy.startDate;
        }
        if (this.searchBy.endDate) {
            params['endDate'] = this.searchBy.endDate;
        }
        if (this.searchBy.courseName) {
            params['courseName'] = this.searchBy.courseName;
        }
        this.service.exportExl(this.teacherId,params).subscribe(
            ok => {
                console.log(ok.sessionName,333333);
                this.service.exportdownload(ok.sessionName);
            },
            err => {
                tipMessage('导出失败');
            }
        )
    }

}
