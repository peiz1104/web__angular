import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { BaseService, HttpAdaptor } from "app/core";
import { SystemForumSetting } from '../entity/systemForumSetting';
import { Forum } from '../../ordinary-forum/entity/forum';
import { FormDataUtil } from 'app/core/utils';
import { Pagination } from './../../../core/entity/pagination';
import { Impeach } from '../../ordinary-forum/entity/impeach';


@Injectable()
export class SiteForumApiService extends BaseService<Forum> {
  constructor(protected httpAdaptor: HttpAdaptor) {
    super(httpAdaptor.http, httpAdaptor, '/api/admin/siteForum');
  }

  initForum(): Observable<Forum> {
    return this.httpAdaptor.get(`${this.url}/init`);
  }

  getForum(): Observable<Forum> {
    return this.httpAdaptor.get(`${this.url}/get`);
  }

  /**
   * 获取当前站点下的所有活动和课程讨论
   */
  getForums(): Observable<Forum[]> {
    return this.httpAdaptor.get(`${this.url}/siteForum`);
  }

  impeachlist(forumId: number, params?: any, page?: Pagination<Impeach>): Observable<Pagination<Impeach>> {
    params = params || {};
    if (page) {
      params['size'] = page.size;
      params['page'] = page.number;
    };
    let param = FormDataUtil.searchParamFilter(params);
    return this.httpAdaptor.get(this.url + `/${forumId}/list`, { params: param });
  }

}
