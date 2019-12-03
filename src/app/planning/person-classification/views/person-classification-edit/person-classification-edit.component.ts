import { Component, OnInit, Input } from '@angular/core';
import { PersonClassification } from '../../entity/person-classification';
import { ActivatedRoute, Router } from '@angular/router';
import { PersonClassificationService } from 'app/planning/person-classification/service/person-classification.service';
import { CuiLayer } from 'console-ui-ng';

@Component({
  selector: 'spk-person-classification-edit',
  templateUrl: './person-classification-edit.component.html',
  styleUrls: ['./person-classification-edit.component.scss']
})
export class PersonClassificationEditComponent implements OnInit {

  personClassification: PersonClassification;
  err;

  constructor(
    private router: Router, 
    private route: ActivatedRoute, 
    private pcService: PersonClassificationService,
    private layer: CuiLayer
  ) { }

  ngOnInit() {
    this.route.data.subscribe((data: {personClassification: PersonClassification, activedGroup: PersonClassification}) => {
      this.personClassification = data.personClassification;
    });
  }

  onSubmit(personClassification: PersonClassification) {
    let id =  this.personClassification.id;
    if (!personClassification.parent && id == personClassification.parent.id ) {
      this.layer.msg("请勿选择自己");
    }else{
      this.pcService.update(personClassification).subscribe( 
          ug => {
            this.router.navigate(['../../'], {relativeTo: this.route});
          },
          err => this.err = err
        );
    }
  }

  
}
