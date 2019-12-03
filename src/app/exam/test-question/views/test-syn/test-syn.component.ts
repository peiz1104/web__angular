import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { NzMessageService, NzModalService } from "ng-zorro-antd";
import { TestQuestionService } from "app/exam/service/test-question.service";
import { Pagination } from "app/core/entity/pagination";

@Component({
  selector: "spk-test-syn",
  templateUrl: "./test-syn.component.html",
  styleUrls: ["./test-syn.component.scss"]
})
export class TestSynComponent implements OnInit {
  @Input() visible: boolean = false;
  @Input() queId: any;
  @Output() handleVisible: any = new EventEmitter<string>();
  btnLoading: boolean = false;
  nzSpinning: boolean = false;
  selection: any[];
  examListData: any;
  columns: any = [
    {
      title: "考试名称",
      data: "examName",
      styleClass: "text-center",
      style: { "max-width": "200px", width: "200px" }
    },
    {
      title: "所属机构",
      data: "siteName",
      styleClass: "text-center",
      style: { "max-width": "200px", width: "200px" }
    },
    {
      title: "考试类型",
      tpl: "epType",
      styleClass: "text-center",
      style: { "max-width": "150px" }
    },
    {
      title: "创建时间",
      tpl: "createdDate",
      styleClass: "text-center",
      style: { "max-width": "150px" }
    },
    {
      title: "创建人",
      data: "createdUserName",
      styleClass: "text-center",
      style: { "max-width": "150px" }
    }
  ];
  constructor(
    private testQuestionService: TestQuestionService,
    private confirmServ: NzModalService,
    private nzMessageService: NzMessageService
  ) {}

  ngOnInit() {
    this.loadData();
  }
  synchroExam() {
    if (!this.selection || this.selection.length == 0) {
      this.nzMessageService.error("请选择考试!");
      return;
    }
    let ids = this.selection.map(item => {
      return item.examId;
    });
    this.btnLoading = true;
    this.testQuestionService.synchroExam(ids, this.queId).subscribe(
      data => {
        this.nzMessageService.success("同步成功!");
        this.btnLoading = false;
        this.handleVisible.emit();
      },
      error => {
        this.nzMessageService.error(error);
        this.btnLoading = false;
      }
    );
  }
  loadData(page?: Pagination<any>, param?: any) {
    // table组件加载列表数据
    this.nzSpinning = true;
    let params = {
      ...param,
      queId: this.queId
    };
    this.testQuestionService
      .getExamList(params, page)
      .subscribe(examListData => {
        this.examListData = examListData;
        this.nzSpinning = false;
        this.selection = [];
      });
  }
}
