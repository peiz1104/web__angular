import { Observable } from 'rxjs/Observable';
import { HttpAdaptor } from './../../../core/http/http-adaptor';
import { CategoryGroup } from './../entity/category-group';
import { BaseService } from './../../../core/service/base.service';
import { Injectable } from '@angular/core';

@Injectable()
export class CategoryGroupService extends BaseService<CategoryGroup> {

  private categoryGroups: CategoryGroup[];
  constructor(protected httpAdaptor: HttpAdaptor) {
    super(httpAdaptor.http, httpAdaptor, '/api/system/category-groups');
  }
  getAll(params?: any): Observable<CategoryGroup[]> {
    if (this.categoryGroups) {
      return Observable.of(this.categoryGroups);
    }
    return this.httpAdaptor.get(this.url, { params: params }).map(
      groups => {
        this.categoryGroups = groups;
        return groups;
      });
  }

  getByIdentifier(identifier: string) {
    if (this.categoryGroups) {
      return Observable.of(this.categoryGroups.find(it => it.identifier === identifier));
    }
    return this.httpAdaptor.get(`/api/system/category-groups/identifier/${identifier}`);
  }
}
