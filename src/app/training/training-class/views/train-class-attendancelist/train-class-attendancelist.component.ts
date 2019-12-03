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
    selector: 'spk-train-class-attendancelist',
    templateUrl: './train-class-attendancelist.component.html',
    styleUrls: ['./train-class-attendancelist.component.scss']
})
export class TrainClassAttendancelistComponent implements OnInit {
    _searchForm: FormGroup;
    spinning: boolean = true;
    selection: any[] = [];
    testListData: any;
    trainId: any;
    personId: any;
    searchBy: {
        username?: string,
        displayName?: any,
        userGroup?: UserGroup[],
        attendanceScore?: any
    } = {};
    columns = [
        { title: '用户名', data: 'username' },
        { title: '姓名', data: 'displayName' },
        { title: '所属组织', tpl: 'userGroup' },
        { title: '考勤分数', tpl: 'attendanceScore' },
        { title: '操作', tpl: 'actions' }
    ];
    loadData(page?: Pagination<any>) {
        this.spinning = true;
        let params = {
            page: page ? page.number : 0,
            size: page ? page.size : 10,
            'course.id': this.personId,
            'offering.id': this.trainId
            // knowledgeId: this.selectTreeId
        };
        if (this.searchBy.userGroup != null) {
            params['orgIds'] = this.searchBy.userGroup.map(it => it.id);
        }
        this.apiservice.attendancemessagelist(params).subscribe(
            res => {
                console.log(res);
                this.spinning = false;
                this.testListData = res;
                this.selection = [];
            },
            err => {
                this.spinning = false;
                tipMessage(err);
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
            displayName: [],
            userGroup: [],
            attendanceScore: []
        })
        this.routeInfo.params.subscribe((params) => {
            this.personId = params.courseid;
        })
        this.routeInfo.parent.params.subscribe((params) => {
            this.trainId = params.tbcId
        })
        this.loadData()
    }
    // 搜索的加载列表
    _submitForm($event, value) {
        $event.preventDefault();
        // tslint:disable-next-line:forin
        // console.log(value)
        this.searchBy = value;
        this.loadData();
        return;
    }
    // 查看个人考勤信息列表
    viewpersondetail(id) {
        // tslint:disable-next-line:max-line-length
        this.route.navigate([`/training/class/${this.trainId}/attendancemessage/personmessagelist/${id}`], { queryParams: { courseid: this.personId } })
    }

}
