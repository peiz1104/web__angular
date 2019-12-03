import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd';
import { CuiPagination } from 'console-ui-ng';
import * as moment from 'moment';

import { BasicSettingService } from 'app/exam/service/basic-setting.service';

@Component({
    selector: 'spk-question-type-list',
    templateUrl: './question-type-list.component.html',
    styleUrls: ['./question-type-list.component.scss']
})
export class QuestionTypeListComponent implements OnInit {
    pagination: CuiPagination;
    loading: boolean = true;
    isAdd: boolean = false;
    isSpinning: boolean = false
    editObj: any = {};
    columns: any = [
        { title: '试题类型名称', data: 'typeName', styleClass: 'text-center' },
        { title: '试题类型编码', data: 'typeCode', styleClass: 'text-center' },
        { title: '基本类型编码', data: 'baseCode', styleClass: 'text-center' },
        // { title: '试题类型描述', data: 'typeDesc', styleClass: 'type-desc', style: { 'max-width': '250px' } },
        { title: '试题类型描述', tpl: 'typeDesc', styleClass: 'type-desc', style: { 'max-width': '250px' } },
        { title: '创建日期', tpl: 'createdDate', styleClass: 'text-center' },
        { title: '修改日期', tpl: 'lastModifiedDate', styleClass: 'text-center' },
        { title: '发布状态', tpl: 'isEnable', styleClass: 'text-center' },
        { title: '操作', tpl: 'option', styleClass: 'text-center' }
    ];
    columnsData: any[];
    constructor(
        private basicSettingService: BasicSettingService,
        private message: NzMessageService,
        private router: Router
    ) { }

    ngOnInit() {
        this.getTypeListData();
    }

    getTypeListData(page?: CuiPagination) {
        this.isSpinning = true;
        this.pagination = page;
        let params = {
            page: page ? page.number : 0,
            size: page ? page.size : 10,
        }

        this.basicSettingService.getQuestionTypeList(params).subscribe(data => {
            this.pagination = data;
            this.columnsData = data['content'];
            this.loading = false;
            this.isSpinning = false;
        });
    }
    handleQuestionType(row) {
        this.editObj = row;
        if (this.editObj && this.editObj['id']) {
            this.router.navigate(['/exam/basic-setting/edit-type', this.editObj['id']])
        } else {
            this.router.navigate(['/exam/basic-setting/add-type'])
        }
    }
    refresh() {
        this.getTypeListData();
    }
}
