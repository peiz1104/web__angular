import { Board } from './../../../entity/board';
import { Input } from '@angular/core';
import { Forum } from './../../../entity/forum';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { BoardService } from '../../../service/board.service';
import { tipMessage } from 'app/account/entity/message-tip';

@Component({
    selector: 'spk-board-list',
    templateUrl: './board-list.component.html',
    styleUrls: ['./board-list.component.scss']
})
export class BoardListComponent implements OnInit {

    forum: Forum;
    boards: Board[];

    constructor(
        private boardService: BoardService,
        private router: Router,
        private route: ActivatedRoute) { }

    ngOnInit() {
        this.route.data.subscribe((data: { forum: Forum }) => {
            this.forum = data.forum;
        });

        this.boardService.getAll(this.forum.id).subscribe(
            ok => {
                this.boards = ok;
            },
            err => {
                tipMessage(err);
            }
        );
    }

    setting(boardId) {
        this.router.navigate(['../../', boardId], { relativeTo: this.route });
    }

    goTopicList(boardId) {
        // rla1.isActive = true;
        this.router.navigate(['../../', 'topic', -1],
            { relativeTo: this.route, queryParams: { boardId: boardId } });
    }


    confirmDelete(id) {
        if (this.boards.length <= 1) {
            tipMessage("删除失败，必须有一个讨论区存在", '', 4000);
        } else {
            this.boardService.deleteBoard(this.forum.id, id).subscribe(
                ok => {
                    this.ngOnInit();
                },
                err => {
                    tipMessage(err);
                }
            );
        }
    }

    addBoard() {
        this.router.navigate(['../../', -1], { relativeTo: this.route });
    }
}
