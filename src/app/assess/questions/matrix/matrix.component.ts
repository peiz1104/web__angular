import { Component, OnInit, Input } from '@angular/core';
import { QuestionBase } from '../base-question.model';
import { QuestionsService } from '../questions.service';

@Component({
  selector: 'spk-assess-matrix',
  templateUrl: './matrix.component.html',
  styleUrls: ['./matrix.component.scss']
})
export class MatrixComponent implements OnInit {

  @Input() question: QuestionBase;
  @Input() idx: number;
  childQuestion = [];

  constructor(private questionsService: QuestionsService) { }

  ngOnInit() {
    console.log(this.question)
  }

  onSave() {
    this.question.isEdit = false;
  }

}
