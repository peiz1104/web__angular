import { Component, OnInit, Input, Output, EventEmitter, Inject, forwardRef } from '@angular/core';
import { UgcActivityCategory } from './../../../../entity/ugc-activity-category';
import { UgcActivityCategoryService } from './../../../../service/ugc-activity-category.service';
import { NzMessageService } from 'ng-zorro-antd';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AbstractControl } from '@angular/forms';
import {
    FormBuilder,
    FormGroup,
    Validators,
    FormControl
} from '@angular/forms';
import { UgcActivityCategoryComponent } from '../ugc-activity-category.component';
import { tipMessage } from 'app/account/entity/message-tip';

@Component({
    selector: 'spk-ugc-activity-category-edit',
    templateUrl: './ugc-activity-category-edit.component.html',
    styleUrls: ['./ugc-activity-category-edit.component.scss']
})
export class UgcActivityCategoryEditComponent implements OnInit {

    validateForm: FormGroup;
    category: UgcActivityCategory;
    @Input() categoryId: number;
    @Input() activityId: number;
    @Input() parentId: number;
    @Input() outSide?: boolean;
    @Input() trainingId?: number;
    @Output() closeModal: EventEmitter<any> = new EventEmitter<any>();
    loading: boolean = false;
    singleValue: string = 'CATEGORY';


    categoryTypes = [
        { value: '', label: '全部' },
        { value: 'CATEGORY', label: '分类' },
        { value: 'SUBJECT', label: '主题' }
    ];
    constructor(private activityCategoryService: UgcActivityCategoryService,
        private message: NzMessageService,
        private fb: FormBuilder,
        private router: Router,
        private route: ActivatedRoute,
        @Inject(forwardRef(() => UgcActivityCategoryComponent)) private categoryGroupComponent: UgcActivityCategoryComponent
    ) { }

    ngOnInit() {
        this.category = new UgcActivityCategory();
        this.initFormData();
        this.route.params.subscribe(
            (params: Params) => {
                this.category.id = this.categoryId || params['id'] as number;
                this.activityId = params['activityId'] as number;
                this.parentId = params['parentId'] as number;
                this.initForm();
            });
    }

    private initForm() {
        // this.validateForm = this.fb.group({
        //     'title': ['', Validators.required],
        //     'content': ['', Validators.required],
        // });

        if (this.category.id) {
            this.activityCategoryService.get(this.activityId, this.category.id).subscribe(category => {
                this.category = category;
                this.singleValue = category.type;
                this.validateForm.patchValue(category);
            });
        }
    }

    initFormData() {
        let m = this.category || new UgcActivityCategory();
        this.validateForm = this.fb.group({
            name: [m.name, [Validators.required]],
            parent: [m.parent],
            description: [m.description],
            type: [m.type || 'CATEGORY', [Validators.required]],
            userUpperLimit: [m.userUpperLimit || 0],
            displayOrder: [m.displayOrder]
        });
    }



    getFormControl(name) {
        return this.validateForm.controls[name];
    }

    markAsDirty() {
        for (let name of Object.keys(this.validateForm.controls)) {
            this.validateForm.controls[name].markAsDirty();
        }
    }

    onSubmit() {
        this.markAsDirty();
        if (this.validateForm.invalid) {
            return;
        }
        let value = this.validateForm.value;
        this.loading = true;
        value.id = this.category.id;
        if (value.id) {
            this.activityCategoryService.edit(this.activityId, value).subscribe(
                cg => {
                    tipMessage('保存成功', 'success');
                    this.categoryGroupComponent.cateTree.refresh(cg);
                    this.onCancel();
                    this.loading = false;
                }
            );
        } else {
            if (this.parentId) {
                let parent = new UgcActivityCategory();
                parent.id = this.parentId;
                value.parent = parent;
            }
            this.activityCategoryService.add(this.activityId, value).subscribe(
                cg => {
                    tipMessage('保存成功', 'success');
                    this.categoryGroupComponent.cateTree.refresh(this.category.parent, false);
                    this.onCancel();
                    this.loading = false;
                }
            );
        }
    }
    onCancel() {
        // tslint:disable-next-line:max-line-length
        this.router.navigate([this.category.id ? '../../' : '../', 'list' , { activeCategoryId: this.category.parent ? this.category.parent.id : '' }], { relativeTo: this.route });
    }


}
