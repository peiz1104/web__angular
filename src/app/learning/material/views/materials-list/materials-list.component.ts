import { MaterialPreviewComponent } from './../material-preview/material-preview.component';
import { Output, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Documentlib } from './../../../../library/entity/documentlib';
import { Material } from './../../entity/material';
import { Pagination } from 'app/core';
import { MaterialService } from './../../service/material.service';
import { Column } from 'console-ui-ng';
import { NzModalService, NzMessageService, NzModalSubject } from 'ng-zorro-antd';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, Input } from '@angular/core';
import { MaterialAddComponent } from '../material-add/material-add.component';
import { MaterialEditComponent } from '../material-edit/material-edit.component';
import { UserGroup } from './../../../../system/entity/user-group';
import { tipMessage } from 'app/account/entity/message-tip';
import { Category } from 'app/system/category/entity/category'

@Component({
    selector: 'spk-materials-list',
    templateUrl: './materials-list.component.html',
    styleUrls: ['./materials-list.component.scss']
})
export class MaterialsListComponent implements OnInit {
    @Input() materialGroupId: number;
    @Input() editable: boolean = true;
    document: Documentlib = new Documentlib();
    category: Category = null;
    userGroup: UserGroup = null;
    documents;
    documentSelection: Documentlib[];
    materials;
    searchBy: { name: string } = { name: '' };
    selection: any[];
    currentModal: NzModalSubject;
    isConfirmLoading = false;
    loading: boolean = true;
    documentsLoading: boolean = true;
    isArchived: boolean = false;
    columns: Column[] = [
        { title: '资料名称', tpl: 'colTitle' },
        { title: '文件大小', data: 'documentInfo.prettyFileSize' },
        { title: '文件格式', data: 'documentInfo.format' },
        // { title: '转码状态', tpl: 'convertStatusCol' },
        { title: '操作', tpl: 'rowAction', styleClass: 'text-right' }
    ];

    documentColumns: Column[] = [
        { title: '文档名称', tpl: 'nameCol' },
        { title: '所属分类', data: 'categoryName' },
        { title: '所属组织', data: 'userGroupName' }
    ];

    constructor(private router: Router, private route: ActivatedRoute, private modalService: NzModalService,
        public message: NzMessageService,
        private materialService: MaterialService) { }

    ngOnInit() {
        console.log('editable:' + this.editable)
        this.loadData();
        this.route.data.subscribe(
            res => {
                console.log(res, 446);
                this.isArchived = res ? (res.trainingClass ? res.trainingClass.isArchived : false) : false;
            }
        )
    }

    hasGroup() {
        return this.materialGroupId > 0;
    }

    loadData() {
        this.loading = true;
        if (this.hasGroup()) {
            this.materialService.list(this.materialGroupId, this.searchBy, this.materials).subscribe(
                (page: Pagination<Material>) => {
                    this.materials = page;
                    this.loading = false;
                },
                err => {
                    this.loading = false;
                }
            );
        } else {
            this.loading = false;
        }
    }

    delete(id?, flag?: boolean) {
        let sel = id ? [id] : this.selection.map(it => it.id);
        if (sel.length == 0) {
            tipMessage('请选择要删除的资料', 'warning');
            return;
        }

        if (flag) {
            this.materialService.delete(this.materialGroupId, sel).subscribe(
                ok => {
                    tipMessage('删除成功', 'success');
                    this.loadData();
                },
                err => {
                    tipMessage('删除失败，请重新尝试', 'error');
                }
            );
        } else {
            this.modalService.confirm({
                title: '确定要删除选择的资料吗？',
                zIndex: 1003,
                // content: '',
                onOk: () => {
                    this.materialService.delete(this.materialGroupId, sel).subscribe(
                        ok => {
                            tipMessage('删除成功', 'success');
                            this.loadData();
                        },
                        err => {
                            tipMessage('删除失败，请重新尝试');
                        }
                    );
                }
            });
        }
    }

