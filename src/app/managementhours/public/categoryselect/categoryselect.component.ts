import { Component, OnInit, Input, ChangeDetectorRef, forwardRef } from '@angular/core';
import { HourService } from '../../managementservice/hour.service';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { CuiTreeConfig, CuiTreeNode } from 'console-ui-ng';
import { Placeholder } from '@angular/compiler/src/i18n/i18n_ast';

export const SELECT_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => CategoryselectComponent),
    multi: true
};

@Component({
    selector: 'spk-categoryselect',
    templateUrl: './categoryselect.component.html',
    styleUrls: ['./categoryselect.component.scss'],
    providers: [SELECT_VALUE_ACCESSOR]
})
export class CategoryselectComponent implements OnInit, ControlValueAccessor {
    @Input() formControlName: string = 'category.id';
    @Input() identifier: string;
    @Input() placeholder: string;
    @Input() api: any;
    @Input() filterId: any;

    config: CuiTreeConfig;

    value: any;
    onModelChange: Function = () => { };
    onModelTouched: Function = () => { };
    constructor(
        private cd: ChangeDetectorRef,
        private hourservice: HourService
    ) { }

    ngOnInit() {
        // console.log(this.api)
        this.config = {
            async: {
                enable: true,
                loadChildren: (node: CuiTreeNode): Observable<any> => {
                    let params = {
                        parentId: node.data.id
                    }
                    if (this.filterId) {
                        params['filterId'] = this.filterId
                    }
                    return this.hourservice.getSelectChoose(this.api, params);
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
