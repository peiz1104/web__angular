import { ImpeachService } from './../../service/impeach.service';
import { TopicReply } from './../../entity/topicReply';
import { Topic } from './../../entity/topic';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TopicService } from '../../service/topic.service';
import { tipMessage } from 'app/account/entity/message-tip';

@Component({
    selector: 'spk-impeach-show-info',
    templateUrl: './impeach-show-info.component.html',
    styleUrls: ['./impeach-show-info.component.scss']
})
export class ImpeachShowInfoComponent implements OnInit {

    // @Input() forumId;
    @Input() type;
    @Input() info: any;
    @Input() impeachId;


    @Output() closeModal: EventEmitter<any> = new EventEmitter<any>();

    topic: Topic;
    topicReply: TopicReply;

    dataForm: FormGroup;

    loading: boolean = false;

    constructor(
        private fb: FormBuilder,
        private impeachService: ImpeachService,
    ) { }

    ngOnInit() {
        this.initForm();
    }


    initForm() {
        if (this.type == "TOPIC") {
            let m = this.info;
            console.log("adasdsa", m);
            this.dataForm = this.fb.group({
                id: [m.id, Validators.required],
                title: [m.title, Validators.required],
                content: [m.content, Validators.required],
            });
            this.loading = true;
        } else {
            this.impeachService.getReply(this.info).subscribe(
                ok => {
                    this.dataForm = this.fb.group({
                        id: [ok.id, Validators.required],
                        content: [ok.content, Validators.required],
                    });
                    this.loading = true;
                },
                err => {
                    tipMessage(err);
                    this.doCancel();
                }
            );
        }
    }

    onSubmit() {
        this.markAsDirty();
        if (this.type == "TOPIC") {
            this.impeachService.updateTopic(this.impeachId, this.dataForm.value).subscribe(
                ok => {
                    tipMessage("保存成功", 'success');
                    this.doCancel();
                },
                err => {
                    tipMessage("保存失败");
                });
        } else {
            this.impeachService.updateReply(this.impeachId, this.dataForm.value).subscribe(
                ok => {
                    tipMessage("保存成功", 'success');
                    this.doCancel();
                },
                err => {
                    tipMessage("保存失败");
                });
        }
    }

    doCancel() {
        this.loading = false;
        this.closeModal.emit({ originalEvent: event });
    }

    getFormControl(name) {
        return this.dataForm.controls[name];
    }

    markAsDirty() {
        for (let key of Object.keys(this.dataForm.controls)) {
            this.dataForm.controls[key].markAsDirty();
        }
    }

}
