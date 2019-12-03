import { CaseInfo } from './../../../../../library/entity/case-info';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { CuiLayer, Message } from 'console-ui-ng';
import { CaseInfoService } from '../../../../../library/service/case.service';
import { Classroom } from '../../../entity/classroom';
import { tipMessage } from 'app/account/entity/message-tip';

@Component({
    selector: 'spk-case-edit',
    templateUrl: './case-edit.component.html',
    styleUrls: ['./case-edit.component.scss']
})
export class CaseEditComponent implements OnInit {

    msg: Message[];
    caseInfo: CaseInfo;
    loading: boolean = false;

    constructor(private caseInfoService: CaseInfoService,
        private router: Router,
        private route: ActivatedRoute) { }

    ngOnInit() {
        this.route.params.subscribe(
            (params: Params) => {
                let caseId = +params['caseId'];
                this.caseInfoService.get(caseId).subscribe(
                    formCaseInfo => {
                        this.caseInfo = formCaseInfo;
                    }
                );
            }
        );
    }

    onSubmit(event) {
        this.loading = true;
        this.caseInfoService.update(event.value).subscribe(
            trainBase => {
                this.loading = false;
                tipMessage('保存成功', 'success');
                this.router.navigate(['../../'], { relativeTo: this.route });
            },
            err => {
                this.loading = false;
                this.msg = [{ severity: 'danger', summary: '保存失败', detail: err, id: 1 }];
            }
        );
    }

    onCancel(e) {
        this.toList();
    }

    toList() {
        this.router.navigate(['../../'], { relativeTo: this.route });
    }
}
