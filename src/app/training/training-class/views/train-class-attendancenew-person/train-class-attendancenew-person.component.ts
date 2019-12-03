import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd';
import { Pagination } from 'app/core/entity/pagination';
import { UserGroup } from './../../../entity/user-group';
import { TrainingClassApiService } from './../../../service/training-class-api.service';
import {
    FormBuilder,
    FormGroup,
    Validators,
    FormControl
} from '@angular/forms';
import { tipMessage } from 'app/account/entity/message-tip';

@Component({
    selector: 'spk-train-class-attendancenew-person',
    templateUrl: './train-class-attendancenew-person.component.html',
    styleUrls: ['./train-class-attendancenew-person.component.scss']
})
export class TrainClassAttendancenewPersonComponent implements OnInit {

    _searchForm: FormGroup;
    spinning: boolean = true;
    testListData: any;
    trainId: any;
    personId: any;
    searchBy: {
        username?: any,
    } = {};
    columns = [
        { title: '员工姓名', tpl: 'displayName' },
        { title: '员工编号', tpl: 'username' },
        { title: '时间', data: 'createdDate' },
    ];
    loadData(page?: Pagination<any>) {
        this.spinning = true;
        let params = {
            page: page ? page.number : 0,
            size: page ? page.size : 10,
            tbcId: this.trainId,
            userId: this.personId
        };
        if (this.searchBy.username) {
            params['username'] = this.searchBy.username;
        }
        this.apiservice.attendancepersonnewList(params).subscribe(
            res => {
                this.spinning = false;
                this.testListData = res;
            },
            err => {
                this.spinning = false;
                return tipMessage(err);
            }
        )

    }
    constructor(
        private route: Router,
        private routeInfo: ActivatedRoute,
        private confirmServ: NzModalService,
        private fb: FormBuilder,
        private apiservice: TrainingClassApiService
    ) { }

    ngOnInit() {
        this._searchForm = this.fb.group({
            username: [],

        })
        this.routeInfo.params.subscribe((params) => {
            this.personId = params.personid;
        })
        this.routeInfo.parent.params.subscribe((params) => {
            this.trainId = params.tbcId
        })
        this.loadData()
    }

    _submitForm($event, value) {
        $event.preventDefault();
        // tslint:disable-next-line:forin
        // console.log(value)
        this.searchBy = value
        this.loadData();
        return;
    }

}
