import { Component, OnInit } from '@angular/core';
import { CodeStrategy } from 'app/system/entity/code-strategy';
import { CodeStrategyService } from 'app/system/service/code-strategy-service';

@Component({
  selector: 'spk-code-strategy',
  templateUrl: './code-strategy.component.html',
  styleUrls: ['./code-strategy.component.scss']
})
export class CodeStrategyComponent implements OnInit {

  codeStrategy: any;
  err;
  traindClassCode: CodeStrategy;
  courseCode: CodeStrategy;


  constructor(
    private codeStrategyService: CodeStrategyService
  ) { }

  ngOnInit() {
    this.initcodeStrategy("TRAIN_CLASS");
  }

  _tabChange(event) {
    if (event.index == 0) {
      this.initcodeStrategy("TRAIN_CLASS");
    }
    if (event.index == 1) {
      this.initcodeStrategy("COURSE");
    }
  }

  initcodeStrategy(type: 'TRAIN_CLASS' | 'COURSE') {
    this.codeStrategyService.getCodeStrategy(type).subscribe(
      codeStrategy => {
        if (codeStrategy) {
          if (type == "TRAIN_CLASS") {
            this.traindClassCode = codeStrategy;
          }
          if (type == "COURSE") {
            this.courseCode = codeStrategy;
          }
        } else {
          if (type == "TRAIN_CLASS") {
            this.traindClassCode = new CodeStrategy();
          }
          if (type == "COURSE") {
            this.courseCode = new CodeStrategy();
          }
        }
      },
      err =>
        this.err = err
    )
  }
}
