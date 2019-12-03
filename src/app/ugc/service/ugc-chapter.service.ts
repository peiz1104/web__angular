import { BaseService, HttpAdaptor, FormDataUtil, Pagination } from 'app/core';
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { UgcChapter } from '../entity/ugc-chapter';

@Injectable()
export class UgcChapterService extends BaseService<UgcChapter> {
    constructor(protected httpAdaptor: HttpAdaptor) {
        super(httpAdaptor.http, httpAdaptor, '/api/ugc/courses');
    }

    getAllChapter(ugcCourseId: number): Observable<UgcChapter[]> {
        return this.httpAdaptor.get(`${this.url}/${ugcCourseId}/chapters`);
    }

    addInfo(ugcCourseId: number, params: any) {
        let formData = FormDataUtil.covert(params);
        return this.httpAdaptor.post(`${this.url}/${ugcCourseId}/chapters`, formData);
    }

    deleteChapters(ugcCourseId: number, ids: number[]) {
        return this.httpAdaptor.delete(`${this.url}/${ugcCourseId}/chapters`, { params: { ids: ids } });
    }

}
