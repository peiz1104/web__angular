import { Banner } from './../entity/banner';
import { BannerBox } from '../entity/banner-box';
import { BaseService, HttpAdaptor, FormDataUtil} from 'app/core';
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Pagination } from './../../../core/entity/pagination';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';


@Injectable()
export class BannerService extends BaseService<Banner> {
    constructor(protected httpAdaptor: HttpAdaptor) {
        super(httpAdaptor.http, httpAdaptor, '/api/banners');
    }

    getAllOfPage(boxId: number, params?: any): Observable<any> {
        return this.httpAdaptor.get(`/api/banner-boxes/${boxId}/banners`, { params: params });
    }

    moveBanner(params: any): Observable<any> {
        let formData: FormData = FormDataUtil.covert(params);
        return this.httpAdaptor.post(`/api/banners/move`, formData);
    }

}
