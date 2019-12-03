import { Component, OnInit } from '@angular/core';
import { PointsMallListApiService } from '../../service/points-mall-list-api.service';
import { PointsMall } from '../../entity/points-mall';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { CuiLayer } from 'console-ui-ng';
import { FormDataUtil } from '../../../core';

@Component({
  selector: 'spk-points-mall-edit',
  templateUrl: './points-mall-edit.component.html',
  styleUrls: ['./points-mall-edit.component.scss']
})
export class PointsMallEditComponent implements OnInit {
  user: PointsMall;

  constructor(
    private userService: PointsMallListApiService,
    private router: Router,
    private route: ActivatedRoute,
    private layer: CuiLayer
  ) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        let userId = +params['id'];
        this.loadData(userId);
      }
    );
  }

  loadData(userId) {
    this.userService.get(userId).subscribe(
      user => this.user = user
    );
  }

  save(formUser: PointsMall) {
    let fd = FormDataUtil.covert(formUser);
    formUser['id'] = this.user.id;
    this.userService.update(formUser).subscribe(
      user => {
        this.layer.msg('保存成功');
        this.router.navigate(['../../', 'list'], { relativeTo: this.route });
      },
    );
  }

  onSave(event) {
    this.save(event.value);
  }

}
