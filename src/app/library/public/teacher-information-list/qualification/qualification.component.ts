import { Component, OnInit, Input } from '@angular/core';
import { TrainBaseService } from '../../../service/train-base.service';
import { TrainBase } from 'app/library/entity/train-base';
import { Pagination } from 'app/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd';
import { tipMessage } from 'app/account/entity/message-tip';
@Component({
    selector: 'spk-qualification',
    templateUrl: './qualification.component.html',
    styleUrls: ['./qualification.component.scss']
})
export class QualificationComponent implements OnInit {
    @Input() teacherId;
    _searchForm: FormGroup;
    spinning: boolean = false;
    selection: any[] = [];
    data: any;
    searchBy: {
        name?: any,
    } = {};

    columns: any[] = [
        // { title: '缩略图', tpl: 'img' },
        { title: '名称', data: 'name' },
        { title: '编码', data: 'code' },
        { title: '类型', tpl: 'teacherType' },
        { title: '组织', tpl: 'group' },
        { title: '分类', tpl: 'categr', styleClass: 'text-center' },
        { title: '学时', data: 'period', styleClass: 'text-right' },
    ];
    // 初始化表单title
    initSearchForm() {
        this._searchForm = this.fb.group({
            name: [],
        });
    }
    // 加载数据
    loadData(page?: Pagination<any>) {
        let params = {
            page: page ? page.number : 0,
            size: page ? page.size : 10,
            flag: 'isTrue',
        };
        this.spinning = true;
        if (this.searchBy.name) {
            params['name'] = this.searchBy.name;
        }
        this.service.getTeacherAllowList(this.teacherId, params).subscribe(
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
    getCourseTypeText(key) {
        let texts = { 'ONLINE': '在线学习', 'LIVE': '直播课堂', 'OFFLINE': '面授课程' };
        return texts[key] || '';
    }

}
