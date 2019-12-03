import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { User } from 'app/system/entity/user';
import { Teacher } from 'app/library/entity/teacher';
import { CuiPagination } from 'console-ui-ng';
import { TeacherService } from 'app/library/service/teacher.service';
import { CuiLayer, CuiLayerRef, Column } from 'console-ui-ng';
import { Component, OnInit, ViewChild, TemplateRef, forwardRef, ChangeDetectorRef, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'spk-teacher-user-form',
  templateUrl: './teacher-user-form.component.html',
  styleUrls: ['./teacher-user-form.component.scss']
})
export class TeacherUserFormComponent implements OnInit {

  @ViewChild("lookupDialog") lookupDialog: TemplateRef<any>;
  @Output() afterSelected = new EventEmitter();

  layerRef: CuiLayerRef<any>;
  err;
  selection: User[];
  loading: boolean;
  searchtext: string;

  columns: Column[] = [
    { title: '用户名', data: 'username' },
    { title: '姓名', data: 'displayName' },
    { title: '邮件', data: 'email' },
    { title: '联系方式', data: 'phoneNumber' },
    { title: '所属组织', data: 'userGroup.name' }
  ];

  value: User;
  pagination: CuiPagination;
  onModelChange: Function = () => { };
  onModelTouched: Function = () => { };

  constructor(private layer: CuiLayer, private teacherService: TeacherService,
    private cd: ChangeDetectorRef) { }

  ngOnInit() {
  }

  writeValue(value: any): void {
    this.value = value;
    this.cd.markForCheck();
  }

  registerOnChange(fn: any): void {
    this.onModelChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onModelTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    throw new Error("Method not implemented.");
  }

  openLookup() {
    this.layerRef = this.layer.open(this.lookupDialog, { shadeClose: false });

    this.selection = [];
    this.loadList();
  }

  loadList(page?: any) {
    this.loading = true;
    this.pagination = page;
    let params = {
      displayName: this.searchtext,
      page: page ? page.number : 0,
      size: page ? page.size : '10',
      sort: page && page.sort ? page.sort : ''
    };
    this.teacherService.pageUserList(params).subscribe(
      user => {
        this.pagination = user;
        this.loading = false;
      },
      err => {
        this.err = err;
        this.loading = false;
      }
    );
  }

  ok(e) {
    if (this.getSelection()) {
      this.value = this.getSelection();
      this.afterSelected.emit(this.value);
      this.onModelChange(this.value);
    } else {
      this.layer.alert('请选择用户');
      return;
    }
    this.layerRef.close();
  }

  cancel(e) {
    this.layerRef.close();
  }

  getSelection(): User {
    if (this.selection && this.selection.length > 0) {
      return this.selection[0];
    }
  }

}
