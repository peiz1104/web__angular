import {ChangeDetectorRef, Component, forwardRef, Input, OnInit} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";
import {CuiTreeConfig, CuiTreeNode} from "console-ui-ng";
import {ProgramManagementService} from "../../service/program-management.service";
import {Observable} from "rxjs/Observable";
export const SELECT_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => ProgramManagementSelectComponent),
  multi: true
};
@Component({
  selector: 'spk-program-management-select',
  templateUrl: './program-management-select.component.html',
  styleUrls: ['./program-management-select.component.scss'],
  providers: [SELECT_VALUE_ACCESSOR]
})
export class ProgramManagementSelectComponent implements OnInit, ControlValueAccessor {
  @Input() name: string = 'programManagement.id';
  @Input() identifier: string;

  config: CuiTreeConfig;

  value: any;
  onModelChange: Function = () => { };
  onModelTouched: Function = () => { };

  constructor(private cd: ChangeDetectorRef, private programManagementService: ProgramManagementService) { }

  ngOnInit() {
    this.config = {
      async: {
        enable: true,
        loadChildren: (node: CuiTreeNode): Observable<any> => {
          return this.programManagementService.getAll({parentId: node.data.id, identifier: this.identifier});
        },
        dataFilter: (data, node: CuiTreeNode) => {
          if (!node.parent && node.data.virtual) {
            if (data && data.length > 0) {
              // data[0]['selected'] = true;
              // data[0]['expanded'] = true;
              // TODO: acitve value with path
            }
          }
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
