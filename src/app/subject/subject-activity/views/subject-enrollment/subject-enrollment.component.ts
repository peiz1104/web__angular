import { SubjectActivity } from 'app/subject/entity/subject-activity';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'spk-subject-enrollment',
  templateUrl: './subject-enrollment.component.html',
  styleUrls: ['./subject-enrollment.component.scss']
})
export class SubjectEnrollmentComponent implements OnInit {

  subject: SubjectActivity;

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe(({ subjectActivity }: { subjectActivity: SubjectActivity }) => {
      this.subject = subjectActivity;
    });
  }

}
