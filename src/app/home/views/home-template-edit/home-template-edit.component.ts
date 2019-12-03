import { Component, OnInit, OnChanges, TemplateRef, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { HomeTemplateApiService } from '../../services/home-template-api.service';
import { Column, CuiLayer, CuiLayerRef } from 'console-ui-ng';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AbstractControl } from '@angular/forms';
import * as moment from 'moment';
import {
    FormBuilder,
    FormGroup,
    Validators,
    FormControl
} from '@angular/forms';
import { LayoutTemplate } from 'app/home/entity/layout-template';
import { tipMessage } from 'app/account/entity/message-tip';

@Component({
    selector: 'spk-home-template-edit',
    templateUrl: './home-template-edit.component.html',
    styleUrls: ['./home-template-edit.component.scss']
})
export class HomeTemplateEditComponent implements OnInit, OnChanges {

    dataForm: FormGroup;
    template: LayoutTemplate;
    saveLoading: boolean = false;
    @Input() templateId?: number;
    @Output() cancel = new EventEmitter();

    constructor(private templateService: HomeTemplateApiService,
        private dialog: CuiLayer,
        private fb: FormBuilder,
        private router: Router,
        private route: ActivatedRoute) { }

    ngOnInit() {
        this.template = new LayoutTemplate();
    }
    ngOnChanges() {
        this.initForm();
    }

    private initForm() {
        this.dataForm = this.fb.group({
            'name': ['', Validators.required]
        });
        if (this.templateId) { // 编辑状态
            this.templateService.getOne(this.templateId).subscribe(
                data => {
                    this.template.name = data.name;
                    this.dataForm.patchValue(this.template);
                }
            );
        }
    }

    onSubmit() {
        this.saveLoading = true;
        this.getFormData();
        if (this.template.name.trim().length > 0) {
            if (this.templateId) { // 编辑
                this.template.id = this.templateId;
                this.templateService.update(this.template).subscribe(
                    data => {
                        this.template = data;
                        this.onCancel();
                        this.saveLoading = false;
                    },
                    err => {
                        tipMessage("创建失败");
                        this.saveLoading = false;
                    }
                );
            } else { // 新增
                this.templateService.save(this.template).subscribe(
                    data => {
                        this.template = data;
                        this.onCancel();
                        this.saveLoading = false;
                    },
                    err => {
                        tipMessage("保存失败");
                        this.saveLoading = false;
                    }
                );
            }
        } else {
            tipMessage('模板名称不能为空');
            this.saveLoading = false;
        }


    }

    getFormData() {
        this.template.name = this.dataForm.value['name'];
    }
    cancelModal($event) {
        $event.preventDefault();
        this.onCancel();
    }
    onCancel() {
        this.cancel.emit();
    }
}
