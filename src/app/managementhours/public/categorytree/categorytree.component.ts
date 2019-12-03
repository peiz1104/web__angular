import { Component, OnInit, Output, EventEmitter, Input, OnChanges } from '@angular/core';
import { HourService } from './../../managementservice/hour.service';
import { CategoryGroup } from './../../entity/category-group';
import { NzMessageService } from 'ng-zorro-antd'
import { CuiTreeNode, CuiTreeConfig } from 'console-ui-ng';
import { Observable } from "rxjs/Observable";
import { tipMessage } from 'app/account/entity/message-tip';

@Component({
    selector: 'spk-categorytree',
    templateUrl: './categorytree.component.html',
    styleUrls: ['./categorytree.component.scss']
})
export class CategorytreeComponent implements OnInit, OnChanges {
    @Output() selectionChange = new EventEmitter();
    categoryGroup: CategoryGroup;
    // categoryGroup
    @Input() identifier;
    categories;
    roots;
    config: CuiTreeConfig;
    constructor(
        private hourservice: HourService,
        private message: NzMessageService
    ) { }

    ngOnInit() {
    }
    initConfig() {
        this.config = {
            async: {
                enable: true,
                loadChildren: (node: CuiTreeNode): Observable<any> => {
                    return this.hourservice.getAll({ parentId: node.data.id, identifier: this.identifier }).catch(() => {
                        tipMessage('树加载失败', 'warning');
                        return Observable.of(null);
                    });
                },
                dataFilter: (data, node: CuiTreeNode) => {
                    if (!node.parent && node.data.virtual) {
                        if (data && data.length > 0) {
                            data[0]['selected'] = true;
                            // data[0]['expanded'] = true;
                        }
                    }
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
        console.log('identifier', this.identifier);
        this.hourservice.getByIdentifier(this.identifier).subscribe(
            obj => {
                this.categoryGroup = obj;
                this.roots = [{ id: '', name: this.categoryGroup.name, selected: true, expanded: true, hasChildren: true }];
                if (this.config) {
                    this.config = null;
                }
                this.initConfig();
                console.log('config', this.config);
            },
            err => {
                console.log('查找分类分组失败');
            }
        );
    }
    onSelectionChange(selection) {
        let datas = selection.map(it => it.data);
        this.selectionChange.emit(datas);
    }
}
