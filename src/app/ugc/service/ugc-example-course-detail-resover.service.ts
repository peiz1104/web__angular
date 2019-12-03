import { RouterStateSnapshot } from '@angular/router';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { UgcActivityWorkService } from './ugc-activity-work.service';
import { UgcActivityWork } from '../entity/ugc-activity-work';
import { UgcExampleCourse } from '../entity/ugc-example-course';
import { UgcExampleCourseService } from './ugc-example-course.service';

@Injectable()
export class UgcExampleCourseDetailResolver implements Resolve<UgcExampleCourse> {
    constructor(private ugcActivityWorkService: UgcExampleCourseService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<UgcExampleCourse> {
        let ugcExampleCourseId = route.paramMap.get('ugcExampleCourseId');
        if (ugcExampleCourseId) {
            return this.ugcActivityWorkService.getOne(ugcExampleCourseId);
        } else {
            return Observable.of(null);
        }
    }
}
