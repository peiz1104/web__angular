import { Board } from './../../entity/board';
import { BoardService } from './../../service/board.service';
import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { tipMessage } from 'app/account/entity/message-tip';

@Component({
    selector: 'spk-board-select',
    templateUrl: './board-select.component.html',
    styleUrls: ['./board-select.component.scss']
})
export class BoardSelectComponent implements OnInit {

    @Input() forumId;
    @Output() getBoardId: EventEmitter<any> = new EventEmitter();

    boardId: number;

    boards: Board[];

    constructor(
        private boardService: BoardService,
    ) { }

    ngOnInit() {
        this.getBoardList();
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

    doCommit() {
        console.log("asdsd");
        this.getBoardId.emit({ originalEvent: event, value: this.boardId });
    }

}
