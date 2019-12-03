import { InnerMessage } from './../entity/inner-message';
import { Http } from '@angular/http';
import { BaseService } from 'app/core';
import { MessageType } from './../entity/message-type';
import { Observable } from 'rxjs/Observable';
import { HttpAdaptor } from './../../core/http/http-adaptor';
import { Injectable } from '@angular/core';

@Injectable()
export class MessageService extends BaseService<InnerMessage> {
  baseUrl = "/api/account/message";
  constructor(protected httpAdaptor: HttpAdaptor) {
    super(httpAdaptor.http, httpAdaptor, "/api/account/message");
   }

  findMessagTypes(): Observable<MessageType[]> {
    return this.httpAdaptor.get(`${this.baseUrl}/types`);
  }

}
