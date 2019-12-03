import {
  Component,
  ViewEncapsulation,
  Input,
  ElementRef,
  forwardRef,
  ChangeDetectorRef,
  AfterContentInit,
  OnInit
} from '@angular/core';
import {
  ControlValueAccessor, NG_VALUE_ACCESSOR
} from '@angular/forms';
@Component({
  selector: 'spk-qm-datepicker',
  // encapsulation: ViewEncapsulation.None,
  templateUrl: './qm-datepicker.component.html',
  styleUrls: ['./qm-datepicker.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => QmDatepickerComponent),
      multi: true
    }
  ],
})
export class QmDatepickerComponent implements ControlValueAccessor, OnInit {
  @Input() nzShowTime: boolean = false;
  @Input() nzFormat: string = 'YYYY-MM-DD HH:mm:ss';
  @Input() nzPlaceHolder: string = '请输入时间';
  @Input() width: any;
  @Input() style: any;
  @Input() nzDisabledDate;
  private _disabled = false;
  private _onChange: () => void;
  onChange: any = Function.prototype;
  onTouched: any = Function.prototype;
  _el: HTMLElement;
  _value = null;
  constructor(private _elementRef: ElementRef, private _cdr: ChangeDetectorRef) {
    this._el = this._elementRef.nativeElement;
  }
  ngOnInit() {
  }
  // tslint:disable-next-line:use-life-cycle-interface
  ngAfterContentInit() {
    let dom = document.getElementsByClassName('ant-calendar-picker-input') || [];
    for (let i = 0; i < dom.length; i++) {
      dom[i].setAttribute('readonly', 'readonly');
    }
  }
  get value(): Date {
    return this._value;
  }
  set value(value: Date) {
    this._updateValue(value);
  }
  @Input()
  set nzDisabled(value: boolean) {
    this._disabled = value;
  }

  get nzDisabled(): boolean {
    return this._disabled;
  }
  writeValue(value: any): void {
    this._updateValue(value);
  }
  registerOnChange(fn: (_: any) => {}): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: () => {}): void {
    this.onTouched = fn;
  }
  setDisabledState(isDisabled: boolean): void {
    this.nzDisabled = isDisabled;
  }
  private _updateValue(value: any) {
    if (this._value === value) {
      return;
    }
    this._value = value;
  }
  changeValue($event) {
    this.onChange(this._value);
  }
}
