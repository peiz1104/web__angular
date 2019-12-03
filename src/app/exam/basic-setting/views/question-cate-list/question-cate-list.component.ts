import { Component, OnInit, ViewChild } from "@angular/core";
import { FormGroup, FormBuilder } from "@angular/forms";
import { CuiPagination } from "console-ui-ng";
import { Observable } from "rxjs/Observable";
import { Router, ActivatedRoute } from "@angular/router";
import { BasicSettingService } from "app/exam/service/basic-setting.service";
import { TestQuestionService } from "app/exam/service/test-question.service";
import { NzMessageService, NzModalService } from "ng-zorro-antd";
import { AccountService } from "app/account/service/account.service";
import { QuestionCateAddComponent } from "../question-cate-add/question-cate-add.component";

@Component({
    selector: "spk-question-cate-list",
    templateUrl: "./question-cate-list.component.html",
    styleUrls: ["./question-cate-list.component.scss"]
})
export class QuestionCateListComponent implements OnInit {
    @ViewChild(QuestionCateAddComponent)
    questionCateAddComponent: QuestionCateAddComponent;
    columns: any = [
        // knowledgeId
        {
            title: "分类名称",
            data: "qkName",
            styleClass: "text-center",
            style: { "max-width": "100px" }
        },
        {
            title: "分类层级",
            tpl: "pname",
            styleClass: "text-center",
            style: { "max-width": "150px" }
        },
        {
            title: "创建时间",
            tpl: "createdDate",
            styleClass: "text-center",
            style: { "max-width": "100px" }
        },
        { title: "操作", tpl: "option", styleClass: "text-center" }
    ];

    _searchForm: FormGroup;
    nzSpinning: boolean = true;
    selection: any[];
    isAddSite: boolean = false;
    editObj: any; // 是否编辑分类
    selectSiteObj: any; // 选择的部门数据
    pagination: CuiPagination;
    accountInfo: any = {};
    managerGroup: any = {};
    defalutTree: any = [
        {
            id: "",
            label: "全部分类",
            selected: true,
            expanded: true,
            hasChildren: true
        }
    ];
    data: any;
    nodesTree: any = [
        { id: "", label: "全部", selected: true, expanded: true, hasChildren: true }
    ];
    treeConfig: any;
    cateId: number = -1; // 分类id
    constructor(
        private router: Router,
        private fb: FormBuilder,
        private basicSettingService: BasicSettingService,
        private testQuestionService: TestQuestionService,
        private nzMessageService: NzMessageService,
        private confirmServ: NzModalService,
        private accountInfoService: AccountService
    ) { }
    loadData(page?: CuiPagination, param?: object) {
        this.nzSpinning = true;
        this.pagination = page;
        let par = this._searchForm.value["qkName"]
            ? { qkName: this._searchForm.value["qkName"].trim() }
            : {};
        let params = {
            ...this._searchForm.value,
            ...param,
            ...par,
            parentId: this.cateId || -1,
            userGroupId: this.managerGroup && this.managerGroup.id,
            page: page ? page.number : 0,
            size: page ? page.size : 10
        };
        this.basicSettingService.getQuestionKonwledgeData(params).subscribe(
            data => {
                this.pagination = data;
                this.data = data.content;
                this.nzSpinning = false;
                console.log('data', data)
                console.log('managerGroup', this.managerGroup)
            },
            err => {
                this.nzSpinning = false;
            }
        );
    }

