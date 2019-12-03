import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Pagination, HttpUtils } from '../../core';
import { PointsMall } from '../entity/points-mall';
import { BaseService, HttpAdaptor } from "app/core";
@Injectable()
export class PointsMallListApiService extends BaseService<PointsMall> {
   
  constructor(protected httpAdaptor: HttpAdaptor) { 

    super(httpAdaptor.http,httpAdaptor,'/api/pointsmall');
  }
    pointsrules(params?: any): Observable<Pagination<PointsMall>> {
        //console.log(params);
        return this.http.get('/api/pointsmall', { params: params })
          .map(HttpUtils.extractData)
          .catch(HttpUtils.handleError);    
      }

      get(userId: number): Observable<PointsMall> {
        return this.http.get(`/api/points/${userId}`)
          .map(HttpUtils.extractData)
          .catch(HttpUtils.handleError);
      }

  // update(user: FormData): Observable<PointsMall> {
  //   if (!user.has("id")) {
  //     Observable.throw('The id of user for upload must not be null');
  //   }
  //   return this.http.post(`/api/points/${user.get('id')}`, user)
  //     .map(HttpUtils.extractData)
  //     .catch(HttpUtils.handleError);
  // }

  add(user: PointsMall): Observable<PointsMall> {
    return this.http.put('/api/pointsmall/add', user)
      .map(HttpUtils.extractData)
      .catch(HttpUtils.handleError);
  }
}
