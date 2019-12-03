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
    selector: 'spk-train-class-personmessagelist',
    templateUrl: './train-class-personmessagelist.component.html',
    styleUrls: ['./train-class-personmessagelist.component.scss']
})
export class TrainClassPersonmessagelistComponent implements OnInit {
    spinning: boolean = true;
    selection: any[] = [];
    testListData: any;
    trainId: any;
    personId: any;
    courseId: any;
    columns = [
        { title: '用户名', data: 'username' },
        { title: '姓名', data: 'displayName' },
        { title: '类型', tpl: 'type' },
        { title: '缺勤日期', tpl: 'date' },
        { title: '扣除分数', data: 'score' },
        { title: '描述信息', data: 'description' },
        { title: '操作', tpl: 'actions' }
    ];
    loadData(page?: Pagination<any>) {
        this.spinning = true;
        let params = {
            page: page ? page.number : 0,
            size: page ? page.size : 10,
            'offering.id': this.trainId,
            'course.id': this.courseId,
            'user.id': this.personId,
            // knowledgeId: this.selectTreeId
        };
        this.apiservice.attendancepersonlist(params).subscribe(
            res => {
                console.log(res);
                this.spinning = false;
                this.testListData = res;
                this.selection = [];
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
        this.routeInfo.queryParams.subscribe((params) => {
            this.courseId = params.courseid;
        })
        this.routeInfo.params.subscribe((params) => {
            this.personId = params.personid;
        })
        this.routeInfo.parent.params.subscribe((params) => {
            this.trainId = params.tbcId
        })
        this.loadData()
    }

}
