import { Component, OnInit } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';

import {
    FormBuilder,
    FormGroup,
    FormControl,
    Validators
} from '@angular/forms';
import { ExamPaperService } from 'app/exam/service/exam-paper.service';
import { TestQuestionService } from 'app/exam/service/test-question.service';
import { tipMessage } from 'app/account/entity/message-tip';

@Component({
    selector: 'spk-paper-edit-addtest',
    templateUrl: './paper-edit-addtest.component.html',
    styleUrls: ['./paper-edit-addtest.component.scss']
})
export class PaperEditAddtestComponent implements OnInit {
    _validateForm: FormGroup;
    isVisible = false;
    singleQuestionId: any = undefined; // 单个试题的id
    singlePartitionId: any = undefined; // 单个分区的ID
    paperData: any[] = [];
    titleCode: any; // 组卷方式
    formTitleCode: any = {}; // from表单的titleCode
    paperMessage: any = {};
    sampleTitleCode: any; // 出题方式为手工抽题时则H，为随机抽题时则R
    queryParams: any;
    spinning: boolean = true;
    addpartitionstate: boolean = false;
    addeditparId: any = undefined; // 新增分区时没有ID，修改分区有分区ID
    // tslint:disable-next-line:max-line-length
    answerList: any = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
    celueData: any = [];
    previewModel: boolean = false;
    previewPartitionModel: boolean = false;
    previewIds: any = {};
    partId: any;
    previewEpIds: any = {};
    questionType = [];
    link: any = {};
    orderCode: any = [];
    columns: any = [
        { title: '组织名称', data: 'userGroupName', style: { 'max-width': '200px', width: '200px' } },
        { title: '试题类型', data: 'typeCodeName' },
        { title: '试题难度', data: 'diffCodeName', styleClass: 'text-center' },
        { title: '试题数量', data: 'randCount', styleClass: 'text-center' },
        { title: '试题分数', data: 'randScore', styleClass: 'text-center' },
        { title: '答题时长（秒）', tpl: 'answerLength', styleClass: 'text-center' },
        { title: '专业分类', data: 'knowledgeName', styleClass: 'text-center' },
        { title: '编辑', tpl: 'editactions', styleClass: 'text-center' },
        { title: '删除', tpl: 'deleteactions', styleClass: 'text-center' }
    ];
    // 选择题型对象
    objquestionType = {
        DANX: '单选题',
        DUOX: '多选题',
        PD: '判断题',
        YDLJ: '阅读理解题',
        JD: '简答题',
        PP: '匹配题',
        ALFX: '案例分析题',
        TK: '填空题'
    }
    // 出题方式
    questionMethod = [];
    // 基本题型
    basequestionType = ['单选题', '多选题', '判断题', '阅读理解题', '简答题', '匹配题', '案例分析题', '填空题'];
    // 分区列表信息
    partitionData = {
        partitionName: ['', [Validators.required]],
        customname: [],
        orderCode: [],
        titleCode: [this.sampleTitleCode],
        partitionDesc: []
    }

    constructor(
        private confirmServ: NzModalService,
        private route: Router,
        private routeInfo: ActivatedRoute,
        private fb: FormBuilder,
        private testQuestionService: TestQuestionService,
        private exampaperservice: ExamPaperService,
    ) { }

    loadInitData() {
        this.queryParams = this.routeInfo.snapshot.params;
        this.previewIds['paperId'] = this.queryParams.epId;
        this.link = {
            userGroupId: this.queryParams['userGroupId'] || '',
            name: this.queryParams['name'] || ''
        }
        // 题型，请求对应试卷的详细
        this.spinning = true;
        this.loadPartitionList();
    }

    // 请求试卷分区列表
    loadPartitionList(call?) {
        this.exampaperservice.getPartitionList(this.queryParams.epId).subscribe((res) => {
            this.paperMessage.epName = res.epName;
            this.paperMessage.isPutout = res.isPutout;
            this.paperMessage.sumScore = res.sumScore; // 试卷总分
            this.paperMessage.examScore = res.examScore ? res.examScore : 0; // 已选试题分数
            this.paperMessage.epId = res.epId;
            this.titleCode = res.titleCode;
            this.sampleTitleCode = res.titleCode == 'G' || res.titleCode == 'RG' ? 'H' : (res.titleCode == 'S' ? 'R' : res.titleCode)
            this.spinning = false;
            this.paperData = res.paperPartList ? res.paperPartList : [];
            if (this.titleCode == 'H') {
                this.paperData.forEach(item => {
                    this.setTitleCode(item.partitionId, item.titleCode);
                });
            }
            if (call) {
                call()
            }
        }, err => {
            this.spinning = false;
            tipMessage(err)
        })
    }

