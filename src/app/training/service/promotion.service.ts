import { Injectable } from '@angular/core';
import {BaseService} from "../../core/service/base.service";
import {Promotion} from "../entity/promotion";
import {HttpAdaptor} from "../../core/http/http-adaptor";
import {Observable} from "rxjs/Observable";
import {Pagination} from "../../core/entity/pagination";
import {HttpUtils} from "../../core/http/http-utils";
import { FormDataUtil } from 'app/core/utils/form-data-util';

@Injectable()
export class PromotionService extends BaseService<Promotion> {

  constructor(protected httpAdaptor: HttpAdaptor) {
    super(httpAdaptor.http, httpAdaptor, '/api/training/promotion', );
  }


  pageList(params?: any): Observable<Pagination<Promotion>> {
    return this.http.get('/api/training/promotion', { params: params })
      .map(HttpUtils.extractData)
      .catch(HttpUtils.handleError);
  }

  // 导出功能第一步，在服务器生成文件
  export(params: any) {
    return this.httpAdaptor.post(`/api/training/promotion/export`, null, { params: params });
    } 
    
    // 导出功能第二步，下载服务器生成文件
    exportdownload(type) {
        window.location.href =  '/api/training/promotion/exportdownload?type='+ type ;
    }


}
