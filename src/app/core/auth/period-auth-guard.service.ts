import { Router } from '@angular/router';
import { TrainingClass } from 'app/training/entity/training-class';
import { RouterStateSnapshot, ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { HttpUtils } from '../http';

@Injectable()
export class AssistPeriodwResolver implements Resolve<any> {
    constructor(
        private router: Router,
        private http: Http
    ) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
        let url = '/api/period/assistant/manager/is-assistant';

        return this.http.get(url)
            .map(resp => {
                let m = resp.json()
                if (m) {
                    return resp;
                } else {
                    this.toAssistHome();
                    return Observable.of(null);
                }

            })
            .catch(err => {
                this.toAssistHome();
                return Observable.of(null);
            });


    }

    toAssistHome() {
        this.router.navigateByUrl('/assist/home');
    }
}




