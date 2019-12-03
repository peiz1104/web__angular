import { Component, OnInit } from '@angular/core';
import { PersonClassification } from '../../entity/person-classification';
import { Router, ActivatedRoute } from '@angular/router';
import { PersonClassificationService } from 'app/planning/person-classification/service/person-classification.service';

@Component({
  selector: 'spk-person-classification-add',
  templateUrl: './person-classification-add.component.html',
  styleUrls: ['./person-classification-add.component.scss']
})
export class PersonClassificationAddComponent implements OnInit {

  personClassification: PersonClassification = new PersonClassification();
  err;

  constructor(
    private pcService: PersonClassificationService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.data.subscribe(
      (data: {activedGroup: PersonClassification}) => {
        this.personClassification.parent = data.activedGroup;
      }
    );
  }

  onSubmit(personClassification: PersonClassification) {
    this.pcService.add(personClassification).subscribe(
      ug => {
        this.router.navigate(['../'], {relativeTo: this.route});
      },
      err => this.err = err
    );
  }

}
