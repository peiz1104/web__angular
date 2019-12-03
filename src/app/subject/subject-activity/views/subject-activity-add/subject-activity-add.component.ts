import { SubjectActivityApiService } from '../../../service/subject-activity-api.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CuiLayer, Message } from 'console-ui-ng';
import { NzMessageService } from 'ng-zorro-antd';
import { tipMessage } from 'app/account/entity/message-tip';


@Component({
  selector: 'spk-subject-activity-add',
  templateUrl: './subject-activity-add.component.html',
  styleUrls: ['./subject-activity-add.component.scss']
})
export class SubjectActivityAddComponent implements OnInit {

  err;
  loading: boolean = false;

  constructor(
    private subjectService: SubjectActivityApiService,
    private router: Router,
    private route: ActivatedRoute,
    private message: NzMessageService
  ) { }

  ngOnInit() {
  }

  onSubmit(originalEvent) {
    this.loading = true;
    if (originalEvent.value.innerOuter) {
      originalEvent.value.innerOuter = 'OUTER';
    } else {
      originalEvent.value.innerOuter = 'INNER';
    }
    this.subjectService.create(originalEvent.value).subscribe(
      subject => {
        this.loading = false;
        tipMessage('保存成功', 'success');
        this.onCancel();
      },
      err => {
        this.loading = false;
        tipMessage(err);
      }
    );
  }

  onCancel() {
    this.toList();
  }

  toList() {
    this.router.navigate(['../list'], { relativeTo: this.route });
  }
}
