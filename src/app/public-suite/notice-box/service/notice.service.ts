import { FormDataUtil } from './../../../core/utils/form-data-util';
import { NoticeBox } from './../entity/notice-box';
import { Notice } from './../entity/notice';
import { Observable } from 'rxjs/Observable';
import { Pagination } from './../../../core/entity/pagination';
import { BaseService, HttpAdaptor } from 'app/core';
import { Injectable } from '@angular/core';

@Injectable()
export class NoticeService extends BaseService<Notice> {

    constructor(protected httpAdaptor: HttpAdaptor) {
        super(httpAdaptor.http, httpAdaptor, '/api/notices');
    }

    getAllOfPage(box: NoticeBox, params?: any): Observable<Pagination<Notice>> {
        return this.httpAdaptor.get(`/api/notice-boxes/${box.id}/notices`, { params: params });
    }

    publish(ids: string[]): Observable<any> {
        let formData = FormDataUtil.toArrayFileds('ids', ids);
        return this.httpAdaptor.post(`${this.url}/publish`, formData);
    }
    cancel(ids: string[]): Observable<any> {
        let formData = FormDataUtil.toArrayFileds('ids', ids);
        return this.httpAdaptor.post(`${this.url}/cancel`, formData);
    }

    moveUp(noticeId: string, box: NoticeBox, params?: any, page?: Pagination<Notice>): Observable<any> {
        params = params || {};
        if (page) {
            params['size'] = page.size;
            params['page'] = page.number;
        }
        return this.httpAdaptor.get(`${this.url}/${box.id}/${noticeId}/up`, { params: params });
    }

    moveDown(noticeId: string, box: NoticeBox, params?: any, page?: Pagination<Notice>): Observable<any> {
        params = params || {};
        if (page) {
            params['size'] = page.size;
            params['page'] = page.number;
        }
        return this.httpAdaptor.get(`${this.url}/${box.id}/${noticeId}/down`, { params: params });
    }

    deleteFile(fileId: number, noticeId: string): Observable<void> {
        return this.httpAdaptor.get(`${this.url}/deleteFile/${noticeId}`, { params: {fileId: fileId} });
    }

}
