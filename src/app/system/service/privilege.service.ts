import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Pagination, HttpUtils } from '../../core';
import { Privilege } from '../entity/privilege';

@Injectable()
export class PrivilegeService {
    constructor(private http: Http) { }

    privileges(): Observable<Privilege[]> {
        return this.http.get('/api/privileges')
            .map(HttpUtils.extractData)
            .catch(HttpUtils.handleError);
    }
}
