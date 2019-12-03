import { Injectable } from '@angular/core';
import { BaseService, HttpAdaptor } from "app/core";
import { ContentServer } from "app/system/entity/content-server";
import { Resolve, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { ContentServerService } from "app/system/service/content-server.service";
import { Observable } from "rxjs/Observable";
import { CuiLayer } from 'console-ui-ng';
import { Documentlib } from "app/library/entity/documentlib";
import { DocumentLibService } from "app/library/service/documentLib.service";

@Injectable()
export class DocumentDetailResolver implements Resolve<Documentlib> {
    constructor(
        private documentLibService: DocumentLibService,
        private router: Router,
        private layer: CuiLayer
    ) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Documentlib>{
        let id=route.params['id'];
        return this.documentLibService.getOne(id)
        .map(document => {
            return document;
        })
        .catch(err => {
            this.router.navigate(['/library/document/list']);
            return Observable.of(err);
        });
    }
}
