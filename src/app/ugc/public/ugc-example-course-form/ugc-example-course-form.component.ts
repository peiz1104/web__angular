import { Router, ActivatedRoute, Params } from '@angular/router';
import { Component, OnInit, Input, Output, EventEmitter, TemplateRef } from '@angular/core';
import { UgcExampleCourseService } from './../../service/ugc-example-course.service';
import { NzMessageService } from 'ng-zorro-antd';
import { FormDataUtil } from 'app/core';
import { UgcExampleCourse } from '../../entity/ugc-example-course';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { UgcCourse } from '../../entity/ugc-course';

@Component({
    selector: 'spk-ugc-example-course-form',
    templateUrl: './ugc-example-course-form.component.html',
    styleUrls: ['./ugc-example-course-form.component.scss']
})
export class UgcExampleCourseFormComponent implements OnInit {
    @Input() actionsViewRef: TemplateRef<any>;
    @Input() ugcExampleCourse: UgcExampleCourse;
    @Output() save: EventEmitter<any> = new EventEmitter();
    @Output() cancel: EventEmitter<any> = new EventEmitter();
    @Input() loading: boolean = false;
    @Input() editable: boolean = true;
    validateForm: FormGroup;
    _courseTypes = [
        { value: 'EXAMPLE', label: '样课' },
        { value: 'TUTORIAL', label: '教程' }
    ];

    constructor(private ugcExampleCourseService: UgcExampleCourseService,
        private message: NzMessageService,
        private fb: FormBuilder,
        private router: Router,
        private route: ActivatedRoute) { }

    ngOnInit() {
        this.initForm();
    }

    private initForm() {
        this.initFormData();
        if (this.ugcExampleCourse) {
            this.ugcExampleCourseService.getOne(this.ugcExampleCourse.id).subscribe(ugcExampleCourse => {
                this.ugcExampleCourse = ugcExampleCourse;
                this.getFormControl('name').setValue(this.ugcExampleCourse.courseName ? this.ugcExampleCourse.courseName : '');
                this.getFormControl('intro').setValue(this.ugcExampleCourse.courseIntro ? this.ugcExampleCourse.courseIntro : '');
                this.getFormControl('imageUrl').setValue(this.ugcExampleCourse.courseImageUrl ? this.ugcExampleCourse.courseImageUrl : '');
                this.validateForm.patchValue(ugcExampleCourse);
            });
        }
    }

    initFormData() {
        let m = this.ugcExampleCourse || new UgcExampleCourse();
        m.course = m.course || new UgcCourse();

        this.validateForm = this.fb.group({
            name: [m.course.name, [Validators.required]],
            imageUrl: [m.course.imageUrl],
            course: [m.course],
            type: [m.type || 'EXAMPLE', [Validators.required]],
            isPublished: [m.isPublished || false],
            intro: [m.course.intro]
        });
    }

    public get invalid() {
        return !this.validateForm || this.validateForm.invalid;
    }

    getFormControl(name) {
        return this.validateForm.controls[name];
    }

    markAsDirty() {
        for (let name of Object.keys(this.validateForm.controls)) {
            this.validateForm.controls[name].markAsDirty();
        }
    }

    onImageUpload(image) {
        if (image) {
            this.getFormControl('imageUrl').setValue(image.relativePath);
        }
    }

    _save(event) {
        this.markAsDirty();
        if (this.validateForm.invalid) {
            return;
        }
        let value = this.validateForm.value;
        if (this.ugcExampleCourse && this.ugcExampleCourse.id) {
            value.id = this.ugcExampleCourse.id;
            value.course.id = this.ugcExampleCourse.courseId ? this.ugcExampleCourse.courseId : '';
            value.newCourseName = this.validateForm.value.name;
            value.newCourseIntro = this.validateForm.value.intro;
            value.newCourseImageUrl = this.validateForm.value.imageUrl;
        }
        value.course.name = this.validateForm.value.name;
        value.course.imageUrl = this.validateForm.value.imageUrl;
        value.course.intro = this.validateForm.value.intro;
        this.save.emit({ originalEvent: event, value: value });
    }

    _cancel(event) {
        this.cancel.emit({ originalEvent: event });
    }
}
