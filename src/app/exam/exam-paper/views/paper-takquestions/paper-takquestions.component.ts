import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AccountInfo } from './../../entity/account-info';
import {
    FormBuilder,
    FormGroup,
    Validators,
    FormControl
} from '@angular/forms';
import { AccountService } from 'app/account/service/account.service';
import { TestQuestionService } from 'app/exam/service/test-question.service';
import { ExamPaperService } from 'app/exam/service/exam-paper.service';
import { Observable } from 'rxjs/Observable';
import { Pagination } from 'app/core/entity/pagination';
import * as moment from 'moment';
import { tipMessage } from 'app/account/entity/message-tip';

@Component({
    selector: 'spk-paper-takquestions',
    templateUrl: './paper-takquestions.component.html',
    styleUrls: ['./paper-takquestions.component.scss']
})
export class PaperTakquestionsComponent implements OnInit {
    queryParams: any;
    managerGroup: any = {};
    switchExam: any = {};
    accountInfo: AccountInfo;
    _selectTreeId: any; // 当前选择分类树id
    treeConfig: any; // 树组件异步加载子数据配置
    nodesTree: any = [{ id: '', label: '全部', selected: true, expanded: true, hasChildren: true }]; // 分类树数据
    nzSpinning: boolean = true;
    testListData: any; // 列表数据
    searchOptions: any = [];
    searchOptQuestion: any = [];
    previewQues: boolean = false;
    queId: null;
    previewQuesModel: boolean = false;
    previewIds: any = {};

    get selectTreeId() {
        return this._selectTreeId;
    }

    set selectTreeId(v) {
        this._selectTreeId = v;
    }

    mcolumns: any = [
        { title: '题目内容', tpl: 'casual', style: { 'max-width': '200px', width: '200px' } },
        { title: '试题类型', data: 'typeName', style: { 'max-width': '80px', width: '80px' } },
        { title: '试题难度', data: 'diffName', styleClass: 'text-right', style: { 'max-width': '80px', width: '80px' } },
        { title: '试题分类', data: 'konwName', styleClass: 'text-center', style: { 'max-width': '80px', width: '80px' } },
        { title: '所属组织', data: 'userGroupName', styleClass: 'text-center' },
        { title: '试题分数', data: 'score', styleClass: 'text-right', style: { 'max-width': '80px', width: '80px' } },
        { title: '答题时长（秒）', data: 'answerTime', styleClass: 'text-center', style: { 'max-width': '100px', width: '100px' } },
        { title: '创建时间', tpl: 'createdDate', styleClass: 'text-right' },
        { title: '创建人', data: 'userName', styleClass: 'text-center' }
    ];

    _searchForm: FormGroup;
    selection: any = [];
    data: any;
    constructor(
        private route: Router,
        private fb: FormBuilder,
        private routeInfo: ActivatedRoute,
        private testQuestionService: TestQuestionService,
        private accountInfoService: AccountService,
        private examPaperService: ExamPaperService
    ) {
        this.accountInfoService.findUser().subscribe(
            user => {
                this.managerGroup = user.managerGroup;
                this.getTreeNode()
            }
        )
    }

    // 试题难度 试题类型
    initQuesInfo = () => {
        this.testQuestionService.getDifficulty().subscribe(res => {
            res.forEach(item => {
                this.searchOptQuestion.push({
                    value: item.diffCode,
                    label: item.diffName
                })
            });
            this._searchForm && this._searchForm.get(`questionHard`).setValue(this.searchOptQuestion[0].diffCode);
        });
        this.testQuestionService.getQuestionType().subscribe(res => {
            res.forEach(item => {
                this.searchOptions.push({
                    value: item.typeCode,
                    label: item.typeName
                })
            });
            this._searchForm && this._searchForm.get(`questionType`).setValue(this.searchOptions[0].baseCode);
        });
    }

    loadData(page?: Pagination<any>, param?: any) {// table组件加载列表数据
        let params = {
            ...this.switchExam,
            ...param,
            userGroupId: this.managerGroup && this.managerGroup.id,
            knowledgeId: this.selectTreeId,
            paperId: this.queryParams.epId
        };
        this.nzSpinning = true;
        this.testQuestionService.getTestListData(params, page).subscribe(
            testListData => {
                this.testListData = testListData;
                this.nzSpinning = false;
            }
        );
    }

    // 返回
    goBack = () => {
        window.history.back();
    }

    // 预览试题
    previewQuesFunction = (queId) => {
        this.previewQuesModel = true;
        this.previewIds['ids'] = queId;
    }

    // 关闭模态框
    handleCancelPreviewModel = () => {
        this.previewQuesModel = false;
    }

    // 关闭模态框
    handleOkPreviewModel = () => {
        this.previewQuesModel = false;
    }

