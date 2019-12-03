import { Component, OnInit, Injectable, OnDestroy } from '@angular/core';
import { UserGroup } from '../../../../entity/user-group';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import * as _ from 'lodash';
const { isArray } = _;

@Injectable()
export class SearchUserGroup {
  userGroup: UserGroup;
  subject: Subject<UserGroup> = new Subject();
  isFold = false;

  current(): Observable<UserGroup> {
    if (this.subject && this.subject.isStopped) {
      this.subject = new Subject();
    }
    return Observable.of(this.userGroup).merge(this.subject);
  }
}

@Component({
  selector: 'spk-user-group-strategy-index',
  templateUrl: './user-group-strategy-index.component.html',
  styleUrls: ['./user-group-strategy-index.component.scss'],
  providers: [SearchUserGroup]
})

export class UserGroupStrategyIndexComponent implements OnInit, OnDestroy {
  target;

  get isFold() {
    return this.subject && this.subject.isFold;
  }

  constructor(
    private subject: SearchUserGroup
  ) { }

  ngOnInit() {
  }

  onUgSelectionChange(items) {
    items = items && isArray(items) ? items : (items ? [items] : []);
    let ug = items[0];
    this.subject.userGroup = ug;
    this.subject.subject.next(ug);
  }

  ngOnDestroy() {
    this.subject.subject.complete();
  }
}
