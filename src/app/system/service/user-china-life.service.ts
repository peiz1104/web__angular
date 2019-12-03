import { HttpAdaptor } from 'app/core';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Pagination, HttpUtils } from '../../core';
import { User } from '../entity/user';

@Injectable()
export class UserChinaLifeService {

    constructor(private http: Http, private httpAdaptor: HttpAdaptor) { }

    add(user: User): Observable<User> {
        return this.http.put('/api/user/expand', user)
            .map(HttpUtils.extractData)
            .catch(HttpUtils.handleError);
    }

    // 验证所选择的组织是否正确
    userGroupIsOk(userGroupId){
        return this.http.get(`/api/user/expand/${userGroupId}/userGroup/isOk`)
        .map(HttpUtils.extractData)
        .catch(HttpUtils.handleError);
    }


    // 用户批量导入
    import(taskKey: string, userGroupId: number): Observable<User[]> {
        return this.http.put('/api/user/expand/saveImport', null, { params: { taskKey: taskKey, userGroupId: userGroupId } })
            .map(HttpUtils.extractData)
            .catch(HttpUtils.handleError);
    }

    // 获取用户导入时文件验证的进度
    importProgress(taskKey: string): Observable<any> {
        return this.httpAdaptor.get(`/api/user/expand/importProgress`, { params: { taskKey: taskKey } });
    }
    updatePass(userId: number, pwd: string) {
        return this.http.post('/api/user/expand/pwd', null, { params: { id: userId, pwd: pwd }, withCredentials: true })
            .map(HttpUtils.extractData)
            .catch(HttpUtils.handleError);
    }

    // 对用户导出时返回的错误信息导出
    exportErroUser(importedUsers): Observable<void> {
        return this.http.post('/api/user/expand/export', importedUsers)
            .map(HttpUtils.extractData)
            .catch(HttpUtils.handleError);
    }

    // 正式导出 （对用户导出时返回的错误信息导出）
    exportdownload() {
        window.location.href = '/api/user/expand/exportdownload';
    }

    // 下载模板
    download() {
        window.location.href = '/api/user/expand/down/excel';
    }
    users(params?: any): Observable<Pagination<User>> {
        return this.http.get('/api/user/expand', { params: params })
            .map(HttpUtils.extractData)
            .catch(HttpUtils.handleError);
    }

    get(userId: number): Observable<User> {
        return this.http.get(`/api/user/expand/${userId}`)
            .map(HttpUtils.extractData)
            .catch(HttpUtils.handleError);
    }
    update(user: User): Observable<User> {
        if (!user.id) {
            Observable.throw('The id of user for upload must not be null');
        }
        return this.http.post(`/api/user/expand/${user.id}`, user)
            .map(HttpUtils.extractData)
            .catch(HttpUtils.handleError);
    }

    delete(ids: number[]): Observable<void> {
        return this.http.delete('/api/user/expand', { params: { userIds: ids }, withCredentials: true })
            .map(HttpUtils.extractData)
            .catch(HttpUtils.handleError);
    }
    userExport(params?: any): Observable<void> {
        return this.httpAdaptor.get('/api/users/userExport', { params: params });
    }
    simulate(username: string): Observable<any> {
        return this.httpAdaptor.post(`/api/open/simulate/login`, null, { params: { username: username } });
    }
}
