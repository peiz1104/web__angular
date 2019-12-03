import { RouterStateSnapshot } from '@angular/router';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Forum } from '../../ordinary-forum/entity/forum';
import { SiteForumApiService } from './site-forum.service';

@Injectable()
export class ForumDetailResolver implements Resolve<Forum> {
    constructor(private siteForumApi: SiteForumApiService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Forum> {
        return this.siteForumApi.getForum();
    }
}