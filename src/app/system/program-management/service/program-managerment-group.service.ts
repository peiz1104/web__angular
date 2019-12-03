import { Injectable } from '@angular/core';
import {BaseService} from "../../../core/service/base.service";
import {ProgrammanagementGroup} from "../entity/programmanagement-group";
import {HttpAdaptor} from "../../../core/http/http-adaptor";
import {Observable} from "rxjs/Observable";

@Injectable()
export class ProgramManagermentGroupService extends BaseService<ProgrammanagementGroup> {

  private programmanagementGroups: ProgrammanagementGroup[];
  constructor(protected httpAdaptor: HttpAdaptor) {
    super(httpAdaptor.http, httpAdaptor, '/api/system/program-managerment-groups');

  }
  getAll(params?: any): Observable<ProgrammanagementGroup[]> {
    if (this.programmanagementGroups) {
      return Observable.of(this.programmanagementGroups);
    }
    return this.httpAdaptor.get(this.url, { params: params }).map(
      groups => {
        this.programmanagementGroups = groups;
        return groups;
      });
  }
  getByIdentifier(identifier: string) {
    console.log("identifier="+identifier);
    if (this.programmanagementGroups) {
      return Observable.of(this.programmanagementGroups.find(it => it.identifier === identifier));
    }
    return this.httpAdaptor.get(`/api/system/program-managerment-groups/identifier/${identifier}`);
  }

}



