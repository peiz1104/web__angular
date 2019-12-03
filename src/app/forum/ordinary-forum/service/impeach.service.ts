import { TopicReply } from './../entity/topicReply';
import { Injectable } from '@angular/core';
import { BaseService, HttpAdaptor } from "app/core";
import { Impeach } from '../entity/impeach';
import { Pagination } from './../../../core/entity/pagination';
import { Observable } from 'rxjs/Observable';
import { FormDataUtil } from 'app/core/utils';
import { Topic } from '../entity/topic';

@Injectable()
export class ImpeachService extends BaseService<Impeach> {
    // 每个接口最终的公共路径为：  admin/forum/{forumId}/impeach， -------必须拼接/{forumId}/impeach
    constructor(protected httpAdaptor: HttpAdaptor) {
        super(httpAdaptor.http, httpAdaptor, `/api/admin/forum/impeach`);
    }

    list(forumId: number, params?: any, page?: Pagination<Impeach>): Observable<Pagination<Impeach>> {
        params = params || {};
        if (page) {
            params['size'] = page.size;
            params['page'] = page.number;
        };
        let param = FormDataUtil.searchParamFilter(params);
        return this.httpAdaptor.get(this.url + `/${forumId}/list`, { params: param });
    }

    handled(ids: number[]) {
        return this.httpAdaptor.get(this.url + `/handled`, { params: { "ids[]": ids } });
    }
    unhandled(ids: number[]) {
        return this.httpAdaptor.get(this.url + `/unhandled`, { params: { "ids[]": ids } });
    }
    deleteImpeach(ids: number[]) {
        return this.httpAdaptor.delete(this.url + `/delete`, { params: { "ids[]": ids } });
    }

    getReply(replyId: any): Observable<TopicReply> {
        return this.httpAdaptor.get(this.url + `/reply/${replyId}`);
    }

    updateTopic(impeachId: number, entity: Topic): Observable<Topic> {
        let formData: FormData = FormDataUtil.covert(entity);
        return this.httpAdaptor.post(this.url + `/${impeachId}/updateTopic`, formData);
    }

    updateReply(impeachId: number, entity: TopicReply): Observable<Topic> {
        let formData: FormData = FormDataUtil.covert(entity);
        return this.httpAdaptor.post(this.url + `/${impeachId}/updateReply`, formData);
    }
}
