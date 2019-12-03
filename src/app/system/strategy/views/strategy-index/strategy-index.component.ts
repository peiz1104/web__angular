import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'spk-strategy-index',
  templateUrl: './strategy-index.component.html',
  styleUrls: ['./strategy-index.component.scss']
})
export class StrategyIndexComponent implements OnInit {

  isLoad = false;
  constructor(
    private router: Router
  ) { }

  ngOnInit() {
    this.router.navigateByUrl('system/strategy/site/list');
  }

  loadSite() {
    this.router.navigateByUrl('system/strategy/site/list');
  }

  loadUserGroup() {
   this.router.navigateByUrl('system/strategy/userGroup/list');
  }
}
