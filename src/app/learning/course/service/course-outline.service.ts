import { Rco } from './../entity/rco';
import { HttpAdaptor } from './../../../core/http/http-adaptor';
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class CourseOutlineService {
    constructor(private http: Http, private httpAdaptor: HttpAdaptor) { }

    getOutlineIndex(courseId: number): Observable<Rco[]> {
        return this.httpAdaptor.get(`/api/courses/${courseId}/outline`);
    }

    import(courseId: number, importInfo: any): Observable<any> {
        return this.httpAdaptor.post(`/api/courses/${courseId}/outline/import`, importInfo);
    }

    parseImsManifest(courseId: number, uploadFile: any): Observable<Rco[]> {
        return this.httpAdaptor.post(`/api/courses/${courseId}/outline/parseImsManifest`, uploadFile);
    }
}
