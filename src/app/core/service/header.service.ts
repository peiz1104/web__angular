import { Pagination } from 'app/core/entity/pagination';
import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';


import { HttpUtils } from '../http';


@Injectable()
export class HeaderService {

    constructor(
        private http: Http
    ) { }

    getNoticeCount(): Observable<Pagination<any>> {
        return this.http.get("/api/account/message")
            .map(HttpUtils.extractData)
            .catch(HttpUtils.handleError);
    }
    // 获取未读的消息数
    getNotReadTotal(): Observable<any> {
        return this.http.get('/api/learner/messages/notReadTotal')
            .map(HttpUtils.extractData)
            .catch(HttpUtils.handleError);
    }
}
