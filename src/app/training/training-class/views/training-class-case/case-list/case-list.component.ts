import { Component, OnInit } from '@angular/core';
import { CaseInfoService } from 'app/library/service/case.service';
import { CaseInfo } from 'app/library/entity/case-info';
import { OfferingCaseService } from 'app/learning/offering/service/offering-case-api.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { OfferingCase } from 'app/learning/offering/entity/offering-case';
import { Pagination } from 'app/core';
import { Column, CuiPagination, CuiLayer } from 'console-ui-ng';
import { Data } from '@angular/router/src/config';
import { NzModalService, NzMessageService } from 'ng-zorro-antd';
import { TrainingClassApiService } from '../../../../service/training-class-api.service';
import { tipMessage } from 'app/account/entity/message-tip';

@Component({
  selector: 'spk-case-list',
  templateUrl: './case-list.component.html',
  styleUrls: ['./case-list.component.scss']
})
export class CaseListComponent implements OnInit {

  columns: Column[] = [
    { title: '案例编码', data: 'caseCode', tpl: 'caseCode' },
    { title: '案例名称', data: 'name', tpl: 'caseName' },
    { title: '经典案例', data: 'isClassic', tpl: 'caseTypeClassic' },
    { title: '是否发布', data: 'isPublished', tpl: 'caseTypeRelease' },
    { title: '案例来源', data: 'source', tpl: 'caseTypeSource' },
    { title: '所属组织', tpl: 'userGroup', visible: true },
    { title: '所属分类', tpl: 'category', visible: true },
    { title: '类型', data: 'useType', tpl: 'caseUseType' }
  ];
  data: Pagination<OfferingCase>;
  loading: boolean = true;
  searchText: CaseInfo;
  selection: OfferingCase[];
  tbcId: number;
  trainingName: string;

  constructor(
    private message: NzMessageService,
    private modal: NzModalService,
    private offeringCaseService: OfferingCaseService,
    private router: Router,
    private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.searchText = new CaseInfo();
    this.route.params.subscribe(
      (params: Params) => {
        this.tbcId = +params['tbcId'];
      }
    );

    this.route.data.subscribe(
      (obj: { trainingClass: any }) => {
        this.trainingName = obj.trainingClass.name;
      }
    );
    this.loadData();
  }

  loadData(page?: CuiPagination) {
    this.loading = true;
    this.offeringCaseService.searchData(this.tbcId, this.getParams(page)).subscribe(
      data => {
        this.data = data;
        this.loading = false;
      },
      err => {
        this.loading = false;
      }
    );
  }

  getParams(page?: CuiPagination) {
    let params = {
      page: page ? page.number : 0,
      size: page ? page.size : '',
      sort: 'lastModifiedDate,desc'
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
    if (this.searchText.isPublished != null) {
      params["isPublished"] = this.searchText.isPublished
    }
    if (this.searchText.userGroup != null) {
      params["userGroup.id"] = this.searchText.userGroup.id
    }
    if (this.searchText.category != null) {
      params["category.id"] = this.searchText.category.id
    }
    return params;
  }

  clearSearchText() {
    this.searchText = new CaseInfo();
    this.searchText.caseCode = null;
    this.searchText.name = null;
    this.searchText.source = null;
    this.searchText.isClassic = null;
    this.searchText.isPublished = null;
    this.searchText.userGroup = null;
    this.searchText.category = null;
  }

  delete(offeringCase?: OfferingCase, single_flag?: boolean) {
    this.batchOperate('delete', '删除', offeringCase, single_flag);
  }
  publish(offeringCase?: OfferingCase, single_flag?: boolean) {
    this.batchOperate('publish', '发布', offeringCase, single_flag);
  }
  disPublish(offeringCase?: OfferingCase, single_flag?: boolean) {
    this.batchOperate('disPublish', '撤销发布', offeringCase, single_flag);
  }

  // single_flag:true表示行内的操作 false表示批量的操作
  private batchOperate(action: string, actionName: string, offeringCase?: OfferingCase, single_flag?: boolean) {
    let canNext = true;
    let selected = offeringCase ? [offeringCase] : this.selection;
    if (!selected || selected.length == 0) {
      tipMessage(`请选择要${actionName}的案例`, 'warning');
      return;
    }

    if (actionName != "删除") {
      canNext = this.publishCheck(selected, actionName);
    }

    if (canNext) {
      if (single_flag) {
        this.offeringCaseService[action]([offeringCase].map(it => it.id), this.tbcId).subscribe(
          ok => {
            this.message.success(`${actionName}成功`);
            this.loadData();
          },
          err => this.message.error(`${actionName}失败`)
        );
      } else {
        this.modal.confirm({
          title: `确定要${actionName}选择的案例吗？`,
          onOk: () => {
            let canDel = true;
            let isCite = false;
            selected.forEach(c => {
              if (c.caseInfo.isPublished == 'Y' && c.useType != "CITE") {
                canDel = false;
              }
            });
            if (action == 'delete' && !canDel) {
            tipMessage('发布状态下不允许删除', 'warning');
              return;
            }
            this.offeringCaseService[action](selected.map(it => it.id), this.tbcId).subscribe(
              ok => {
              tipMessage(`${actionName}成功`, 'success');
                this.loadData();
              },
            err => tipMessage(`${actionName}失败`)
            );
          }
        });
      }
    }
  }

  publishCheck(selection: OfferingCase[], actionName: string) {
    let canNext = true;
    let infos = new Array();
    for (let index = 0; index < selection.length; index++) {
      let info = selection[index];
      if (info.useType == "CITE") {
        tipMessage('所选案例中包含引用案例，不能进行该操作', 'warning');
        canNext = false;
        break;
      }
      if (actionName == "发布") {
        if (info.caseInfo.isPublished == "N") {
          infos.push(info);
        }
      }
      if (actionName == "撤销发布") {
        if (info.caseInfo.isPublished == "Y") {
          infos.push(info);
        }
      }
    }
    if ((!infos || infos.length <= 0) && canNext) {
      canNext = false;
      switch (actionName) {
        case "发布": tipMessage('所选案例都处于发布状态，不能进行发布操作', 'warning', 2000); break;
        case "撤销发布": tipMessage('所选案例都处于未发布状态，不能进行撤销发布操作', 'warning', 2000); break;
      }
    }
    return canNext;
  }

  caseCiteLookupOk(selected) {
    if (selected && selected.length > 0) {
      this.offeringCaseService.citeCase(this.tbcId, selected).subscribe(
        ok => {
          tipMessage('引入案例成功', 'success');
          this.loadData();
        },
        err => {
          tipMessage('引入案例失败');
        }
      );
    } else {
      this.modal.warning({ title: '请选择要引用的案例！', zIndex: 1200 });
      return;
    }
  }
}
