import { Component, OnInit } from '@angular/core';
import { AssistHomeApiService } from '../assist-home-api.service';
import { Pagination } from 'app/core/';

@Component({
  selector: 'spk-assist-tbc-list',
  templateUrl: './assist-tbc-list.component.html',
  styleUrls: ['./assist-tbc-list.component.scss']
})
export class AssistTbcListComponent implements OnInit {

  loading: boolean = false;
  _data: Pagination<any>;

  get hasMore() {
    return this._data && !this._data.last;
  }

  get content() {
    return this._data && this._data.content;
  }

  constructor(
    private assistHomeApi: AssistHomeApiService
  ) { }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.loading = true;
    this.assistHomeApi.tbcList().subscribe(
      data => {
        this._data = data;
        this.loading = false;
      },
      err => {
        this.loading = false;
      }
    );
  }
}