    // 刷新
    refresh = () => {
        this.spinning = true;
        this.loadPartitionList();
    }

    ngOnInit() {
        this._validateForm = this.fb.group(this.partitionData)
        this.loadInitData();
        this.testQuestionService.getQuestionType().subscribe(res => {
            res.forEach(item => {
                this.questionType.push({
                    value: item.typeName,
                    label: item.typeName
                })
            });
        });
        this.exampaperservice.getDownDrag({ dicType: 'DISPLAY_ORDER' }).subscribe(
            (orderCode) => {
                this.orderCode = orderCode;
            }, err => {
                tipMessage(err);
            }
        );
        this.exampaperservice.getDownDrag({ dicType: 'THE_TITLE_METHODS' }).subscribe(
            (questionMethod) => {
                this.questionMethod = questionMethod;
            }, err => {
                tipMessage(err);
            }
        );
    }

    showConfirm = () => {
        let self = this;
        this.confirmServ.confirm({
            title: '关闭提示',
            content: '确定不进行操作关闭本页面！',
            okText: '确定',
            cancelText: '取消',
            zIndex: 1003,
            // 弹窗操作
            onOk(e) {
                self.route.navigate(['/exam/exam-paper'])
            },
            onCancel(e) {
            }
        });
    }

    // 添加分区的modal弹窗
    showModal = () => {
        this.isVisible = true;
        if (this.addeditparId) {
            // 添加分区显示弹窗
        } else {
            // 添加分区显示弹窗
            this._validateForm = this.fb.group({
                partitionName: ['单选题', [Validators.required]],
                customname: ['', [this.trimCheck]],
                orderCode: [this.orderCode[0].dicCode],
                titleCode: [this.sampleTitleCode],
                partitionDesc: ['', [this.trimCheck]]
            })
        }
    }

    openChange = () => {
        const params = this._validateForm.controls;
        const _validate = this._validateForm && this._validateForm;
        _validate.get(`customname`).setValue(params.partitionName.value);
    }

    handleOk = (e) => {
        this.isVisible = false;
    }

    handleCancel = (e) => {
        this.isVisible = false;
        this.addeditparId = undefined;
    }
    // 添加分区表单提交（添加分区）
    _submitForm = ($event, value) => {
        $event.preventDefault();
        if (!value.partitionName && !value.customname) {
            return tipMessage('请按要求选择或填写分区！');
        } else {
            if (this.addeditparId) {
                // 修改分区
                let params = {
                    partitionId: this.addeditparId,
                    partitionName: value.customname ? value.customname : value.partitionName,
                    partitionDesc: value.partitionDesc,
                    isMustAnswer: value.isMustAnswer,
                    orderCode: value.orderCode,
                    titleCode: value.titleCode || this.sampleTitleCode,
                    partitionExamPaper: this.queryParams.epId
                }
                // 调用修改分区接口
                this.exampaperservice.updatePartition(params).subscribe(() => {
                    this.isVisible = false;
                    this.loadInitData();
                    this.addeditparId = undefined;
                    this.addpartitionstate = false;
                }, err => {
                    this.spinning = false;
                    tipMessage(err);
                    this.addpartitionstate = false
                })
            } else {
                this.addpartitionstate = true
                let params = {
                    partitionName: value.customname ? value.customname : value.partitionName,
                    orderCode: value.orderCode,
                    titleCode: value.titleCode || this.sampleTitleCode,
                    partitionDesc: value.partitionDesc,
                    isMustAnswer: value.isMustAnswer,
                    partitionExamPaper: this.queryParams.epId
                }
                this.exampaperservice.addPartition(params).subscribe(res => {
                    this.isVisible = false;
                    this.addeditparId = undefined;
                    this.loadInitData();
                    this.addpartitionstate = false;
                }, err => {
                    this.spinning = false;
                    tipMessage(err)
                })
            }
        }
    };

    // 设置formTitleCode值
    setTitleCode = (partitionId, titleCode) => {
        const formGroup = this.formTitleCode;
        this.formTitleCode = {
            ...formGroup,
            [partitionId]: titleCode
        }
    }

    // 重置
    _resetForm($event: MouseEvent) {
        $event.preventDefault();
        this._validateForm.reset();
        // tslint:disable-next-line:forin
        for (const key in this._validateForm.controls) {
            this._validateForm.controls[key].markAsPristine();
        }
    }

