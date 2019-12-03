import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Pagination, HttpUtils, BaseService, HttpAdaptor } from '../../core';
import { ChaZhanLocation } from '../entity/chazhan-location';


@Injectable()
export class ChaZhanLocationService extends BaseService<ChaZhanLocation> {
    constructor(protected httpAdaptor: HttpAdaptor) {
        super(httpAdaptor.http, httpAdaptor, '/api/chazhan/location');
    }
    pageList(params?: any): Observable<Pagination<ChaZhanLocation>> {
        return this.http.get('/api/chazhan/location', { params: params })
            .map(HttpUtils.extractData)
            .catch(HttpUtils.handleError);
    }
    delete(id: number | number[]): Observable<void> {
        if (id instanceof Number) {
            id = [].push(id);
        }
        return this.http.delete('/api/chazhan/location', { params: { ids: id } })
            .map(HttpUtils.extractData)
            .catch(HttpUtils.handleError);
    }
    get(Id: number): Observable<ChaZhanLocation> {
        return this.http.get(`/api/chazhan/location/${Id}`)
            .map(HttpUtils.extractData)
            .catch(HttpUtils.handleError);
    }
    // add(chaZhanLocation): Observable<ChaZhanLocation> {
    //     return this.http.put('/api/chazhan/location', chaZhanLocation)
    //         .map(HttpUtils.extractData)
    //         .catch(HttpUtils.handleError);
    // }

}
