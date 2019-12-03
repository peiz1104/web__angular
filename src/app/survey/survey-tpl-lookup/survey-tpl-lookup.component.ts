import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { SurveyTplService } from '../survey-tpl.service';
import { NzMessageService, NzModalService, NzModalSubject } from 'ng-zorro-antd';

@Component({
  selector: 'spk-survey-tpl-lookup',
  templateUrl: './survey-tpl-lookup.component.html',
  styleUrls: ['./survey-tpl-lookup.component.scss']
})
export class SurveyTplLookupComponent implements OnInit {

  @Input() delayClose: boolean = false;
  @Output() ok: EventEmitter<any> = new EventEmitter();

  tpls;
  columns = [
    {title: '名称', data: 'name'}
  ];
  selection;
  loading: boolean = false;
  searchtext: string;

  modalSubject: NzModalSubject;
  isConfirming: boolean = false;

  constructor(
    private surveyTplApi: SurveyTplService,
    private message: NzMessageService,
    private modal: NzModalService
  ) { }

  ngOnInit() {
    // this.loadData();
  }

  loadData(page?) {
    page = page || this.tpls || {};
    page = {
      size: page.size,
      page: page.page
    };
    let params = {...page, ...{name: this.searchtext}};
    this.loading = true;
    this.surveyTplApi.lookup(params).subscribe(
      tpls => {
        this.tpls = tpls;
        this.loading = false;
      },
      err => {
        this.message.error(`加载数据失败，${err}`);
        this.loading = false;
      }
    );
  }

  openLookup(content) {
    this.loadData();
    this.modalSubject = this.modal.open({
      title: '选择调查模板',
      content: content,
      width: 960,
      footer: false,
      onOk: () => {
      },
      onCancel: () => {
        this.close();
      }
    });
  }

  onOk() {
    if (!this.selection || this.selection.length == 0) {
      this.message.warning('请至少选择一个调查模板');
      return;
    }

    this.ok.emit(this.selection);

    if (this.delayClose) {
      this.isConfirming = true;
    } else {
      this.close();
    }
  }

  close() {
    this.selection = null;
    this.isConfirming = false;

    this.modalSubject.destroy('onOk');
  }
}
