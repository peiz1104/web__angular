import { FormDataUtil } from 'app/core/utils/form-data-util';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { BaseService, HttpAdaptor } from "app/core";
import { Board } from '../entity/board';

@Injectable()
export class BoardService extends BaseService<Board> {
  constructor(protected httpAdaptor: HttpAdaptor) {
    super(httpAdaptor.http, httpAdaptor, `/api/admin/forum/`);
  }

  // 每个接口最终的公共路径为：/admin/forum/${forumId}/board， -------必须拼接/${forumId}/board

  getAll(forumId: number): Observable<any> {
    return this.httpAdaptor.get(this.url + `${forumId}/board/list`);
  }

  getBoard(forumId: number, boardId: number): Observable<Board> {
    return this.httpAdaptor.get(this.url + `${forumId}/board/${boardId}`);
  }

  savebaord(forumId: number, board: Board): Observable<Board> {
    return this.httpAdaptor.put(this.url + `${forumId}/board`, board);
  }

  updateBoard(forumId: number, board: Board): Observable<Board> {
    let formData: FormData = FormDataUtil.covert(board);
    return this.httpAdaptor.post(this.url + `${forumId}/board/${board.id}`, formData);
  }

  deleteBoard(forumId: number, boardId: number): any {
    return this.httpAdaptor.delete(this.url + `${forumId}/board/delete/${boardId}`);
  }
}
