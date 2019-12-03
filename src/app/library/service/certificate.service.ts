import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import {
    Pagination,
    HttpAdaptor,
    BaseService
} from '../../core';
import { FormDataUtil } from 'app/core/utils/form-data-util';
@Injectable()
export class CertificateService extends BaseService<any> {
    constructor(protected httpAdaptor: HttpAdaptor) {
        super(httpAdaptor.http, httpAdaptor, '/api/certificate');
    }
    saveCertificate(id, params?: any): Observable<Pagination<any>> {
        return this.httpAdaptor.post(`/api/certificate/${id}/template`, params)
    }
    getCertTypeList(): Observable<Pagination<any>> {
        return this.httpAdaptor.get(`/api/certType`)
    }
    getCertTypes(identify?: string): Observable<Pagination<any>> {
        let params = {};
        if (identify) {
            params['identify'] = identify;
        }
        return this.httpAdaptor.get(`/api/certType/all`, { params: params });
    }
    deleteCertificate(id: number | number[]): Observable<Pagination<any>> {
        return this.httpAdaptor.delete(`/api/certificate`, { params: { ids: id } })
    }
    getList(params?: any, page?: Pagination<any>, ids?: any): Observable<Pagination<any>> {
        params = params || {};
        if (page) {
            params['size'] = page.size;
            params['page'] = page.number;
        };
        if (ids) {
            params['ids'] = ids;
        }
        params.content = null;
        let param = FormDataUtil.searchParamFilter(params);
        return this.httpAdaptor.get(`/api/certificate`, { params: param });
    }
    getCertificateList(ugId, params?: any, page?: Pagination<any>, ids?: any) {
        params = params || {};
        if (page) {
            params['size'] = page.size;
            params['page'] = page.number;
        };
        if (ids) {
            params['ids'] = ids;
        }
        params.content = null;
        let param = FormDataUtil.searchParamFilter(params);
        return this.httpAdaptor.get(`/api/certificate/${ugId}/tbc`, { params: param });
    }
    resizeImg(params: any): Observable<any> {
        return this.httpAdaptor.post(`/api/certificate/resizeImg`, params)
    }
}
