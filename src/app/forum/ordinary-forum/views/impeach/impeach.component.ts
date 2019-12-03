import { Forum } from './../../entity/forum';
import { Component, OnInit } from '@angular/core';
import { Impeach } from '../../entity/impeach';
import { ImpeachService } from '../../service/impeach.service';
import { Column } from 'console-ui-ng';
import { Pagination } from 'app/core';
import { NzModalService } from 'ng-zorro-antd';
import { Location } from '@angular/common';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { tipMessage } from 'app/account/entity/message-tip';

@Component({
    selector: 'spk-impeach',
    templateUrl: './impeach.component.html',
    styleUrls: ['./impeach.component.scss']
})
export class ImpeachComponent implements OnInit {

    impeachId: number;
    searhText: string;
    checkImpeach: Impeach[];
    forumId: number;
    columns: Column[];
    loading: boolean = true;
    impeachs: Pagination<Impeach>;
    size: number = 10;

    page: Pagination<Impeach>;

    isVisible: boolean = false;

    type: string;
    info: any;

    /**
     * 控制是否启用讨论区选择器
     */
    isEnable: boolean = true;

    modelLoad: boolean = false;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private location: Location,
        private impeachService: ImpeachService,
        private modal: NzModalService,
    ) { }

    ngOnInit() {
        this.getForumId();

        this.columns = [
            { title: '举报者用户名', data: 'createdByUsername' },
            { title: '举报者姓名', data: 'createdByDisplayName' },
            { title: '被举报者用户名', data: 'userUsername' },
            { title: '被举报者姓名', data: 'userDisplayName' },
            { title: '举报时间', data: 'createdDate', tpl: 'createdDate' },
            { title: '所属讨论区', data: 'board.name' },
            { title: '帖子标题', data: 'topic.title', tpl: 'topicTitle' },
            { title: '举报理由', data: 'reason' },
            { title: '状态', data: 'state', tpl: 'state' },
        ];
        this.searchImpeach();
    }

    loadData(page?: Pagination<Impeach>) {
        this.size = page.size;
        this.searchImpeach(page);
    }

    searchImpeach(page?) {
        this.loading = true;
        page = page ? page : { "size": this.size, "number": 0 };
        this.impeachService.list(this.forumId, this.getSearchParams(), page).subscribe(
            ok => {
                this.impeachs = ok;
                this.loading = false;
            }
        );
    }

    getSearchParams() {
        if (this.searhText) {
            let params = {};
            params['topic.title'] = this.searhText;
            return params;
        }
        return null;
    }

    deleteImpeach(impeach?: Impeach) {
        this.batchOperate('deleteImpeach', '删除', impeach, false);
    }
    handled(impeach?: Impeach) {
        this.batchOperate('handled', '标记为已处理', impeach, true);
    }
    unhandled(impeach?: Impeach) {
        this.batchOperate('unhandled', '标记为未处理', impeach, true);
    }

    getForumId() {
        this.route.data.subscribe((data: { forum: Forum }) => {
            this.forumId = data.forum.id;
        });
    }

    private batchOperate(action: string, actionName: string, impeach?: Impeach, keepFilter?: boolean) {
        let selected = impeach ? [impeach] : this.checkImpeach;
        if (!selected || selected.length == 0) {
            tipMessage(`请选择要${actionName}的举报信息`, 'warning', 4000);
            return;
        }
        this.modal.confirm({
            title: `确定要${actionName}选择的举报吗？`,
            zIndex: 1003,
            onOk: () => {
                this.impeachService[action](selected.map(it => it.id), this.forumId).subscribe(
                    ok => {
                        tipMessage(`${actionName}成功`, 'success');
                        this.page = this.impeachs;
                        this.searchImpeach(this.page);
                    },
                    err => tipMessage(`${actionName}失败`)
                );
            }
        });
    }

    showModal(impeach: Impeach) {
        this.impeachId = impeach.id;
        if (impeach.replyId) {
            this.type = "REPLY";
            this.info = impeach.replyId;
        } else {
            this.type = "TOPIC";
            this.info = impeach.topic;
        }
        this.modelLoad = true;
        this.isVisible = true;
    }

    closeModel() {
        this.isVisible = false;
        this.modelLoad = false;
        this.searchImpeach();
    }

    handleCancel = (e) => {
        this.isVisible = false;
        this.closeModel();
    }

}
