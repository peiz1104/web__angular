import { Operation } from './../../../../public-suite/notice-box/enum/operation.enum';
import { Used } from './../../../../learning/strategy/enums/used.enum.';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'spk-site-strategy-list',
  templateUrl: './site-strategy-list.component.html',
  styleUrls: ['./site-strategy-list.component.scss']
})
export class SiteStrategyListComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
  }

  toAdd(e?) {
    this.router.navigateByUrl('system/strategy/site/add');
  }
  toEdit(sid?) {
    this.router.navigate(['system/strategy/site' , sid, 'edit']);
  }

}
