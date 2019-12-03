import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { HttpAdaptor } from 'app/core';

@Injectable()
export class AssistHomeApiService {

    constructor(private httpAdaptor: HttpAdaptor) { }

    tbcList(): Observable<any> {
        let param = {
            page: 0,
            size: 3
        };
        return this.httpAdaptor.get(`/api/assist/classes`, { params: param });
    }

    examList(param?: any): Observable<any> {
        return this.httpAdaptor.get("/api/learner/exam/invigilate/list", {
            params: param
        });
    }
}
