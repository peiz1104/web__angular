import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { LogicGroup } from '../../entity/logic-group';
import { FormGroup } from '@angular/forms/src/model';
import { FormBuilder, Validators, NgForm } from '@angular/forms';
import { FormDataUtil } from 'app/core/utils/form-data-util';
import { Location } from '@angular/common';
import { CuiLayerRef } from 'console-ui-ng';
import { NzModalSubject } from 'ng-zorro-antd';
import { UserGroup } from './../../../system/entity/user-group';
import { tipMessage } from "app/account/entity/message-tip";

@Component({
    selector: 'spk-logic-group-lookup-form',
    templateUrl: './logic-group-lookup-form.component.html',
    styleUrls: ['./logic-group-lookup-form.component.scss']
})
export class LogicGroupLookupFormComponent implements OnInit {

    @Input() logicGroup: LogicGroup;
    @Input() isCreate: boolean;
    @Input() loading: boolean;
    @Input() modalSubject: NzModalSubject;
    @Output() doSubmit = new EventEmitter();
    userGroupType: boolean = false;
    userGroup: UserGroup = new UserGroup();
    constructor(
        private location: Location,
    ) { }

    ngOnInit() {
        if (this.isCreate) {
            this.logicGroup = new LogicGroup();
            this.logicGroup.isPrivate = "N";
        }
    }

    onSubmit(f: NgForm) {
        console.log(this.logicGroup);

        if (this.logicGroup.userGroup == null) {
            tipMessage('组织不能为空', 'error');
        } else if (this.logicGroup.name && this.logicGroup.name.trim().length > 0) {
            this.doSubmit.emit(this.logicGroup);
        } else {
            tipMessage('名称不能为空', 'error');
        }
    }

    closeLookUp(event) {
        this.modalSubject.destroy("onOk");
    }

    logSelectGroup(event) {
        this.userGroupType = event ? false : true;
    }
}
