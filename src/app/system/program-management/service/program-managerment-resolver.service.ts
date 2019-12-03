import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from "@angular/router";
import {ProgrammanagementGroup} from "../entity/programmanagement-group";
import {ProgramManagermentGroupService} from "./program-managerment-group.service";

@Injectable()
export class ProgramManagermentResolverService  implements Resolve<ProgrammanagementGroup> {
  constructor(private pmgservice: ProgramManagermentGroupService, private router: Router) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<ProgrammanagementGroup> {
    let identifier = route.paramMap.get('identifier');
    let programmanagementGroup: ProgrammanagementGroup;

    if (!identifier) {
      return this.pmgservice.getAll().toPromise().then(programmanagementGroups => {
        if (programmanagementGroups && programmanagementGroups.length > 0) {
          this.router.navigate(['/system/program-management', programmanagementGroups[0].identifier, 'list']);
          programmanagementGroup =  programmanagementGroups[0];
          return programmanagementGroup;
        } else { // 如果分类组为空，跳转到分组添加页面
          // this.router.navigate(['add'], {relativeTo: route});
          return null;
        }
      });

    } else {
      return this.pmgservice.getByIdentifier(identifier).toPromise().then(
        cg => {
          // debugger;
          programmanagementGroup = cg;
          return programmanagementGroup;
        }
      );
    }
  }
}
