import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NzModalSubject, NzMessageService } from 'ng-zorro-antd';
import { UgcChapterService } from '../../service/ugc-chapter.service';
import { UgcChapter } from '../../entity/ugc-chapter';
import { tipMessage } from 'app/account/entity/message-tip';

@Component({
    selector: 'spk-ugc-chapter-item-edit',
    templateUrl: './ugc-chapter-item-edit.component.html',
    styleUrls: ['./ugc-chapter-item-edit.component.scss']
})
export class UgcChpaterItemEditComponent implements OnInit {

    @Input() courseId: number;
    @Input() chapter: UgcChapter;

    _form: FormGroup;
    submiting;

    get linkEditable() {
        if (this.chapter) {
            return ['AUTO'].some(it => it == this.chapter.type);
        }
    }

    constructor(private subject: NzModalSubject, private fb: FormBuilder,
        private chapterApi: UgcChapterService, private message: NzMessageService) { }

    ngOnInit() {
        this.initForm();
    }

    initForm() {
        let m = this.chapter;
        this._form = this.fb.group({
            title: [m.title, Validators.required],
            startingUrl: [m.startingUrl], // TODO: 校验链接是否可用，不可用时，警告，再点确定可以提交
            intro: [m.intro]
        });
    }

    onOk(event) {
        if (this._form.invalid) {
            tipMessage('表单填写错误');
            return;
        }

        let value = this._form.value;
        value['id'] = this.chapter.id;
        this.submiting = true;
        this.chapterApi.addInfo(this.courseId, value).subscribe(
            chapter => {
                tipMessage('操作成功', 'success');
                this.submiting = false;
                this.subject.next({ code: 'editOk', newChapter: chapter });
                this.subject.destroy('onOk');
            },
            err => {
                tipMessage(`操作失败 ${err}`);
                this.submiting = false;
            }
        );
    }

    onCancel(event) {
        this.subject.destroy('onCancel');
    }

}
