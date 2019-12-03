import { Component, OnInit, Input } from '@angular/core';
import { Rco } from '../../entity/rco';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NzModalSubject, NzMessageService } from 'ng-zorro-antd';
import { RcoService } from '../../service/rco.service';
import { tipMessage } from 'app/account/entity/message-tip';

@Component({
  selector: 'spk-rco-item-edit',
  templateUrl: './rco-item-edit.component.html',
  styleUrls: ['./rco-item-edit.component.scss']
})
export class RcoItemEditComponent implements OnInit {

  @Input() rco: Rco;

  _form: FormGroup;
  submiting;

  get linkEditable() {
    if (this.rco) {
      return ['AUTO', 'LIVE'].some(it => it == this.rco.trackingType);
    }
  }

  constructor(private subject: NzModalSubject, private fb: FormBuilder,
    private rcoApi: RcoService, private message: NzMessageService) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    let m = this.rco;
    this._form = this.fb.group({
      title: [m.title, Validators.required],
      startingUrl: [m.startingUrl], // TODO: 校验链接是否可用，不可用时，警告，再点确定可以提交
      description: [m.description],
      trackingType: [m.trackingType]
    });

    // if (!['AUTO', 'LIVE'].some(it => it == m.trackingType)) {
    //   this._form.controls['startingUrl'].disable();
    // }
  }

  onOk(event) {
    if (this._form.invalid) {
      tipMessage('表单填写错误');
      return;
    }

    let value = this._form.value;
    value['id'] = this.rco.id;
    this.submiting = true;
    this.rcoApi.save(value).subscribe(
      rco => {
        tipMessage('操作成功', 'success');
        this.submiting = false;
        this.subject.next({code: 'editOk', newRco: rco});
        this.subject.destroy('onOk');
      },
      err => {
        tipMessage(`操作失败 ${err}`);
        this.submiting = false;
      }
    );
  }

  onCancel(event) {
    this.subject.destroy('onCancel');
  }

}
