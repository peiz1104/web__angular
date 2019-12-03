/*
 * @Author: mozhengqian
 * @Date: 2017-11-01 17:52:07
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2017-12-07 11:17:25
 */
import { Component, OnInit, ViewChild } from "@angular/core";
import { FormGroup, FormBuilder, FormControl } from "@angular/forms";
import { TestQuestionService } from "app/exam/service/test-question.service";
import { Pagination } from "app/core/entity/pagination";
import { Observable } from "rxjs/Observable";
import { Router, ActivatedRoute } from "@angular/router";
import { AccountService } from "app/account/service/account.service";
import { NzMessageService, NzModalService } from "ng-zorro-antd";
import { TestUploadComponent } from "../test-upload/test-upload.component";
import { TestMigrationComponent } from "../test-migration/test-migration.component";
import * as moment from "moment";
@Component({
    selector: "spk-test-list",
    templateUrl: "./test-list.component.html",
    styleUrls: ["./test-list.component.scss"]
})
export class TestListComponent implements OnInit {
    @ViewChild(TestMigrationComponent)
    private testMigrationComponent: TestMigrationComponent;
    accountInfo: any = {};
    managerGroup: any = [];
    columns: any = [
        // knowledgeId
        {
            title: "题干",
            tpl: "casual",
            styleClass: "text-center",
            style: { "max-width": "150px" }
        },
        {
            title: "试题类型",
            data: "typeName",
            styleClass: "text-center",
            style: { "max-width": "80px" }
        },
        {
            title: "试题难度",
            data: "diffName",
            styleClass: "text-center",
            style: { "max-width": "80px" }
        },
        {
            title: "试题分类",
            data: "konwName",
            styleClass: "text-center",
            style: { "max-width": "80px" }
        },
        {
            title: "创建时间",
            tpl: "createdDate",
            styleClass: "text-center",
            style: { "max-width": "120px" }
        },
        {
            title: "有效时间",
            tpl: "yxTime",
            styleClass: "text-center",
            style: { "max-width": "240px" }
        },
        {
            title: "创建人",
            tpl: "userName",
            styleClass: "text-center",
            style: { "max-width": "80px" }
        },
        { title: "操作", tpl: "option", styleClass: "text-center" }
    ];
    _searchForm: FormGroup; // 查询表单
    testListData: any; // 列表数据
    modalVisible: boolean = false;
    modalVisible2: boolean = false;
    selection: any[]; // table 选择数据
    _selectTreeId: any; // 当前选择分类树id
    selectTreeObj: any; // 当前选择的树
    defalutTree: any = [
        {
            id: "",
            label: "全部分类",
            selected: true,
            expanded: true,
            hasChildren: true
        }
    ];
    nodesTree: any = this.defalutTree; // 分类树数据
    treeConfig: any; // 树组件异步加载子数据配置
    nzSpinning: boolean = true;
    difficult: any; // 难度下拉数据
    isupload: boolean = false; // 是否导入
    migrationLoading: boolean = false; // 迁移确定按钮loading
    questionType: any;
    exportType: string; // 导出类型
    ids: any; // 预览ids
    knowledgeId: string = ""; // 试题分类id
    userGroupId: any; // 组织机构id
    @ViewChild(TestUploadComponent)
    private testUploadComponent: TestUploadComponent;
    get selectTreeId() {
        return this._selectTreeId;
    }

