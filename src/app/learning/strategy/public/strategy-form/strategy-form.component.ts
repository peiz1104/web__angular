import { UserGroup } from 'app/system/entity/user-group';
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Used } from './../../enums/used.enum.';
import { StrategyType } from './../../entity/strategy-type';
import { StrategyService } from 'app/learning/strategy/service/strategy/strategy.service';
import { StrategyCondition } from './../../entity/strategy-condition';
import { Strategy } from 'app/learning/strategy/entity/strategy';
import { tipMessage } from 'app/account/entity/message-tip';

@Component({
    selector: 'spk-strategy-form',
    templateUrl: './strategy-form.component.html',
    styleUrls: ['./strategy-form.component.scss']
})
export class StrategyFormComponent implements OnInit {
    @Input() strategy: Strategy;
    @Input() used: Used;
    @Output() toList = new EventEmitter();
    @Output() toChoose = new EventEmitter();
    @Output() toUse = new EventEmitter();
    selection: StrategyCondition[];
    types: StrategyType[];
    formType = Used;
    loading: boolean = true;
    nextLoading = false;
    saveLoading = false;
    courseColumns = [
        { title: '条件名称', data: 'name' },
        { title: '条件预定值', tpl: 'colValueOne', styleClass: 'center-p' },
        { title: '条件说明', data: 'description', styleClass: 'left-p' }
    ];

    offeringColumns = [
        { title: '条件名称', data: 'name' },
        { title: '条件预定值', tpl: 'colValueOne', styleClass: 'left-p' },
        /* { title: '所占总分百分比', tpl: 'colValueTwo' }, */
        { title: '条件说明', data: 'description', styleClass: 'left-p' }
    ];

    constructor(
        private strategyService: StrategyService,
    ) { }

    ngOnInit() {
        if (this.isCreate) {
            this.loadTypes();
            this.showConditions();
        } else {
            this.findCheckedConditions();
        }
    }

    get isCreate() {
        return this.strategy && !this.strategy.id;
    }

    choose() {
        this.toChoose.emit(true);
    }

    use() {
        this.toUse.emit(true);
    }

    changeLoading(next, value) {
        if (next) {
            this.nextLoading = value;
        } else {
            this.saveLoading = value;
        }
    }

    saveStrategy(next?) {
        let validHandler;
        if (this.strategy.type == 'course') {
            validHandler = this.validCourseConditions();
        } else {
            validHandler = this.validCourseConditions();
        }
        if (validHandler) {
            this.convertConditionsToValue();
            this.changeLoading(next, true);
            this.strategyService.saveStrategy(this.strategy).subscribe(
                ok => {
                    /*
                      只有活动处使用from组件编辑后才需要重新加载条件回传lrn_strategy_condition_value 的id
                      否则违反lrn_strategy_condition_value唯一约束不能编辑
                    */
                    if (!this.isCreate && this.used == this.formType.offering) {
                        this.reloadCondition();
                    }
                    tipMessage("保存成功", 'success');
                    this.changeLoading(next, false);
                    if (next) {
                        // 重置Form 表单
                        this.restForm();
                    } else {
                        this.list();
                    }
                },
                error => {
                    tipMessage("保存失败", '', 2000);
                    this.changeLoading(next, false);
                }
            )
        }
    }

    restForm(): any {
        let userGroup = this.strategy.userGroup;
        let currentType = this.strategy.type;
        this.strategy = new Strategy();
        this.strategy.isTemplet = true;
        this.strategy.isDefault = true;
        this.strategy.type = currentType;
        this.strategy.userGroup = userGroup;
        this.loadTypes();
        this.showConditions();
    }

    list() {
        this.toList.emit(true);
    }

    reloadCondition() {
        this.strategyService.getStrategy(this.strategy.id).subscribe(
            strategy => {
                this.strategy = strategy;
                this.syncSelection();
            },
            err => {
                tipMessage("刷新策略条件");
            }
        )
    }

    loadTypes() {
        this.loading = true;
        this.strategyService.getStrategyTypes().subscribe(
            types => {
                this.types = types;
                this.loading = false;
            },
            error => {
                tipMessage(error);
                this.loading = false;
            }
        )
    }

    showTypeName(type: string) {
        let types = { "course": '课程', "training": "培训班" };
        for (let key of Object.keys(types)) {
            if (key == type) {
                return types[key];
            }
        }
    }

