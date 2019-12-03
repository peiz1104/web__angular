import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ApplicableObjects} from "../../entity/applicable-objects";
import {ActivatedRoute} from "@angular/router";
import {ApplicableObjectsService} from "../../service/applicable-objects.service";

@Component({
  selector: 'spk-applicable-objects-form',
  templateUrl: './applicable-objects-form.component.html',
  styleUrls: ['./applicable-objects-form.component.scss']
})
export class ApplicableObjectsFormComponent implements OnInit {
  @Input()  applicableObjects: ApplicableObjects;
  @Output() doSubmit: EventEmitter<any> = new EventEmitter();
  @Output() cancel: EventEmitter<any> = new EventEmitter();

  itemOption: any = [];
  selectedMultipleOption: any = [];

  constructor(private applicableObjectsService: ApplicableObjectsService, private route: ActivatedRoute) { }

  ngOnInit() {
  }
  onSubmit(event: Event) {
    console.log(this.applicableObjects);
    this.doSubmit.emit(this.applicableObjects);
  }

  doCancel(event) {
     this.cancel.emit({originalEvent: event});
  }
}
