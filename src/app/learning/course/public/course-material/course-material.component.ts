import { Router } from '@angular/router';
import { CourseService } from './../../service/course.service';
import { Course } from './../../entity/course';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { tipMessage } from 'app/account/entity/message-tip';

@Component({
    selector: 'spk-course-material',
    templateUrl: './course-material.component.html',
    styleUrls: ['./course-material.component.scss']
})
export class CourseMaterialComponent implements OnInit {
    course: Course;
  	// 控制资料组件是否可以添加新的资料，引用方式不可以修改资料
  	editable: boolean;

    constructor(
        private route: ActivatedRoute,
    	private router: Router,
        private courseService: CourseService
    ) { }

    ngOnInit() {
        this.route.data.subscribe(({ course }: { course: Course }) => {
            this.course = course;
      	    this.editable = this.course.sourceType == 'COPIED';
        });
    }

    initGroup() {
        this.courseService.initMaterialGroup(this.course.id).subscribe(
            mgId => {
                this.course.materialGroupId = mgId
                tipMessage('初始化资料管理成功', 'success');
            },
            err => {
                tipMessage('初始化资料管理失败，请重试！', '', 3000);
            }
        );
    }

    preview(event) {
    	this.router.navigate(['/learning/course/', this.course.id , event, 'preview']);
    }
}
