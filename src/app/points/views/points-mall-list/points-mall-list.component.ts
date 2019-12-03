import { UserGroupService } from './../../../system/service/user-group.service';
import { UserGroup } from 'app/system/entity/user-group';
import { Pagination } from 'app/core';
import { Component, OnInit } from '@angular/core';
import { PointsMallListApiService } from '../../service/points-mall-list-api.service';
import {PointsMall } from '../../entity/points-mall';
import { CuiPagination, PaginationModel, CuiLayer } from 'console-ui-ng';
import { Column } from 'console-ui-ng';
import * as moment from 'moment';
import * as _ from 'lodash';

const { isArray } = _;

@Component({
  // selector: 'spk-points-rule-list',
  templateUrl: './points-mall-list.component.html',
  styleUrls: ['./points-mall-list.component.scss']
})
export class PointsMallListComponent implements OnInit {
  users: PointsMall[];
  pagination: CuiPagination;
  columns: Column[];
  userGroupIdselected;

  selected;
  searchtext;

  isComplexSearch = false;

  target: any;
  loading: boolean = true;


  ugSearchText;
  ugSearchResult: Pagination<UserGroup>;

  constructor(private userService: PointsMallListApiService, private dialog: CuiLayer, private userGroupApi: UserGroupService) {
    this.columns = [
      { title: 'ID', data: 'id', visible: false},
      { title: '名称', data: 'name' },
      { title: '所属组织', data: 'userGroup.name', visible: true },
      { title: '开始日期', tpl: 'startDate' },
      { title: '到期日期', tpl: 'endDate' }

    ];
  }

  ngOnInit() {
    this.loadData();
  }

  loadData(page?: CuiPagination) {
    this.pagination = page || this.pagination;
    // console.log(page);
    let params = {
      // 'userGroup.id': this.userGroup && this.userGroup.id && this.userGroup['type'] == 'USER_GROUP' ? this.userGroup.id : '',
      searchtext: this.searchtext,
      page: this.pagination ? this.pagination.number : 0,
      size: this.pagination ? this.pagination.size : '',
      sort: this.pagination && this.pagination.sort ? this.pagination.sort : '',
      withChildGroup: true
    };

    if (this.target && this.target['id']) {
      // if (this.target['type'] == 'SITE') {
      //   params['site.id'] = this.target['id'];
      // }
    
      if (this.target['type'] == 'USER_GROUP') {
        params['userGroup.id'] = this.target['id'];
        this.userGroupIdselected= this.target['id'];
      }
    }

    this.loading = true;
    this.userService.pointsrules(params).subscribe(
      pag => {
        this.pagination = pag;
        this.users = pag.content;
        this.loading = false;
      }
    );
  }

  onSelect(selIds: any[]) {
    // console.log(selIds);
    this.selected = selIds;
  }

  delete(id?) {
    console.log(id);
    let ids = id ? [id] : this.selected;

    if (!ids) {
      this.dialog.msg('请选择要删除的商城');
    }

    this.dialog.confirm(
      '确认要删除选中的商城吗？',
      () => {
        this.userService.delete(ids).subscribe(
          () => {
            this.dialog.msg('删除成功');
            this.loadData();
          },
          err => { }
        );
      }
    );
  }

  onUgSelectionChange(items) {
    items = items && isArray(items) ? items : (items ? [items] : []);
    let ug = items[0];
    this.target = ug;
    console.log(this.target);
    this.loadData();
  }

  onUserGroupSearch(searchText) {
    if (searchText) {
      this.userGroupApi.search(searchText, 0, 20).subscribe(
        ugs => {
          this.ugSearchResult = ugs;
        }
      )
    } else {
      this.ugSearchResult = null;
    }
  }

  getPath(ug: UserGroup) {
    if (!ug) {
      return null;
    }
    if ( ug.namePath) {
      return ug.namePath.split(',');
    } else {
      return [ug.name];
    }
  }


  getDate(date){
      if(date!=null){
        return moment(date).format('YYYY-MM-DD');    // 2017-12-01
      }else{
        return ;
      }
    }
}
