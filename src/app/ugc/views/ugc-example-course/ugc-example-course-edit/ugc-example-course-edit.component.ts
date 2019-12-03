import { Router, ActivatedRoute, Params } from '@angular/router';
import { Component, OnInit, Input, Output} from '@angular/core';
import { UgcExampleCourseService } from './../../../service/ugc-example-course.service';
import { NzMessageService } from 'ng-zorro-antd';
import { FormDataUtil } from 'app/core';
import { UgcExampleCourse } from '../../../entity/ugc-example-course';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { UgcCourse } from '../../../entity/ugc-course';
import { tipMessage } from 'app/account/entity/message-tip';

@Component({
    selector: 'spk-ugc-example-course-edit',
    templateUrl: './ugc-example-course-edit.component.html',
    styleUrls: ['./ugc-example-course-edit.component.scss']
})
export class  UgcExampleCourseEditComponent implements OnInit {


    ugcExampleCourse: UgcExampleCourse;
    @Input() ugcExampleCourseId: number;
    loading: boolean = false;
    editable: boolean = true;


    constructor(private ugcExampleCourseService: UgcExampleCourseService,
        private message: NzMessageService,
        private fb: FormBuilder,
        private router: Router,
        private route: ActivatedRoute) { }

    ngOnInit() {
        this.ugcExampleCourse = new UgcExampleCourse();
        this.route.data.subscribe((data: { ugcExampleCourse: UgcExampleCourse }) => {
            this.ugcExampleCourse = data.ugcExampleCourse;
        });
    }

    onSave(event) {
        this.loading = true;
        this.ugcExampleCourseService.saveOrUpdate(event.value).subscribe(
            ok => {
                tipMessage('保存成功', 'success');
                this.loading = false;
                this.ugcExampleCourse = ok;
                this.ugcExampleCourse.course = new UgcCourse();
                this.ugcExampleCourse.course.id = this.ugcExampleCourse.courseId;
                this.ugcExampleCourse.course.name = this.ugcExampleCourse.courseName;
                this.ugcExampleCourse.course.intro = this.ugcExampleCourse.courseIntro;
                this.router.navigate(['.'], { relativeTo: this.route, queryParams: { t: Math.random() } });
            },
            err => {
                tipMessage(`保存失败:${err}`);
                this.loading = false;
            }
        );
    }

    onCancel(event) {
        this.toList();
    }

    toList() {

        this.router.navigate([this.ugcExampleCourse.id ? '../../' : '../'], { relativeTo: this.route });
    }

}
