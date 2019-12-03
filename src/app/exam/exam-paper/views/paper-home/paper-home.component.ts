/*
 * @Author: peimingjun
 * @Date: 2017-11-01 14:17:51
 * @Last Modified by: peimingjun
 * @Last Modified time: 2018-07-03 21:32:01
 */

import { Component, OnInit, Output, EventEmitter, Input, OnChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ExamPaperService } from 'app/exam/service/exam-paper.service';
import { Pagination } from 'app/core/entity/pagination';
import { NzModalService } from 'ng-zorro-antd';
import { CuiTreeNode, CuiTreeConfig } from 'console-ui-ng';
import { TestQuestionService } from 'app/exam/service/test-question.service';
import { User } from './../../entity/user';
import { UserGroup } from './../../entity/user-group';
import { AccountService } from 'app/account/service/account.service';
import { Observable } from 'rxjs/Observable';
import * as moment from 'moment';
import { tipMessage } from 'app/account/entity/message-tip';
import {
    FormBuilder,
    FormGroup,
    Validators,
    FormControl
} from '@angular/forms';
import * as _ from 'lodash';
const { isArray } = _;
@Component({
    selector: 'spk-paper-home',
    templateUrl: './paper-home.component.html',
    styleUrls: ['./paper-home.component.scss']
})
export class PaperHomeComponent implements OnInit {
    // validateForm: FormGroup;
    columns: any = [
        { title: '试卷名称', tpl: 'epName', styleClass: 'text-left', style: { 'max-width': '150px' } },
        { title: '组织机构', data: 'userGroupName', styleClass: 'text-left' },
        { title: '限制分值', tpl: 'sumScore', styleClass: 'text-center' },
        { title: '试卷总分', data: 'examScore', styleClass: 'text-center' },
        { title: '发布状态', tpl: 'isPutout', styleClass: 'text-center' },
        { title: '试卷类型', tpl: 'type', styleClass: 'text-center' },
        { title: '组卷方式', tpl: 'titleCode', styleClass: 'text-center' },
        { title: '创建人', data: 'createdStrName', styleClass: 'text-center' },
        { title: '创建时间', tpl: 'createdTime', styleClass: 'text-center' },
        { title: '关联考试', tpl: 'relexam', styleClass: 'text-center' },
        { title: '编辑', tpl: 'editactions', styleClass: 'text-center' },
        { title: '预览', tpl: 'viewactions', styleClass: 'text-center' },
        // { title: '添加考试', tpl: 'addexamactions', styleClass: 'text-center' },
        { title: '操作', tpl: 'actions', styleClass: 'text-center' },
    ];
    searchOptions = [
        { value: '1', label: '删除', purview: 'EXAM:PAPER:REMOVE' },
        { value: '2', label: '导出Excel试卷', title: '试题包含普通文本、富文本两种类型数据信息。普通文本为纯文本标准字体。适合EXCEL、WORD形式操作，富文本为以w3c标准的html格式文本内容，包含字体样式、图片等多元化信息，适合WORD形式操作，不要使用EXCEL形式操作。', purview: 'EXAM:PAPER:EXPORT' },
        { value: '3', label: '导出Word试卷', purview: 'EXAM:PAPER:EXPORT' },
        { value: '4', label: '复制试卷', purview: 'EXAM:PAPER:COPY' },
        { value: '5', label: '发布', purview: 'EXAM:PAPER:PUBLISH' },
        { value: '6', label: '取消发布', purview: 'EXAM:PAPER:PUBLISH' }
    ];
    _searchForm: FormGroup;
    selection: any[] = [];
    testListData: any;
    switchExam: any = {};
    isVisibleMove: boolean = false;
    moveStateLoading: boolean = false;
    spinning: boolean = true;
    userGroup: UserGroup;
    managerGroup: any = [];
    accountInfo: any = {};
    siteId: any;
    previewModel: boolean = false;
    previewId: any;
    previewIds: any = {};
    epType: any = []; // 试卷类型
    // nodesTree: any = [{ id: '', label: '全部', selected: true, expanded: true, hasChildren: true }];
    _selectTreeId = undefined;
    // treeConfig: any;
    @Output() selectionChange: EventEmitter<any> = new EventEmitter<any>();
    users: User[];
    constructor(
        private fb: FormBuilder,
        private confirmServ: NzModalService,
        private route: Router,
        private routeInfo: ActivatedRoute,
        private exampaperservice: ExamPaperService,
        private accountInfoService: AccountService,
        private testQuestionService: TestQuestionService
    ) {
        this.routeInfo.queryParams.subscribe(data => {
            if (data.userGroupId && data.name) {
                this.managerGroup = {
                    id: data.userGroupId,
                    name: data.name
                }
                this.loadData();
            } else {
                this.accountInfoService.findUser().subscribe(
                    user => {
                        this.managerGroup = user.managerGroup;
                        this.loadData()
                    }
                )
            }
        });
    }

