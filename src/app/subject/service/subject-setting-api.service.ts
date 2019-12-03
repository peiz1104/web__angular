import { HttpAdaptor } from 'app/core';
import { BaseService } from 'app/core';
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { FormDataUtil } from 'app/core/utils/form-data-util';
import { Pagination } from 'app/core/entity/pagination';

@Injectable()
export class SubjectSettingApiService extends BaseService<any> {
    constructor(protected httpAdaptor: HttpAdaptor) {
        super(httpAdaptor.http, httpAdaptor, '/api/subject/subject-setting');
    }

    findNoticeBox(): Observable<any> {
        return this.httpAdaptor.get(`${this.url}/findNoticeBox`, {});
    }

    initNoticeBox(id: any): Observable<any> {
        let param = FormDataUtil.covert({ 'noticeBoxId': id });
        return this.httpAdaptor.post(`${this.url}/initNoticeBox`, param);
    }


    findBannerBox(): Observable<any> {
        return this.httpAdaptor.get(`${this.url}/findBannerBox`, {});
    }

    initBannerBox(id: any): Observable<any> {
        let param = FormDataUtil.covert({ 'bannerBoxId': id });
        return this.httpAdaptor.post(`${this.url}/initBannerBox`, param);
    }

}

