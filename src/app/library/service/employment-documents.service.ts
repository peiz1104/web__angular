import { Injectable } from '@angular/core';
import { BaseService, HttpAdaptor } from "app/core";
import { EmploymentDocuments } from "app/library/entity/employment-documents";
import { Pagination, HttpUtils } from '../../core';
import { Observable } from 'rxjs/Observable';
import { Teacher } from '../entity/teacher';

import { FormDataUtil } from 'app/core/utils/form-data-util';

@Injectable()
export class EmploymentDocumentsService extends BaseService<EmploymentDocuments> {
    constructor(protected httpAdaptor: HttpAdaptor) {
        super(httpAdaptor.http, httpAdaptor, '/api/employment/documents');
    }



    lookTeacher(param): Observable<Pagination<Teacher>> {
        return this.http.get('/api/employment/documents/teacher/list', { params: param })
            .map(HttpUtils.extractData)
            .catch(HttpUtils.handleError);
    }
    // 培训班行事历列表
    candelerList(params) {
        return this.http.get(`/api/stripe/file/calendar`, { params: params })
            .map(HttpUtils.extractData)
            .catch(HttpUtils.handleError);
    }
    // 删除
    candelerDelete(ids) {
        return this.http.delete(`/api/stripe/file`, { params: { ids: ids } })
            .map(HttpUtils.extractData)
            .catch(HttpUtils.handleError)
    }
    candelercancelShare(ids) {
        return this.httpAdaptor.delete(`/api/stripe/file/group/delete/by/stripeFileIds`, {params: {stripeFileIds: ids}});
    }
    // 行事历创建
    candelerAdd(params) {
        let param = FormDataUtil.searchParamFilter(params);
        return this.http.post(`/api/stripe/file`, null, { params: param })
            .map(HttpUtils.extractData)
            .catch(HttpUtils.handleError)
    }
    // 获取单个行事历
    getCandelerFileSingle(id): Observable<any> {
        return this.http.get(`/api/stripe/file/${id}`)
            .map(HttpUtils.extractData)
            .catch(HttpUtils.handleError)
    }
    // 更新行事历
    updateCandelerFileSingle(id, params): Observable<any> {
        let formData: FormData = FormDataUtil.covert(params);
        return this.http.post(`/api/stripe/file/${id}`, formData)
            .map(HttpUtils.extractData)
            .catch(HttpUtils.handleError)
    }
    // 批量共享
    mutipleShare(stripeFileIds, userGroupIds) {
         let params = {
            stripeFileIds,
            userGroupIds
         }
         let formData: FormData = FormDataUtil.covert(params);
        return this.http.post(`/api/stripe/file/group/save/all`, formData)
            .map(HttpUtils.extractData)
            .catch(HttpUtils.handleError)
    }
    // 共享列表
    shareList(stripeFileId, params) {
        return this.http.get(`/api/stripe/file/group/${stripeFileId}`, { params: params })
            .map(HttpUtils.extractData)
            .catch(HttpUtils.handleError)
    }
    // cancle
    shareRemove(ids) {
        return this.http.delete(`/api/stripe/file/group`, { params: { ids: ids } })
            .map(HttpUtils.extractData)
            .catch(HttpUtils.handleError)
    }
    // xuanze共享
    chooseShare(stripeFileId, userGroupIds) {
        let params = { userGroupIds }
        let formData: FormData = FormDataUtil.covert(params);
        return  this.http.post(`/api/stripe/file/group/${stripeFileId}`, formData)
        .map(HttpUtils.extractData)
        .catch(HttpUtils.handleError)
    }


}
