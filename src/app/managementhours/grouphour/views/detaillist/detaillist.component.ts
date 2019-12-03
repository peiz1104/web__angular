import { Component, OnInit ,Input} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HourService } from '../../../managementservice/hour.service';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { Pagination } from 'app/core/entity/pagination';
import {
    FormBuilder,
    FormGroup,
    FormControl,
    Validators
} from '@angular/forms';
declare let $: any;
@Component({
    selector: 'spk-detaillist',
    templateUrl: './detaillist.component.html',
    styleUrls: ['./detaillist.component.scss']
})
export class DetaillistComponent implements OnInit {
    @Input() userType: any;
    @Input() month: any;
    columns: any = [
        { title: '年份', data: 'year', styleClass: 'text-right' },
        { title: '月份', data: 'month', styleClass: 'text-right' },
        { title: '所属机构', tpl: 'userGroup',styleClass: 'text-left' },
        { title: '人员类型', tpl: 'typeCol', styleClass: 'text-center' },
        { title: '总人数', tpl: 'totalCountCol', styleClass: 'text-right' },
        { title: '通过人数', tpl: 'passCountCol', styleClass: 'text-right' },
        { title: '未通过人数', tpl: 'failCountCol', styleClass: 'text-right' },
        { title: '合格率', tpl: 'qualifieRateCol', styleClass: 'text-right' },
    ];
    _searchForm: FormGroup;
    spinning: boolean = true;
    selection: any[] = [];
    searchBy: {
        searchName?: any,
        accessType?: any
    } = {};
    testListData: any;
    id: any;
    year: any;
    constructor(
        private route: Router,
        private routeInfo: ActivatedRoute,
        private message: NzMessageService,
        private fb: FormBuilder,
        private hourservice: HourService,
        private confirmServ: NzModalService
    ) { }
    loadData(page?: Pagination<any>) {
        this.spinning = true;

        this.routeInfo.params.subscribe(
            params => {
                this.id = params.id;
                this.year = params.year;
                let paramsobj = {
                    page: page ? page.number : 0,
                    size: page ? page.size : 10,
                    'parentId': this.id,
                    year: this.year,
                    month: this.month,
                    type: this.userType,
                };
                if(this.searchBy.searchName){
                    paramsobj['userGroupName']  =  this.searchBy.searchName;
                }
                this.hourservice.getChildGroupPeriodList(this.id,paramsobj).subscribe(
                    res => {
                        this.spinning = false;
                        this.testListData = res;
                    },
                    err => {
                        this.spinning = false;
                        return this.tipMessage('error', err);
                    }
                )

            })

    }
    ngOnInit() {
        this._searchForm = this.fb.group({
            searchName: [],
            accessType: ['']
        })
        let userType = window.localStorage.getItem('userType')
        this.userType = JSON.parse(userType)
        let month = window.localStorage.getItem('month')
        this.month = JSON.parse(month)
        this.loadData();
    }
    _submitForm($event, value) {
        $event.preventDefault();
        // tslint:disable-next-line:forin
        this.searchBy = value;
        this.loadData();
        return;
    }
    // 导出
    export(event) {
            let params = {
                'parentId': this.id,
                year: this.year,
                month: this.month,
                type: this.userType,
            }
            if (this.searchBy.searchName) {
                params['userGroupName'] = this.searchBy.searchName;
            }
            this.confirmServ.confirm({
                title: '导出',
                content: '确定要导出吗？',
                zIndex: 1003,
                onOk: () => {
                    this.hourservice.exporChildGroupHour(params).subscribe(
                        res => {
                            // console.log(res);
                            let objfile = {
                                ...res,

                                fileName: '机构年度学时详情统计'
                            }
                            this.tipMessage('success', '导出成功!');
                            this.loadData();
                            this.hourservice.downloadUserGroupHour(objfile);
                        },
                        error => {
                            return this.tipMessage('error', error);
                        }
                    )
                },
                onCancel() { }
            })
        

    }
    getIds(array: any[]) {
        let ids = [];
        array.map((item, index) => {
            ids.push(item.id);
        })
        return ids;
    }
    tipMessage(type: string, text: string, duration?: number) {
        $.toast({
            icon: type,
            text: text,
            position: 'top-center',
            allowToastClose: false,
            hideAfter: duration || 1000
        })
    }

    //通过率计算
    qualifieRate(passcount, totalcount) {
        if (totalcount == 0) {
            return 0;
        } else {
            let passrate = passcount / totalcount * 100;
            if (passrate == 0) {
                return 0;
            } else {
                return passrate.toFixed(2);
            }
        }

    }


    // 所属机构处理
     namePath(str) {
            if (str) {
                return str.replace(/,/g, '/');
            } else {
                return "--";
            }
        }

}
