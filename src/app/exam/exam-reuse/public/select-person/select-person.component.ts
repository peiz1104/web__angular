/*
 * @Author: majunfeng
 * @Date: 2017-11-12 10:13:43
 * @Last Modified by: majunfeng
 * @Last Modified time: 2017-11-12 20:19:29
 */
import { Component, OnInit, Input, forwardRef, ViewChild, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { CuiPagination } from 'console-ui-ng';
import { UserGroup } from 'app/system/entity/user-group';
import { User } from 'app/system/entity/user';
import { UserLookupService } from 'app/system/service/user-lookup.service';
import { ExaminationService } from '../../service/examination.service';

@Component({
  selector: 'spk-select-person',
  templateUrl: './select-person.component.html',
  styleUrls: ['./select-person.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => SelectPersonComponent),
    multi: true
  }]
})
export class SelectPersonComponent implements OnInit, ControlValueAccessor {
  @Input() mode: 'single' | 'checkbox' = 'checkbox'; // 多选还是单选
  @Input() placeholder: string = '请输入选择的人员...';
  @Input() stCode: string;
  @Input() examId: number;
  @Input() data: any;
  @Output() getJk = new EventEmitter();

  _value: any; // 单个值、单个对象、值数组、对象数组 // 所对应的双向数据

  loading: boolean = false;
  pagination: CuiPagination;
  columns: any = [
    { title: '用户名', data: 'username', styleClass: 'text-center' },
    { title: '姓名', data: 'displayName', styleClass: 'text-center' },
    { title: '手机号', data: 'phoneNumber', styleClass: 'text-center' },
    { title: '邮箱', data: 'email', styleClass: 'text-center' },
    { title: '所属组织', data: 'userGroup.name', styleClass: 'text-center' }
  ];
  columnsData: User[];

  // ngModel access 数据处理
  onChange: any = Function.prototype;
  onTouched: any = Function.prototype;

  selection: any[] = []; // 已选择的数据
  selectPerson: boolean = false; // 控制模态框的显示与隐藏
  userGroup: UserGroup; // 选择的组织内容
  searchtext: string; // 搜索内容
  constructor(private userService: UserLookupService,
    private examinationService: ExaminationService
  ) { }

  ngOnInit() {
    this.getStaffList();
    this.loadData();
  }
  // 初始化加载数据...
  loadData(page?: CuiPagination) {
    this.loading = true;
    this.pagination = page;
    let params = {
      'userGroup.id': this.userGroup && this.userGroup.id ? this.userGroup.id : '',
      username: this.searchtext,
      page: page ? page.number : 0,
      size: page ? page.size : '10',
      sort: page && page.sort ? page.sort : ''
    };

    this.userService.users(null, params).subscribe(
      pag => {
        this.pagination = pag;
        this.columnsData = pag.content;
        this.loading = false;
      }
    );
  }
  // 写入数据
  writeValue(value: any): void {
    if (Array.isArray(value)) {
      this._value = value;
    } else {
      this._value = value ? [value] : [];
    }
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  openSelectPersonModule(event) {
    this.selectPerson = true;
  }
  // 处理数据的格式
  mergeSelection() {
    // this._value = this.selection.filter(it => !it.disabled).map(it => it.data);
    this._value = this.selection;
    this.onChange(this._value);
  }
  // 关闭模态框
  handleCancel(event) {
    this.selectPerson = false;
  }
  // 确认按钮
  sublimtPerson(event) {
    this.mergeSelection();
    this.selectPerson = false;
  }
  // 选择组织的信息，每次单选
  selectUserGroup(selectGroups) {
    this.userGroup = selectGroups;
    this.loadData();
  }
  // 获取现有列表
  getStaffList() {
    //  获取监考人、|| 复评人列表
    let json = {
      examId: this.examId,
      stCode: this.stCode
    }
    this.examinationService.getStaffList(json).subscribe(
      data => {
        //  this.proctorData = date;
        this._value = data;
        this.onChange(this._value);
        this.getJk.emit(this._value);
      }
    );
  }
}

