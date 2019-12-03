import { HttpAdaptor } from 'app/core';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Pagination, HttpUtils } from '../../core';
import { User } from '../entity/user';

@Injectable()
export class UserService {

    constructor(private http: Http, private httpAdaptor: HttpAdaptor) { }


    users(params?: any, page?: Pagination<User>): Observable<Pagination<User>> {
        params = params || {};
        if (page) {
            params['size'] = page.size;
            params['page'] = page.number;
        }
        return this.http.get('/api/users', { params: params })
            .map(HttpUtils.extractData)
            .catch(HttpUtils.handleError);
    }
    get(userId: number): Observable<User> {
        return this.http.get(`/api/users/${userId}`)
            .map(HttpUtils.extractData)
            .catch(HttpUtils.handleError);
    }

    add(user: User): Observable<User> {
        return this.http.put('/api/users', user)
            .map(HttpUtils.extractData)
            .catch(HttpUtils.handleError);
    }

    update(user: any): Observable<User> {
        if (!user.id) {
            Observable.throw('The id of user for upload must not be null');
        }
        return this.http.post(`/api/users/${user.id}`, user)
            .map(HttpUtils.extractData)
            .catch(HttpUtils.handleError);
    }

    delete(ids: number[]): Observable<void> {
        return this.http.delete('/api/users', { params: { userIds: ids }, withCredentials: true })
            .map(HttpUtils.extractData)
            .catch(HttpUtils.handleError);
    }

    import(taskKey: string, userGroupId?: number): Observable<User[]> {
        return this.http.put('/api/users/saveImport', null, { params: { taskKey: taskKey, userGroupId: userGroupId } })
            .map(HttpUtils.extractData)
            .catch(HttpUtils.handleError);
    }

    importProgress(taskKey: string): Observable<any> {
        return this.httpAdaptor.get(`/api/users/importProgress`, { params: { taskKey: taskKey } });
    }
    updatePass(userId: number, pwd: string) {
        return this.http.post('/api/users/pwd', null, { params: { id: userId, pwd: pwd }, withCredentials: true })
            .map(HttpUtils.extractData)
            .catch(HttpUtils.handleError);
    }

    exportErroUser(importedUsers): Observable<void> {
        return this.http.post('/api/users/export', importedUsers)
            .map(HttpUtils.extractData)
            .catch(HttpUtils.handleError);
    }

    //正式导出
    exportdownload() {
        window.location.href = '/api/users/exportdownload';
    }

    //下载模板
    download() {
        window.location.href = '/api/users/download';
    }
    userExport(params?: any): Observable<void> {
        return this.httpAdaptor.get('/api/users/userExport', { params: params });
    }
    simulate(username: string): Observable<any> {
        return this.httpAdaptor.post(`/api/open/simulate/login`, null, { params: { username: username } });
    }
}
