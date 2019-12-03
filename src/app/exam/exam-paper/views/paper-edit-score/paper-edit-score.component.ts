import { Component, OnInit, ViewChild } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { ExamPaperService } from 'app/exam/service/exam-paper.service';
import { DataTableComponent } from 'console-ui-ng';
import { tipMessage } from 'app/account/entity/message-tip';

@Component({
    selector: 'spk-paper-edit-score',
    templateUrl: './paper-edit-score.component.html',
    styleUrls: ['./paper-edit-score.component.scss']
})

export class PaperEditScoreComponent implements OnInit {
    queryParams: any; // 继承上个页面的参数
    nzSpinning: boolean = false; //
    testListData: any = []; // table数据
    isVisible: boolean = false;
    value: any;
    inputType: any = 'S';
    selection: any = []; // 选中的试题
    isLoading: boolean = false;
    previewQuesModel: boolean = false;
    previewIds: any = {};
    params: any = {// 修改分值和修改时长的发送数据
        partitionId: [''],
        qvDto: []
    };

    columns: any = [
        { title: '题目内容', tpl: 'casual', style: { 'max-width': '200px', width: '200px' } },
        { title: '试题类型', data: 'typeName' },
        { title: '所属组织', data: 'dirName', styleClass: 'text-center' },
        { title: '试题分类', data: 'konwName', styleClass: 'text-center' },
        { title: '试题分数', data: 'score', styleClass: 'text-right' },
        { title: '答题时长（秒）', data: 'answerTime', styleClass: 'text-center' },
        { title: '创建时间', tpl: 'createdDate', styleClass: 'text-right' },
        { title: '创建人', data: 'userName', styleClass: 'text-center' }
    ];

    @ViewChild("tableHandle") tableHandle: DataTableComponent;

    constructor(
        private exampaperservice: ExamPaperService,
        private routeInfo: ActivatedRoute,
        private route: Router,
    ) { }

    ngOnInit() {
        this.queryParams = this.routeInfo.snapshot.params;
        this.params.partitionId = this.queryParams.partitionId;
        this.loadData();
    }
    // 加载初始数据
    loadData() {
        let { queIds } = this.queryParams;
        this.nzSpinning = true;
        this.exampaperservice.postSelectQuestion(queIds).subscribe(res => {// 获取父分类api
            this.testListData = res;
            res.forEach(item => {
                this.params.qvDto.push({
                    queId: item.queId,
                    score: null,
                    answerTime: null
                })
            });
            this.nzSpinning = false;
        }, err => {
            this.nzSpinning = false;
            tipMessage(err)
        })
    }
    // 打开modal
    showModal = (value) => {
        if (this.selection.length) {
            let flag;
            if (value == 'S') {
                this.selection.forEach(item => {
                    if (item.baseCode == 'YDLJ') {
                        flag = true
                    }
                });
            }
            if (flag) {
                tipMessage('阅读理解题修改分数无效！', 'warning', 2000);
                setTimeout(() => {
                    this.isVisible = true;
                }, 1000)
            } else {
                this.isVisible = true;
            }
            this.inputType = value;
        } else {
            return tipMessage('请先选择一条试题', 'warning');
        }
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

    goBack = () => {
        window.history.back();
    }

    // 关闭modal
    handleCancel = () => {
        this.isVisible = false;
    }

    // 弹出框确认
    handleOk = () => {
        if (this.value) {
            let flag = true;
            let infoStr = ''
            const { qvDto } = this.params;
            const testListData = this.testListData.concat();
            this.selection.forEach((data, index) => {
                qvDto.forEach((item, qvIndex) => {
                    if (data.queId == item.queId) {
                        if (this.inputType == 'S') {
                            this.params.qvDto[qvIndex].score = this.value;
                        } else {
                            this.params.qvDto[qvIndex].answerTime = this.value;
                        }
                    }
                });
            });
            testListData.forEach((ele, index) => {
                this.selection.forEach((data) => {
                    if (ele.queId == data.queId) {
                        if (this.inputType == 'S') {
                            let score = Number.parseFloat(this.value) * 10 + '';
                            if (!(/^-?\d*\.\d+$/.test(score))) {
                                if (data.baseCode != 'YDLJ') {
                                    this.testListData[index] = {
                                        ... this.testListData[index],
                                        score: this.value
                                    }
                                }
                            } else {
                                infoStr = '分数只允许输入一位小数！'
                                flag = false;
                            }
                        } else {
                            // console.log(/^-?\d*\.\d+$/.test(this.value));
                            if (this.value >= 1 && !(/^-?\d*\.\d+$/.test(this.value))) {
                                this.testListData[index] = {
                                    ... this.testListData[index],
                                    answerTime: this.value
                                }
                            } else {
                                infoStr = '时长不能小于1或者时长应为整数！'
                                flag = false;
                            }
                        }
                    }
                })
            });
            if (flag) {
                this.isVisible = false;
                tipMessage('修改成功！', 'success');
                this.selection = [];
                this.tableHandle.checkAll(false);
            } else {
                tipMessage(infoStr, 'warning');
            }
            this.value = null;
        } else {
            return tipMessage('请输入一个有效的数值！', 'warning');
        }
    }

    // 提交修改的数据
    submitData = () => {
        this.isLoading = true;
        const { epId } = this.queryParams;
        const params = this.params;
        this.exampaperservice.addQuestion(params).subscribe(res => {// 获取父分类api
            tipMessage('添加试题成功', 'success');
            this.isLoading = false;
            this.route.navigate([`/exam/exam-paper/editpaper/${epId}/addtest`, {
                epId: epId,
                userGroupId: this.queryParams['userGroupId'],
                name: this.queryParams['name']
            }])
        }, err => {
            this.nzSpinning = false;
            tipMessage(err);
        })
    }
}
