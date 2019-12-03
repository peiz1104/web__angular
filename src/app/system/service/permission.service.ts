import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Pagination, HttpUtils } from '../../core';
import { Permission } from '../entity/permission';
import { User } from '../entity/user';

@Injectable()
export class PermissionService {
    constructor(private http: Http) { }

    pageList(params?: any): Observable<Pagination<Permission>> {
        return this.http.get('/api/permissions', { params: params })
            .map(HttpUtils.extractData)
            .catch(HttpUtils.handleError);
    }

    getByUserId(userId: any): Observable<any> {
        return this.http.get(`/api/permissions/${userId}/list`)
            .map(HttpUtils.extractData)
            .catch(HttpUtils.handleError);
    }

    getAllRoles(): Observable<any []> {
         return this.http.get(`/api/permissions/role/all`)
            .map(HttpUtils.extractData)
            .catch(HttpUtils.handleError);
    }

    getPrivilegeTree(): Observable<any[]> {
        return this.http.get('/api/permissions/privilege/tree')
            .map(HttpUtils.extractData)
            .catch(HttpUtils.handleError);
    }

   delete(id: number | number[]): Observable<void> {
        if (id instanceof Number) {
            id = [].push(id);
        }
        return this.http.delete('/api/permissions', { params: { ids: id } })
            .map(HttpUtils.extractData)
            .catch(HttpUtils.handleError);
    }

    savePermissions(permissions: Permission []): Observable<void> {
        return this.http.put('/api/permissions', permissions)
            .map(HttpUtils.extractData)
            .catch(HttpUtils.handleError);
    }

    searchUsers(searchText: string): Observable<User []> {
         return this.http.get('/api/permissions/select/users', { params: { 'searchText': searchText } })
            .map(HttpUtils.extractData)
            .catch(HttpUtils.handleError);
    }

}
