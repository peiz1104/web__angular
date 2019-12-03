import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AccountInfo } from './../../entity/account-info';
import { NzModalService } from 'ng-zorro-antd';
import { TestQuestionService } from 'app/exam/service/test-question.service';
import {
    FormBuilder,
    FormGroup,
    Validators,
    FormControl
} from '@angular/forms';
import { ExamPaperService } from 'app/exam/service/exam-paper.service';
import { Observable } from 'rxjs/Observable';
import { AccountService } from 'app/account/service/account.service';
import { TreeComponent } from "console-ui-ng";
import { tipMessage } from 'app/account/entity/message-tip';

@Component({
    selector: 'spk-paper-strategy-extraction',
    templateUrl: './paper-strategy-extraction.component.html',
    styleUrls: ['./paper-strategy-extraction.component.scss']
})
export class PaperStrategyExtractionComponent implements OnInit {
    queryParams: any;
    demoValue: number;
    typeObj: any = {};
    scoreValue: number;
    timeValue: number = 60;
    accountInfo: AccountInfo;
    selection: any[];
    data: any;
    _searchForm: FormGroup;
    questionNumber: number = 0;
    isLoading: boolean = false;
    showTableList: boolean = true;
    searchOptQuestion: any = [];
    searchOptions: any = [];
    isVisible: boolean = false;
    treeConfig: any;
    nodesTree: any = []; // 分类树数据
    selectTreeId: any = '';
    quesCode: boolean = true;
    userGroupId: number;
    managerGroup: any;
    knowledgeIdVisabled: boolean = true;
    typeCode: any;
    diffCode: any;
    sonCount: boolean = false;
    _isSpinning: boolean = false;
    treeSpinning: boolean = false;
    wholeSpinning: boolean = false;
    selectArr: any = [];
    listData: any = {
        typeCode: ['', [Validators.required]], // 试题类型
        userGroupId: ['', [Validators.required]], // 所属组织
        diffCode: ['', [Validators.required]], // 试题难度
        randCount: ['', [Validators.required]], // 抽题数量
        randScore: ['', [Validators.required]], // 试题分数
        knowledgeId: [, [Validators.required]], // 试题分类
        answerLength: [], // 试题时长
        // sonCount: [null, [Validators.required]] // 子题数量
    };
    isShowRandCount = false;
    controlData = { sonCount: null, }

    @ViewChild('categoryTree') categoryTree: TreeComponent;

    constructor(
        private route: Router,
        private fb: FormBuilder,
        private routeInfo: ActivatedRoute,
        private exampaperservice: ExamPaperService,
        private testQuestionService: TestQuestionService,
        private accountInfoService: AccountService,
    ) { }

