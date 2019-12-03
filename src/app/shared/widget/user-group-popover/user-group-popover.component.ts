import { Component, OnInit, Input, ContentChild, TemplateRef } from '@angular/core';
import { UserGroup } from 'app/system/entity/user-group';

@Component({
  selector: 'spk-user-group-popover',
  templateUrl: './user-group-popover.component.html',
  styleUrls: ['./user-group-popover.component.scss']
})
export class UserGroupPopoverComponent implements OnInit {

  @Input() userGroup: UserGroup;
  @Input() styleClass: any;
  @Input() @ContentChild("echoTpl") echoTpl: TemplateRef<any>;

  @Input() placement: 'top' | 'left' | 'right' | 'bottom' | 'topLeft' | 'topRight' |
      'bottomLef' | 'tbottomRight' | 'leftTop' | 'leftBottom' | 'rightTop' | 'rightBottom' = 'right';
  @Input() trigger: 'hover' | 'focus' | 'click' = 'hover';

  constructor() { }

  ngOnInit() {
  }

  get namePathDisplay() {
    if (this.userGroup && this.userGroup.namePath) {
      return this.userGroup.namePath.split(',').join(' / ');
    }
  }
  getNamePath(value) {
    if (this.userGroup && this.userGroup.namePath) {
      return this.userGroup.namePath.split(',').join(' / ');
    }
  }
}
