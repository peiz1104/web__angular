import { BaseService } from 'app/core';
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { HttpAdaptor, FormDataUtil, Pagination } from '../../core';
import { Message } from 'console-ui-ng';

@Injectable()
export class SystemMessageBoxService extends BaseService<Message> {
    constructor(protected httpAdaptor: HttpAdaptor) {
        super(httpAdaptor.http, httpAdaptor, '/api/sites')
    }

    getDefault(): Observable<Message> {
        return this.httpAdaptor.get(`/api/sites/message/default`);
    }

    initMessageBox(): Observable<Message> {
        return this.httpAdaptor.put(`/api/sites/message/init`, null);
    }

    receives(params?: any): Observable<Pagination<any>> {
        return this.httpAdaptor.get('/api/sites/message/receives', { params: params });
    }

    createMess(value: any): Observable<Message> {
        return this.httpAdaptor.put(`/api/sites/message`, value);
    }

    list(messageBoxId: number, params?: any): Observable<Pagination<Message>> {
        return this.httpAdaptor.get(`/api/sites/message/${messageBoxId}`, { params: params });
    }

}
