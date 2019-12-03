import { Component, OnInit, Input, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Teacher } from '../../entity/teacher';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { TeacherService } from '../../service/teacher.service';
import { CuiLayer } from 'console-ui-ng';
import { FormDataUtil } from '../../../core';

@Component({
  selector: 'spk-teacher-internal-edit',
  templateUrl: './teacher-internal-edit.component.html',
  styleUrls: ['./teacher-internal-edit.component.scss']
})
export class TeacherInternalEditComponent implements OnInit {

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
      teacher => this.teacher = teacher
    );
  }
  save(formTeacher: Teacher) {
    this.loading = true;
    let fd = FormDataUtil.covert(formTeacher);
    fd.append("id", '' + this.teacher.id);
    fd.append("teacherType", 'INTERNAL');
    this.teacherService.update(fd).subscribe(
      teacher => {
        this.loading = false;
        this.layer.msg('保存成功');
        this.router.navigate(['../../'], { relativeTo: this.route });
      },
      err => {
        this.loading = false;
      }
    );
  }
  onSubmit(f: NgForm) {
    this.save(f.value);
  }

    initDocument(file) {
      if (file) {
        let fileSize = file["fileSize"];
        let format = file["extention"].replace(".", "");
        let originFileName = file["originFileName"];
        let relativePath = file["relativePath"];
        let fileName = file["fileName"];
        let parentDirectoryPath = file["parentDirectoryPath"];
        let fullPath = file["fullPath"];
        this.teacher.url =  file["fullPath"];
        this.teacher.fileName = file["originFileName"];
      }
    }


}
