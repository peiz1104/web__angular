import { Injectable } from '@angular/core';
import {HttpAdaptor} from "../../core/http/http-adaptor";
import {FormDataUtil} from "../../core/utils/form-data-util";
import {BaseService} from "../../core/service/base.service";
import {TrainingClass} from "../../training/entity/training-class";


@Injectable()
export class ManualCallInterfaceService extends BaseService<TrainingClass>{

  constructor(protected httpAdaptor: HttpAdaptor) {
    super (httpAdaptor.http, httpAdaptor, '/api/manualcallinterface/', );
  }


  callInterface(params) {
    let formData: FormData = FormDataUtil.covert(params);
    return this.httpAdaptor.post(`/api/manualcallinterface/sub`, formData);
  }
}
