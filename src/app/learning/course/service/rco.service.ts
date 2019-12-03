import { FormDataUtil } from './../../../core/utils/form-data-util';
import { Rco } from './../entity/rco';
import { HttpAdaptor } from './../../../core/http/http-adaptor';
import { BaseService } from './../../../core/service/base.service';
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class RcoService extends BaseService<Rco> {

    constructor(protected httpAdaptor: HttpAdaptor) {
        super(httpAdaptor.http, httpAdaptor, '/api/rcos');
    }

    uploadFile(rcoId: number, file: any): Observable<Rco> {
        let formData = FormDataUtil.covert(file);
        return this.httpAdaptor.post(`/api/rcos/${rcoId}/uploadFile`, formData);
    }

    parseImsZip(file: any): Observable<Rco[]> {
        let formData = FormDataUtil.covert(file);
        return this.httpAdaptor.post(`${this.url}/parseImsZip`, formData);
    }

    parseSimpleZip(file: any): Observable<Rco[]> {
        let formData = FormDataUtil.covert(file);
        return this.httpAdaptor.post(`${this.url}/parseSimpleZip`, formData);
    }

    doImport(params: any): Observable<Rco[]> {
        // let formData = FormDataUtil.covert(params);
        return this.httpAdaptor.post(`${this.url}/doImport`, params);
    }
}
