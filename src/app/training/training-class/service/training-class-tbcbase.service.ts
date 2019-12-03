import { Injectable } from '@angular/core';
import {BaseService} from "../../../core/service/base.service";
import {TbcBase} from "../../entity/tbc-base";
import {HttpAdaptor} from "../../../core/http/http-adaptor";
import {Observable} from "rxjs/Observable";
import {FormDataUtil} from "../../../core/utils/form-data-util";
import {Pagination} from "../../../core/entity/pagination";
import {TrainBase} from "../../../library/entity/train-base";
import {HttpUtils} from "../../../core/http/http-utils";
import {BaseWifi} from "../../entity/base-wifi";
import {ChaZhanLocation} from "../../../library/entity/chazhan-location";

@Injectable()
export class TrainingClassTbcbaseService extends BaseService<TbcBase>{

  constructor(protected httpAdaptor: HttpAdaptor) {
    super(httpAdaptor.http, httpAdaptor, '/api/training/base');
  }
  getrainingClassTbcbase(params?: any): Observable<any> {
    let param = FormDataUtil.searchParamFilter(params);
    return this.httpAdaptor.get('/api/training/base/list', { params: param });
  }

  pageList(params?: any): Observable<Pagination<TrainBase>> {
    return this.http.get('/api/training/base/listtrainbase', { params: params })
      .map(HttpUtils.extractData)
      .catch(HttpUtils.handleError);
  }

  add(offeringId: number, trainBases: number[]): Observable<any> {
    return this.httpAdaptor.put(`/api/training/base/${offeringId}/trainBases`, null, { params: { trainBasesId: trainBases,offeringId:offeringId }});
  }


  deleteTbcBase(ids) {
    return this.httpAdaptor.delete(`/api/training/base/`, { params: { ids: ids } })
  }

  lookWifi(params?: any): Observable<Pagination<BaseWifi>> {

    let param = FormDataUtil.searchParamFilter(params);
    return this.http.get('/api/training/base/wifilist', { params: param })
      .map(HttpUtils.extractData)
      .catch(HttpUtils.handleError);
  }

  lookPick(params?: any): Observable<Pagination<BaseWifi>> {
    let param = FormDataUtil.searchParamFilter(params);
    return this.http.get('/api/training/base/picklist', { params: param })
      .map(HttpUtils.extractData)
      .catch(HttpUtils.handleError);
  }
}
