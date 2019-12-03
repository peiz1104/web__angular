import { Component, OnInit, Input, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { TestQuestionService } from 'app/exam/service/test-question.service';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'spk-test-view',
  templateUrl: './test-view.component.html',
  styleUrls: ['./test-view.component.scss']
})
export class TestViewComponent implements OnInit {
  // @Input() selection: any[];
  // @Input() type?: any;
  @Input() url: any = '';
  @Input() params: any = {};
  @Input() view: false;
  @Input() checkbox;
  @Output() _cancelView: EventEmitter<any> = new EventEmitter();
  @Output() _addQuestion: EventEmitter<any> = new EventEmitter();
  paperId: any;
  paperInfo: any;
  _dataList: any;
  comeType: string;
  selection: any;
  _spinning: boolean = true;
  // tslint:disable-next-line:max-line-length
  chooseArray: any[] = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
  constructor(
    private testQuestionService: TestQuestionService,
    private nzMessageService: NzMessageService,
  ) { }
  ngOnInit() {
    this.inItViewInfo();
  }
  public get dataList() {
    return this._dataList;
  }
  public set dataList(v: any) {
    this._dataList = v;
  }
  public get spinning() {
    return this._spinning;
  }
  public set spinning(v: boolean) {
    this._spinning = v;
  }
  // getIds = () => {
  //   let ids = [];
  //   (this.selection || []).forEach((obj, index) => {
  //     if (this.type && this.type == 'his') {
  //       ids.push(obj.qbId);
  //     } else {
  //       ids.push(obj.queId);
  //     }
  //   });
  //   return ids;
  // }
  // tslint:disable-next-line:use-life-cycle-interface
  ngOnChanges() {
    if (this.view) {
      this.inItViewInfo();
    }
    console.log('变化：', this.view);
  }
  cancelView() {
    this._cancelView.emit();
  }
  addQuestion() {
    let arr = this.dataList.filter(it => it.checked == true);
    this._addQuestion.emit(arr)
  }
  returnNewList = (list) => { // 重构试卷数据
    let questions = [];
    // 解析问题
    let index = 1;
    (list.paperPartList || []).map(part => { // 遍历分区list
      if (!part.pqlist || part.pqlist.length == 0) {
        part.pqlist = [];
        part.pqlist[0] = {};
      }
      (part.pqlist || []).map((item, j) => { // 遍历分区下试题list
        if (j == 0) { // 如果是第一个
          item.part = part;
        }
        // item.que_num = index++;
        questions.push(item);
      });
    });
    return questions;
  }
  returnPPList = (list, type?) => { // 返回匹配题问题/选项列表
    let test = [];
    let answer = [];
    (list || []).forEach((item, i) => {
      if (item.isCorrect) { // 表示是问题
        test.push(item);
      } else {
        answer.push(item);
      }
    });
    if (type) {
      return test;
    } else {
      return answer;
    }
  }
  inItViewInfo = () => {
    if (!this.params) {
      return;
    }
    this.spinning = true;
    this.testQuestionService.getTestViewList(this.url, this.params).subscribe(
      data => {
        console.log(data);
        if (data.paperPartList !== undefined) { // 试卷信息
          this.dataList = this.returnNewList(data);
          this.paperInfo = data;
        } else if (data.pqlist !== undefined) {
          this.dataList = data.pqlist || [];
          if (this.dataList.length == 0) {
            this.dataList[0] = {};
          }
          this.dataList[0].part = data;
        } else if (data.queId !== undefined) {
          this.dataList = [data];
        } else {
          this.dataList = data || [];
        }
        if (this.checkbox) {
          this.dataList.map(it => it.checked = false)
        }
        this.spinning = false;
      },
      error => {
        this.nzMessageService.error(error);
        this.spinning = false;
      }
    );
  }
}
