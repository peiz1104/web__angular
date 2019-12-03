import { Teacher } from './../../entity/teacher';
import { CourseTeacherService } from './../../service/course-teacher.service';
import { CourseTeacherLookupComponent } from './../../public/course-teacher-lookup/course-teacher-lookup.component';
import { Router, ActivatedRoute } from '@angular/router';
import { Course } from './../../entity/course';
import { Component, OnInit } from '@angular/core';
import { NzModalService, NzMessageService } from 'ng-zorro-antd';
import { tipMessage } from 'app/account/entity/message-tip';

@Component({
  templateUrl: './course-teacher-list.component.html',
  styleUrls: ['./course-teacher-list.component.scss']
})
export class CourseTeacherListComponent implements OnInit {
  course: Course;
  teachers: Teacher[];

  constructor(private courseTeacherService: CourseTeacherService,
    private router: Router, private route: ActivatedRoute, private modalService: NzModalService,
    public message: NzMessageService) { }

  ngOnInit() {
    this.route.data.subscribe((data: {course: Course}) => {
      this.course = data.course;
      this.loadTeachers();
    });
  }

  loadTeachers() {
    this.courseTeacherService.list(this.course.id).subscribe(
      teachers => this.teachers = teachers,
      err => {
        tipMessage(`未知错误${err}`);
      }
    );
  }

  openLookup() {
    const subscription = this.modalService.open({
      title          : '选择讲师',
      content        : CourseTeacherLookupComponent,
      maskClosable: false,
      width: 960,
      zIndex: 500,
      onOk() {
      },
      onCancel() {
        // console.log('Click cancel');
      },
      footer         : false,
      componentParams: {
        course: this.course
      }
    });
    subscription.subscribe(result => {
      // console.log(result);
      if (typeof result == 'string') {
      } else if (typeof result == 'object') {
        if (result['event'] && result['event'] == 'onOk') {
          let selection = result['data'];
          if (selection && selection.length > 0) {
            this.courseTeacherService.add(this.course.id, selection.map(it => it.id)).subscribe(
              ok => {
                subscription.destroy('onOk');
                this.loadTeachers();
                tipMessage('添加课程讲师成功', 'success');
              },
              err => {
                tipMessage('添加课程讲师失败, 请重试');
              }
            );
          } else {
            tipMessage('请至少选择一名讲师', 'warning');
          }
        }
      } else {
      }
    });
  }

  confirmDelete(id) {
    this.courseTeacherService.delete(this.course.id, [id]).subscribe(
      ok => {
        tipMessage('删除成功', 'success');
        this.loadTeachers();
      },
      err => {
        tipMessage('删除失败，请重试');
      }
    );
  }
}
