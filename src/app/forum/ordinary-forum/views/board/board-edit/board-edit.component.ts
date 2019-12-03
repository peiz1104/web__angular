import { Location } from '@angular/common';
import { Forum } from './../../../entity/forum';
import { ActivatedRoute, Params } from '@angular/router';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { BoardService } from './../../../service/board.service';
import { Component, OnInit } from '@angular/core';
import { Board } from '../../../entity/board';
import { FormGroup, Validators } from '@angular/forms';
import { tipMessage } from 'app/account/entity/message-tip';

@Component({
    selector: 'spk-board-edit',
    templateUrl: './board-edit.component.html',
    styleUrls: ['./board-edit.component.scss']
})
export class BoardEditComponent implements OnInit {

    board: Board;
    boardForm: FormGroup;
    forumId: number;
    boardId: number;
    loading: boolean = false;
    isLoading: boolean = false;

    // @Output() doSubmit: EventEmitter<any> = new EventEmitter();
    // @Output() cancel: EventEmitter<any> = new EventEmitter();

    constructor(
        private boardService: BoardService,
        private fb: FormBuilder,
        private router: Router,
        private route: ActivatedRoute,
        private location: Location,
    ) {
    }

    ngOnInit() {
        /**
         * 获取活动论坛id
         */
        this.getForumId();
        /**
         *获取讨论区id
         */
        this.getBoardId();

        /**
         * 判断处于新增还是管理状态 boardId != -1，则处于管理状态
         */
        if (this.boardId != -1) {
            this.boardService.getBoard(this.forumId, this.boardId).subscribe(
                ok => {
                    this.board = ok;
                    this.loading = true;
                    this.getFormInfo();
                },
                err => {
                    tipMessage(err);
                    this.location.back();
                }
            );
        } else {
            this.loading = true;
            this.getFormInfo();
        }
    }

    onSubmit(event: Event) {
        this.markAsDirty();
        if (this.boardForm.invalid) {
            return;
        }
        this.isLoading = true;
        if (this.boardId == -1) {
            this.saveBoard(this.boardForm.value);
        } else {
            this.updateBoard(this.boardForm.value);
        }
    }

    getFormControl(name) {
        return this.boardForm.controls[name];
    }

    markAsDirty() {
        for (let key of Object.keys(this.boardForm.controls)) {
            this.boardForm.controls[key].markAsDirty();
        }
    }

    getFormInfo() {
        let m = this.board || new Board();
        this.boardForm = this.fb.group({
            id: [m.id],
            name: [m.name, [Validators.required]],
            description: [m.description],
            isPublished: [m.isPublished],
            cover: [m.cover],
            boardType: [m.boardType || "NORMAL"],
        });
    }

    initImage(result) {
        if (result) {
            this.getFormControl("cover").setValue(result["relativePath"]);
        }
    }

    getForumId() {
        this.route.data.subscribe((data: { forum: Forum }) => {
            this.forumId = data.forum.id;
        });
    }

    getBoardId() {
        this.route.params.subscribe(
            (params: Params) => {
                this.boardId = params['boardId'];
            });
    }

    saveBoard(board: Board) {
        this.boardService.savebaord(this.forumId, board).subscribe(
            ok => {
                this.board = ok;
                this.location.back();
                tipMessage("保存成功", 'success');
                this.isLoading = false;
            },
            err => {
                tipMessage(err);
                this.location.back();
            }
        );
    }

    updateBoard(board: Board) {
        this.boardService.updateBoard(this.forumId, board).subscribe(
            ok => {
                this.board = ok;
                tipMessage("修改成功", 'success');
                this.isLoading = false;
            },
            err => {
                tipMessage("修改失败");
                tipMessage(err);
            }
        );
    }
}
