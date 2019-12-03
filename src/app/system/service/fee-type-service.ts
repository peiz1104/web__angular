import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Pagination, HttpUtils, BaseService, HttpAdaptor } from '../../core';
import { FormDataUtil } from 'app/core/utils/form-data-util';



@Injectable()
export class FeeTypeService {
    constructor(protected httpAdaptor: HttpAdaptor) {
      
    }

    pageList(params?: any): Observable<Pagination<any>> {
        return this.httpAdaptor.get('/api/trainfee', { params: params })
    }

     // 删除
     delete(ids) {
        return this.httpAdaptor.delete(`/api/trainfee`, { params: { ids: ids } })
    }

       // 获取编辑信息
       getOne(id) {
        return this.httpAdaptor.get(`/api/trainfee/${id}`)
    }

          // 验证唯一性
    judgenamerepeat(params?: any) {
        return this.httpAdaptor.get(`/api/trainfee/is/exist`, { params: params })
    }

    // 编辑保存
    edit(id, params) {
            let formData: FormData = FormDataUtil.covert(params);
            return this.httpAdaptor.post(`/api/trainfee/${id}`, formData)
        }

    //添加
    add(params) {
        return this.httpAdaptor.put(`/api/trainfee`, params);
    }    


}