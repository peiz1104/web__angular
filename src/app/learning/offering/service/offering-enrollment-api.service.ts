import { OfferingEnrollment } from './../entity/offering-enrollment';
import { HttpAdaptor, Pagination, FormDataUtil } from 'app/core';
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class OfferingEnrollmentApiService {
    constructor(private httpAdaptor: HttpAdaptor) { }

    getEnrolled(offeringId, params?, page?): Observable<Pagination<OfferingEnrollment>> {
        if (page) {
            params['size'] = page.size;
            params['page'] = page.number;
        }

        params = FormDataUtil.searchParamFilter(params);
        return this.httpAdaptor.get(`/api/offering/${offeringId}/enrollments/enrolled`, {params: params});
    }

    getNotEnrolled(offeringId, params?, page?): Observable<Pagination<OfferingEnrollment>> {
        if (page) {
            params['size'] = page.size;
            params['page'] = page.number;
        }

        params = FormDataUtil.searchParamFilter(params);
        return this.httpAdaptor.get(`/api/offering/${offeringId}/enrollments/notEnrolled`, {params: params});
    }

    getApplied(offeringId, params?, page?): Observable<Pagination<OfferingEnrollment>> {
        if (page) {
            params['size'] = page.size;
            params['page'] = page.number;
        }

        params = FormDataUtil.searchParamFilter(params);
        return this.httpAdaptor.get(`/api/offering/${offeringId}/enrollments/applied`, {params: params});
    }

    getRefused(offeringId, params?, page?): Observable<Pagination<OfferingEnrollment>> {
        if (page) {
            params['size'] = page.size;
            params['page'] = page.number;
        }

        params = FormDataUtil.searchParamFilter(params);
        return this.httpAdaptor.get(`/api/offering/${offeringId}/enrollments/refused`, {params: params});
    }

    approve(offeringId, approve: {ids, stauts, reason}): Observable<void> {
        let formData = FormDataUtil.covert(approve);
        return this.httpAdaptor.post(`/api/offering/${offeringId}/enrollments/approve`, formData);
    }

    userExport(offeringId: number, params?): Observable<any> {
        params = FormDataUtil.searchParamFilter(params);
        return this.httpAdaptor.get(`/api/offering/${offeringId}/enrollments/userExport`, { params: params });
    }
}