    loadData(page?: Pagination<any>) {
        this.spinning = true;
        let params = {
            // createdBy: this.switchExam.createdBy,
            page: page ? page.number : 0,
            size: page ? page.size : 10,
        };
        if (this.managerGroup && this.managerGroup.id) {
            params['userGroupId'] = this.managerGroup && this.managerGroup.id
        }
        if (this.switchExam) {
            if (this.switchExam.isPutout !== '') {
                params['isPutout'] = this.switchExam.isPutout
            }
            if (this.switchExam.epName) {
                params['epName'] = this.switchExam.epName.trim()
            }
            if (this.switchExam.creatTimeStart) {
                // params['creatTimeStart'] = moment(this.switchExam.creatTimeStart).unix()
                params['creatTimeStart'] = this.switchExam.creatTimeStart;
            }
            if (this.switchExam.creatTimeEnd) {
                // params['creatTimeEnd'] = moment(this.switchExam.creatTimeEnd).unix()
                params['creatTimeEnd'] = this.switchExam.creatTimeEnd
            }
            if (this.switchExam.epType !== '') {
                params['epType'] = this.switchExam.epType;
            }
        }

        this.exampaperservice.getPaperList(params).subscribe(
            (testListData) => {
                this.spinning = false;
                this.testListData = testListData
                // this.selection = [];
                this.switchExam = null;
                console.log('testListData', testListData)
            }, err => {
                tipMessage(err);
                this.spinning = false;
            }
        );
    }

    // 清除表单值
    reset = () => {
        this._searchForm = this.fb.group({
            epName: ['', [this.trimCheck]],
            creatTimeEnd: ['', [this.confirmEndDateValidator]],
            creatTimeStart: ['', [this.confirmStartDateValidator]],
            epType: [''],
            isPutout: ['']
        });
    }

    ngOnInit() {
        this._searchForm = this.fb.group({
            epName: ['', [this.trimCheck]],
            creatTimeEnd: ['', [this.confirmEndDateValidator]],
            creatTimeStart: ['', [this.confirmStartDateValidator]],
            epType: [''],
            isPutout: ['']
        });
        this.exampaperservice.getDownDrag({ dicType: 'PAPER_TYPE' }).subscribe(
            (epType) => {
                this.epType = epType;
            }, err => {
                tipMessage(err);
            }
        );
    }

