import { StrategyCondition } from './../../entity/strategy-condition';
import { StrategyType } from './../../entity/strategy-type';
import { Injectable } from '@angular/core';
import { BaseService, HttpAdaptor } from 'app/core';
import { Strategy } from 'app/learning/strategy/entity/strategy';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Pagination } from '../../../../core/entity';
import { FormDataUtil } from '../../../../core/utils';
@Injectable()
export class StrategyService {

  constructor(private http: Http, private httpAdaptor: HttpAdaptor) { }

    getStrategy(objectId: number, strategyType?: string): Observable<Strategy> {
      let param= {objectId: objectId, type: strategyType};
      let url = "/api/strategy/";
      if (!strategyType) {
        url = url + `${objectId}`;
      }
      return this.httpAdaptor.get(url, {params: param});
    }

    saveStrategy(strategy: Strategy): Observable<Strategy> {
      return this.httpAdaptor.put(`/api/strategy/`, strategy);
    }

    
    useDefaultStrategy(objectId: number, strategyType: string): Observable<Strategy> {
      let param = { objectId: objectId, type: strategyType };
      return this.httpAdaptor.get(`/api/strategy/useDefaultStrategy`, { params: param });
    }

    chooseInit(objectId: number, strategyType: string, strategyId: number): Observable<Strategy> {
      let param = { objectId: objectId, type: strategyType, strategyId: strategyId};
      return this.httpAdaptor.get(`/api/strategy/choose-init`, { params: param });
     }

    isInit(objectId: number, strategyType: string): Observable<any> {
      let param = { objectId: objectId, type: strategyType };
      return this.httpAdaptor.get(`/api/strategy/isInit`, { params: param });
    }

    lookDefaultStrategy (objectId: number, strategyType: string): Observable<Strategy> {
       let param = { objectId: objectId, type: strategyType };
       return this.httpAdaptor.get(`/api/strategy/lookDefaultStrategy`, { params: param });
     }

    chooseDefaultStrategies(params?: any, page?: Pagination<Strategy>): Observable<Pagination<Strategy>> {
      params = params || {};
      if (page) {
          params['size'] = page.size;
          params['page'] = page.number;
      } else {
        params['size'] = 10;
        params['page'] = 0;
      }

       let param = FormDataUtil.searchParamFilter(params);
       return this.httpAdaptor.get(`/api/strategy/choose-list`, { params: param });
    }

     list(strategyType: string, userGroupId): Observable<Strategy[]> {
      let param = {type: strategyType};
      if (userGroupId) {
        param['userGroupId'] = userGroupId;
      }
      return this.httpAdaptor.get(`/api/strategy/list`, {params: param});
    }

    getStrategyTypes(): Observable<StrategyType[]> {
      return this.httpAdaptor.get(`/api/strategy/types`);
    }

    getConditionsByType(strategyType: string): Observable<StrategyCondition[]> {
      let param = {type: strategyType};
      return this.httpAdaptor.get(`/api/strategy/conditions`, {params: param});
    }

    computeAchieveCourse(offeringId, achieveRate): Observable<number> {
      return this.httpAdaptor.get(`/api/strategy/compute-rate-course`, {params: {offeringId: offeringId, achieveRate: achieveRate}});
    }

    computeAchievePeriod(offeringId, achieveRate): Observable<string> {
      return this.httpAdaptor.get(`/api/strategy/compute-rate-period`, {params: {offeringId: offeringId, achieveRate: achieveRate}});
    }

    delete(ids: number[]) {
      return this.httpAdaptor.delete(`/api/strategy`, {params: {ids: ids}});
    }

    setDefault(id, userGroupId, siteId, type) {
      return this.httpAdaptor.get(`/api/strategy/default`,
       {params: {strategyId: id, userGroupId: userGroupId, type: type, siteId: siteId}});
    }

    cancelDefault(id) {
      return this.httpAdaptor.get(`/api/strategy/cancel-default`, {params: {strategyId: id}});
    }
  }
