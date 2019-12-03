import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { HttpAdaptor, Pagination } from 'app/core';
import { TrainingClass } from '../../../training/entity/training-class';
import { FormDataUtil } from 'app/core/utils';

@Injectable()
export class ProxyRegisterApiService {

    private baseUrl = '/api/assist/tbc/{classId}';

    constructor(private httpAdaptor: HttpAdaptor) { }

    getBaseUrl(classId) {
        return this.baseUrl.replace("{classId}" , classId);
    }

    getAllOfPage(params?: any, page?: Pagination<TrainingClass>): Observable<Pagination<TrainingClass>> {
        params = params || {};
        if (page) {
            params['size'] = page.size;
            params['page'] = page.number;
        };
        let param = FormDataUtil.searchParamFilter(params);
        return this.httpAdaptor.get(`/api/training/implement/proxyRegister/tbclist`, { params: param });
    }

    getOne(classId: any): Observable<TrainingClass> {
        return this.httpAdaptor.get(this.getBaseUrl(classId));
    }

    create(entity: TrainingClass): Observable<TrainingClass> {
        return this.httpAdaptor.put(this.getBaseUrl(entity['id']), entity);
    };

    update(entity: TrainingClass): Observable<TrainingClass> {
        let formData: FormData = FormDataUtil.covert(entity);
        return this.httpAdaptor.post(this.getBaseUrl(entity['id']), formData);
    }

    delete(classId, ids: any[]): Observable<any> {
        return this.httpAdaptor.delete(this.getBaseUrl(classId) + `/delete`, { params: { ids: ids } });
    }
    archive(classId, ids: number[]) {
        return this.batchOperate(classId,  `archive`, ids);
    }

    disArchive(classId, ids: number[]) {
        return this.batchOperate(classId, `disArchive`, ids);
    }

    initMaterialGroup(classId) {
        return this.httpAdaptor.post(this.getBaseUrl(classId) + `/initMaterialGroup`, null);
    }

    protected batchOperate(classId, action: string, ids: number[]) {
        return this.httpAdaptor.post(this.getBaseUrl(classId) + `/${action}`, null, { params: { ids: ids } });
    }
    // 根据培训班id获取信息（必修requiredConditionid,选修openConditionid）
    gettrainingdetail(id?: any): Observable<any> {
        return this.httpAdaptor.get(`/api/training/implement/${id}`)
    }
    // 人员类型
    getpersonne(): Observable<any> {
        return this.httpAdaptor.get(`/api/usertypes/all`)
    }
    // 人员组织
    getOrganization(params?): Observable<any> {
        return this.httpAdaptor.get(`/api/learner/usergroup`, { params: params })
    }
    // 请求必修选修列表
    getopenrequirelist(params?: any): Observable<any> {
        return this.httpAdaptor.get(`/api/learner/trainingClasses/proxy`, { params: params })
    }
    // 请求必修选修列表
    getCiUser(params?: any): Observable<any> {
        let formData: FormData = FormDataUtil.covert(params);
        return this.httpAdaptor.post(`/api/learner/trainingClasses/proxy/ciUser`, formData)
    }
    // 删除对应人员
    deleteuser(conditionId: any, ids: any): Observable<any> {
        return this.httpAdaptor.delete(`/api/condition/${conditionId}/terms`, { params: { ids: ids } })
    }
    // 添加代理注册人
    addResUser(params?: any, username?: any): Observable<any> {
        let formData: FormData = FormDataUtil.covert(params);
        return this.httpAdaptor.post(`/api/learner/trainingClasses/proxy/addUser?username=${username}`, formData)
    }
    importProgress(taskKey: string): Observable<any> {
        return this.httpAdaptor.get(`/api/learner/trainingClasses/importProgress`, { params: { taskKey: taskKey } });
    }

    import(annualPlanId: number, taskKey: string) {
        // tslint:disable-next-line:max-line-length
        return this.httpAdaptor.put(`/api/learner/trainingClasses/import`, null, { params: { conditionId: annualPlanId, taskKey: taskKey } });
    }
}
