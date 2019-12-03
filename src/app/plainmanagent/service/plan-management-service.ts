import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { HttpAdaptor, Pagination } from 'app/core';
import { TrainingClass } from 'app/training/entity/training-class';
import { FormDataUtil } from 'app/core/utils';

@Injectable()
export class TbcPlanApiService {

    private baseUrl = '/api/assist/tbc/{classId}';

    constructor(private httpAdaptor: HttpAdaptor) { }
    getAllOfPage(params?: any, page?: Pagination<TrainingClass>): Observable<Pagination<TrainingClass>> {
        params = params || {};
        if (page) {
            params['size'] = page.size;
            params['page'] = page.number;
        };
        let param = FormDataUtil.searchParamFilter(params);
        return this.httpAdaptor.get(`/api/planImplement/research/tbclist`, { params: param });
    }
    goexame(id, trainingLevelId) {
        return this.httpAdaptor.get(`/api/training/classes/${id}/init-exam/${trainingLevelId}`);
    }
}
