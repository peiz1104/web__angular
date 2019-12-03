import { UserGroupService } from './../../../system/service/user-group.service';
import { UserGroup } from 'app/system/entity/user-group';
import { Pagination } from 'app/core';
import { Component, OnInit } from '@angular/core';
import { PointsDetailListApiService } from '../../service/points-detail-list-api.service';
import {PointsDetailList } from '../../entity/points-detail-list';
import { CuiPagination, PaginationModel, CuiLayer } from 'console-ui-ng';
import { Column } from 'console-ui-ng';

import * as _ from 'lodash';

const { isArray } = _;

@Component({
  // selector: 'spk-points-rule-list',
  templateUrl: './points-detail-list.component.html',
  styleUrls: ['./points-detail-list.component.scss']
})
export class PointsDetailListComponent implements OnInit {
  users: PointsDetailList[];
  pagination: CuiPagination;
  columns: Column[];

  selected;
  searchtext;

  isComplexSearch = false;

  target: any;
  loading: boolean = true;


  ugSearchText;
  ugSearchResult: Pagination<UserGroup>;

  constructor(private userService: PointsDetailListApiService, private dialog: CuiLayer, private userGroupApi: UserGroupService) {
    this.columns = [
      { title: 'ID', data: 'id', visible: false},
      { title: '用户名', data: 'username' },
      { title: '姓名', data: 'displayName' },
      { title: '手机号', data: 'phoneNumber' },
      { title: '邮箱', data: 'email' },
      { title: '性别', tpl: 'sex' },
      { title: '所属组织', data: 'userGroup.name', visible: true },
      { title: '开始日期', data: 'startDate', visible: false },
      { title: '到期日期', data: 'endDate', visible: false },
      { title: '状态', data: 'status', tpl: 'statusCol' },
      { title: '剩余积分', data: 'language', tpl: 'statusCol' }
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

  // delete(id?) {
  //   let ids = id ? [id] : this.selected;

  //   if (!ids) {
  //     this.dialog.msg('请选择要删除的用户');
  //   }

  //   this.dialog.confirm(
  //     '确认要删除选中的用户吗？',
  //     () => {
  //       this.userService.delete(ids).subscribe(
  //         () => {
  //           this.dialog.msg('删除成功');
  //           this.loadData();
  //         },
  //         err => { }
  //       );
  //     }
  //   );
  // }

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
}
