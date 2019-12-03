import { Video } from './../entity/video';
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

import { HttpAdaptor } from './../../../core/http/http-adaptor';
import { BaseService } from './../../../core/service/base.service';
import { Course } from './../entity/course';
import { OnlineCourse } from './../entity/online-course';
import { FormDataUtil } from 'app/core/utils/form-data-util';

@Injectable()
export class CourseTrialService {
    constructor(protected httpAdaptor: HttpAdaptor) { }


    find(courseId: number): Observable<Video> {
        return this.httpAdaptor.get(`/api/courses/${courseId}/trial`, null);
    }
    delete(courseId: number): Observable<any> {
        return this.httpAdaptor.delete(`/api/courses/${courseId}/trial`, null);
    }
    save(courseId: number, entity): Observable<Video> {
        let formData: FormData = FormDataUtil.covert(entity);
        return this.httpAdaptor.post(`/api/courses/${courseId}/trial`, formData);
    }
}
