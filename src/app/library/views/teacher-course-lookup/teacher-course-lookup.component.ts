import { TeacherPartService } from './../../service/teachernew.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { CuiLayer, Column } from 'console-ui-ng';
import { Component, OnInit, Output,Input,EventEmitter } from '@angular/core';
import { Pagination } from 'app/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Category } from 'app/system/category/entity/category';
import { tipMessage } from 'app/account/entity/message-tip';

@Component({
  selector: 'spk-teacher-course-lookup',
  templateUrl: './teacher-course-lookup.component.html',
  styleUrls: ['./teacher-course-lookup.component.scss']
})
export class TeacherCourseLookupComponent implements OnInit {

  @Output() save: EventEmitter<any> = new EventEmitter();
  @Input() curId;
  @Input() isTeacher?: boolean;
  selectType : any;
  data: Pagination<any>;
  loading: boolean;
  selection: any;
  searchBy: {
    category?: Category,
    name?: string,
    status?: string,
  } = {
    status: ''
  };

  _status = [
    { value: 'published', label: '已发布', disabled: false },
    { value: 'not-published', label: '未发布', disabled: false },
    { value: 'archived', label: '已归档', disabled: false },
  ];


  columns: Column[] = [
    { title: '名称/编码', tpl: 'col2-1' },
    { title: '类型/学时', tpl: 'col2-2' },
    { title: '组织/分类', tpl: 'col2-3' },
    { title: '状态', tpl: 'colIsPublished' },
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
    private modal: NzModalService
  ) { }

  ngOnInit() {
    this.loadData();
    this.initSearchForm();
    if(this.isTeacher){ // 讲师高级查询组件用单选查询
        this.selectType ="radio";
    }else{ // 讲师授权课程给用多选
        this.selectType ="checkbox";
    }
  }
  initSearchForm() {
    this._searchForm = this.fb.group({
      name: [],
      category:[],
      status:['']
    });
  }

  loadData(page?: Pagination<any>) {
    this.loading = true;
    let params = {
      size: page ? page.size : 10,
      page: page ? page.number : 0,
    };
    params['name'] = this.searchBy.name;
    if (this.searchBy.status) {
      if (this.searchBy.status == 'published') {
        params['isPublished'] = true;
      }
      if (this.searchBy.status == 'not-published') {
        params['isPublished'] = false;
      }
      if (this.searchBy.status == 'archived') {
        params['isArchived'] = true;
      }
  }
  if (this.searchBy.category && this.searchBy.category.id) {
     params['category.id'] = this.searchBy.category.id;
  }
    if(this.curId){
        this.teacherPartService.getCourse(params,this.curId).subscribe(
            data => {
              this.data = data;
              this.loading = false;
            },
            err => {
              this.loading = false;
            }
          );
    }else{ // 讲师列表 -- 高级查询 --课程模糊查询
        this.teacherPartService.getqueryCourse(params).subscribe(
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

  hasSelection() {
    return this.selection && this.selection.length > 0;
  }

  _submitForm($event, value) {
    $event.preventDefault();
    // tslint:disable-next-line:forin
    this.searchBy = value;
     console.log(this.searchBy, 2333)
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

  selectOK() {
      if(this.selection){
          if(this.isTeacher){ // 讲师高级查询需要返回对象
            this.save.emit(this.selection);
          }else{ // 给讲师添加授权传课程ids即可
            let ids = this.getIds(this.selection);
            this.save.emit(ids);
          }
      }else{
        tipMessage('请选择课程');
      }
  }
  clear() {
    this.selection = [];
    this.loadData();
  }

  getIds(array: any[]) {
    let ids = [];
    array.map((item, index) => {
        ids.push(item.id)
    })
    return ids;
}


}
