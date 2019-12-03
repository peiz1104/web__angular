/*
 * @Author: mozhengqian
 * @Date: 2017-11-21 10:26:41
 * @Last Modified by: mozhengqian
 * @Last Modified time: 2017-11-24 17:51:20
 */
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd';
import { CertificateService } from 'app/library/service/certificate.service';
import { AccountService } from 'app/account/service/account.service';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl
} from '@angular/forms';
import * as moment from 'moment';

@Component({
  selector: 'spk-certificate-edit',
  templateUrl: './certificate-edit.component.html',
  styleUrls: ['./certificate-edit.component.scss']
})
export class CertificateEditComponent implements OnInit {
  validateForm: FormGroup;
  src;
  certificateType: any = [];
  physicalPath: any;
  data: any;
  cerid: any;
  user: any;
  loading: boolean = false;
  // 证书类型标识
  identify: string = 'TRAININGCLASS';
  constructor(
    public activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private nzModalService: NzModalService,
    private certificateService: CertificateService,
    private router: Router,
    private accountInfoService: AccountService,
  ) { }

  ngOnInit() {
    this.cerid = this.activatedRoute.snapshot.params['id'];
    this.accountInfoService.findUser().subscribe(
      user => {
        this.user = user;
      }
    )
    this.certificateService.getOne(this.cerid).subscribe((data: any) => {
      console.log(data);
      this.data = data;
      this.setInit(data);
      this.physicalPath = data.physicalPath;
    })
    this.certificateService.getCertTypes().subscribe(data => {
      this.certificateType = data;
    });
  }
  setInit(data) {

    this.validateForm = this.fb.group({
      name: [data.name, [Validators.required]],
      certNumberStart: [data.certNumberStart, [Validators.required]],
      certFlowNumberLength: [data.certFlowNumberLength || 1, [Validators.required]],
      available: [data.available || 1],
      certificateType: [data.certificateType.id || this.certificateType[0].id, [Validators.required]],
      imgUrlPath: [data.imgUrlPath, [Validators.required]],
      userGroup: [data.userGroup || this.user.managerGroup],
      remark: [data.remark],
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
      let params = {};
      this.certificateType.forEach(obj => {
        if (obj.id == value.certificateType) {
          value.certificateType = obj;
        }
      });
      params = {
        id: this.data.id,
        ...value,
        physicalPath: this.physicalPath,
      }
      this.certificateService.update(params).subscribe((data: any) => {
        this.loading = false;
        this.router.navigate([`library/certificate`]);
        // this.router.navigate([`library/certificate/template/${data.id}`, { imgUrlPath: data.imgUrlPath ? data.imgUrlPath : '' }]);
      }, err => {
        this.loading = false;
      });
    } else {
      this.loading = false;
    }
  };
  getfile(result) {
    console.log(result);
    if (result) {
      this.certificateService.resizeImg(result).subscribe(data => {
        console.log(data)
        this.physicalPath = data.outImgPath;
        this.validateForm && this.validateForm.get('imgUrlPath') && this.validateForm.get('imgUrlPath').setValue(data.relativePath);
      });
    }
  }
}
