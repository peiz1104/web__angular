import { User } from './../entity/user';
import { Pagination } from './../../core/entity/pagination';
import { HttpAdaptor } from './../../core/http/http-adaptor';
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class UserLookupService {
    constructor(private httpAdaptor: HttpAdaptor) { }

    users(api?: string, params?: any): Observable<Pagination<User>> {
        let url = api || '/api/users';

        return this.httpAdaptor.get(url, { params: params });
    }
}
