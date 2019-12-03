import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Role } from './../../entity/role';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'spk-role-form',
  templateUrl: './role-form.component.html',
  styleUrls: ['./role-form.component.scss']
})
export class RoleFormComponent implements OnInit {

  @Input() role: Role;
  @Input() loading: boolean;

  @Output() save: EventEmitter<any> = new EventEmitter();
  @Output() cancel: EventEmitter<any> = new EventEmitter();

  _form: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    let m = this.role || new Role();
    this._form = this.fb.group({
      id: [m.id],
      name: [m.name, Validators.required],
      privileges: [m.privileges, Validators.required]
    });
  }

  markAsDirty() {
    for (let key of Object.keys(this._form.controls)) {
      this._form.controls[key].markAsDirty();
    }
  }

  getFormControl(name) {
    return this._form.controls[name];
  }

  _save(event) {
    this.markAsDirty();

    if (this._form.invalid) {
      return;
    }

    this.save.emit({ originalEvent: event, value: this._form.value });
  }

  _cancel(event) {
    this.cancel.emit({ originalEvent: event });
  }

}
