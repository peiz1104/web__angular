import { Component, OnInit, TemplateRef, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { AssessPaper } from '../assessPaper.model';
import { Assess } from '../assess.model';
import { AssessService } from '../assess.service';
import { Column, CuiLayer, CuiLayerRef } from 'console-ui-ng';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AbstractControl } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd';
import {
    FormBuilder,
    FormGroup,
    Validators,
    FormControl
} from '@angular/forms';
import * as moment from 'moment';
import { QuestionsService } from '../../survey/questions/questions.service';
import { tipMessage } from 'app/account/entity/message-tip';

@Component({
    selector: 'spk-assess-edit',
    templateUrl: './assess-edit.component.html',
    styleUrls: ['./assess-edit.component.scss']
})
export class AssessEditComponent implements OnInit {

    @Input() outSide?: string = 'TEMPLATE';
    @Input() courseId?: number;
    @Input() teacherId?: number;
    @Input() assessId?: number;
    @Input() trainingId?: number;
    @Output() closeModal: EventEmitter<any> = new EventEmitter<any>();
    paperId: number;
    dataForm: FormGroup;
    assessPaper: AssessPaper;
    isLoading: boolean = false;

    _startDate = null;
    _endDate = null;
    assessType: string;

    constructor(private assessService: AssessService,
        private message: NzMessageService,
        private fb: FormBuilder,
        private router: Router,
        private route: ActivatedRoute) { }

    ngOnInit() {
        this.assessPaper = new AssessPaper();
        this.route.params.subscribe(
            (params: Params) => {
                this.assessId = this.assessId || params['id'] as number;
                if (this.assessId) {
                    this.assessService.get(this.assessId).subscribe(assess => {
                        this.assessPaper = assess;
                        this._initForm();
                    });
                } else {
                    this._initForm();
                }
            });
        this.route.queryParams.subscribe(
            ({ assessType, paperId }) => {
                this.assessType = assessType;
                this.assessService.assessType = assessType;
                this.paperId = this.paperId || paperId;
            });
    }

    _initForm() {
        let m = this.assessPaper || new AssessPaper();
        if (this.outSide != 'TEMPLATE') {
            this.dataForm = this.fb.group({
                id: [m.id],
	        name: [m.name, [Validators.required, Validators.maxLength(20)]],
	        description: [m.description, Validators.maxLength(200)],
                isAnonymous: [m.isAnonymous || 'REJECT'],
                startDate: [m.startDate, Validators.required],
                endDate: [m.endDate, Validators.required],
                imageUrl: [m.imageUrl],
                assessType: [],
            });
        } else {
            this.dataForm = this.fb.group({
                id: [m.id],
	        name: [m.name, [Validators.required, Validators.maxLength(20)]],
	        description: [m.description, Validators.maxLength(200)],
                isAnonymous: [m.isAnonymous || 'REJECT'],
                imageUrl: [m.imageUrl],
                assessType: [],
            });
        }
    }

    getFormControl(name) {
        return this.dataForm.controls[name];
    }

    markAsDirty() {
        for (let key of Object.keys(this.dataForm.controls)) {
            this.dataForm.controls[key].markAsDirty();
        }
    }

    onSubmit() {
        this.isLoading = true;
        this.dataForm.get('assessType').setValue(this.assessType);
        if (this.assessPaper.id) { // 编辑
            if (this.outSide != 'TEMPLATE') {
                this.dataForm.get('assessType').setValue('SELF_' + this.outSide);
            }
            this.assessService.edit(this.dataForm.value).subscribe(
                survey => {
                    tipMessage('修改成功', 'success');
                    if (this.outSide != 'TEMPLATE') {
                        this.closeModal.emit();
                    } else {
                        this.onCancel();
                    }
                    this.isLoading = false;
                },
                err => {
                    this.isLoading = false;
                }
            );
        } else {
            if (this.outSide != 'TEMPLATE') {
                this.dataForm.get('assessType').setValue(this.outSide);
        console.log(this.dataForm)
                this.assessService.trainAdd(this.trainingId, this.courseId, this.teacherId, this.dataForm.value).subscribe(
                    data => {
                        tipMessage('创建成功', 'success');
                        this.closeModal.emit();
                        this.isLoading = false;
                    },
                    err => {
                        this.isLoading = false;
                    }
                );
            } else {
                this.assessService.add(this.dataForm.value).subscribe(
                    data => {
                        tipMessage('创建成功', 'success');
                        if (this.outSide != 'TEMPLATE') {
                            this.closeModal.emit();
                        } else {
                            this.onCancel();
                        }
                        this.isLoading = false;
                    },
                    err => {
                        this.isLoading = false;
                    }
                );
            }
        }

    }

    onUploadComplete(result) {
        this.dataForm.get('imageUrl').setValue(result[0].relativePath);
    }
    onCancel() {
        this.router.navigate(['../'], { relativeTo: this.route, queryParams: { assessType: this.assessType } });
    }


    // 日期控件
    newArray = (len) => {
        const result = [];
        for (let i = 0; i < len; i++) {
            result.push(i);
        }
        return result;
    };
    _startValueChange = () => {
        if (this._startDate > this._endDate) {
            this._endDate = null;
        }
    };
    _endValueChange = () => {
        if (this._startDate > this._endDate) {
            this._startDate = null;
        }
    };
    _disabledStartDate = (startValue) => {
        if (!startValue || !this._endDate) {
            return false;
        }
        return startValue.getTime() >= this._endDate.getTime();
    };
    _disabledEndDate = (endValue) => {
        this._startDate = new Date(this._startDate)
        if (!endValue || !this._startDate) {
            return false;
        }
        return endValue.getTime() <= this._startDate.getTime();
    };
    get _isSameDay() {
        return this._startDate && this._endDate && moment(this._startDate).isSame(this._endDate, 'day')
    }
    get _endTime() {
        return {
            nzHideDisabledOptions: true,
            nzDisabledHours: () => {
                return this._isSameDay ? this.newArray(this._startDate.getHours()) : [];
            },
            nzDisabledMinutes: (h) => {
                if (this._isSameDay && h === this._startDate.getHours()) {
                    return this.newArray(this._startDate.getMinutes());
                }
                return [];
            },
            nzDisabledSeconds: (h, m) => {
                if (this._isSameDay && h === this._startDate.getHours() && m === this._startDate.getMinutes()) {
                    return this.newArray(this._startDate.getSeconds());
                }
                return [];
            }
        }
    }

}
