import { Pagination } from './../../core/entity/pagination';
import { HttpAdaptor } from './../../core/http/http-adaptor';
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { FormDataUtil } from 'app/core';

export interface UsernameVerifiedResult {
    username: string;
    result: 'OK' | 'NOT_FOUND' | 'FORBBIDEN';
    userInfo?: {
        id: number;
        username: string;
        displayName: string;
        userGroupName: string;
        avatar: string;
    }
}

@Injectable()
export class UserLookupApiService {
    constructor(private httpAdaptor: HttpAdaptor) { }

    users(api?: string, params?: any): Observable<Pagination<any>> {
        let url = api || '/api/users/lookupList';

        return this.httpAdaptor.get(url, { params: params });
    }

    verifyUsernames(usernames: string[]): Observable<UsernameVerifiedResult[]> {
        let url = '/api/users/verifyUsernames';
        let formData = FormDataUtil.toArrayFileds('usernames', usernames);

        return this.httpAdaptor.post(url, formData);
    }
}
