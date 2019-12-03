import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import { NzMessageService } from 'ng-zorro-antd';
import { CuiPagination } from 'console-ui-ng';
import {
    FormBuilder,
    FormGroup,
    FormControl,
    Validators
} from '@angular/forms';
import { BasicSettingService } from 'app/exam/service/basic-setting.service';
import { Observable } from 'rxjs/Observable';

@Component({
    selector: 'spk-question-type-add',
    templateUrl: './question-type-add.component.html',
    styleUrls: ['./question-type-add.component.scss']
})
export class QuestionTypeAddComponent implements OnInit {
    isEdit: boolean = false;
    editObj: any;
    typeSelect = []
    validateForm: FormGroup;
    editId: any;
    isSpinning: boolean = false;
    isLoading: boolean = false;
    typeName: any;
    typeCode: any;
    radioValue: boolean = true;
    inputNum: number = 0;
    constructor(
        private route: Router,
        private routInfo: ActivatedRoute,
        private fb: FormBuilder,
        private basicSettingService: BasicSettingService,
        private nzMessageService: NzMessageService) {
    };
    ngOnInit() {
        this.getQestionTypeAll();
        this.editId = this.routInfo.snapshot.paramMap.get('id'); // 获取路由跳转得来的参数
        if (this.editId) {
            this.isSpinning = true;
        }
        this.isEdit = !!this.editId;
        // tslint:disable-next-line:no-unused-expression
        this.editId && this.routInfo.paramMap
            .switchMap((params: ParamMap) => this.basicSettingService.getOneQuestionTpye({ id: this.editId })).subscribe(data => {
                this.editObj = data;
                this.validateForm.setValue({
                    typeName: this.editObj.typeName,
                    typeCode: this.editObj.typeCode,
                    typeDesc: this.editObj.typeDesc,
                    isStart: this.editObj.isStart,
                    baseCode: this.editObj.baseCode,
                })
                // tslint:disable-next-line:forin
                for (const key in this.validateForm.controls) {
                    this.validateForm.controls[key].markAsDirty();
                }
                this.isSpinning = false;
            })
        let groupData = {
            typeName: [null, [Validators.required], this.typeNameAsyncValidator],
            typeCode: [null, [this.typeCodeValidator]],
            typeDesc: [null],
            isStart: [null, [Validators.required]],
            baseCode: [null, [Validators.required]],
        }
        // if (this.editId) {
        //     delete groupData.typeCode;
        //     delete groupData.baseCode;
        // }
        this.validateForm = this.fb.group(groupData);
    }
    getQestionTypeAll() {
        this.basicSettingService.getTypeSelectOption().subscribe(data => {
            this.typeSelect = data;
        })
    }
    validateConfirmType() {
        setTimeout(_ => {
            // tslint:disable-next-line:no-unused-expression
            this.validateForm.controls['typeCode'] && this.validateForm.controls['typeCode'].updateValueAndValidity();
        })
    }
    typeNameAsyncValidator = (control: FormControl): any => {
        return Observable.create(function (observer) {
            if (control.value.trim() == '') {
                observer.next({ error: true, duplicated: true });
            } else {
                observer.next(null);
            }
            observer.complete();
        });
    };
    typeCodeValidator = (control: FormControl): { [s: string]: boolean } => {
        const CODE_REGEXP = /^[A-Z]+$/;
        if (!control.value) {
            return { required: true }
        } else if (!CODE_REGEXP.test(control.value)) {
            return { error: true, capital: true };
        } else if (control.value == this.validateForm.controls['typeName'].value) {
            return { agreement: true, error: true };
        }
    };
    typeNameBlur(value) {
        let params = {
            typeName: value
        }
        // tslint:disable-next-line:no-unused-expression
        value && this.basicSettingService.isExsitTypeName(params).subscribe(data => {
            return {}
        }, error => {
            const typeName = this.validateForm.controls['typeName'];
            if (this.editId && this.editObj.typeName == this.validateForm.controls['typeName'].value) {
                return {};
            } else {
                typeName.setErrors({
                    "notUnique": true,
                    error: true
                })
            }
        })
    }
    typeCodeBlur(value) {
        let params = {
            typeCode: value
        }
        // tslint:disable-next-line:no-unused-expression
        value && this.basicSettingService.isExsitTypeCode(params).subscribe(data => {
            return {}
        }, error => {
            const typeCode = this.validateForm.controls['typeCode']
            typeCode.setErrors({
                "notUnique": true,
                error: true
            })
        })
    }
    // 实时验证多次请求API，上面typeNameBlur是愚蠢的写法，下面这个如何改成失焦再验证
    // typeNameAsyncValidator = (control: FormControl): any => {
    //     console.log(this.validateForm.controls['typeCode'])
    //     let params = {
    //         typeName: control.value
    //     }
    //     return Observable.create(function (observer) {
    //         this.basicSettingService.isExsitTypeName(params).subscribe(data => {
    //             observer.next(null);
    //             observer.complete();
    //         }, error => {
    //             observer.next({ error: true, notUnique: true });
    //             observer.complete();
    //         })
    //     }.bind(this));
    // };
    submitForm = ($event, value) => {
        this.isLoading = true
        $event.preventDefault();
        // tslint:disable-next-line:forin
        for (const key in this.validateForm.controls) {
            this.validateForm.controls[key].markAsDirty();
        }
        if (this.validateForm.valid) {
            let params = {
                ...this.validateForm.value
            };
            if (this.editObj) {
                params = {
                    ...params,
                    id: this.editId,
                    isEdit: this.isEdit
                };
            } else {
                params = {
                    ...params,
                };
            }
            this.basicSettingService.changeQuestionType(params).subscribe(
                data => {
                    this.nzMessageService.success('操作成功!');
                    this.isLoading = false;
                    this.reset($event);
                },
                error => {
                    this.nzMessageService.error(error);
                    this.isLoading = false
                }
            );
        }
    };
    reset($event) {
        $event.preventDefault();
        this.route.navigate([`/exam/basic-setting/set`, { tabIndex: 0 }])
    }
    resetForm($event: MouseEvent) {
        $event.preventDefault();
        this.validateForm.reset();
        // tslint:disable-next-line:forin
        for (const key in this.validateForm.controls) {
            this.validateForm.controls[key].markAsPristine();
        }
    }
    descInput = ($event) => {
        this.inputNum = $event.length;
    }
}
