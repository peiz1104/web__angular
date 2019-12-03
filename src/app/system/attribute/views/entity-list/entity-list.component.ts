import { Column } from 'console-ui-ng';
import { BusinessEntityApiService } from './../../service/business-entity-api.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'spk-entity-list',
  templateUrl: './entity-list.component.html',
  styleUrls: ['./entity-list.component.scss']
})
export class EntityListComponent implements OnInit {

  entities: any[];
  loading: boolean = false;

  columns: Column[] = [
    {title: '对象名称', data: 'name'},
    {title: '描述', data: 'intro'},
    {title: '操作', tpl: 'actions', styleClass: 'text-right'},
  ];

  constructor(private entityApi: BusinessEntityApiService) { }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.loading = true;
    this.entityApi.getAllOfPage({page: 0, size: 1000}).subscribe(
      data => {
        this.entities = data.content;
        this.loading = false;
      },
      err => {
        this.loading = false;
      }
    );
  }

}
