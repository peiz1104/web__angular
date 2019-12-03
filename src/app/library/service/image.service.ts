import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Pagination, HttpUtils } from '../../core';
import { Image } from '../entity/image';

@Injectable()
export class ImageService {
    constructor(private http: Http) { }

    pageList(params?: any): Observable<Pagination<Image>> {
        return this.http.get('/api/images', { params: params })
            .map(HttpUtils.extractData)
            .catch(HttpUtils.handleError);
    }

    delete(id: number | number[]): Observable<void> {
        if (id instanceof Number) {
            id = [].push(id);
        }
        return this.http.delete('/api/images', { params: { ids: id } })
            .map(HttpUtils.extractData)
            .catch(HttpUtils.handleError);
    }

    add(image: Image): Observable<Image> {
        return this.http.put('/api/images', image)
        .map(HttpUtils.extractData)
        .catch(HttpUtils.handleError);
     }

    get(id: number): Observable<Image> {
        return this.http.get(`/api/images/${id}`)
        .map(HttpUtils.extractData)
        .catch(HttpUtils.handleError);
    }

    update(image: FormData): Observable<Image> {
        if (!image.has("id")) {
            Observable.throw('The id of user for upload must not be null');
        }
        return this.http.post(`/api/images/${image.get('id')}`, image)
        .map(HttpUtils.extractData)
        .catch(HttpUtils.handleError);
    }
}
