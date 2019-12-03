import { FormDataUtil } from 'app/core';
import { Observable } from 'rxjs/Observable';
import { Category } from './../entity/category';
import { BaseService } from './../../../core/service/base.service';
import { HttpAdaptor } from './../../../core/http/http-adaptor';
import { Injectable } from '@angular/core';

@Injectable()
export class CategoryService extends BaseService<Category> {


  constructor(protected httpAdaptor: HttpAdaptor) {
    super(httpAdaptor.http, httpAdaptor, '/api/system/categories');
  }

  move(params: any): Observable<any> {
    let formData = FormDataUtil.covert(FormDataUtil.nullValFilter(params)) ;
    return this.httpAdaptor.post(`/api/system/categories/move/${formData.get('sourceId')}`, formData);
  }

}
