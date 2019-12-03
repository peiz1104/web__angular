import { CategoryGroupService } from './../../service/category-group.service';
import { CategoryGroup } from './../../entity/category-group';
import { CategoryService } from './../../service/category.service';
import { CuiTreeNode, CuiTreeConfig, TreeComponent } from 'console-ui-ng';
import { Component, OnInit, Output, EventEmitter, Input, OnChanges, ViewChild } from '@angular/core';
import { Observable } from "rxjs/Observable";
import {tipMessage} from "app/account/entity/message-tip";

@Component({
  selector: 'spk-category-tree',
  templateUrl: './category-tree.component.html',
  styleUrls: ['./category-tree.component.scss']
})
export class CategoryTreeComponent implements OnInit, OnChanges {

  @Output() selectionChange = new EventEmitter();
  categoryGroup: CategoryGroup;
  // categoryGroup
  @Input() identifier;
  categories;
  roots;
  config: CuiTreeConfig;

  @ViewChild('tree') tree: TreeComponent;

  constructor(
    private categoryService: CategoryService,
    private categoryGroupService: CategoryGroupService,
  ) { }

  initConfig() {
    this.config = {
      async: {
        enable: true,
        loadChildren: (node: CuiTreeNode): Observable<any> => {
          return this.categoryService.getAll({parentId: (node.data.id == 0 ? '' : node.data.id), identifier: this.identifier}).catch(() => {
            tipMessage('树加载失败','warning');
            return Observable.of(null);
          });
        },
        dataFilter: (data, node: CuiTreeNode) => {
          if (!node.parent && node.data.virtual) {
            if (data && data.length > 0) {
              data[0]['selected'] = true;
              // data[0]['expanded'] = true;
            }
          }
          return data;
        }
      },
      data: {
        key: {
          id: 'id',
          label: 'name',
          children: 'children'
        }
      }
    };
  }
  ngOnChanges() {
    // console.log('identifier', this.identifier);
    this.categoryGroupService.getByIdentifier(this.identifier).subscribe(
      obj => {
        this.categoryGroup = obj;
        this.roots = [{ id: 0, name: this.categoryGroup.name, selected: true, expanded: true, hasChildren: true }];
        if (this.config) {
          this.config = null;
        }
        this.initConfig();
        // console.log('config', this.config);
      },
      err => {
        console.log('查找分类分组失败');
      }
    );
  }
  ngOnInit() {
  }

  onSelectionChange(selection) {
    console.log(selection)
    let datas = selection.map(it => {
      let data = it.data;
      if (data.id == 0) {
        return {...data, ...{id: ''}};
      } else {
        return data;
      }
    });
    this.selectionChange.emit(datas);
  }

  public refresh(cate, isRate: boolean = true) {
    let node: CuiTreeNode = (cate && this.tree.getNodeById(cate.id)) || this.tree.getNodeById(0);
    this.tree.refresh(node, isRate ? 'rate' : 'children');
  }
}
