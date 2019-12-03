import { Component, OnInit } from '@angular/core';
import { TypeManagement } from "../../entity/type-management";
import { ActivatedRoute, Router } from "@angular/router";
import { TypeManagementService } from "../../service/type-management.service";
import { tipMessage } from "app/account/entity/message-tip";

@Component({
    selector: 'spk-add-type-management',
    templateUrl: './add-type-management.component.html',
    styleUrls: ['./add-type-management.component.scss']
})
export class AddTypeManagementComponent implements OnInit {
    typeManagement: TypeManagement = new TypeManagement();
    selectedMultipleOption;
    constructor(private router: Router,
        private route: ActivatedRoute,
        private typeManagementService: TypeManagementService, ) { }

    ngOnInit() {
    }

    doSubmit({ originalEvent, value }) {

        console.log("111", value);
        this.typeManagementService.create(value).subscribe(
            ok => {
                tipMessage('添加成功', 'success');
                this.toList();
            },
            err => {
                tipMessage('添加失败', 'error');
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
