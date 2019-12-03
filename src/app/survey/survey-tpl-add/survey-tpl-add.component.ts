import { Component, OnInit } from '@angular/core';
import { SurveyTplService } from '../survey-tpl.service';
import { NzMessageService } from 'ng-zorro-antd';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'spk-survey-tpl-add',
  templateUrl: './survey-tpl-add.component.html',
  styleUrls: ['./survey-tpl-add.component.scss']
})
export class SurveyTplAddComponent implements OnInit {

  isSubmitting: boolean = false;

  constructor(
    private surveyTplApi: SurveyTplService,
    private message: NzMessageService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
  }

  doSave(e) {
    let value = e.value;
    this.isSubmitting = true;
    this.surveyTplApi.create(value).subscribe(
      survey => {
        this.message.success('保存成功');
        if (e.toDetail) {
          this.toDetailPaper(survey);
        } else {
          this.toList();
        }
        this.isSubmitting = false;
      },
      err => {
        this.message.error(`保存失败，${err}`);
        this.isSubmitting = false;
      }
    );
  }

  doCancel(e) {
    this.toList();
  }

  toList() {
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  toDetail(survey) {
    this.router.navigate(['..', survey.id], {relativeTo: this.route});
  }

  toDetailPaper(survey) {
    this.router.navigate(['..', survey.id, 'paper'], {relativeTo: this.route});
  }
}
