import { Router, ActivatedRoute, Params } from '@angular/router';
import { Component, OnInit, Input, Output } from '@angular/core';
import { UgcActivityWorkService } from './../../../../service/ugc-activity-work.service';
import { NzMessageService } from 'ng-zorro-antd';
import { FormDataUtil } from 'app/core';
import { UgcActivityWork } from '../../../../entity/ugc-activity-work';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { UgcActivityCategory } from '../../../../entity/ugc-activity-category';
import { User } from 'app/system/entity/user';
import { UgcCourse } from '../../../../entity/ugc-course';

@Component({
    selector: 'spk-ugc-activity-work-add',
    templateUrl: './ugc-activity-work-add.component.html',
    styleUrls: ['./ugc-activity-work-add.component.scss']
})
export class UgcActivityWorkAddComponent implements OnInit {


    ugcActivityWork: UgcActivityWork;
    activityId: number;
    isCreate = true;
    // @Output() closeModal: EventEmitter<any> = new EventEmitter<any>();
    loading: boolean = false;
    isVisible: boolean = false;
    selection: any = [];
    validateForm: FormGroup;
    thumbnail: string;
    isZipFile: boolean;
    currentStep = 0;

    constructor(private ugcActivityWorkService: UgcActivityWorkService,
        private message: NzMessageService,
        private fb: FormBuilder,
        private router: Router,
        private route: ActivatedRoute) { }

    ngOnInit() {
        this.ugcActivityWork = new UgcActivityWork();
        this.route.params.subscribe(
            (params: Params) => {
                this.activityId = params['activityId'] as number;
            });
    }



    prev() {
        this.currentStep--;
    }

    next() {
        this.currentStep++;
    }








    workFormSubmit(event) {
        this.loading = true;
        this.ugcActivityWorkService.saveOrUpdate(this.activityId, event.value).subscribe(
            ok => {
                this.message.success('保存成功');
                this.loading = false;
                this.ugcActivityWork = ok;
                this.ugcActivityWork.course = new UgcCourse();
                this.ugcActivityWork.course.id = this.ugcActivityWork.courseId;
                this.ugcActivityWork.course.name = this.ugcActivityWork.courseName;
                this.next();
            },
            err => {
                this.message.error(err);
                this.loading = false;
            }
        );
    }
    workChapterSubmit(event) {
        this.next();
    }

    onCancel(event) {
        this.toList();
    }
    onOk(event) {
        this.toList();
    }

    toList() {

        this.router.navigate([ '../'], { relativeTo: this.route });
    }

}
