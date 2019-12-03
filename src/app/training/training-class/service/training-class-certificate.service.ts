import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import {
  Pagination,
  HttpAdaptor,
  BaseService
} from 'app/core';
import { FormDataUtil } from 'app/core/utils/form-data-util';

@Injectable()
export class TrainingClassCertificateService extends BaseService<any> {
  constructor(protected httpAdaptor: HttpAdaptor) {
    super(httpAdaptor.http, httpAdaptor, '/api/offeringcert');
  }

  getLeftList(id, params?: any) {
    params = params || {};
    let param = FormDataUtil.searchParamFilter(params);
    return this.httpAdaptor.get(`/api/offeringcert/${id}`, { params: param });
  }
  getRightList(id, tbcId, params?: any, page?: Pagination<any>): Observable<Pagination<any>> {
    params = params || {};
    params['certId'] = id;
    if (page) {
      params['size'] = page.size;
      params['page'] = page.number;
    };
    params.content = null;
    let param = FormDataUtil.searchParamFilter(params);
    return this.httpAdaptor.get(`/api/trainScores/${tbcId}/awardList`, { params: param });
  }
  getCertTypeList(identify?: string) {
    let params = {};
    if (identify) {
      params['identify'] = identify;
    }
    return this.httpAdaptor.get(`/api/certType/all`, { params: params });
  }
  addCertificate(id, params) {
    return this.httpAdaptor.put(`/api/offeringcert/${id} `, params);
  }
  issuedbyCertificate(certId, tbcId, params) {
    return this.httpAdaptor.put(`/api/offeringcert/${certId}/${tbcId}`, params);
  }
  undoCertificate(id, ids: any[]) {
    return this.httpAdaptor.delete(`/api/offeringcert/${id}/delete`, { params: { ids: ids } });
  }
  deleteCertificate(id) {
    return this.httpAdaptor.delete(`/api/offeringcert`, { params: { id: id } });
  }
}
