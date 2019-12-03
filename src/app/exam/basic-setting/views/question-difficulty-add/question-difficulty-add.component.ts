import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
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
import { Location } from '@angular/common';
import { BasicSettingService } from 'app/exam/service/basic-setting.service';
import { Observable } from 'rxjs/Observable';

@Component({
    selector: 'spk-question-difficulty-add',
    templateUrl: './question-difficulty-add.component.html',
    styleUrls: ['./question-difficulty-add.component.scss']
})
export class QuestionDifficultyAddComponent implements OnInit {
    @Input() tabIndex;
    isEdit: boolean = false;
    editObj: any;
    validateForm: FormGroup;
    editId: any;
    isSpinning: boolean = false;
    isLoading: boolean = false;
    diffName: any;
    inputNum: number = 0;
    constructor(
        private route: Router,
        private routInfo: ActivatedRoute,
        private fb: FormBuilder,
        private basicSettingService: BasicSettingService,
        private nzMessageService: NzMessageService,
        private location: Location) { }


    ngOnInit() {
        this.editId = this.routInfo.snapshot.paramMap.get('id'); // 获取路由跳转得来的参数
        if (this.editId) {
            this.isSpinning = true;
        }
        this.isEdit = !!this.editId;
        // tslint:disable-next-line:no-unused-expression
        this.editId && this.routInfo.paramMap
            .switchMap((params: ParamMap) => this.basicSettingService.getOneQADifficulty({ id: this.editId })).subscribe(data => {
                this.editObj = data;
                this.validateForm.patchValue({
                    diffName: this.editObj.diffName,
                    diffDesc: this.editObj.diffDesc,
                    // isStart: this.editObj.isStart,
                })
                this.isSpinning = false;
            })
        this.validateForm = this.fb.group({
            diffName: [null, [Validators.required], this.diffNameAsyncValidator],
            diffDesc: [null],
            // isStart: [null, [Validators.required]],
        });
    }
    submitForm = ($event, value) => {
        this.isLoading = true
        $event.preventDefault();
        // tslint:disable-next-line:forin
        for (const key in this.validateForm.controls) {
            this.validateForm.controls[key].markAsDirty();
        }
        if (this.validateForm.valid) {
            let params = {
                ...this.validateForm.value,
                // isStart: false
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
            this.basicSettingService.changeQADifficulty(params).subscribe(
                data => {
                    this.nzMessageService.success('操作成功!');
                    this.isLoading = false;
                    this.reset($event);
                },
                error => {
                    this.nzMessageService.error(error);
                    this.isLoading = false;
                    // const diffName = this.validateForm.controls['diffName']
                    // diffName.setErrors({
                    //     "notUnique": true,
                    //     error: true
                    // })
                }
            );
        }
    };
    diffNameAsyncValidator = (control: FormControl): any => {
        return Observable.create(function (observer) {
            if (control.value.trim() == '') {
                observer.next({ error: true, duplicated: true });
            } else {
                observer.next(null);
            }
            observer.complete();
        });
    };
    diffNameBlur(value) {
        let params = {
            diffName: value
        }
        // tslint:disable-next-line:no-unused-expression
        value && this.basicSettingService.isExsitDiffName(params).subscribe(data => {
            return {}
        }, error => {
            const diffName = this.validateForm.controls['diffName']
            if (this.editObj.diffName == this.validateForm.controls['diffName'].value) {
                return {};
            } else {
                diffName.setErrors({
                    "notUnique": true,
                    error: true
                })
            }
        })
    }
    reset($event) {
        $event.preventDefault();
        this.route.navigate([`/exam/basic-setting/set`, { tabIndex: 1 }])
    }
    descInput = ($event) => {
        this.inputNum = $event.length;
    }

}
