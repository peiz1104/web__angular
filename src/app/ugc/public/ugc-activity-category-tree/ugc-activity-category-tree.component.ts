import { UgcActivityCategoryService } from './../../service/ugc-activity-category.service';
import { UgcActivityCategory } from './../../entity/ugc-activity-category';
import { CuiTreeNode, CuiTreeConfig, TreeComponent } from 'console-ui-ng';
import { Component, OnInit, Output, EventEmitter, Input, OnChanges, ViewChild } from '@angular/core';
import { Observable } from "rxjs/Observable";

@Component({
    selector: 'spk-ugc-activity-category-tree',
    templateUrl: './ugc-activity-category-tree.component.html',
    styleUrls: ['./ugc-activity-category-tree.component.scss']
})
export class UgcActivityCategoryTreeComponent implements OnInit, OnChanges {

    @Output() selectionChange = new EventEmitter();
    // @Input() classification: UgcActivityClassification;
    // categoryGroup
    @Input() activityId;
    categories;
    roots;
    config: CuiTreeConfig;
    @ViewChild('tree') tree: TreeComponent;

    constructor(private classificationService: UgcActivityCategoryService) {
    }

    initConfig() {
        this.config = {
            async: {
                enable: true,
                loadChildren: (node: CuiTreeNode): Observable<any> => {
                    return this.classificationService.getAllOfPage(this.activityId, { parentId: node.data.id});
                },
                dataFilter: (data, node: CuiTreeNode) => {
                    if (!node.parent && node.data.virtual) {
                        if (data && data.length > 0) {
                            data[0]['selected'] = true;
                            // if (data.length == 1) {
                            //     data[0]['expanded'] = true;
                            // }
                        }
                    }
                    data.forEach(it => {
                        if (it.type == 'SUBJECT') {
                            it.icon = 'fa-file text-primary';
                        }
                    });
                    return data;
                }
            },
            data: {
                key: {
                    id: 'id',
                    label: 'name',
                    children: 'children'
                }
            }
        };
    }
    ngOnChanges() {
        this.roots = [{ id: '', name: '作品分类', icon: 'fa-sitemap text-secondary', selected: true, expanded: true, hasChildren: true }];
        if (this.config) {
            this.config = null;
        }
        this.initConfig();
    }
    ngOnInit() {
        this.roots = [{ id: '', name: '作品分类', icon: 'fa-sitemap text-secondary', selected: true, expanded: true, hasChildren: true }];
        this.initConfig();
    }

    onSelectionChange(selection) {
        let datas = selection.map(it => it.data);
        this.selectionChange.emit(datas);
    }

    public refresh(cate, isRate: boolean = true) {
        let node: CuiTreeNode = (cate && this.tree.getNodeById(cate.id)) || this.tree.getNodeById(0);
        this.tree.refresh(node, isRate ? 'rate' : 'children');
    }

}
