import { Component, OnInit } from '@angular/core';
import { TypeManagement } from "../../entity/type-management";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { TypeManagementService } from "../../service/type-management.service";
import { tipMessage } from "app/account/entity/message-tip";

@Component({
    selector: 'spk-edit-type-management',
    templateUrl: './edit-type-management.component.html',
    styleUrls: ['./edit-type-management.component.scss']
})
export class EditTypeManagementComponent implements OnInit {
    typeManagement: TypeManagement = new TypeManagement();
    constructor(private router: Router,
        private route: ActivatedRoute,
        private typeManagementService: TypeManagementService) { }

    ngOnInit() {
        this.route.params.subscribe(
            (params: Params) => {
                let ids = +params['id'];
                if (ids) {
                    this.loadData(ids);
                }
            }
        );
    }


    loadData(ids) {
        this.typeManagementService.getOne(ids).subscribe(
            typeManagement => {
                this.typeManagement = typeManagement;
            }
        );
    }

    doSubmit(event) {
        this.typeManagementService.saveUpdate(event.value).subscribe(
            ok => {
                tipMessage('修改类型成功', 'success');
                this.toList();
            },
            err => {
                tipMessage('修改类型失败', 'error');
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
