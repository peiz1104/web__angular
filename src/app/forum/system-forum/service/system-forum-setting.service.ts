import { Injectable } from '@angular/core';
import { BaseService, HttpAdaptor } from "app/core";
import { SystemForumSetting } from '../entity/systemForumSetting';
@Injectable()
export class SystemForumSettingService extends BaseService<SystemForumSetting> {
  constructor(protected httpAdaptor: HttpAdaptor) {
    super(httpAdaptor.http, httpAdaptor, '/api/admin/sysForumSetting');
  }
}
