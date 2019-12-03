import { Course } from './../../course/entity/course';
import { ClassroomService } from './classroom.service';
import { Classroom } from './../entity/classroom';
import { Observable } from 'rxjs/Observable';
import { Router, Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable()
export class ClassroomCourseResolver implements Resolve<Course> {

    constructor(private router: Router, private classroomService: ClassroomService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Course> {
        let id = route.paramMap.get('id');

        return this.classroomService.getOne(id)
            .map(classroom => {
                return classroom.offeringCourse.course;
            })
            .catch(err => {
                this.router.navigate(['/learning/classroom/list']);
                return Observable.of(err);
            });
    }
}