    // 搜索的加载列表
    _submitForm($event, value) {
        $event.preventDefault();
        // tslint:disable-next-line:forin
        this.switchExam = value;
        this.loadData();
        return;
    }
    // 新建试卷
    createpaper = (value, type) => {
        if (this.managerGroup && this.managerGroup['id'] && this.managerGroup['name']) {
            this.route.navigate(['/exam/exam-paper/createpaper'], {
                queryParams:
                    {
                        type: type,
                        userGroupId: this.managerGroup.id,
                        name: this.managerGroup.name
                    }
            })
        } else {
            tipMessage('请选择组织机构')
        }
    }
    // 进行试卷的查看
    preview = (value) => {
        this.previewModel = true;
        this.previewIds['examPaperId'] = value[0]['epId'];
    }
    // 进行修改试卷
    editpaper = (value, type) => {
        this.route.navigate([`/exam/exam-paper/editpaper/${value[0]['epId']}`, this.managerGroup ? {
            userGroupId: this.managerGroup.id,
            name: this.managerGroup.name
        } : {}]);
    }
    // 查看关联考试
    viewpaper = (value) => {
        this.route.navigate([`/exam/exam-paper/relatedtest/${value[0]['epId']}`, this.managerGroup ? {
            userGroupId: this.managerGroup.id,
            name: this.managerGroup.name
        } : {}]);
    }
    // 创建考试（如果没有分区不能进行创建考试）/exam/examination/add
    addexam = (value) => {
        let id = value[0]['epId'];
        this.route.navigate([`/exam/examination/edit/${id}/add`], { queryParams: { paperId: value[0]['epId'] } })
    }
    // 多项操作方法 '1', label: '删除' ； '2',  '导出Excel试卷'   '3', label: '导出Word试卷' , '4', label: '复制试卷'

