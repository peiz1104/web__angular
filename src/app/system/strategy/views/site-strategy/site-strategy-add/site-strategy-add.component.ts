import { Component, OnInit } from '@angular/core';
import { Used } from '../../../../../learning/strategy/enums/used.enum.';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'spk-site-strategy-add',
  templateUrl: './site-strategy-add.component.html',
  styleUrls: ['./site-strategy-add.component.scss']
})
export class SiteStrategyAddComponent implements OnInit {
  used = Used;
  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
  }

  toList(e?) {
    this.router.navigate(['system/strategy/site/list']);
  }
}
