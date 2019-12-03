/*
 * @Author: peimingjun
 * @Date: 2017-11-06 15:42:02
 * @Last Modified by: peimingjun
 * @Last Modified time: 2017-11-06 18:12:00
 */
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
import { tipMessage } from 'app/account/entity/message-tip';

@Component({
    selector: 'spk-paper-add-test',
    templateUrl: './paper-add-test.component.html',
    styleUrls: ['./paper-add-test.component.scss']
})
export class PaperAddTestComponent implements OnInit {
    _validateForm: FormGroup;
    isVisible = false;
    partitiondata: any; // 分区数据
    singleQuestionId: any = undefined; // 单个试题的id
    singlePartitionId: any = undefined; // 单个分区的ID
    paperData: any[] = [];
    queryParams: any;
    sampleTitleCode: any;
    titleCode: any; // 试卷API的titleCode
    formTitleCode: any = {}; // from表单的titleCode
    paperMessage: any = {};
    spinning: boolean = true;
    addpartitionstate: boolean = false;
    addeditparId: any = undefined; // 新增分区时没有ID，修改分区有分区ID
    // tslint:disable-next-line:max-line-length
    answerList: any = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
    questionType = [
        { value: '单选题', label: '单选题' },
        { value: '多选题', label: '多选题' },
        { value: '判断题', label: '判断题' },
        { value: '阅读理解题', label: '阅读理解题' },
        { value: '简答题', label: '简答题' },
        { value: '匹配题', label: '匹配题' },
        { value: '案例分析题', label: '案例分析题' },
        { value: '填空题', label: '填空题' }
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
    // 基本题型
    basequestionType = ['单选题', '多选题', '判断题', '阅读理解题', '简答题', '匹配题', '案例分析题', '填空题'];
    // 分区列表信息
    partitionData = {
        partitionName: [''],
        customname: ['', [Validators.required]],
        orderCode: ['R'],
        titleCode: [this.sampleTitleCode],
        partitionDesc: ['']
    }
    // 出题方式
    questionMethod = [
        { value: 'H', label: '手工组卷', disable: false },
        { value: 'R', label: '随机组卷', disable: false },
        // { value: 'H', label: '混合组卷', disable: false },
        // { value: 'RG', label: '策略组卷', disable: true }
    ];
    constructor(
        private confirmServ: NzModalService,
        private route: Router,
        private routeInfo: ActivatedRoute,
        private fb: FormBuilder,
        private exampaperservice: ExamPaperService,
    ) { }
    // 加载初始数据
    loadInitData() {
        this.spinning = true;
        this.queryParams = this.routeInfo.snapshot.params;
        this.loadPartitionList();
    }
    // 请求试卷分区列表
    loadPartitionList(call?) {
        this.exampaperservice.getPartitionList(this.queryParams.epId).subscribe(res => {
            this.paperMessage.epName = res.epName;
            this.paperMessage.isPutout = res.isPutout;
            this.paperMessage.sumScore = res.sumScore; // 试卷总分
            this.paperMessage.examScore = res.examScore ? res.examScore : 0; // 已选试题分数
            this.titleCode = res.titleCode;
            this.sampleTitleCode = res.titleCode == 'G' || res.titleCode == 'RG' ? 'H' : (res.titleCode == 'S' ? 'R' : res.titleCode)
            this.spinning = false;
            this.paperData = res.paperPartList ? res.paperPartList : [];
            if (this.titleCode == 'H') {
                this.paperData.forEach(item => {
                    this.setTitleCode(item.partitionId, item.titleCode);
                });
            }
            call()
        }, err => {
            this.spinning = false;
            tipMessage(err)
        })
    }

    // 设置formTitleCode值
    setTitleCode = (partitionId, titleCode) => {
        const formGroup = this.formTitleCode;
        this.formTitleCode = {
            ...formGroup,
            [partitionId]: titleCode
        }
    }

    // 刷新
    refresh = () => {
        this.spinning = true;
        this.loadPartitionList();
    }

    ngOnInit() {
        this.loadInitData();
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
        if (this.paperMessage.sumScore != 0 && this.paperMessage.examScore >= this.paperMessage.sumScore) {
            return tipMessage('抽题总分数已超过限制值！');
        } else {
            this.isVisible = true;
            this._validateForm = this.fb.group({
                partitionName: ['单选题'],
                customname: ['', [Validators.required]],
                orderCode: ['R'],
                titleCode: [this.sampleTitleCode],
                partitionDesc: ['']
            })
        }
    }

    openChange = () => {
        const params = this._validateForm.controls;
        // tslint:disable-next-line:no-unused-expression
        this._validateForm && this._validateForm.get(`customname`).setValue(params.partitionName.value);
    }

    handleOk = (e) => {
        this.isVisible = false;
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
        })
    }

    handleCancel = (e) => {
        this.isVisible = false;
        this.addeditparId = undefined;
    }
    // 添加分区表单提交（添加分区）
    _submitForm = ($event, value) => {
        $event.preventDefault();
        if (!value.partitionName && !value.customname) {
            // tslint:disable-next-line:forin
            // for (const key in this._validateForm.controls) {
            //     this._validateForm.controls[key].markAsDirty();
            // }
            return tipMessage('请按要求选择或填写分区！');
        } else {
            // 如果没有ID就是添加分区有分区ID就是修改分区
            this.addpartitionstate = true
            if (this.addeditparId) {
                let params = {
                    partitionId: this.addeditparId,
                    partitionName: value.customname ? value.customname : value.partitionName,
                    partitionDesc: value.partitionDesc,
                    orderCode: value.orderCode,
                    isMustAnswer: value.isMustAnswer,
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
                    tipMessage(err); this.addpartitionstate = false
                })
            } else {
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
                    this.loadInitData();
                    this.addeditparId = undefined;
                    this.addpartitionstate = false;
                }, err => {
                    this.addpartitionstate = false;
                    tipMessage(err)
                })
            }
        }
    };
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
                    tipMessage('删除成功！', 'success');
                    self.loadInitData();
                }, err => {
                    tipMessage(err);
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
            content: '确定要删除此试题！',
            okText: '确定',
            cancelText: '取消',
            showConfirmLoading: true,
            zIndex: 1003,
            // 弹窗操作
            onOk(e) {
                // 请求删除的api
                self.spinning = true;
                self.exampaperservice.deleteQuestion(params).subscribe(res => {
                    self.loadPartitionList();
                    tipMessage('删除成功！', 'success')
                })
            },
            onCancel(e) {
            }
        });
    }
    // 手工抽题
    manualdrawing = (partitionId, type) => {
        if (this.paperMessage.sumScore != 0 && this.paperMessage.examScore >= this.paperMessage.sumScore) {
            tipMessage('没有多余的分数去抽题')
        } else {
            this.route.navigate([`/exam/exam-paper/takquestionpaper`, {
                partitionId: partitionId,
                type: type,
                sumScore: this.paperMessage.sumScore, // 试卷总分
                examScore: this.paperMessage.examScore, // 已选试题分数
                epName: this.paperMessage.epName,
                isPutout: this.paperMessage.isPutout,
                epId: this.queryParams.epId,
                titleCode: this.queryParams.titleCode,
            }])
        }
    }

    // 随机抽题
    randomquestions = (partitionId, type) => {
        if (this.paperMessage.sumScore != 0 && this.paperMessage.examScore >= this.paperMessage.sumScore) {
            tipMessage('没有多余的分数去抽题')
        } else {
            this.route.navigate([`/exam/exam-paper/strategyrandom`, {
                partitionId: partitionId,
                type: type,
                epId: this.queryParams.epId,
                epName: this.paperMessage.epName,
                isPutout: this.paperMessage.isPutout,
                sumScore: this.paperMessage.sumScore, // 试卷总分
                examScore: this.paperMessage.examScore, // 已选试题分数
                titleCode: this.titleCode,
            }])
        }
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

    // 单个试题进行修改分区
    modifyparition = (event, id) => {
        this.isVisible = true;
        // 修改分区
        this._validateForm = this.fb.group(this.partitionData)
        // 获取分区信息
        this.exampaperservice.getPartitionMessage(id).subscribe((res) => {
            this.addeditparId = id;
            let resobj = { ...res }
            // 进行判断返回的res中partitionName的值在基本类型题目中是否
            if (this.basequestionType.indexOf(res.partitionName) != -1) {
                resobj = {
                    ...res,
                    customname: ''
                }
            } else {
                resobj = {
                    ...res,
                    customname: res.partitionName,
                    partitionName: ''
                }
            }
            // tslint:disable-next-line:forin
            for (let key in this.partitionData) {
                let bool = key == 'customname';
                this.partitionData[key] = [resobj[key], bool ? [Validators.required] : []];
            }
            this._validateForm = this.fb.group(this.partitionData)
            this._validateForm = this.fb.group(this.partitionData)
        }, err => {
            tipMessage(err)
        })
    }
    // 预览试卷
    previewpaper = (event, id) => {
        this.route.navigate([`/exam/exam-paper/viewpaper`, id])
    }
    // 试题的导入(判断是编辑试卷的导入还是创建试卷的导入)
    importsingletest = (event, partitionId, type) => {
        this.route.navigate([`/exam/exam-paper/import`,
            {
                paperId: this.queryParams.epId,
                partitionId: partitionId,
                isPutout: this.queryParams.isPutout,
                epName: this.queryParams.epName
            }
        ])
    }
    // 完成返回试卷列表
    goPaperList = (event) => {
        this.route.navigate(['/exam/exam-paper'])
    }
    // 预览分区
    previewPartition = (event, partitionId) => {
        this.route.navigate([`/exam/exam-paper/previewpartition/${partitionId}`], { queryParams: { paperId: this.queryParams.epId } })
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
}
