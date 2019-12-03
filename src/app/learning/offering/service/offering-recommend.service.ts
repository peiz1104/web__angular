import { FormDataUtil } from 'app/core/utils/form-data-util';
import { OfferingRecommend } from './../entity/offering-recommend';
import { BaseService } from './../../../core/service/base.service';
import { Condition } from './../entity/condition';
import { HttpAdaptor } from './../../../core/http/http-adaptor';
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class OfferingRecommendService extends BaseService<OfferingRecommend> {
    constructor(protected httpAdaptor: HttpAdaptor) {
        super(httpAdaptor.http, httpAdaptor, '/api/offering/recommend');
    }

    batchRecommends (recommends: OfferingRecommend[]): Observable<any> {
        return this.httpAdaptor.put(`${this.url}`, recommends);
    }

    moveOffering (param: any): Observable<any> {
        let fromData = FormDataUtil.covert(FormDataUtil.nullValFilter(param));
        return this.httpAdaptor.post(`${this.url}/move`, fromData);
    }
}
