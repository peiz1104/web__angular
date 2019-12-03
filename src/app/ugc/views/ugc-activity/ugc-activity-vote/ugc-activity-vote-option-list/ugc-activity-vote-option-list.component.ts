import { NzMessageService } from 'ng-zorro-antd';
import { UgcActivityVoteOption } from './../../../../entity/ugc-activity-vote-option';
import { ActivatedRoute, Params } from '@angular/router';
import { UgcActivity } from './../../../../entity/ugc-activity';
import { UgcActivityWork } from './../../../../entity/ugc-activity-work';
import { UgcActivityVoteOptionService } from './../../../../service/ugc-activity-vote-option.service';
import { CuiLayer, Column } from 'console-ui-ng';
import { Component, OnInit } from '@angular/core';
import { Pagination } from 'app/core';
import { FormGroup, FormBuilder } from '@angular/forms';
@Component({
    selector: 'spk-ugc-activity-vote-option-list',
    templateUrl: './ugc-activity-vote-option-list.component.html',
    styleUrls: ['./ugc-activity-vote-option-list.component.scss']
})
export class UgcActivityVoteOptionListComponent implements OnInit {

    ugcActivity: UgcActivity;
    searchList: any;
    data: Pagination<UgcActivityVoteOption>;
    loading: boolean;
    selection: UgcActivityVoteOption[];
    voteId: number;
    columns: Column[] = [
        { title: '作品名称', tpl: 'title' },
        { title: '分类', tpl: 'category' },
        { title: '所有者', tpl: 'owner' },
        { title: '票数', tpl: 'votes' },
        { title: '操作', tpl: 'rowActions', styleClass: 'text-right' },
    ];
    _searchForm: FormGroup;
    _searchWorkForm: FormGroup;
    showWorks: boolean = false;
    workColumns: Column[] = [
        { title: '作品名称', tpl: 'title' },
        { title: '所有者', tpl: 'owner' },
        { title: '分类', tpl: 'category' }
    ];
    workData: Pagination<UgcActivityWork>;
    selectionWorks: UgcActivityWork[];
    constructor(
        private route: ActivatedRoute,
        private ugcActivityVoteOptionService: UgcActivityVoteOptionService,
        private fb: FormBuilder,
        private layer: CuiLayer,
        private message: NzMessageService
    ) { }

    ngOnInit() {
        this.route.data.subscribe((data: { ugcActivity: UgcActivity }) => {
            this.ugcActivity = data.ugcActivity;
            this.voteId = this.ugcActivity.voteId;
            if (!this.voteId) {
                return;
            }
            this.initSearchForm();
            this.loadData();
        });

        // this.route.data.subscribe((data: { ugcActivity: UgcActivity }) => {
        //     this.ugcActivity = data.ugcActivity;
        //     this.vote.id = this.voteId || data.ugcActivity.voteId;
        //     this.activityId = this.activityId ? this.activityId : data.ugcActivity.id;
        //     this.initForm();
        // })

        // this.route.params.subscribe(
        //     (params: Params) => {

        //     });
    }

    loadData() {
        let params = {
            ...this.searchList,
            page: this.data ? this.data.number : 0,
            size: this.data ? this.data.size : 10,
            // sort: page && page.sort ? page.sort : null
        };

        this.ugcActivityVoteOptionService.getAllOptionsOfPage(this.ugcActivity.id, this.voteId, params).subscribe(
            data => {
                this.data = data;
            }
        );
    }

    _submitForm($event, value) {
        $event.preventDefault();

        console.log("value", value);
        this.searchList = value;
        this.loadData();
    }

    loadWorksData() {
        let params = {
            ...this.searchList,
            page: this.workData ? this.workData.number : 0,
            size: this.workData ? this.workData.size : 10,
            // sort: page && page.sort ? page.sort : null
        };
        this.ugcActivityVoteOptionService.getAllUnselectedOfPage(this.ugcActivity.id, this.voteId, params).subscribe(
            workData => {
                this.workData = workData;
            },
            err => { this.layer.msg(err.message); }
        );
    }
    addWorks() {
        this.showWorks = true;
        this.initSearchWorkForm();
        this.loadWorksData();
    }
    initSearchForm() {
        this._searchForm = this.fb.group({
            searchText: [],
        });
    }
    initSearchWorkForm() {
        this._searchWorkForm = this.fb.group({
            searchText: [],
        });
    }
    confirm(event) {
        this.ugcActivityVoteOptionService.add(this.ugcActivity.id, this.voteId, this.selectionWorks.map(it => it.id)).subscribe(
            data => {
                // this.data = data;
                this.showWorks = false;
                this.loadData();
            },
           err => { this.layer.msg(err.message); }
        );
    }

    handleCancel(e) {
        this.showWorks = false;
    }


    delete(options: UgcActivityVoteOption[]) {
        if (options && options.length <= 0) {
            this.layer.msg('请选择需要删除的作品');
            return;
        }
        options = options ? options : this.selection;
        this.layer.confirm(
            '确认要取消选中的作品的评选资格吗？',
            () => {
                this.ugcActivityVoteOptionService.deleteOptions(this.ugcActivity.id, this.voteId, options.map(it => it.id)).subscribe(
                    () => {
                        this.layer.msg('取消成功');
                        this.loadData();
                    },
                    err => { this.layer.msg(err.message); }
                );
            }
        );
    }

}
