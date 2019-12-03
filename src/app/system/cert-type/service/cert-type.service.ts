import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

import { HttpAdaptor } from './../../../core/http/http-adaptor';
import { BaseService } from './../../../core/service/base.service';
import { CertType } from './../entity/cert-type';
import { Item } from 'app/system/cert-type/entity/item';

@Injectable()
export class CertTypeService extends BaseService<CertType> {

    private item: Item[];

    constructor(protected httpAdaptor: HttpAdaptor) {
        super(httpAdaptor.http, httpAdaptor, '/api/certType');
    }
   
    saveUpdate(certType: CertType): Observable<CertType> {
        let id = certType.id;
        return this.httpAdaptor.post(`${this.url}/${id}`, certType);
    }
    
    getItem(params?: any): Observable<Item[]> {
        return this.httpAdaptor.get('/api/certItem/findAll', { params: params }).map(
            items => {
              this.item = items;
              return items;
            });
    }
}
