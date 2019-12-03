import { Privilege } from './../../entity/privilege';
import { Component, OnInit } from '@angular/core';
import { PermissionService } from '../../service/permission.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Role } from '../../entity/role';
import { Permission } from '../../entity/permission';
import { UserGroupService } from '../../service/user-group.service';
import { Observable } from 'rxjs/Observable';
import { UserGroup } from '../../entity/user-group';
import { tipMessage } from "app/account/entity/message-tip";

@Component({
    selector: 'spk-permission-add',
    templateUrl: './permission-add.component.html',
    styleUrls: ['./permission-add.component.scss']
})
export class PermissionAddComponent implements OnInit {

    users: any[];
    roleIds: number[] = [];
    privileges: Privilege[] = [];
    roleList = [];
    loading: boolean = false;

    userGroups: any[] = [];

    constructor(
        private permissionService: PermissionService,
        private router: Router,
        private route: ActivatedRoute,
    ) { }

    ngOnInit() {
        this.permissionService.getAllRoles()
            .subscribe(roles => {
                this.roleList = roles;
            });

    }

    onSelectUser(users) {
        this.users = users
    }
    // 保存授权
    save() {
        this.loading = true;
        let permissions = [];
        this.userGroups.forEach(target => {
            this.users.map(it => it.id).forEach(userId => {
                this.roleIds.forEach(id => {
                    let pm = new Permission();
                    pm.user = { id: userId };
                    pm.role = { id: id };
                    pm['targetId'] = target['id'];
                    pm['targetType'] = target['type'];
                    permissions.push(pm);
                });

                this.privileges.map(it => it.id).forEach(id => {
                    let pm = new Permission();
                    pm.user = { id: userId };
                    pm.privilege = { id: id };
                    pm['targetId'] = target['id'];
                    pm['targetType'] = target['type'];
                    permissions.push(pm);
                });
            })
        });

        if (permissions.length && this.users) {
            this.permissionService.savePermissions(permissions).subscribe(
                data => {
                    this.loading = false;
                    this.router.navigate(['../'], { relativeTo: this.route });
                },
                err => {
                    this.loading = false;
                    tipMessage(err, 'error');
                }
            );
        }
    }

    roleSelect(checked, role) {
        this.roleIds = this.roleList.filter(it => it.checked).map(it => it.id);
    }
}
