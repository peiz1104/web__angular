import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl
} from '@angular/forms';

@Component({
  selector: 'spk-modal-list',
  templateUrl: './modal-list.component.html',
  styleUrls: ['./modal-list.component.scss']
})
export class ModalListComponent implements OnInit {
  allData: any = {};
  columns: any = [
    { title: '考试名称', data: 'name', styleClass: 'text-center' },
    { title: '开始时间', data: 'startDate', styleClass: 'text-center' },
    { title: '结束时间', data: 'endDate', styleClass: 'text-center' },
    { title: '发布状态', data: 'type', styleClass: 'text-center' },
    { title: '操作', tpl: 'option', styleClass: 'text-center' },
  ];
  selection: any[];
  _searchForm: FormGroup;
  constructor(
    private router: Router,
    public activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
  ) { }
  loading: boolean = true;
  ngOnInit() {
    this._searchForm = this.fb.group({
      name: [''],
    });
    this.loadData();
  }
  loadData(param?: any) {
    this.loading = true;
    this.allData = {
      "content": [
        {
          "id": 1,
          "name": "测试机构"
        },
        {
          "id": 2,
          "name": "中国人寿青岛市分公司"
        },
        {
          "id": 3,
          "name": "中国人寿四川省分公司"
        },
        {
          "id": 4,
          "name": "通铭教育"
        },
        {
          "id": 5,
          "name": "测试机构"
        },
        {
          "id": 6,
          "name": "中国人寿湖南省分公司"
        },
        {
          "id": 7,
          "name": "中国人寿黑龙江省分公司"
        },
      ],
      "first": true,
      "last": false,
      "number": 0,
      "numberOfElements": 20,
      "size": 20,
      "totalElements": 64,
      "totalPages": 1
    }
    this.loading = false;
  }
  _submitForm($event, value) {
    $event.preventDefault();
    // tslint:disable-next-line:forin
    console.log(value);
    console.log(this.selection);
    return;
  }
  resetForm($event: MouseEvent) {
    $event.preventDefault();
    this._searchForm.reset();
    // tslint:disable-next-line:forin
    for (const key in this._searchForm.controls) {
      this._searchForm.controls[key].markAsPristine();
    }
  }
  selectUserGroup(groupData) {
    console.log(groupData);
  }

}
