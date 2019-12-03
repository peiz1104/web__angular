import { Component, OnInit } from '@angular/core';
// import { UserService } from '../../service/user.service';
import { UserChinaLifeService } from '../../service/user-china-life.service';
import { User } from '../../entity/user';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { CuiLayer } from 'console-ui-ng';
import { FormDataUtil } from '../../../core';
import { UserAttribute } from '../../entity/user-attribute';
import { tipMessage } from 'app/account/entity/message-tip';
@Component({
    selector: 'spk-user-edit-china-life',
    templateUrl: './user-edit-china-life.component.html',
    styleUrls: ['./user-edit-china-life.component.scss']
})
export class UserEditChinaLifeComponent implements OnInit {
    user: User;
    err;
    spinning: boolean = true;
    loading: boolean = false;
    constructor(
        private userService: UserChinaLifeService,
        private router: Router,
        private route: ActivatedRoute,
        private dialog: CuiLayer
    ) { }

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
            user => {
                this.spinning = false;
                this.user = user
            }
        );
    }

    save(formUser: User) {
        // console.log(formUser.id, 999999911);
        this.loading = true;
        this.userService.update(formUser).subscribe(
            user => {
                this.dialog.msg('保存成功');
                this.loading = false;
                this.router.navigate(['../../', 'list'], { relativeTo: this.route });
            },
            err => {
                this.loading = false;
                tipMessage(err, '', 3000);
            }
        );
    }

    onSave(event) {
        this.save(event.value);

    }

}
