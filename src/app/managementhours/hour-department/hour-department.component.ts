import { Component, OnInit } from '@angular/core';
import { HourService } from '../managementservice/hour.service';
import { Pagination } from 'app/core/entity/pagination';
import { tipMessage } from 'app/account/entity/message-tip';
@Component({
    selector: 'spk-hour-department',
    templateUrl: './hour-department.component.html',
    styleUrls: ['./hour-department.component.scss']
})
export class HourDepartmentComponent implements OnInit {
    spinning: boolean = false;
    testListData: any;
    selection: any[] = [];
    isVisible: boolean = false;
    spinningAttch: boolean = false;
    search;
    files: any[] = [];
    columns: any = [
        { title: '培训主题', data: 'name' },
        { title: '申报人', tpl: 'displayName' },
        { title: '申报人所属组织', tpl: 'userGroupNamePath' },
        { title: '已处理数量', data: 'fixCount', styleClass: 'text-right' },
        { title: '提交数量', data: 'submitCount', styleClass: 'text-right' },
        { title: '创建时间', tpl: 'createdDate', styleClass: 'text-center' },
        { title: '查看附件', tpl: 'fileview', styleClass: 'text-center' },
        { title: '操作', tpl: 'actions', styleClass: 'text-center' }
    ];
    loadData(page?: Pagination<any>) {
        this.spinning = true;
        let params = {
            page: page ? page.number : 0,
            size: page ? page.size : 10,
            search: this.search
        }
        this.hourservice.departmentList(params).subscribe(
            res => {
                this.testListData = res;
                this.spinning = false;
            },
            error => {
                this.spinning = false;
                tipMessage(error);
            }
        )
    }
    constructor(
        private hourservice: HourService
    ) { }

    ngOnInit() {
        this.loadData();
    }
    // 附件查看
    attchView(value) {
        this.isVisible = true;
        this.spinningAttch = true;
        this.hourservice.departmentGetDetail(value.id).subscribe(
            res => {
                this.spinningAttch = false;
                this.files = res.attachs;
            },
            err => {
                this.spinningAttch = false;
                tipMessage(err);
            }
        )
    }
    handleCancel(event) {
        this.isVisible = false;
        this.files = [];
    }
    handleOk(value) {
        this.isVisible = false;
        this.files = [];
    }
    getNamePath(value) {
        if (value) {
            if (value.indexOf(',') != -1 || value.indexOf('，') != -1) {
                return value.replace(/\,|\，/g, '/');
            } else {
                return value;
            }
        } else {
            return '---'
        }
    }
}
