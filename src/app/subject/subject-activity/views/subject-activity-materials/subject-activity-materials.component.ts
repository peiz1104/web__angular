import { SubjectActivity } from './../../../entity/subject-activity';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { SubjectActivityApiService } from '../../../service/subject-activity-api.service';
import { NzMessageService } from 'ng-zorro-antd';
import { tipMessage } from 'app/account/entity/message-tip';


@Component({
  selector: 'spk-subject-activity-materials',
  templateUrl: './subject-activity-materials.component.html',
  styleUrls: ['./subject-activity-materials.component.scss']
})
export class SubjectActivityMaterialsComponent implements OnInit {

  subjectActivity: SubjectActivity;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private subjectService: SubjectActivityApiService,
    private message: NzMessageService,
  ) { }

  ngOnInit() {
    this.route.data.subscribe(({ subjectActivity }: { subjectActivity: SubjectActivity }) => {
      this.subjectActivity = subjectActivity;
    });
  }

  initGroup() {
    this.subjectService.initMaterialGroup(this.subjectActivity.id).subscribe(
      mgId => {
        this.subjectActivity.materialGroupId = mgId;
        tipMessage('初始化资料管理成功', 'success');
      },
      err => {
        tipMessage('初始化资料管理失败，请重试！');
      }
    );
  }

}
