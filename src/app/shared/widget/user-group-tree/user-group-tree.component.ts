import { Observable } from 'rxjs/Observable';
import { CuiTreeConfig, CuiTreeNode, TreeComponent } from 'console-ui-ng';
import { OrgTreeApiService } from 'app/shared/api';
import { Component, OnInit, Output, EventEmitter, Input, ViewChild, ContentChild, TemplateRef } from '@angular/core';

@Component({
  selector: 'spk-user-group-tree',
  templateUrl: './user-group-tree.component.html',
  styleUrls: ['./user-group-tree.component.scss']
})
export class UserGroupTreeComponent implements OnInit {
  @Output() selectionChange = new EventEmitter();

  // 参数： 模式（单选/多选）、控件类型(下拉、弹框、嵌入)、权限描述、数据订阅、表单绑定、传递属性
  // 显示属性、值属性， treeConfig，

  @Input() mode: 'single' | 'multiple' = 'single';
  @Input() expandedMode: 'tree' | 'flat' = 'tree';
  @Input() dataSource: Observable<any>;
  // @Input() 传递属性
  @Input() valueProperty: string; // 或者是一个function
  @Input() labelProperty: string;
  @Input() treeConfig: any;
  @Input() objectCompare: any; // function call(a, b): boolean;
  @Input() permission: string[] | string = ['SYSTEM:USER_GROUP:VIEW'];
  @Input() isRegion: boolean = false; // true 时查询 总-省-地市，false 查全部
  @Input() showSubSite: boolean = false;

  @ViewChild('tree') tree: TreeComponent;

  @ContentChild('echoTpl') echoTpl: TemplateRef<any>;

  roots;
  // 自定义模板

  // ngBinding
  _value: any[]; // 单个值、单个对象、值数组、对象数组
  isDisabled: boolean;

  _defaultTreeConfig: CuiTreeConfig;

  expanded: boolean = false;
  treeSelection: CuiTreeNode[] = [];

  ugSearchText;
  ugSearchResult: any; // Pagination<UserGroup>;
  freeSelection: any[] = [];

  selection: any[] = [];

  constructor(private orgTreeApi: OrgTreeApiService) { }

  ngOnInit() {
    this._initConfig();
  }

  _initConfig() {
    this._defaultTreeConfig = {
      async: {
        enable: true,
        loadChildren: (node: CuiTreeNode): Observable<any> => {
          return this.orgTreeApi.orgTree(node.data.id, this.permission, this.isRegion);
        },
        dataFilter: (data, node: CuiTreeNode) => {
          if (!node.parent && node.data.virtual) {
            if (data && data.length > 0) {
              data[0]['selected'] = true;
              if (data.length == 1) {
                data[0]['expanded'] = true;
              }
              // TODO: acitve value with path
            }
          } else {
            if (!this.showSubSite) {
              data = data.filter(it => it.type !== 'SITE');
            }
          }
          // console.log(node);
          if (this.isSelected(node) && this.isMultiple) {
            data.forEach(it => it['disabled'] = true);
          }

          data.forEach(it => {
            if (this.isInFreeSelect(it)) {
              it['selected'] = true;
              this.removeFromFreeSelect(it);
            }

            if (it.type == 'SITE') {
              it.icon = 'fa-sitemap text-secondary';
            }
          });
          return data;
        }
      },
      data: {
        key: {
          id: this.valueProperty || 'id',
          label: this.labelProperty || 'name',
          children: 'children'
        }
      }
    };
  }

  get isSingle() {
    return this.mode != 'multiple';
  }

  get isMultiple() {
    return this.mode == 'multiple';
  }

  clearSelection() {
    this.tree.selection = [];
    this.selection = [];
    this.freeSelection = [];
    this.treeSelection = [];
    this._value = [];
  }

  // onSelectionChange(value: CuiTreeNode[]) {
  //   this.treeSelection = value;
  // }
  getTreeSelection() {
    return this.tree.selection;
  }

  mergeSelection(latest?) {
    let treeSel = this.treeSelection.filter(it => !it.disabled).map(it => it.data);

    // this._value = [...treeSel, ...this.freeSelection];
    let allSel = [...treeSel, ...this.freeSelection];
    // console.log(this._value);
    this._value = allSel;

    if (this.isSingle) {
      this._value = latest ? [latest] : (this._value ? this._value.slice(0, 1) : []);
      this.onSelectionChange(this._value && this._value.length > 0 ? this._value[0] : null);
    } else {
      this.onSelectionChange(this._value);
    }
    // this.onChange(this._value); // 兼容以前的写法，暂时都返回数组
  }

  onNodeSelect(e) {
    // console.log('onNodeSelect', e.node);
    this.treeSelection = this.getTreeSelection();
    this.propagateDisabled(e.node, true);
    this.mergeSelection(e.node.data);
  }

  onNodeUnselect(e) {
    // console.log('unselect', e.node);
    this.treeSelection = this.getTreeSelection();
    this.propagateDisabled(e.node, false);
    this.mergeSelection(e.node.data);
  }

  propagateDisabled(node: CuiTreeNode, disabled: boolean) {
    if (!this.isMultiple) {
      return;
    }
    if (node.children && node.children.length > 0) {
      for (let child of node.children) {
        child.disabled = disabled;
        if (!this.isSelected(child)) {
          this.propagateDisabled(child, disabled);
        }
      }
    }
  }

  isSelected(node: CuiTreeNode) {
    return this.tree.isSelected(node);
  }

  unselect(ug) {
    this.freeSelection = this.freeSelection.filter(it => it.id != ug.id);

    this.treeSelection = this.treeSelection.filter(it => it.id != ug.id);
    this.tree.selection = this.treeSelection;
    this.mergeSelection();
  }

  onUserGroupSearch(searchText) {
    if (searchText) {
      this.orgTreeApi.search(searchText, 0, 20, this.permission, this.isRegion).subscribe(
        ugs => {
          console.log(ugs)
          this.ugSearchResult = ugs;
        }
      )
    } else {
      this.ugSearchResult = null;
    }
  }

  onFreeSelect(ug) {
    console.log('onFreeSelect', ug)
    let node = this.tree.getNodeById(ug.id);
    console.log(node);
    if (node) {
      this.tree.selectNode(node);
    } else {
      this.freeSelection = this.freeSelection ? [...this.freeSelection, ug] : [ug];
      this.mergeSelection(ug);
    }
  }

  isInFreeSelect(ug): boolean {
    return this.freeSelection.some(it => it.id == ug.id);
  }

  addToFreeSelect(ug) {
    this.freeSelection = this.freeSelection ? [...this.freeSelection, ug] : [ug];
  }

  removeFromFreeSelect(ug) {
    this.freeSelection = this.freeSelection.filter(it => it.id != ug.id);
  }

  onSelectionChange(selection) {
    // let datas = selection.map(it => it.data);
    // this.selectionChange.emit(datas);

    this.selectionChange.emit(selection);
  }

  public refresh(ug, isRate: boolean = true) {
    let node;
    if (ug) {
      node = this.tree.getNodeById(ug.id);
    }
    if (node) {
      this.tree.refresh(node, isRate ? 'rate' : 'children');
    }
  }
}
