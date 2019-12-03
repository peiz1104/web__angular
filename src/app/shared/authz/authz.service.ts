import { HttpAdaptor } from './../../core/http/http-adaptor';
// import { HttpAdaptor } from 'app/core';
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class AuthzService {
    permissions: string[];

    constructor(private httpAdaptor: HttpAdaptor) {
        this.loadPermissions();
    }

    private loadPermissions(): Observable<any> {
        let url = '/api/permissions/userPrivileges';
        return this.httpAdaptor.get(url).map(
            privs => {
                this.permissions = privs;
                return privs;
            }
        ).catch(err => {
            // console.error('AuthzService', '加载权限数据失败');
            return Observable.throw('加载权限数据失败');
        });
    }

    hasPermission(permission: string): Observable<boolean> {
        return this.hasAnyPermission(permission);
    }

    hasAnyPermission(permissions: string[] | string): Observable<boolean> {
        if (this.permissions) {
            return Observable.of(this._hasAnyPermission(permissions));
        } else {
            return this.loadPermissions().map(
                privs => {
                    this.permissions = privs;
                    return this._hasAnyPermission(permissions);
                }
            );
        }
    }

    public _hasAnyPermission(permissions: string[] | string) {
        let pers = Array.isArray(permissions) ? permissions : permissions.split(' ');
        pers = pers.filter(it => !!it);

        // console.log(pers)
        return this.permissions.some(it => {
            return pers.some(per => this._permissionMatch(it, per));
        });
    }

    private _permissionMatch(source: string, target: string) {
        if (source == target) {
            return true;
        }

        let srcArr = source.split(':');
        let tarArr = target.split(':');

        let i = 0;
        for (let s of srcArr) {
            if (tarArr.length - 1 < i) {
                return true;
            } else {
                let t = tarArr[i];
                if (t != '*' && t != s) {
                    return false;
                }
                i++;
            }
        }

        for (; i < tarArr.length; i++) {
            let t = tarArr[i];
            if (t != '*') {
                return false;
            }
        }

        return true;
    }
}
