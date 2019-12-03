import { Condition } from './../../../../learning/offering/entity/condition';
import { SubjectActivity } from '../../../../subject/entity/subject-activity';
import { SubjectActivityApiService } from '../../../service/subject-activity-api.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { CuiLayer, Message } from 'console-ui-ng';
import { NzMessageService } from 'ng-zorro-antd';
import { tipMessage } from 'app/account/entity/message-tip';

@Component({
  selector: 'spk-subject-activity-edit',
  templateUrl: './subject-activity-edit.component.html',
  styleUrls: ['./subject-activity-edit.component.scss']
})
export class SubjectActivityEditComponent implements OnInit {

  subjectInfo: SubjectActivity;
  condition: Condition;
  loading: boolean = false;

  constructor(
    private subjectService: SubjectActivityApiService,
    private router: Router,
    private route: ActivatedRoute,
    private message: NzMessageService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        let subjectId = +params['subjectId'];
        this.subjectService.getOne(subjectId).subscribe(
          subjectInfo => {
            this.subjectInfo = subjectInfo;
            this.condition = this.subjectInfo.requiredCondition;
          }
        );
      }
    );
  }

  onSubmit(originalEvent) {
    this.loading = true;
    this.subjectService.update(originalEvent.value).subscribe(
      subject => {
        this.loading = false;
        tipMessage('保存成功', 'success');
      },
      err => {
        this.loading = false;
        tipMessage(err);
      }
    );
  }

}
