import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { User } from '../../entity/user';
import { UserService } from '../../service/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CuiLayer } from 'console-ui-ng';
import { CurrentUserGroup } from '../user-manage-index/user-manage-index.component';
import { UserFormComponent } from '../../public/user-form/user-form.component';
import { tipMessage } from "app/account/entity/message-tip";

@Component({
    templateUrl: './user-add.component.html',
    styleUrls: ['./user-add.component.scss']
})
export class UserAddComponent implements OnInit, OnDestroy {
    err;
    saveLoading: boolean = false;
    nextLoading: boolean = false;
    user: User = new User();
    @ViewChild(UserFormComponent) uf: UserFormComponent;
    constructor(private userService: UserService,
        private router: Router,
        private route: ActivatedRoute,
        private currentUserGroup: CurrentUserGroup
    ) { }

    ngOnInit() {
        this.currentUserGroup.isFold = true;
        this.currentUserGroup.current().subscribe(ug => {
            if (ug && ug['type'] == 'USER_GROUP') {
                this.user.userGroup = ug;
            }
        });
    }

    ngOnDestroy() {
        this.currentUserGroup.subject.complete();
    }

    changeLoading(next, value) {
        if (next) {
            this.nextLoading = value;
        } else {
            this.saveLoading = value;
        }
    }
    save(event) {
        this.changeLoading(event.next, true);
        this.userService.add(event.value).subscribe(
            user => {
                this.changeLoading(event.next, false);
                tipMessage('保存成功', 'success');
                if (event.next) {
                    // 清空from表单
                    this.uf.initForm();
                } else {
                    this.router.navigate(['../', 'list'], { relativeTo: this.route });
                }
            },
            err => {
                this.changeLoading(event.next, false);
                this.err = err;
            }
        );
    }

    onSave(event) {
        this.save(event);
    }

}
