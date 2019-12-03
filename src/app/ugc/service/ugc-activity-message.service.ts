import { Observable } from 'rxjs/Observable';
import { HttpAdaptor } from 'app/core';
import { BaseService } from 'app/core';
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { FormDataUtil } from 'app/core/utils/form-data-util';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class UgcActivityMessageService extends BaseService<any> {
    constructor(protected httpAdaptor: HttpAdaptor) {
        super(httpAdaptor.http, httpAdaptor, '/api/messages');
    }
    createMess(activityId: any, entity: any): Observable<any> {
        return this.httpAdaptor.put(`/api/ugc/activities/${activityId}/messages`, entity);
    };
    getShort(id: any, params?: any): Observable<any> {
        return this.httpAdaptor.get(`${this.url}/shortMessages/receivers/${id}`, { params: params });
    }
    getEmail(id: any, params?: any, ): Observable<any> {
        return this.httpAdaptor.get(`${this.url}/emailMessages/receivers/${id}`, { params: params });
    }
    getInner(id: any, params?: any, ): Observable<any> {
        return this.httpAdaptor.get(`${this.url}/innerMessages/receivers/${id}`, { params: params });
    }
    getPersons(activityId: any, params?: any, ): Observable<any> {
        params = params || {};
        let param = FormDataUtil.searchParamFilter(params);
        return this.httpAdaptor.get(`/api/ugc/activities/${activityId}/messages/users`, { params: param })
    }
    getPersonTotalInScopes(activityId: any): Observable<any> {
        return this.httpAdaptor.get(`/api/ugc/activities/${activityId}/messages/allUserTotalInScopes`, {  });
    }
    revokeOne(id: number): Observable<any> {
        return this.httpAdaptor.post(`${this.url}/revokeSend/${id}`, {});
    }
    initMessageBox(activityId: any): Observable<any> {
        return this.httpAdaptor.post(`/api/ugc/activities/${activityId}/initMessageBox`, {});
    }
}

