import { Forum } from './../entity/forum';
import { Injectable } from '@angular/core';
import { BaseService, HttpAdaptor } from "app/core";
@Injectable()
export class ForumService extends BaseService<Forum> {
  constructor(protected httpAdaptor: HttpAdaptor) {
    super(httpAdaptor.http, httpAdaptor, '/api/admin/forum');
  }
}
