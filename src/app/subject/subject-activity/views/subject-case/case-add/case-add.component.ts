import { CaseInfo } from 'app/library/entity/case-info';
import { UserGroup } from 'app/system/entity/user-group';
import { CuiLayer, Message } from 'console-ui-ng';
import { ActivatedRoute } from '@angular/router';
import { OfferingCaseService } from './../../../../../learning/offering/service/offering-case-api.service';
import { Component, OnInit } from '@angular/core';
import { Params, Router } from '@angular/router';

@Component({
    selector: 'spk-case-add',
    templateUrl: './case-add.component.html',
    styleUrls: ['./case-add.component.scss']
})
export class CaseAddComponent implements OnInit {

    subjectId: number;
    caseInfo: CaseInfo = new CaseInfo();
    msg: Message[] = [];
    loading: boolean = false;
    userGroup: UserGroup;

    constructor(private offeringCaseService: OfferingCaseService,
        private router: Router,
        private route: ActivatedRoute,
        private dialog: CuiLayer
    ) { }

    ngOnInit() {
        this.route.params.subscribe(
            (params: Params) => {
                this.subjectId = +params['subjectId'];
            }
        );
        this.route.data.subscribe(
            (obj: { subjectActivity: any }) => {
                this.userGroup = new UserGroup();
                this.userGroup.id = obj.subjectActivity.userGroupId;
                this.userGroup.name = obj.subjectActivity.userGroupName;
            }
        );
        console.log(this.userGroup);
    }

    onSubmit(originalEvent) {
        this.loading = true;
        this.offeringCaseService.addData(this.subjectId, originalEvent.value).subscribe(
            caseInfo => {
                this.loading = false;
                this.dialog.msg('保存成功');
                this.router.navigate(["../"], { relativeTo: this.route });
            },
            err => {
                this.loading = false;
                this.msg = err;
            }
        );
    }

    onCancel(e) {
        this.toList();
    }

    toList() {
        this.router.navigate(['../'], { relativeTo: this.route });
    }

}
