import { MaterialFormComponent } from './../material-form/material-form.component';
import { Material } from './../../entity/material';
import { NzMessageService, NzModalSubject } from 'ng-zorro-antd';
import { MaterialService } from './../../service/material.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { tipMessage } from 'app/account/entity/message-tip';

@Component({
  templateUrl: './material-edit.component.html',
  styleUrls: ['./material-edit.component.scss']
})
export class MaterialEditComponent implements OnInit {
  @Input() materialGroupId;
  @Input() material: Material;
  loading: boolean = false;

  @ViewChild(MaterialFormComponent) mf: MaterialFormComponent;

  constructor(
    private materialService: MaterialService,
    private message: NzMessageService,
    private subject: NzModalSubject
  ) { }

  ngOnInit() {
  }

  onSave(event: { originalEvent: any, data: Material, next: boolean }) {
    this.loading = true;
    this.materialService.update(this.materialGroupId, event.data, this.material.id).subscribe(
      ok => {
        this.loading = false;
        tipMessage('编辑资料成功', 'success');
        this.subject.destroy('onOk');
      },
      err => {
        this.loading = false;
        tipMessage(`编辑资料失败${err}`);
      }
    );
  }

  onCancel(event: { originalEvent: any }) {
    this.subject.destroy('onCancel');
  }

}
