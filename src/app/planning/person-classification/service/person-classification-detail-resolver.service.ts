import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { PersonClassification } from '../entity/person-classification';
import { PersonClassificationService } from './person-classification.service';
import { Resolve, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable()
export class PersonClassificationDetailResolver implements Resolve<PersonClassification> {
    constructor(
        private pcService: PersonClassificationService,
        private router: Router
    ) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<PersonClassification> {
        let id = route.params['id'];

        if (!id) {
            return Observable.of(null);
        }

        return this.pcService.getGroup(id).map((personClassification) => {
            if (personClassification) {
                return personClassification;
            } else { // id not found
                // 执行跳转， 回list
                return null;
            }
        });
    }
}
