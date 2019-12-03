import { DomSanitizer } from '@angular/platform-browser';
import { RcoService } from './../../service/rco.service';
import { Rco } from './../../entity/rco';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NzMessageService, NzModalService, NzModalSubject } from 'ng-zorro-antd';
import { RcoAddGroupComponent } from '../rco-add-group/rco-add-group.component';
import { RcoLinkComponent } from '../rco-link/rco-link.component';
import { RcoUploadComponent } from '../rco-upload/rco-upload.component';
import { RcoLookupResourceComponent } from '../rco-lookup-resource/rco-lookup-resource.component';
import { RcoItemEditComponent } from '../rco-item-edit/rco-item-edit.component';
import { RcoPreviewComponent } from '../rco-preview/rco-preview.component';
import { tipMessage } from 'app/account/entity/message-tip';

@Component({
    selector: 'spk-rco-item',
    templateUrl: './rco-item.component.html',
    styleUrls: ['./rco-item.component.scss']
})
export class RcoItemComponent implements OnInit {
    @Input() rco: Rco;
    @Input() rcos: Rco[];
    @Input() editable: boolean = true;

    @Output() rcoChange: EventEmitter<Rco> = new EventEmitter<Rco>();
    @Output() rcosChange: EventEmitter<Rco[]> = new EventEmitter<Rco[]>();

    @Input() courseId;
    @Input() courseName: string;

    maxFileSize = 1024 * 1024 * 1024 * 1024;
    title: string;
    editingTitle: boolean = false;

    appending: Rco;

    expanded: boolean;
    editing: boolean;

    constructor(
        private rcoService: RcoService,
        private message: NzMessageService,
        public sanitizer: DomSanitizer,
        private modal: NzModalService) { }

    ngOnInit() {
        if (!this.rco) {
            this.rco = this.rcos.find(it => !it.parent);
        }

        if (!this.rco.id) {
            this.editingTitle = true;
        }

        if (this.rco.contentType != 'TOPIC') {
            this.expanded = true;
        }
    }

    getRootRco() {
        return this.rcos.find(it => !it.parent);
    }

    isBlank() {
        let root = this.getRootRco();
        return !root || !this.rcos.some(it => it.parent && it.parent.id == root.id);
    }

    hasChildren() {
        let children = this.children;
        return children && children.length > 0;
    }

    get children(): Rco[] {
        if (!this.rcos) {
            return null;
        }
        return this.rcos.filter(it => it.parent && it.parent.id == this.rco.id)
            .sort((a: Rco, b: Rco) => a.childSeq - b.childSeq);
    }

    getIcon() {
        let iconNames = { 'COURSE': 'cube', 'TOPIC_GROUP': 'folder-open', 'TOPIC': 'book' };
        return iconNames[this.rco.contentType];
    }

    delete(event) {
        event.stopPropagation();
        if (this.rco.id) {
            let delOperate = () => {
                this.rcoService.delete([this.rco.id]).subscribe(
                    ok => {
                        this.rcos = this.rcos.filter(it => it != this.rco);
                        this.rcosChange.emit(this.rcos);
                        tipMessage('删除成功', 'success');
                    }
                );
            }
            this.modal.confirm({
                title: '您是否确认要删除这项内容',
                // content: '<b>一些解释</b>',
                onOk: delOperate,
                zIndex: 1003,
            });
        } else {
            this.rcos = this.rcos.filter(it => it != this.rco);
            this.rcosChange.emit(this.rcos);
        }
    }

    toggleExpand() {
        // if ('TOPIC' != this.rco.contentType) {
        //   return;
        // }
        this.expanded = !this.expanded;
    }

    onUploadComplete(file) {
        console.log('rco item file upload complete:', file);

        this.rcoService.uploadFile(this.rco.id, file).subscribe(
            rco => {
                this.rco = rco;
                this.editing = false;
                tipMessage('更新章节内容成功', 'success');
            },
            err => {
                tipMessage('更新章节内容失败，请重试');
            }
        );
    }

    getSaveUrl(url: string) {
        return this.sanitizer.bypassSecurityTrustResourceUrl(url);
    }

    check() {
        this.rco['selected'] = !this.rco['selected'];
        this.rcos.filter(it => it != this.rco).forEach(it => it['selected'] = false);
    }

