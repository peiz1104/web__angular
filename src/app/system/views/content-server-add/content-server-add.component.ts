import { Component, OnInit } from '@angular/core';
import { ContentServer } from "app/system/entity/content-server";
import { ContentServerService } from "app/system/service/content-server.service";
import { Router, ActivatedRoute } from "@angular/router";
import { CuiLayer } from 'console-ui-ng';

@Component({
  selector: 'spk-content-server-add',
  templateUrl: './content-server-add.component.html',
  styleUrls: ['./content-server-add.component.scss']
})
export class ContentServerAddComponent implements OnInit {
  server: ContentServer = { "scheme": "http", 'useSecureFtp': false, 'enabled': true, 'isDefault': false };
  errormsg: string;
  loading: boolean = false;

  constructor(
    private serverService: ContentServerService,
    private router: Router,
    private route: ActivatedRoute,
    private layer: CuiLayer
  ) { }

  ngOnInit() {

  }

  saveServer(server: ContentServer) {
    this.loading = true;
    this.serverService.save(server).subscribe(
      sucess => {
        this.loading = false;
        this.layer.msg("添加服务成功");
        this.router.navigate(['../'], { relativeTo: this.route });
      },
      fail => {
        this.loading = false;
        this.errormsg = fail;
      }
    )
  }

}
