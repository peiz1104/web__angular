import { Notice } from './../../entity/notice';
import { NgForm, FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CuiLayer } from 'console-ui-ng';
import { DocumentInfo } from '../../../../library/entity/document-info';
import { NoticeService } from '../../service/notice.service';

@Component({
  selector: 'spk-notice-form',
  templateUrl: './notice-form.component.html',
  styleUrls: ['./notice-form.component.scss']
})
export class NoticeFormComponent implements OnInit {

  @Input() notice: Notice;
  @Input() isSystem: boolean;
  @Input() loading: boolean;

  @Output() doSubmit = new EventEmitter();

  columns;
  attachements: DocumentInfo[];
  showAttachements: DocumentInfo[];
  isShow: boolean = false;
  attachementsLoading: boolean;
  _form: FormGroup;
  constructor(
    private dialog: CuiLayer,
    private fb: FormBuilder,
    private noticeService: NoticeService) {
    this.columns = [
      { title: "文件名称", data: 'originFileName' },
      { title: "下载操作", tpl: 'downloadFile' },
      { title: "删除操作", tpl: 'deleteFile' },
    ];
  }

  ngOnInit() {
    if (this.notice.attachements) {
      this.isShow = true;
      this.showAttachements = [];
      this.notice.attachements.forEach(element => {
        this.showAttachements.push(element);
      })
    }
    this._initForm();
  }

  _initForm() {
    let m = this.notice || new Notice();
    this._form = this.fb.group({
      id: [m.id],
      title: [m.title, [Validators.required, Validators.maxLength(40)] ],
      content: [m.content, Validators.required],
      isPublished: [m.isPublished || false, Validators.required],
      attachements: [],
    });
  }

  getFormControl(name) {
    return this._form.controls[name];
  }

  markAsDirty() {
    for (let key of Object.keys(this._form.controls)) {
      this._form.controls[key].markAsDirty();
    }
  }

  onSubmit(f: NgForm) {
    this.markAsDirty();
    this.setNoticeAttachements();
    this.doSubmit.emit(this._form.value);
  }

  setNoticeAttachements() {
    this.attachementsLoading = true;
    let attachements = this.attachements || [];
    attachements.forEach(element => {
      this.notice.attachements = this.notice.attachements || [];
      this.notice.attachements.push(element);
    });
    this.getFormControl("attachements").setValue(this.notice.attachements);
    this.attachementsLoading = false;
  }

  initDocument(file) {
    if (file) {
      this.attachements = [];
      file.forEach(element => {
        element["isPreview"] = false;
        this.attachements.push(element);
      });
    }
  }

  hasAttachements() {
    return this.isShow;
  }

  getAttachements(noticeId) {
    this.noticeService.getOne(noticeId).subscribe(
      FormNoticeInfo => {
        this.notice = FormNoticeInfo;
        this.ngOnInit();
      },
      err => {
        this.dialog.msg(err);
      }
    );
  }

  downloadFile(relativePath) {
    location.href = window.location.origin + relativePath;
  }
  deleteFile(fileId) {
    this.noticeService.deleteFile(fileId, this.notice.id).subscribe(
      () => {
        this.dialog.msg('删除成功');
        this.getAttachements(this.notice.id);
      },
      err => { this.dialog.confirm(err) }
    );
  }

}
