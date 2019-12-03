import { Component, OnInit } from '@angular/core';
import { UserService } from '../../service/user.service';
import { User } from '../../entity/user';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { CuiLayer } from 'console-ui-ng';
import { FormDataUtil } from '../../../core';
import { CurrentUserGroup } from '../user-manage-index/user-manage-index.component';
import { tipMessage } from "app/account/entity/message-tip";

@Component({
    selector: 'spk-user-edit',
    templateUrl: './user-edit.component.html',
    styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit {
    user: User;
    saveLoading: boolean = false;

    constructor(
        private userService: UserService,
        private router: Router,
        private route: ActivatedRoute,
        private currentUserGroup: CurrentUserGroup
    ) {
        this.currentUserGroup.isFold = true;
    }

    ngOnInit() {
        this.route.params.subscribe(
            (params: Params) => {
                let userId = +params['userId'];
                this.loadData(userId);
            }
        );
    }

    loadData(userId) {
        this.userService.get(userId).subscribe(
            user => this.user = user
        );
    }

    save(formUser: User) {
        console.log(formUser)
        this.saveLoading = true;
        let fd = FormDataUtil.covert(formUser);
        fd.append("id", '' + this.user.id);
        this.userService.update(fd).subscribe(
            user => {
                this.saveLoading = false;
                tipMessage('保存成功', 'success');
                this.router.navigate(['../../', 'list'], { relativeTo: this.route });
            },
            err => {
                this.saveLoading = false;
                tipMessage(err);
            }
        );
    }

    onSave(event) {
        this.save(event.value);
    }

}
