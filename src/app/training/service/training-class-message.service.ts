import { Observable } from 'rxjs/Observable';
import { HttpAdaptor } from 'app/core';
import { BaseService } from 'app/core';
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { FormDataUtil } from 'app/core/utils/form-data-util';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class TrainingClassMessageApiService extends BaseService<any> {
    constructor(protected httpAdaptor: HttpAdaptor) {
        super(httpAdaptor.http, httpAdaptor, '/api/messages');
    }
    createMess(entity: any): Observable<any> {
        return this.httpAdaptor.put('/api/training/messages', entity);
    };
    getShort(id: any, params?: any): Observable<any> {
        return this.httpAdaptor.get(`${this.url}/innerMessages/receivers/${id}`, { params: params });
    }
    getEmail(id: any, params?: any, ): Observable<any> {
        return this.httpAdaptor.get(`${this.url}/emailMessages/receivers/${id}`, { params: params });
    }
    getInner(id: any, params?: any, ): Observable<any> {
        return this.httpAdaptor.get(`${this.url}/innerMessages/receivers/${id}`, { params: params });
    }
    getPersons(params?: any, ): Observable<any> {
        params = params || {};
        let param = FormDataUtil.searchParamFilter(params);
        return this.httpAdaptor.get(`/api/training/messages/enrolledUsers`, { params: param })
    }
    getPersonTotalInScopes(id: any): Observable<any> {
        return this.httpAdaptor.get('/api/training/messages/enrolledUserTotalInScopes', { params: { 'offeringId': id } });
    }
    revokeOne(id: number): Observable<any> {
        return this.httpAdaptor.post(`${this.url}/revokeSend/${id}`, {});
    }
    initMessageBox(id: any): Observable<any> {
        return this.httpAdaptor.post(`/api/training/messages/${id}/initMessageBox`, {});
    }
    // 请求用户组列表
    getUserGroupList(params) {
        return this.httpAdaptor.get(`/api/logicalGroup`, { params: params })
    }
    // 获取消息详情
    getMessageInfo(id: any): Observable<any> {
        return this.httpAdaptor.get(`${this.url}/info/${id}`);
    }
}

