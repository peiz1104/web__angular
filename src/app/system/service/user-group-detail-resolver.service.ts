import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { UserGroup } from '../entity/user-group';
import { UserGroupService } from './user-group.service';
import { Resolve, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable()
export class UserGroupDetailResolver implements Resolve<UserGroup> {
    constructor(
        private ugService: UserGroupService,
        private router: Router
    ) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<UserGroup> {
        let id = route.params['userGroupId'];

        if (!id) {
            return Observable.of(null);
        }

        return this.ugService.getGroup(id).map((userGroup) => {
            if (userGroup) {
                return userGroup;
            } else { // id not found
                // 执行跳转， 回list
                return null;
            }
        });
    }
}
