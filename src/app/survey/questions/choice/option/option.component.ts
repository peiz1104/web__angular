import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { QuestionBase } from '../../base-question.model';
import { QuestionsService } from '../../questions.service';
import { Option } from '../../option.model';
import { CuiLayer } from 'console-ui-ng';
import { DomSanitizer } from '@angular/platform-browser';
import { FileuploadComponent } from 'console-ui-ng';

@Component({
  selector: 'spk-choice-option',
  templateUrl: './option.component.html',
  styleUrls: ['../../questions.component.scss']
})
export class OptionComponent implements OnInit {

  UE: any;
  @Input() question: QuestionBase;
  @Input() idx: number;
  optionJumpTo: number;
  options: Option[] = [];
  isVisibleJumpMiddle = false;
  isVisibleDescriptionMiddle = false;
  isVisibleImageMiddle = false;
  currentOption: Option;
  jumpList = [];
  inputValue: string;
  imgTmp: any;
  @ViewChild('imageFileupload') imageFileupload: FileuploadComponent;

  constructor(private questionsService: QuestionsService,
    private dialog: CuiLayer,
    private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.options = this.question.options;
  }

  onInsert(option: Option) {
    let idx = this.options.indexOf(option);
    let newOption = new Option({
      id: 0,
      name: "请在这里输入选项",
      displayOrder: option.displayOrder + 1
    });
    this.options.splice(idx + 1, 0, newOption);
    this.question.qList = this.getOptionView(this.question);
  }

  onDel(option: Option) {
    let idx = this.options.indexOf(option);
    this.options.splice(idx, 1);
    this.question.qList = this.getOptionView(this.question);
    console.log(this.question)
  }

  onUp(option: Option) {
    if (this.options.length > 1) {
      let idx = this.options.indexOf(option);
      let preOption = this.options[idx - 1];
      let displayOrder = preOption.displayOrder;
      preOption.displayOrder = option.displayOrder;
      option.displayOrder = displayOrder;
      this.options[idx - 1] = option;
      this.options[idx] = preOption;
      this.question.qList = this.getOptionView(this.question);
    }
  }

  onDown(option: Option) {
    let idx = this.options.indexOf(option);
    if (idx < this.options.length - 1) {
      let nextOption = this.options[idx + 1];
      let displayOrder = nextOption.displayOrder;
      nextOption.displayOrder = option.displayOrder;
      option.displayOrder = displayOrder;
      this.options[idx + 1] = option;
      this.options[idx] = nextOption;
      this.question.qList = this.getOptionView(this.question);
    }
  }

  getOptionView(question: QuestionBase) {
    question.displayOptionNum = +question.displayOptionNum;
    let a_len = question.options.length;
    let result = [];
    for (let i = 0; i < a_len; i += question.displayOptionNum) {
      result.push(question.options.slice(i, i + question.displayOptionNum));
    }
    return result;
  }

  showJumpModalMiddle(option) {
    this.currentOption = option;
    this.jumpList = [];
    if (this.idx < (this.questionsService.questions.length - 1)) {
      this.isVisibleJumpMiddle = true;
      this.questionsService.questions.forEach((q, i) => {
        if (i >= this.idx + 1) {
          this.jumpList.push(q);
        }
      });
    } else {
      if (this.idx == 0) {
        this.dialog.msg('只有一项题目，无法跳转');
      } else {
        this.dialog.msg('最后一题无法跳转');
      }
    }
  }

  handleOkMiddle(e) {
    this.isVisibleJumpMiddle = false;
  }

  handleCancelMiddle(e) {
    this.isVisibleJumpMiddle = false;
  }

  selectItem(jumpItem, cIdx) {
    this.isVisibleJumpMiddle = false;
    let idx = this.options.indexOf(this.currentOption);
    this.options[idx].jumpTo = jumpItem.id;
    this.options[idx].jumpNum = cIdx;
  }

  jumpOrOption(optionJump) {
    if (optionJump) {
      this.question.hasJump = false;
    }
  }

  showDescriptionModalMiddle(option) {
    this.currentOption = option;
    this.inputValue = '';
    if (this.currentOption.description) {
      this.inputValue = this.currentOption.description;
    }
    this.isVisibleDescriptionMiddle = true;
  }
  okDescription($event) {
    this.currentOption.description = this.inputValue;
    this.currentOption.innerDescription = this.sanitizer.bypassSecurityTrustHtml(this.inputValue);
    this.isVisibleDescriptionMiddle = false;
  }
  cancelDescription($event) {
    this.isVisibleDescriptionMiddle = false;
  }

  showImageModalMiddle(option) {
    this.currentOption = option;
    if (this.imageFileupload) {
      this.imageFileupload.clearQueue(true);
      this.imageFileupload.imageHolder = option.imgPath || undefined;
    }
    this.isVisibleImageMiddle = true;
  }

  okImage($event) {
    if (this.imgTmp) {
      this.currentOption.imgPath = this.imgTmp.relativePath;
    }
    this.isVisibleImageMiddle = false;
  }

  onUploadComplete(result) {
    this.imgTmp = result;
  }
  cancelImage($event) {
    this.isVisibleImageMiddle = false;
  }

  delImg(option) {
    let idx = this.options.indexOf(option);
    this.options[idx].imgPath = '';
  }

  delDescription(option) {
    let idx = this.options.indexOf(option);
    this.options[idx].description = '';
    this.options[idx].innerDescription = '';
  }

  optionChange(option, foo) {
    if (foo.value.trim().length) {
      option.name = foo.value;
    }
  }
}
