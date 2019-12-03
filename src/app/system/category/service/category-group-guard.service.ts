import { Observable } from 'rxjs/Observable';
import { CategoryGroup } from './../entity/category-group';
import { CategoryGroupService } from './category-group.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, Router } from '@angular/router';

@Injectable()
export class CategoryGroupGuard implements CanActivate {
    constructor(private cgs: CategoryGroupService, private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        let identifier = route.params.identifier;
        let categoryGroup: CategoryGroup;
        // console.log('identifier', identifier);
        return this.cgs.getByIdentifier(identifier).map(
            cg => {
                return true;
            }
        ).catch((err) => {
            this.router.navigate(['/system/category-group']);
            return Observable.of(true);
        });
    }
}
