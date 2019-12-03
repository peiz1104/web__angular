import { Component, OnInit } from '@angular/core';
import { Teacher } from '../../entity/teacher';
import { Router, ActivatedRoute } from '@angular/router';
import { TeacherService } from '../../service/teacher.service';
import { CuiLayer } from 'console-ui-ng';

@Component({
  selector: 'spk-teacher-extend-add',
  templateUrl: './teacher-extend-add.component.html',
  styleUrls: ['./teacher-extend-add.component.scss']
})
export class TeacherExtendAddComponent implements OnInit {

  err;
  loading: boolean = false;
  constructor(private teacherService: TeacherService,
    private dialog: CuiLayer,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
  }


  save(formTeacher: Teacher) {
    this.loading = true;
    this.teacherService.add(formTeacher).subscribe(
      teacher => {
        this.dialog.msg('保存成功');
        this.loading = false;
        this.router.navigate(['../'], { relativeTo: this.route });
      },
      err => {
        this.loading = false;
        this.err = err;
      }
    );
  }

  onSubmit(teacher) {
    this.save(teacher);
  }

}
