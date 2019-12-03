import { Router, ActivatedRoute } from '@angular/router';
import { NoticeService } from './../../service/notice.service';
import { Notice } from 'app/public-suite/notice-box/entity/notice';
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'spk-notice-edit',
  templateUrl: './notice-edit.component.html',
  styleUrls: ['./notice-edit.component.scss']
})
export class NoticeEditComponent implements OnInit {
  @Output() onSuccessUpdate = new EventEmitter();
  @Input() notice;
  @Input() box;
  err;
  loading: boolean = false;
  constructor(private noticeService: NoticeService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
  }

  onSubmit(notice: Notice) {
    notice.noticeBox = this.box;
    this.loading = true;
    this.noticeService.save(notice).subscribe(
      ug => {
        this.loading = false;
        this.onSuccessUpdate.emit(notice);
      },
      err => {
        this.loading = false;
      }
    );
  }
  toList() {
    this.onSuccessUpdate.emit();
  }

}
