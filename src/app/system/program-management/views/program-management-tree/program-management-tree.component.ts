import { Component, OnInit, Output, EventEmitter, Input, OnChanges } from '@angular/core';
import {CuiTreeConfig, CuiTreeNode} from "console-ui-ng";
import {ProgrammanagementGroup} from "../../entity/programmanagement-group";
import {ProgramManagermentGroupService} from "../../service/program-managerment-group.service";
import {ProgramManagementService} from "../../service/program-management.service";
import {Observable} from "rxjs/Observable";
import {tipMessage} from "app/account/entity/message-tip";

@Component({
  selector: 'spk-program-management-tree',
  templateUrl: './program-management-tree.component.html',
  styleUrls: ['./program-management-tree.component.scss']
})
export class ProgramManagementTreeComponent implements OnInit,OnChanges {
  @Output() selectionChange = new EventEmitter();
  programmanagementGroup: ProgrammanagementGroup;
  @Input() identifier;
  categories;
  roots;
  config: CuiTreeConfig;


  constructor(private programManagementService: ProgramManagementService, private programManagermentGroupService: ProgramManagermentGroupService) { }

  initConfig() {
    this.config = {
      async: {
        enable: true,
        loadChildren: (node: CuiTreeNode): Observable<any> => {
          return this.programManagementService.getAll({
            parentId: node.data.id,
            identifier: this.identifier
          }).catch(() => {
            tipMessage('树加载失败','warning');
            return Observable.of(null);
          });
        },
        dataFilter: (data, node: CuiTreeNode) => {
          if (!node.parent && node.data.virtual) {
            if (data && data.length > 0) {
              data[0]['selected'] = true;
              // data[0]['expanded'] = true;
            }
          }
          return data;
        }
      },
      data: {
        key: {
          id: 'id',
          label: 'name',
          children: 'children'
        }
      }
    };
  }

  ngOnInit() {
  }
  ngOnChanges() {
    console.log('identifier', this.identifier);
    this.programManagermentGroupService.getByIdentifier(this.identifier).subscribe(
      obj => {
        this.programmanagementGroup = obj;
        this.roots = [{ id: '', name: this.programmanagementGroup.name, selected: true, expanded: true, hasChildren: true }];
        if (this.config) {
          this.config = null;
        }
        this.initConfig();
        console.log('config--------------------', this.config);
      },
      err => {
        console.log('查找分类分组失败');
      }
    );
  }
  onSelectionChange(selection) {
    let datas = selection.map(it => it.data);
    this.selectionChange.emit(datas);
  }
}
