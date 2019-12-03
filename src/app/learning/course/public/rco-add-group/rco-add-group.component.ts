import { Component, OnInit, Input } from '@angular/core';
import { Rco } from '../../entity/rco';
import { FormGroup, FormBuilder } from '@angular/forms';
import { NzModalSubject, NzMessageService } from 'ng-zorro-antd';
import { RcoService } from '../../service/rco.service';
import { tipMessage } from 'app/account/entity/message-tip';

@Component({
  selector: 'spk-rco-add-group',
  templateUrl: './rco-add-group.component.html',
  styleUrls: ['./rco-add-group.component.scss']
})
export class RcoAddGroupComponent implements OnInit {

  @Input() parent: Rco;

  _form: FormGroup;
  submiting;

  constructor(private subject: NzModalSubject, private fb: FormBuilder,
    private rcoApi: RcoService, private message: NzMessageService) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this._form = this.fb.group({
      title: [],
      description: []
    });
  }

  onOk(event) {
    if (this._form.invalid) {
      tipMessage('表单填写错误');
      return;
    }

    let value = this._form.value;
    if (this.parent) {
      value['parent'] = {id: this.parent.id};
    }
    value['trackingType'] = 'AUTO';
    value['contentType'] = 'TOPIC_GROUP';
    this.submiting = true;
    this.rcoApi.save(value).subscribe(
      rco => {
        tipMessage('操作成功', 'success');
        this.submiting = false;
        this.subject.next({code: 'addOk', rco: rco});
        this.subject.destroy('onOk');
      },
      err => {
        tipMessage('操作失败');
        this.submiting = false;
      }
    );
  }

  onCancel(event) {
    this.subject.destroy('onCancel');
  }
}
