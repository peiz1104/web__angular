import { Component, OnInit, Input } from "@angular/core";
import { TestQuestionService } from "app/exam/service/test-question.service";
import { Observable } from "rxjs/Observable";
import { AccountService } from "app/account/service/account.service";
import { NzMessageService } from "ng-zorro-antd";

@Component({
  selector: "spk-test-migration",
  templateUrl: "./test-migration.component.html",
  styleUrls: ["./test-migration.component.scss"]
})
export class TestMigrationComponent implements OnInit {
  nodesTree: any = [
    { id: "", label: "全部", selected: true, expanded: true, hasChildren: true }
  ]; // 分类树数据
  treeConfig: any; // 树组件异步加载子数据配置
  konwId: any; // 当前选择分类树id
  managerGroup: any = [];
  accountInfo: any = {};
  @Input() selection: any[];
  constructor(
    private testQuestionService: TestQuestionService,
    private accountInfoService: AccountService,
    private nzMessageService: NzMessageService
  ) {}

  ngOnInit() {
    this.initInfo();
  }
  formatTreeData(tree) {
    // 格式化父分类树数据
    let data = [];
    tree.forEach((obj, index) => {
      data.push({ id: obj.knowledgeId, label: obj.qkName, hasChildren: true });
    });
    return data;
  }
  loadTree() {
    if (!this.managerGroup || !this.managerGroup.id) {
      this.nodesTree = [
        {
          id: "",
          label: "全部",
          selected: true,
          expanded: true,
          hasChildren: true
        }
      ];
    } else {
      this.testQuestionService
        .getParentNodes({
          userGroupId: this.managerGroup && this.managerGroup.id
        })
        .subscribe(nodes => {
          // 获取父分类api
          this.nodesTree[0].children = this.formatTreeData(nodes);
        });
    }
  }
  initInfo() {
    this.accountInfoService.findUser().subscribe(user => {
      this.accountInfo = user;
      this.managerGroup = user.managerGroup;
      this.loadTree();
    });
    this.treeConfig = {
      async: {
        enable: true,
        loadChildren: (node: any): Observable<any> => {
          // 异步加载子分类数据
          if (!node.id) {
            // id为空不加载子数据
            return Observable.of(null);
          }
          return this.testQuestionService.getChildNodes({ parentId: node.id }); // 获取子分类api
        },
        dataFilter: (tree, node: any) => {
          // 渲染加载的子分类数据
          let data = [];
          // tslint:disable-next-line:no-unused-expression
          tree &&
            tree.forEach(obj => {
              data.push({
                id: obj.knowledgeId,
                label: obj.qkName,
                hasChildren: true
              });
            });
          console.log("当前组织机构:", tree, data);
          return data;
        }
      },
      data: {
        // 获取数据 key对象的value值为获取数据api里面的属性名
        key: {
          id: "id",
          label: "label",
          children: "children"
        }
      }
    };
  }
  submit(call, errorback) {
    let ids = [];
    this.selection.forEach(item => {
      ids.push(item.queId);
    });
    if (!this.managerGroup || !this.managerGroup.id) {
      this.nzMessageService.error("请选择组织机构!");
      errorback();
      return;
    }
    if (!this.konwId) {
      this.nzMessageService.error("请选择试题分类!");
      errorback();
      return;
    }
    if (ids.length == 0) {
      this.nzMessageService.error("请选择试题!");
      errorback();
      return;
    }
    let params = {
      ids: ids,
      userGroupId: this.managerGroup.id,
      knowledgeId: this.konwId
    };
    this.testQuestionService.migration(params).subscribe(
      data => {
        this.nzMessageService.success("迁移成功!");
        call();
      },
      error => {
        this.nzMessageService.error(error);
        errorback();
      }
    );
  }
  onNodeSelect(e) {
    // 树组件选择事件，获取当前选择树节点id
    this.konwId = e.node.id;
  }
  onNodeUnselect(e) {
    console.log("onNodeUnselect：", e.node);
  }
  logSelectGroup(e) {
    this.managerGroup = e || {};
    this.nodesTree[0].children = [];
    this.loadTree();
    // this.initInfo();
  }
}
