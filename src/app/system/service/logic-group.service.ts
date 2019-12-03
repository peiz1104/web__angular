import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { BaseService } from 'app/core';
import { Pagination, HttpUtils } from '../../core';
import { LogicGroup } from '../entity/logic-group';
import { HttpAdaptor } from 'app/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';



@Injectable()
export class LogicGroupService extends BaseService<LogicGroup> {
    constructor(protected httpAdaptor: HttpAdaptor) {
        super(httpAdaptor.http, httpAdaptor, '/api/logicalGroup');
    }

    updateLogicGroup(logicGroup: FormData): Observable<LogicGroup> {
        if (!logicGroup.has("id")) {
            Observable.throw('The id of case for upload must not be null');
          }
          return this.httpAdaptor.post(`/api/logicalGroup/${logicGroup.get("id")}`, logicGroup);
    }

    saveLogicGroup(logicGroup: LogicGroup): Observable<LogicGroup> {
          return this.httpAdaptor.put(`/api/logicalGroup`, logicGroup);
    }

    isPublish(id, param) {
      return this.http.post(`/api/logicalGroup/${id}/update/publish/status`, null, { params: param })
        .map(HttpUtils.extractData)
        .catch(HttpUtils.handleError);
    }
}