    showConditions() {
        this.loading = true;
        this.strategyService.getConditionsByType(this.strategy.type).subscribe(
            conditions => {
                this.strategy.conditions = conditions;
                this.loading = false;
            },
            error => {
                tipMessage(error);
                this.loading = false;
            }
        )
    }

    //    private convertConditionsToValue() {
    //      let conditionValues = [];
    //      this.selection.forEach(select => {
    //        let conditionValue = {
    //          id: select.valueId,
    //          strategy: {id: this.strategy.id},
    //          condition: {id: select.id},
    //          valueOne: select.valueOne,
    //          valueTwo: select.valueTwo
    //        };
    //        conditionValues.push(conditionValue);
    //      });
    //      this.strategy.conditionValues = conditionValues;
    //    }

    public findCheckedConditions(strategy?) {
        let selection = [];
        strategy = strategy ? strategy : this.strategy;
        this.loading = true;
        strategy.conditions.forEach(condition => {
            if (condition.checked) {
                selection.push(condition);
            }
        });
        this.selection = selection;
        this.loading = false;
    }

    syncSelection(strategy?) {
        strategy = strategy ? strategy : this.strategy;
        let selection = [];
        strategy.conditions.forEach(condition => {
            if (condition.checked) {
                selection.push(condition);
            }
        });
        this.selection = selection;
    }

    private convertConditionsToValue() {
        let conditionValues = [];
        this.selection.forEach(select => {
            let conditionValue = {
                id: select.valueId,
                strategy: { id: this.strategy.id },
                condition: { id: select.id },
                valueOne: select.valueOne,
                valueTwo: select.valueTwo,
                // createdBy: select.valueCreatedBy,
                // createdDate: select.valueCreatedDate
            };
            conditionValues.push(conditionValue);
        });
        this.strategy.conditionValues = conditionValues;
    }

    private validConditions(): boolean {
        if (!this.selection || this.selection.length == 0) {
            tipMessage("至少勾选一个条件!");
            return false;
        }
        let valid = true;
        let totalScore = this.strategy.totalScore;
        let realScore = 0;
        let passScore = this.strategy.passScore;
        if (passScore && totalScore && passScore > totalScore) {
            tipMessage("合格分数线应小于总分值!", '', 4000);
            return false;
        }
        for (let select of this.selection) {
            let valueOne = select.valueOne;
            let valueTwo = select.valueTwo;
            let code = select.code;
            if (!valueOne) {
                tipMessage("已勾选条件预定值必填", '', 3000);
                valid = false;
                break;
            }
            if (!valueTwo) {
                tipMessage("已勾选条件总分比必填");
                valid = false;
                break;
            }
            valueTwo = valueTwo ? totalScore * valueTwo / 100 : 0;
            realScore += valueTwo;
        }

        if (valid) {
            if (realScore != totalScore) {
                tipMessage("已勾选条件总分比值不等于总分值", '', 4000);
                return false;
            }
        }
        return valid;
    }

    private validCourseConditions(): boolean {
        if (!this.selection || this.selection.length == 0) {
            tipMessage("至少勾选一个条件!");
            return false;
        }
        let valid = true;
        let code = [];
        let vcr = {};
        this.selection.map((item) => {
            code.push(item.code)
            vcr[item.code] = item.valueOne;
        })
        // console.log(code, vcr, 44333)
        if (code.indexOf('OCP') != -1 || code.indexOf('OP') != -1 || code.indexOf('SP') != -1) {
            // tslint:disable-next-line:max-line-length
            if ((code.indexOf('OCP') != -1 && !vcr['OCP']) || (code.indexOf('OP') != -1 && !vcr['OP']) || (code.indexOf('SP') != -1 && !vcr['SP'])) {
                tipMessage("已勾选条件预定值必填", '', 3000);
                valid = false;
            }
        }
        return valid;
        // for (let select of this.selection) {
        //     let valueOne = select.valueOne;
        //     let valueTwo = select.valueTwo;
        //     let code = select.code;
        //     console.log(code, valueOne);
        //     if ((code != 'CE' && code != 'CA' && code != 'ST' && code != 'OC' && code != 'OE') && !valueOne) {
        //         tipMessage("已勾选条件预定值必填", '', 3000);
        //         valid = false;
        //         break;
        //     }
        //     return valid;
        // }
    }
}
