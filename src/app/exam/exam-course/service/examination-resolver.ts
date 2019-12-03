/*
 * @Author: majunfeng
 * @Date: 2017-11-02 18:25:08
 * @Last Modified by: kxx
 * @Last Modified time: 2017-11-25 16:43:15
 */
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Router, Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { ExaminationService } from './examination.service';

@Injectable()
export class ExamDetailResolver implements Resolve<any> {
    constructor(private router: Router, private examinationService: ExaminationService) { }
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
        let id = route.paramMap.get('exam_id');
        console.log('route.paramMap', route.paramMap);
        return this.examinationService.getExamDetail(id)
            .map(obj => {
                return obj;
            })
            .catch(err => {
                this.router.navigate(['/']);
                return Observable.of(err);
            });
    }
}
