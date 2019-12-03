import { Component, OnInit } from '@angular/core';
import { SubjectActivity } from '../../../entity/subject-activity';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'spk-subject-condition',
  templateUrl: './subject-condition.component.html',
  styleUrls: ['./subject-condition.component.scss']
})
export class SubjectConditionComponent implements OnInit {

  subject: SubjectActivity;

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe(({ subjectActivity }: { subjectActivity: SubjectActivity }) => {
      this.subject = subjectActivity;
    });
  }
}
