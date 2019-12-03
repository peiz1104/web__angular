import { Component, OnInit, DoCheck } from '@angular/core';
import { UserGroup } from '../../entity/user-group';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { HourService } from '../../../managementservice/hour.service';
import { Router, ActivatedRoute } from '@angular/router';
import {
    FormBuilder,
    FormGroup,
    FormControl,
    Validators
} from '@angular/forms';

@Component({
    selector: 'spk-traintypemanage',
    templateUrl: './traintypemanage.component.html',
    styleUrls: ['./traintypemanage.component.scss']
})
export class TraintypemanageComponent implements OnInit, DoCheck {
    url = '';
    constructor(
        private message: NzMessageService,
        private confirmServ: NzModalService,
        private hourservice: HourService,
        private fb: FormBuilder,
        private route: Router,
        private routeInfo: ActivatedRoute

    ) { }
    ngOnInit() {
        // console.log(this.route.url, 333)
        this.url = this.route.url;
    }
    ngDoCheck() {
        this.url = this.route.url;
    }

}
