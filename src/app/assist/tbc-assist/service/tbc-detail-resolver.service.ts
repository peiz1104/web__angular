import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Resolve, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { TrainingClass } from '../../../training/entity/training-class';
import { TbcAssistApiService } from './tbc-assist-api.service';

@Injectable()
export class TbcDetailResolverService implements Resolve<TrainingClass> {
    constructor(
        private router: Router,
        private trainingClassApi: TbcAssistApiService
    ) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): TrainingClass | Observable<TrainingClass> | Promise<TrainingClass> {
        let tbcId = +route.paramMap.get('tbcId');

        if (tbcId) {
            return this.trainingClassApi.getOne(tbcId)
                .catch(err => {
                    this.toTrainingList();
                    return Observable.of(null);
                });
        } else {
            this.toTrainingList();
            return Observable.of(null);
        }
    }

    toTrainingList() {
        this.router.navigateByUrl('/assist/tbc');
    }
}
