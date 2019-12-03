import { Component, OnInit } from '@angular/core';
import { Teacher } from '../../entity/teacher';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { TeacherService } from '../../service/teacher.service';
import { CuiLayer } from 'console-ui-ng';
import { FormDataUtil } from '../../../core';

@Component({
  selector: 'spk-teacher-extend-edit',
  templateUrl: './teacher-extend-edit.component.html',
  styleUrls: ['./teacher-extend-edit.component.scss']
})
export class TeacherExtendEditComponent implements OnInit {

  teacher: Teacher;
  loading: boolean = false;
  constructor(
    private teacherService: TeacherService,
    private router: Router,
    private route: ActivatedRoute,
    private layer: CuiLayer
  ) { }


  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        let teacherId = +params['id'];
        this.loadData(teacherId);
      }
    );
  }
  loadData(teacherId) {
    this.teacherService.get(teacherId).subscribe(
      teacher => {
        this.teacher = teacher;
      }
    );
  }
  save(formTeacher: Teacher) {
    this.loading = true;
    let fd = FormDataUtil.covert(formTeacher);
    fd.append("id", '' + this.teacher.id);
    this.teacherService.update(fd).subscribe(
      teacher => {
        this.layer.msg('保存成功');
        this.loading = false;
        this.router.navigate(['../../'], { relativeTo: this.route });
      },
      err => {
        this.loading = false;
      }
    );
  }
  onSubmit(teacher) {
    this.save(teacher);
  }

}
