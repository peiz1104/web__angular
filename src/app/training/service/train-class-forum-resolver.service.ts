import { Forum } from './../../forum/ordinary-forum/entity/forum';
import { TrainingClass } from './../entity/training-class';
import { TrainingClassApiService } from './training-class-api.service';
import { Observable } from 'rxjs/Observable';
import { Router, Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable()
export class TrainingClassForumResolver implements Resolve<Forum> {

    constructor(private router: Router, private trainingClassApiService: TrainingClassApiService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<TrainingClass> {
        let id = route.paramMap.get('tbcId');

        return this.trainingClassApiService.getForum(id)
            .map(forum => {
                return forum;
            })
            .catch(err => {
                // this.router.navigate(['/learning/classroom/list']);
                return Observable.of(err);
            });
    }
}
