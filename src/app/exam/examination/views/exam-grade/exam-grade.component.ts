/*
 * @Author: majunfeng
 * @Date: 2017-11-03 10:29:21
 * @Last Modified by: longping
 * @Last Modified time: 2018-05-11 09:43:07
 */
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CuiPagination } from 'console-ui-ng';
import { ExaminationService } from '../../service/examination.service';
import { ExaminationManagementService } from 'app/exam/service/examination.service';
import * as moment from 'moment';
import { tipMessage } from 'app/account/entity/message-tip';

@Component({
    selector: 'spk-exam-grade',
    templateUrl: './exam-grade.component.html',
    styleUrls: ['./exam-grade.component.scss']
})
export class ExamGradeComponent implements OnInit {
    columns: any[] = [
        {
            title: '用户名',
            data: 'userName',
            styleClass: 'text-center'
        }, {
            title: '姓名',
            data: 'displayName',
            styleClass: 'text-center'
        }, {
            title: '所属组织',
            data: 'groupName',
            styleClass: 'text-center'
        }, {
            title: '进入考试时间',
            tpl: 'userStartTime',
            styleClass: 'text-center'
        }, {
            title: '交卷时间',
            tpl: 'userEndTime',
            styleClass: 'text-center'
        }, {
            title: '总分',
            data: 'examScore',
            styleClass: 'text-center'
        }, {
            title: '用户得分',
            data: 'score',
            styleClass: 'text-center'
        }, {
            title: '阅卷状态',
            tpl: 'markStatus',
            styleClass: 'text-center'
        }, {
            title: '复评状态',
            tpl: 'revieStatus',
            styleClass: 'text-center'
        }, {
            title: '通过状态',
            tpl: 'status',
            styleClass: 'text-center'
        }, {
            title: '操作',
            tpl: 'createdDate',
            styleClass: 'text-center'
        }
    ];
    columnsData: any[] = [];
    _searchForm: FormGroup;
    selection: any[];
    createOrEditor: boolean = true;
    cache: any;
    managerGroup: any;
    gradeSearch: any = {}
    pagination: CuiPagination;
    loading: boolean = true;
    exportUrl: string = "/api/exam/manager/exportScore";
    id: any;
    constructor(
        private fb: FormBuilder,
        private route: ActivatedRoute,
        private examinationService: ExaminationService,
        private router: Router
    ) { }

    ngOnInit() {
        this._searchForm = this.fb.group({
            userName: [''],
            displayName: [''],
            status: [''],
            userStartTime: ['', this.confirmStartTimeValidator],
            userEndTime: ['', this.confirmEndTimeValidator],
            managerGroup: [],
        });
        this.route.data.subscribe(
            (obj: { examination: any }) => {
                console.log(obj);
                // this.createOrEditor = obj.examination ? false : true;
                this.cache = obj.examination;
                if (!this.cache.examId) {
                    this.examinationService.getOffering(obj.examination['id']).subscribe(
                        req => {
                            if (!req.examId) {
                                tipMessage("请先完善考试信息");
                                return;
                            } else {
                                this.cache.examId = req.examId;
                                this.loadData();
                            }
                        },
                        err => tipMessage(err)
                    )
                } else {
                    this.loadData();
                }
            }
        )
    }
    loadData(page?: CuiPagination) {
        let params = {
            examId: this.cache.examId,
      ...this.gradeSearch,
      page: page ? page.number : 0,
      size: page ? page.size : 10,
        }

    console.log('params', params);
        this.examinationService.getUserScoreList(params).subscribe(
            data => {
                this.columnsData = data.content;
                this.pagination = data;
                this.loading = false;
            },
            err => console.log(err)
        )
    }
    _submitForm($event, value) {
        $event.preventDefault()
        // tslint:disable-next-line:forin
        this.gradeSearch = {
            userName: value.userName,
            displayName: value.displayName,
            userStartTime: value.userStartTime,
            userEndTime: value.userEndTime,
            status: value.status,
            groupId: value.managerGroup && value.managerGroup.id
        }
        this.loading = true;
        this.loadData();
        return;
    }
    // 批量导出
    getExportUrl() {
        let newUrl = `${this.exportUrl}?examId=${this.cache.examId}`;
        if (this.selection && this.selection.length !== 0) {
            let list = [];
            this.selection.map(item => list.push(item.tcsId));
            newUrl += `&ids=${list}`;
        } else {
            for (let key in this.gradeSearch) {
                if (this.gradeSearch[key]) {
                    newUrl += `&${key}=${this.gradeSearch[key]}`
                }
            }
        }
        window.open(newUrl);
        // return newUrl;
    }

    // exportScore($event, value) {
    //   if (this.selection && this.selection.length !== 0) {
    //     // let list = [];
    //     // this.selection.map(item => list.push(item.tcsId));
    //     // this.exportUrl = `${this.exportUrl}?examId=${this.cache.examId}&ids=${list}`;
    //     console.log('this.exportUrl:', this.exportUrl);
    //     setTimeout(() => {
    //       document.forms['exportForm'].submit();
    //     }, 0);
    //   } else {
    //     this.examinationService.exportScore(value)
    //   }
    // }
    toReview(row) {
        // tslint:disable-next-line:max-line-length
        this.router.navigate([`/exam/examination/edit/${this.cache.id}/review`], { queryParams: { 'userId': row.userId, 'examId': row.examId } })
    }
    // 时间验证方法
    confirmEndTimeValidator = (control: FormControl): { [s: string]: boolean } => {
        let controls = this._searchForm && this._searchForm.controls;
        if (controls) {
            const startTime = moment(controls[`userStartTime`].value).unix();
            if (control.value) {
                if (startTime > moment(control.value).unix()) {
                    this._searchForm.get(`userStartTime`).setValue(null);
                    tipMessage('结束时间不能小于开始时间！', '', 5000);
                    return;
                }
            }
        }
    }
    // 时间验证方法
    confirmStartTimeValidator = (control: FormControl): { [s: string]: boolean } => {
        let controls = this._searchForm && this._searchForm.controls;
        if (controls) {
            const endTime = moment(controls[`userEndTime`].value).unix();
            if (control.value) {
                if (endTime < moment(control.value).unix()) {
                    this._searchForm.get(`userEndTime`).setValue(null);
                    tipMessage('结束时间不能小于开始时间！', '', 4000);
                    return;
                }
            }
        }
    }
}
