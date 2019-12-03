import { OfficeTeacher } from './../office-teacher/office-teacher-model';
import { Course } from 'app/learning/course/entity/course';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { NzModalService, NzMessageService } from 'ng-zorro-antd';
import { OfficeTeacherApiService } from 'app/training/service/office-teacher-api.service';
import { Teacher } from 'app/learning/course/entity/teacher';

@Component({
  selector: 'spk-office-teacher-detail',
  templateUrl: './office-teacher-detail.component.html',
  styleUrls: ['./office-teacher-detail.component.scss']
})
export class OfficeTeacherDetailComponent implements OnInit {

  courses: Course[];
  teacher: any
  columns;
  searchtext;
  loading: boolean = true;
  teacherId: number;
  tbcId: number;
  trainingName: string;

  constructor(private teacherService: OfficeTeacherApiService,
    private router: Router,
    private modal: NzModalService,
    private message: NzMessageService,
    private route: ActivatedRoute) {
    this.columns = [
      { title: '缩略图', tpl: 'col2-0' },
      { title: '名称/编码', tpl: 'col2-1' },
      { title: '类型/学时', tpl: 'col2-2' },
      { title: '组织/分类', tpl: 'col2-3' },
      { title: '操作', tpl: 'col2-4', styleClass: 'text-center' }
    ];
  }

  ngOnInit() {
    this.route.params.subscribe(
      obj => {
        this.teacherId = obj['id'];
        this.tbcId = obj['tbcId'];
      }
    );
    this.route.data.subscribe(
      (obj: { trainingClass: any }) => {
        this.trainingName = obj.trainingClass.name;
      }
    );
    console.log(this.tbcId)
    // 根据讲师的id查询讲师的详细信息
    this.teacherService.getTeacherInfo(this.teacherId).subscribe(
      data => {
        if (data) {
          this.teacher = data;
          this.getTeacher(this.teacher);
          this.loadData();
        }
      }
    );
  }

  loadData() {
    let params = {
      name: this.searchtext,
      id: this.tbcId
    };
    this.loading = true;
    this.teacherService.getAllCourses(this.teacherId, params).subscribe(
      pag => {
        console.log(pag)
        this.courses = pag;
        this.loading = false;
      }
    );
  }

  getTeacher(teacher) {
    if (!teacher.schoolName) {
      teacher.schoolName = '暂无';
    }
    if (!teacher.classHour) {
      teacher.classHour = '暂无';
    }
  }

  getCourseTypeText(key) {
    let texts = { 'ONLINE': '在线学习', 'LIVE': '直播课堂', 'OFFLINE': '面授课程' };
    return texts[key] || '';
  }
}
