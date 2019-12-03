import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { HttpAdaptor, Pagination } from 'app/core';
import { TrainingClass } from '../../../training/entity/training-class';
import { FormDataUtil } from 'app/core/utils';

@Injectable()
export class TbcAssistApiService {

    private baseUrl = '/api/assist/tbc/{classId}';

    constructor(private httpAdaptor: HttpAdaptor) { }

    getBaseUrl(classId) {
        return this.baseUrl.replace("{classId}", classId);
    }

    getAllOfPage(params?: any, page?: Pagination<TrainingClass>): Observable<Pagination<TrainingClass>> {
        params = params || {};
        if (page) {
            params['size'] = page.size;
            params['page'] = page.number;
        };
        let param = FormDataUtil.searchParamFilter(params);
        return this.httpAdaptor.get(`/api/assist/classes`, { params: param });
    }

    getOne(classId: any): Observable<TrainingClass> {
        return this.httpAdaptor.get(this.getBaseUrl(classId));
    }

    create(entity: TrainingClass): Observable<TrainingClass> {
        return this.httpAdaptor.put(this.getBaseUrl(entity['id']), entity);
    };

    update(entity: TrainingClass): Observable<TrainingClass> {
        let formData: FormData = FormDataUtil.covert(entity);
        return this.httpAdaptor.post(this.getBaseUrl(entity['id']), formData);
    }

    delete(classId, ids: any[]): Observable<any> {
        return this.httpAdaptor.delete(this.getBaseUrl(classId) + `/delete`, { params: { ids: ids } });
    }
    archive(classId, ids: number[]) {
        return this.batchOperate(classId, `archive`, ids);
    }

    disArchive(classId, ids: number[]) {
        return this.batchOperate(classId, `disArchive`, ids);
    }

    initMaterialGroup(classId) {
        return this.httpAdaptor.post(this.getBaseUrl(classId) + `/initMaterialGroup`, null);
    }
    // 培训班考试进入
    goexame(id, trainingLevelId) {
        return this.httpAdaptor.get(`/api/training/classes/${id}/init-exam/${trainingLevelId}`);
    }
    protected batchOperate(classId, action: string, ids: number[]) {
        return this.httpAdaptor.post(this.getBaseUrl(classId) + `/${action}`, null, { params: { ids: ids } });
    }
}
