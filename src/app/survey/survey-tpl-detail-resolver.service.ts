import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, ActivatedRoute } from '@angular/router';
import { Survey } from './survey.model';
import { SurveyTplService } from './survey-tpl.service';

@Injectable()
export class SurveyTplDetailResolver implements Resolve<Survey> {

    constructor(
        private surveyTplApi: SurveyTplService,
    ) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Survey> {
        let surveyId = +route.paramMap.get('id');
        if (surveyId) {
            return this.surveyTplApi.getOne(surveyId).catch(err => {
                this.toList();
                return Observable.of(null);
            });
        } else {
            this.toList();
        }
    }

    toList() {}
}
