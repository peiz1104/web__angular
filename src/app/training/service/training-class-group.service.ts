import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import {
  Pagination,
  HttpAdaptor,
  BaseService
} from 'app/core';
import { FormDataUtil } from 'app/core/utils/form-data-util';

@Injectable()
export class TrainingClassGroupService extends BaseService<any> {
  constructor(protected httpAdaptor: HttpAdaptor) {
    super(httpAdaptor.http, httpAdaptor, '/api/offering/group');
  }

  getAllGroup(trainingId: number): Observable<any> {
    return this.httpAdaptor.get(this.url + `/${trainingId}`);
  }

  createGroup(param: any, trainingId: number): Observable<any> {
    return this.httpAdaptor.post(this.url + `/${trainingId}/create`, param);
  }

  updateGroup(param: any): Observable<any> {
    let formdata = FormDataUtil.covert(param);
    return this.httpAdaptor.post(this.url + `/update`, formdata);
  }
  deleteGroup(groupId: number): Observable<any> {
    return this.httpAdaptor.delete(this.url + `/${groupId}/update`);
  }
}
