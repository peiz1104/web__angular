import { CategoryService } from './../../service/category.service';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { CuiTreeConfig, CuiTreeNode } from 'console-ui-ng';
import { Component, OnInit, Input, Output, ChangeDetectorRef, forwardRef, EventEmitter } from '@angular/core';

export const SELECT_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => CategorySelectComponent),
    multi: true
};
@Component({
    selector: 'spk-category-select',
    templateUrl: './category-select.component.html',
    styleUrls: ['./category-select.component.scss'],
    providers: [SELECT_VALUE_ACCESSOR]
})
export class CategorySelectComponent implements OnInit, ControlValueAccessor {

    @Input() name: string = 'category.id';
    // 未设置 identifier 时使用通用分类
    @Input() identifier: string = 'common';
    @Input() placeholder: string = '请选择分类';
    @Input() disabled: boolean = false;
    @Output() clickOk: EventEmitter<any> = new EventEmitter<any>();
    config: CuiTreeConfig;

    value: any;
    onModelChange: Function = () => { };
    onModelTouched: Function = () => { };

    constructor(private categoryService: CategoryService, private cd: ChangeDetectorRef) {
    }

    ngOnInit() {
        this.config = {
            async: {
                enable: true,
                loadChildren: (node: CuiTreeNode): Observable<any> => {
                    return this.categoryService.getAll({ parentId: node.data.id, identifier: this.identifier });
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
        this.clickOk.emit(value);
    }

    setDisabledState?(isDisabled: boolean): void {
        this.disabled = isDisabled;
    }
}
