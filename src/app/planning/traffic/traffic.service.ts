import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import {
    Pagination,
    HttpAdaptor,
    BaseService
} from 'app/core';
import { FormDataUtil } from 'app/core/utils/form-data-util';

@Injectable()
export class TrafficService extends BaseService<any> {
    constructor(protected httpAdaptor: HttpAdaptor) {
        super(httpAdaptor.http, httpAdaptor, '/api/offeringcert');
    }

    getTrafficList() {
        return this.httpAdaptor.get(`/api/trafficfee/list`);
    }

    trafficSave(param) {
        let formData: FormData = FormDataUtil.covert(param);
        return this.httpAdaptor.post(`/api/trafficfee/save`, formData);
    }

    updatePlanTraffic(id) {
        return this.httpAdaptor.get(`/api/trafficfee/${id}/updatetrafficfee`);
    }

}