    loadDocument() {
        this.documentsLoading = true;
        this.materialService.findReferenceDocument(this.materialGroupId, this.getSearchParams(), this.documents).subscribe(
            (page: Pagination<Documentlib>) => {
                this.documentsLoading = false;
                this.documents = page;
            },
            err => {
                this.documentsLoading = false;
            }
        );
    }

    getSearchParams() {
        if (this.document) {
            console.log(this.document.name)
            let params = {};
            params['name'] = this.document.name;
            if (this.category && this.category.id) {
                params['category.id'] = this.category.id;
            }
            if (this.userGroup && this.userGroup.id) {
                params['userGroup.id'] = this.userGroup.id;
            }
            return params;
        }
        return null;
    }

    clearSearchText() {
        this.document.name = null;
        if (this.category) {
            this.category = new Category();
        }
        if (this.userGroup) {
            this.userGroup = new UserGroup();
        }
    }

    referenceDocument(titleTpl, contentTpl) {
        this.loadDocument();
        this.currentModal = this.modalService.open({
            title: titleTpl,
            content: contentTpl,
            footer: false,
            maskClosable: false,
            width: '1000px',
            zIndex: 1003,
            onOk() {
            },
            onCancel() {
            }
        });
    }

    handleOk(e) {
        this.isConfirmLoading = true;
        if (this.documentSelection && this.documentSelection.length > 0) {
            this.materialService.createFromDocument(this.materialGroupId, this.getSelectMaterials()).subscribe(
                ok => {
                    /* destroy方法可以传入onOk或者onCancel。默认是onCancel */
                    this.currentModal.destroy('onOk');
                    this.isConfirmLoading = false;
                    this.currentModal = null;
                    this.documents = null;
                    this.loadData();
                },
                err => {
                    tipMessage('引用文档失败请重试!');
                    this.documents = null;
                }
            )
        } else {
            tipMessage('至少选择一个文档!', 'warning');
        }
    }

    handleCancel(e) {
        this.documents = null;
        this.currentModal.destroy('onCancel');
    }

    getSelectMaterials(): Material[] {
        let materials: Material[] = [];
        this.documentSelection.forEach((e, index) => {
            let material = {
                name: e.name,
                description: e.summary,
                documentInfo: e.documentInfo,
                materialGroup: { id: this.materialGroupId }
            };
            materials.push(material);
        });

        return materials;
    }

    downloadd(material: Material) {
        console.log(material.id);
        this.materialService.download(this.materialGroupId, material.id).subscribe(
            blob => {
                let link = document.createElement("a");
                // Blob转化为链接
                link.setAttribute("href", window.URL.createObjectURL(blob));
                //  link.href = window.URL.createObjectURL(blob);
                link.setAttribute("download", material.name + ".pdf");
                // link.download = material.name + ".pdf";
                link.style.visibility = 'hidden';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            },
            err => {
                tipMessage(err);
            }
        );
    }

    openAdd() {
        this.openForm('上传资料', MaterialAddComponent, {
            onOk: () => {
                this.loadData();
            },
            onCancel: () => {
                this.loadData();
            },
        });
    }

    preview(dinfoId) {
        this.openForm('资料预览', MaterialPreviewComponent, {
            componentParams: {
                documentInfoId: dinfoId,
            },
            width: 1000,
            height: 1000,
            onOk: () => {
            }
        });
    }

    openEdit(material: Material) {
        this.openForm('修改资料', MaterialEditComponent, {
            componentParams: {
                materialGroupId: this.materialGroupId,
                material: material
            },
            onOk: () => {
                this.loadData();
            }
        });
    }

    openForm(title, content, extConfig?) {
        const defaultConfig = {
            title: title,
            content: content,
            width: 800,
            zIndex: 1003,
            footer: false,
            maskClosable: false,
            componentParams: {
                materialGroupId: this.materialGroupId
            }
        };
        const config = { ...defaultConfig, ...extConfig };
        return this.modalService.open(config);
    }
}
