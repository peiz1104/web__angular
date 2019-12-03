//  import { MaterialTargetInfo } from './../../../learning/material/service/material-target-resolver.service';
import { TrainingClass } from './../../entity/training-class';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class TrainingClassMaterialResolver implements Resolve<any> {

    constructor() { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any {
        const parentRoute: ActivatedRouteSnapshot = route.parent;

        if (parentRoute && parentRoute.data && parentRoute.data['trainingClass']) {
            let trainingClass: TrainingClass = parentRoute.data['trainingClass'];
            return {
                id: trainingClass.id,
                name: trainingClass.name,
                code: trainingClass.code,
                targetType: 'TRAINING_CLASS',
                materialGroupId: trainingClass.materialGroupId
            };
        }
    }
}
