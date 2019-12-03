import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd';
import { Pagination } from "app/core";
import { UserGroup } from './../../../entity/user-group';
import {
    FormBuilder,
    FormGroup,
    Validators,
    FormControl
} from '@angular/forms';
import { tipMessage } from 'app/account/entity/message-tip';

@Component({
    selector: 'spk-train-class-classfile',
    templateUrl: './train-class-classfile.component.html',
    styleUrls: ['./train-class-classfile.component.scss']
})
export class TrainClassClassfileComponent implements OnInit {
    _searchForm: FormGroup;
    trainId: any;
    listData: any;
    selection: any = [];
    spinning: boolean = false;
    searchBy: {
        name?: string,
        isPublish?: any,
        isExcellent?: any,
        transcodeStatus?: any,
        userGroup?: UserGroup[],
    } = {};
    columns = [
        { title: '文档名称', tpl: 'nameCol' },
        { title: '所属分类', data: 'categoryName' },
        { title: '所属组织', data: 'userGroupName' },
        { title: '发布状态', tpl: 'publishCol', styleClass: 'text-center' },
        { title: '转码状态', tpl: 'convertStatusCol', styleClass: 'text-center' },
        { title: '是否精品', tpl: 'excellentCol', styleClass: 'text-center' },
        { title: '', tpl: 'rowAction', styleClass: 'text-right' },
    ]
    constructor(
        private route: Router,
        private routeInfo: ActivatedRoute,
        private confirmServ: NzModalService,
        private fb: FormBuilder,
    ) { }

    reload(page?: Pagination<any>) {
        this.spinning = true;
        let params = {
            page: page ? page.number : 0,
            size: page ? page.size : 10,
        };
    }
    ngOnInit() {
        this._searchForm = this.fb.group({
            name: [],
            isPublish: [],
            isExcellent: [],
            transcodeStatus: [],
            userGroup: [],
        })
        this.routeInfo.parent.params.subscribe(
            params => {
                this.trainId = params.tbcId;
            }
        )
    }
    // 搜索的加载列表
    _submitForm($event, value) {
        $event.preventDefault();
        // tslint:disable-next-line:forin
        // console.log(value)
        this.searchBy = value;
        this.reload();
        return;
    }
    // 删除
    delete(row) {
        let self = this;
        this.confirmServ.confirm({
            title: '删除',
            content: '确定要删除所选项？',
            showConfirmLoading: true,
            zIndex: 1003,
            onOk() {
                tipMessage('删除成功！', 'success');
            },
            onCancel() { }
        })
    }
}
