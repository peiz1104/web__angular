import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Pagination, HttpUtils } from '../../core';
import { PointsRule } from '../entity/points-rule';
import { BaseService, HttpAdaptor } from "app/core";
@Injectable()
export class PointsRuleApiService  {
   
  constructor(private http: Http, private httpAdaptor: HttpAdaptor) { }
    pointsrules(params?: any): Observable<Pagination<PointsRule>> {
        //console.log(params);
        return this.http.get('/api/points', { params: params })
          .map(HttpUtils.extractData)
          .catch(HttpUtils.handleError);    
      }

      get(userId: number): Observable<PointsRule> {
        return this.http.get(`/api/points/${userId}`)
          .map(HttpUtils.extractData)
          .catch(HttpUtils.handleError);
      }

  update(user: FormData): Observable<PointsRule> {
    if (!user.has("id")) {
      Observable.throw('The id of user for upload must not be null');
    }
    return this.http.post(`/api/points/${user.get('id')}`, user)
      .map(HttpUtils.extractData)
      .catch(HttpUtils.handleError);
  }
}
