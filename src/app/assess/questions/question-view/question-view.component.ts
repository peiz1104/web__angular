import { AssessService } from './../../assess.service';
import { Component, OnInit, Input } from '@angular/core';
import { QuestionBase } from '../base-question.model';

@Component({
  selector: 'spk-question-view',
  templateUrl: './question-view.component.html',
  styleUrls: ['./question-view.component.scss']
})
export class QuestionViewComponent implements OnInit {

  @Input() questions: any;
  @Input() assessId: number;
  paperInfo: any;

  constructor(
    private assessService: AssessService
  ) { }

  ngOnInit() {
    // 请求问题列表
    this.assessService.get(this.assessId)
      .subscribe(data => {
        this.paperInfo = data;
      });
  }
}