    ngOnInit() {
        let m = this.accountInfo || new AccountInfo();
        this.queryParams = this.routeInfo.snapshot.params;
        this.wholeSpinning = true;
        this.initQuesInfo();
        // 如果有plId则是修改策略信息
        if (this.queryParams.plId) {
            let params = {
                plId: this.queryParams.plId
            }
            this.exampaperservice.updateLibpary(params).subscribe(res => {
                this._searchForm.patchValue({
                    typeCode: res['typeCode'], // 试题类型
                    userGroupId: {
                        id: res['userGroupId'],
                        name: res['userGroupName']
                    }, // 所属组织
                    diffCode: res['diffCode'], // 试题难度
                    randScore: res['randScore'], // 试题分数
                    knowledgeId: res['knowledgeName'], // 试题分类
                    answerLength: res['answerLength'], // 试题时长
                })
                this.knowledgeIdVisabled = res['knowledgeId'] ? false : true;
                this.selectTreeId = res['knowledgeId'];
                setTimeout(() => {
                    if (!!res.typeCode && res.userGroupId && !!res.diffCode && res.knowledgeId) {
                        this.isShowRandCount = true;
                        this.addFormItem('randCount', 'randCount', res['randCount'], null);
                        this._isSpinning = true;
                        let params = {
                            diffCode: res['diffCode'],
                            knowledgeId: res['knowledgeId'],
                            typeCode: res['typeCode'],
                            userGroupId: res['userGroupId'],
                            paperId: this.queryParams.epId
                        }
                        setTimeout(() => {
                            if (res['typeCode'] == 'YDLJ') {
                                params['sonCount'] = res['sonCount'];
                            }
                            this.exampaperservice.getQuestionNumber(params).subscribe(questionNumber => {
                                this._isSpinning = false;
                                if (typeof (questionNumber) != 'object') {
                                    this.questionNumber = questionNumber;
                                } else {
                                    this.questionNumber = 0;
                                }
                            })
                        }, 100);
                    }
                }, 1000)
                setTimeout(() => {
                    if (this.typeObj[res.typeCode] == 'YDLJ') {
                        this.addFormItem('sonCount', 'sonCount', res['sonCount'], this.randSonCountValidator)
                    }
                    this.wholeSpinning = false;
                }, 2000)
                // this.jugeShowRandCount();
            }, err => {
                tipMessage(err);
            })
            this.listData['answerLength'][1] = [this.isInt];
        } else {
            this.listData = {
                typeCode: ['', [Validators.required]], // 试题类型
                userGroupId: ['', [Validators.required]], // 所属组织
                diffCode: ['', [Validators.required]], // 试题难度
                randCount: ['', [Validators.required]], // 抽题数量
                randScore: [1, [this.randScoreValidator]], // 试题分数
                knowledgeId: [, [Validators.required]], // 试题分类
                answerLength: [, [this.isInt]], // 试题时长
                sonCount: [0, [this.randSonCountValidator]] // 子题数量
            };
            this.wholeSpinning = false;
        }
        this._searchForm = this.fb.group(this.listData);
        window['test'] = this._searchForm;
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
            if (!this.queryParams.plId) {
                this._searchForm.get(`diffCode`).setValue(this.searchOptQuestion[0].diffCode);
            }
        });
        this.testQuestionService.getQuestionType().subscribe(res => {
            res.forEach(item => {
                this.typeObj[item.typeCode] = item.baseCode;
                this.searchOptions.push({
                    value: item.typeCode,
                    label: item.typeName
                })
            });
            if (!this.queryParams.plId) {
                this._searchForm.get(`typeCode`).setValue(this.searchOptions[0].typeCode);
            }
        });
    }

    addFormItem = (formControlName, name, value, validator) => {
        if (!this._searchForm) {
            return;
        }
        const control = {
            id: name,
            controlInstance: name
        }
        this.controlData[formControlName] = control;
        this._searchForm.addControl(control.controlInstance, new FormControl(value, validator));
        this._searchForm.patchValue({
            [formControlName]: value
        })
    }

    removeFormItem(formControlName) {
        if (!this._searchForm) {
            return;
        }
        const control = this.controlData[formControlName];
        if (control) {
            this._searchForm.removeControl(control.controlInstance);
        }
        this.controlData[formControlName] = null;
    }


    formatTreeData(tree) {// 格式化父分类树数据
        let data = [];
        tree.forEach((obj, index) => {
            data.push({ "id": obj.knowledgeId, "label": obj.qkName, "hasChildren": true });
        });
        return data;
    }



    jugeShowRandCount() {
        const params = this._searchForm && this._searchForm.controls;
        if (!params) {
            return;
        }
        setTimeout(() => {
            // tslint:disable-next-line:max-line-length
            if (!!this.typeObj[params.typeCode.value] && !!params.userGroupId.value && !!params.diffCode.value && !!params.knowledgeId.value) {
                if (!this.isShowRandCount) {
                    this.isShowRandCount = true;
                    this.addFormItem('randCount', 'randCount', null, null)
                } else {
                    this._searchForm.controls['randScore'].markAsDirty();
                }
                setTimeout(() => {
                    this.focusQuestionNumber();
                }, 100);
                return true
            } else if (this.controlData['randCount']) {
                this.removeFormItem('randCount');
                this.isShowRandCount = false;
            }
        }, 200)
    }

    diffCodeChange = ($event) => {
        this.questionNumber = 0;
        // tslint:disable-next-line:no-unused-expression
        this._searchForm.get("randCount") && this._searchForm.get("randCount").setValue(0);
        this.jugeShowRandCount();
    }

    typeCodeChange = ($event) => {
        if (this.typeObj[$event] == 'YDLJ') {
            this.addFormItem('sonCount', 'sonCount', 0, this.randSonCountValidator)
        } else if (this.controlData['sonCount']) {
            this.removeFormItem('sonCount');
        }
        this.questionNumber = 0;
        // tslint:disable-next-line:no-unused-expression
        this._searchForm.get(`randCount`) && this._searchForm.get(`randCount`).setValue(0);
        this.jugeShowRandCount();
    }

    // 生成试题
    _submitForm($event, value) {
        $event.preventDefault();
        this.isLoading = true;
        let { epId, partitionId, examScore, sumScore } = this.queryParams;
        // let es = parseFloat(examScore) * 100;
        // let ss = parseFloat(sumScore) * 100;
        // if (sumScore != 0 && ss - es - (value.randCount * value.randScore * 100) < 0) {
        //     this.isLoading = false;
        //     return this._message.warning('您选的题分数已超过限制分！')
        // } else {
        // }
        if (value.randCount <= this.questionNumber) {
            if (value.randCount != 0) {
                let params = {
                    diffCode: value.diffCode,
                    knowledgeId: this.selectTreeId,
                    typeCode: value.typeCode,
                    userGroupId: value.userGroupId.id,
                    randCount: value.randCount,
                    baseCode: this.typeObj[value.typeCode],
                    partitionId
                }
                if (this.queryParams.titleCode != 'RG') {
                    params['randScore'] = value.randScore;
                    params['answerLength'] = value.answerLength;
                }
                // 所选题为阅读理解题时
                if (this.typeObj[value.typeCode] == 'YDLJ') {
                    if (value.sonCount != 0) {
                        params['sonCount'] = value.sonCount
                    } else {
                        this.isLoading = false;
                        return tipMessage('阅读理解子题数不能为零！');
                    }
                }
                // 如果有plId时，则是修改策略，修改策略后只要返回试卷列表就行了
                if (this.queryParams.plId) {
                    params['plId'] = this.queryParams.plId;
                    this.exampaperservice.alertLibPary(params).subscribe(res => {
                        this.isLoading = false;
                        tipMessage('添加试题成功！', 'success');
                        this.route.navigate([`/exam/exam-paper/editpaper/${epId}/addtest`, {
                            epId: epId
                        }])
                    }, error => {
                        this.isLoading = false;
                        return tipMessage(error);
                    })
                } else {
                    this.exampaperservice.getRandomQuestion(params).subscribe(res => {
                        this.isLoading = false;
                        tipMessage('添加试题成功！', 'success');
                        if (this.queryParams.titleCode == 'RG') {
                            this.route.navigate(['/exam/exam-paper/editscore', {
                                ...this.queryParams,
                                queIds: res.ids
                            }]);
                        } else {
                            this.route.navigate([`/exam/exam-paper/editpaper/${epId}/addtest`, {
                                epId: epId,
                                userGroupId: this.queryParams['userGroupId'],
                                name: this.queryParams['name']
                            }])
                        }
                    }, error => {
                        this.isLoading = false;
                        return tipMessage(error);
                    })
                }
            } else {
                this.isLoading = false;
                return tipMessage('抽题数量不能为零！')
            }
        } else {
            this.isLoading = false;
            return tipMessage('抽题数量不能大于可抽题数量!', '', 3000);
        }
    }

    cleanCategoryTreeSelection() {
        if (this.categoryTree) {
            this.categoryTree.selection = [];
        }
    }

    showModel = () => {
        if (!this.knowledgeIdVisabled) {
            this.isVisible = true;
        }
        this.treeSpinning = true;
        this.cleanCategoryTreeSelection();
        this.testQuestionService.getParentNodes({ userGroupId: this.userGroupId }).subscribe(nodes => {// 获取父分类api
            this.nodesTree = this.formatTreeData(nodes);
            this.treeSpinning = false;
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
    }

    sonCountChange($event) {
        this.focusQuestionNumber();
    }

    onNodeSelect(e) {// 树组件选择事件，获取当前选择树节点id
        // if (e.node.id) {
        //     this.selectTreeId = e.node.id;
        //     this._searchForm.get(`randCount`) && this._searchForm.get(`randCount`).setValue(0);
        //     this.jugeShowRandCount();
        //     this._searchForm.get(`knowledgeId`).setValue(e.node.data.label);
        //     this.questionNumber = 0;
        // }
    }

    onNodeUnselect(e) {
        // this._searchForm.get(`knowledgeId`).setValue(e.node.id);
    }

    handleOk = () => {
        this.isVisible = false;
        if (this.selectArr.length) {
            let arrId = [];
            let nameString = '';
            this.selectArr.forEach((item, index) => {
                arrId.push(item.id);
                if (index == 0) {
                    nameString += item.label
                } else {
                    nameString += '，' + item.label
                }
            });
            // tslint:disable-next-line:no-unused-expression
            this._searchForm.get(`randCount`) && this._searchForm.get(`randCount`).setValue(0);
            this.jugeShowRandCount();
            this._searchForm.get(`knowledgeId`).setValue(nameString);
            this.questionNumber = 0;
            this.selectTreeId = arrId.join(',');
            this.jugeShowRandCount()
        }
    }

    handleCancel = () => {
        this.isVisible = false;
    }

    // 获取所属组织id
    logSelectGroup(e) {
        this.questionNumber = 0;
        // tslint:disable-next-line:no-unused-expression
        this._searchForm.get(`randCount`) && this._searchForm.get(`randCount`).setValue(0);
        this._searchForm.get(`userGroupId`).setValue(e[0]);
        this.userGroupId = e[0].id;
        this.knowledgeIdVisabled = false;
        // tslint:disable-next-line:no-unused-expression
        this._searchForm.get(`knowledgeId`) && this._searchForm.get(`knowledgeId`).setValue('');
        this.jugeShowRandCount();

    }

    // 删除
    deletechoosequestion(event) {

    }

    onSelectionChange = (e) => {
        this.selectArr = e;
        // console.log(this.selectArr);
    }

    // 判断答题时长是不是为整数
    isInt = (control: FormControl): { [s: string]: boolean } => {
        if (control.value) {
            if (/^-?\d*\.\d+$/.test(control.value)) {
                return { isInt: true, error: true };
            }
        }
    }

    // 返回
    goBack() {
        window.history.back();
    }

    focusQuestionNumber = () => {
        const fb = this._searchForm.controls;
        this._isSpinning = true;
        let flag = fb.diffCode && fb.knowledgeId && fb.typeCode && fb.userGroupId.value;
        if (flag) {
            let params = {
                diffCode: fb.diffCode.value,
                knowledgeId: this.selectTreeId,
                typeCode: fb.typeCode.value,
                userGroupId: fb.userGroupId.value.id,
                paperId: this.queryParams.epId
            }
            setTimeout(() => {
                if (this.typeObj[fb.typeCode.value] == 'YDLJ') {
                    if (fb.sonCount.value != 0) {
                        params['sonCount'] = fb.sonCount.value
                    } else {
                        this._isSpinning = false;
                        this.questionNumber = 0;
                        return;
                    }
                }
                this.exampaperservice.getQuestionNumber(params).subscribe(questionNumber => {
                    this._isSpinning = false;
                    if (typeof (questionNumber) != 'object') {
                        this.questionNumber = questionNumber;
                    } else {
                        this.questionNumber = 0;
                    }
                })
            }, 100);

        } else {
            this._isSpinning = false;
            tipMessage('前面四项不能不空！', '', 3000);
        }
    }

    getFormControlByName(name) {
        return (this._searchForm && this._searchForm.controls[name]) || {
            dirty: false,
            hasError: function (errorCode, path?: string[]) {
                return false
            }
        };
    }

    randScoreValidator = (control: FormControl): { [s: string]: boolean } => {
        const fb = this._searchForm && this._searchForm.controls;
        let errorObj = null;
        setTimeout(() => {
            if (fb) {
                if (this.typeObj[fb.typeCode.value] == 'YDLJ') {
                    const randScore = Number.parseFloat(control && control.value || 1);
                    const sonCount = Number.parseInt(fb.sonCount && fb.sonCount.value || 0)
                    // console.log('randScoreValidator', randScore, sonCount, randScore % sonCount, (randScore / sonCount) % 0.5)
                    // console.log('randScoreValidator2', randScore % sonCount == 0, (randScore / sonCount) % 0.5 == 0)
                    if (this.queryParams.titleCode != 'RG' && !(randScore % sonCount == 0 || (randScore / sonCount) % 0.5 == 0)) {
                        this._searchForm.controls['randScore'].markAsDirty();
                        errorObj = { error: true, notUnique: true };
                        fb.randScore.setErrors({
                            error: true, notUnique: true
                        })
                    }
                } else {
                    const randScore = Number.parseFloat(control && control.value || 1);
                    if ((randScore * 10) % 5 != 0) {
                        fb.randScore.setErrors({
                            error: true, notPass: true
                        })
                    }
                }
                // this._searchForm.controls['randScore'].markAsDirty();
            }
        }, 0)
        return errorObj;
    };
    randSonCountValidator = (control: FormControl): { [s: string]: boolean } => {
        const fb = this._searchForm && this._searchForm.controls;
        setTimeout(() => {
            if (fb) {
                if (this.typeObj[fb.typeCode.value] == 'YDLJ') {
                    const sonCount = Number.parseFloat(control && control.value || 0);
                    const randScore = Number.parseInt(fb.randScore && fb.randScore.value || 1)
                    // console.log('randSonCountValidator', randScore, sonCount, randScore % sonCount, (randScore / sonCount) % 0.5)
                    // console.log('randSonCountValidator2', randScore % sonCount == 0, (randScore / sonCount) % 0.5 == 0)
                    if (this.queryParams.titleCode != 'RG' && !(randScore % sonCount == 0 || (randScore / sonCount) % 0.5 == 0)) {
                        fb.randScore.setErrors({
                            error: true, notUnique: true
                        })
                        this._searchForm.controls['randScore'].markAsDirty();
                    } else {
                        fb.randScore.setErrors(null)
                    }
                }
            }
        }, 0);
        return null;

    };

    testConsole = ($event) => {
        console.log($event)
    }
}