    _getFormControl(name) {
        return this._validateForm.controls[name];
    }
    // 点击让整个分区的显示影藏
    showPartition = (event, singlepartitionid) => {
        if (singlepartitionid == this.singlePartitionId) {
            this.singlePartitionId = undefined;
        } else {
            this.singlePartitionId = singlepartitionid
        }
    }
    // 点击展示试题(单个的试题选项)
    showQuestion = (event, singlequestionid) => {
        if (singlequestionid == this.singleQuestionId) {
            this.singleQuestionId = undefined;
        } else {
            this.singleQuestionId = singlequestionid;
        }
    }
    // 删除分区
    deletePratition = (event, singlepartitionid) => {
        let self = this;
        this.confirmServ.confirm({
            title: '删除提示',
            content: '确定要删除此分区！',
            okText: '确定',
            cancelText: '取消',
            showConfirmLoading: true,
            zIndex: 1003,
            // 弹窗操作
            onOk(e) {
                // 请求删除的api
                self.exampaperservice.deletePartition(singlepartitionid).subscribe((res) => {
                    tipMessage('删除成功！', 'success')
                    self.loadInitData();
                }, err => {
                    self.spinning = false;
                    tipMessage(err)
                })

            },
            onCancel(e) {
            }
        });
    }
    // 删除单个的试题（ID）
    deletequestion = (event, id) => {
        let self = this;
        let params = {
            queId: id,
            paperId: this.queryParams.epId
        }
        this.confirmServ.confirm({
            title: '删除提示',
            content: '是否确定删除！',
            okText: '确定',
            cancelText: '取消',
            showConfirmLoading: true,
            zIndex: 1003,
            // 弹窗操作
            onOk(e) {
                // 请求删除的api
                self.spinning = true;
                self.exampaperservice.deleteQuestion(params).subscribe(res => {
                    self.loadPartitionList(() => {
                        tipMessage('删除成功！', 'success')
                    });
                }, err => {
                    self.spinning = false;
                    tipMessage(err)
                })
            },
            onCancel(e) {
            }
        });
    }

    // 手工抽题
    manualdrawing = (partitionId, type) => {
        this.route.navigate([`/exam/exam-paper/takquestionpaper`,
            {
                partitionId: partitionId,
                type: type,
                sumScore: this.paperMessage.sumScore, // 试卷总分
                examScore: this.paperMessage.examScore, // 已选试题分数
                epName: this.paperMessage.epName,
                isPutout: this.paperMessage.isPutout,
                epId: this.queryParams.epId,
                titleCode: this.titleCode,
                userGroupId: this.queryParams['userGroupId'],
                name: this.queryParams['name']
            }
        ])
    }

    returnPPList = (list, type?) => { // 返回匹配题问题/选项列表
        let test = [];
        let answer = [];
        (list || []).forEach((item, i) => {
            if (item.isCorrect) { // 表示是问题
                test.push(item);
            } else {
                answer.push(item);
            }
        });
        if (type) {
            return test;
        } else {
            return answer;
        }
    }

    // 随机抽题
    randomquestions = (partitionId, type) => {
        this.route.navigate([`/exam/exam-paper/strategyrandom`, {
            partitionId: partitionId,
            type: type,
            epId: this.queryParams.epId,
            epName: this.paperMessage.epName,
            isPutout: this.paperMessage.isPutout,
            sumScore: this.paperMessage.sumScore, // 试卷总分
            examScore: this.paperMessage.examScore, // 已选试题分数
            titleCode: this.titleCode,
            userGroupId: this.queryParams['userGroupId'],
            name: this.queryParams['name']
        }])
    }

    deleteLibpary = (plId) => {// 删除策略
        let self = this;
        this.spinning = true;
        this.confirmServ.confirm({
            title: '删除提示',
            content: '确定要删除此策略！',
            okText: '确定',
            cancelText: '取消',
            showConfirmLoading: true,
            zIndex: 1003,
            onOk(e) {
                let params = {
                    paperId: self.queryParams.epId,
                    plId
                }
                self.exampaperservice.deleteLibpary(params).subscribe(res => {
                    tipMessage('删除成功！', 'success')
                    self.loadInitData();
                }, err => {
                    tipMessage('删除失败！')
                    self.spinning = false;
                })
            },
            onCancel(e) {
                self.spinning = false;
            }
        });
    }

    editLibpary = (plId, partitionId) => {// 编辑策略
        this.route.navigate([`/exam/exam-paper/strategyrandom`, {
            partitionId: partitionId,
            epId: this.queryParams.epId,
            epName: this.paperMessage.epName,
            isPutout: this.paperMessage.isPutout,
            sumScore: this.paperMessage.sumScore, // 试卷总分
            examScore: this.paperMessage.examScore, // 已选试题分数
            titleCode: this.titleCode,
            plId: plId,
            userGroupId: this.queryParams['userGroupId'],
            name: this.queryParams['name']
        }])
    }

