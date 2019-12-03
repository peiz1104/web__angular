import { Component, OnInit, OnDestroy, Injectable, ViewChild } from '@angular/core';
import * as _ from 'lodash';
import { Subject } from 'rxjs/Subject';
import { UserGroup } from '../../entity/user-group';
import { UserGroupTreeComponent } from '../../../shared/widget/user-group-tree/user-group-tree.component';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/merge';

const { isArray } = _;

@Injectable()
export class CurrentUserGroup {
  userGroup: UserGroup;
  subject: Subject<UserGroup> = new Subject();
  isFold = false;
  ugTree: UserGroupTreeComponent;

  current(): Observable<UserGroup> {
    if (this.subject && this.subject.isStopped) {
      this.subject = new Subject();
    }
    return Observable.of(this.userGroup).merge(this.subject);
  }
}

@Component({
  selector: 'spk-user-group-manage-index',
  templateUrl: './user-group-manage-index.component.html',
  styleUrls: ['./user-group-manage-index.component.scss'],
  providers: [CurrentUserGroup]
})
export class UserGroupManageIndexComponent implements OnInit, OnDestroy {

  @ViewChild("ugTree") ugTree: UserGroupTreeComponent;

  target;

  get isFold() {
    return this.subject && this.subject.isFold;
  }

  constructor(
    private subject: CurrentUserGroup
  ) { }

  ngOnInit() {
    if (null != this.subject) {
      this.subject.ugTree = this.ugTree;
    }
  }

  onUgSelectionChange(items) {
    items = items && isArray(items) ? items : (items ? [items] : []);
    let ug = items[0];
    this.target = ug;
    // this.loadData();
    this.subject.userGroup = ug;
    this.subject.subject.next(ug);
  }

  ngOnDestroy() {
    this.subject.subject.complete();
  }

}
