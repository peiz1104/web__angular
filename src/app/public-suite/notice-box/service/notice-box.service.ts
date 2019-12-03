import { NoticeBox } from './../entity/notice-box';
import { Observable } from 'rxjs/Observable';
import { BaseService, HttpAdaptor } from 'app/core';
import { Injectable } from '@angular/core';

@Injectable()
export class NoticeBoxService extends BaseService<NoticeBox> {

  constructor(protected httpAdaptor: HttpAdaptor) {
    super(httpAdaptor.http, httpAdaptor, '/api/notice-boxes');
  }

  getSystemNoticeBox(): Observable<NoticeBox> {
    return this.httpAdaptor.get(`${this.url}/system-box`);
  }
  initSystemNoticeBox(): Observable<NoticeBox> {
    return this.httpAdaptor.get(`${this.url}/system-box/init`);
  }
  initOtherNoticeBox(): Observable<NoticeBox> {
    return this.httpAdaptor.post(`${this.url}/init`, null);
  }
}
