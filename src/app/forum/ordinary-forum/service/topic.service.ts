import { Pagination } from './../../../core/entity/pagination';
import { FormDataUtil } from 'app/core/utils';
import { Topic } from './../entity/topic';
import { Injectable } from '@angular/core';
import { BaseService, HttpAdaptor } from "app/core";
import { Observable } from 'rxjs/Observable';

@Injectable()
export class TopicService extends BaseService<Topic> {
  // 每个接口最终的公共路径为：  /api/admin/forum/${forumId}/topic， -------必须拼接/${forumId}/topic
  constructor(protected httpAdaptor: HttpAdaptor) {
    super(httpAdaptor.http, httpAdaptor, '/api/admin/forum');
  }

  getAllTopic(forumId: number, params?: any, page?: Pagination<Topic>): Observable<Pagination<Topic>> {
    params = params || {};
    if (page) {
      params['size'] = page.size;
      params['page'] = page.number;
    };
    let param = FormDataUtil.searchParamFilter(params);
    return this.httpAdaptor.get(this.url + `/${forumId}/topic/list`, { params: param });
  }

  createTopic(forumId: number, topic: Topic): Observable<any> {
    console.log("待保存数据", topic);
    return this.httpAdaptor.put(this.url + `/${forumId}/topic/add`, topic);
  }

  deleteTopic(ids: number[], forumId: number) {
    return this.httpAdaptor.get(this.url + `/${forumId}/topic/delete`, { params: { "topicId[]": ids } });
  }
  setLock(ids: number[], forumId: number) {
    return this.httpAdaptor.get(this.url + `/${forumId}/topic/lock`, { params: { "topicId[]": ids } });
  }
  unlock(ids: number[], forumId: number) {
    return this.httpAdaptor.get(this.url + `/${forumId}/topic/unlock`, { params: { "topicId[]": ids } });
  }
  setLight(ids: number[], forumId: number) {
    return this.httpAdaptor.get(this.url + `/${forumId}/topic/setLight`, { params: { "topicId[]": ids } });
  }
  cancelLight(ids: number[], forumId: number) {
    return this.httpAdaptor.get(this.url + `/${forumId}/topic/cancelLight`, { params: { "topicId[]": ids } });
  }
  setTop(ids: number[], forumId: number) {
    return this.httpAdaptor.get(this.url + `/${forumId}/topic/setTop`, { params: { "topicId[]": ids } });
  }
  cancelTop(ids: number[], forumId: number) {
    return this.httpAdaptor.get(this.url + `/${forumId}/topic/cancelTop`, { params: { "topicId[]": ids } });
  }
  setSuperior(ids: number[], forumId: number) {
    return this.httpAdaptor.get(this.url + `/${forumId}/topic/setSuperior`, { params: { "topicId[]": ids } });
  }
  cancelSuperior(ids: number[], forumId: number) {
    return this.httpAdaptor.get(this.url + `/${forumId}/topic/cancelSuperior`, { params: { "topicId[]": ids } });
  }
}
