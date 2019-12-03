import { Component, OnInit } from '@angular/core';
import {ProgrammanagementGroup} from "../../entity/programmanagement-group";
import {ProgramManagermentGroupService} from "../../service/program-managerment-group.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'spk-program-management-group',
  templateUrl: './program-management-group.component.html',
  styleUrls: ['./program-management-group.component.scss']
})
export class ProgramManagementGroupComponent implements OnInit {

  programmanagementGroups: ProgrammanagementGroup[];
  activeProgrammanagementGroup: ProgrammanagementGroup;
  defaultProgrammanagementGroup: ProgrammanagementGroup;
  identifier;
  constructor(private pmgService: ProgramManagermentGroupService, private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.identifier = this.route.snapshot.params.identifier;
    console.log('identifier', this.identifier);
    this.pmgService.getAll().subscribe(
      obj => {
        this.programmanagementGroups = obj;
      }
    );

    this.route.params.subscribe((data: { identifier: string }) => {
      this.pmgService.getByIdentifier(data.identifier).subscribe(
        cg => {
          this.activeProgrammanagementGroup = cg; this.identifier = this.activeProgrammanagementGroup.identifier
        }
      );
    });
  }


  showCategory(programmanagementGroup: ProgrammanagementGroup) {
    this.programmanagementGroups.forEach((e, index) => {
      e.isCurrent = false;
    });
    this.activeProgrammanagementGroup = programmanagementGroup;
    this.activeProgrammanagementGroup.isCurrent = true;
  }

  edit(cgs) {
    if (cgs) {
      this.router.navigate(['/system/program-management', this.identifier, 'list', { activeProgrammanagementId: cgs[0].id }]);
    }
  }
}
