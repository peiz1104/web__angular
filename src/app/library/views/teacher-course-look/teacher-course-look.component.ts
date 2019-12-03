import { TeacherPartService } from './../../service/teachernew.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { CuiLayer, Column } from 'console-ui-ng';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Pagination } from 'app/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'spk-teacher-course-look',
  templateUrl: './teacher-course-look.component.html',
  styleUrls: ['./teacher-course-look.component.scss']
})
export class TeacherCourseLookComponent implements OnInit {

  @Output() lookOk: EventEmitter<any> = new EventEmitter();
  @Input() lookCourseId;
  data: Pagination<any>;
  loading: boolean;
  selection: any;
  searchBy: {
    category?: any,
    name?: string
  }
  columns: Column[] = [
    { title: '名称/编码', tpl: 'col2-1' },
    { title: '类型/学时', tpl: 'col2-2' },
    { title: '组织/分类', tpl: 'col2-3' },
    { title: '', tpl: 'rowActions' },
  ];

  _searchForm: FormGroup;
  _isComplexSearch: boolean = false;
  _options: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private teacherPartService: TeacherPartService,
    private message: NzMessageService,
    private fb: FormBuilder,
    private dialog: CuiLayer,
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
      flag: "isTrue",
      ...this.searchBy
    };
    this.teacherPartService.lookCourse(params, this.lookCourseId).subscribe(
      data => {
        this.data = data;
        this.loading = false;
      },
      err => {
        this.loading = false;
      }
    );
  }

  hasSelection() {
    return this.selection && this.selection.length > 0;
  }

  _submitForm($event, value) {
    $event.preventDefault();
    // tslint:disable-next-line:forin
    this.searchBy = value;
    // console.log(this.searchBy, 2333)
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
  getCourseTypeText(key) {
    let texts = { 'ONLINE': '在线学习', 'LIVE': '直播课堂', 'OFFLINE': '面授课程' };
    return texts[key] || '';
  }

  ok() {
    this.lookOk.emit();
  }

  delete(id) {
    this.dialog.confirm('确认要删除吗？',
      () => {
        this.teacherPartService.deleteCourseTeacher(this.lookCourseId, id).subscribe(
          () => {
            this.dialog.msg('删除成功');
            this.loadData();
          },
          err => { this.dialog.confirm(err) }
        );
      }
    );
  }



}
