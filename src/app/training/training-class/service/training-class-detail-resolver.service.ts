import { Router } from '@angular/router';
import { TrainingClass } from 'app/training/entity/training-class';
import { RouterStateSnapshot, ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Injectable, Optional } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { TrainingClassApiService } from 'app/training/service/training-class-api.service';
import { TbcAssistApiService } from '../../../assist/tbc-assist/service/tbc-assist-api.service';

@Injectable()
export class TrainingClassDetailResolver implements Resolve<TrainingClass> {
    constructor(
        private router: Router,
        private trainingClassApi: TrainingClassApiService,
        @Optional() private tbcAssistApi: TbcAssistApiService,
    ) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<TrainingClass> {
        let tbcId = +route.paramMap.get('tbcId');

        if (tbcId) {
            if (this.tbcAssistApi) {
                return this.tbcAssistApi.getOne(tbcId)
                    .catch(err => {
                        this.toTrainingList();
                        return Observable.of(null);
                    });
            }
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
        this.router.navigateByUrl('/training/class');
    }
}
