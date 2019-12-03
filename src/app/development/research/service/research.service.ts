import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { BaseService, HttpAdaptor, Pagination, HttpUtils } from "app/core";
import { FormDataUtil } from '../../../core/utils/form-data-util';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { User } from 'app/system/entity/user';
import { GreenDreamProject } from "app/development/research/entity/green-dream-project";
import { ParagraphComponent } from 'app/survey/questions/paragraph/paragraph.component';


@Injectable()
export class ResearchService extends BaseService<GreenDreamProject> {
    constructor(protected httpAdaptor: HttpAdaptor) {
        super(httpAdaptor.http, httpAdaptor, '/api/green/dream/project');
    }
    pageList(params?: any): Observable<Pagination<GreenDreamProject>> {
        return this.http.get('/api/green/dream/project', { params: params })
            .map(HttpUtils.extractData)
            .catch(HttpUtils.handleError);
    }
    // 项目取消接口
    devcancel(id, params) {
        let formData: FormData = FormDataUtil.covert(params);
        return this.http.post(`/api/green/dream/project/${id}/update/devStatus`, formData)
    }
    // 删除
    deletelist(ids) {
        return this.http.delete(`/api/green/dream/project`, { params: { ids: ids } })
    }
    // 获取单个项目信息
    getsinglemessage(id) {
        return this.http.get(`/api/green/dream/project/${id}`)
            .map(HttpUtils.extractData)
            .catch(HttpUtils.handleError);
    }
    // 查看项目详情
    getdevDetailList(id) {
        return this.http.get(`/api/project/${id}/phase/no/page`)
            .map(HttpUtils.extractData)
            .catch(HttpUtils.handleError);
    }
    // 编辑
    saveEdit(id, params) {
        let formData: FormData = FormDataUtil.covert(params);
        return this.http.post(`/api/green/dream/project/${id}/update`, formData)
    }
    // 项目阶段列表
    getsteplist(id, params) {
        return this.http.get(`/api/project/${id}/phase`, { params: params })
            .map(HttpUtils.extractData)
            .catch(HttpUtils.handleError);
    }
    // 获取登录人信息
    getloginusermessage(id, params) {
        return this.http.get(`/api/project/${id}/phase/get/userToken`)
            .map(HttpUtils.extractData)
            .catch(HttpUtils.handleError);
    }
    // 查看单个项目阶段信息
    getdevstageDetail(id, phaseId) {
        return this.http.get(`/api/project/${id}/phase/${phaseId}`)
            .map(HttpUtils.extractData)
            .catch(HttpUtils.handleError);
    }
    
