import { UserGroup } from './../../../../system/entity/user-group';
import { NzMessageService } from 'ng-zorro-antd';
import { Output, EventEmitter } from '@angular/core';
import { Used } from './../../enums/used.enum.';
import { Strategy } from 'app/learning/strategy/entity/strategy';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'spk-strategy-add',
  templateUrl: './strategy-add.component.html',
  styleUrls: ['./strategy-add.component.scss']
})
export class StrategyAddComponent implements OnInit {
  strategy: Strategy;
  @Input() used = Used;
  @Input() userGroup: UserGroup;
  @Output() toList = new EventEmitter();
  constructor(
    private message: NzMessageService
  ) {}


  ngOnInit() {
    this.strategy = new Strategy();
    this.strategy.type = "training";
    this.strategy.isTemplet = true;
    this.strategy.isDefault = true;
    if (this.userGroup) {
      this.strategy.userGroup = this.userGroup;
    }
  }

  list() {
    this.toList.emit(true);
  }

}
