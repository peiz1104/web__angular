import { Component, OnInit } from '@angular/core';
import { Documentlib } from "app/library/entity/documentlib";
import { DocumentLibService } from "app/library/service/documentLib.service";
import { Router, ActivatedRoute } from "@angular/router";
import { CuiLayer } from 'console-ui-ng';

@Component({
  selector: 'spk-document-edit',
  templateUrl: './document-edit.component.html',
  styleUrls: ['./document-edit.component.scss']
})
export class DocumentEditComponent implements OnInit {
  document: Documentlib;
  errormsg: string;
  loading: boolean = false;

  constructor(
    private documentLibService: DocumentLibService,
    private router: Router,
    private route: ActivatedRoute,
    private layer: CuiLayer
  ) { }

  ngOnInit() {
    this.route.data.subscribe((data: { document: Documentlib }) => {
      this.document = data.document;
    });
  }

  saveDocument(event) {
    this.loading = true;
    this.documentLibService.save(event.value).subscribe(
      sucess => {
        this.loading = false;
        this.layer.msg("编辑文档成功");
        this.router.navigate(['../../list'], { relativeTo: this.route });
      },
      fail => {
        this.loading = false;
        this.errormsg = fail;
      }
    )
  }

}
