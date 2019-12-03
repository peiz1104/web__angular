import { Component, OnInit } from '@angular/core';
import { Survey } from '../survey.model';
import { ActivatedRoute, Router } from '@angular/router';
import { SurveyTplService } from '../survey-tpl.service';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'spk-survey-tpl-edit',
  templateUrl: './survey-tpl-edit.component.html',
  styleUrls: ['./survey-tpl-edit.component.scss']
})
export class SurveyTplEditComponent implements OnInit {

  survey: Survey;
  isSubmitting: boolean = false;

  constructor(
    private surveyTplApi: SurveyTplService,
    private message: NzMessageService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.route.data.subscribe(({survey}: {survey: Survey}) => {
      this.survey = survey;
    });
  }

  doSave(e) {
    let value = e.value;
    value['id'] = this.survey.id;
    this.isSubmitting = true;
    this.surveyTplApi.update(value).subscribe(
      survey => {
        this.message.success('保存成功');
        this.isSubmitting = false;
      },
      err => {
        this.message.error(`保存失败，${err}`);
        this.isSubmitting = false;
      }
    );
  }

}
