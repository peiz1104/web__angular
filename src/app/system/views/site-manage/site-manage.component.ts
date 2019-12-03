import { NzModalService } from 'ng-zorro-antd';
import { Site } from './../../entity/site';
import { SiteService } from './../../service/site.service';
import { Observable } from 'rxjs/Observable';
import { CuiTreeConfig, CuiTreeNode, TreeComponent } from 'console-ui-ng';
import { Component, OnInit, ViewChild } from '@angular/core';
import { tipMessage } from "app/account/entity/message-tip";

@Component({
    selector: 'spk-site-manage',
    templateUrl: './site-manage.component.html',
    styleUrls: ['./site-manage.component.scss']
})
export class SiteManageComponent implements OnInit {

    selection;

    siteEdit: Site;
    isCreate: boolean;
    // @ViewChild('siteTree') tree: TreeComponent;

    treeConf: CuiTreeConfig = {
        async: {
            enable: true,
            loadChildren: (node: CuiTreeNode): Observable<any> => {
                return this.siteApi.siteTree(node.data.id);
            },
            dataFilter: (data, node: CuiTreeNode) => {
                if (!node.parent && node.data.virtual) {
                    if (data && data.length > 0) {
                        data[0]['selected'] = true;
                        data[0]['expanded'] = true;
                    }
                }

                data.forEach(item => {
                    item['hasChildren'] = true;
                });

                return data;
            }
        },
        data: {
            key: {
                id: 'id',
                children: 'children',
                label: "name"
            }
        }
    }

    constructor(private siteApi: SiteService, private modal: NzModalService) { }

    ngOnInit() {
    }

    onSelect(event: { node: CuiTreeNode }) {
        this.selection = event.node.data;
        console.log(this.selection);
        this.siteEdit = this.selection;
        this.isCreate = false;
    }

    addSite() {
        if (!this.selection) {
            tipMessage('请选择父级站点', 'warning');
            return;
        }
        this.siteEdit = new Site();
        this.isCreate = true;
    }

    onSave(e) {
        if (this.isCreate) {
            if (!this.selection) {
                tipMessage('请选择父级站点', 'warning');
                return;
            }

            let value = e.value;
            value['parent'] = this.selection;
            this.siteApi.create(value).subscribe(
                ok => {
                    tipMessage('添加成功', 'success');
                    // refresh tree node
                },
                err => {
                    tipMessage('添加失败', 'error');
                }
            );
        } else {
            if (!this.siteEdit || !this.siteEdit.id) {
                tipMessage('操作错误，请重新选择节点后编辑', 'error');
                return;
            }

            let value = e.value;
            value['id'] = this.siteEdit.id;
            this.siteApi.update(value).subscribe(
                ok => {
                    tipMessage('修改成功', 'success');
                    // refresh tree node
                },
                err => {
                    tipMessage('修改失败', 'error');
                }
            );
        }
    }

    onCancel(e) {

    }

    delSite() {
        if (this.selection) {
            this.modal.confirm({
                title: `危险操作: 删除站点 "${this.selection.name}"`,
                content: '删除站点将会删除此站点下的所有数据，站点下的所有用户将不能登录系统，确认要删除此站点吗？',
                zIndex: 1003,
                onOk: () => {
                    this.siteApi.delete([this.selection.id]).subscribe(
                        ok => {
                            tipMessage('删除成功', 'success');
                        },
                        err => {
                            tipMessage('删除失败', 'error');
                        }
                    );
                }
            });
        }
    }
}
