import { PersonClassificationService } from 'app/planning/person-classification/service/person-classification.service';
import { Component, OnInit, Input, forwardRef, ChangeDetectorRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { PersonClassification } from '../../entity/person-classification';
import { Observable } from 'rxjs/Observable';
import { CuiTreeConfig } from 'console-ui-ng';
import { CuiTreeNode } from 'console-ui-ng';

export const SELECT_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => PersonClassificationSelectComponent),
  multi: true
};


@Component({
  selector: 'spk-person-classification-select',
  templateUrl: './person-classification-select.component.html',
  styleUrls: ['./person-classification-select.component.scss'],
  providers: [SELECT_VALUE_ACCESSOR]
})
export class PersonClassificationSelectComponent implements OnInit, ControlValueAccessor {

  @Input() name: string = 'personClassification.id';
  
    config: CuiTreeConfig;
  
    value: any;
    onModelChange: Function = () => { };
    onModelTouched: Function = () => { };
  
    constructor(private pcService: PersonClassificationService, private cd: ChangeDetectorRef) {
    }
  
    ngOnInit() {
      this.config = {
        async: {
          enable: true,
          loadChildren: (node: CuiTreeNode): Observable<any> => {
            return this.pcService.groups(node.data.id);
          },
          dataFilter: (data, node: CuiTreeNode) => {
            return data;
          }
        },
        data: {
          key: {
            id: 'id',
            label: 'name',
            children: 'children'
          }
        }
      };
    }
  
    writeValue(value: any) {
      // reset fileter
  
      this.value = value;
      this.cd.markForCheck();
    }
  
    registerOnChange(fn: Function): void {
      this.onModelChange = fn;
    }
  
    registerOnTouched(fn: Function): void {
      this.onModelTouched = fn;
    }
  
    onChange(value) {
      this.onModelChange(value);
    }

}
