import { MaterialFormComponent } from '../material-form/material-form.component';
import { NzMessageService, NzModalSubject } from 'ng-zorro-antd';
import { MaterialService } from './../../service/material.service';
import { Material } from './../../entity/material';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { tipMessage } from 'app/account/entity/message-tip';

@Component({
  templateUrl: './material-add.component.html',
  styleUrls: ['./material-add.component.scss']
})
export class MaterialAddComponent implements OnInit {
  @Input() materialGroupId;

  @ViewChild(MaterialFormComponent) mf: MaterialFormComponent;

  loading: boolean = false;
  _completeTotal = 0;

  constructor(
    private materialService: MaterialService,
    private message: NzMessageService,
    private subject: NzModalSubject
  ) { }

  ngOnInit() {
  }

  onSave(event: { originalEvent: any, data: Material, next: boolean }) {
    this.loading = true;
    // save
    this.materialService.create(this.materialGroupId, event.data).subscribe(
      ok => {
        this.loading = false;
        tipMessage('添加资料成功', 'success');
        if (event.next) {
          // clean form
          this.mf.initForm();
          this._completeTotal++;
        } else {
          this.subject.destroy('onOk');
        }
      },
      err => {
        this.loading = false;
        tipMessage(`添加资料失败${err}或未选择文件`);
      }
    );
  }

  onCancel(event: { originalEvent: any }) {
    if (this._completeTotal > 0) {
      this.subject.destroy('onOk');
    }
    this.subject.destroy('onCancel');
  }
}
