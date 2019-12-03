import { PortalFooter } from './../entity/porttal-footer';
import { BaseService, HttpAdaptor } from 'app/core';
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class PortalFooterApiService extends BaseService<PortalFooter> {
    constructor(protected httpAdaptor: HttpAdaptor) {
        super(httpAdaptor.http, httpAdaptor, '/api/portal/footer');
    }

    getFooter() {
        return this.httpAdaptor.get(`${this.url}`, null);
    }

}
