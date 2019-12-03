import { NewsGroupApiService } from './../../service/news-group-api.service';
import { NewsGroup } from './../../entity/news-group';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Component, OnInit, forwardRef, Input, Output } from '@angular/core';

@Component({
  selector: 'spk-news-group-select',
  templateUrl: './news-group-select.component.html',
  styleUrls: ['./news-group-select.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NewsGroupSelectComponent),
      multi: true
    }
  ]
})
export class NewsGroupSelectComponent implements OnInit, ControlValueAccessor {

  @Input() disabled: boolean;

  @Output() onChange: any = Function.prototype;
  @Output() onTouched: any = Function.prototype;

  _value: number;

  groups: NewsGroup[];

  constructor(private groupApi: NewsGroupApiService) { }

  ngOnInit() {
    this.groupApi.getAll().subscribe(
      groups => {
        this.groups = groups;
      }
    );
  }

  writeValue(value: any): void {
    this._value = +value;
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

}
