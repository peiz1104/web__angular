import { Component, OnInit } from '@angular/core';
import {CuiLayer, CuiPagination} from "console-ui-ng";
import {ApplicableObjects} from "../../entity/applicable-objects";
import {ActivatedRoute, Router} from "@angular/router";
import {ApplicableObjectsService} from "../../service/applicable-objects.service";

@Component({
  selector: 'spk-applicable-objects-list',
  templateUrl: './applicable-objects-list.component.html',
  styleUrls: ['./applicable-objects-list.component.scss']
})
export class ApplicableObjectsListComponent implements OnInit {
  pagination: CuiPagination;
  columns;
  loading: boolean = true;
  searchtext;
  selected;
  applicableobjects: ApplicableObjects[];
  constructor(private dialog: CuiLayer,
              private router: Router,
              private route: ActivatedRoute,
              private applicableObjectsService: ApplicableObjectsService) {
    this.columns = [
      { title: '适用对象名称', data: 'name', styleClass: 'text-center' },
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
    this.applicableObjectsService.pageList(params).subscribe(
      pag => {
        this.pagination = pag;
        this.applicableobjects = pag.content;
        this.loading = false;
      }
    );
  }

  delete(id?: number) {
    let ids = id ? [id] : this.selected;
    if (!ids) {
      this.dialog.msg('请选择要删除的适用对象');
    }

    this.dialog.confirm(
      '确认要删除选中的适应对象吗？',
      () => {
        this.applicableObjectsService.delete(ids).subscribe(
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
