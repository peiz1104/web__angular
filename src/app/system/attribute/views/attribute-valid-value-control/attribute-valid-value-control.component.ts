import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Component, OnInit, forwardRef } from '@angular/core';

@Component({
  selector: 'spk-attribute-valid-value-control',
  templateUrl: './attribute-valid-value-control.component.html',
  styleUrls: ['./attribute-valid-value-control.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => AttributeValidValueControlComponent),
    multi: true
  }]
})
export class AttributeValidValueControlComponent implements OnInit, ControlValueAccessor {

  _value;
  onChange: any = Function.prototype;
  onTouched: any = Function.prototype;
  isDisabled: boolean;

  constructor() { }

  ngOnInit() {
  }

  writeValue(value: any): void {
    this._value = value;
    this.checkValue();
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  checkValue() {
    if (!this._value || this._value.length == 0) {
      this._value = [];
      for (let i = 0; i < 3; i++) {
        this._value = this._value ? [...this._value, {}] : [{}];
      }
    }
  }

  valueChange() {
    let value = this._value.filter(it => it.value && it.label);
    this.onChange(value);
  }
}
