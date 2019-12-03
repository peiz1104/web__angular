import { Observable } from 'rxjs/Observable';
import { CourseService } from './course.service';
import { Course } from './../entity/course';
import { Resolve, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable()
export class CourseDetailResolver implements Resolve<Course> {

    constructor(private courseService: CourseService, private router: Router) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Course> {
        let id = route.paramMap.get('id');

        return this.courseService.getOne(id)
            .map(course => {
                return course;
            })
            .catch(err => {
                this.router.navigate(['/learning/course/list']);
                return Observable.of(err);
            });
    }
}
