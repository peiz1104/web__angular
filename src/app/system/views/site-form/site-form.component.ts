import { Site } from './../../entity/site';
import { Component, OnInit, EventEmitter, Output, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ValidatorFn, AbstractControl } from '@angular/forms';

@Component({
  selector: 'spk-site-form',
  templateUrl: './site-form.component.html',
  styleUrls: ['./site-form.component.scss']
})
export class SiteFormComponent implements OnInit, OnChanges {

  @Input() site: Site;
  @Input() loading: boolean;

  @Output() save: EventEmitter<any> = new EventEmitter();
  @Output() cancel: EventEmitter<any> = new EventEmitter();

  _form: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.initForm();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes['site'].isFirstChange()) {
      this.initForm();
    }
  }

  initForm() {
    let m = this.site || new Site();
    this._form = this.fb.group({
      name: [m.name, [Validators.required, Validators.maxLength(50)]],
      shortName: [m.shortName, [Validators.required, /* this._shortNameValidator(),  */Validators.maxLength(200)]],
      description: [m.description, Validators.maxLength(200)],
      /* domainName: [m.domainName, [Validators.required, Validators.maxLength(50)]], */
      logo: [m.logo],
      // hostName: []
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

    this.save.emit({ originalEvent: event, value: this._form.value });
  }

  _cancel(event) {
    if (this._form.dirty) {
      this._form.reset(this.site);
    }
    this.cancel.emit({ originalEvent: event });
  }

  onImageUpload(files) {
    if (files && files.length > 0) {
      this.getFormControl('logo').setValue(files[0].relativePath);
    }
  }

  private _shortNameValidator(): ValidatorFn {
    const nameExp = /^[0-9a-zA-Z_-]{1,}$/;
    return (control: AbstractControl): { [key: string]: any } => {
      const forbidden = !nameExp.test(control.value);
      return forbidden ? { 'forbiddenName': { value: control.value }, error: true } : null;
    };
  }
}
