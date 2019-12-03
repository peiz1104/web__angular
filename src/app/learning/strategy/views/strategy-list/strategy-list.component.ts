import { Used } from './../../enums/used.enum.';
import { StrategyType } from './../../entity/strategy-type';
import { StrategyService } from 'app/learning/strategy/service/strategy/strategy.service';
import { NzMessageService } from 'ng-zorro-antd';
import { Router, ActivatedRoute } from '@angular/router';
import { Column } from 'console-ui-ng';
import { Strategy } from 'app/learning/strategy/entity/strategy';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'spk-strategy-list',
  templateUrl: './strategy-list.component.html',
  styleUrls: ['./strategy-list.component.scss']
})
export class StrategyListComponent implements OnInit {
  @Output() toAdd = new EventEmitter();
  @Output() toEdit = new EventEmitter();
  @Input() used: Used;
  @Input() userGroupId: number;
  @Input() isInit: boolean = true;
  strategys: Strategy[];
  types: StrategyType[];
  selection: Strategy[];
  loading = true;
  strategyType: string = "";
  columns: Column[] = [
    { title: '名称', data: 'name' },
    /* { title: '总分', data: 'totalScore' },
    { title: '合格分数线', data: 'passScore' }, */
    { title: '所属站点', data: 'site.name' },
    { title: '所属组织', tpl: 'userGroupTpl' },
    { title: '策略类型', tpl: 'typeCol' },
    { title: '策略范围', tpl: 'scopeTypeCol' },
    { title: '是否默认', tpl: 'defaultCol' },
    { title: '描述', data: 'description' },
    { title: '操作', tpl: 'rowAction', styleClass: 'text-right' }
  ];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public message: NzMessageService,
    public strategyService: StrategyService
  ) { }

  ngOnInit() {
   this.loadTypes();
   // 默认加载数据 如果在父组件中加载数据则传入fasle其他地方使用默认即可
   if (this.isInit) {
       this.loadData(this.userGroupId);
    }
  }

  loadData(userGroupId?) {
    this.strategyService.list(this.strategyType, userGroupId).subscribe(
      data => {
        this.strategys = data;
        this.loading = false;
      },
      error => {
        this.message.error(error);
        this.loading = false;
      }
    )
  }

  loadTypes() {
    this.strategyService.getStrategyTypes().subscribe(
      types => {
        this.types = types;
      },
      error => {
        this.message.error(error);
      }
    )
  }

  delete(row) {
    let rows = row ? [row] : this.selection;
    if (!rows || rows.length == 0) {
        this.message.warning("请至少选择一项策略在进行删除操作!");
        return;
    }

    let isDefault = false;
    for (let it of rows) {
      if (it.isDefault) {
        this.message.warning("选择项包含默认策略不允许进行删除!");
        isDefault = true;
        break;
      }
    }

    if (isDefault) {
        return;
    }
    this.strategyService.delete(rows.map(it => it.id)).subscribe(
      ok => {
        this.message.success("删除策略成功");
        this.loadData(this.userGroupId);
      },
      err => {
        this.message.error(err);
      }
    )
  }

  add() {
    this.toAdd.emit(true);
  }

  edit(id) {
    this.toEdit.emit(id);
  }

  setDefault(row: Strategy) {
      let userGroupId = row.userGroup ? row.userGroup.id : undefined;
      this.strategyService.setDefault(row.id, userGroupId, row.site.id, row.type).subscribe(
        ok => {
          this.message.success("设置成功");
          this.loadData(this.userGroupId);
        },
        error => {
          this.message.error("设置失败!");
        }
    )
  }

  cancelDefault(row: Strategy) {
      this.strategyService.cancelDefault(row.id).subscribe(
        ok => {
          this.message.success("取消成功");
          row.isDefault = false;
        },
        error => {
          this.message.error("取消失败!");
        }
     )
  }

}
