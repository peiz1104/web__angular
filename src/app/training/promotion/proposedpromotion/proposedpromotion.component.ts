import { Component, OnInit } from '@angular/core';
import { CuiLayer, CuiPagination } from "console-ui-ng";
import { Promotion } from "../../entity/promotion";
import { ActivatedRoute, Router } from "@angular/router";
import { PromotionService } from "../../service/promotion.service";
import { UserGroup } from 'app/system/entity/user-group';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { AuthService } from 'app/core';

@Component({
    selector: 'spk-proposedpromotion',
    templateUrl: './proposedpromotion.component.html',
    styleUrls: ['./proposedpromotion.component.scss']
})
export class ProposedpromotionComponent implements OnInit {
    pagination: CuiPagination;
    columns;
    loading: boolean = true;
    searchtext;
    selected: any[] = [];
    promotion: Promotion[];
    _searchForm: FormGroup;
    searchBy: {
        pid?: string,
        psnName?: string,
        currLeader?: string,
        userGroup?: UserGroup

    } = {};
    constructor(private dialog: CuiLayer,
        private router: Router,
        private confirmServ: NzModalService,
        private traingapiServer: AuthService,
        private fb: FormBuilder,
        private route: ActivatedRoute,
        private promotionService: PromotionService) {
        this.columns = [
            { title: '工号', data: 'pid', styleClass: 'text-center' },
            { title: '姓名', data: 'psnName', styleClass: 'text-center' },
            { title: '所属机构', tpl: 'userGroupNamePath', styleClass: 'text-left' },
            { title: '晋升前职级', data: 't09BeforeRank', styleClass: 'text-center' },
            { title: '晋升后职级', data: 't09AfterRank', styleClass: 'text-right' },
            { title: '当前主管工号', data: 'currLeader', styleClass: 'text-right' }
        ];
    }

    ngOnInit() {
        this._searchForm = this.fb.group({
            pid: [''],
            currLeader: [''],
            psnName: [''],
            userGroup: ['']

        })

        this.traingapiServer.getCurrentUser().subscribe(
            user => {
                if (user.managerGroup) {
                    this.searchBy.userGroup = user.managerGroup;
                    this._searchForm.get('userGroup').setValue([user.managerGroup])
                }
                this.loadData();
            }
        )

    }

    loadData(page?: CuiPagination) {
        this.pagination = page;
        let params = {
            type: 'E',
            page: page ? page.number : 0,
            size: page ? page.size : '',
            sort: page && page.sort ? page.sort : ''

        };
        if (this.searchBy.userGroup) {
            params['userGroupId'] = this.searchBy.userGroup.id;
        }
        if (this.searchBy.pid) {
            params['pid'] = this.searchBy.pid.trim();
        }
        if (this.searchBy.currLeader) {
            params['currLeader'] = this.searchBy.currLeader.trim();
        }
        if (this.searchBy.psnName) {
            params['psnName'] = this.searchBy.psnName.trim();
        }

        this.loading = true;
        this.promotionService.pageList(params).subscribe(
            pag => {
                this.pagination = pag;
                this.promotion = pag.content;
                this.loading = false;
                this.selected = [];
            }
        );
    }

    onSelect(selIds: any[]) {
        this.selected = selIds;
    }

    searchData(event, value) {
        this.searchBy = value;
        this.loadData();
    }

    // 导出
    export() {
        let type = "E";
        let ids = this.selected;
        let self = this;
        this.confirmServ.confirm({
            title: '导出',
            content: ids.length ? '确定要导出所选项？' : '确定要导出全部信息？',
            showConfirmLoading: true,
            zIndex: 1003,
            onOk() {
                if (ids.length) {
                    let paramsobj = {
                        ids: ids,
                        type: "E"
                    }
                    // console.log(paramsobj, 3345);
                    self.promotionService.export(paramsobj).subscribe(
                        result => {
                            // console.log(result, 222)
                            self.promotionService.exportdownload(type)
                        }
                    );
                } else {
                    let paramsobj = {
                        type: "E"
                    }
                    self.promotionService.export(paramsobj).subscribe(
                        result => {
                            // console.log(result, 223)
                            self.promotionService.exportdownload(type)
                        }
                    );
                }
            },
            onCancel() { }
        })



    }

    getNampath(value) {
        if (value) {
            if (value.indexOf(',') !== -1) {
                return value.replace(/(\,)|(\，)/g, '/')
            } else {
                return value;
            }
        } else {
            return '--'
        }
    }
}