    // 删除阶段
    deletePashList(id,ids) {
        return this.http.delete(`/api/project/${id}/phase`, { params: { ids: ids } })
    }
    // 获取项目剩余费用
    getrestMoney(id) {
        return this.http.get(`/api/project/${id}/phase/rest/money`)
            .map(HttpUtils.extractData)
            .catch(HttpUtils.handleError);
    }
    // 阶段项目添加
    addstage(id, params) {
        let formData: FormData = FormDataUtil.covert(params);
        return this.http.put(`/api/project/${id}/phase`, params)
    }
    // 阶段项目编辑
    editstage(id, phaseId, params) {
        let formData: FormData = FormDataUtil.covert(params);
        return this.http.post(`/api/project/${id}/phase/${phaseId}`, formData)
    }
    // 阶段获取人员列表的
    getstageList(id, params) {
        return this.http.get(`/api/phase/${id}/dev/person`, { params: params })
            .map(HttpUtils.extractData)
            .catch(HttpUtils.handleError);
    }
    // 阶段步骤添加人员
    addstageUser(id, params) {
        let formData: FormData = FormDataUtil.covert(params);
        return this.http.put(`/api/phase/${id}/dev/person`, params)
    }
    // 阶段步骤编辑回显
    editshow(id, pid) {
        return this.http.get(`/api/phase/${id}/dev/person/${pid}`)
            .map(HttpUtils.extractData)
            .catch(HttpUtils.handleError);
    }
    // 阶段步骤编辑保存
    savestageedit(id, pid, params) {
        let formData: FormData = FormDataUtil.covert(params);
        return this.http.post(`/api/phase/${id}/dev/person/${pid}`, formData)
    }
    // 项目阶段步骤人员配置删除
    deletestageUser(id, ids) {
        return this.http.delete(`/api/phase/${id}/dev/person`, { params: { ids: ids } })
    }
    // 阶段步骤获取已有人员的ids
    gethasuserids(id) {
        return this.http.get(`/api/phase/${id}/dev/person/get/userIds`)
            .map(HttpUtils.extractData)
            .catch(HttpUtils.handleError);
    }
    // 讲师配置列表
    getteacherList(id, params) {
        return this.http.get(`/api/phase/${id}/dev/teacher`, { params: params })
            .map(HttpUtils.extractData)
            .catch(HttpUtils.handleError);
    }
    // 添加讲师列表
    addteacherList(id, params) {
        return this.http.get(`/api/phase/${id}/dev/teacher/list`, { params: params })
            .map(HttpUtils.extractData)
            .catch(HttpUtils.handleError);
    }
    // 添加讲师
    addteacher(id, params) {
        return this.http.put(`/api/phase/${id}/dev/teacher`, params);
    }
    // 讲师的删除
    deleteteachers(id, ids) {
        return this.http.delete(`/api/phase/${id}/dev/teacher`, { params: { ids: ids } })
    }
    // 步骤课时审核列表
    getcourseList(id, params) {
        return this.http.get(`/api/phase/${id}/dev/teacher/review/list`, { params: params })
            .map(HttpUtils.extractData)
            .catch(HttpUtils.handleError);
    }
    // buzou课时快速生成
    fastgetcoursehour(id) {
        return this.http.post(`/api/phase/${id}/dev/teacher/add/all/course/hour`, null)
    }
    // 阶段步骤添加课程
    addcourse(id, params) {
        let formData: FormData = FormDataUtil.covert(params);
        return this.http.put(`/api/phase/${id}/dev/teacher/add/course/hour`, params)
    }
    // 获取项目名称
    getdevname(id) {
        return this.http.get(`/api/green/dream/project/${id}`)
            .map(HttpUtils.extractData)
            .catch(HttpUtils.handleError)
    }
    // 阶段步骤删除
    deletecourse(id, params) {
        return this.http.delete(`/api/phase/${id}/dev/teacher/update/course/hour`, { params: params })
    }
    // 课程复核编辑回显
    geteditcoursemessage(id, teacherId) {
        return this.http.get(`/api/phase/${id}/dev/teacher/${teacherId}`)
            .map(HttpUtils.extractData)
            .catch(HttpUtils.handleError);
    }
    // jie段步骤编辑保存
    saveEditCourse(id, teacherId, params) {
        let formData: FormData = FormDataUtil.covert(params);
        return this.http.post(`/api/phase/${id}/dev/teacher/${teacherId}`, formData)

    }
    // 获取阶段研发成果及阶段评估列表
    getresearchachiList(id, params) {
        return this.http.get(`/api/phase/${id}/assess/result`, { params: params })
            .map(HttpUtils.extractData)
            .catch(HttpUtils.handleError);
    }
    // 阶段成果评估tian加
    addachieve(id, params) {
        return this.http.put(`/api/phase/${id}/assess/result`, params)
    }
    // 阶段成果编辑huixian
    showachieve(id, pharId) {
        return this.http.get(`/api/phase/${id}/assess/result/${pharId}`)
            .map(HttpUtils.extractData)
            .catch(HttpUtils.handleError);
    }
    // 阶段成果编辑保存
    saveachieve(id, pharId, params) {
        let formData: FormData = FormDataUtil.covert(params);
        return this.http.post(`/api/phase/${id}/assess/result/${pharId}`, formData)
    }
    // 阶段删除
    deleteachieve(id, ids) {
        return this.http.delete(`/api/phase/${id}/assess/result`, { params: { ids: ids } })
    }
    // 结班管理基本费用列表
    endclassmanagebaselist(params) {
        return this.httpAdaptor.get(`/api/trainfee/base-fee-list`, { params: params })
    }
    // 查询单个费用
    getlooksinglecost(id) {
        return this.httpAdaptor.get(`/api/trainfee/base-fee/${id}`)
    }
    // 手工添加基本费用
    handeladdbasecost(params) {
        // let formData: FormData = FormDataUtil.covert(params);
        return this.httpAdaptor.put(`/api/trainfee/base-fee`, params)
    }
    // 获取费用类型
    getcostType(params) {
        return this.httpAdaptor.get(`/api/trainfee/fee-type`, { params: params })
    }
    // 删除基本费用
    deletebasecost(ids?: any) {
        return this.httpAdaptor.delete(`/api/trainfee/base-fee`, { params: { ids: ids } })
    }
    // 获取基本信息
    getfeebasemesage(id) {
        return this.httpAdaptor.get(`/api/project/${id}/phase/get/fee`)
    }
    revokeOne(id: number): Observable<any> {
        return this.httpAdaptor.post(`/api/messages/revokeSend/${id}`, {});
    }
    getShort(id: any, params?: any): Observable<any> {
        return this.httpAdaptor.get(`/api/messages/shortMessages/receivers/${id}`, { params: params });
    }
    getOne(id: any): Observable<any> {
        return this.httpAdaptor.get(`/api/messages/${id}`);
    }
    getEmail(id: any, params?: any, ): Observable<any> {
        return this.httpAdaptor.get(`/api/messages/emailMessages/receivers/${id}`, { params: params });
    }
    getnoticelist(params?: any, page?: Pagination<any>): Observable<Pagination<any>> {
        params = params || {};
        if (page) {
            params['size'] = page.size;
            params['page'] = page.number;
        };
        let param = FormDataUtil.searchParamFilter(params);
        return this.httpAdaptor.get(`/api/messages`, { params: param });
    }
    getPersons(params?: any, ): Observable<any> {
        params = params || {};
        let param = FormDataUtil.searchParamFilter(params);
        return this.httpAdaptor.get(`/api/training/messages/enrolledUsers`, { params: param })
    }
    getPersonTotalInScopes(id: any): Observable<any> {
        return this.httpAdaptor.get('/api/training/messages/enrolledUserTotalInScopes', { params: { 'offeringId': id } });
    }
    createMess(id, entity: any): Observable<any> {
        let formData: FormData = FormDataUtil.covert(entity);
        return this.httpAdaptor.post(`/api/project/${id}/phase/save/message`, entity);
    };
    // 请求用户组列表
    getUserGroupList(params) {
        return this.httpAdaptor.get(`/api/logicalGroup`, { params: params })
    }


    // 阶段人员配置批量导入
        //导入exl
        import(taskKey: string,id) {
            return this.httpAdaptor.put(`/api/phase/${id}/dev/person/doImport`, null, { params: { taskKey: taskKey } });
        }
    
        //导入进度
        importProgress(taskKey: string,id): Observable<any> {
            return this.httpAdaptor.get(`/api/phase/${id}/dev/person/importProgress`, { params: { taskKey: taskKey } });
        }
    
        //下载模板
        download(id) {
            window.location.href = '/api/phase/${id}/dev/person/download';
        }

}