    mutiple = (value, row) => {
        // 删除操作
        if (value == 1) {
            // 删除试卷;如果试卷已发布就不能进行删除
            if (row.isPutout) {
                return tipMessage('试卷已发布不能删除');
            } else {
                // 调用删除的api
                let self = this;
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
                        self.exampaperservice.deletePaper(row.epId).subscribe((res) => {
                            tipMessage('删除成功', 'success');
                            self.loadData();
                            self.selection = [];
                        }, err => {
                            self.spinning = false;
                            tipMessage(err);
                        })
                    },
                    onCancel(e) {
                    }
                });
            }
        }
        // 导出Excel试卷
        if (value == 2) {
            this.spinning = true;
            this.exampaperservice.exportExcelPaper(row.epId).subscribe((res) => {
                let url;
                if (!window.location.origin) {
                    // tslint:disable-next-line:max-line-length
                    url = url = window.location.protocol + "//" + window.location.hostname + (window.location.port ? ':' + window.location.port : '');
                } else {
                    url = window.location.origin;
                }
                window.open(`${url}/api/exam/paper/exort_exam_excel?epid=${row.epId}`)
                // this.selection = [];
                this.spinning = false;
            }, err => {
                this.spinning = false;
                tipMessage(err);
            })

        }
        // 导出word试卷
        if (value == 3) {
            this.spinning = true;
            this.exampaperservice.exportWorldPaper(row.epId).subscribe((res) => {
                let url;
                if (!window.location.origin) {
                    // tslint:disable-next-line:max-line-length
                    url = window.location.protocol + '//' + window.location.hostname + (window.location.port ? ':' + window.location.port : '');
                } else {
                    url = window.location.origin;
                }
                window.open(`${url}/api/exam/paper/exort_exam_word?epid=${row.epId}`)
                // this.selection = [];
                this.spinning = false;
            }, err => {
                this.spinning = false;
                tipMessage(err);
            })
        }
        // 复制试卷
        if (value == 4) {
            this.spinning = true;
            this.exampaperservice.copyPaper(row.epId).subscribe((res) => {
                tipMessage('复制试卷成功', 'success');
                this.loadData();
                // this.selection = [];
            }, err => {
                this.spinning = false;
                tipMessage(err);
            });
        }
        // 发布
        if (value == 5) {
            this.release('release', row);
        }
        // 取消发布
        if (value == 6) {
            this.norelease('norelease', row);
        }
    }
    // 发布与取消发布
    release = (value, row) => {
        if (row.examScore != 0) {
            if (row.sumScore == 0 || (row.sumScore != 0 && row.examScore == row.sumScore)) {
                if (row.isPutout) {
                    return tipMessage('试卷已经发布无需再次发布！');
                } else {
                    this.exampaperservice.releaseOrNoPaper({ examPaperId: row.epId, type: value }).subscribe((res) => {
                        tipMessage('发布成功！', 'success');
                        this.loadData()
                        // this.selection = [];
                    }, err => { tipMessage(err); })
                }
            } else {
                return tipMessage('试卷总分与试卷限制分值不等！');
            }
        } else {
            return tipMessage('试卷还没有抽题！');
        }
    }
    // 取消发布
    norelease = (value, row) => {
        if (!row.isPutout) {
            return tipMessage('试卷未发布无需取消发布！');
        } else {
            this.exampaperservice.releaseOrNoPaper({ examPaperId: row.epId, type: value }).subscribe((res) => {
                tipMessage('取消发布成功！', 'success');
                this.loadData();
                // this.selection = [];
            }, err => { tipMessage(err) })
        }
    }
    // 迁移试卷
    movePaper = (event) => {
        if (this.selection.length) {
            this.isVisibleMove = true;
        } else {
            return tipMessage('请选择要迁移的试卷！');
        }
    }
    // 进行选择
    onSelectionChange(selection) {
        let datas = selection.map(it => it.data);
        // this.selectionChange.emit(datas);
    }
    handleOk = (e) => {
        this.moveStateLoading = true;
        // console.log(this.userGroup);
        if (this.userGroup) {
            // let siteId = this.userGroup.id;
            let arrayId = this.selection.map((value: any, index: number) => {
                return value.epId
            })
            // let paperId = arrayId.join(',');
            this.exampaperservice.movePaper({
                epIds: arrayId,
                userGroupId: this.userGroup.id
            }).subscribe((res) => {
                this.moveStateLoading = false;
                this.isVisibleMove = false;
                this.loadData();
                // this.selection = [];
            }, err => { this.moveStateLoading = false; tipMessage(err); })
        } else {
            this.moveStateLoading = false;
            return tipMessage('请选择组织');
        }
    }

    handleCancel = (e) => {
        this.isVisibleMove = false;
    }
    // 获取组织数据
    onUgSelectionChange(ugs) {
        ugs = ugs && isArray(ugs) ? ugs : (ugs ? [ugs] : []);
        let ug = ugs[0];
        this.userGroup = ug;
    }
    // 整卷导入
    volumeimport(event) {
        if (this.managerGroup && this.managerGroup['id'] && this.managerGroup['name']) {
            this.route.navigate(['/exam/exam-paper/volumeimport', {
                userGroupId: this.managerGroup.id,
                name: this.managerGroup.name
            }])
        } else {
            tipMessage('请选择组织机构！')
        }
    }

    logSelectGroup(e) {
        this.spinning = true;
        if (e.length) {
            this.siteId = e[0].id;
        }
        this.loadData();
    }

    // 预览试卷关闭模态框
    handleCancelViewModel = () => {
        this.previewModel = false;
        this.previewId = null;
    }

    // 预览试卷关闭模态框
    handleOkViewModel = () => {
        this.previewModel = false;
        this.previewId = null;
    }

    trimCheck = (control: FormControl): { [s: string]: boolean } => {
        if (control.value && !control.value.trim()) {
            return { confirm: true, error: true };
        }
    }

    getFormControl(name) {
        return this._searchForm.controls[name];
    }

    // 时间验证方法
    confirmEndDateValidator = (control: FormControl): { [s: string]: boolean } => {
        let controls = this._searchForm && this._searchForm.controls;
        if (controls) {
            const startdate = moment(controls[`creatTimeStart`].value).unix();
            if (control.value) {
                if (startdate > moment(control.value).unix()) {
                    this._searchForm.get(`creatTimeStart`).setValue(null);
                    tipMessage('结束时间不能小于开始时间！');
                    return;
                }
            }
        }
    }

    confirmStartDateValidator = (control: FormControl): { [s: string]: boolean } => {
        let controls = this._searchForm && this._searchForm.controls;
        if (controls) {
            const enddate = moment(controls[`creatTimeEnd`].value).unix();
            if (control.value) {
                if (enddate < moment(control.value).unix()) {
                    this._searchForm.get(`creatTimeEnd`).setValue(null);
                    tipMessage('结束时间不能小于开始时间！');
                    return;
                }
            }
        }
    }

}
