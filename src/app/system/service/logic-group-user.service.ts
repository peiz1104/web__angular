import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { BaseService } from 'app/core';
import { Pagination, HttpUtils } from '../../core';
import { HttpAdaptor } from 'app/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { LogicGroupUser } from '../entity/logic-group-user';
import { FormDataUtil } from '../../core/utils/form-data-util';
import { Params } from '@angular/router';
import { User } from '../../exam/exam-paper/entity/user';



@Injectable()
export class LogicGroupUserService extends BaseService<LogicGroupUser> {
    constructor(protected httpAdaptor: HttpAdaptor) {
        super(httpAdaptor.http, httpAdaptor, '/api/logicalGroup/asd');
    }

    getAllGroupUser(id: number, page?: Pagination<LogicGroupUser>): Observable<Pagination<LogicGroupUser>> {
        let params = {};
        if (page) {
            params['size'] = page.size;
            params['page'] = page.number;
        };
        let param = FormDataUtil.searchParamFilter(params);
        return this.httpAdaptor.get(`/api/logicalGroup/${id}/getAllGroupUser`, { params: param });
    }

    deleteGroupUser(ids: any[]): Observable<LogicGroupUser> {
        return this.httpAdaptor.delete(`/api/logicalGroup/deleteGroupUser`, { params: {groupUserIds: ids} });
    }

    addGroupUser(id: number, users: User[]): Observable<LogicGroupUser> {
        let groupUserIds = [];
        users.forEach(user => {
            groupUserIds.push(user.id);
        });
        console.log("要添加的用户为：", groupUserIds);
        return this.httpAdaptor.put(`/api/logicalGroup/${id}/addGroupUser`, groupUserIds);
    }
    // updateLogicGroup(logicGroup: FormData): Observable<LogicGroup> {
    //     if (!logicGroup.has("id")) {
    //         Observable.throw('The id of case for upload must not be null');
    //       }
    //       return this.httpAdaptor.post(`/api/logicalGroup/${logicGroup.get("id")}`, logicGroup);
    // }

    // saveLogicGroup(logicGroup: LogicGroup): Observable<LogicGroup> {
    //       return this.httpAdaptor.put(`/api/logicalGroup`, logicGroup);
    // }
}
