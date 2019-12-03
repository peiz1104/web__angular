import { Component, OnInit, EventEmitter, Output, Input, ViewChild, ElementRef } from '@angular/core';
import { PointsMall } from '../../entity/points-mall';
import { NgForm, FormBuilder, Validators } from '@angular/forms';
import { FormDataUtil } from '../../../core';
import { FormGroup } from '@angular/forms/src/model';

@Component({
  selector: 'spk-mall-add-form',
  templateUrl: './mall-add-form.component.html',
  styleUrls: ['./mall-add-form.component.scss']
})
export class MallAddFormComponent implements OnInit {
  @Input() user: PointsMall;
  @Input() isCreate: boolean;

  @Output() save: EventEmitter<any> = new EventEmitter();
  @Output() cancel: EventEmitter<any> = new EventEmitter();

  confirmPassword: string = "";

  _form: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    let m = this.user || new PointsMall();
    this._form = this.fb.group({
      name:[m.name],
      userGroup: [m.userGroup],
      startDate: [m.startDate],
      endDate: [m.endDate]
     
    });
  }

  getFormControl(name) {
    return this._form.controls[name];
  }

  markAsDirty() {
    for (let key of Object.keys(this._form.controls)) {
      this._form.controls[key].markAsDirty();
    }
  }

  _save(event) {
    this.markAsDirty();

    if (this._form.invalid) {
      return;
    }
    console.log(this._form.value);
    this.save.emit({ originalEvent: event, value: this._form.value });
  }

  _cancel(event) {
    this.cancel.emit({ originalEvent: event });
  }
}
