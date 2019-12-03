import { HttpAdaptor, FormDataUtil } from 'app/core';
import { BaseService } from 'app/core';
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { TrainClassAttendance } from '../entity/train_class_attendance';
import { Pagination } from 'app/core/entity/pagination';

@Injectable()
export class TrainingClassAttendanceApiService extends BaseService<TrainClassAttendance> {
    constructor(protected httpAdaptor: HttpAdaptor) {
        super(httpAdaptor.http, httpAdaptor, '/api/training/attendance');
    }

    searchData(params?: any, page?: Pagination<TrainClassAttendance>) {
        params = params || {};
        if (page) {
            params['size'] = page.size;
            params['page'] = page.number;
        };
        let param = FormDataUtil.searchParamFilter(params);
        return this.httpAdaptor.get(this.url + '/search', { params: param });
    }

    downloadExcel(id: number): Observable<TrainClassAttendance> {
        console.log("导出班级考勤的id为", id);
        return this.httpAdaptor.get('/api/training/attendance/download',  {params: {id: id}});
    }

    updateTrainClassAttendance(trainClassAttendance: FormData): Observable<TrainClassAttendance> {
        if (!trainClassAttendance.has("id")) {
            Observable.throw('The id of case for upload must not be null');
          }
          return this.httpAdaptor.post(`/api/training/attendance`, trainClassAttendance);
    }

    attendanceImport(id: number, fullPath: string): Observable<TrainClassAttendance> {
        return this.httpAdaptor.get(`/api/training/attendance/excelImport/${id}`, {params: {fullPath: fullPath}});
    }

    saveImport(id: number, fullPath: string): Observable<TrainClassAttendance> {
        return this.httpAdaptor.get(`/api/training/attendance/saveImport/${id}`, {params: {fullPath: fullPath}});
    }
    // publish(ids: number[]) {
    //     return this.batchOperate('publish', ids);
    // }

    // disPublish(ids: number[]) {
    //     return this.batchOperate('disPublish', ids);
    // }

    // archive(ids: number[]) {
    //     return this.batchOperate('archive', ids);
    // }

    // disArchive(ids: number[]) {
    //     return this.batchOperate('disArchive', ids);
    // }
}
