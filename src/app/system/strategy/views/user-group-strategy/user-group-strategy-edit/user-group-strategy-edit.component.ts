import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Used } from '../../../../../learning/strategy/enums/used.enum.';
import { SearchUserGroup } from '../user-group-strategy-index/user-group-strategy-index.component';

@Component({
  selector: 'spk-user-group-strategy-edit',
  templateUrl: './user-group-strategy-edit.component.html',
  styleUrls: ['./user-group-strategy-edit.component.scss']
})
export class UserGroupStrategyEditComponent implements OnInit {
  strategyId
  used = Used;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private currentUserGroup: SearchUserGroup
  ) {
    this.currentUserGroup.isFold = true;
  }

  ngOnInit() {
    this.route.params.subscribe(({id}) => {
      this.strategyId = id;
    });
  }

  toList(e?) {
    this.router.navigateByUrl('system/strategy/userGroup/list');
  }
}
