import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PersonClassification } from '../../entity/person-classification';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'spk-person-classification-from',
  templateUrl: './person-classification-from.component.html',
  styleUrls: ['./person-classification-from.component.scss']
})
export class PersonClassificationFromComponent implements OnInit {

  @Input() personClassification: PersonClassification;
  @Input() isCreate: boolean;

  @Output() doSubmit = new EventEmitter();

 

  constructor() { }

  ngOnInit() {

  }

  onSubmit() {  
    if (this.personClassification &&  this.personClassification.name) {
      this.doSubmit.emit(this.personClassification);
    }
  }
}
