import { UserLookupApiService } from './../../api/user-lookup-api.service';
import { CuiPagination, Column } from 'console-ui-ng';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import {
  Component, OnInit, AfterViewInit, forwardRef,
  Input, Output, EventEmitter, ContentChild, TemplateRef, ViewChild
} from '@angular/core';
import { NzModalService, NzModalSubject, NzMessageService } from 'ng-zorro-antd';
import { tipMessage } from 'app/account/entity/message-tip';

@Component({
  selector: 'spk-new-user-lookup',
  templateUrl: './new-user-lookup.component.html',
  styleUrls: ['./new-user-lookup.component.scss']
})
export class NewUserLookupComponent implements OnInit {
  @Input() btnText: string;
  @Input() type: string;
  @Input() mode: string;
  @Input() userListApiUrl: string;
  @Input() privileges: string | string[] = ['SYSTEM:USER:VIEW'];
  @Input() hideDelete: boolean;
  @Input() showNewAdd: boolean;
  @Output() ok: EventEmitter<any> = new EventEmitter();
  @Output() cancel: EventEmitter<any> = new EventEmitter();



  modalSubject: NzModalSubject;

  users: any[]; // User[];
  pagination: CuiPagination;
  columns: Column[] = [
    { title: 'ID', data: 'id' },
    { title: '用户名', data: 'username' },
    { title: '姓名', data: 'displayName' },
    { title: '手机号', data: 'phoneNumber' },
    { title: '邮箱', data: 'email' },
    { title: '性别', data: 'sex', tpl: 'sex' },
    { title: '所属组织', data: 'userGroup.name', visible: true },
    { title: '开始日期', data: 'startDate', visible: false },
    { title: '到期日期', data: 'endDate', visible: false },
    { title: '状态', data: 'status', tpl: 'statusCol' }
  ];

  searchtext;

  isComplexSearch = false;

  target: any;
  tableLoading: boolean = false;
  selection: any[];

  isRemoveBreak;

  constructor(
    private modal: NzModalService,
    private userLookupApi: UserLookupApiService,
    private message: NzMessageService
  ) { }


  ngOnInit() {
  }

  onUgSelectionChange(targets) {
    targets = targets && Array.isArray(targets) ? targets : (targets ? [targets] : []);
    let ug = targets[0];
    this.target = ug;
    this.loadData();
  }
  loadModal() {
    this.showNewAdd = true;
  }
  loadData(page?: CuiPagination) {
    this.pagination = page;
    this.selection = [];
    // console.log(page);
    let params = {
      // 'userGroup.id': this.userGroup && this.userGroup.id ? this.userGroup.id : '',
      searchtext: this.searchtext,
      withChildGroup: true,
      permissions: this.privileges,
      page: page ? page.number : 0,
      size: page ? page.size : '',
      sort: page && page.sort ? page.sort : ''
    };

    if (this.target && this.target['id']) {
      if (this.target['type'] == 'SITE') {
        params['site.id'] = this.target['id'];
      }

      if (this.target['type'] == 'USER_GROUP') {
        params['userGroup.id'] = this.target['id'];
      }
    }

    this.tableLoading = true;
    this.userLookupApi.users(null, params).subscribe(
      pag => {
        this.pagination = pag;
        this.users = pag.content;
        this.tableLoading = false;
      }
    );
  }

  userSelectionChange(users) {
    console.log(users);
  }
  _ok() {
    console.log(this.selection);
    if (!this.selection || this.selection.length == 0) {
      tipMessage('请选择人员！');
      return;
    }

    if (this.mode == 'single' && this.selection.length > 1) {
      tipMessage('只能选择一位人员！');
      return;
    } else {
      this.showNewAdd = false;
      this.ok.emit(this.selection);
    }
  }
  _cancel() {
    this.cancel.emit();
  }
}
