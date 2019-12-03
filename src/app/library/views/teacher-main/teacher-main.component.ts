import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params, NavigationEnd } from '@angular/router';

@Component({
  selector: 'spk-teacher-main',
  templateUrl: './teacher-main.component.html',
  styleUrls: ['./teacher-main.component.scss']
})
export class TeacherMainComponent implements OnInit {

  curIndex: number = 0;
  constructor(
    private router: Router, private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) { // 当导航成功结束时执行
        this.setInfo();
      }
    });
    this.setInfo();

  }
  change(str) {
    this.router.navigate([`${str}`], { relativeTo: this.route });
  }
  setInfo() {
    let url = this.router.url.split('/')[4];
    if (url == 'fulltime') {
      this.curIndex = 0;
    } else if (url == 'parttime') {
      this.curIndex = 1;
    } else {
      this.curIndex = 2;
    }
  }

}
