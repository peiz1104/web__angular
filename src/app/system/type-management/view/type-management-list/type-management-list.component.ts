import { Component, OnInit } from '@angular/core';
import {CuiLayer, CuiPagination} from "console-ui-ng";
import {TypeManagement} from "../../entity/type-management";
import {ActivatedRoute, Router} from "@angular/router";
import {TypeManagementService} from "../../service/type-management.service";

@Component({
  selector: 'spk-type-management-list',
  templateUrl: './type-management-list.component.html',
  styleUrls: ['./type-management-list.component.scss']
})
export class TypeManagementListComponent implements OnInit {
  pagination: CuiPagination;
  columns;
  loading: boolean = true;
  searchtext;
  selected;
  typeManagement: TypeManagement[];
  constructor(private dialog: CuiLayer,
              private router: Router,
              private route: ActivatedRoute,
              private typeManagementService: TypeManagementService) {
    this.columns = [
      { title: '类型名称', data: 'name', styleClass: 'text-center' },
      { title: '所属栏目', data: 'programmanagement.name', styleClass: 'text-center' },
      { title: '创建人', data: 'createdByDisplayName', styleClass: 'text-center' },
      { title: '创建时间', tpl: 'lastModifiedDate', styleClass: 'text-center' },
      { title: '操作', tpl: 'actions', styleClass: 'text-right' }
    ];
  }

  ngOnInit() {
    this.loadData();
  }

  loadData(page?: CuiPagination) {
    this.pagination = page;
    let params = {
      name: this.searchtext,
      page: page ? page.number : 0,
      size: page ? page.size : '',
      sort: page && page.sort ? page.sort : ''
    };
    this.loading = true;
    this.typeManagementService.pageList(params).subscribe(
      pag => {
        this.pagination = pag;
        this.typeManagement = pag.content;
        console.log("1111-------", this.typeManagement);
        this.loading = false;
      }
    );
  }

  delete(id?: number) {
    let ids = id ? [id] : this.selected;
    if (!ids) {
      this.dialog.msg('请选择要删除的类型');
    }

    this.dialog.confirm(
      '确认要删除选中的类型吗？',
      () => {
        this.typeManagementService.delete(ids).subscribe(
          () => {
            this.dialog.msg('删除成功');
            this.loadData();
          },
          err => { }
        );
      }
    );
  }

  onSelect(selIds: any[]) {
    this.selected = selIds;
  }

}
