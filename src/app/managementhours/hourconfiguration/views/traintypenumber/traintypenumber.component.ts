import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { Pagination } from 'app/core/entity/pagination';
import { HourService } from '../../../managementservice/hour.service';
import {
    FormBuilder,
    FormGroup,
    Validators,
    FormControl
} from '@angular/forms';
import * as _ from 'lodash';
declare let $: any;
const { isArray } = _;
// import { setTimeout } from 'timers';

@Component({
    selector: 'spk-traintypenumber',
    templateUrl: './traintypenumber.component.html',
    styleUrls: ['./traintypenumber.component.scss']
})
export class TraintypenumberComponent implements OnInit {
    columns: any = [
        { title: 'ID', data: 'id', styleClass: 'fix-small-width' },
        { title: '培训主题名称', tpl: 'name', styleClass: 'fix-middle-width' },
        { title: '描述', tpl: 'description', styleClass: 'fix-width' },
        { title: '操作', tpl: 'actions', styleClass: 'text-center' },
    ];
    _searchForm: FormGroup;
    spinning: boolean = true;
    selection: any[] = [];
    testListData: any;
    searchBy = {};
    userGroup;
    parent_id = "";
    ugSearchText;
    loadData(page?: Pagination<any>) {
        this.spinning = true;
        let params = {
            page: page ? page.number : 0,
            size: page ? page.size : 10,
            parent_id: this.parent_id,
            ...this.searchBy
            // knowledgeId: this.selectTreeId
        };
        this.hourservice.gettrainthemelist(params).subscribe(
            res => {
                // console.log(res);
                this.spinning = false;
                this.testListData = res;
                this.judgecheckable();
                this.selection = [];
            },
            err => {
                this.spinning = false;
                return this.tipMessage('error', err);
            }
        )
    }
    constructor(
        private fb: FormBuilder,
        private route: Router,
        private message: NzMessageService,
        private hourservice: HourService,
        private confirmServ: NzModalService

    ) { }

    ngOnInit() {
        this._searchForm = this.fb.group({
            name: []
        });
        this.loadData();
    }
    // 搜索的加载列表
    _submitForm($event, value) {
        $event.preventDefault();
        // tslint:disable-next-line:forin
        this.searchBy = value;
        this.loadData();
        // console.log($event, value)
        return;
    }
    addtrainitem(event, type) {
        if (this.userGroup.id) {
            window.localStorage.setItem(type, JSON.stringify(this.userGroup));
        } else {
            window.localStorage.removeItem(type);
        }
        this.route.navigate(['/classhour/hourconfiguration/edit'], { queryParams: { type: type } })
    }
    delete(event) {
        if (this.selection.length) {
            // 执行删除操作
            let self = this;
            if (this.judgedeleteAll(this.selection)) {
                return this.tipMessage('error', '不可删除初始化数据');
            }
            let ids = this.getselectionids(this.selection);
            this.confirmServ.confirm({
                title: '删除',
                content: '确定要删除所选内容？',
                showConfirmLoading: true,
                zIndex: 1003,
                onOk() {
                    self.hourservice.deletetraintheme(ids).subscribe(
                        res => {
                            self.tipMessage('success', '删除成功！');
                            self.loadData();
                        },
                        err => {
                            return self.message.error(err);
                        }
                    )

                },
                onCancel() { }
            })
        } else {
            return this.tipMessage('error', '请选择要删除的项！');
        }
        // console.log(event, 222)
    }
    singledelete(ids) {
        let self = this;
        this.confirmServ.confirm({
            title: '删除',
            content: '确定要删除所选内容？',
            showConfirmLoading: true,
            zIndex: 1003,
            onOk() {
                self.hourservice.deletetraintheme(ids).subscribe(
                    res => {
                        self.tipMessage('success', '删除成功');
                        self.loadData();
                    },
                    err => {
                        return self.message.error(err);
                    }
                )

            },
            onCancel() { }
        })
    }
    // 将选中的selection分离出id数组
    getselectionids(array) {
        let ids = [];
        array.map((item, index) => {
            ids.push(item.id)
        })
        return ids;
    }
    // 编辑主题
    edittheme(id) {
        this.route.navigate(['/classhour/hourconfiguration/edit'], { queryParams: { type: 'trainthemeadd', id: id } })
    }
    onUgSelectionChange(ugs) {
        ugs = ugs && isArray(ugs) ? ugs : (ugs ? [ugs] : []);
        let ug = ugs[0];
        this.userGroup = ug;
        this.parent_id = this.userGroup.id;
        this.loadData();
    }
    judgecheckable() {
        this.testListData.content.forEach((item) => {
            if (item.isDeafult) {
                item.checkable = false;
            }
        })
    }
    judgedeleteAll(array: any[]) {
        return array.some((item) => {
            return item.isDeafult;
        })
    }
    tipMessage(type: string, text: string, duration?: number) {
        $.toast({
            icon: type,
            text: text,
            position: 'top-center',
            allowToastClose: false,
            hideAfter: duration || 1000
        })
    }
}
