import { Board } from './../../entity/board';
import { BoardService } from './../../service/board.service';
import { Input, Output, EventEmitter } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Topic } from '../../entity/topic';
import { TopicService } from '../../service/topic.service';
import { tipMessage } from 'app/account/entity/message-tip';

@Component({
    selector: 'spk-topic-form',
    templateUrl: './topic-form.component.html',
    styleUrls: ['./topic-form.component.scss']
})
export class TopicFormComponent implements OnInit {

    @Input() forumId;

    @Output() closeModal: EventEmitter<any> = new EventEmitter<any>();

    boardId: number;
    boards: Board[];

    topic: Topic;

    dataForm: FormGroup;

    boardType: boolean = false;

    constructor(
        private boardService: BoardService,
        private topicService: TopicService,
        private fb: FormBuilder,
    ) { }

    ngOnInit() {
        this.getBoardList();
        this.initForm();
    }

    getBoardList() {
        this.boardService.getAll(this.forumId).subscribe(
            ok => {
                this.boards = ok;
            },
            err => {
                tipMessage(err);
            }
        );
    }

    initForm() {
        let m = new Topic();
        this.dataForm = this.fb.group({
            title: [m.title, Validators.required],
            boardId: [m.boardId, Validators.required],
            content: [m.content, Validators.required],
        });
    }

    onSubmit() {
        this.markAsDirty();
        this.boardType = this.validateForm();
        if (this.boardType) {
            return;
        }
        this.topicService.createTopic(this.forumId, this.dataForm.value).subscribe(
            ok => {
                tipMessage("保存成功", 'success');
                this.doCancel();
            },
            err => {
                tipMessage("保存失败");
            });

    }

    doCancel(event?) {
        this.closeModal.emit({ originalEvent: event });
    }

    validateForm() {
        if (this.getFormControl('boardId').value) {
            return false;
        } else {
            return true;
        }
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
