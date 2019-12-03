import { Component, OnInit } from '@angular/core';
import { TeacherService } from '../../service/teacher.service';
import { Teacher } from '../../entity/teacher';
import { Router, ActivatedRoute } from '@angular/router';
import { CuiLayer } from 'console-ui-ng';
import { NzMessageService } from 'ng-zorro-antd';
import { tipMessage } from 'app/account/entity/message-tip';

@Component({
  selector: 'spk-teacher-internal-add',
  templateUrl: './teacher-internal-add.component.html',
  styleUrls: ['./teacher-internal-add.component.scss']
})
export class TeacherInternalAddComponent implements OnInit {

  teacher: Teacher;
  err;
  loading: boolean = false;
  constructor(private teacherService: TeacherService,
    private message: NzMessageService,
    private router: Router,
    private route: ActivatedRoute
  ) { }
  ngOnInit() {
    this.teacher = new Teacher();
  }
  doSubmit(event) {
    this.loading = true;
    this.teacherService.add(event.value).subscribe(
      ok => {
        this.loading = false;
        tipMessage('保存成功', 'success');
        this.router.navigate(['../'], { relativeTo: this.route });
      },
      err => {
        this.loading = false;
        tipMessage('保存失败');
      }
    );
  }

}
