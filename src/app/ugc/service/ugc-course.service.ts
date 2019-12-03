import { BaseService, HttpAdaptor, FormDataUtil, Pagination } from 'app/core';
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { UgcChapter } from '../entity/ugc-chapter';
import { UgcCourse } from '../entity/ugc-course';

@Injectable()
export class UgcCourseService extends BaseService<UgcCourse> {
    constructor(protected httpAdaptor: HttpAdaptor) {
        super(httpAdaptor.http, httpAdaptor, '/api/ugc/courses');
    }
}
