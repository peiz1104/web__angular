import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CertTypeService } from 'app/system/cert-type/service/cert-type.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { CertType } from 'app/system/cert-type/entity/cert-type';
import { Item } from 'app/system/cert-type/entity/item';
import { NzMessageModule, NzMessageService } from 'ng-zorro-antd';
import { tipMessage } from 'app/account/entity/message-tip';

@Component({
  selector: 'spk-cert-type-form',
  templateUrl: './cert-type-form.component.html',
  styleUrls: ['./cert-type-form.component.scss']
})
export class CertTypeFormComponent implements OnInit {

  @Input() certType: CertType;
  @Input() loading: boolean;
  @Output() doSubmit: EventEmitter<any> = new EventEmitter();
  @Output() cancel: EventEmitter<any> = new EventEmitter();

  tags: Item[] = [];
  isVisible = false;
  item: Item = new Item;
  constructor(
    private certTypeService: CertTypeService,
    private route: ActivatedRoute,
    private message: NzMessageService
    ) { }

  ngOnInit() {
    if (this.certType.id) {
      this.certType.items.forEach(item => {
        this.tags.push(item);
      });
    }
  }

  onSubmit(event: Event) {
    console.log(this.tags);
    if(this.tags.length == 0) {
      tipMessage('属性不能为空', 'info');
      return;
    }
    let items = [];
    this.tags.forEach(e => {
      items.push(e);
      this.certType.items = items;
    });
    console.log(this.certType);
    this.doSubmit.emit(this.certType);
  }

  doCancel(event) {
    this.cancel.emit({ originalEvent: event });
  }

  handleClose(removedTag: any): void {
    this.tags = this.tags.filter(tag => tag !== removedTag);
  }
  addTag(){
    this.item = new Item;
    this.isVisible = true;
  }
  handleOk (event){
    console.log(this.item)
    if(!this.item.name){
      tipMessage('发布获奖作品成功', 'info');
      return;
    }
    if(!this.item.identifier){
      tipMessage('标识不能为空', 'info');
      return;
    }
    this.tags.push(this.item);
    this.isVisible = false;
  }
  handleCancel(event) {
    this.isVisible  = false;
  }
}
