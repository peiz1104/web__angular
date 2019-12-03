import { Component, OnInit, AfterViewChecked, OnDestroy, Injectable } from '@angular/core';
import * as _ from 'lodash';
import { Subject } from 'rxjs/Subject';
import { UserGroup } from '../../entity/user-group';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/merge';

const { isArray } = _;

@Injectable()
export class CurrentUserGroup {
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
    selector: 'spk-user-manage-index',
    templateUrl: './user-manage-index.component.html',
    styleUrls: ['./user-manage-index.component.scss'],
    providers: [CurrentUserGroup]
})
export class UserManageIndexComponent implements OnInit, OnDestroy, AfterViewChecked {
    target;
    showGroupTree: boolean;
    get isFold() {
        return this.subject && this.subject.isFold;
    }

    constructor(
        private subject: CurrentUserGroup,
        private router: Router,
    ) { }

    ngOnInit() {
        // tslint:disable-next-line:max-line-length
        this.showGroupTree = this.router.url.indexOf('importchinalife') != -1 || this.router.url.indexOf('addchinalife') != -1 || this.router.url.indexOf('editchinalife') != -1;
    }
    ngAfterViewChecked() {
        // tslint:disable-next-line:max-line-length
        this.showGroupTree = this.router.url.indexOf('importchinalife') != -1 || this.router.url.indexOf('addchinalife') != -1 || this.router.url.indexOf('editchinalife') != -1;
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
