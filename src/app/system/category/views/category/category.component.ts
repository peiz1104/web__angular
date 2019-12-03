import { Router, ActivatedRoute, NavigationEnd, ResolveEnd } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { CategoryService } from './../../service/category.service';
import { CategoryGroup } from './../../entity/category-group';
import { Category } from './../../entity/category';
import { Component, OnInit, Input, Inject, forwardRef } from '@angular/core';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { CategoryGroupComponent } from '../category-group/category-group.component';

@Component({
    selector: 'spk-category',
    templateUrl: './category.component.html',
    styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
    categoryGroup: CategoryGroup;
    activeCategory;
    categories;
    subCategories;
    searchText;
    selected;
    columns;
    selection: number[];
    loading: boolean;
    constructor(
        private categoryService: CategoryService,
        private message: NzMessageService,
        private router: Router,
        private route: ActivatedRoute,
        private modal: NzModalService,
        @Inject(forwardRef(() => CategoryGroupComponent)) private categoryGroupComponent: CategoryGroupComponent
    ) {
        this.columns = [
            // { title: 'ID', data: 'id' },
            { title: '名称', data: 'name' },
            { title: '描述', data: 'description' },
            { title: '顺序', tpl: 'displaySort', styleClass: 'text-center text-nowrap' },
            { title: '操作', tpl: 'actions', styleClass: 'text-right text-nowrap' },
        ];
    }

    ngOnInit() {
        this.loadData();
    }

    delete(id?: number, single_flag?: boolean) {
        let ids = id ? [id] : this.selection;

        if (!ids || ids.length == 0) {
            this.message.warning('请选择要删除的分类');
            return;
        }

        if (single_flag) {
            this.categoryService.delete(ids).subscribe(
                () => {
                    this.message.success('删除成功');
                    this.loadData();
                    this.categoryGroupComponent.cateTree.refresh(this.activeCategory, false);
                },
                err => { this.message.error("删除失败") }
            );
        } else {
            this.modal.confirm({
                title: "确认要删除选中的分类吗？",
                zIndex: 1003,
                onOk: () => {
                    this.categoryService.delete(ids).subscribe(
                        () => {
                            this.message.success('删除成功');
                            this.loadData();
                            this.categoryGroupComponent.cateTree.refresh(this.activeCategory, false);
                        },
                        err => { this.message.error("删除失败") }
                    );
                }
            })
        }
    }

    loadData() {
        this.loading = true;
        this.route.data
            .subscribe((data: { categoryGroup: CategoryGroup }) => {
                // console.log('categoryGroup', data.categoryGroup);
                this.categoryGroup = data.categoryGroup;
                // this.loadData();
            });
        this.route.paramMap.subscribe(params => {
            // console.log('parims', params);
            let cgId = params.get('activeCategoryId');
            let parentId;
            this.loading = false;
            if (cgId) {
                this.categoryService.getOne(cgId).subscribe(
                    c => {
                        this.activeCategory = c;
                        parentId = this.activeCategory.id;
                        this.findSubCategories(parentId);
                    }
                );
            } else {
                this.activeCategory = null;
                this.findSubCategories(parentId);
            }
        },
            err => {
                this.loading = false;
            }
        );
    }

    findSubCategories(parentId) {
        this.categoryService.getAllOfPage(
            {
                parentId: parentId,
                identifier: this.categoryGroup.identifier,
                searchText: this.searchText
            }
        ).subscribe(
            categories => {
                this.categories = categories;
                this.subCategories = categories;
            }
            );
    }

    move(sourceId: number, operate: 'up' | 'down') {
        let param = {
            sourceId: sourceId,
            operate: operate,
            searchText: this.searchText,
            parentId: this.activeCategory ? this.activeCategory.id : undefined,
            identifier: this.categoryGroup.identifier,
        };
        this.categoryService.move(param).subscribe(
            ok => {
                this.message.success("操作成功");
                this.loadData();
                this.categoryGroupComponent.cateTree.refresh(this.activeCategory, false);
            },
            err => {
                this.message.error(err);
            }

        );
    }

    onSelect(selIds) {
        this.selected = selIds.length > 0;
        this.selection = selIds;
    }
}
