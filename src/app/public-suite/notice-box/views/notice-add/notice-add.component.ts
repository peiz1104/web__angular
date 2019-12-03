import { Router, ActivatedRoute } from '@angular/router';
import { NoticeService } from './../../service/notice.service';
import { Notice } from './../../entity/notice';
import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';

@Component({
  selector: 'spk-notice-add',
  templateUrl: './notice-add.component.html',
  styleUrls: ['./notice-add.component.scss']
})
export class NoticeAddComponent implements OnInit {

  @Output() onSuccessAdd = new EventEmitter();
  notice: Notice;
  @Input() box;
  err;
  loading: boolean = false;
  constructor(private noticeService: NoticeService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.notice = new Notice();
  }

  onSubmit(notice: Notice) {
    notice.noticeBox = this.box;
    this.loading = true;
    this.noticeService.save(notice).subscribe(
      ug => {
        this.loading = false;
        this.onSuccessAdd.emit(true);
      },
      err => { this.loading = false; console.log(err) }
    );
  }
  toList() {
    this.onSuccessAdd.emit(true);
  }
}
