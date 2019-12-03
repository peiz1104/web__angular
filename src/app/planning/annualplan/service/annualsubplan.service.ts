import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

import { HttpAdaptor } from './../../../core/http/http-adaptor';
import { BaseService } from './../../../core/service/base.service';
import { AnnualSubPlan } from './../entity/annualsubplan';

@Injectable()
export class AnnualSubPlanService extends BaseService<AnnualSubPlan> {
    constructor(protected httpAdaptor: HttpAdaptor) {
        super(httpAdaptor.http, httpAdaptor, '/api/annualsubplan');
    }

    deleteBatch(entity: AnnualSubPlan[]) {
        const trainingIds = [];
        const researchIds = [];
        const otherIds = [];
        for (let i in entity) {
            if (entity[i].planType == 'RE') {
                // 课件研发
                researchIds.push(entity[i].id);
            } else if (entity[i].planType == 'EL') {
                // 其它
                otherIds.push(entity[i].id);
            } else {
                // 培训计划
                trainingIds.push(entity[i].id);
            }
        }
        // tslint:disable-next-line:max-line-length
        return this.httpAdaptor.post(`/api/annualsubplan/deleteBatch`, null, { params: { trainingIds: trainingIds, researchIds: researchIds, otherIds: otherIds } });
    }

    cancel(entity: AnnualSubPlan[]) {
        const trainingIds = [];
        const researchIds = [];
        const otherIds = [];
        for (let i in entity) {
            if (entity[i].planType == 'RE') {
                // 课件研发
                researchIds.push(entity[i].id);
            } else if (entity[i].planType == 'EL') {
                // 其它
                otherIds.push(entity[i].id);
            } else {
                // 培训计划
                trainingIds.push(entity[i].id);
            }
        }
        // tslint:disable-next-line:max-line-length
        return this.httpAdaptor.post(`/api/annualsubplan/cancel`, null, { params: { trainingIds: trainingIds, researchIds: researchIds, otherIds: otherIds } });
    }

    copy(plan: AnnualSubPlan) {
        let entity = plan;
        let copyUrl = ``;
        if (entity.planType == 'RE') {
            copyUrl = `/api/researchplan/copyPlan`;
        } else if (entity.planType == 'EL') {
            copyUrl = `/api/otherplan/copyPlan`;
        } else {
            copyUrl = `/api/trainingplan/copyPlan`;
        }
        return this.copyPlan(copyUrl, entity.id, entity.annualPlanId, entity.copyCount);
    }

    copyPlan(copyUrl: string, id: number, annualPlanId: number, copyCount: number) {
        return this.httpAdaptor.post(copyUrl, null, { params: { id: id, annualPlanId: annualPlanId, copyCount: copyCount } });
    }

    commitToApproval(entity: AnnualSubPlan[]) {
        let trainingIds = [];
        let researchIds = [];
        let otherIds = [];
        for (let i in entity) {
            if (entity[i].planType == 'RE') {
                // 课件研发
                researchIds.push(entity[i].id);
            } else if (entity[i].planType == 'EL') {
                // 其它
                otherIds.push(entity[i].id);
            } else {
                // 培训计划
                trainingIds.push(entity[i].id);
            }
        }
        // tslint:disable-next-line:max-line-length
        return this.httpAdaptor.post(`/api/annualsubplan/commit`, null, { params: { trainingIds: trainingIds, researchIds: researchIds, otherIds: otherIds } });
    }

    approve(argus: any) {
        let trainingIds = [];
        let researchIds = [];
        let otherIds = [];
        let selected = argus.selected;
        let message = argus.message;
        let operate = argus.operate;
        for (let i in selected) {
            if (selected[i].planType == 'RE') {
                // 课件研发
                researchIds.push(selected[i].id);
            } else if (selected[i].planType == 'EL') {
                // 其它
                otherIds.push(selected[i].id);
            } else {
                // 培训计划
                trainingIds.push(selected[i].id);
            }
        }
        // tslint:disable-next-line:max-line-length
        return this.httpAdaptor.post(`/api/annualsubplan/approve`, null, { params: { trainingIds: trainingIds, researchIds: researchIds, otherIds: otherIds, message: message, operate: operate } });
    }

    getAllHistoryPlan(id: number, planType: String) {
        return this.httpAdaptor.get('/api/annualsubplan/history', { params: { id: id, planType: planType } });
    }

    getApprovalInfo(id: number, planType: String, planIdentifier: String) {
        // tslint:disable-next-line:max-line-length
        return this.httpAdaptor.get('/api/annualsubplan/approve', { params: { id: id, planType: planType, planIdentifier: planIdentifier } });
    }

