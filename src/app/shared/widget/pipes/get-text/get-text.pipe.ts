import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'getText'
})
export class GetTextPipe implements PipeTransform {

  constructor(
  ) { }
  transform(value: any, args?: any): any {
    value = value || '';
    let reg = /<[^<>]+>/g;
    let reg2 = /&[\w]+;/g;
    let newValue = value.replace(reg, '');
    newValue = newValue.replace(reg2, '');
    return newValue;
  }

}
