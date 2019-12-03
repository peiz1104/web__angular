import { Used } from './../../enums/used.enum.';
import { NzModalSubject, NzModalService, NzMessageService } from 'ng-zorro-antd';
import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Strategy } from 'app/learning/strategy/entity/strategy';
import { StrategyService } from 'app/learning/strategy/service/strategy/strategy.service';
import { CuiLayer, Column } from 'console-ui-ng';
import { StrategyCondition } from 'app/learning/strategy/entity/strategy-condition';
import { Pagination } from '../../../../core';
import { StrategyFormComponent } from '../../public/strategy-form/strategy-form.component';

@Component({
    selector: 'spk-strategy',
    templateUrl: './strategy.component.html',
    styleUrls: ['./strategy.component.scss']
})
export class StrategyComponent implements OnInit {
    @Input() strategyType: string = "course";
    @Input() objectId: number;
    @ViewChild(StrategyFormComponent) strategyFormComponent: StrategyFormComponent;
    searchBy: {
        isDefault?: string,
        name?: string,
        id?: number,
        type?: string
    } = {
            isDefault: '',
            name: ''
        };
    isInit;
    strategy: Strategy;
    currentModal: NzModalSubject;
    isConfirmLoading = false;
    initTip = true;
    copyTip = false;
    used = Used;
    strategies;
    selection: Strategy[];
    loading = true;
    message;
    columns: Column[] = [
        { title: '名称', data: 'name' },
        /* { title: '总分', data: 'totalScore' },
        { title: '通过分', data: 'passScore' }, */
        { title: '所属站点', data: 'site.name' },
        { title: '所属组织', tpl: 'userGroupTpl' },
        { title: '策略类型', tpl: 'typeCol' },
        { title: '策略范围', tpl: 'scopeTypeCol' },
        { title: '是否默认', tpl: 'defaultCol' },
        { title: '描述', data: 'description' }
    ];

    typeOptions = [
        { label: '全部', value: '' },
        { label: '默认', value: '1' },
        { label: '普通', value: '0' }
    ];

    constructor(
        private strategyService: StrategyService,
        private layer: NzMessageService,
        private modalService: NzModalService
    ) { }

    ngOnInit() {
        this.strategyService.isInit(this.objectId, this.strategyType).subscribe(
            result => {
                this.isInit = result.isInit;
                if (!this.isInit) {
                    this.strategyService.getStrategy(this.objectId, this.strategyType).subscribe(
                        strategy => {
                            this.strategy = strategy;
                            this.initTip = false;
                        },
                        error => {
                            this.initTip = false;
                            this.layer.error(error, { nzDuration: 3000 });
                        }
                    );
                } else {
                    // 没有绑定策略显示默认策略
                    this.lookDefaultStrategy();
                    this.initTip = false;
                }
            }
        );
    }

    showUsedName() {
        let name = '课程';
        return name = this.strategyType == 'course' ? '课程' : '培训班';
    }

    getMessage(error?) {
        if (error) {
            return error;
        } else {
            return `因当前${this.showUsedName()}还未绑定策略,系统为你显示默认策略,你可以通过以下方式为${this.showUsedName()}绑定策略。`;
        }
    }

    useStrategy() {
        this.copyTip = true;
        this.strategyService.useDefaultStrategy(this.objectId, this.strategyType).subscribe(
            strategy => {
                this.strategy = strategy;
                this.strategyFormComponent.syncSelection(strategy);
                this.isInit = false;
                this.copyTip = false;
            },
            error => {
                this.copyTip = false;
                this.getMessage(error);
            }
        );
    }

    chooseInit(e) {
        this.isConfirmLoading = true;
        if (this.selection && this.selection.length > 0) {
            let strategyId = this.selection[0].id;
            this.strategyService.chooseInit(this.objectId, this.strategyType, strategyId).subscribe(
                strategy => {
                    this.strategy = strategy;
                    this.strategyFormComponent.syncSelection(strategy);
                    this.isInit = false;
                    this.isConfirmLoading = false;
                    this.currentModal.destroy('onOk');
                },
                error => {
                    this.layer.error(error, { nzDuration: 3000 });
                    this.isConfirmLoading = false;
                }
            );
        } else {
            this.layer.warning("至少选择一个策略进行复制!");
            this.isConfirmLoading = false;
        }
    }

    chooseStrategy(titleTpl, contentTpl) {
        this.currentModal = this.modalService.open({
            title: titleTpl,
            content: contentTpl,
            footer: false,
            maskClosable: false,
            width: 960,
            zIndex: 1002,
        });
        this.loadChooseStrategy();
    }

    getSearchParams(): any {
        this.searchBy.id = this.objectId;
        this.searchBy.type = this.strategyType;
        return this.searchBy;
    }

    loadChooseStrategy(page?: Pagination<any>) {
        this.strategyService.chooseDefaultStrategies(this.getSearchParams(), page).subscribe(
            strategies => {
                this.strategies = strategies;
                this.selection = undefined;
                this.loading = false;
            },
            error => { this.layer.warning(error, { nzDuration: 3000 }) }
        )
    }

    lookDefaultStrategy() {
        // 使用默认策略
        this.strategyService.useDefaultStrategy(this.objectId, this.strategyType).subscribe(
            strategy => {
                this.strategy = strategy;
                this.strategyFormComponent.syncSelection(strategy);
                this.isInit = false;
                this.copyTip = false;
            },
            error => {
                this.copyTip = false;
                this.getMessage(error);
            }
        );

        // this.strategyService.lookDefaultStrategy(this.objectId, this.strategyType).subscribe(
        //     strategy => {
        //         this.strategy = strategy;
        //         this.message = this.getMessage();
        //     },
        //     error => {
        //         this.message = this.getMessage(error);
        //     }
        // )
    }

    handleOk(e) {
        this.isConfirmLoading = true;
        this.currentModal.destroy('onOk');
        this.isConfirmLoading = false;
        this.currentModal = null;
    }

    handleCancel(e) {
        this.currentModal.destroy('onCancel');
    }

}
