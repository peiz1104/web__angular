import { Component, OnInit, ViewChild } from "@angular/core";
import { Pagination } from "app/core/entity/pagination";
import { FormGroup, FormBuilder, FormControl } from "@angular/forms";
import { TestQuestionService } from "app/exam/service/test-question.service";
import { Router, ActivatedRoute } from "@angular/router";
import { NzMessageService } from "ng-zorro-antd";
import { Observable } from "rxjs/Observable";
import * as moment from "moment";

@Component({
  selector: "spk-test-his",
  templateUrl: "./test-his.component.html",
  styleUrls: ["./test-his.component.scss"]
})
export class TestHisComponent implements OnInit {
  nzSpinning: boolean = true;
  _searchForm: FormGroup; // 查询表单
  hisListData: any; // 列表数据
  selection: any[]; // table 选择数据
  ids: any[]; // 查询条件
  params: any;
  modalVisible: boolean = false;
  difficult: any; // 难度下拉数据
  questionType: any;
  columns: any = [
    // knowledgeId
    {
      title: "题干",
      tpl: "casual",
      styleClass: "text-center",
      style: { "max-width": "200px" }
    },
    {
      title: "试题类型",
      data: "typeName",
      styleClass: "text-center",
      style: { "max-width": "100px" }
    },
    {
      title: "试题难度",
      data: "diffName",
      styleClass: "text-center",
      style: { "max-width": "200px" }
    },
    {
      title: "分类",
      tpl: "konwName",
      styleClass: "text-center",
      style: { "max-width": "200px" }
    },
    { title: "创建时间", tpl: "createdDate", styleClass: "text-center" },
    { title: "创建人", tpl: "userName", styleClass: "text-center" },
    { title: "操作", tpl: "option", styleClass: "text-center" }
  ];
  constructor(
    private testQuestionService: TestQuestionService,
    public activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private nzMessageService: NzMessageService,
    private router: Router
  ) {}

  ngOnInit() {
    this.ids = this.activatedRoute.snapshot.params["ids"];
    this.initInfo();
  }
  checkDate = (type, control: FormControl): any => {
    let startTime =
      this._searchForm &&
      this._searchForm.controls["createStartTime"] &&
      this._searchForm.controls["createStartTime"].value;
    let endTime =
      this._searchForm &&
      this._searchForm.controls["createEndTime"] &&
      this._searchForm.controls["createEndTime"].value;
    let that = this;
    return Observable.create(function(observer) {
      if (startTime && endTime) {
        if (
          moment(endTime)
            .format("YYYY-MM-DD")
            .valueOf() <
          moment(startTime)
            .format("YYYY-MM-DD")
            .valueOf()
        ) {
          that.nzMessageService.error("结束时间必须大于开始时间");
          if (type == 1) {
            // 输入的开始时间
            that._searchForm.get(`createEndTime`).setValue(null);
          } else {
            that._searchForm.get(`createStartTime`).setValue(null);
          }
        }
      }
      observer.next(null);
      observer.complete();
    });
  };
  initInfo() {
    this._searchForm = this.fb.group({
      // 查询表单初始化
      casual: [null],
      typeCode: [null],
      createStartTime: [null, [], this.checkDate.bind(null, 1)],
      createEndTime: [null, [], this.checkDate.bind(null, 2)],
      diffCode: [null],
      lastModifiedDate: [null]
    });
    this.testQuestionService.getDifficulty().subscribe(data => {
      this.difficult = data;
      // tslint:disable-next-line:no-unused-expression
      // this._searchForm && this._searchForm.get(`diffCode`).setValue(data[0].diffCode);
    });
    this.testQuestionService.getQuestionType().subscribe(data => {
      this.questionType = data;
      // tslint:disable-next-line:no-unused-expression
      // this._searchForm && this._searchForm.get(`typeCode`).setValue(data[0].typeCode);
    });
    this.loadData();
  }
  goBack() {
    this.router.navigate([`exam/test-question/list`]);
  }
  loadData(page?: Pagination<any>, param?: any) {
    // table组件加载列表数据
    // console.log(param);
    let params = {
      ...this._searchForm.value,
      ...param,
      ids: this.ids
    };
    this.nzSpinning = true;
    this.selection = [];
    this.testQuestionService.getHisList(params, page).subscribe(hisListData => {
      this.hisListData = hisListData;
      this.nzSpinning = false;
      this.selection = [];
    });
  }
  _submitForm($event, value) {
    // 查询表单提交
    $event.preventDefault();
    value.createStartTime =
      value.createStartTime &&
      moment(value.createStartTime).format("YYYY-MM-DD");
    value.createEndTime =
      value.createEndTime && moment(value.createEndTime).format("YYYY-MM-DD");
    this.loadData(null, value);
  }
  getIds = (id?) => {
    let ids = [];
    if (id) {
      return [id];
    }
    (this.selection || []).forEach((obj, index) => {
      ids.push(obj.qbId);
    });
    return ids;
  };
  changeModal = id => {
    if (
      (!this.selection || this.selection.length == 0) &&
      !id &&
      !this.modalVisible
    ) {
      this.nzMessageService.error("请选择试题!");
      return;
    }
    this.modalVisible = !this.modalVisible;
    if (this.modalVisible) {
      this.params = {
        ids: this.getIds(id)
      };
    } else {
      this.params = null;
    }
  };
  backToList() {
    this.router.navigate(["exam/test-question/list", {}]);
  }
  resetForm($event: MouseEvent) {
    // 重置查询表单
    $event.preventDefault();
    this._searchForm.reset();
    // tslint:disable-next-line:forin
    for (const key in this._searchForm.controls) {
      this._searchForm.controls[key].markAsPristine();
    }
  }
}
