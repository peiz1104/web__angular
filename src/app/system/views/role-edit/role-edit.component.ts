import { Role } from './../../entity/role';
import { RoleService } from './../../service/role.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { tipMessage } from "app/account/entity/message-tip";

@Component({
    selector: 'spk-role-edit',
    templateUrl: './role-edit.component.html',
    styleUrls: ['./role-edit.component.scss']
})
export class RoleEditComponent implements OnInit {

    role: Role;
    loading: boolean = false;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private roleApi: RoleService,
    ) { }

    ngOnInit() {
        let roleId = +this.route.snapshot.paramMap.get("roleId");
        if (roleId) {
            this.roleApi.get(roleId).subscribe(
                role => this.role = role
            );
        }
    }

    onSave(event) {
        this.loading = true;
        let value = event.value;
        value['privileges'] = value['privileges'] ? value['privileges'].map(it => {
            return { id: it.id };
        }) : [];
        value['id'] = this.role.id;
        this.roleApi.update(value).subscribe(
            role => {
                this.loading = false;
                tipMessage('保存成功', 'success');
                this.toList();
            },
            err => {
                this.loading = false;
            }
        );
    }

    onCancel(event) {
        this.toList();
    }

    toList() {
        this.router.navigate(['../../'], { relativeTo: this.route });
    }

}