    ngOnInit() {
        let m = this.accountInfo || new AccountInfo();
        this._searchForm = this.fb.group({
            casual: ['', [this.trimCheck]], // 题干
            typeCode: [], // 试题类型
            diffCode: [], // 试题难度
            createStartTime: ['', [this.confirmStartDateValidator]], // 试卷分类
            createEndTime: ['', [this.confirmEndDateValidator]]
        });
        this.initQuesInfo();
        this.queryParams = this.routeInfo.snapshot.params;
    }

    getTreeNode = () => {
        this.testQuestionService.getParentNodes({ userGroupId: this.managerGroup.id }).subscribe(nodes => {// 获取父分类api
            this.nodesTree[0].children.push(...this.formatTreeData(nodes));
        });
        this.treeConfig = {
            async: {
                enable: true,
                loadChildren: (node: any): Observable<any> => {// 异步加载子分类数据
                    if (!node.id) {// id为空不加载子数据
                        return Observable.of(null);
                    }
                    return this.testQuestionService.getChildNodes({ parentId: node.id }); // 获取子分类api
                },
                dataFilter: (tree, node: any) => {// 渲染加载的子分类数据
                    let data = [];
                    // tslint:disable-next-line:no-unused-expression
                    tree && tree.forEach(obj => {
                        data.push({ "id": obj.knowledgeId, "label": obj.qkName, "hasChildren": true });
                    });
                    return data;
                }
            },
            data: {// 获取数据 key对象的value值为获取数据api里面的属性名
                key: {
                    id: 'id',
                    label: 'label',
                    children: 'children'
                }
            }
        };
        this.nodesTree = [{ id: '', label: '全部', selected: true, expanded: true, hasChildren: true }];
    }

    formatTreeData(tree) {// 格式化父分类树数据
        let data = [];
        tree.forEach((obj, index) => {
            data.push({ "id": obj.knowledgeId, "label": obj.qkName, "hasChildren": true });
        });
        return data;
    }

    onNodeSelect(e) {// 树组件选择事件，获取当前选择树节点id
        this.selectTreeId = e.node.id;
        this.loadData();
    }
    onNodeUnselect(e) {
        // console.log('onNodeUnselect：', e.node);
    }
    // 查询列表条件
    _submitForm($event, value) {
        $event.preventDefault();
        // tslint:disable-next-line:forin
        this.switchExam = value;
        this.loadData();
        return;
    }

    resetForm = () => {
        this._searchForm = this.fb.group({
            casual: ['', [this.trimCheck]], // 题干
            typeCode: [], // 试题类型
            diffCode: [], // 试题难度
            createStartTime: ['', [this.confirmStartDateValidator]], // 试卷分类
            createEndTime: ['', [this.confirmEndDateValidator]]
        });
    }

    trimCheck = (control: FormControl): { [s: string]: boolean } => {
        if (control.value && !control.value.trim()) {
            return { confirm: true, error: true };
        }
    }

    getFormControl(name) {
        return this._searchForm.controls[name];
    }

    // 添加选中的试题
    addchoosequestion = (value) => {
        if (this.selection.length) {
            let queIdArr = [];
            this.selection.forEach((obj, index) => {
                queIdArr.push(obj.queId);
            });
            let queIds = queIdArr.join(',');
            this.route.navigate(['/exam/exam-paper/editscore', {
                ...this.queryParams,
                queIds: queIds,
            }]);
        } else {
            return tipMessage('请先选择一条试题', 'warning')
        }
    }
    // 随机抽题策略对抽到的题目进行编辑
    showeditmodal = (value) => {

    }
    // 随机抽题策略对题目进行复制
    copymessage = (value) => {

    }

    logSelectGroup(e) {
        this.managerGroup = e[0];
        this.nzSpinning = true;
        this.getTreeNode();
    }

    // 时间验证方法
    confirmEndDateValidator = (control: FormControl): { [s: string]: boolean } => {
        let controls = this._searchForm && this._searchForm.controls;
        if (controls) {
            const startdate = moment(controls[`createStartTime`].value).unix();
            if (control.value) {
                if (startdate > moment(control.value).unix()) {
                    this._searchForm.get(`createStartTime`).setValue(null);
                    tipMessage('结束时间不能小于开始时间！', '', 4000);
                    return;
                }
            }
        }
    }

    confirmStartDateValidator = (control: FormControl): { [s: string]: boolean } => {
        let controls = this._searchForm && this._searchForm.controls;
        if (controls) {
            const enddate = moment(controls[`createEndTime`].value).unix();
            if (control.value) {
                if (enddate < moment(control.value).unix()) {
                    this._searchForm.get(`createEndTime`).setValue(null);
                    tipMessage('结束时间不能小于开始时间！', '', 4000);
                    return;
                }
            }
        }
    }

}
