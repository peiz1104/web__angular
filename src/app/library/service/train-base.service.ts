import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Pagination, HttpUtils, BaseService, HttpAdaptor } from '../../core';
import { TrainBase } from '../entity/train-base';
import { FormDataUtil } from 'app/core/utils/form-data-util';


@Injectable()
export class TrainBaseService extends BaseService<TrainBase> {
    constructor(protected httpAdaptor: HttpAdaptor) {
        super(httpAdaptor.http, httpAdaptor, '/api/trainBase');
    }
    pageList(params?: any): Observable<Pagination<TrainBase>> {
        return this.http.get('/api/trainBase', { params: params })
            .map(HttpUtils.extractData)
            .catch(HttpUtils.handleError);
    }
    delete(id: number | number[]): Observable<void> {
        if (id instanceof Number) {
            id = [].push(id);
        }
        return this.http.delete('/api/trainBase/', { params: { ids: id } })
            .map(HttpUtils.extractData)
            .catch(HttpUtils.handleError);
    }
    get(Id: number): Observable<TrainBase> {
        return this.http.get(`/api/trainBase/${Id}`)
            .map(HttpUtils.extractData)
            .catch(HttpUtils.handleError);
    }
    add(trainBase: TrainBase): Observable<TrainBase> {
        return this.http.put('/api/trainBase', trainBase)
            .map(HttpUtils.extractData)
            .catch(HttpUtils.handleError);
    }
    //获取基地编号
    getBaseNo() {
        return this.http.get(`/api/trainBase/get/base/no`)
            .map(HttpUtils.extractData)
            .catch(HttpUtils.handleError);
    }

    // 获取对应站点WiFi的数据列表
    getwifilist(params): Observable<any> {
        return this.httpAdaptor.get(`/api/train/base/wifi`, { params: params })
    }
    // 获取名称判断是否重复
    judgenamerepeat(id, params) {
        return this.httpAdaptor.get(`/api/train/base/wifi/${id}/is/exist`, { params: params })
    }
    // 天机WiFi名称
    addwifiname(params) {
        return this.httpAdaptor.put(`/api/train/base/wifi`, params);
    }
    // 获取编辑信息
    geteditmesage(id) {
        return this.httpAdaptor.get(`/api/train/base/wifi/${id}`)
    }
    // 编辑WiFi保存
    editWiFisave(id, params) {
        let formData: FormData = FormDataUtil.covert(params);
        return this.httpAdaptor.post(`/api/train/base/wifi/${id}`, formData)
    }
    // 删除添加的WiFi
    deleteaddWiFi(ids) {
        return this.httpAdaptor.delete(`/api/train/base/wifi`, { params: { ids: ids } })
    }
    // bssid列表
    getbssidList(params) {
        return this.httpAdaptor.get(`/api/train/base/wifi/bss`, { params: params })
    }
    // 添加bssid
    addbssid(params) {
        return this.httpAdaptor.put(`/api/train/base/wifi/bss`, params);
    }
    // 判断是否为名字重复
    judgebssidrepeat(id, params) {
        return this.httpAdaptor.get(`/api/train/base/wifi/bss/${id}/is/exist`, { params: params });
    }
    // huiian
    geteditbssidmesage(id) {
        return this.httpAdaptor.get(`/api/train/base/wifi/bss/${id}`)
    }
    // bianji
    editbbsIdsave(id, params) {
        let formData: FormData = FormDataUtil.covert(params);
        return this.httpAdaptor.post(`/api/train/base/wifi/bss/${id}`, formData)
    }
    // 删除
    deletebssid(ids) {
        return this.httpAdaptor.delete(`/api/train/base/wifi/bss`, { params: { ids: ids } })
    }

    // 下  载模板
    download() {
        window.location.href = '/api/train/base/wifi/download';
    }

    // 导入exl
    import(taskKey: string, trainBaseId: any) {
        return this.httpAdaptor.put(`/api/train/base/wifi/${trainBaseId}/saveImport`, null, { params: { taskKey: taskKey } });
    }

    // 导入进度
    importProgress(taskKey: string): Observable<any> {
        return this.httpAdaptor.get(`/api/train/base/wifi/importProgress`, { params: { taskKey: taskKey } });
    }
    // 获取讲师基本信息
    getTeacherBaseList(teacherId, params?: any) {
        return this.httpAdaptor.get(`/api/teacher/management/${teacherId}/teacher`, { params: params })
    }
    // 获取授课资格列表
    getTeacherAllowList(teacherId, params) {
        return this.httpAdaptor.get(`/api/teacher/empowerment/${teacherId}/list`, { params: params })
    }
    // 获取授课
    getCourseRecordList(teacherId, params) {
        let param = FormDataUtil.searchParamFilter(params);
        return this.httpAdaptor.get(`/api/teacher/management/${teacherId}/training/records`, { params: param })
    }

      //导出授课资格
      exportExl(teacherId, params) {
        let formData: FormData = FormDataUtil.covert(params);
        return this.httpAdaptor.post(`/api/teacher/management/${teacherId}/training/records/export`,formData);
    }

    //正式导出
    exportdownload(sessionName:any) {
        window.location.href = '/api/teacher/management/exportdownload?sessionName=' + sessionName;
    }

    // 条件文件管理-总公司文件 数据
    getCompanyDocuments(params?:any) {
        return this.httpAdaptor.get(`/api/stripe/file/doc`, {params});
    }
    // 条件文件管理 总公司通知
    getCompanyNotice(params?:any) {
        return this.httpAdaptor.get(`/api/stripe/file/notice`, {params});
    }
    // 条件文件管理 材料模板
    getCompanyTemplate(params?:any) {
        return this.httpAdaptor.get(`/api/stripe/file/template`, {params});
    }
    // 条件文件管理 教育
    getCompanyEdu(params?:any) {
        return this.httpAdaptor.get(`/api/stripe/file/edu`, {params})
    }
    // 条件文件管理 删除
    deleteConditionFile(ids) {
        console.log(ids);
        return this.httpAdaptor.delete(`/api/stripe/file`, {params: {ids: ids}});
    }
    cancelConditionFile(ids) {
        console.log(ids);
        return this.httpAdaptor.delete(`/api/stripe/file/group/delete/by/stripeFileIds`, {params: {stripeFileIds: ids}});
    }


    addOfficeFile(params: any): Observable<any> {
        let param = FormDataUtil.searchParamFilter(params);
        return this.http.post(`/api/stripe/file`, null, { params: param })
            .map(HttpUtils.extractData)
            .catch(HttpUtils.handleError);
    }
    getFileSingle(id): Observable<any> {
        return this.httpAdaptor.get(`/api/stripe/file/${id}`);
    }
    updateFileSingle(id,params): Observable<any> {
        let formData: FormData = FormDataUtil.covert(params);
        return this.httpAdaptor.post(`/api/stripe/file/${id}`,formData)
    }
    getIsHeadCompany(): Observable<any> {
        return this.httpAdaptor.get(`/api/stripe/file/get/userGroupIds`);
    }
    getTopUserGroup(){
        return this.httpAdaptor.get(`/api/stripe/file/get/top/userGroup`);
    }
}
