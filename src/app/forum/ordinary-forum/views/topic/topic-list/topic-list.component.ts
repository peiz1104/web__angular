import { Forum } from './../../../entity/forum';
import { Column } from 'console-ui-ng';
import { Pagination } from 'app/core';
import { TopicService } from './../../../service/topic.service';
import { NzModalService } from 'ng-zorro-antd';
import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Topic } from '../../../entity/topic';
import { Board } from '../../../entity/board';
import { BoardService } from '../../../service/board.service';
import { FormGroup } from '@angular/forms';
import { tipMessage } from 'app/account/entity/message-tip';

@Component({
    selector: 'spk-topic-list',
    templateUrl: './topic-list.component.html',
    styleUrls: ['./topic-list.component.scss']
})
export class TopicListComponent implements OnInit {

    topic: Topic = new Topic();
    checkTopic: Topic[];
    forumId: number;
    columns: Column[];
    loading: boolean = true;
    topics: Pagination<Topic>;
    size: number = 10;

    page: Pagination<Topic>;

    isVisible: boolean = false;
    modelLoading = false;

    boards: Board[];
    boardId: number;
    /**
     * 控制是否启用讨论区选择器
     */
    isEnable: boolean = true;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private location: Location,
        private topicService: TopicService,
        private modal: NzModalService,
        private boardService: BoardService,
    ) { }

    ngOnInit() {
        this.getForumId();

        this.getBoardId();

        this.getBoardList();

        this.columns = [
            { title: '标题', data: 'title', tpl: 'titleTpl' },
            { title: '所属讨论区', data: 'boardName' },
            { title: '话题类型', data: 'topicType', tpl: 'topicType' },
            { title: '更新人', data: 'lastModifiedByDisplayName' },
            { title: '更新时间', data: 'lastModifiedDate', tpl: 'lastModifiedDate' },
            { title: '创建人', data: 'createdByDisplayName' },
            { title: '创建时间', data: 'createdDate', tpl: 'createdDate' },
            { title: '访问量', data: 'viewCount' },
            { title: '回复数', data: 'replyCount' },
            { title: '点赞数', data: 'praiseCount' },
            { title: '锁定', data: 'isLocked', tpl: 'topicLock' },
            { title: '高亮', data: 'isLight', tpl: 'topicLigh' },
            { title: '置顶', data: 'isTop', tpl: 'topicTop' },
            { title: '精华', data: 'isSuperior', tpl: 'topicSuperior' },
            { title: '操作', tpl: 'actions', styleClass: 'text-right' },
        ];
        this.searchTopic();
    }

    loadData(page?: Pagination<Topic>) {
        this.size = page.size;
        this.searchTopic(page);
    }

    searchTopic(page?) {
        this.loading = true;
        page = page ? page : { "size": this.size, "number": 0 };
        this.topicService.getAllTopic(this.forumId, this.getSearchParams(), page).subscribe(
            ok => {
                this.topics = ok;
                this.loading = false;
                this.checkTopic = [];
            }
        );
    }

    getSearchParams() {
        if (this.topic) {
            let params = {};
            params['title'] = this.topic.title;
            params['board.id'] = this.boardId;
            return params;
        }
        return null;
    }

    delete(topic?: Topic) {
        this.batchOperate('deleteTopic', '删除', topic, false);
    }
    delete_single(topic?: Topic) {
        let selected = topic ? [topic] : this.checkTopic;
        this.topicService['deleteTopic'](selected.map(it => it.id), this.forumId).subscribe(
            ok => {
                tipMessage('删除成功', 'success');
                this.page = this.topics;
                this.loadData(this.page);
            },
            err => tipMessage('删除失败', 'error')
        );
    }
    setLock(topic?: Topic) {
        this.batchOperate('setLock', '锁定', topic, true);
    }
    unlock(topic?: Topic) {
        this.batchOperate('unlock', '解锁', topic, true);
    }
    setLight(topic?: Topic) {
        this.batchOperate('setLight', '高亮', topic, true);
    }
    cancelLight(topic?: Topic) {
        this.batchOperate('cancelLight', '取消高亮', topic, true);
    }
    setTop(topic?: Topic) {
        this.batchOperate('setTop', '置顶', topic, true);
    }
    cancelTop(topic?: Topic) {
        this.batchOperate('cancelTop', '取消置顶', topic, true);
    }
    setSuperior(topic?: Topic) {
        this.batchOperate('setSuperior', '设定精华', topic, true);
    }
    cancelSuperior(topic?: Topic) {
        this.batchOperate('cancelSuperior', '取消精华', topic, true);
    }

    getForumId() {
        this.route.data.subscribe((data: { forum: Forum }) => {
            this.forumId = data.forum.id;
        });
    }

    getBoardId() {
        let id;
        this.route.params.subscribe(
            (params: Params) => {
                id = +params['boardId'];
            }
        );
        this.route.queryParams.subscribe(
            ({ boardId }) => {
                if (boardId) {
                    id = +boardId;
                }
            });
        if (id != -1) {
            this.boardId = id;
            this.isEnable = true;
        } else {
            this.isEnable = false;
        }
    }

    getBoardList() {
        this.boardService.getAll(this.forumId).subscribe(
            ok => {
                this.boards = ok;
            },
            err => {
                tipMessage(err);
            }
        );
    }

    private batchOperate(action: string, actionName: string, topic?: Topic, keepFilter?: boolean) {
        let selected = topic ? [topic] : this.checkTopic;
        if (!selected || selected.length == 0) {
            tipMessage(`请选择要${actionName}的帖子`, 'warning');
            return;
        }
        this.modal.confirm({
            title: `确定要${actionName}选择的话题吗？`,
            zIndex: 1003,
            onOk: () => {
                this.topicService[action](selected.map(it => it.id), this.forumId).subscribe(
                    ok => {
                        tipMessage(`${actionName}成功`, 'success');
                        this.page = this.topics;
                        this.loadData(this.page);
                    },
                    err => tipMessage(`${actionName}失败`)
                );
            }
        });
    }

    showModal() {
        this.isVisible = true;
        this.modelLoading = true;
    }

    closeModel() {
        this.isVisible = false;
        this.modelLoading = false;
        this.ngOnInit();
    }

    handleCancel = (e) => {
        this.ngOnInit();
        this.isVisible = false;
        this.modelLoading = false;
    }
}
