import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { OrgTreeApiService } from 'app/shared/api';
import { HttpAdaptor } from 'app/core';
import { Pagination, HttpUtils } from '../../core/';
import { FormDataUtil } from '../../core/utils/form-data-util';

@Injectable()
export class PeriodApiService {

    constructor(private http: HttpAdaptor) {
    }
    // 获取学员学时列表
    getpersonlist(id, params): Observable<any> {
        return this.http.get(`/api/period/teacher/self-list/${id}`, { params: params })
    }
    // 批量删除
    batchDelete(ids) {
        return this.http.delete(`/api/learner/period`, { params: { ids: ids } })
    }
    // daoru
    importProgress(taskKey: string): Observable<any> {
        return this.http.get(`/api/period/teacher/importProgress`, { params: { taskKey: taskKey } });
    }
    import(annualPlanId?: any, departId?: any, taskKey?: any) {
        // tslint:disable-next-line:max-line-length
        return this.http.put(`/api/period/teacher/import/${departId}`, null, { params: { taskKey: taskKey } });
    }
    downloaderrorfile(params) {
        return this.http.get(`/api/learner/period/exportErrorList`, { params: params })
    }
    downloadhourfile() {
        return this.http.get(`/api/period/active/tmp-download`)
    }
    exportdownloaderror(res) {
        window.location.href = "/api/period/usersummary/exportdownload?fileName=" + res.fileName + "&sessionName=" + res.sessionName;
    }

    // 学时审核列表
    getauditinglist(params?: any) {
        return this.http.get(`/api/period/teacher/list`, { params: params })
    }
    // 获取个人学时审核信息
    getdeclaremesage(id) {
        return this.http.get(`/api/period/teacher/${id}/approve`)
    }
    // 学时审核的通过和拒绝
    passrefusehour(activeId?: any, params?: any) {
        return this.http.put(`/api/period/teacher/${activeId}/apprvoe`, params)
    }
    // 获取全部分类类型
    gettraintypeall() {
        return this.http.get(`/api/period/traintype/all`);
    }
    // 培训方式
    gettrainweyall() {
        return this.http.get(`/api/period/trainwey/all`);
    }
    // peixun主题
    gettraintheme() {
        return this.http.get(`/api/period/traintheme/all`)
    }
    // 培训来源
    gettrainsource() {
        return this.http.get(`/api/period/trainsource/all`)
    }
    // 主办单位api
    gettrainunit(params) {
        return this.http.get(`/api/learner/usergroup`, { params: params })
    }
    // 编辑单个学时任务的详情查看
    viewperiod(id) {
        return this.http.get(`/api/learner/period/${id}`);
    }
    // 根据id查看所有的父级
    getAllparent(id) {
        return this.http.get(`/api/period/traintype/parents/`, { params: { id: id } })
    }
    // 编辑学时保存
    editperiod(id, deId, params) {
        let formData: FormData = FormDataUtil.covert(params);
        return this.http.post(`/api/period/teacher/${id}/${deId}`, formData)
    }
    // 申报学时手工添加
    addperiod(id, params) {
        /*let formData: FormData = FormDataUtil.covert(params);*/
        return this.http.put(`/api/period/teacher/other/${id}`, params);
    }
    // 提交
    submitperiod(params) {
        let formData: FormData = FormDataUtil.covert(params);
        return this.http.post(`/api/period/teacher/refer`, formData)
    }
    // 获取结转年份
    getCarryOverYear() {
        return this.http.get(`/api/period/yearstask/max-period-isCarryOver`)
    }
    // 请求用户组列表
    getUserGroupList(params) {
        return this.http.get(`/api/period/teacher/user-list-all`, { params: params })
    }
    // 查看某一学员的学时详情
    getUserDetailPeriod(params) {
        return this.http.get(`/api/period/teacher/history`, { params: params })
    }
    getperiodDetail(year, params) {
        return this.http.get(`/api/period/teacher/history/${year}`, { params: params })
    }
    // 学时申报导出
    periodAuditExport(params) {
        return this.http.post(`/api/period/teacher/exportPeriodActiveInformation`, null, { params: params })
    }
    // 学时历史导出
    periodexportHour(params: any) {
        return this.http.post(`/api/period/teacher/exportHistory`, null, { params: params });
    }
    // 学时历史详情导出
    periodexportDetailHour(params: any) {
        return this.http.post(`/api/period/teacher/export`, null, { params: params })
    }
    // 下载
    periodDownload(res) {
        return window.location.href = '/api/period/usersummary/exportdownload?fileName=' + res.fileName + '&sessionName=' + res.sessionName;
    }
    // 查看学时日志
    getPeriodAuditLogByPeriodId(params) {
        return this.http.get(`/api/learner/period/approve-list`, { params: params })
    }
    // 判断是否可以添加导入
    judgeImportantAdd() {
        return this.http.get(`/api/period/teacher/isOpen`)
    }
    // 部门列表接口
    departmentList(params) {
        return this.http.get(`/api/period/project`, { params: params })
    }
    // 删除
    departmentDelete(ids) {
        return this.http.delete(`/api/period/project`, { params: { ids: ids } });
    }
    // 添加
    departmentAdd(params) {
        return this.http.put(`/api/period/project`, params)
    }
    departmentEdit(id, params) {
        let formData: FormData = FormDataUtil.covert(params);
        return this.http.post(`/api/period/project/${id}`, formData)
    }
    // depar
    departmentGetDetail(id) {
        return this.http.get(`/api/period/project/${id}`)
    }
    // 批量审核
    mutipleRfuse(params) {
        let formData: FormData = FormDataUtil.covert(params);
        return this.http.put(`/api/period/teacher/approve`, params)
    }
}
