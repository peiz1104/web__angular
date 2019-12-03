import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd';
import { TeachernewService } from './../../service/teachernew.service';
import { TeacherImportError } from 'app/library/entity/teacher-import-error';


@Component({
  selector: 'spk-teacher-qualification-import',
  templateUrl: './teacher-qualification-import.component.html',
  styleUrls: ['./teacher-qualification-import.component.scss']
})
export class TeacherQualificationImportComponent implements OnInit {

  annualPlanId: number; // 年度计划id
  taskKey: string;
  progress = 0;
  parsedData;
  message?: TeacherImportError[];
  status: string;
  messageShow: boolean;

  messageColumns = [
    { title: '序号', tpl: 'colnumber', },
    { title: '用户名', tpl: 'usernameCol' },
    { title: '任职资格', tpl: 'lvCol' },
    { title: '错误信息', tpl: 'colmessage', },
  ];

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private nzmessage: NzMessageService,
    private teachernewService: TeachernewService
  ) { }

  ngOnInit() {
    this.messageShow = false;
    this.annualPlanId = this.activatedRoute.snapshot.params.id;
    this.message = [];
  }

  onUploadComplete(fileupload) {
    if (fileupload) {
      this.taskKey = fileupload['taskKey'];
      this.status = 'validating';
      this.getImportProgress();
    }
  }

  import() {
    this.status = 'importing';
    this.teachernewService.import(this.taskKey).subscribe(
      errorList => {
        this.message = errorList;
        this.nzmessage.success('导入完成');
        this.status = 'after';
        this.messageShow = true;
      }
    )
  }

  getImportProgress() {
    this.teachernewService.importProgress(this.taskKey).subscribe(
      m => {
        this.progress = m ? (m['progress'] || 0) : 0;
        if (!this.progress || this.progress < 100) {
          setTimeout(() => {
            this.getImportProgress();
          }, 1000);
        } else {
          this.parsedData = m['parsedData'];
          this.status = 'before';
          if (!this.parsedData) {
            this.getImportProgress();
          }
        }
      }
    );
  }

  download() {
    this.teachernewService.download();
  }

  toList() {
    this.router.navigate(['../list'], { relativeTo: this.activatedRoute });
  }
}
