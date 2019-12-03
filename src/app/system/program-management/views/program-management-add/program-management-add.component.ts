import { Component, OnInit } from '@angular/core';
import {ProgrammanagementGroup} from "../../entity/programmanagement-group";
import {Programmanagement} from "../../entity/programmanagement";
import {ActivatedRoute, Router} from "@angular/router";
import {ProgramManagementService} from "../../service/program-management.service";

@Component({
  selector: 'spk-program-management-add',
  templateUrl: './program-management-add.component.html',
  styleUrls: ['./program-management-add.component.scss']
})
export class ProgramManagementAddComponent implements OnInit {
  programManagement = new Programmanagement();
  programManagementGroup: ProgrammanagementGroup;
  parentId: string;
  err;
  constructor( private programManagementService: ProgramManagementService,
               private router: Router,
               private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe(
      (data: { programmanagementGroup: ProgrammanagementGroup }) => {
        this.programManagementGroup = data.programmanagementGroup;
      });
    this.route.paramMap.subscribe(
      params => {
        this.parentId = params.get('parentId');
        if (this.parentId) {
          this.programManagementService.getOne(this.parentId).subscribe(
            parent => this.programManagement.parent = parent
          );
        }
      }
    );
  }
  onSubmit(programManagement: Programmanagement) {
   this.programManagementService.save(programManagement).subscribe(
      ug => {
        this.router.navigate(['../'], { relativeTo: this.route });
      },
      err => { console.log(err) }
    );
  }
}
