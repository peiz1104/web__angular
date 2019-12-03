import { Component, OnInit } from '@angular/core';
import { PointsRuleApiService } from '../../service/points-rule-api.service';
import { PointsRule } from '../../entity/points-rule';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { CuiLayer } from 'console-ui-ng';
import { FormDataUtil } from '../../../core';

@Component({
  selector: 'spk-pointsrule-edit',
  templateUrl: './points-rule-edit.component.html',
  styleUrls: ['./points-rule-edit.component.scss']
})
export class PointsRuleEditComponent implements OnInit {
  user: PointsRule;
  loading;
  target;
  columns;
  users;
  pagination;


  onUgSelectionChange(e) {}
  getPath(v) {}
  onSelect(e) {}

  constructor(
    private userService: PointsRuleApiService,
    private router: Router,
    private route: ActivatedRoute,
    private layer: CuiLayer
  ) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        let userId = +params['userId'];
        this.loadData(userId);
      }
    );
  }

  loadData(userId) {
    this.userService.get(userId).subscribe(
      user => this.user = user
    );
  }

  save(formUser:PointsRule) {
    let fd = FormDataUtil.covert(formUser);
    fd.append("id", '' + this.user.id);
    this.userService.update(fd).subscribe(
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
