import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

import { HttpAdaptor } from './../../../core/http/http-adaptor';
import { BaseService } from './../../../core/service/base.service';
import { AnnualPlan } from './../entity/annualplan';

@Injectable()
export class AnnualplanService extends BaseService<AnnualPlan> {
    constructor(protected httpAdaptor: HttpAdaptor) {
        super(httpAdaptor.http, httpAdaptor, '/api/annualplan');
    }

    publishStatus(ids: number[]) {
        return this.batchOperate('publishStatus', ids);
    }

    disPublishStatus(ids: number[]) {
        return this.batchOperate('disPublishStatus', ids);
    }

    commit(ids: number[]) {
        return this.setApprovalStatus('A', ids);
    }

    setApprovalStatus(approvalStatus: string, ids: number[]) {
        return this.httpAdaptor.post(`/api/annualplan/approvalStatus`, null, { params: { approvalStatus: approvalStatus, ids: ids } });
    }

    approve(argus: any) {
        let ids = [];
        let selected = argus.selected;
        let message = argus.message;
        let approvalStatus = argus.operate;
        ids.push(selected[0].id);
        // tslint:disable-next-line:max-line-length
        return this.httpAdaptor.post(`/api/annualplan/approve`, null, { params: { ids: ids, message: message, approvalStatus: approvalStatus } });
    }

    // 获取未审核通过的子计划数量
    getUnPassSubPlanCount(id: number) {
        return this.httpAdaptor.get(`/api/annualplan/subPlanCount`, { params: { annualPlanId: id } });
    }

    // 查询某年是否已创建了年度计划
    checkPlanCreatedThisYear(year: string, orgId: number) {
        return this.httpAdaptor.get(`/api/annualplan/created`, { params: { year: year, orgId: orgId } });
    }

    getApprovalInfo(id: number) {
        // tslint:disable-next-line:max-line-length
        return this.httpAdaptor.get('/api/annualplan/approve', { params: { id: id } });
    }

    getTrainingBudget(id: number) {
        return this.httpAdaptor.get('/api/annualplan/trainingbudget', { params: { id: id } });
    }

    getResearchBudget(id: number) {
        return this.httpAdaptor.get('/api/annualplan/researchbudget', { params: { id: id } });
    }

    findUserGroups() {
        return this.httpAdaptor.get('/api/annualplan/userGroups');
    }

    revoke(ids: number[]) {
        return this.batchOperate('revoke', ids);
    }

    getCurrentUser() {
        return this.httpAdaptor.get('/api/account');
    }

}
