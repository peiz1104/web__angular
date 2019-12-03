/*
 * @Author: mozhengqian
 * @Date: 2017-11-09 13:43:56
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2017-12-03 17:23:27
 */
import { Component, OnInit } from '@angular/core';
import { TestQuestionService } from 'app/exam/service/test-question.service';
import { Router, ActivatedRoute } from '@angular/router';
import {
    FormBuilder,
    FormGroup,
    Validators,
    FormControl
} from '@angular/forms';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';

@Component({
    selector: 'spk-test-readingcomprehension-questions-list',
    templateUrl: './test-readingcomprehension-questions-list.component.html',
    styleUrls: ['./test-readingcomprehension-questions-list.component.scss']
})
export class TestReadingcomprehensionQuestionsListComponent implements OnInit {
    allData: any = {};
    columns: any = [// knowledgeId
        { title: '题干', tpl: 'casual', style: { 'max-width': '30%', width: '30%' } },
        { title: '类型', data: 'typeName', style: { 'max-width': '30%', width: '30%' } },
        { title: '时长', tpl: 'answerTime', style: { 'max-width': '100px' } },
        { title: '分数', tpl: 'score', style: { 'max-width': '100px' } },
        { title: '操作', tpl: 'option' },
    ];
    // selection: any[];
    _searchForm: FormGroup;
    isPaper: any;
    viewurl: string = "";
    url: string;
    questionType: any = [];
    selectedOption: any = {};
    params: any;
    queId: any = '';
    qbId: any = '';
    synVisible: boolean = false;
    knowledgeId: any = '';
    childQueList: any[];
    modalVisible: boolean = false;
    tableLoading: boolean = false;
    userGroupId: any;
    epId: any;
    constructor(
        private router: Router,
        public activatedRoute: ActivatedRoute,
        private fb: FormBuilder,
        private confirmServ: NzModalService,
        private nzMessageService: NzMessageService,
        private testQuestionService: TestQuestionService
    ) { }

    ngOnInit() {
        this.knowledgeId = this.activatedRoute.snapshot.params['knowledgeId'];
        this.userGroupId = this.activatedRoute.snapshot.params['userGroupId'];
        this.queId = this.activatedRoute.snapshot.params['queId'];
        this.isPaper = this.activatedRoute.snapshot.params['isPaper'] == 'true';
        this.epId = this.activatedRoute.snapshot.params['epId'];
        this.url = this.activatedRoute.snapshot.params['url'];
        this.qbId = this.activatedRoute.snapshot.params['qbId'];
        this._searchForm = this.fb.group({
            casual: [''],
            typeCode: [''],
            subtypeCodemitedBy: [''],
            diffCode: [''],
            lastModifiedDate: [''],
        });
        this.testQuestionService.getQuestionType().subscribe(data => {
            this.questionType = data;
            this.selectedOption = data[0];
        });
        this.loadData();
    }
    handleSynVisible() {
        this.synVisible = !this.synVisible;
    }
    loadData(param?: any) {
        this.tableLoading = true;
        if (this.isPaper && this.isPaper === true) {
            this.testQuestionService.getPaperQuestionInfo(this.queId).subscribe(data => {
                this.allData = data;
                this.childQueList = data.childList;
                this.tableLoading = false;
            });
        } else {
            this.testQuestionService.getQuestionInfo(this.queId).subscribe(data => {
                this.allData = data;
                this.tableLoading = false;
                this.childQueList = data.childList;
            })
        }
    }
    // _submitForm($event, value) {
    //   $event.preventDefault();
    //   // tslint:disable-next-line:forin
    //   console.log(value);
    //   console.log(this.selection);
    //   return;
    // }
    // resetForm($event: MouseEvent) {
    //   $event.preventDefault();
    //   this._searchForm.reset();
    //   // tslint:disable-next-line:forin
    //   for (const key in this._searchForm.controls) {
    //     this._searchForm.controls[key].markAsPristine();
    //   }
    // }
    goAdd(data) {
        let obj = {
            'typeCode': this.selectedOption.typeCode ? this.selectedOption.typeCode : '',
            'baseCode': this.selectedOption.baseCode,
            'knowledgeId': this.knowledgeId ? this.knowledgeId : '',
            'userGroupId': this.userGroupId,
            'typeName': this.selectedOption.typeName,
            'parentId': this.queId,
            'queId': this.queId,
            'qbId': this.qbId,
            'isZt': true,
            'url': `rqList`
        }
        this.router.navigate([`/exam/test-question/add`, obj]);
    }
    deleteTest(row) {
        this.confirmServ.confirm({
            title: '是否确认删除？',
            content: '',
            zIndex: 1003,
            onOk: () => {
                let params = { ids: [`${row.queId}`], isChild: true };
                if (row.qbId) {
                    params['qbId'] = row.qbId;
                    // params = {
                    //   ...params,
                    //   'qbId': row.qbId
                    // };
                }
                this.testQuestionService.questionDelete(params).subscribe(item => {
                    this.loadData();
                    this.nzMessageService.success('删除成功!');
                }, error => {
                    this.nzMessageService.error(error);
                });
            },
            onCancel() {
            }
        });
    }
    changeModal = (id?) => {
        this.modalVisible = !this.modalVisible;
        if (this.modalVisible) {
            this.viewurl = this.isPaper ? '/api/exam/paper/part/question/get' : `/api/exam/question/${id}`;
            this.params = {
                queId: id
            };
        }
    }
    goBackToPaper() {
        this.router.navigate([`/exam/exam-paper/editpaper/${this.epId}/addtest`, {
            epId: this.epId
        }]);
    }
    goBackToTestList() {
        this.router.navigate(['/exam/test-question/list', {
            knowledgeId: this.knowledgeId,
            userGroupId: this.userGroupId
        }]);
    }
    editTest(data) {
        let obj = {
            'qbId': this.qbId || data.qbId,
            'typeCode': data.typeCode ? data.typeCode : '',
            'isZt': true,
            'knowledgeId': this.knowledgeId ? this.knowledgeId : '',
            'parentId': this.queId,
            'userGroupId': this.userGroupId,
            'url': `rqList`,
        }
        if (this.isPaper) {
            obj['isPaper'] = this.isPaper;
            obj['epId'] = this.epId;
            // obj = {
            //   ...obj,
            //   'isPaper': this.isPaper,
            //   'epId': this.epId
            // };
        }
        this.router.navigate([`/exam/test-question/edit/${data.queId}`, obj]);
    }
    backToList() {
        this.router.navigate(['exam/test-question/list', {
            knowledgeId: this.knowledgeId,
            userGroupId: this.userGroupId
        }]);
    }
    backToType() {
        this.router.navigate(['/exam/exam-paper/editpaper/' + this.epId + '/addtest', { 'epId': this.epId }]);
    }
}
