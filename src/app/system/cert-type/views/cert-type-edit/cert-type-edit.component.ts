import { Component, OnInit } from '@angular/core';
import { CertType } from 'app/system/cert-type/entity/cert-type';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { CertTypeService } from "./../../service/cert-type.service";
import {tipMessage} from "app/account/entity/message-tip";

@Component({
  selector: 'spk-cert-type-edit',
  templateUrl: './cert-type-edit.component.html',
  styleUrls: ['./cert-type-edit.component.scss']
})
export class CertTypeEditComponent implements OnInit {

  certType: CertType;
  loading: boolean = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private certTypeService: CertTypeService,
  ) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        let cretId = +params['id'];
        if (cretId) {
          this.loadData(cretId);
        }
      }
    );
  }
  loadData(cretId) {
    this.certTypeService.getOne(cretId).subscribe(
      certType => {
        this.certType = certType;
      }
    );
  }
  onSubmit(event) {
    this.loading = true;
    this.certTypeService.update(this.certType).subscribe(
      ok => {
        this.loading = false;
        tipMessage('修改证书类型成功','success');
        this.toList();
      },
      err => {
        this.loading = false;
        tipMessage('修改证书类型失败','error');
      }
    );
  }

  onCancel(event) {
    this.toList();
  }

  toList() {
    this.router.navigate(['../../'], { relativeTo: this.route });
  }
}
