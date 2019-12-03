import { Component, OnInit } from '@angular/core';
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
    columns: any = [
        { title: '培训班名称', data: 'tbcName' },
        { title: '课程名称', data: 'courseName' },
        { title: '类型', tpl: 'accessType' },
        { title: '课程归属', tpl: 'headquartersCourse' },
        { title: '学时', data: 'periodNumber', styleClass: 'text-right' },
        { title: '描述', data: 'description' },
        // { title: '操作', tpl: 'actions', styleClass: 'text-center' },
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
                    'user.id': this.id,
                    year: this.year,
                };
                if (this.searchBy.searchName) {
                    paramsobj['searchName'] = this.searchBy.searchName;
                }
                if (this.searchBy.accessType) {
                    paramsobj['accessType'] = this.searchBy.accessType;
                }
                this.hourservice.getstaffdetaillist(paramsobj).subscribe(
                    res => {
                        // console.log(res, 4432)
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
        this.loadData();
    }
    _submitForm($event, value) {
        $event.preventDefault();
        // tslint:disable-next-line:forin
        console.log($event, value)
        this.searchBy = value;
        this.loadData();
        return;
    }
    // 导出
    export(event) {
        if (this.selection.length) {
            let ids = this.getIds(this.selection);
            let params = {
                ...this.searchBy,
                ids: ids,
                'user.id': this.id,
                year: this.year
            }
            if (this.searchBy.accessType) {
                params['accessType'] = this.searchBy.accessType;
            }
            this.confirmServ.confirm({
                title: '导出',
                content: '确定要导出所选项？',
                showConfirmLoading: true,
                zIndex: 1003,
                onOk: () => {
                    this.hourservice.exportDetailHour(params).subscribe(
                        res => {
                            // console.log(res);
                            let objfile = {
                                ...res,
                                fileName: '学员年度学时详情汇总统计'
                            }
                            this.tipMessage('success', '导出成功');
                            this.loadData();
                            this.hourservice.exportdownloadHour(objfile);
                        },
                        error => {
                            return this.tipMessage('error', error);
                        }
                    )
                },
                onCancel() { }
            })
        } else {
            let ids = this.getIds(this.selection);
            let params = {
                ...this.searchBy,
                'user.id': this.id,
                year: this.year
            }
            if (this.searchBy.accessType) {
                params['accessType'] = this.searchBy.accessType;
            }
            this.confirmServ.confirm({
                title: '导出',
                content: '确定要导出全部？',
                zIndex: 1003,
                onOk: () => {
                    this.hourservice.exportDetailHour(params).subscribe(
                        res => {
                            // console.log(res);
                            let objfile = {
                                ...res,

                                fileName: '学员年度学时详情汇总统计'
                            }
                            this.tipMessage('success', '导出成功!');
                            this.loadData();
                            this.hourservice.exportdownloadHour(objfile);
                        },
                        error => {
                            return this.tipMessage('error', error);
                        }
                    )
                },
                onCancel() { }
            })
        }

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
}
