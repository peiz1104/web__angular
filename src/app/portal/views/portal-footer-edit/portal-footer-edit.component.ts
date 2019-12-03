import { Component, OnInit } from '@angular/core';
import { PortalFooterApiService } from './../../service/portal-footer-api.service';
import { NzMessageService } from 'ng-zorro-antd';
import { PortalFooter } from './../../entity/porttal-footer';

@Component({
  selector: 'spk-portal-footer-edit',
  templateUrl: './portal-footer-edit.component.html',
  styleUrls: ['./portal-footer-edit.component.scss']
})
export class PortalFooterEditComponent implements OnInit {

  footer: PortalFooter = new PortalFooter();
  constructor(
    private portalBannerService: PortalFooterApiService,
    private message: NzMessageService) { }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.portalBannerService.getFooter().subscribe(
      data => {
        if (data) {
          this.footer = data;
        }
      }
    );
  }

  onSubmit() {
    this.portalBannerService.save(this.footer).subscribe(
      data => {
        this.footer = data;
      }
    );
  }

  wchartUploadComplete(file) {
    this.footer.wchartImg = file["relativePath"];
  }
  appUploadComplete(file) {
    this.footer.appImg = file["relativePath"];
  }
}
