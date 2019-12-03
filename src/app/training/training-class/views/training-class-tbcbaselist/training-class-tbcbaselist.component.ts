import { Component, OnInit } from '@angular/core';
import { Pagination } from "../../../../core/entity/pagination";
import { TbcBase } from "../../../entity/tbc-base";
import { Column, CuiPagination } from "console-ui-ng";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { FormGroup, FormBuilder } from '@angular/forms';
import { NzModalService } from "ng-zorro-antd";
import { TrainingClassTbcbaseService } from "../../service/training-class-tbcbase.service";
import { TrainingClassTbcbaseaddComponent } from "../training-class-tbcbaseadd/training-class-tbcbaseadd.component";
import { tipMessage } from 'app/account/entity/message-tip';
@Component({
    selector: 'spk-training-class-tbcbaselist',
    templateUrl: './training-class-tbcbaselist.component.html',
    styleUrls: ['./training-class-tbcbaselist.component.scss']
})
export class TrainingClassTbcbaselistComponent implements OnInit {
    id: number;
    data: Pagination<TbcBase>;
    loading: boolean = true;
    offeringId: number;
    selection: any;
    isWife: boolean = false;
    isPick: boolean = false;
    looktbcBaseId: number;
    columns: Column[] = [
        { title: '基地名称', data: 'baseName', styleClass: 'text-left' },
        { title: '编号', data: 'baseNo', styleClass: 'text-left' },
        /*  { title: '类型', data: 'baseType', tpl: 'baseTypeCol', styleClass: 'text-center' },*/
        /*        { title: '面积', data: 'buildArea', styleClass: 'text-center' },
                { title: '等级', data: 'baseLevel', styleClass: 'text-center' },*/
        { title: '地址', data: 'baseAddress', styleClass: 'text-left' },
        { title: 'wifi信息查看', tpl: 'lookwife', styleClass: 'text-center' },
        { title: '接站地点查看', tpl: 'lookpick', styleClass: 'text-center' },
        { title: '操作', tpl: 'rowActions', styleClass: 'text-center' }
    ]


    _searchForm: FormGroup;
    _isComplexSearch: boolean = false;
    constructor(private fb: FormBuilder,
        private trainingBaseApi: TrainingClassTbcbaseService,
        private modalService: NzModalService,
        private router: ActivatedRoute) { }

    ngOnInit() {
        this.router.params.subscribe(
            obj => {
                this.offeringId = obj['tbcId'];
            }
        );
        this.initSearchForm();
        this.loadData();
    }

    initSearchForm() {
        this._searchForm = this.fb.group({
            tbcBaseName: [],
        });
    }

    loadData(page?: CuiPagination) {
        this.loading = true;
        this.data = page;
        let params = {
            ...this._searchForm.value,
            offeringId: this.offeringId && this.offeringId || '',
            page: page ? page.number : 0,
            size: page ? page.size : 10,
        };
        this.trainingBaseApi.getrainingClassTbcbase(params).subscribe(
            obj => {
                this.data = obj;
                this.loading = false;
            },
            err => {
                tipMessage(err);
                this.loading = false;
            }
        )
    }

    _submitForm($event, value) {
        $event.preventDefault();
        this.loadData();
    }

    showTrainBase() {




        this.router.params.subscribe(
            obj => {
                this.offeringId = obj['tbcId'];
            }
        );
        // this.isVisible = true;
        const subscription = this.modalService.open({
            title: '选择基地',
            content: TrainingClassTbcbaseaddComponent,
            maskClosable: false,
            width: 960,
            onOk() {
            },
            onCancel() {
                // console.log('Click cancel');
            },
            footer: false,
            componentParams: {
                offeringId: this.offeringId
            }
        });
        subscription.subscribe(result => {
            if (typeof result == 'string') {
            } else if (typeof result == 'object') {
                if (result['event'] && result['event'] == 'onOk') {
                    let selection = result['data'];
                    if (selection && selection.length > 0) {

                        this.trainingBaseApi.add(this.offeringId, selection.map(it => it.id)).subscribe(
                            ok => {
                                subscription.destroy('onOk');
                                this.loadData();
                                tipMessage('添加基地成功', 'success');
                            },
                            err => {
                                tipMessage('添加基地失败, 请重试');
                            }
                        );
                    } else {
                        tipMessage('请至少选择一个基地');
                    }
                }
            }
        });
    }
    delTrainBase(id) {
        let self = this;
        this.modalService.confirm({
            title: '删除',
            content: '确定要删除此基地？',
            showConfirmLoading: true,
            zIndex: 1003,
            onOk() {
                self.trainingBaseApi.deleteTbcBase(id).subscribe(
                    res => {
                        tipMessage('删除成功！', 'success');
                        self.loadData();
                    },
                    err => {
                        return tipMessage(err);
                    }
                )

            },
            onCancel() {
            }
        })
    }


    lookWife(id) {
        this.looktbcBaseId = id;
        this.isWife = true;
    }

    lookPick(id) {
        this.looktbcBaseId = id;
        this.isPick = true;
    }

    cancelWifi(e) {
        this.isWife = false;
    }

    cancelPick(e) {
        this.isPick = false;
    }
}
