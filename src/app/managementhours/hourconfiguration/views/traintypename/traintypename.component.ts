import { Component, OnInit } from '@angular/core';
import { UserGroup } from '../../entity/user-group';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { HourService } from '../../../managementservice/hour.service';
import { Pagination } from '../../../../core/entity/pagination';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { CategoryGroup } from './../../../entity/category-group';
import * as _ from 'lodash';
const { isArray } = _;
import {
    FormBuilder,
    FormGroup,
    FormControl,
    Validators
} from '@angular/forms';
declare let $: any;

@Component({
    selector: 'spk-traintypename',
    templateUrl: './traintypename.component.html',
    styleUrls: ['./traintypename.component.scss']
})
export class TraintypenameComponent implements OnInit {

    userGroup;
    _searchForm: FormGroup;
    spinning: boolean = true;
    selection: any[] = [];
    categoryGroups: CategoryGroup[];
    activeCategoryGroup: CategoryGroup;
    defaultCategoryGroup: CategoryGroup;
    testListData: any;
    searchBy = {};
    parent_id = '';
    ugSearchText;
    columns: any = [
        { title: 'ID', data: 'id', styleClass: 'fix-small-width' },
        { title: '培训类型名称', data: 'name', styleClass: 'fix-middle-width' },
        { title: '描述', tpl: 'description', styleClass: 'fix-width' },
        { title: '操作', tpl: 'actions', styleClass: 'text-center' },
    ];
    loadData(page?: Pagination<any>) {
        this.spinning = true;
        let params = {
            page: page ? page.number : 0,
            size: page ? page.size : 10,
            parent_id: this.parent_id,
            // knowledgeId: this.selectTreeId
            ...this.searchBy,
        };
        this.hourservice.gettraintypelist(params).subscribe(
            res => {
                this.testListData = res;
                this.judgecheckable();
                this.spinning = false;
                this.selection = [];
            },
            err => {
                this.spinning = false;
                return this.tipMessage('error', err);
            }
        )
    }
    constructor(
        private message: NzMessageService,
        private confirmServ: NzModalService,
        private hourservice: HourService,
        private fb: FormBuilder,
        private route: Router,
        private routeInfo: ActivatedRoute,
    ) { }
    ngOnInit() {
        this._searchForm = this.fb.group({
            name: []
        });
        this.loadData();
    }
    onUgSelectionChange(ugs) {
        ugs = ugs && isArray(ugs) ? ugs : (ugs ? [ugs] : []);
        let ug = ugs[0];
        this.userGroup = ug;
        this.parent_id = this.userGroup.id;
        this.loadData();
    }
    // 搜索的加载列表
    _submitForm($event, value) {
        $event.preventDefault();
        // tslint:disable-next-line:forin
        // console.log(value)
        this.searchBy = value;
        this.loadData();
        return;
    }
    // 删除
    showConfirm() {
        this.confirmServ.confirm({
            title: '删除',
            content: '您是否确认要删除这项内容',
            showConfirmLoading: true,
            zIndex: 1003,
            onOk() {
                return new Promise((resolve) => {
                    setTimeout(resolve, 1000);
                });
            },
            onCancel() {
            }
        });
    }
    // 添加创建分类
    addclassification(event, type) {
        if (this.userGroup.id) {
            window.localStorage.setItem('fc', JSON.stringify(this.userGroup));
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
                    self.hourservice.deletetraintype(ids).subscribe(
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
        } else {
            return this.tipMessage('error', '请选择要删除的项！');
        }
    }

    // 单个的删除
    singledelete(ids) {
        let self = this;
        this.confirmServ.confirm({
            title: '删除',
            content: '确定要删除所选项？',
            showConfirmLoading: true,
            zIndex: 1003,
            onOk() {
                self.hourservice.deletetraintype(ids).subscribe(
                    res => {
                        self.tipMessage('success', '删除成功！');
                        self.loadData()
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
    // 编辑
    typeedit(id) {
        this.route.navigate(['/classhour/hourconfiguration/edit'], { queryParams: { type: 'fc', id: id } })
    }
    // 判断isDeafult不可选择
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
