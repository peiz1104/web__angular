import { Forum } from './../../../forum/ordinary-forum/entity/forum';
import { Course } from './../../course/entity/course';
import { ClassroomService } from './classroom.service';
import { Classroom } from './../entity/classroom';
import { Observable } from 'rxjs/Observable';
import { Router, Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable()
export class ClassroomForumResolver implements Resolve<Forum> {

    constructor(private router: Router, private classroomService: ClassroomService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Course> {
        let id = route.paramMap.get('id');

        return this.classroomService.getForum(id)
            .map(forum => {
                return forum;
            })
            .catch(err => {
                // this.router.navigate(['/learning/classroom/list']);
                return Observable.of(err);
            });
    }
}
