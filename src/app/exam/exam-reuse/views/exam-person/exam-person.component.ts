import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CuiPagination } from 'console-ui-ng';
import { ExaminationService } from '../../service/examination.service';
import { tipMessage } from 'app/account/entity/message-tip';

@Component({
    selector: 'spk-exam-person',
    templateUrl: './exam-person.component.html',
    styleUrls: ['./exam-person.component.scss']
})
export class ExamPersonComponent implements OnInit {
    columns: any[] = [
        {
            title: '用户名',
            data: 'userName',
            styleClass: 'text-center'
        }, {
            title: '姓名',
            data: 'name',
            styleClass: 'text-center'
        }, {
            title: '第几次考试',
            tpl: 'examSeq',
            styleClass: 'text-center'
        }, {
            title: '考试状态',
            tpl: 'examStatusStr',
            styleClass: 'text-center'
        }, {
            title: '所属组织',
            data: 'userGroup.name',
            styleClass: 'text-center'
        }
    ];
    columnsData: any[] = [];
    _searchForm: FormGroup;
    selection: any[];
    searchtext: any[];
    userName: any;
    createOrEditor: boolean = true;
    loading: boolean;
    examId: number;
    pagination: CuiPagination;
    constructor(private fb: FormBuilder, private route: ActivatedRoute,
        private examinationService: ExaminationService,
    ) { }

    ngOnInit() {
        this._searchForm = this.fb.group({
            name: [],
            userName: []
        });
        this.route.data.subscribe(
            (obj: { examination: any }) => {
                console.log(obj);
                this.createOrEditor = obj.examination ? false : true;
                this.examId = obj.examination.examId;
                // tslint:disable-next-line:no-unused-expression
                this.examId && this.loadData()
            }
        )
    }
    _submitForm($event, value) {
        $event.preventDefault();
        this.searchtext = value.name;
        this.userName = value.userName;
        this.loadData();
    }
    loadData(page?: CuiPagination) {
        this.loading = true;
        this.pagination = page;
        let params = {
            name: this.searchtext || '',
            userName: this.userName || '',
            examId: this.examId,
            page: page ? page.number : 0,
            size: page ? page.size : 10,
        }
        this.examinationService.getJoinUser(params).subscribe(
            data => {
                this.columnsData = data.content;
                this.loading = false;
                this.pagination = data;
            },
            err => {
                tipMessage(err)
            }
        )
    }
}
