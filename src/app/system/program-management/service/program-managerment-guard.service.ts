import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs/Observable";
import {ProgrammanagementGroup} from "../entity/programmanagement-group";
import {ProgramManagermentGroupService} from "./program-managerment-group.service";

@Injectable()
export class ProgramManagermentGuardService implements CanActivate {
  constructor(private pmgservice: ProgramManagermentGroupService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    let identifier = route.params.identifier;
    let programmanagementGroup: ProgrammanagementGroup;
    // console.log('identifier', identifier);
    return this.pmgservice.getByIdentifier(identifier).map(
      cg => {
        return true;
      }
    ).catch((err) => {
      this.router.navigate(['/system/program-management']);
      return Observable.of(true);
    });
  }
}
