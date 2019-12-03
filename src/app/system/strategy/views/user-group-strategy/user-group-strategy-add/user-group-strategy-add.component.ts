import { SearchUserGroup } from './../user-group-strategy-index/user-group-strategy-index.component';
import { UserGroup } from 'app/system/entity/user-group';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Used } from '../../../../../learning/strategy/enums/used.enum.';
import { Router, ActivatedRoute } from '@angular/router';
import { CurrentUserGroup } from '../../../../views/user-group-manage-index/user-group-manage-index.component';
import * as _ from 'lodash';
const { isArray } = _;

@Component({
    selector: 'spk-user-group-strategy-add',
    templateUrl: './user-group-strategy-add.component.html',
    styleUrls: ['./user-group-strategy-add.component.scss']
})
export class UserGroupStrategyAddComponent implements OnInit, OnDestroy {
    userGroup: UserGroup;
    used = Used;
    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private currentUserGroup: SearchUserGroup
    ) { }

    ngOnInit() {
        this.currentUserGroup.isFold = true;
        this.currentUserGroup.current().subscribe(ug => {
            if (ug && ug['type'] == 'USER_GROUP') {
                this.userGroup = ug;
            }
        });
    }

    ngOnDestroy() {
        this.currentUserGroup.subject.complete();
    }

    toList(e?) {
        this.router.navigateByUrl('system/strategy/userGroup/list');
    }
}
