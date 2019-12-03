import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'spk-exam-condition',
  templateUrl: './exam-condition.component.html',
  styleUrls: ['./exam-condition.component.scss']
})
export class ExamConditionComponent implements OnInit {

  lrnExam: any; // LrnExam extends Offering

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe((data: {examination: any}) => {
      this.lrnExam = data.examination;
    });
  }

}
