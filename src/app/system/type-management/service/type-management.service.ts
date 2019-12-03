import { Injectable } from '@angular/core';
import {BaseService} from "../../../core/service/base.service";
import {HttpAdaptor} from "../../../core/http/http-adaptor";
import {TypeManagement} from "../entity/type-management";
import {Observable} from "rxjs/Observable";
import {HttpUtils} from "../../../core/http/http-utils";
import {Pagination} from "../../../core/entity/pagination";

@Injectable()
export class TypeManagementService extends BaseService<TypeManagement> {

  constructor(protected httpAdaptor: HttpAdaptor) {
    super(httpAdaptor.http, httpAdaptor, '/api/system/typemanagement');
  }


  pageList(params?: any): Observable<Pagination<TypeManagement>> {
    return this.http.get('/api/system/typemanagement', { params: params })
      .map(HttpUtils.extractData)
      .catch(HttpUtils.handleError);
  }


  saveUpdate(typeManagement: TypeManagement): Observable<TypeManagement> {
    let id = typeManagement.id;

    return this.httpAdaptor.post(`${this.url}/${id}`, typeManagement);
  }
}
