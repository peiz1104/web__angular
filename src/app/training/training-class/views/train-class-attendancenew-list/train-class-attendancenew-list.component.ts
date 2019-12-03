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
    selector: 'spk-train-class-attendancenew-list',
    templateUrl: './train-class-attendancenew-list.component.html',
    styleUrls: ['./train-class-attendancenew-list.component.scss']
})
export class TrainClassAttendancenewListComponent implements OnInit {

    _searchForm: FormGroup;
    spinning: boolean = true;
    selection: any[] = [];
    testListData: any;
    trainId: any;
    personId: any;
    exportstate: boolean;
    searchBy: {
        username?: string,
    } = {};
    columns = [
        { title: '员工姓名', tpl: 'displayName' },
        { title: '员工编号', tpl: 'username' },
        { title: '缺勤次数', data: 'time', styleClass: 'text-right' },
        // { title: '操作', tpl: 'actions' }
    ];
    loadData(page?: Pagination<any>) {
        this.spinning = true;
        let params = {
            page: page ? page.number : 0,
            size: page ? page.size : 10,
            tbcId: this.trainId,
        };
        if (this.searchBy.username) {
            params['username'] = this.searchBy.username
        }

        this.apiservice.attendancemessagenewList(params).subscribe(
            res => {
                this.spinning = false;
                this.testListData = res;
                this.exportstate = res.content.length > 0;
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
            username: []
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
        this.route.navigate([`/training/class/${this.trainId}/attendancemessage/personmessagelist/${id}`])
    }
    exportattendance(e) {
        let params = {
            tbcId: this.trainId,
            ids: this.getexportIds(this.selection),
        };
        this.apiservice.attendancemessagenewExport(params).subscribe(
            ok => {
                console.log(ok);
                let url = window.location.origin + ok.url;
                // this.apiservice.download(window.location.origin + '/content/attach/training_class/user-import-template.xlsx',
                //     'user-import-template.xlsx');
                this.apiservice.download(`/${ok.url}`,
                    '考勤信息导出.xlsx');
                // window.open(url);
                return tipMessage('导出成功!', 'success');
            },
            err => {
                return tipMessage(err);
            }
        )

    }
    // 获取对应选中的ids
    getIds(array) {
        let ids = [];
        array.map((item, index) => {
            ids.push(item.id);
        })
        return ids;
    }

    getexportIds(array) {
        let ids = [];
        array.map((item, index) => {
            ids.push(item.user.id);
        })
        return ids;
    }
}
