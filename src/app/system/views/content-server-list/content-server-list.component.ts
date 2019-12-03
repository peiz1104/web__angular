import { Component, OnInit } from '@angular/core';
import { ContentServer } from "app/system/entity/content-server";
import { ContentServerService } from "app/system/service/content-server.service";
import { Pagination } from "app/core";
import { Column, CuiLayer } from 'console-ui-ng';
import { tipMessage } from "app/account/entity/message-tip";

@Component({
    selector: 'spk-content-server-list',
    templateUrl: './content-server-list.component.html',
    styleUrls: ['./content-server-list.component.scss']
})
export class ContentServerListComponent implements OnInit {

    server: ContentServer = { "isDeleted": false };
    servers: Pagination<ContentServer>;
    checkServers: ContentServer[];
    columns: Column[];
    loading: boolean = true;
    size: number = 10;
    constructor(
        private serverService: ContentServerService,
        private layer: CuiLayer
    ) { }

    ngOnInit() {
        this.columns = [
            { title: '名称', data: 'name' },
            { title: '协议', data: 'scheme' },
            { title: '域名', data: 'host' },
            { title: 'IP', data: 'ip' },
            { title: '端口', data: 'port' },
            { title: '磁盘目录', data: 'physicalDirectory' },
            { title: '服务目录', data: 'virtualDirectory' },
            { title: '安全FTP', tpl: 'useSecureFtp', styleClass: 'text-center' },
            { title: '服务状态', tpl: 'isEnabled', styleClass: 'text-center' },
            { title: '是否默认', tpl: 'isDefault', styleClass: 'text-center' },
            { title: '删除状态', tpl: 'isDeleted', styleClass: 'text-center' },
            { title: '', tpl: 'rowAction', styleClass: 'text-right' },
        ]

        this.searchServer();
    }

    reload(page: Pagination<ContentServer>) {
        this.size = page.size;
        this.searchServer(page);
    }

    searchServer(page?) {
        this.loading = true;
        page = page ? page : { "size": this.size, "number": 0 };
        this.serverService.getAllOfPage(this.server, page).subscribe(
            it => {
                this.servers = it;
                this.loading = false;
                this.checkServers = [];
            }
        );
    }

    delete(server?: ContentServer) {
        let delserver = server ? [server] : this.checkServers;
        if (!delserver || delserver.length == 0) {
            tipMessage('请选择要删除的服务', 'warning');
            return;
        }

        this.layer.confirm('确定要删除选择的服务吗？', () => {
            this.serverService.delete(delserver.map(it => it.id)).subscribe(
                ok => {
                    tipMessage('删除成功', 'success');
                    this.searchServer();
                },
                err => tipMessage('删除失败', 'error')
            );
        });
    }

}
