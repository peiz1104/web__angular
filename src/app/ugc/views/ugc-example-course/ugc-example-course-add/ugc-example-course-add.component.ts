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
    selector: 'spk-ugc-example-course-add',
    templateUrl: './ugc-example-course-add.component.html',
    styleUrls: ['./ugc-example-course-add.component.scss']
})
export class  UgcExampleCourseAddComponent implements OnInit {


    ugcExampleCourse: UgcExampleCourse;
    loading: boolean = false;
    isCreate = true;
    isVisible: boolean = false;
    currentStep = 0;


    constructor(private ugcExampleCourseService: UgcExampleCourseService,
        private message: NzMessageService,
        private fb: FormBuilder,
        private router: Router,
        private route: ActivatedRoute) { }

    ngOnInit() {

    }



    prev() {
        this.currentStep--;
    }

    next() {
        this.currentStep++;
    }






    courrseFormSubmit(event) {
        this.loading = true;
        this.ugcExampleCourseService.saveOrUpdate(event.value).subscribe(
            ok => {
                tipMessage('保存成功', 'success');
                this.loading = false;
                this.ugcExampleCourse = ok;
                this.ugcExampleCourse.course = new UgcCourse();
                this.ugcExampleCourse.course.id = this.ugcExampleCourse.courseId;
                this.ugcExampleCourse.course.name = this.ugcExampleCourse.courseName;
                this.next();
            },
            err => {
                tipMessage(`保存失败:${err}`);
                this.loading = false;
            }
        );
    }
    workChapterSubmit(event) {
        this.next();
    }


    onOk(event) {
        this.toList();
    }


    onCancel(event) {
        this.toList();
    }

    toList() {

        this.router.navigate([ '../'], { relativeTo: this.route });
    }
}
