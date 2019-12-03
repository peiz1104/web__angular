import { TrainingClassMessageApiService } from './../../../../../service/training-class-message.service';
import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { CuiPagination, Column } from 'console-ui-ng';
import { Pagination } from 'app/core';

@Component({
  selector: 'spk-training-class-messages-persons',
  templateUrl: './training-class-messages-persons.component.html',
  styleUrls: ['./training-class-messages-persons.component.scss']
})
export class TrainingClassMessagesPersonsComponent implements OnInit {

  data: any;
  loading: boolean = false;
  @Input() id: number;
  @Input() selection: any;
  @Output() selected = new EventEmitter<any>();

  columns: Column[] = [
    { title: '用户名', data: 'username', style: { 'max-width': '100px', width: '100px' }, styleClass: 'add' },
    { title: '姓名', data: 'displayName' },
    { title: '手机号', data: 'phoneNumber' },
    { title: '电子邮件', data: 'email' },
    { title: '所属组织', data: 'userGroup.name' },
  ];
  _searchForm: FormGroup;
  _isComplexSearch: boolean = false;
  constructor(
    private fb: FormBuilder,
    private trainingClassMessageApi: TrainingClassMessageApiService,
  ) { };
  ngOnInit() {
    this.initSearchForm();
    this.loadData();
  }
  initSearchForm() {
    this._searchForm = this.fb.group({
      username: [],
      displayName: [],
      userGroupId: []
    });
  }

  // rowChecked
  loadData(page?: any) {
    this.loading = true;
    let params = {
      ...this._searchForm.value,
      offeringId: this.id,
      page: this.data ? this.data.number : 0,
      size: this.data ? this.data.size : 10,
    };

    this.trainingClassMessageApi.getPersons(params).subscribe(
      obj => {
        this.data = obj;
        this.selection = this.data.content.filter(it => this.isSelected(it));
        this.loading = false;
      },
      err => {
        this.loading = false;
      }
    );
  }

  isSelected(row) {
    if (!this.selection) {
      this.selection = [];
    }
    return this.selection.some(it => it.id == row.id);
  }

  _submitForm($event, value) {
    $event.preventDefault();
    value.userGroupId = value.userGroupId && value.userGroupId.id;
    this.loadData();
  }
  resetForm($event: MouseEvent) {
    $event.preventDefault();
    this._searchForm.reset();
    // tslint:disable-next-line:forin
    for (const key in this._searchForm.controls) {
      this._searchForm.controls[key].markAsPristine();
    }
  }
  selectPerson() {
    this.selected.emit(this.selection);
  }
}
