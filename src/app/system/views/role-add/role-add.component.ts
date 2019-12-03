import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Subject } from 'rxjs/Subject';
import { tipMessage } from "app/account/entity/message-tip";
import { RoleService } from '../../service/role.service';
import { Role } from '../../entity/role';

@Component({
    selector: 'spk-role-add',
    templateUrl: './role-add.component.html',
    styleUrls: ['./role-add.component.scss']
})
export class RoleAddComponent implements OnInit {
    role: Role;
    nodes = [];
    loading: boolean = false;


    constructor(
        private roleService: RoleService,
        private router: Router,
        private route: ActivatedRoute
    ) { }

    ngOnInit() {
    }



    onSave(event) {
        this.loading = true;
        let value = event.value;
        value['privileges'] = value['privileges'] ? value['privileges'].map(it => {
            return { id: it.id };
        }) : [];
        this.roleService.add(value).subscribe(
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
        this.router.navigate(['../'], { relativeTo: this.route });
    }

}
