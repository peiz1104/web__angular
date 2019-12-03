import { Observable } from 'rxjs/Observable';
import { Pagination } from 'app/core/entity/pagination';
import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/delay';

import { HttpUtils } from '../http';

import { User } from '../../system/entity/user';
import { Site } from '../../system/entity/site';
import { SiteInfoService } from '../service/site-info.service';

@Injectable()
export class AuthService {
    isLoggedIn: boolean = false;
    userToken: { user: User, currentSite: Site, hasPermission: boolean, isInstructor: boolean };

    // store the URL so we can redirect after logging in
    redirectUrl: string;

    constructor(
        private http: Http,
        private siteInfoService: SiteInfoService
    ) { }

    // login(): Observable<boolean> {
    login(username: string, passwd: string): Observable<any> {
        let url = '/api/login';
        let data = new FormData();
        data.append('username', username);
        data.append('password', passwd);

        return this.http.post(url, data)
            .map(resp => {
                let res = HttpUtils.extractData(resp);
                this.isLoggedIn = res['isLoggedIn'];
                if (this.isLoggedIn) {
                    this.userToken = res['userToken'];
                }
                return this.isLoggedIn;
            })
            .catch(HttpUtils.handleError);
    }

    logout(): Observable<void> {
        let url = '/api/logout';

        this.isLoggedIn = false;
        return this.http.get(url)
            .map(HttpUtils.extractData)
            .catch((resp: Response) => {
                return HttpUtils.handleError(resp);
            });
    }

    stats(): Observable<boolean> {
        let url = '/api/stats';

        // return this.http.options(url)
        return this.http.get(url)
            .map(resp => {
                this.isLoggedIn = true;
                if (!this.userToken) {
                    this.loginfo();
                }
                return true;
            })
            .catch(resp => {
                this.isLoggedIn = false;
                return HttpUtils.handleError(resp);
            });
    }

    loginfo(): Observable<any> {
        let url = '/api/loginfo';
        return this.http.get(url)
            .map(resp => {
                let ut = HttpUtils.extractData(resp);
                this.userToken = ut;
                return this.userToken;
            }).catch(HttpUtils.handleError);
    }

    getCurrentUser(): Observable<User> {
        if (!this.isLoggedIn) {
            return;
        }
        if (this.isLoggedIn && !this.userToken) {
            return this.loginfo().map(ut => ut.user);
        }

        return Observable.of(this.userToken.user);
    }
    // 获取用户头像api
    getuserheadimg(userId) {
        return this.http.get(`/api/user/expand/${userId}`)
            .map(resp => {
                let Obj = resp.json();
                return Obj;
            })
            .catch(HttpUtils.handleError)
    }
    getCurrentSite(): Observable<Site> {
        if (!this.isLoggedIn) {
            return Observable.of(new Site());
        }
        if (this.isLoggedIn && !this.userToken) {
            // return this.loginfo().map(ut => ut.currentSite);
            return this.loginfo().mergeMap(_ => {
                return this.siteInfoService.currentSite();
            });
        }

        // return Observable.of(this.userToken.currentSite);
        return this.siteInfoService.currentSite();
    }

    isSuperUser(): boolean {
        return this.userToken && this.userToken.user && this.userToken.user.isSystemUser;
    }

    isAdministrator(): Observable<boolean> {
        if (!this.isLoggedIn) {
            return;
        }
        if (this.isLoggedIn && !this.userToken) {
            return this.loginfo().map(ut => ut.hasPermission);
        }

        return Observable.of(this.userToken.hasPermission);
    }

    isInstructor(): Observable<boolean> {
        if (!this.isLoggedIn) {
            return;
        }
        if (this.isLoggedIn && !this.userToken) {
            return this.loginfo().map(ut => ut.isInstructor);
        }

        return Observable.of(this.userToken.isInstructor);
    }
}
