import { Message } from 'console-ui-ng';
import { Component, OnInit } from '@angular/core';
import { UserGroup } from '../../entity/user-group';
import { Router, ActivatedRoute } from '@angular/router';
import { UserGroupService } from '../../service/user-group.service';
import { CurrentUserGroup } from '../user-group-manage-index/user-group-manage-index.component';
import { tipMessage } from 'app/account/entity/message-tip';

@Component({
    selector: 'spk-user-group-add',
    templateUrl: './user-group-add.component.html',
    styleUrls: ['./user-group-add.component.scss']
})
export class UserGroupAddComponent implements OnInit {
    userGroup: UserGroup = new UserGroup();
    err;
    loading: boolean = false;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private ugService: UserGroupService,
        private currentUserGroup: CurrentUserGroup
    ) { }

    ngOnInit() {
        this.currentUserGroup.isFold = true;
        this.route.data.subscribe(
            (data: { activedGroup: UserGroup }) => {
                this.userGroup.parent = data.activedGroup;
            }
        );
    }

    onSubmit(userGroup: UserGroup) {
        this.loading = true;
        this.ugService.add(userGroup).subscribe(
            ug => {
                this.loading = false;
                tipMessage("添加成功", 'success');
                this.currentUserGroup.ugTree.refresh(userGroup.parent, false);
                this.router.navigate(['../'], { relativeTo: this.route });
            },
            err => {
                this.loading = false;
                this.err = err;
                tipMessage(err);
            }
        );
    }

}