    set selectTreeId(v) {
        this._selectTreeId = v;
    }
    constructor(
        private router: Router,
        private fb: FormBuilder,
        private testQuestionService: TestQuestionService,
        private accountInfoService: AccountService,
        private confirmServ: NzModalService,
        private activatedRoute: ActivatedRoute,
        private nzMessageService: NzMessageService
    ) { }
    loadData(page?: Pagination<any>, param?: any) {
        // table组件加载列表数据
        let params = {
            ...this._searchForm.value,
            ...param,
            knowledgeId:
                this.managerGroup && this.managerGroup.id && this.selectTreeId,
            userGroupId: this.managerGroup && this.managerGroup.id
        };
        this.nzSpinning = true;
        this.testQuestionService
            .getTestListData(params, page)
            .subscribe(testListData => {
                this.testListData = testListData;
                this.nzSpinning = false;
                this.selection = [];
            });
    }
    ngOnInit() {
        this.userGroupId = this.activatedRoute.snapshot.params["userGroupId"];
        this.knowledgeId = this.activatedRoute.snapshot.params["knowledgeId"];
        this.initInfo();
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
            console.log("this.managerGroup.id:", !this.managerGroup.id, !null);
            this.testQuestionService
                .getParentNodes({ userGroupId: this.managerGroup.id })
                .subscribe(nodes => {
                    // 获取父分类api
                    this.nodesTree[0].children = this.formatTreeData(nodes);
                    this.loadData();
                });
        }
    }
    checkDate = (type, control: FormControl): any => {
        let startTime =
            this._searchForm &&
            this._searchForm.controls["createStartTime"] &&
            this._searchForm.controls["createStartTime"].value;
        let endTime =
            this._searchForm &&
            this._searchForm.controls["createEndTime"] &&
            this._searchForm.controls["createEndTime"].value;
        let that = this;
        return Observable.create(function (observer) {
            if (startTime && endTime) {
                if (
                    moment(endTime)
                        .format("YYYY-MM-DD")
                        .valueOf() <
                    moment(startTime)
                        .format("YYYY-MM-DD")
                        .valueOf()
                ) {
                    that.nzMessageService.error("结束时间必须大于开始时间");
                    if (type == 1) {
                        // 输入的开始时间
                        that._searchForm.get(`createEndTime`).setValue(null);
                    } else {
                        that._searchForm.get(`createStartTime`).setValue(null);
                    }
                }
            }
            observer.next(null);
            observer.complete();
        });
    };
    initInfo() {
        this.nodesTree = [...this.defalutTree];
        if (this.selectTreeId || this.knowledgeId) {
            this.nodesTree[0].selected = false;
        }
        this.accountInfoService.findUser().subscribe(
            user => {
                this.accountInfo = user;
                const group = JSON.parse(localStorage.getItem("exam-test-group"));
                if (group && this.userGroupId && this.userGroupId == group.id) {
                    this.managerGroup = group;
                } else {
                    this.managerGroup = user.managerGroup;
                    if (!user.managerGroup) {
                        this.nzSpinning = false;
                    }
                }
                this.loadTree();
            },
            error => {
                this.nzSpinning = false;
            }
        );
        this.testQuestionService.getDifficulty().subscribe(data => {
            this.difficult = data;
            // tslint:disable-next-line:no-unused-expression
            // this._searchForm && this._searchForm.get(`diffCode`).setValue(data[0].diffCode);
        });
        this.testQuestionService.getQuestionType().subscribe(data => {
            this.questionType = data;
            // tslint:disable-next-line:no-unused-expression
            // this._searchForm && this._searchForm.get(`typeCode`).setValue(data[0].baseCode);
        });
        this._searchForm = this.fb.group({
            // 查询表单初始化
            casual: [null],
            typeCode: [null],
            createStartTime: [null, [], this.checkDate.bind(null, 1)],
            createEndTime: [null, [], this.checkDate.bind(null, 2)],
            diffCode: [null],
            lastModifiedDate: [null]
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
                    let selectId = this.selectTreeId || this.knowledgeId || "";
                    // tslint:disable-next-line:no-unused-expression
                    tree &&
                        tree.forEach(obj => {
                            data.push({
                                id: obj.knowledgeId,
                                selected: obj.knowledgeId == selectId,
                                label: obj.qkName,
                                hasChildren: true
                            });
                        });
                    return data;
                }
            },
            data: {
                // 获取数据 key对象的value值为获取数据api里面的属性名
                key: {
                    id: "id",
                    label: "label",
                    selected: "selected",
                    children: "children"
                }
            }
        };
    }
    _submitForm($event, value) {
        // 查询表单提交
        $event.preventDefault();
        value.createStartTime =
            value.createStartTime &&
            moment(value.createStartTime).format("YYYY-MM-DD");
        value.createEndTime =
            value.createEndTime && moment(value.createEndTime).format("YYYY-MM-DD");
        this.loadData(null, value);
    }
    resetForm($event: MouseEvent) {
        // 重置查询表单
        $event.preventDefault();
        this._searchForm.reset();
        // tslint:disable-next-line:forin
        for (const key in this._searchForm.controls) {
            this._searchForm.controls[key].markAsPristine();
        }
    }
    formatTreeData(tree) {
        // 格式化父分类树数据
        let data = [];
        let selectId = this.selectTreeId || this.knowledgeId || "";
        tree.forEach((obj, index) => {
            data.push({
                id: obj.knowledgeId,
                selected: obj.knowledgeId == selectId,
                label: obj.qkName,
                hasChildren: true
            });
        });
        return data;
    }
    onNodeSelect(e) {
        // 树组件选择事件，获取当前选择树节点id
        this.selectTreeId = e.node.id;
        this.selectTreeObj = e.node;
        if (this.managerGroup && this.managerGroup.id) {
            this.loadData();
        }
    }
    onNodeUnselect(e) {
        console.log("onNodeUnselect：", e.node);
    }
    goLibrary() {
        // 跳转试题分类页
        if (!this.selectTreeId) {
            this.nzMessageService.info("请选择分类进行新建!");
            return;
        }
        this.router.navigate([
            `/exam/test-question/library`,
            {
                userGroupId: this.managerGroup && this.managerGroup.id,
                knowledgeId: this.selectTreeId ? this.selectTreeId : ""
            }
        ]);
    }
    // 批量删除
    deleteSelect() {
        if (!this.selection || this.selection.length == 0) {
            this.nzMessageService.error("请选择试题!");
            return;
        }
        let ids = [];
        this.selection.forEach(item => {
            ids.push(item.queId);
        });
        this.deleteTest(ids);
    }
    deleteTest(id) {
        // 删除试题
        this.confirmServ.confirm({
            title: "是否确认删除？",
            content: "",
            zIndex: 1003,
            onOk: () => {
                this.nzSpinning = true;
                this.testQuestionService
                    .questionDelete({ ids: id, isChild: false })
                    .subscribe(
                    item => {
                        this.loadData();
                        this.nzMessageService.success("删除成功!");
                    },
                    error => {
                        this.nzSpinning = false;
                        this.nzMessageService.error(error);
                    }
                    );
            },
            onCancel() { }
        });
    }
    toHis() {
        // 跳转修改历史页面
        if (!this.selection || this.selection.length == 0) {
            this.nzMessageService.error("请选择试题!");
            return;
        }
        let ids = [];
        this.selection.forEach(item => {
            ids.push(item.queId);
        });
        this.router.navigate([
            `/exam/test-question/his`,
            {
                ids: ids
            }
        ]);
    }
    editTest(data) {
        // 编辑试题
        let obj = {
            knowledgeId: this.selectTreeId ? this.selectTreeId : "",
            userGroupId: this.managerGroup && this.managerGroup.id,
            url: "list",
            typeName: data.typeName
        };
        this.router.navigate([`/exam/test-question/edit/${data.queId}`, obj]);
    }
    // 导出选中试题
    exportSelect(type?) {
        if (!this.selection || this.selection.length == 0) {
            this.nzMessageService.error("请选择试题!");
            return;
        }
        this.exportType = type;
        setTimeout(() => {
            document.forms["exportForm"].submit();
        }, 0);
    }
    getIds = (id?) => {
        let ids = [];
        if (id) {
            return [id];
        }
        (this.selection || []).forEach((obj, index) => {
            ids.push(obj.queId);
        });
        return ids;
    };
    changeModal = (id?) => {
        if (
            (!this.selection || this.selection.length == 0) &&
            !id &&
            !this.modalVisible
        ) {
            this.nzMessageService.error("请选择试题!");
            return;
        }
        this.modalVisible = !this.modalVisible;
        if (this.modalVisible) {
            this.ids = {
                ids: this.getIds(id)
            };
        } else {
            this.ids = null;
        }
    };
    changeModal2 = (flag?) => {
        if (
            (!this.selection || this.selection.length == 0) &&
            !this.modalVisible2
        ) {
            this.nzMessageService.error("请选择试题!");
            return;
        }
        this.modalVisible2 = !this.modalVisible2;
        if (!this.modalVisible2 && !flag) {
            this.loadData();
        }
    };
    importTest() {
        // this.router.navigate([`exam/test-question/import`]);
        this.isupload = !this.isupload;
        if (!this.isupload) {
            this.loadData();
        }
    }
    logSelectGroup(e) {
        this.managerGroup = e || {};
        this.knowledgeId = null;
        this.selectTreeId = "";
        this.selectTreeObj = {};
        localStorage.setItem("exam-test-group", JSON.stringify(e));
        this.nodesTree[0].children = [];
        this.loadTree();
    }
    // 迁移试题
    migration() {
        this.migrationLoading = true;
        this.testMigrationComponent.submit(
            () => {
                this.migrationLoading = false;
                this.changeModal2();
            },
            () => {
                this.migrationLoading = false;
            }
        );
    }
}
