import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Component, OnInit, Input, Output, EventEmitter, enableProdMode, TemplateRef  } from '@angular/core';
// import { UgcActivity } from './../../entity/ugc-activity';
import { UserGroup } from 'app/system/entity/user-group';
import { UgcActivityWork } from '../../entity/ugc-activity-work';
import { User } from '../../../system/entity/user';
import { UgcCourse } from '../../entity/ugc-course';
@Component({
    selector: 'spk-ugc-activity-work-form',
    templateUrl: './ugc-activity-work-form.component.html',
    styleUrls: ['./ugc-activity-work-form.component.scss']
})
export class UgcActivityWorkFormComponent implements OnInit {

    @Input() actionsViewRef: TemplateRef<any>;
    @Input() loading: boolean = false;
    @Input() ugcActivityWork: UgcActivityWork;
    @Output() save: EventEmitter<any> = new EventEmitter();
    @Output() cancel: EventEmitter<any> = new EventEmitter();
    @Input() activityId: number;
    @Input() editable: boolean = true;
    validateForm: FormGroup;
    leaderOption: any;
    selection: any = [];

    isVisible: boolean = false;


    constructor(private fb: FormBuilder) { }

    ngOnInit() {
        this.initForm();

    }


    private initForm() {
        this.initFormData();
        if (this.ugcActivityWork) {
            this.validateForm.patchValue(this.ugcActivityWork);
            this.getFormControl('name').setValue(this.ugcActivityWork.courseName ? this.ugcActivityWork.courseName : '');
            this.getFormControl('intro').setValue(this.ugcActivityWork.courseIntro ? this.ugcActivityWork.courseIntro : '');
            this.getFormControl('imageUrl').setValue(this.ugcActivityWork.courseImageUrl ? this.ugcActivityWork.courseImageUrl : '');
            if (this.ugcActivityWork.ownerUser) {
                this.getFormControl('owner').setValue(this.ugcActivityWork.ownerUser);
                this.persons([this.ugcActivityWork.ownerUser]);
            }

        }
    }

    initFormData() {
        let user: User;
        let m = this.ugcActivityWork || new UgcActivityWork();
        m.course = m.course || new UgcCourse();

        this.validateForm = this.fb.group({
            name: [m.course.name, [Validators.required]],
            imageUrl: [m.course.imageUrl],
            course: [m.course],
            category: [m.category, [this.categoryValidator]],
            owner: [m.ownerUser, [this.ownerValidator]],
            intro: [m.course.intro],
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

    categoryValidator = (control: FormControl): { [s: string]: boolean } => {
        if (!control.value) {
            return { required: true, error: true };
        }
    }



    ownerValidator = (control: FormControl): { [s: string]: boolean } => {
        if (!control.value || this.selection[0] == null) {
            return { required: true, error: true };
        }
    }

    handleCancel(e) {
        this.isVisible = false;
    }
    showPerson() {
        this.isVisible = true;
    }

    persons(arr) {
        this.selection = arr;
        if (this.selection[0] != null) {
            this.getFormControl('owner').setValue({
                user: this.selection[0]
            });
        }
        this.getFormControl('owner').markAsDirty();
        this.isVisible = false;
    }
    delPerson() {
        this.selection = [];
        this.getFormControl('owner').setValue({
            user: null
        });
        this.getFormControl('owner').markAsDirty();
    }


    _save(event) {
        this.markAsDirty();
        if (this.validateForm.invalid) {
            return;
        }
        let value = this.validateForm.value;
        if (this.ugcActivityWork && this.ugcActivityWork.id) {
            value.id = this.ugcActivityWork.id;
            value.course.id = this.ugcActivityWork.courseId ? this.ugcActivityWork.courseId : '';
            value.sourceType = this.ugcActivityWork.sourceType;
            value['owner.user'] = this.selection[0];
            value.newCourseName = this.validateForm.value.name;
            value.newCourseIntro = this.validateForm.value.intro;
            value.newCourseImageUrl = this.validateForm.value.imageUrl;
        }else {
            value.sourceType = 'ORIGINAL';
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
