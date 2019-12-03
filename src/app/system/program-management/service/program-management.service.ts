import { Injectable } from '@angular/core';
import {BaseService} from "../../../core/service/base.service";
import {HttpAdaptor} from "../../../core/http/http-adaptor";
import {Programmanagement} from "../entity/programmanagement";

@Injectable()
export class ProgramManagementService  extends BaseService<Programmanagement> {

  constructor(protected httpAdaptor: HttpAdaptor) {
    super(httpAdaptor.http, httpAdaptor, '/api/system/programmanagerment');
  }

}

