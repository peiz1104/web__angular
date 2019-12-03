import { Forum } from './../../forum/ordinary-forum/entity/forum';
import { Observable } from 'rxjs/Observable';
import { Router, Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { UgcActivityService } from './ugc-activity.service';

@Injectable()
export class UgcActivityForumResolver implements Resolve<Forum> {

    constructor(private router: Router, private ugcActivityService: UgcActivityService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Forum> {
        let id = route.paramMap.get('activityId');

        return this.ugcActivityService.getForum(id)
            .map(forum => {
                return forum;
            })
            .catch(err => {
                // this.router.navigate(['/learning/classroom/list']);
                return Observable.of(err);
            });
    }
}
