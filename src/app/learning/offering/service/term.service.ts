import { Site } from './../../../home/entity/site';
import { UserGroup } from './../../../system/entity/user-group';
import { User } from './../../../system/entity/user';
import { Pagination } from './../../../core/entity/pagination';
import { HttpAdaptor } from './../../../core/http/http-adaptor';
import { Term } from './../entity/term';
import { BaseService } from './../../../core/service/base.service';
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { LogicGroup } from '../../../system/entity/logic-group';
import { FormDataUtil } from 'app/core';

@Injectable()
export class TermService {
    constructor(protected httpAdaptor: HttpAdaptor) { }

    getAllOfPage(conditionId: number, params?: any, page?: Pagination<Term>): Observable<Pagination<Term>> {
        let url = `/api/condition/${conditionId}/terms`;
        params = params || {};
        if (page) {
            params['size'] = page.size;
            params['page'] = page.number;
        }
        return this.httpAdaptor.get(url, { params: params });
    }

    addUser(conditionId: number, users: User[]) {
        let url = `/api/condition/${conditionId}/terms/addUser`;

        let formData = new FormData();
        users.forEach(user => {
            formData.append('ids', '' + user.id);
        });

        return this.httpAdaptor.post(url, formData);
    }
    addPromotionUser(conditionId: number, ids: any[]) {
        let url = `/api/condition/${conditionId}/terms/addUser`;
        let formData = new FormData();
        ids.forEach((item) => {
            formData.append('ids', '' + item);
        })
        return this.httpAdaptor.post(url, formData);
    }
    addUserGroup(conditionId: number, userGroups: UserGroup[]) {
        let url = `/api/condition/${conditionId}/terms/addUserGroup`;

        let formData = new FormData();
        userGroups.forEach(userGroup => {
            formData.append('ids', '' + userGroup.id);
        });

        return this.httpAdaptor.post(url, formData);
    }
    addLogicGroup(conditionId: number, logicGroups: LogicGroup[]) {
        let url = `/api/condition/${conditionId}/terms/addLogicGroup`;

        let formData = new FormData();
        logicGroups.forEach(userGroup => {
            formData.append('ids', '' + userGroup.id);
        });

        return this.httpAdaptor.post(url, formData);
    }
    addSite(conditionId: number, sites?: Site[]) {
        let url = `/api/condition/${conditionId}/terms/addSite`;

        let formData = new FormData();
        if (sites) {
            sites.forEach(site => {
                formData.append('ids', '' + site.id);
            });
        }

        return this.httpAdaptor.post(url, formData);
    }

    delete(id: number | number[], conditionId: number) {
        let url = `/api/condition/${conditionId}/terms`;
        if (id instanceof Number) {
            id = [].push(id);
        }
        return this.httpAdaptor.delete(url, { params: { ids: id } })
    }

    termUserImport(fullPath: string, conditionId: number, ): Observable<Pagination<Term>> {
        let formData = new FormData();
        formData.append("fullPath", fullPath);
        let url = `/api/condition/${conditionId}/terms/termUserImport`;
        return this.httpAdaptor.post(url, formData);
    }

    termUserSave(fullPath: string, conditionId: number, ): Observable<Term> {
        let formData = new FormData();
        formData.append("fullPath", fullPath);
        let url = `/api/condition/${conditionId}/terms/termUserSave`;
        return this.httpAdaptor.post(url, formData);
    }
    promotionData(params) {
        return this.httpAdaptor.get(`/api/training/promotion`, { params: params });
    }
    termExport(conditionId: number, params): Observable<any> {
        let url = `/api/condition/${conditionId}/terms/termExport`;
        return this.httpAdaptor.get(url, { params: params });
    }
    // 导出
    export(offeringId, params): Observable<any> {
        params = FormDataUtil.searchParamFilter(params);
        return this.httpAdaptor.get(`/api/offering/${offeringId}/enrollments/userExport`, { params: params });
    }
    downloadCourse(id) {
        window.location.href = `/api/offering/${id}/enrollments/userExport/download`
    }
}
