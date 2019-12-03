import { DomSanitizer } from '@angular/platform-browser';
import { UgcChapterService } from './../../service/ugc-chapter.service';
// import { chapter } from './../../entity/chapter';
import { Component, OnInit, Input, Output, EventEmitter, ViewChild, TemplateRef } from '@angular/core';
import { NzMessageService, NzModalService, NzModalSubject } from 'ng-zorro-antd';
import { UgcChapter } from '../../entity/ugc-chapter';
import { UgcChapterUploadComponent } from '../ugc-chapter-upload/ugc-chapter-upload.component';
import { UgcChpaterItemEditComponent } from '../ugc-chapter-item-edit/ugc-chapter-item-edit.component';
import { tipMessage } from 'app/account/entity/message-tip';

@Component({
    selector: 'spk-ugc-chapter-item',
    templateUrl: './ugc-chapter-item.component.html',
    styleUrls: ['./ugc-chapter-item.component.scss']
})
export class UgcChapterItemComponent implements OnInit {
    @Input() chapter: UgcChapter;
    @Input() chapters: UgcChapter[];
    @Input() editable: boolean = true;
    @Input() start = false;
    @Output() chapterChange: EventEmitter<UgcChapter> = new EventEmitter<UgcChapter>();
    @Output() chaptersChange: EventEmitter<UgcChapter[]> = new EventEmitter<UgcChapter[]>();
    @ViewChild('preview') private previewTempRef: TemplateRef<any>;
    @Input() courseId;

    maxFileSize = 1024 * 1024 * 1024 * 1024;
    title: string;
    editingTitle: boolean = false;

    // appending: chapter;

    expanded: boolean;
    editing: boolean;

    constructor(
        private chapterservice: UgcChapterService,
        private message: NzMessageService,
        public sanitizer: DomSanitizer,
        private modal: NzModalService) { }

    ngOnInit() {
        if (!this.chapter) {
            this.chapter = this.chapters.find(it => (it.contentType == 'COURSE'));
        }
        if (this.chapter.contentType != 'TOPIC') {
            this.expanded = true;
        }
    }



    isBlank() {
        return this.chapters.length == 0;
    }

    hasChildren() {
        let children = this.children;
        return children && children.length > 0;
    }

    get children(): UgcChapter[] {
        if (!this.chapters || !this.start) {
            return null;
        }
        return this.chapters.sort((a: UgcChapter, b: UgcChapter) => a.childSeq - b.childSeq);
    }

    getIcon() {
        let iconNames = { 'COURSE': 'cube', 'TOPIC_GROUP': 'folder-open', 'TOPIC': 'book' };
        return iconNames[this.chapter.contentType];
    }

    delete(event) {
        event.stopPropagation();
        if (this.chapter.id) {
            let delOperate = () => {
                this.chapterservice.deleteChapters(this.courseId, [this.chapter.id]).subscribe(
                    ok => {
                        this.chapters = this.chapters.filter(it => it != this.chapter);
                        this.chaptersChange.emit(this.chapters);
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
            this.chapters = this.chapters.filter(it => it != this.chapter);
            this.chaptersChange.emit(this.chapters);
        }
    }

    toggleExpand() {

        this.expanded = !this.expanded;
    }



    getSaveUrl(url: string) {
        return this.sanitizer.bypassSecurityTrustResourceUrl(url);
    }

    check() {
        this.chapter['selected'] = !this.chapter['selected'];
        this.chapters.filter(it => it != this.chapter).forEach(it => it['selected'] = false);
    }

    getSelected() {
        let selected = this.chapters.filter(it => it['selected']);
        if (selected && selected.length > 0) {
            return selected[0];
        }
    }



    openAddUpload(event, self?: boolean) {
        event.stopPropagation();
        this.openDialog('上传内容', UgcChapterUploadComponent, null, null, 1000).subscribe(
            ({ code, chapters }) => {
                if (code && code == 'addOk' && chapters) {
                    this.chapters.push(chapters);
                    // this.chapter.children.push(chapters);
                    this.chaptersChange.emit(this.chapters);
                }
            },
            err => {
                // 加载失败
            }
        );
    }



    openItemEdit(event, self?: boolean) {
        event.stopPropagation();
        let chapter = self ? this.chapter : this.getSelected();
        if (!chapter) {
            tipMessage('请选择一个要便捷的节点或者在节点后点击编辑按钮', 'warning', 4000);
        }
        let width = 800;
        const subscription = this.modal.open({
            title: `修改${chapter.title}`,
            content: UgcChpaterItemEditComponent,
            width: width,
            footer: false,
            maskClosable: false,
            zIndex: 1003,
            componentParams: {
                chapter: chapter,
                courseId: this.courseId
            }
        });

        subscription.subscribe(
            ({ code, newChapter }) => {
                if (code && code == 'editOk' && newChapter) {
                    this.chapters = this.chapters.filter(it => it != chapter);
                    this.chapters.push(newChapter);
                    this.chaptersChange.emit(this.chapters);
                }
            },
            err => {
                // 加载失败
            }
        );
    }

    openPreview(event, self?: boolean) {
        // event.stopPropagation();

        // let rootchapter = this.getRootchapter();
        let chapter = self ? this.chapter : this.getSelected();
        this.modal.open({
            title: `预览${chapter.title}`,
            content: this.previewTempRef,
            footer: false,
            maskClosable: false,
            componentParams: {
                chapter: chapter
            },
            wrapClassName: 'full-dialog'
        });
    }

    private openDialog(title: string, content, ok?: Function, cancel?: Function, width = 520): NzModalSubject {
        const subscription = this.modal.open({
            title: title,
            content: content,
            width: width,
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
                courseId: this.courseId
            }
        });

        return subscription;
    }
}
