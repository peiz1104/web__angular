import { ClassroomService } from './classroom.service';
import { Classroom } from './../entity/classroom';
import { Observable } from 'rxjs/Observable';
import { Router, Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable()
export class ClassroomDetailResolver implements Resolve<Classroom> {

    constructor(private classroomService: ClassroomService, private router: Router) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Classroom> {
        let id = route.paramMap.get('id');

        return this.classroomService.getOne(id)
            .map(classroom => {
                return classroom;
            })
            .catch(err => {
                this.router.navigate(['/learning/classroom/list']);
                return Observable.of(err);
            });
    }
}