    ngOnInit() {
        this._searchForm = this.fb.group({
            qkName: [null]
        });
        this.accountInfoService.findUser().subscribe(user => {
            this.accountInfo = user;
            this.managerGroup = user.managerGroup || {};
            this.inItInfo();
        });
    }
    loadTree() {
        this.nzSpinning = true;
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
            this.loadData();
        } else {
            this.testQuestionService
                .getParentNodes({
                    userGroupId: this.managerGroup && this.managerGroup.id
                })
                .subscribe(nodes => {
                    // 获取父分类api
                    this.nodesTree[0].children = this.formatTreeData(nodes);
                    this.loadData();
                });
        }
    }
    inItInfo() {
        this.nodesTree = [...this.defalutTree];
        this.accountInfoService.findUser().subscribe(
            user => {
                this.accountInfo = user;
                this.managerGroup = user.managerGroup || {};
                if (!user.managerGroup) {
                    this.nzSpinning = false;
                }
                this.loadTree();
            },
            error => {
                this.nzSpinning = false;
            }
        );
        this.treeConfig = {
            async: {
                enable: true,
                loadChildren: (node: any): Observable<any> => {
                    if (!node.id) {
                        return Observable.of(null);
                    }
                    return this.testQuestionService.getChildNodes({ parentId: node.id });
                },
                dataFilter: (tree, node: any) => {
                    let data = [];
                    // tslint:disable-next-line:no-unused-expression
                    tree &&
                        tree.forEach(obj => {
                            // tslint:disable-next-line:max-line-length
                            data.push({
                                id: obj.knowledgeId,
                                selected: obj.knowledgeId == this.cateId,
                                label: obj.qkName,
                                hasChildren: true,
                                parentId: obj.parentId,
                                qkDesc: obj.qkDesc
                            });
                        });
                    return data;
                }
            },
            data: {
                key: {
                    id: "id",
                    qkDesc: "qkDesc",
                    parentId: "parentId",
                    label: "label",
                    children: "children",
                    selected: "selected"
                }
            }
        };
    }
    formatTreeData(tree) {
        let data = [];
        tree.forEach((obj, index) => {
            // tslint:disable-next-line:max-line-length
            data.push({
                id: obj.knowledgeId,
                selected: obj.knowledgeId == this.cateId,
                label: obj.qkName,
                qkDesc: obj.qkDesc,
                parentId: obj.parentId,
                hasChildren: true
            });
        });
        return data;
    }
    _submitForm($event, value) {
        $event.preventDefault();
        this.loadData(null, value);
    }
    // resetForm($event: MouseEvent) {
    //   $event.preventDefault();
    //   this._searchForm.reset();
    //   // tslint:disable-next-line:forin
    //   for (const key in this._searchForm.controls) {
    //     this._searchForm.controls[key].markAsPristine();
    //   }
    // }
    onNodeSelect(groupuserGroupId) {
        this.cateId =
            (groupuserGroupId.node.data && groupuserGroupId.node.data.id) || 0;
        // 由于全部的分类id未空 无法取值 故取消id非空判断
        // if (this.cateId) {
        this.selectSiteObj = groupuserGroupId.node.data;
        // console.log("点击:", groupuserGroupId);
        // }
        if (this.questionCateAddComponent && this.editObj) {
            this.questionCateAddComponent.qianyi();
        }
        if (this.managerGroup && this.managerGroup.id) {
            this.loadData();
        }
    }
    // 添加分类/取消
    handleaddSite(row?: any) {
        if (JSON.stringify(this.managerGroup) == "{}") {
            this.nzMessageService.info('请选择组织机构!');
        } else {
            this.editObj = !!row;
            if (row) {
                this.selectSiteObj = {
                    ...row,
                    id: row && row.knowledgeId,
                    label: row && row.qkName
                };
            }
            this.isAddSite = !this.isAddSite;
            if (!this.isAddSite) {
                this.loadTree();
            }
        }
    }
    // 删除分类
    deleteKnowled(id) {
        this.confirmServ.confirm({
            title: "是否确认删除？",
            content: "",
            zIndex: 1003,
            onOk: () => {
                this.nzSpinning = true;
                this.basicSettingService.delete(id).subscribe(
                    data => {
                        this.nzMessageService.success("删除成功!");
                        // this.inItInfo();
                        this.loadTree();
                    },
                    err => {
                        this.nzMessageService.error(err);
                        this.nzSpinning = false;
                    }
                );
            },
            onCancel() { }
        });
    }
    logSelectGroup(e) {
        console.log('e', e)
        this.managerGroup = e || {};
        this.nodesTree[0].children = [];
        this.cateId = -1;
        this.loadTree();
    }
}
