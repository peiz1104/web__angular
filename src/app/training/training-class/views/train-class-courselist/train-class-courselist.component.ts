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
// import { setTimeout } from 'timers';

@Component({
    selector: 'spk-train-class-courselist',
    templateUrl: './train-class-courselist.component.html',
    styleUrls: ['./train-class-courselist.component.scss']
})
export class TrainClassCourselistComponent implements OnInit {
    _searchForm: FormGroup;
    spinning: boolean = true;
    selection: any[] = [];
    testListData: any;
    trainId: any;
    searchBy: {
        name?: string,
        courseType?: any,
    } = {};
    columns = [
        { title: '课程名称', data: 'name' },
        { title: '课程时间', tpl: 'period' },
        { title: '培训方式', tpl: 'courseType' },
        { title: '操作', tpl: 'actions' }
    ]
    loadData(page?: Pagination<any>) {
        this.spinning = true;
        let params = {
            page: page ? page.number : 0,
            size: page ? page.size : 10,
            tbcId: this.trainId,
        };
        this.apiservice.attendancecourselist(params).subscribe(
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
        this._searchForm = this.fb.group({
            name: [],
            courseType: []
        })
        this.routeInfo.parent.params.subscribe((params) => {
            this.trainId = params.tbcId;
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
    // 查看考勤详情
    viewdetail(id) {
        this.route.navigate([`/training/class/${this.trainId}/attendancemessage/attendancelist/${id}`])
    }

}
