import { Component, OnInit } from '@angular/core';
import { Column } from 'console-ui-ng';
import { Pagination } from 'app/core';
import { NzModalService } from 'ng-zorro-antd';
import { Location } from '@angular/common';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { Impeach } from '../../../ordinary-forum/entity/impeach';
import { ImpeachService } from '../../../ordinary-forum/service/impeach.service';
import { Forum } from '../../../ordinary-forum/entity/forum';
import { SiteForumApiService } from '../../service/site-forum.service';
import { tipMessage } from 'app/account/entity/message-tip';

@Component({
    selector: 'spk-system-impeach',
    templateUrl: './system-impeach.component.html',
    styleUrls: ['./system-impeach.component.scss']
})
export class SystemImpeachComponent implements OnInit {

    forumType: string = "SITE";
    isEnable: boolean = true;
    offeringForums: Forum[];

    impeachId: number;
    topicTitle: string;
    checkImpeach: Impeach[];
    selectedForumId: number;
    forumId: number = 0;
    columns: Column[];
    loading: boolean = true;
    impeachs: Pagination<Impeach>;
    size: number = 10;

    page: Pagination<Impeach>;

    isVisible: boolean = false;

    type: string;
    info: any;

    modelLoad: boolean = false;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private location: Location,
        private impeachService: ImpeachService,
        private modal: NzModalService,
        private siteForumApiService: SiteForumApiService,
    ) { }

    ngOnInit() {
        this.columns = [
            { title: '举报者用户名', data: 'createdByUsername' },
            { title: '举报者姓名', data: 'createdByDisplayName' },
            { title: '被举报者用户名', data: 'user.username' },
            { title: '被举报者姓名', data: 'user.displayName' },
            { title: '举报时间', data: 'createdDate', tpl: 'createdDate' },
            { title: '所属讨论区', data: 'board.name' },
            { title: '帖子标题', data: 'topic.title', tpl: 'topicTitle' },
            { title: '举报理由', data: 'reason' },
            { title: '状态', data: 'state', tpl: 'state' },
        ];
        this.searchImpeach();
    }

    searchImpeach(page?) {
        this.loading = true;
        this.forumId = this.selectedForumId ? this.selectedForumId : 0;
        page = page ? page : { "size": this.size, "number": 0 };
        if (this.forumType == "OFFERING" && (this.forumId == 0 || this.forumId == null)) {
            tipMessage("请选择待查找的活动级论坛", 'warning');
            this.loading = false;
            return;
        } else {
            this.siteForumApiService.impeachlist(this.forumId, this.getSearchParams(), page).subscribe(
                ok => {
                    this.impeachs = ok;
                    this.loading = false;
                }
            );
        }
    }

    loadData(page?: Pagination<Impeach>) {
        this.size = page.size;
        this.searchImpeach(page);
    }

    getSearchParams() {
        let params = {
            "forumType": this.forumType,
        };
        if (this.topicTitle) {
            params["topic.title"] = this.topicTitle;
        }
        return params;
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

    private batchOperate(action: string, actionName: string, impeach?: Impeach, keepFilter?: boolean) {
        let selected = impeach ? [impeach] : this.checkImpeach;
        if (!selected || selected.length == 0) {
            tipMessage(`请选择要${actionName}的举报信息`, 'warning', 4000);
            return;
        }
        this.modal.confirm({
      title: `确定要${actionName}选择的举报吗？`,
            onOk: () => {
                this.impeachService[action](selected.map(it => it.id)).subscribe(
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

    typeChange() {
        this.offeringForums = undefined;
        this.selectedForumId = undefined;
        this.isEnable = true;
        if (this.forumType != "SITE") {
            this.siteForumApiService.getForums().subscribe(
                ok => {
                    this.offeringForums = ok;
                    if (!this.offeringForums || this.offeringForums.length <= 0) {
                        tipMessage("未查询到该站点下属的活动论坛", 'info', 4000);
                        this.forumType = "SITE";
                        this.typeChange();
                    }
                    this.isEnable = false;
                },
                err => {
                    tipMessage("获取该站点下属的活动论坛失败", '', 3000);
                    this.forumType = "SITE";
                    this.typeChange();
                }
            );
            this.isEnable = false;
        }
    }

}
