import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, Input } from '@angular/core';
import { CodeStrategy } from 'app/system/entity/code-strategy';
import { Type } from '@angular/core/src/type';
import { CuiLayer, Message } from 'console-ui-ng';
import { CodeStrategyService } from '../../service/code-strategy-service';
import { read } from 'fs';
import {tipMessage} from "app/account/entity/message-tip";

@Component({
  selector: 'spk-code-strategy-form',
  templateUrl: './code-strategy-form.component.html',
  styleUrls: ['./code-strategy-form.component.scss']
})
export class CodeStrategyFormComponent implements OnInit {

  @Input() codeStrategy: CodeStrategy;
  @Input() type: any;

  _form: FormGroup;

  msg: Message[] = [];
  err: string;

  loading: boolean = false;

  /**
   * 控制进入编辑状态
   */
  // editInfo: boolean = true;

  /**
   * 控制在非编辑和编辑状态下的只读
   */
  // readonly: boolean = true;

  /**
   * 是否展示分类
   */
  showCcCode: boolean = true;

  /**
   * 控制是否展示编码样例
   */
  showCodeModel: boolean = false;

  showModel: string;

  codeFormat: string = "";

  _delimiterType = [
    { value: '', label: '无', disabled: false },
    { value: '-', label: '中横线 (-)', disabled: false },
    { value: '_', label: '下横线 (_)', disabled: false },
    { value: '.', label: '点(英文.)', disabled: false },
  ];

  public get valid() {
    return !!this._form && this._form.valid;
  }

  public get invalid() {
    return !this._form || this._form.invalid;
  }

  constructor(private dialog: CuiLayer,
    private codeStrategyService: CodeStrategyService,
    private fb: FormBuilder) {
  }

  ngOnInit() {
    if (this.type == "TRAIN_CLASS") {
      this.showCcCode = false;
    }
    this._initForm();
  }

  _initForm() {
    let m = this.codeStrategy || new CodeStrategy();
    this._form = this.fb.group({
      id: [m.id],
      prefix: [m.prefix],
      suffix: [m.suffix],
      dateFormat: [m.dateFormat || "TY"],
      haveUgCode: [m.haveUgCode || false, Validators.required],
      haveCcCode: [m.haveCcCode || false, Validators.required],
      numDigits: [m.numDigits, Validators.required],
      codeFormat: [m.codeFormat || ""],
      type: [this.type, Validators.required],
      delimiter: [m.delimiter || ""],
    });
    this.codeFormat = m.codeFormat;
  }

  setDelimiterShow(delimiter) {
    if (delimiter == '-') {
      return "中横线 (-)";
    }
    if (delimiter == '_') {
      return "下横线 (_)";
    }
    if (delimiter == '.') {
      return "点(英文.)";
    } else {
      return "无";
    }
  }
  getFormControl(name) {
    return this._form.controls[name];
  }

  markAsDirty() {
    for (let key of Object.keys(this._form.controls)) {
      this._form.controls[key].markAsDirty();
    }
  }

  save(event: Event) {
    if (!this._form.dirty) {
      tipMessage('未修改任何信息','warning');
      return;
    }
    this.markAsDirty();
    if (this._form.invalid) {
      tipMessage('表单填写有误，请更正后重新尝试.','error',5000);
      return;
    }
    if (this.checkNum) {
      return;
    }
    this.codeStrategyService.save(this._form.value).subscribe(
      codeStrategy => {
        tipMessage('保存成功','success');
        this.codeStrategy = codeStrategy;
        this._initForm();
      },
      err => {
        this.msg = err;
        this.err = err;
      }
    );
  }

  // getNowCodeStrategy() {
  //   this.codeStrategyService.getCodeStrategy(this.type).subscribe(
  //     codeStrategy => {
  //       this.codeStrategy = codeStrategy;
  //       this._initForm();
  //     },
  //     err => {
  //       this.msg = err;
  //       this.err = err;
  //     }
  //   )
  // }

  /**
   *校验流水号位数
   */
  // tslint:disable-next-line:member-ordering
  checkNum: boolean = false;
  numCheck() {
    let num = this.getFormControl("numDigits").value;
    if (num >= 6 && num <= 15) {
      this.checkNum = false;
      return;
    } else {
      this.checkNum = true;
      this.getFormControl("numDigits").setValue(null);
    }
  }
  // tslint:disable-next-line:eofline

  /**
   * 获得当前编码策略下的编码样例
   */
  getCodeModel() {
    this.codeStrategyService.getCodeModel(this.codeFormat).subscribe(
      codeStrategy => {
        this.showModel = codeStrategy.showModel;
        this.showCodeModel = true;
      },
      err => {
        this.msg = err;
        this.err = err;
      }
    )
  }

}
