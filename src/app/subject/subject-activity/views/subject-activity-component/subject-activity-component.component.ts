import { NzMessageService } from 'ng-zorro-antd';
import { Component, OnInit } from '@angular/core';
import { SubjectActivityApiService } from '../../../service/subject-activity-api.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { SubjectActivity } from './../../../entity/subject-activity';
import { tipMessage } from 'app/account/entity/message-tip';

@Component({
  selector: 'spk-subject-activity-component',
  templateUrl: './subject-activity-component.component.html',
  styleUrls: ['./subject-activity-component.component.scss']
})
export class SubjectActivityComponentComponent implements OnInit {

  subjectActivity: SubjectActivity;
 // hasComponent: boolean = false;
  subjects: SubjectActivity[];
  loading: boolean = false;
  columns;

  constructor(
    private message: NzMessageService,
    private subjectService: SubjectActivityApiService,
    private route: ActivatedRoute,
  ) {
    this.columns = [
      { title: '组件名称', data: 'name' },
      { title: '组件状态', tpl: 'coStatus' },
      { title: '创建时间', data: 'createdDate', tpl: 'createdDate', styleClass: 'text-center' },
      { title: '操作', tpl: 'actions', styleClass: 'text-right' }
    ];
  }

  ngOnInit() {
    this.route.data.subscribe(({ subjectActivity }: { subjectActivity: SubjectActivity }) => {
      this.subjectActivity = subjectActivity;
      this.subjectService.hasComponent(this.subjectActivity.id).subscribe(
        data => {
          if (data > 0) {
           // this.hasComponent = true;
            this.loadData();
          }
        }
      );
    });
  }

  // initComponent() {
  //   this.subjectService.initComponent(this.subjectActivity.id).subscribe(
  //     data => {
  //       if (data) {
  //         this.hasComponent = true;
  //         this.loadData();
  //       }
  //     }
  //   );
  // }

  loadData(page?: any) {
    this.loading = true;
    this.subjectService.getAllComponents(this.subjectActivity.id).subscribe(
      data => {
        if (data) {
          this.subjects = data;
          this.sortComponents(this.subjects);
          this.loading = false;
        }
      }
    );
  }

  sortComponents(subjects) {
    subjects.sort((a, b) => a.displayOrder - b.displayOrder);
    subjects.forEach((s, index) => {
      if (index == 1) {
        s.upEnabled = true;
      }
      if (index == (subjects.length - 1)) {
        s.downEnabled = true;
      }
    });
  }

  updateStatus(row: any) {
    this.loading = true;
    if (row.status) { // 启用组件
      this.subjectService.publishComponent(row.id).subscribe(
        data => {
          this.loading = false;
          tipMessage('修改成功', 'success');
         // this.loadData();
        },
        err => {
          tipMessage(err);
        }
      );
    } else { // 取消取用组件
      this.loading = true;
      this.subjectService.disPublishComponent(row.id).subscribe(
        data => {
          this.loading = false;
          tipMessage('修改成功', 'success');
          // this.loadData();
        },
        err => {
          tipMessage(err);
        }
      );
    }
  }

  moveUp(row: any) {
    this.subjectService.moveUp(this.subjectActivity.id, row.id).subscribe(
      data => {
        this.loading = false;
        tipMessage('修改成功', 'success');
         this.loadData();
      },
      err => {
        tipMessage(err);
      }
    );
  }
  moveDown(row: any) {
    this.subjectService.moveDown(this.subjectActivity.id, row.id).subscribe(
      data => {
        this.loading = false;
        tipMessage('修改成功', 'success');
         this.loadData();
      },
      err => {
        tipMessage(err);
      }
    );
  }

}