    getSelected() {
        let selected = this.rcos.filter(it => it['selected']);
        if (selected && selected.length > 0) {
            return selected[0];
        }
    }

    openAddGroup(event, self?: boolean) {
        event.stopPropagation();

        let parent = self ? this.rco : (this.getSelected() || this.getRootRco());
        this.openDialog(parent, '添加组', RcoAddGroupComponent).subscribe(
            ({ code, rco }) => {
                if (code && code == 'addOk' && rco) {
                    this.rcos.push(rco);
                    this.rcosChange.emit(this.rcos);
                }
            },
            err => {
                // 加载失败
            }
        );
    }

    openAddLink(event, self?: boolean) {
        event.stopPropagation();

        let parent = self ? this.rco : (this.getSelected() || this.getRootRco());
        this.openDialog(parent, '添加链接', RcoLinkComponent, null, null, 800).subscribe(
            ({ code, rco }) => {
                if (code && code == 'addOk' && rco) {
                    this.rcos.push(rco);
                    this.rcosChange.emit(this.rcos);
                }
            },
            err => {
                // 加载失败
            }
        );
    }

    openAddUpload(event, self?: boolean) {
        event.stopPropagation();

        let parent = self ? this.rco : (this.getSelected() || this.getRootRco());
        this.openDialog(parent, '上传内容', RcoUploadComponent, null, null, 1000).subscribe(
            ({ code, rcos }) => {
                if (code && code == 'addOk' && rcos) {
                    this.rcos.push(...rcos);
                    this.rcosChange.emit(this.rcos);
                }
            },
            err => {
                // 加载失败
            }
        );
    }

    openAddLookupResouce(event, self?: boolean) {
        event.stopPropagation();

        let parent = self ? this.rco : (this.getSelected() || this.getRootRco());
        this.openDialog(parent, '选择内容', RcoLookupResourceComponent).subscribe(
            ({ code, rco }) => {
                if (code && code == 'addOk' && rco) {
                    this.rcos.push(rco);
                    this.rcosChange.emit(this.rcos);
                }
            },
            err => {
                // 加载失败
            }
        );
    }

    openItemEdit(event, self?: boolean) {
        event.stopPropagation();

        let rco = self ? this.rco : this.getSelected();
        if (!rco) {
            tipMessage('请选择一个要便捷的节点或者在节点后点击编辑按钮', 'warning', 3000);
        }
        let width = 800;
        const subscription = this.modal.open({
            title: `修改${rco.title}`,
            content: RcoItemEditComponent,
            width: width,
            footer: false,
            maskClosable: false,
            zIndex: 1003,
            componentParams: {
                rco: rco
            }
        });

        subscription.subscribe(
            ({ code, newRco }) => {
                if (code && code == 'editOk' && newRco) {
                    console.log(newRco)
                    // this.rcos.splice(this.rcos.indexOf(rco), 1).push(newRco);
                    this.rcos = this.rcos.filter(it => it != rco);
                    this.rcos.push(newRco);
                    this.rcosChange.emit(this.rcos);
                }
            },
            err => {
                // 加载失败
            }
        );
    }

    openPreview(event, self?: boolean) {
        event.stopPropagation();

        let rootRco = this.getRootRco();
        let rco = self ? this.rco : this.getSelected();
        let width = '100%';
        const subscription = this.modal.open({
            title: `预览${rootRco.title}`,
            content: RcoPreviewComponent,
            // width: width,
            footer: false,
            maskClosable: false,
            zIndex: 1003,
            componentParams: {
                rootRco: rootRco,
                currentRcoId: rco ? rco.id : undefined,
                courseId: this.courseId
            },
            wrapClassName: 'full-dialog rco-preview-dialog'
        });
    }

    private openDialog(parent: Rco, title: string, content, ok?: Function, cancel?: Function, width = 520): NzModalSubject {
        const subscription = this.modal.open({
            title: title,
            content: content,
            width: width,
            zIndex: 99999,
            onOk: () => {
                if (ok) {
                    ok();
                }
            },
            onCancel: () => {
                if (cancel) {
                    cancel();
                }
            },
            footer: false,
            maskClosable: false,
            componentParams: {
                parent: parent
            }
        });

        return subscription;
    }
}
