import { HttpAdaptor } from 'app/core';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Pagination, HttpUtils } from '../../core';
import { UserTypes } from '../entity/user-types';

@Injectable()
export class UserTypesService {

    constructor(private http: Http, private httpAdaptor: HttpAdaptor) {

    }

    getAllUserTypes() {
        return this.httpAdaptor.get('/api/usertypes/all');
    }


    getUserText() {
      return this.httpAdaptor.get('/api/report/getuserText');
    }

    getLogin(userText?: string) {
      let url = `http://localhost:8080/api/sso/authenticate/${userText}`;
      return this.http.post(url, null).map(HttpUtils.extractData).catch(HttpUtils.handleError);
    }
}
