import { BaseService } from 'app/core';
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { HttpAdaptor, FormDataUtil } from '../../core';
import { Site } from '../entity/site';

@Injectable()
export class SiteService extends BaseService<Site> {
    constructor(protected httpAdaptor: HttpAdaptor) {
        super(httpAdaptor.http, httpAdaptor, '/api/sites')
    }

    getCurrentSite(): Observable<Site> {
        return this.httpAdaptor.get('/api/sites/currentSite');
    }

    update(site: Site): Observable<Site> {
        let formData: FormData = FormDataUtil.covert(site);
        return this.httpAdaptor.post(`/api/sites/${site.id}`, formData);
    }

    siteTree(parentId?: number): Observable<Site[]> {
        let params = parentId ? {parentId: parentId} : undefined;
        return this.httpAdaptor.get(this.url, {params: params});
    }
}
