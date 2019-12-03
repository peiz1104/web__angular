import { BaseService, HttpAdaptor } from 'app/core';
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { FormDataUtil } from 'app/core/utils/form-data-util';

@Injectable()
export class UgcNoticeService extends BaseService<any> {
    constructor(protected httpAdaptor: HttpAdaptor) {
        super(httpAdaptor.http, httpAdaptor, '/api/ugc/notices');
    }

    findNoticeBoxId(): Observable<any> {
        return this.httpAdaptor.get(`${this.url}/findNoticeBoxId`, {});
    }

    saveNoticeBox(id: any): Observable<any> {
        let param = FormDataUtil.covert({ 'id': id });
        return this.httpAdaptor.post(`${this.url}/saveNoticeBox`, param);
    }
}
