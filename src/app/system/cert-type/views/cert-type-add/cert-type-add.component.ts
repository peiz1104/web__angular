import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { CertType } from "./../../entity/cert-type";
import { CertTypeService } from "./../../service/cert-type.service";
import { Item } from 'app/system/cert-type/entity/item';
import {tipMessage} from "app/account/entity/message-tip";
@Component({
  selector: 'spk-cert-type-add',
  templateUrl: './cert-type-add.component.html',
  styleUrls: ['./cert-type-add.component.scss']
})
export class CertTypeAddComponent implements OnInit {

  certType: CertType = new CertType();
  selectedMultipleOption;
  loading: boolean = false;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private certTypeService: CertTypeService,
  ) { }

  ngOnInit() {
  }

  doSubmit(event) {
    this.loading = true;
    this.certTypeService.create(this.certType).subscribe(
      ok => {
        this.loading = false;
        tipMessage('添加证书类型成功','success');
        this.toList();
      },
      err => {
        this.loading = false;
        tipMessage('添加证书类型失败','error');
      }
    );
  }

  onCancel(event) {
    this.toList();
  }

  toList() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }
}
