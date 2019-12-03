import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { NoticeBox } from './../../entity/notice-box';
import { Notice } from './../../entity/notice';
import { CuiLayer } from 'console-ui-ng';
import { NoticeService } from './../../service/notice.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Pagination } from 'app/core/entity/pagination';
import { tipMessage } from 'app/account/entity/message-tip';

@Component({
    selector: 'spk-notice-list',
    templateUrl: './notice-list.component.html',
    styleUrls: ['./notice-list.component.scss']
})
export class NoticeListComponent implements OnInit {
    @Input() box: NoticeBox;
    @Output() toAdd = new EventEmitter();
    @Output() toEdit = new EventEmitter();
    notices: Pagination<Notice>;
    searchText;
    selection: Notice[];
    columns;
    loading: boolean;
    index: number;
    constructor(
        private noticeService: NoticeService,
        private message: NzMessageService,
        private router: Router,
        private route: ActivatedRoute,
        private layer: CuiLayer,
        private modal: NzModalService) {
        this.columns = [
            // { title: 'ID', data: 'id' },
            { title: '标题', data: 'title' },
            { title: '创建人', data: 'createdByDisplayName' },
            { title: '创建日期', tpl: 'createdDate', styleClass: 'text-center' },
            { title: '发布状态', tpl: 'noticeStatus', styleClass: 'text-center' },
            { title: '顺序', tpl: 'displaySort', styleClass: 'text-center' },
            { title: '操作', tpl: 'actions', class: 'text-right' },
        ];
    }

    ngOnInit() {
        this.loadData();
    }

    delete(notices: Notice[], flag: boolean) {
        let selected = notices ? notices : this.selection;
        if (!selected || selected.length == 0) {
            this.message.warning('请选择要删除的公告');
            return;
        }
        if (flag) {
            this.noticeService.delete(selected.map(it => it.id)).subscribe(
                () => {
                    this.message.success('删除成功');
                    this.loadData();
                },
                err => { this.message.error("删除失败") }
            );
        } else {
            this.modal.confirm({
                title: `确认要删除选中的公告吗？`,
                zIndex: 1003,
                onOk: () => {
                    this.noticeService.delete(selected.map(it => it.id)).subscribe(
                        () => {
                            this.message.success('删除成功');
                            this.loadData();
                        },
                        err => { this.message.error("删除失败") }
                    );
                }
            });
        }
    }

    loadData(page?: Pagination<any>) {
        this.loading = true;
        let param = {
            searchText: this.searchText,
            page: page ? page.number : 0,
            size: page ? page.size : 10,
        }
        this.noticeService.getAllOfPage(this.box, param).subscribe(
            notices => {
                this.notices = notices;
                this.loading = false;
            },
            err => {
                this.loading = false;
            }
        );
    }

    /* onSelect(selIds) {
      if (selIds.length > 0) {
        this.selected = selIds;
      } else {
        this.selected = false;
      }
    } */

    add() {
        this.toAdd.emit(true);
    }
    edit(notice: Notice) {
        this.toEdit.emit(notice);
    }

    publish(notices: Notice[], flag: boolean) {
        let selected = notices ? notices : this.selection;
        if (!selected || selected.length == 0) {
            /* this.modal.warning({
              title: '请选择需要发布的公告'
            }); */
            this.message.warning("请选择需要发布的公告")
            return;
        }
        if (flag) {
            this.modal.confirm({
                title: `确认要发布选中的公告吗？`,
                zIndex: 1003,
                onOk: () => {
                    this.noticeService.publish(selected.map(it => it.id)).subscribe(
                        () => {
                            this.message.success('发布成功');
                            this.loadData();
                            // notices.forEach(it => it.isPublished = true);
                        },
                        err => { this.message.error(err.message); }
                    );
                }
            });
        } else {
            this.noticeService.publish(selected.map(it => it.id)).subscribe(
                () => {
                    this.message.success('发布成功');
                    this.loadData();
                    // notices.forEach(it => it.isPublished = true);
                },
                err => { this.message.error(err.message); }
            );
        }
    }
    cancel(notices: Notice[], flag: boolean) {
        let selected = notices ? notices : this.selection;
        if (!selected || selected.length == 0) {
            /* this.modal.warning({
              title: '请选择需要取消发布的公告'
            }); */
            this.message.warning("请选择需要撤销发布的公告");
            return;
        }
        if (flag) {
            this.modal.confirm({
                title: `确认要撤销发布选中的公告吗？`,
                zIndex: 1003,
                onOk: () => {
                    this.noticeService.cancel(selected.map(it => it.id)).subscribe(
                        () => {
                            this.message.success('撤销发布成功');
                            this.loadData();
                            // notices.forEach(it => it.isPublished = false);
                        },
                        err => { this.message.error(err.message); }
                    );
                }
            });
        } else {
            this.noticeService.cancel(selected.map(it => it.id)).subscribe(
                () => {
                    this.message.success('撤销发布成功');
                    this.loadData();
                    // notices.forEach(it => it.isPublished = false);
                },
                err => { this.message.error(err.message); }
            );
        }
    }

    moveUp(notice: Notice) {
        this.noticeService.moveUp(notice.id, this.box, { searchText: this.searchText }).subscribe(
            () => {
                this.loadData();
            },
            err => {
                // this.layer.msg(err.message);
                // this.layer.alert(err);
                tipMessage(err);
            }
        );
    }

    moveDown(notice: Notice) {
        this.noticeService.moveDown(notice.id, this.box, { searchText: this.searchText }).subscribe(
            () => {
                this.loadData();
            },
            err => {
                tipMessage(err);
            }
        );
    }

}
