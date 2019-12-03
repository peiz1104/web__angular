import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { TrainClassAttendance } from '../../../entity/train_class_attendance';
import { NgForm } from '@angular/forms';
import { FormDataUtil } from '../../../../core/utils/form-data-util';
import { Location } from '@angular/common';

@Component({
  selector: 'spk-training-class-attendance-form',
  templateUrl: './training-class-attendance-form.component.html',
  styleUrls: ['./training-class-attendance-form.component.scss']
})
export class TrainingClassAttendanceFormComponent implements OnInit {

  @Input() trainClassAttendance: TrainClassAttendance;
  @Output() doSubmit = new EventEmitter();

  constructor(private location: Location) { }

  ngOnInit() {
  }

  onSubmit(f: NgForm) {
    let fd = FormDataUtil.covert(this.trainClassAttendance);
    this.doSubmit.emit(this.trainClassAttendance);
  }

  doCancel(event) {
    this.location.back();
  }

}
