import { FormBuilder } from '@angular/forms';
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd';
import { SystemForumSetting } from '../../entity/systemForumSetting';
import { SystemForumSettingService } from '../../service/system-forum-setting.service';
import { tipMessage } from 'app/account/entity/message-tip';

@Component({
    selector: 'spk-basic-setting-form',
    templateUrl: './basic-setting-form.component.html',
    styleUrls: ['./basic-setting-form.component.scss']
})
export class BasicSettingFormComponent implements OnInit {

    forumForm: FormGroup;

    isLoading: boolean;

    @Input() forum: SystemForumSetting;

    constructor(
        private fb: FormBuilder,
        private message: NzMessageService,
        private sysForumService: SystemForumSettingService,
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
        this.sysForumService.save(this.forumForm.value).subscribe(
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
        let m = this.forum || new SystemForumSetting();
        this.forumForm = this.fb.group({
            id: [m.id],
            isEnabled: [m.isEnabled],
            freeSpeech: [m.freeSpeech],
            maxTopicOneDay: [m.maxTopicOneDay, [Validators.required]],
            postInterval: [m.postInterval, [Validators.required]],
        });
    }
}
