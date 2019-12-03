import { Component, OnInit } from '@angular/core';
import { Documentlib } from 'app/library/entity/documentlib';
import { DocumentLibService } from 'app/library/service/documentLib.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CuiLayer } from 'console-ui-ng';

@Component({
  selector: 'spk-document-condition',
  templateUrl: './document-condition.component.html',
  styleUrls: ['./document-condition.component.scss']
})
export class DocumentConditionComponent implements OnInit {

  document: Documentlib;
  errormsg: string;

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

}
