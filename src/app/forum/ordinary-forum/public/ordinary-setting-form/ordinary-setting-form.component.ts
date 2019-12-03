import { ForumService } from './../../service/forum.service';
import { Forum } from './../../entity/forum';
import { FormBuilder } from '@angular/forms';
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { tipMessage } from 'app/account/entity/message-tip';

@Component({
    selector: 'spk-ordinary-setting-form',
    templateUrl: './ordinary-setting-form.component.html',
    styleUrls: ['./ordinary-setting-form.component.scss']
})
export class OrdinarySettingFormComponent implements OnInit {

    forumForm: FormGroup;

    @Input() forum: Forum;

    isLoading: boolean;

    constructor(
        private forumService: ForumService,
        private fb: FormBuilder,
    ) { }

    onSubmit(event: Event) {
        if (!this.forumForm.dirty) {
            tipMessage("未修改任何信息");
            return;
        }
        this.markAsDirty();
        if (this.forumForm.invalid) {
            return;
        }
        this.isLoading = true;
        this.forumService.save(this.forumForm.value).subscribe(
            forum => {
                tipMessage("保存成功", 'success');
                this.forum = forum;
                this.ngOnInit();
                this.isLoading = false;
            },
            err => {
                this.forum = null;
                this.ngOnInit();
                tipMessage(err);
                this.isLoading = false;
            }
        );
    }

    getFormControl(name) {
        return this.forumForm.controls[name];
    }

    markAsDirty() {
        for (let key of Object.keys(this.forumForm.controls)) {
            this.forumForm.controls[key].markAsDirty();
        }
    }

    ngOnInit() {
        this.getFormInfo();
    }

    getFormInfo() {
        let m = this.forum || new Forum();
        console.log("aaf", m.isEnabled, m.freeSpeech);
        this.forumForm = this.fb.group({
            id: [m.id],
            name: [m.name, [Validators.required]],
            description: [m.description, []],
            isEnabled: [m.isEnabled],
            freeSpeech: [m.freeSpeech],
            maxTopicOneDay: [m.maxTopicOneDay, [Validators.required]],
            postInterval: [m.postInterval, [Validators.required]],
        });
    }
}
