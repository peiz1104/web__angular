import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { PersonClassification } from '../entity/person-classification';
import { FormDataUtil, HttpUtils } from '../../../core';

@Injectable()
export class PersonClassificationService {
     constructor(private http: Http) { }

    groups(parentId?: number): Observable<PersonClassification[]> {
        let url = '/api/personClassification';
        return this.http.get(url, { params: { 'parentId': parentId } })
             .map(HttpUtils.extractData)
             .catch(HttpUtils.handleError);
     }

    getGroup(id: number): Observable<PersonClassification> {
        let url = `/api/personClassification/${id}`;

        return this.http.get(url)
            .map(HttpUtils.extractData)
            .catch(HttpUtils.handleError);
    }

    add(personClassification: PersonClassification): Observable<PersonClassification> {
        let url = '/api/personClassification';
        return this.http.put(url, personClassification).map(HttpUtils.extractData).catch(HttpUtils.handleError);
    }

    update(personClassification: PersonClassification): Observable<PersonClassification> {
        if (!personClassification.id) {
            Observable.throw('The id of userGroup for upload must not be null');
        }
        let url = `/api/personClassification/${personClassification.id}`;
        let formData: FormData = FormDataUtil.covert(personClassification);

        return this.http.post(url, formData).map(HttpUtils.extractData).catch(HttpUtils.handleError);
    }

    delete(ids: number[]): Observable<void> {
        let url = `/api/personClassification`;
        return this.http.delete(url, { params: { ugIds: ids } })
            .map(HttpUtils.extractData).catch(HttpUtils.handleError);
    }
}
