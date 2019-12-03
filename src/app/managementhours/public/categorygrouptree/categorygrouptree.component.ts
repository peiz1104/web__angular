import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';
import { Observable } from 'rxjs/Observable';
import { CuiTreeConfig, CuiTreeNode } from 'console-ui-ng';
import { async } from '@angular/core/testing';
import { AuthService } from '../../../core';
import { HourService } from '../../managementservice/hour.service';


@Component({
    selector: 'spk-categorygrouptree',
    templateUrl: './categorygrouptree.component.html',
    styleUrls: ['./categorygrouptree.component.scss']
})
export class CategorygrouptreeComponent implements OnInit {
    @Input() identifier;
    @Output() selectionChange = new EventEmitter();
    config: CuiTreeConfig;
    roots;
    url;
    constructor(
        private ugService: HourService,
        private message: NzMessageService
    ) { }

    ngOnInit() {
        if (this.identifier == 'trainsource') {
            this.url = '/api/period/trainsource/children'
            this.roots = [{ id: '', name: '培训来源', selected: true, expanded: true, hasChildren: true, icon: 'fa-sitemap' }];
        } else if (this.identifier == 'traintitem') {
            this.url = '/api/period/traintheme/children'
            this.roots = [{ id: '', name: '培训主题', selected: true, expanded: true, hasChildren: true, icon: 'fa-sitemap' }];
        } else if (this.identifier == 'trainchannel') {
            this.url = '/api/period/trainwey/children'
            this.roots = [{ id: '', name: '培训方式', selected: true, expanded: true, hasChildren: true, icon: 'fa-sitemap' }];
        } else {
            this.roots = [{ id: '', name: '培训类型', selected: true, expanded: true, hasChildren: true, icon: 'fa-sitemap' }];
        }
        this.initConfig()
    }
    initConfig() {
        this.config = {
            async: {
                enable: true,
                loadChildren: (node: CuiTreeNode): Observable<any> => {
                    return this.ugService.groups(node.data.id, this.url)
                },
                dataFilter: (data, node: CuiTreeNode) => {
                    let treedata = data.content || data;
                    if (!node.parent && node.data.virtual) {
                        if (treedata && treedata.length > 0) {
                            treedata[0]['selected'] = true;
                            // data[0]['expanded'] = true;
                        }
                    }
                    return treedata;
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
    // 选择
    onSelectionChange(selection) {
        let datas = selection.map(it => it.data);
        this.selectionChange.emit(datas);
    }
}
