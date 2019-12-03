import { Component, OnInit } from '@angular/core';
import {ProgrammanagementGroup} from "../../entity/programmanagement-group";
import {ProgramManagementService} from "../../service/program-management.service";
import {ActivatedRoute, Router} from "@angular/router";
import {CuiLayer} from "console-ui-ng";

@Component({
  selector: 'spk-program-managerment',
  templateUrl: './program-managerment.component.html',
  styleUrls: ['./program-managerment.component.scss']
})
export class ProgramManagermentComponent implements OnInit {

  programmanagementGroup: ProgrammanagementGroup;
  activeProgrammanagement;
  programmanagements;
  subProgrammanagements;
  searchText;
  selected;
  columns;
  constructor(
    private programManagementService: ProgramManagementService,
    private router: Router,
    private route: ActivatedRoute,
    private layer: CuiLayer) {
    this.columns = [
      // { title: 'ID', data: 'id' },
      { title: '名称', data: 'name' },
      { title: '描述', data: 'description' },
      { title: '顺序', tpl: 'displaySort', class: 'text-center' },
      { title: '操作', tpl: 'actions', class: 'text-right' },
    ];
    ;
  }


  ngOnInit() {
    this.loadData();
  }
  delete(id?: number) {
    let ids = id ? [id] : this.selected;
    if (!ids) {
      this.layer.msg('请选择要删除的分类');
    }

    this.layer.confirm(
      '确认要删除选中的分类吗？',
      () => {
        this.programManagementService.delete(ids).subscribe(
          () => {
            this.layer.msg('删除成功');
            this.loadData();
          },
          err => { }
        );
      }
    );
  }

  loadData() {
   this.route.data.subscribe((data: { programmanagementGroup: ProgrammanagementGroup}) => {

        this.programmanagementGroup = data.programmanagementGroup;
        // this.loadData();
      });
    this.route.paramMap.subscribe(params => {
      let cgId = params.get('activeProgrammanagementId');
      let parentId;
        if (cgId) {
          console.log("cgId",cgId);
          this.programManagementService.getOne(cgId).subscribe(
            c => {
              this.activeProgrammanagement = c;
              parentId = this.activeProgrammanagement.id;
              console.log(" this.activeProgrammanagement-",parentId);
              this.findProgramManagement(parentId);
            }
          );
        } else {
          this.activeProgrammanagement = null;
          this.findProgramManagement(parentId);
        }
    });
  }

  findProgramManagement(parentId) {
    this.programManagementService.getAllOfPage({ parentId: parentId, identifier: this.programmanagementGroup.identifier }).subscribe(
      programmanagements => {
        this.programmanagements = programmanagements;
        this.subProgrammanagements = programmanagements;
      }
    );
  }
  onSelect(selIds: any[]) {
    this.selected = selIds;
  }
}
