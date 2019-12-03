import { Component, OnInit } from '@angular/core';
import { CuiPagination } from 'console-ui-ng';
import { Router, ActivatedRoute } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd';
import { HomeTemplateApiService } from '../../services/home-template-api.service';
import { LayoutTemplate } from '../../entity/layout-template';
import { tipMessage } from 'app/account/entity/message-tip';

@Component({
    selector: 'spk-home-template-list',
    templateUrl: './home-template-list.component.html',
    styleUrls: ['./home-template-list.component.scss']
})
export class HomeTemplateListComponent implements OnInit {

    pagination: CuiPagination;
    columns;
    searchtext;
    templates: LayoutTemplate[];
    loading: boolean = true;
    isEdit: boolean = false;
    templateId: number;

    constructor(private templateService: HomeTemplateApiService,
        private router: Router,
        private modal: NzModalService,
        private route: ActivatedRoute) {
        this.columns = [
            { title: '模板名称', data: 'name', tpl: 'name' },
            { title: '所属站点', data: 'siteName', visible: true, styleClass: 'text-center' },
            { title: '默认', data: 'isDefault', tpl: 'isDefaultTpl', styleClass: 'text-center' },
            // { title: '状态', data: 'isPublished', tpl: 'isPublishedTpl', styleClass: 'text-center' }
        ];
    }

    ngOnInit() {
        this.loadData();
    }

    loadData(page?: CuiPagination) {
        let params = {
            name: this.searchtext
        }
        this.templateService.getAllOfPage(params).subscribe(
            data => {
                this.templates = data.content;
                this.loading = false;
            },
            err => {
                this.loading = false;
            }
        );
    }

    /**
     * 发布、取消发布
     */
    onPublish(row) {
        this.loading = true;
        row.isPublished = !row.isPublished;
        this.templateService.update(row).subscribe(
            data => {
                if (row.isPublished) {
                    tipMessage('发布成功', 'success');
                } else {
                    tipMessage('取消发布成功', 'success');
                }
                this.loadData();
                this.loading = false;
            },
            err => {
                this.loading = false;
            }
        );
    }

    /**
     * 设为默认
     */
    onDefault(row) {
        this.modal.confirm({
            title: `只能设置一个模板为默认，设置当前模板为默认模板将会取消设置其他模板，确认操作吗？`,
            zIndex: 1003,
            onOk: () => {
                this.templateService.setDefault(row.id).subscribe(
                    data => {
                        tipMessage('设置成功', 'success');
                        this.loadData();
                        this.loading = false;
                    },
                    err => {
                        this.loading = false;
                    }
                );
            }
        });
    }

    /**
     * 删除
     */
    delete(row) {
        this.templateService.delete(row.id).subscribe(
            data => {
                tipMessage('删除成功', 'success');
                this.loadData();
                this.loading = false;
            },
            err => {
                this.loading = false;
            }
        );
        /*     this.modal.confirm({
              title: `确认要删除吗？`,
              onOk: () => {
        
                    }
            }); */
    }

    showEdit(row?: any) {
        this.templateId = row ? row.id : undefined;
        this.isEdit = true;
    }
    handleCancel() {
        this.isEdit = false;
        this.loadData();
    }

}
