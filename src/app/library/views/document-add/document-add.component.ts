import { DocumentFormComponent } from './../../public/document-form/document-form.component';
import { ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Documentlib } from "app/library/entity/documentlib";
import { DocumentLibService } from "app/library/service/documentLib.service";
import { Router, ActivatedRoute } from "@angular/router";
import { CuiLayer } from 'console-ui-ng';
import { NzMessageService } from 'ng-zorro-antd';
import { tipMessage } from 'app/account/entity/message-tip';

@Component({
  selector: 'spk-document-add',
  templateUrl: './document-add.component.html',
  styleUrls: ['./document-add.component.scss']
})
export class DocumentAddComponent implements OnInit {
  document: Documentlib = new Documentlib();
  @ViewChild(DocumentFormComponent) form: DocumentFormComponent;
  errormsg: string;
  loading: boolean = false;

  constructor(
    private documentLibService: DocumentLibService,
    private router: Router,
    private route: ActivatedRoute,
    private message: NzMessageService
  ) { }

  ngOnInit() {

  }

  saveAndNext(event) {
    this.saveDocument(event, 'next');

  }
  saveDocument(event, next?) {
    this.loading = true;
    console.log(event.value)
    this.documentLibService.save(event.value).subscribe(
      success => {
        this.loading = false;
        tipMessage('添加文档成功', 'success');
        if (next) {
          this.form.resetForm();
          return;
        }
        this.router.navigate(["../list"], { relativeTo: this.route });
      },
      err => {
        this.loading = false;
        tipMessage(err);
      }
    )
  }
}
