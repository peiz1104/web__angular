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
    selector: 'spk-ugc-activity-work-edit',
    templateUrl: './ugc-activity-work-edit.component.html',
    styleUrls: ['./ugc-activity-work-edit.component.scss']
})
export class UgcActivityWorkEditComponent implements OnInit {


    ugcActivityWork: UgcActivityWork;
    ugcActivityWorkId: number;
    activityId: number;
    // @Output() closeModal: EventEmitter<any> = new EventEmitter<any>();
    loading: boolean = false;
    isVisible: boolean = false;
    selection: any = [];
    validateForm: FormGroup;
    thumbnail: string;
    isZipFile: boolean;
    editable: boolean = true;
    _courseTypes = [
        { value: 'EXAMPLE', label: '样课' },
        { value: 'TUTORIAL', label: '教程' }
    ];

    constructor(private ugcActivityWorkService: UgcActivityWorkService,
        private message: NzMessageService,
        private fb: FormBuilder,
        private router: Router,
        private route: ActivatedRoute) { }

    ngOnInit() {
        // this.ugcActivityWork = new UgcActivityWork();
        this.route.params.subscribe(
            (params: Params) => {
                this.ugcActivityWorkId =  params['id'] as number;
                this.activityId = params['activityId'] as number;
                // this.initForm();
            });
        this.route.data.subscribe((data: { work: UgcActivityWork }) => {
            this.ugcActivityWork = data.work;
            if (this.ugcActivityWork.sourceType == 'REFERENCED') {
                this.editable = false;
            }
        })
    }


    onSave(event) {
        this.loading = true;
        this.ugcActivityWorkService.saveOrUpdate(this.activityId, event.value).subscribe(
            ok => {
                this.message.success('保存成功');
                this.loading = false;
                this.ugcActivityWork = ok;
                this.ugcActivityWork.course = new UgcCourse();
                this.ugcActivityWork.course.id = this.ugcActivityWork.courseId;
                this.ugcActivityWork.course.name = this.ugcActivityWork.courseName;
                this.ugcActivityWork.course.intro = this.ugcActivityWork.courseIntro;
                this.router.navigate(['.'], { relativeTo: this.route, queryParams: { t: Math.random() } });
                // this.toList();
            },
            err => {
                this.message.error( err);
                this.loading = false;
            }
        );
    }

    onCancel(event) {
        this.toList();
    }

    toList() {

        this.router.navigate([this.ugcActivityWork.id ? '../../' : '../'], { relativeTo: this.route });
    }

}