    importProgress(taskKey: string): Observable<any> {
        return this.httpAdaptor.get(`/api/annualsubplan/importProgress`, { params: { taskKey: taskKey } });
    }

    import(annualPlanId: number, taskKey: string) {
        return this.httpAdaptor.put(`/api/annualsubplan/import`, null, { params: { annualPlanId: annualPlanId, taskKey: taskKey } });
    }

    export(params: any) {
        return this.httpAdaptor.post(`/api/annualsubplan/export`, null, { params: params });
    }
    exportPlan(params: any) {
        return this.httpAdaptor.post(`/api/designatedplan/export`, null, { params: params });
    }
    exportdownloadPlan() {
        window.location.href = "/api/designatedplan/exportdownload";
    }
    download(type: string) {
        window.location.href = this.url + '/download?type=' + type;
    }

    exportdownload() {
        window.location.href = this.url + '/exportdownload';
    }

    getModalGroupLeft() {
        return this.httpAdaptor.get('/api/subgroup/no/page')
    }

    getModalGroupRight(id: number) {
        return this.httpAdaptor.get('/api/sub/user/group/no/page', { params: { sub_group_id: id } })
    }

    getUserGroup(id: number) {
        return this.httpAdaptor.get('/api/annualsubplan/getUserGroup', { params: { annualPlanId: id } })
    }

    // 提前开班申请
    openClassCommit(entity: AnnualSubPlan[]) {
        let trainingIds = [];
        let researchIds = [];
        let otherIds = [];
        for (let i in entity) {
            if (entity[i].planType == 'RE') {
                // 课件研发
                researchIds.push(entity[i].id);
            } else if (entity[i].planType == 'EL') {
                // 其它
                otherIds.push(entity[i].id);
            } else {
                // 培训计划
                trainingIds.push(entity[i].id);
            }
        }
        // tslint:disable-next-line:max-line-length
        return this.httpAdaptor.post(`/api/annualsubplan/commitclass`, null, { params: { trainingIds: trainingIds, researchIds: researchIds, otherIds: otherIds } });
    }

    // 提前开班申请 --> 审核计划
    openClassApproval(argus: any) {
        let selected = argus.selected;
        let trainingIds = [];
        let message = argus.message;
        let operate = argus.operate;
        // tslint:disable-next-line:forin
        for (let i in selected) {
            // 培训计划
            trainingIds.push(selected[i].id);
        }
        // tslint:disable-next-line:max-line-length
        return this.httpAdaptor.post(`/api/planImplement/openClassApproval`, null, { params: { trainingIds: trainingIds, message: message, operate: operate } });
    }

    // 提前开班申请 --> 撤销审核
    openClassCancel(entity: AnnualSubPlan[]) {
        let trainingIds = [];
        let researchIds = [];
        let otherIds = [];
        for (let i in entity) {
            if (entity[i].planType == 'RE') {
                // 课件研发
                researchIds.push(entity[i].id);
            } else if (entity[i].planType == 'EL') {
                // 其它
                otherIds.push(entity[i].id);
            } else {
                // 培训计划
                trainingIds.push(entity[i].id);
            }
        }
        // tslint:disable-next-line:max-line-length
        return this.httpAdaptor.post(`/api/annualsubplan/openclasscancel`, null, { params: { trainingIds: trainingIds, researchIds: researchIds, otherIds: otherIds } })
    }

    // 提前开班申请 --> 取消开班
    aheadOpenClassCancel(entity: AnnualSubPlan[]) {
        let trainingIds = [];
        let researchIds = [];
        let otherIds = [];
        for (let i in entity) {
            if (entity[i].planType == 'RE') {
                // 课件研发
                researchIds.push(entity[i].id);
            } else if (entity[i].planType == 'EL') {
                // 其它
                otherIds.push(entity[i].id);
            } else {
                // 培训计划
                trainingIds.push(entity[i].id);
            }
        }
        // tslint:disable-next-line:max-line-length
        return this.httpAdaptor.post(`/api/annualsubplan/aheadopenclasscancel`, null, { params: { trainingIds: trainingIds, researchIds: researchIds, otherIds: otherIds } })
    }

    // 查看提前开班审核信息
    getOpenClassApprovalInfo(id: number) {
        // tslint:disable-next-line:max-line-length
        return this.httpAdaptor.get('/api/annualsubplan/openclassapprove', { params: { trainingPlanId: id } });
    }

}
