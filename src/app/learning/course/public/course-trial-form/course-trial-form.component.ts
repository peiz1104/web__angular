import { Course } from './../../../../home/entity/course';
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UploadFile } from '../../../../shared';
import { Video } from '../../entity/video';
import { CourseTrialService } from '../../service/course-trial.service';
import { tipMessage } from 'app/account/entity/message-tip';

@Component({
    selector: 'spk-course-trial-form',
    templateUrl: './course-trial-form.component.html',
    styleUrls: ['./course-trial-form.component.scss']
})
export class CourseTrialFormComponent implements OnInit {

    msg: string;
    loading: boolean = false;
    maxSize: number = 1024 * 1024 * 1024 * 100;
    accept: string = ".mp4";
    @Input() trial: Video;
    @Input() editable: boolean = false;
    @Input() course: Course;
    constructor(
        private courseTrialService: CourseTrialService,
        private fb: FormBuilder
    ) { }

    ngOnInit() {
    }

    onUploadComplete(event) {
        this.trial = Object.assign(this.trial, event);
        console.log(this.trial);
    }

    onSubmit(event: Event, nextAction?: string) {
        this.loading = true;
        this.courseTrialService.save(this.course.id, this.trial).subscribe(
            data => {
                this.trial = data;
                this.loading = false;
                tipMessage("保存成功");
            },
            err => {
                this.loading = false;
                tipMessage(err);
            }
        );
    }

    delete() {
        this.courseTrialService.delete(this.course.id).subscribe(
            data => {
                tipMessage("删除成功", 'success');
                this.trial = new Video();
            },
            err => {
                tipMessage(err);
            }
        );
    }

}
