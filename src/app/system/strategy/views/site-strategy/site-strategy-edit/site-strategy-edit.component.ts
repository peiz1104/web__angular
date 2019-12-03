import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Used } from '../../../../../learning/strategy/enums/used.enum.';

@Component({
  selector: 'spk-site-strategy-edit',
  templateUrl: './site-strategy-edit.component.html',
  styleUrls: ['./site-strategy-edit.component.scss']
})
export class SiteStrategyEditComponent implements OnInit {
  strategyId
  used = Used;
  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.route.params.subscribe(({id}) => {
      this.strategyId = id;
    });
  }

  toList(e?) {
    this.router.navigateByUrl('system/strategy/site/list');
  }
}
