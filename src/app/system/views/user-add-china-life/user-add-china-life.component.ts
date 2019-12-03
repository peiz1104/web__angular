import { Component, OnInit } from '@angular/core';
import { User } from '../../entity/user';
import { UserChinaLifeService } from '../../service/user-china-life.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CuiLayer } from 'console-ui-ng';
import { tipMessage } from 'app/account/entity/message-tip';

@Component({
    selector: 'spk-user-add-china-life',
    templateUrl: './user-add-china-life.component.html',
    styleUrls: ['./user-add-china-life.component.scss']
})
export class UserAddChinaLifeComponent implements OnInit {

    err;
    loading: boolean = false;
    btnstatego: boolean = false;
    goonfail: any = 'true';
    constructor(private userService: UserChinaLifeService,
        private router: Router,
        private route: ActivatedRoute,
        private dialog: CuiLayer
    ) { }

    ngOnInit() {
    }

    save(formUser: User, type) {

        if (type == 's2') {
            this.addone(formUser)
        } else if (type == 'goon') {
            this.addgoon(formUser)
        }
    }

    onSave(event) {
        this.save(event.value, event.type);
    }

    addone(formUser) {
        this.loading = true;
        this.userService.add(formUser).subscribe(
            user => {
                this.loading = false;
                tipMessage('保存成功', 'success');
                this.router.navigate(['../', 'list'], { relativeTo: this.route });
            },
            err => {
                this.loading = false;
                this.err = err;
                tipMessage(err);
            }
        );
    }
    addgoon(formUser) {
        this.btnstatego = true;
        this.goonfail = 'goonprogress';
        this.userService.add(formUser).subscribe(
            user => {
                this.btnstatego = false;
                tipMessage('保存成功', 'success');
                this.goonfail = 'goonsuccess';
            },
            err => {
                this.btnstatego = false;
                this.err = err;
                this.goonfail = 'fail';
                tipMessage(err);
            }
        );
    }
}
