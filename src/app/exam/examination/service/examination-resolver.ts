/*
 * @Author: majunfeng
 * @Date: 2017-11-02 18:25:08
 * @Last Modified by: longping
 * @Last Modified time: 2018-05-11 10:22:05
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
        return this.examinationService.getOffering(id)
            .map(obj => {
                return obj;
            })
            .catch(err => {
                this.router.navigate(['/exam/examination/list']);
                return Observable.of(err);
            });
    }
}
