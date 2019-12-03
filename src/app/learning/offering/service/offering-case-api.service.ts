import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import {
    Pagination,
    HttpAdaptor,
    BaseService
} from 'app/core';
import { FormDataUtil } from 'app/core/utils/form-data-util';
import { OfferingCase } from 'app/learning/offering/entity/offering-case';
import { CaseInfo } from 'app/library/entity/case-info';

@Injectable()
export class OfferingCaseService extends BaseService<OfferingCase> {
    constructor(protected httpAdaptor: HttpAdaptor) {
        super(httpAdaptor.http, httpAdaptor, `/api/offering/case`);
    }

    getAllOfPage(offeringId?: number, params?: any, page?: Pagination<OfferingCase>): Observable<Pagination<OfferingCase>> {
        params = params || {};
        if (page) {
            params['size'] = page.size;
            params['page'] = page.number;
        };
        return this.httpAdaptor.get(this.url + `/${offeringId}`);
    }

    searchData(offeringId?: number, params?: any, page?: Pagination<OfferingCase>): Observable<Pagination<OfferingCase>> {
        params = params || {};
        if (page) {
            params['size'] = page.size;
            params['page'] = page.number;
        };
        return this.httpAdaptor.get(this.url + `/${offeringId}/search`, { params: params });
    }

    getOne(offeringId?: number, id?: number): Observable<OfferingCase> {
        return this.httpAdaptor.get(this.url + `/${offeringId}/one`, { params: { id: id } });
    }

    delete(ids: number[], offeringId?: number): Observable<any> {
        return this.http.delete(this.url + `/${offeringId}`, { params: { ids: ids } });
    }

    publish(id: number[], offeringId: number): Observable<any> {
        let formdata = new FormData();
        formdata.append("ids", id.toString());
        return this.http.post(this.url + `/${offeringId}/publish`, formdata);
    }
    disPublish(id: number[], offeringId: number): Observable<any> {
        let formdata = new FormData();
        formdata.append("ids", id.toString());
        return this.http.post(this.url + `/${offeringId}/disPublish`, formdata);
    }

    addData(offeringId: number, caseInfoDto: CaseInfo): Observable<any> {
        return this.http.put(this.url + `/${offeringId}`, caseInfoDto)
    }

    citeCase(offeringId: number, caseIds?: number | number[]): Observable<any> {
        return this.http.post(this.url + `/${offeringId}`, caseIds)
    }

}
