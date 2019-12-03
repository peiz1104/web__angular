import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { HttpAdaptor } from '../../../core/http/http-adaptor';
import { BaseService } from './../../../core/service/base.service';
import { Pagination, HttpUtils } from '../../../core';
import { OrganizeGroup } from 'app/planning/organize-group/entity/organize-group';


@Injectable()
export class OrganizeGroupService extends BaseService<any> {
    constructor(protected httpAdaptor: HttpAdaptor) {
        super(httpAdaptor.http, httpAdaptor, '/api/subgroup');
    }
    // 获取城市分类列表的api
    gitOrganizeList() {
        return this.httpAdaptor.get('/api/subgroup');
    }
    pageList(params?: any): Observable<Pagination<OrganizeGroup>> {
        return this.http.get('/api/subgroup', { params: params })
            .map(HttpUtils.extractData)
            .catch(HttpUtils.handleError);
    }
    // 查询城市分类列表的api
    switchOrganizeList(cityname) {
        return this.httpAdaptor.post('/api/subgroup', { params: cityname });
    }
    // 选择城市的列表
    selectList(id): Observable<Pagination<OrganizeGroup>> {
        //  return this.http.get(`/api/subgroup/${city_id}/ug/list`, { params: param })
        return this.http.get(`/api/sub/user/group`, { params: { sub_group_id: id } })
            .map(HttpUtils.extractData)
            .catch(HttpUtils.handleError);

    }
    selectListright(id): Observable<Pagination<OrganizeGroup>> {
        //  return this.http.get(`/api/subgroup/${city_id}/ug/list`, { params: param })
        return this.http.get(`/api/sub/user/group/prior/list`, { params: { sub_group_id: id } })
            .map(HttpUtils.extractData)
            .catch(HttpUtils.handleError);

    }

    selectListadd(data): Observable<Pagination<OrganizeGroup>> {
        return this.http.post(`/api/subgroup`, null, { params: data })
            .map(HttpUtils.extractData)
            .catch(HttpUtils.handleError);

    }
    edit(data, id): Observable<Pagination<OrganizeGroup>> {
        return this.http.post(`/api/subgroup/${id}`, null, { params: data })
            .map(HttpUtils.extractData)
            .catch(HttpUtils.handleError);

    }

    // 删除城市列表选中项
    selectDelect(ids: number[]): Observable<void> {
        return this.http.delete(`/api/sub/user/group`, { params: { ids: ids }, withCredentials: true })
            .map(HttpUtils.extractData)
            .catch(HttpUtils.handleError);
    }
    // 在分组中新增组织
    addUserGroup(id, ids: number[]): Observable<void> {
        ;
        return this.http.post(`/api/sub/user/group/${id}/add/ug`, null, { params: { ugId: ids } })
            .map(HttpUtils.extractData)
            .catch(HttpUtils.handleError);

    }



    // 编辑分组
    editGroup(id: number, value: any) {
        return this.httpAdaptor.post(`/api/subgroup/${id}`, value);
    }
    // 删除分组
    delete(ids: number[]): Observable<void> {
        return this.http.delete('/api/subgroup', { params: { ids: ids }, withCredentials: true })
            .map(HttpUtils.extractData)
            .catch(HttpUtils.handleError);
    }


    // 余额优先组织上下移
    updateOrder(upugid, ugid, sugid, orderno, ugorderno) {
        return this.http.post('/api/sub/user/group', null,
            { params: { upugid: upugid, ugid: ugid, sugid: sugid, orderNO: orderno, ugOrderNo: ugorderno }, withCredentials: true })
    }

    // 余额优先组织删除
    setOrderIsZero(ids: number[], sugid) {
        return this.http.post('/api/sub/user/group/delete', null,
            { params: { ugIds: ids, sugId: sugid }, withCredentials: true })
    }

    // 余额优组织添加
    addYxGroup(ids: number[], sugid) {
        console.log(ids);
        console.log(sugid);
        return this.http.post('/api/sub/user/group/add', null,
            { params: { ugIds: ids, sugId: sugid }, withCredentials: true })
    }
}
