import { Used } from './../../enums/used.enum.';
import { NzMessageService } from 'ng-zorro-antd';
import { StrategyService } from 'app/learning/strategy/service/strategy/strategy.service';
import { ActivatedRoute } from '@angular/router';
import { Strategy } from 'app/learning/strategy/entity/strategy';
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'spk-strategy-edit',
  templateUrl: './strategy-edit.component.html',
  styleUrls: ['./strategy-edit.component.scss']
})
export class StrategyEditComponent implements OnInit {
  strategy: Strategy;
  @Input() used = Used;
  @Input() strategyId;
  @Output() toList = new EventEmitter();

  constructor(
    private route: ActivatedRoute,
    private strategyService: StrategyService,
    private layer: NzMessageService,
  ) { }

  ngOnInit() {
    if (this.strategyId) {
      this.strategyService.getStrategy(this.strategyId).subscribe(
        strategy => {
          this.strategy = strategy;
        },
        error => {
          this.layer.error(error);
        }
      )
    } else {
      this.layer.error("未获取到策略ID");
    }
  }


  list() {
    this.toList.emit(true);
  }
}
