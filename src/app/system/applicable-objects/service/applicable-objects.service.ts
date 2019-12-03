import { Injectable } from '@angular/core';
import {BaseService} from "../../../core/service/base.service";
import {ApplicableObjects} from "../entity/applicable-objects";
import {HttpAdaptor} from "../../../core/http/http-adaptor";
import {Observable} from "rxjs/Observable";
import {HttpUtils} from "../../../core/http/http-utils";
import {Pagination} from "../../../core/entity/pagination";

@Injectable()
export class ApplicableObjectsService  extends BaseService<ApplicableObjects> {

  constructor(protected httpAdaptor: HttpAdaptor) {
    super(httpAdaptor.http, httpAdaptor, '/api/system/applicableobjects');
  }
  pageList(params?: any): Observable<Pagination<ApplicableObjects>> {
    return this.http.get('/api/system/applicableobjects', { params: params })
      .map(HttpUtils.extractData)
      .catch(HttpUtils.handleError);
  }

  saveUpdate(applicableObjects: ApplicableObjects): Observable<ApplicableObjects> {
    let id = applicableObjects.id;
    return this.httpAdaptor.post(`${this.url}/${id}`, applicableObjects);
  }
}
