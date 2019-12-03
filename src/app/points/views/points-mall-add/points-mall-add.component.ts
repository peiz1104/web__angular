import { Component, OnInit } from '@angular/core';
import { PointsMall } from '../../entity/points-mall';
import { PointsMallListApiService } from '../../service/points-mall-list-api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CuiLayer } from 'console-ui-ng';

@Component({
  templateUrl: './points-mall-add.component.html',
  styleUrls: ['./points-mall-add.component.scss']
})
export class PointsMallAddComponent implements OnInit {
  // user: User;
  err;

  constructor(private userService: PointsMallListApiService,
    private router: Router,
    private route: ActivatedRoute,
    private dialog: CuiLayer
  ) { }

  ngOnInit() {
  }

  save(formUser: PointsMall) {
    console.log(formUser);
    this.userService.save(formUser).subscribe(
      user => {
        this.dialog.msg('保存成功');
        this.router.navigate(['../', 'list'], {relativeTo: this.route});
      },
      err => this.err = err
    );
  }

  onSave(event) {
    this.save(event.value);
  }

}
