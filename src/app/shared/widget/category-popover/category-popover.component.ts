import { Category } from './../../../system/category/entity/category';
import { Component, OnInit, Input, ContentChild, TemplateRef } from '@angular/core';


@Component({
  selector: 'spk-category-popover',
  templateUrl: './category-popover.component.html',
  styleUrls: ['./category-popover.component.scss']
})
export class CategoryPopoverComponent implements OnInit {

  @Input() category: Category;
  @Input() styleClass: any;
  @Input() @ContentChild("echoTpl") echoTpl: TemplateRef<any>;

  @Input() placement: 'top' | 'left' | 'right' | 'bottom' | 'topLeft' | 'topRight' |
    'bottomLef' | 'tbottomRight' | 'leftTop' | 'leftBottom' | 'rightTop' | 'rightBottom' = 'right';
  @Input() trigger: 'hover' | 'focus' | 'click' = 'hover';

  constructor() { }

  ngOnInit() {
  }

  get pathDisplay() {
    let path = this.getPathInfo(this.category, '');
    return path;
  }

  getPathInfo(category: Category, path: string) {
    if (category.parent) {
      let info = this.getPathInfo(category.parent, path);
      path = info + '/' + category.name
    } else {
      path = category.name;
    }
    return path;
  }
}
