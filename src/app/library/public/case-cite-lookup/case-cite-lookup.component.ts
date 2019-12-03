import { Router } from '@angular/router';
import { CaseInfo } from './../../entity/case-info';
import { Component, OnInit, ViewChild, TemplateRef, EventEmitter, Output, ContentChild } from '@angular/core';
import { CuiPagination, CuiLayer } from 'console-ui-ng';
import { CaseInfoService } from 'app/library/service/case.service';
import { NzModalService, NzModalSubject } from 'ng-zorro-antd';

@Component({
  selector: 'spk-case-cite-lookup',
  templateUrl: './case-cite-lookup.component.html',
  styleUrls: ['./case-cite-lookup.component.scss']
})
export class CaseCiteLookupComponent implements OnInit {

  pagination: CuiPagination;
  columns;
  caseInfos: CaseInfo[];
  loading: boolean = true;
  searchText: CaseInfo;
  selected: number[];

  modalSubject: NzModalSubject;
  @ViewChild("lookupModalFooter") lookupModalFooter: TemplateRef<any>;
  @ViewChild("lookupModalContent") lookupModalContent: TemplateRef<any>;

  @Output() ok: EventEmitter<any> = new EventEmitter();
  @Output() cancel: EventEmitter<any> = new EventEmitter();

  @ContentChild("echoTpl") echoTpl: TemplateRef<any>;

  // tslint:disable-next-line:use-life-cycle-interface
  ngAfterViewInit() {
    if (this.echoTpl) {
      return;
    } else {
      // 设置回显列表模板s
      // 设置回显列表项模板
    }
  }

  constructor(private caseInfoService: CaseInfoService,
    private dialog: CuiLayer,
    private router: Router,
    private modal: NzModalService, ) {
    this.columns = [
      { title: '案例编码', data: 'caseCode' },
      { title: '案例名称', data: 'name' },
      { title: '经典案例', data: 'isClassic', tpl: 'caseTypeClassic' },
      { title: '是否发布', data: 'isPublished', tpl: 'caseTypeRelease' },
      { title: '案例来源', data: 'source', tpl: 'caseTypeSource' }
    ];
  }

  ngOnInit() {
    this.searchText = new CaseInfo();
    this.loadData();
  }

  // loadData(page?: CuiPagination) {
  //   this.pagination = page;
  //   let params = {
  //     page: page ? page.number : 0,
  //     size: page ? page.size : '',
  //     sort: page && page.sort ? page.sort : ''
  //   };
  //   this.loading = true;
  //   this.CaseInfoService.pageList(params).subscribe(
  //     pag => {
  //       this.pagination = pag;
  //       this.caseInfos = pag.content;
  //       this.loading = false;
  //     }
  //   );
  // }

  loadData(page?: CuiPagination) {
    this.pagination = page;
    this.loading = true;
    this.caseInfoService.citeCase(this.getParams(page)).subscribe(
      pag => {
        this.pagination = pag;
        this.caseInfos = pag.content;
        this.loading = false;
      }
    );
  }

  clearSearchText() {
    this.searchText = new CaseInfo();
    this.searchText.caseCode = null;
    this.searchText.name = null;
    this.searchText.source = null;
    this.searchText.isClassic = null;
  }

  getParams(page?: CuiPagination) {
    let params = {
      page: page ? page.number : 0,
      size: page ? page.size : '',
      sort: page && page.sort ? page.sort : ''
    }
    if (this.searchText.caseCode != '' && this.searchText.caseCode != null) {
      params["caseCode"] = this.searchText.caseCode
    }
    if (this.searchText.name != '' && this.searchText.name != null) {
      params["name"] = this.searchText.name
    }
    if (this.searchText.source != '' && this.searchText.source != null) {
      params["source"] = this.searchText.source
    }
    if (this.searchText.isClassic != null) {
      params["isClassic"] = this.searchText.isClassic
    }
    return params;
  }

  onSelect(selIds: any[]) {
    this.selected = selIds;
  }

  openLookup() {
    this.modalSubject = this.modal.open({
      title: "引入案例库案例",
      content: this.lookupModalContent,
      footer: this.lookupModalFooter,
      maskClosable: false,
      width: 1000,
      onOk: () => { },
      onCancel: () => { }
    });
    this.ngOnInit();
  }

  _ok() {
    this.modalSubject.destroy("onOk");
    let ids = this.selected;
    this.selected = [];
    this.ok.emit(ids);
  }

  _cancel() {
    this.modalSubject.destroy("onCancel");
    this.cancel.emit();
  }
}
