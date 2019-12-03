import { NzMessageService } from 'ng-zorro-antd';
import { UgcActivityVote } from './../../../entity/ugc-activity-vote';
import { ActivatedRoute } from '@angular/router';
import { UgcActivity } from './../../../entity/ugc-activity';
import { UgcActivityVoteService } from './../../../service/ugc-activity-vote.service';
import { Course } from './../../../../learning/course/entity/course';
import { CuiLayer, Column } from 'console-ui-ng';
import { Component, OnInit } from '@angular/core';
import { Pagination } from 'app/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
    selector: 'spk-ugc-activity-vote-list',
    templateUrl: './ugc-activity-vote-list.component.html',
    styleUrls: ['./ugc-activity-vote-list.component.scss']
})
export class UgcActivityVoteListComponent implements OnInit {

    ugcActivity: UgcActivity;
    searchList: any;
    data: Pagination<UgcActivityVote>;
    loading: boolean;
    selection: UgcActivityVote[];
    _searchForm: FormGroup;

    showWorks: boolean;

    columns: Column[] = [
        { title: '标题', tpl: 'title' },
        { title: '开始时间', tpl: 'startDate' },
        { title: '结束时间', tpl: 'endDate' },
        { title: '作品数量', tpl: 'workCount' },
        { title: '操作', tpl: 'rowActions', styleClass: 'text-right' },
    ];

    constructor(
        private route: ActivatedRoute,
        private ugcActivityVoteService: UgcActivityVoteService,
        private fb: FormBuilder,
        private layer: CuiLayer,
        private message: NzMessageService
    ) { }

    ngOnInit() {
        this.route.data.subscribe((data: { ugcActivity: UgcActivity }) => {
            this.ugcActivity = data.ugcActivity;
            this.initSearchForm();
            this.loadData();
        });
    }

    loadData() {
        let params = {
            ...this.searchList,
            page: this.data ? this.data.number : 0,
            size: this.data ? this.data.size : 10,
            // sort: page && page.sort ? page.sort : null
        };
        this.ugcActivityVoteService.getAllOfPage(this.ugcActivity.id, params).subscribe(
            data => {
                this.data = data;
            }
        );
    }
    initSearchForm() {
        this._searchForm = this.fb.group({
            searchText: [],
        });
    }
    _submitForm($event, value) {
        $event.preventDefault();
        this.searchList = value;
        this.loadData();
    }

    delete(votes: UgcActivityVote[]) {
        votes = votes ? votes : this.selection;
        if ( !votes || votes.length <= 0) {
            this.message.warning('请选择需要删除的大众评选');
            return;
        }
        this.layer.confirm(
            '确认要删除选中的大众评选吗？',
            () => {
                this.ugcActivityVoteService.deleted(this.ugcActivity.id, votes.map(it => it.id)).subscribe(
                    () => {
                        this.message.success('删除成功');
                        this.loadData();
                    },
                    err => { this.message.error(err.message); }
                );
            }
        );
    }
}
