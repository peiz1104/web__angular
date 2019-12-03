import { BaseService, HttpAdaptor, Pagination } from 'app/core';
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { TrainClassBanner } from '../entity/train_class_Banner';

@Injectable()
export class TrainClassBannerApiService extends BaseService<TrainClassBanner> {
    constructor(protected httpAdaptor: HttpAdaptor) {
        super(httpAdaptor.http, httpAdaptor, '/api/offering/banner');
    }

    getAllOfPage(offeringId?: number, page?: Pagination<TrainClassBanner>) {
        return this.httpAdaptor.get(this.url, { params: { offeringId: offeringId } });
    }
    // banner 上移、下移
    updateOrder(offeringId?: number, id?: number, flag?: string) {
        return this.httpAdaptor.get(`/api/offering/banner/${offeringId}/${id}/order/${flag}`)
    }

}
