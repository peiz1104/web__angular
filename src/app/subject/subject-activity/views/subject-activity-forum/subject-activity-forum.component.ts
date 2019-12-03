import { Component, OnInit } from '@angular/core';
import { SubjectActivity } from '../../../entity/subject-activity';
import { Forum } from '../../../../forum/ordinary-forum/entity/forum';
import { ActivatedRoute } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd';
import { SubjectActivityApiService } from '../../../service/subject-activity-api.service';
import { tipMessage } from 'app/account/entity/message-tip';

@Component({
  selector: 'spk-subject-activity-forum',
  templateUrl: './subject-activity-forum.component.html',
  styleUrls: ['./subject-activity-forum.component.scss']
})
export class SubjectActivityForumComponent implements OnInit {

  subjectActivity: SubjectActivity;

  forum: Forum;

  constructor(
    private route: ActivatedRoute,
    private subjectActivityApiService: SubjectActivityApiService,
    private message: NzMessageService,
  ) { }

  ngOnInit() {
    this.route.data.subscribe(({ subjectActivity }: { subjectActivity: SubjectActivity }) => {
      this.subjectActivity = subjectActivity;
    });
    this.forum = this.subjectActivity.forum;
  }

  initCondition(param) {
    this.subjectActivityApiService.getForum(this.subjectActivity.id).subscribe(
      ok => {
        this.forum = ok;
      },
      err => {
        tipMessage(err);
      }
    );
  }

}
