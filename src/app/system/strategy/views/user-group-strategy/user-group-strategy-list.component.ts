import { StrategyListComponent } from './../../../../learning/strategy/views/strategy-list/strategy-list.component';
import { Operation } from './../../../../public-suite/notice-box/enum/operation.enum';
import { Used } from './../../../../learning/strategy/enums/used.enum.';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Strategy } from '../../../../learning/strategy/entity/strategy';
import { StrategyService } from '../../../../learning/strategy/service/strategy/strategy.service';
import { ActivatedRoute, Router } from '@angular/router';
import * as _ from 'lodash';
import { SearchUserGroup } from './user-group-strategy-index/user-group-strategy-index.component';
const { isArray } = _;

@Component({
   selector: 'spk-user-group-strategy-list',
  templateUrl: './user-group-strategy-list.component.html',
  styleUrls: ['./user-group-strategy-list.component.scss']
})
export class UserGroupStrategyListComponent implements OnInit {
  userGroupId;
  @ViewChild(StrategyListComponent) sl: StrategyListComponent;
  used = Used;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public strategyService: StrategyService,
    private currentUserGroup: SearchUserGroup
  ) { }

  ngOnInit() {
    this.currentUserGroup.isFold = false;
    this.currentUserGroup.current().subscribe(ug => {
      console.log(ug);
      if (ug && ug['type'] != 'SITE') {
        this.userGroupId = ug.id;
        this.sl.loadData(this.userGroupId);
      } else {
        this.userGroupId = undefined ;
        // 查询站点下所有策略
        this.sl.loadData(this.userGroupId);
      }
    });
  }

//  loadData(uid?) {
//   this.strategyService.list("", uid).subscribe(
//     data => {
//       this.strategys = data;
//     },
//     error => {
//       this.message.error(error);
//     }
//   )
//  }

  toAdd(e?) {
    this.router.navigateByUrl('system/strategy/userGroup/add');
  }

  toEdit(sid?) {
    this.router.navigate(['system/strategy/userGroup' , sid, 'edit']);
  }

}
