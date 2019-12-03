import { Forum } from './../../forum/ordinary-forum/entity/forum';
import { HttpAdaptor } from 'app/core';
import { BaseService } from 'app/core';
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { FormDataUtil } from 'app/core/utils/form-data-util';
import { Pagination } from 'app/core/entity/pagination';
import { SubjectActivity } from '../entity/subject-activity';
@Injectable()
export class SubjectActivityApiService extends BaseService<SubjectActivity> {
    constructor(protected httpAdaptor: HttpAdaptor) {
        super(httpAdaptor.http, httpAdaptor, '/api/subject');
    }

    publish(ids: number[]) {
        return this.batchOperate('publish', ids);
    }

    disPublish(ids: number[]) {
        return this.batchOperate('disPublish', ids);
    }

    superior(ids: number[]) {
        return this.batchOperate('superior', ids);
    }

    disSuperior(ids: number[]) {
        return this.batchOperate('disSuperior', ids);
    }
    initMaterialGroup(id: number) {
        return this.httpAdaptor.post(`${this.url}/${id}/initMaterialGroup`, null);
    }
    hasComponent(id: number) {
        return this.httpAdaptor.get(`${this.url}/${id}/component`);
    }
    initComponent(id: number) {
        return this.httpAdaptor.post(`${this.url}/${id}/component`, null);
    }
    getAllComponents(id: number) {
        return this.httpAdaptor.get(`${this.url}/${id}/component/list`);
    }
    publishComponent(id: number) {
        return this.httpAdaptor.post(`${this.url}/${id}/component/publish`, null);
    }
    disPublishComponent(id: number) {
        return this.httpAdaptor.post(`${this.url}/${id}/component/disPublish`, null);
    }
    moveUp(subjectId: number, cId: number) {
        return this.httpAdaptor.post(`${this.url}/${subjectId}/component/${cId}/moveup`, null);
    }
    moveDown(subjectId: number, cId: number) {
        return this.httpAdaptor.post(`${this.url}/${subjectId}/component/${cId}/movedown`, null);
    }
    getForum(subjectId: any): Observable<Forum> {
        return this.httpAdaptor.get(`${this.url}/${subjectId}/Forum`);
    }
}

