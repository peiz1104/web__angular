import { CuiLayer } from 'console-ui-ng';
import { Router, ActivatedRoute, NavigationEnd, ResolveEnd } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Component, OnInit, Input, Inject, forwardRef } from '@angular/core';
import { UgcActivityCategoryService } from '../../../../service/ugc-activity-category.service';
import { UgcActivity } from '../../../../entity/ugc-activity';
import { UgcActivityCategory } from '../../../../entity/ugc-activity-category';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { UgcActivityCategoryComponent } from '../ugc-activity-category.component';
import { tipMessage } from 'app/account/entity/message-tip';

@Component({
    selector: 'spk-ugc-activity-category-list',
    templateUrl: './/ugc-activity-category-list.component.html',
    styleUrls: ['./ugc-activity-category-list.component.scss']
})
export class UgcActivityCategoryListComponent implements OnInit {
    activeCategory;
    activityId;
    categories;
    subCategories: UgcActivityCategory[];
    searchText;
    selected;
    columns;
    loading: boolean;
    selection: UgcActivityCategory[];
    constructor(
        private categoryService: UgcActivityCategoryService,
        private router: Router,
        private route: ActivatedRoute,
        private message: NzMessageService,
        private layer: CuiLayer,
        private modal: NzModalService,
        @Inject(forwardRef(() => UgcActivityCategoryComponent)) private categoryGroupComponent: UgcActivityCategoryComponent
    ) {
        this.columns = [
            // { title: 'ID', data: 'id' },
            { title: '名称', data: 'name' },
            { title: '节点类型', tpl: 'type' , class: 'text-center'},
            { title: '顺序', tpl: 'displayOrder', class: 'text-center' },
            { title: '操作', tpl: 'actions', styleClass: 'text-right' },
        ];
        ;
    }

    ngOnInit() {
        this.loadData();
    }



    loadData() {
        this.route.data
            .subscribe((data: { ugcActivity: UgcActivity }) => {
                this.activityId = data.ugcActivity.id;
                // this.loadData();
            });
        if (!this.subCategories) {
            this.subCategories = new Array<UgcActivityCategory>();
        }
        this.loading = true;
        this.route.paramMap.subscribe(params => {
            let cgId = params.get('activeCategoryId');
            let parentId;
            if (cgId) {
                this.categoryService.get(this.activityId, Number(cgId)).subscribe(
                    c => {
                        this.activeCategory = c;
                        parentId = this.activeCategory.id;
                        this.findSubCategories(parentId);
                    },
                    error => {
                        this.loading = false;
                    }
                );
            } else {
                this.activeCategory = null;
                this.findSubCategories(parentId);
            }
        });
    }
    findSubCategories(parentId) {
        this.categoryService.getAllOfPage(this.activityId, { parentId: parentId, searchText: this.searchText }).subscribe(
            categories => {
                this.categories = categories;
                this.subCategories = categories;
                this.loading = false;
            },
            error => {
                this.loading = false;
            }
        );
    }
    onSelect(selIds) {
        this.selected = selIds.length > 0;
    }

    delete(categorys?: UgcActivityCategory[], single_flag?: boolean) {
        categorys = categorys ? categorys : this.selection;
        if (!categorys || categorys.length == 0) {
            tipMessage('请选择要删除的分类/主题','warning');
            return;
        }

        if (single_flag) {
            this.categoryService.deleted(this.activityId, categorys.map(it => it.id)).subscribe(
                () => {
                    tipMessage('删除成功','success');
                    this.loadData();
                    this.categoryGroupComponent.cateTree.refresh(this.activeCategory, false);
                },
                err => { tipMessage(err); }
            );
        } else {
            this.modal.confirm({
                title: "确认要删除选中的分类吗？",
                onOk: () => {
                    this.categoryService.deleted(this.activityId, categorys.map(it => it.id)).subscribe(
                        () => {
                        tipMessage('删除成功', 'success');
                            this.loadData();
                            this.categoryGroupComponent.cateTree.refresh(this.activeCategory, false);
                        },
                    err => {
                        tipMessage(err);
                    }
                    );
                }
            })
        }
    }

    moveUp(category: UgcActivityCategory) {
        let parentId;
        // tslint:disable-next-line:max-line-length
        this.categoryService.moveUp(this.activityId, category.id, { parentId: category.parent ? category.parent.id : null, searchText: this.searchText ? this.searchText : '' }).subscribe(
            () => {
                this.loadData();
                 this.categoryGroupComponent.cateTree.refresh(this.activeCategory, false);
            },
            err => {
                tipMessage(err);
            }
        );
    }


    moveDown(category: UgcActivityCategory) {
        let parentId;
        // tslint:disable-next-line:max-line-length
        this.categoryService.moveDown(this.activityId, category.id, { parentId: category.parent ? category.parent.id : null, searchText: this.searchText ? this.searchText : '' }).subscribe(
            () => {
                this.loadData();
                 this.categoryGroupComponent.cateTree.refresh(this.activeCategory, false);
            },
            err => {
                tipMessage(err);
            }
        );
    }
}
