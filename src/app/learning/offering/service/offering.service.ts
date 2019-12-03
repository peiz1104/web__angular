import { Condition } from './../entity/condition';
import { HttpAdaptor } from './../../../core/http/http-adaptor';
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class OfferingService {
    constructor(private httpAdaptor: HttpAdaptor) { }

    addCondition(offeringId: number, type: 'required'|'open'|'closed'): Observable<Condition | null> {
        let url = `/api/offering/${offeringId}/addCondition`;
        let formData = new FormData();
        formData.append('type', type);

        return this.httpAdaptor.post(url, formData);
    }
}
