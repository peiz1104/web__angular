import { UgcActivityCategoryService } from './../../service/ugc-activity-category.service';
import { UgcActivityCategory } from './../../entity/ugc-activity-category';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { CuiTreeConfig, CuiTreeNode } from 'console-ui-ng';
import { Component, OnInit, Input, ChangeDetectorRef, forwardRef } from '@angular/core';

export const SELECT_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => UgcActivityCategorySelectComponent),
    multi: true
};
@Component({
    selector: 'spk-ugc-activity-category-select',
    templateUrl: './ugc-activity-category-select.component.html',
    styleUrls: ['./ugc-activity-category-select.component.scss'],
    providers: [SELECT_VALUE_ACCESSOR]
})
export class  UgcActivityCategorySelectComponent implements OnInit, ControlValueAccessor {

    @Input() name: string = 'category.id';
    @Input() activityId: number;
    @Input() placeholder: string = '请选择分类';

    config: CuiTreeConfig;

    value: any;
    onModelChange: Function = () => { };
    onModelTouched: Function = () => { };

    constructor(private categoryService: UgcActivityCategoryService, private cd: ChangeDetectorRef) {
    }

    ngOnInit() {
        this.config = {
            async: {
                enable: true,
                loadChildren: (node: CuiTreeNode): Observable<any> => {
                    // return this.categoryService.getAll({ parentId: node.data.id, identifier: this.identifier });
                    return this.categoryService.getAllOfPage(this.activityId, { parentId: node.data.id });
                },
                dataFilter: (data, node: CuiTreeNode) => {
                    if (!node.parent && node.data.virtual) {
                        if (data && data.length > 0) {
                            // data[0]['selected'] = true;
                            // data[0]['expanded'] = true;
                            // TODO: acitve value with path
                        }
                    }
                     data.forEach(it => {
                        if (it.type == 'SUBJECT') {
                            it.icon = 'fa-file text-primary';
                        }
                    });
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
