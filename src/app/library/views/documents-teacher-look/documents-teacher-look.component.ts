import { Router, ActivatedRoute } from '@angular/router';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { CuiLayer, Column } from 'console-ui-ng';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Pagination } from 'app/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { EmploymentDocumentsService } from 'app/library/service/employment-documents.service';



@Component({
  selector: 'spk-documents-teacher-look',
  templateUrl: './documents-teacher-look.component.html',
  styleUrls: ['./documents-teacher-look.component.scss']
})
export class DocumentsTeacherLookComponent implements OnInit {

  @Output() lookOk: EventEmitter<any> = new EventEmitter();
  @Input() lookTeacherIds;
  data: Pagination<any>;
  loading: boolean;
  selection: any;
  searchBy: {
    category?: any,
    name?: string
  }
  columns: Column[] = [
    { title: '讲师编号', data: 'teacherNo' },
    { title: '讲师名称', tpl: 'teacherName' },
    { title: '讲师类型', tpl: 'teacherType' },
  ];

  _searchForm: FormGroup;
  _isComplexSearch: boolean = false;
  _options: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private employmentDocumentsService: EmploymentDocumentsService,
    private message: NzMessageService,
    private fb: FormBuilder,
    private modal: NzModalService
  ) { }

  ngOnInit() {
    this.loadData();
    this.initSearchForm();
  }
  initSearchForm() {
    this._searchForm = this.fb.group({
      name: [],
    });
  }

  loadData(page?: Pagination<any>) {
    this.loading = true;
    let params = {
      page: page ? page.number : 0,
      size: page ? page.size : 10,
      ...this.searchBy
    };
    let teacherData = {
      teacherIds: this.lookTeacherIds
    }
    this.employmentDocumentsService.lookTeacher(teacherData).subscribe(
      data => {
        this.data = data;
        this.loading = false;
      },
      err => {
        this.loading = false;
      }
    );
  }



}
