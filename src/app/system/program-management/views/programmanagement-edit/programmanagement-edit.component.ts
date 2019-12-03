import { Component, OnInit } from '@angular/core';
import {Programmanagement} from "../../entity/programmanagement";
import {ProgrammanagementGroup} from "../../entity/programmanagement-group";
import {ProgramManagementService} from "app/system/program-management/service/program-management.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'spk-programmanagement-edit',
  templateUrl: './programmanagement-edit.component.html',
  styleUrls: ['./programmanagement-edit.component.scss']
})
export class ProgrammanagementEditComponent implements OnInit {
  programmanagement = new Programmanagement();
  programmanagementGroup:ProgrammanagementGroup;
  err;
  constructor(private programManagementService: ProgramManagementService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data
      .subscribe((data: { programmanagementGroup: ProgrammanagementGroup }) => {
        console.log('programmanagementGroup', data.programmanagementGroup);
        this.programmanagementGroup = data.programmanagementGroup;
      });
    this.route.paramMap.subscribe((params) => {
      this.programManagementService.getOne(+params.get('id')).subscribe(c => {
        this.programmanagement = c;
      });
    });
  }

  onSubmit(programmanagement: Programmanagement) {
    this.programManagementService.save(programmanagement).subscribe(
      ug => {
        this.router.navigate(['../../'], { relativeTo: this.route });
      },
      err => { console.log(err) }
    );
  }

}
