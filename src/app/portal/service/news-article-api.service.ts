import { NewsArticle } from './../entity/news-article';
import { BaseService, HttpAdaptor } from 'app/core';
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class NewsArticleApiService extends BaseService<NewsArticle> {
    constructor(protected httpAdaptor: HttpAdaptor) {
        super(httpAdaptor.http, httpAdaptor, '/api/portal/news/articles');
    }

    publish(ids: any[]): Observable<any> {
        return this.httpAdaptor.post(`${this.url}/publish`, null, { params: { ids: ids } });
    }

    disPublish(ids: any[]): Observable<any> {
        return this.httpAdaptor.post(`${this.url}/cancel`, null, { params: { ids: ids } });
    }

    toTop(id: number): Observable<any> {
        return this.httpAdaptor.get(`${this.url}/${id}/top`);
    }

    cancelTop(id: number): Observable<any> {
        return this.httpAdaptor.get(`${this.url}/${id}/canceltop`);
    }

}
