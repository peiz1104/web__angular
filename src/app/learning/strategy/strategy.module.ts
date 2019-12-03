import { StrategyListComponent } from './views/strategy-list/strategy-list.component';
import { StrategyEditComponent } from './views/strategy-edit/strategy-edit.component';
import { StrategyAddComponent } from './views/strategy-add/strategy-add.component';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StrategyComponent } from './views/strategy/strategy.component';
import { SharedModule } from 'app/shared';
import { StrategyService } from 'app/learning/strategy/service/strategy/strategy.service';
import { StrategyFormComponent } from './public/strategy-form/strategy-form.component';

@NgModule({
  imports: [
    SharedModule,
    RouterModule
  ],
  declarations: [
     StrategyComponent, StrategyListComponent,
     StrategyAddComponent, StrategyEditComponent,
     StrategyFormComponent
    ],
  exports: [ StrategyComponent, StrategyListComponent, StrategyAddComponent, StrategyEditComponent],
  providers: [ StrategyService]
})
export class StrategyModule { }
