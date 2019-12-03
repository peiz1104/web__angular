import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { HttpAdaptor, FormDataUtil } from 'app/core';
import { Course } from '../entity/course';

@Injectable()
export class OfferingCourseApiService {

    constructor(private httpAdaptor: HttpAdaptor) { }

    getCourse(offeringId: number, courseId: number): Observable<any> {
        return this.httpAdaptor.get(`/api/offering/${offeringId}/courses/${courseId}`);
    }

    update(offeringId: number, entity: Course): Observable<Course> {
        let formData: FormData = FormDataUtil.covert(entity);
        return this.httpAdaptor.post(`/api/offering/${offeringId}/courses/${entity['id']}`, formData);
    }
}
