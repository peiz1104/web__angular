import { Forum } from './../../../../forum/ordinary-forum/entity/forum';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';
import { UgcActivityService } from '../../../service/ugc-activity.service';
import { UgcActivity } from '../../../entity/ugc-activity';


@Component({
  selector: 'spk-ugc-activity-forum',
  templateUrl: './ugc-activity-forum.component.html',
  styleUrls: ['./ugc-activity-forum.component.scss']
})
export class UgcActivityForumComponent implements OnInit {

  ugcActivity: UgcActivity;

  forum: Forum;

  constructor(
    private route: ActivatedRoute,
    private ugcActivityService: UgcActivityService,
    private message: NzMessageService,
  ) { }

  ngOnInit() {
    this.route.data.subscribe((data: { ugcActivity: UgcActivity }) => {
      this.ugcActivity = data.ugcActivity;
    });
    this.forum = this.ugcActivity.forum;
  }

  initCondition(param) {
    this.ugcActivityService.getForum(this.ugcActivity.id).subscribe(
      ok => {
        this.forum = ok;
      },
      err => {
        this.message.error(err);
      }
    );
  }

}
