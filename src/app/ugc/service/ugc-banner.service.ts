import { UgcBanner } from './../entity/ugc-banner';
import { BaseService, HttpAdaptor, FormDataUtil } from 'app/core';
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class UgcBannerService extends BaseService<UgcBanner> {

    constructor(protected httpAdaptor: HttpAdaptor) {
        super(httpAdaptor.http, httpAdaptor, '/api/ugc/banners');
    }
    getAllOfList(params?: any): Observable<any> {
        return this.httpAdaptor.get(`${this.url}`, { params: params });
    }
    moveBanner(params: any): Observable<any> {
        let formData: FormData = FormDataUtil.covert(params);
        return this.httpAdaptor.post(`${this.url}/move`, formData);
    }

}
