import { HttpAdaptor } from 'app/core';
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { UserGroup } from '../entity/user-group';
import { FormDataUtil, HttpUtils } from '../../core';

@Injectable()
export class UserGroupService {
    public orgdata: UserGroup;

    constructor(private http: Http, private httpAdaptor: HttpAdaptor) { }

    groups(parentId?: number, searchText?: string): Observable<UserGroup[]> {
        let url = '/api/userGroups';

        return this.http.get(url, { params: { 'parentId': parentId, 'searchText': searchText } })
            .map(HttpUtils.extractData)
            .map((ugs: UserGroup[]) => {
                if (searchText) {
                    return ugs.filter( it => (it.name.indexOf(searchText) > -1) || (it.code.indexOf(searchText) > -1) );
                } else {
                    return ugs;
                }
            })
            .catch(HttpUtils.handleError);
    }

    getGroup(id: number): Observable<UserGroup> {
        let url = `/api/userGroups/${id}`;

        return this.http.get(url)
            .map(HttpUtils.extractData)
            .catch(HttpUtils.handleError);
    }

    add(userGroup: UserGroup): Observable<UserGroup> {
        let url = '/api/userGroups';
        // let formData: FormData = FormDataUtil.covert(userGroup);

        return this.http.put(url, userGroup).map(HttpUtils.extractData).catch(HttpUtils.handleError);
    }

    update(userGroup: UserGroup): Observable<UserGroup> {
        if (!userGroup.id) {
            Observable.throw('The id of userGroup for upload must not be null');
        }
        let url = `/api/userGroups/${userGroup.id}`;
        let formData: FormData = FormDataUtil.covert(userGroup);

        return this.http.post(url, formData).map(HttpUtils.extractData).catch(HttpUtils.handleError);
    }

    delete(ids: number[]): Observable<void> {
        let url = `/api/userGroups`;

        return this.http.delete(url, { params: { ugIds: ids } })
            .map(HttpUtils.extractData).catch(HttpUtils.handleError);
    }

    doImport(fileInfo) {
        return this.httpAdaptor.put(`/api/userGroups/doImport`, fileInfo);
    }

    search(searchText: string, page, size) {
        let url = `/api/userGroups/search`;

        return this.httpAdaptor.get(url, { params: { searchText: searchText, page: page, size: size } });
    }

    import(taskKey: string): Observable<UserGroup[]> {
        return this.http.put('/api/userGroups/doImport', null, { params: { taskKey: taskKey } })
            .map(HttpUtils.extractData)
            .catch(HttpUtils.handleError);
    }

    importProgress(taskKey: string): Observable<any> {
        return this.httpAdaptor.get(`/api/userGroups/importProgress`, { params: { taskKey: taskKey } });
    }

    moveUp(userGroupId: number): Observable<void> {
        return this.httpAdaptor.post(`/api/userGroups/${userGroupId}/moveUp`, null);
    }

    moveDown(userGroupId: number): Observable<void> {
        return this.httpAdaptor.post(`/api/userGroups/${userGroupId}/moveDown`, null);
    }

    userExport(parentId: number, searchText: string, selected: number[]): Observable<any> {
        // tslint:disable-next-line:max-line-length
        return this.httpAdaptor.get(`/api/userGroups/export`, { params: { parentId: parentId, searchText: searchText, selected: selected } });
    }

    codeExist(code: string): Observable<boolean> {
        return this.httpAdaptor.get(`/api/userGroups/groupCode`, { params: { groupCode: code } });
    }

    nameExist(params): Observable<boolean> {
        return this.httpAdaptor.get(`/api/userGroups/groupName`, { params: params  });
    }
}
