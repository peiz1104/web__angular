/*
 * @Author: mozhengqian
 * @Date: 2017-11-21 10:26:58
 * @Last Modified by: mozhengqian
 * @Last Modified time: 2017-11-24 16:28:12
 */
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd';
import {
    FormBuilder,
    FormGroup,
    Validators,
    FormControl
} from '@angular/forms';
import * as moment from 'moment';
import { CertificateService } from 'app/library/service/certificate.service';
import { AccountService } from 'app/account/service/account.service';

@Component({
    selector: 'spk-certificate-add',
    templateUrl: './certificate-add.component.html',
    styleUrls: ['./certificate-add.component.scss']
})
export class CertificateAddComponent implements OnInit {
    validateForm: FormGroup;
    src;
    waitLoad: boolean = false;
    certificateType: any = [];
    physicalPath: any;
    loading: boolean = false;
    constructor(
        public activatedRoute: ActivatedRoute,
        private fb: FormBuilder,
        private nzModalService: NzModalService,
        private router: Router,
        private certificateService: CertificateService,
        private accountInfoService: AccountService,
    ) { }

    ngOnInit() {
        this.accountInfoService.findUser().subscribe(
            user => {
                // tslint:disable-next-line:max-line-length
                // tslint:disable-next-line:no-unused-expression
                this.validateForm && this.validateForm.get('userGroup') && this.validateForm.get('userGroup').setValue(user.managerGroup);
            }
        )
        this.validateForm = this.fb.group({
            name: [null, [Validators.required]],
            certNumberStart: [null, [Validators.required]],
            certFlowNumberLength: [4, [Validators.required]],
            available: [1],
            certificateType: [null, [Validators.required]],
            imgUrlPath: [null, [Validators.required]],
            userGroup: [null],
            remark: [null],
        });
        this.certificateService.getCertTypes().subscribe(data => {
            this.certificateType = data;
            // tslint:disable-next-line:max-line-length
            // tslint:disable-next-line:no-unused-expression
            this.validateForm && this.validateForm.get('certificateType') && this.validateForm.get('certificateType').setValue(data.content && data.content[0]);
        });
    }
    _submitForm = ($event, value) => {
        this.loading = true;
        $event.preventDefault();
        // tslint:disable-next-line:forin
        for (const key in this.validateForm.controls) {
            this.validateForm.controls[key].markAsDirty();
        }
        if (this.validateForm.valid) {
            // console.log(value);
            let params = {};
            params = {
                ...value,
                physicalPath: this.physicalPath,
            }
            this.certificateService.create(params).subscribe(
                (data: any) => {
                    this.loading = false;
                    // tslint:disable-next-line:max-line-length
                    this.router.navigate([`library/certificate/template/${data.id}`, { imgUrlPath: data.imgUrlPath ? data.imgUrlPath : '' }]);
                },
                err => {
                    this.loading = false;
                }
            );
        } else {
            this.loading = false;
        }
    };
    getfile(result) {
    console.log("this.physicalPath", this.physicalPath);
        if (result) {
      this.waitLoad = true;
            this.certificateService.resizeImg(result).subscribe(data => {
        console.log(data)
                this.physicalPath = data.outImgPath;
                // tslint:disable-next-line:no-unused-expression
                this.validateForm && this.validateForm.get('imgUrlPath') && this.validateForm.get('imgUrlPath').setValue(data.relativePath);
        this.waitLoad = false;
            });
        }
    }

}
