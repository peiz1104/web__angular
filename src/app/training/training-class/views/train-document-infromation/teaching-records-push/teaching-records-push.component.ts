import { Component, Input, OnInit } from '@angular/core';
import { NzModalService } from "ng-zorro-antd";
import { ActivatedRoute, Router } from "@angular/router";
import { TrainingClassApiService } from "../../../../service/training-class-api.service";
import { FormBuilder, FormGroup } from "@angular/forms";
import { Pagination } from "app/core";
import { tipMessage } from 'app/account/entity/message-tip';

@Component({
    selector: 'spk-teaching-records-push',
    templateUrl: './teaching-records-push.component.html',
    styleUrls: ['./teaching-records-push.component.scss']
})
export class TeachingRecordsPushComponent implements OnInit {
    _searchForm: FormGroup;
    searchForm: FormGroup;
    spinning: boolean = false;
    spinningDetail: boolean = false;
    trainId: any;
    detailId: any;
    testListData: any;
    testListDataDetail: any;
    isVisible: boolean = false;
    selection: any[] = [];
    selectionDetail: any[] = [];
    searchBy: {
        trainFeeType?: string,
    } = {};
    searchDetailBy: {
        name?: string
    } = {};
    columns = [
        { title: '课程名称', tpl: 'name' },
        { title: '讲师姓名', tpl: 'displayname' },
        { title: '讲师工号', tpl: 'username' },
        { title: '课时量', tpl: 'teachingPeriod' },
        { title: '评估结果', tpl: 'evaluationScore' },
      /*  { title: '推送AMIS情况', tpl: 'toamis' },*/
        /*   {title: '操作', tpl: 'rowActions', styleClass: 'text-center'},*/
    ];
    columnsDetail = [
        { title: '资料名称', tpl: 'colTitle' },
        { title: '文件大小', data: 'documentInfo.prettyFileSize' },
        { title: '文件格式', data: 'documentInfo.format' },
        { title: '文件类型', data: 'documentInfo.type' },
        { title: '转码状态', tpl: 'convertStatusCol' },
    ];

    constructor(
        private confrim: NzModalService,
        private route: Router,
        private routeInfo: ActivatedRoute,
        private apiservice: TrainingClassApiService,
        private fb: FormBuilder) {
    }

    loadData(page?: Pagination<any>) {
        this.spinning = true;
        let params = {
            page: page ? page.number : 0,
            size: page ? page.size : 10,
        };
        /*    if (this.searchBy.trainFeeType) {
              params['course.name'] = this.searchBy.trainFeeType;
            } else {
              params['course.name'] = '';
            }*/
        this.apiservice.getTeacherRecord(this.trainId, params).subscribe(
            res => {
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

    ngOnInit() {

        this._searchForm = this.fb.group({
            trainFeeType: ['']
        })

        this.routeInfo.parent.params.subscribe(
            params => {
                this.trainId = params.tbcId;
            }
        )

        this.loadData()

    }

}
