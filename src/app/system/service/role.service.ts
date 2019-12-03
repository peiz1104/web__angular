import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Pagination, HttpUtils } from '../../core';
import { Role } from '../entity/role';

@Injectable()
export class RoleService {
    constructor(private http: Http) { }

    roles(params?: any): Observable<Pagination<Role>> {
        return this.http.get('/api/roles', { params: params })
            .map(HttpUtils.extractData)
            .catch(HttpUtils.handleError);
    }

    get(id: any): Observable<Role> {
        return this.http.get(`/api/roles/${id}`)
            .map(HttpUtils.extractData)
            .catch(HttpUtils.handleError);
    }

    add(role: Role): Observable<Role> {
        return this.http.put('/api/roles/', role)
            .map(HttpUtils.extractData)
            .catch(HttpUtils.handleError);
    }

    update(role: Role): Observable<Role> {
        if (!role.id) {
            throw Error('Id of role for update must exist.');
        }
        return this.http.post(`/api/roles/${role.id}`, role)
            .map(HttpUtils.extractData)
            .catch(HttpUtils.handleError);
    }

    delete(id: number | number[]): Observable<void> {
        if (id instanceof Number) {
            id = [].push(id);
        }

        return this.http.delete('/api/roles', { params: { ids: id } })
            .map(HttpUtils.extractData)
            .catch(HttpUtils.handleError);
    }

    getPrivilegeTree(): Observable<any[]> {
        return this.http.get('/api/roles/privileges')
            .map(HttpUtils.extractData)
            .catch(HttpUtils.handleError);
    }

    validateRoleName(roleName: string): Observable<{[key: string]: any}> {
        return this.http.get('/api/roles/validate/name', {params: {'roleName': roleName}})
            .map(HttpUtils.extractData)
            .catch(HttpUtils.handleError);
    }
}
