import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { ContentServer } from "app/system/entity/content-server";
import { ContentServerService } from "app/system/service/content-server.service";
import { CuiLayer } from 'console-ui-ng';

@Component({
  selector: 'spk-content-server-edit',
  templateUrl: './content-server-edit.component.html',
  styleUrls: ['./content-server-edit.component.scss']
})
export class ContentServerEditComponent implements OnInit {
  server: ContentServer;
  errormsg: string;
  loading: boolean = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private serverService: ContentServerService,
    private layer: CuiLayer
  ) { }

  ngOnInit() {
    this.route.data.subscribe((data: { server: ContentServer }) => {
      this.server = data.server;
    });
  }

  saveServer(server: ContentServer) {
    this.loading = true;
    this.serverService.save(server).subscribe(
      sucess => {
        this.loading = false;
        this.layer.msg("编辑成功");
      },
      fail => {
        this.loading = false;
        this.errormsg = fail;
      }
    )
  }

}
