import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import {
    Pagination,
    HttpAdaptor,
    BaseService
} from 'app/core';
import { FormDataUtil } from 'app/core/utils/form-data-util';

@Injectable()
export class OfferingGroupService extends BaseService<any> {
    constructor(protected httpAdaptor: HttpAdaptor) {
        super(httpAdaptor.http, httpAdaptor, '/api/offering/group');
    }

    getAllGroup(offeringId: number): Observable<any> {
        return this.httpAdaptor.get(this.url + `/${offeringId}`);
    }

    createGroup(param: any, offeringId: number): Observable<any> {
        return this.httpAdaptor.post(this.url + `/${offeringId}/create`, param);
    }

    updateGroup(param: any): Observable<any> {
        let formdata = FormDataUtil.covert(param);
        return this.httpAdaptor.post(this.url + `/update`, formdata);
    }
    deleteGroup(groupId: number): Observable<any> {
        return this.httpAdaptor.delete(this.url + `/${groupId}`);
    }

    checkCodeIsUnique(offeringId: number, param: any): Observable<any> {
        return this.httpAdaptor.get(this.url + `/${offeringId}/checkCodeIsUnique`, { params: param });
    }
}
