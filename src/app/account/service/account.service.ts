import { AccountAuthorization } from './../entity/account-authorization';
import { FormDataUtil } from './../../core/utils/form-data-util';
import { Observable } from 'rxjs/Observable';
import { HttpAdaptor, Pagination } from 'app/core';
import { AccountInfo } from './../entity/account-info';
import { Injectable } from '@angular/core';

@Injectable()
export class AccountService {
    baseUrl = "/api/account";
    constructor(protected http: HttpAdaptor) { }
    login(un, up) {
        return Promise.resolve({});
    }

    findUser(): Observable<AccountInfo> {
      return this.http.get(`${this.baseUrl}`);
    }

    editPassword(user: any) {
        let formData: FormData = FormDataUtil.covert(user);
        return this.http.post(`${this.baseUrl}/editPassword`, formData);
    }
    editEmail(user: any) {
        let formData: FormData = FormDataUtil.covert(user);
        return this.http.post(`${this.baseUrl}/editEmail`, formData);
    }

    editPhone(user: any) {
        let formData: FormData = FormDataUtil.covert(user);
        return this.http.post(`${this.baseUrl}/editPhone`, formData);
    }
    editBaseInfo(user: any) {
        let formData: FormData = FormDataUtil.covert(user);
        return this.http.post(`${this.baseUrl}/editBaseInfo`, formData);
    }

    editPreference(user: any) {
        let formData: FormData = FormDataUtil.covert(user);
        if (user.managerGroup != null && user.managerGroup.name != null) {
            formData.append('managerGroup.name', user.managerGroup.name);
        }
        return this.http.post(`${this.baseUrl}/editPreference`, formData);
    }

    findAuthorization(params?: any, page?: Pagination<AccountAuthorization>): Observable<Pagination<AccountAuthorization>> {
        params = params || {};
        if (page) {
            params['size'] = page.size;
            params['page'] = page.number;
        }
        return this.http.get(`${this.baseUrl}/permission`, {params: params});
    }

    // 替换邮箱字符
    replaceEmail(email): string {
    　　if (email && String(email).indexOf('@') > 0) {
            let str = email.split('@'),
             _s = '';
    　　　　if (str[0].length > 3) {
    　　　　　　for (let i = 0; i < str[0].length - 3; i++) {
    　　　　　　　　_s += '*';
    　　　　　　}
    　　　　}
            email = str[0].substr(0, 3) + _s + '@' + str[1]
    　　}
        　return email;
    }

    // 替换手机字符
    replacePhone(phone): string {
    　　if (phone && phone.length > 7) {
           phone = phone.substr(0, 3) + '****' + phone.substr(7)
    　　}
    　　return phone;
    }
}
