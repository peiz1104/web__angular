import { Injectable } from '@angular/core';
import { HttpAdaptor, FormDataUtil } from 'app/core';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class OfferingCourseApiService {

  constructor(protected httpAdaptor: HttpAdaptor) { }

  getCoursesLookup(offeringId: number, page?, params = {}): Observable<any> {
    if (page) {
        params['size'] = page.size;
        params['page'] = page.number;
    }
    params = FormDataUtil.searchParamFilter(params)
    return this.httpAdaptor.get(`/api/offering/${offeringId}/courses/lookup`, {params: params});
  }
}
