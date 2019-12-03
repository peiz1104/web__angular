import { Component, OnInit } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd';
import { Router, ActivatedRoute } from '@angular/router';
import { TrainingClassApiService } from '../../../../service/training-class-api.service';
import { Pagination } from 'app/core/entity/pagination';
import {
    FormBuilder,
    FormGroup,
    Validators,
    FormControl
} from '@angular/forms';
import { tipMessage } from 'app/account/entity/message-tip';

@Component({
    selector: 'spk-coursemessage',
    templateUrl: './coursemessage.component.html',
    styleUrls: ['./coursemessage.component.scss']
})
export class CoursemessageComponent implements OnInit {
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
        { title: '名称/编码', tpl: 'name' },
        { title: '类型/学时', tpl: 'type' },
        { title: '所属分类', tpl: 'cate' },
        { title: '操作', tpl: 'rowActions', styleClass: 'text-center' },
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
        private documnetservice: TrainingClassApiService,
        private fb: FormBuilder,
    ) { }
    // 加载课程详细列表
    loadcoursedetailList(id?: any, page?: Pagination<any>) {
        this.spinningDetail = true;
        let params = {
            page: page ? page.number : 0,
            size: page ? page.size : 10,
        };
        if (this.searchDetailBy.name) {
            params['name'] = this.searchDetailBy.name;
        } else {
            params['name'] = '';
        }
        this.documnetservice.getdocumentnformation(this.detailId, params).subscribe(
            res => {
                this.testListDataDetail = res;
                this.spinningDetail = false;
                this.selectionDetail = [];
            },
            err => {
                this.spinningDetail = false;
                return tipMessage(err);
            }
        )
    }
    // 加载基本费用列表
    loadData(page?: Pagination<any>) {
        this.spinning = true;
        let params = {
            page: page ? page.number : 0,
            size: page ? page.size : 10,
        };
        if (this.searchBy.trainFeeType) {
            params['course.name'] = this.searchBy.trainFeeType;
        } else {
            params['course.name'] = '';
        }
        this.documnetservice.getcoursemessage(this.trainId, params).subscribe(
            res => {
                // console.log(res);

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
    // 搜索的加载列表
    _submitForm($event, value) {
        $event.preventDefault();
        // tslint:disable-next-line:forin
        // console.log(value)
        this.searchBy = value;
        this.loadData();
        return;
    }
    getCourseTypeText(key) {
        let texts = { 'ONLINE': '在线学习', 'LIVE': '直播课堂', 'OFFLINE': '面授课程' };
        return texts[key] || '';
    }
    // 查看详细
    lookdetail(value) {
        this.isVisible = true;
        this.detailId = value.materialGroupId;
        this.searchForm = this.fb.group({
            name: []
        })
        this.loadcoursedetailList();
    }
    // modal框的显示影藏
    handleCancel(event) {
        this.isVisible = false;
        this.detailId = undefined;
    }
    handleOk(event) {
        this.isVisible = false;
        this.detailId = undefined;
    }
    // 搜索的加载列表
    submitForm($event, value) {
        $event.preventDefault();
        // tslint:disable-next-line:forin
        // console.log(value)
        this.searchDetailBy = value;
        this.loadcoursedetailList();
        return;
    }
}
