import { Injectable } from '@angular/core';
import { BaseService, HttpAdaptor } from "app/core";
import { ContentServer } from "app/system/entity/content-server";
import { Resolve, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { ContentServerService } from "app/system/service/content-server.service";
import { Observable } from "rxjs/Observable";
import { CuiLayer } from 'console-ui-ng';

@Injectable()
export class ContentServerDetailResolver implements Resolve<ContentServer> {
    constructor(
        private serverService: ContentServerService,
        private router: Router,
        private layer: CuiLayer
    ){}
    
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ContentServer>{
        let serverId=route.params['serverId'];
        return this.serverService.getOne(serverId)
        .map(server => {
            return server;
        })
        .catch(err => {
            this.router.navigate(['/system/server']);
            return Observable.of(err);
        });
    }
}