    // 混合抽题混合抽题
    mixQuestion = (partitionId) => {
        const type = this.formTitleCode[partitionId];
        if (type == 'H') {
            this.manualdrawing(partitionId, 'M');
        } else {
            this.randomquestions(partitionId, 'R');
        }
    }

    // 试题排序
    handleMove = (type, queId) => {
        this.spinning = true;
        let params = {
            queId: queId,
            type: type
        }
        this.exampaperservice.questionSort(params).subscribe(res => {
            this.loadPartitionList(() => {
                tipMessage('排序成功！', 'success')
            })
        }, err => {
            this.spinning = false;
            tipMessage(err)
        })
    }
    // 编辑
    handleEdit = (typeName, queId, isZt) => {
        if (isZt) {
            this.route.navigate([`/exam/test-question/edit/${queId}`, {
                epId: this.queryParams.epId,
                typeName,
                isPaper: true,
                isZt: true,
                userGroupId: this.queryParams['userGroupId'],
                name: this.queryParams['name']
            }])
        } else {
            this.route.navigate([`/exam/test-question/edit/${queId}`, {
                epId: this.queryParams.epId,
                typeName,
                isPaper: true,
                userGroupId: this.queryParams['userGroupId'],
                name: this.queryParams['name']
            }])
        }
    }

    // 单个试题进行修改分区
    modifyparition = (event, id, value) => {
        this.isVisible = true;
        // 获取分区信息
        this.exampaperservice.getPartitionMessage(id).subscribe((res) => {
            this.addeditparId = id;
            if (this.basequestionType.indexOf(res['partitionName']) != -1) {
                this.partitionData[`partitionName`] = [res['partitionName']];
            } else {
                this.partitionData[`partitionName`] = ['单选题'];
            }
            this.partitionData[`customname`] = [res['partitionName'], [this.trimCheck]];
            // tslint:disable-next-line:forin
            for (let key in this.partitionData) {
                if (key != 'partitionName') {
                    if (key != 'customname') {
                        this.partitionData[key] = [res[key]];
                    }
                }
            }
            this.partitionData[`partitionDesc`] = [res['partitionDesc'], [this.trimCheck]];
            this._validateForm = this.fb.group(this.partitionData);
        }, err => {
            tipMessage(err)
        })

    }
    // 预览试卷
    previewpaper = () => {
        this.previewModel = true;
        this.previewEpIds['examPaperId'] = this.queryParams.epId;
    }

    // 关闭预览
    handleCancelViewModel = () => {
        this.previewModel = false;
    }

    // 关闭预览
    handleOkViewModel = () => {
        this.previewModel = false;
    }

    // 试题的导入(判断是编辑试卷的导入还是创建试卷的导入)
    importsingletest = (event, partitionId, type) => {
        this.route.navigate([`/exam/exam-paper/import`,
            {
                paperId: this.queryParams.epId,
                partitionId: partitionId,
                isPutout: this.paperMessage.isPutout,
                epName: this.paperMessage.epName,
                userGroupId: this.queryParams['userGroupId'],
                name: this.queryParams['name']
            }
        ])
    }
    // 预览分区
    previewPartition = (event, item) => {
        if (item.titleCode == 'R') {
            if (!item.pllist.length) {
                return tipMessage('分区没有内容');
            }
        }
        this.previewIds['partitionId'] = item.partitionId;
        this.previewPartitionModel = true;
    }
    // 分区上移
    moveUpPratition(event, partitionId) {
        this.spinning = true;
        let params = {
            partitionId: partitionId,
            type: 'UP'
        }
        this.exampaperservice.movePartition(params).subscribe((res) => {
            tipMessage('上移成功！', 'success');
            this.loadPartitionList();
        }, err => {
            tipMessage(err);
            this.spinning = false
        })

    }
    // 分区下移
    moveDownPratition(event, partitionId) {
        this.spinning = true;
        let params = {
            partitionId: partitionId,
            type: 'DOWN'
        }
        this.exampaperservice.movePartition(params).subscribe((res) => {
            tipMessage('下移成功！', 'success');
            this.loadPartitionList();
        }, err => {
            tipMessage(err)
            this.spinning = false
        })
    }
    // 分区预览
    handleCancelPreviewModel = () => {
        this.previewPartitionModel = false;
        this.partId = null;
    }
    // 分区预览
    handleOkPreviewModel = () => {
        this.previewPartitionModel = false;
        this.partId = null;
    }

    trimCheck = (control: FormControl): { [s: string]: boolean } => {
        if (control.value && !control.value.trim()) {
            return { confirm: true, error: true };
        }
    }

}
