import { BaseService } from './../../core/service/base.service';
import { FormDataUtil } from './../../core/utils/form-data-util';
import { MessageReceiveConfig } from './../entity/message-receive-config';
import { Observable } from 'rxjs/Observable';
import { HttpAdaptor } from './../../core/http/http-adaptor';
import { Injectable } from '@angular/core';

@Injectable()
export class MessageReceiveConfigService extends BaseService<MessageReceiveConfig> {
  baseUrl = "/api/account/message/config";
  constructor(protected httpAdaptor: HttpAdaptor) {
    super(httpAdaptor.http, httpAdaptor, "/api/account/message/config");
   }

  updateReceiveEmailConfig (config: MessageReceiveConfig): Observable<any> {
    let formData: FormData  = FormDataUtil.covert(config);
    return this.http.post(`${this.baseUrl}/receiveEmail`, formData);
  }

  updateReceiveSmsConfig (config: MessageReceiveConfig): Observable<any> {
    let formData: FormData  = FormDataUtil.covert(config);
    return this.http.post(`${this.baseUrl}/receiveSms`, formData);
  }

  resetMessageConfig (): Observable<any> {
    return this.http.delete(`${this.baseUrl}`);
  }
}
