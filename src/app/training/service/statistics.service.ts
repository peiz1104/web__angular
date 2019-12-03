import { HttpAdaptor } from 'app/core';
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { BaseService } from 'app/core';
import { Observable } from 'rxjs/Observable';
import { FormDataUtil } from 'app/core/utils/form-data-util';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
@Injectable()
export class StatisticsService {
    constructor(
        private httpAdaptor: HttpAdaptor
    ) { }
    getStatList(params) {
        let param = FormDataUtil.nullValFilter(params);
        return this.httpAdaptor.get(`/api/period/push/situation`, { params: param })
    }
    exportDatas(params) {
        let param = FormDataUtil.nullValFilter(params);
        return this.httpAdaptor.post(`/api/period/push/situation/export`, null, { params: param })
    }
}
