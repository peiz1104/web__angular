import { BannerBox } from './../entity/banner-box';
import { Observable } from 'rxjs/Observable';
import { BaseService, HttpAdaptor } from 'app/core';
import { Injectable } from '@angular/core';

@Injectable()
export class BannerBoxService extends BaseService<BannerBox> {

    constructor(protected httpAdaptor: HttpAdaptor) {
        super(httpAdaptor.http, httpAdaptor, '/api/banner-boxes');
    }

    initBannerBoxBox(): Observable<BannerBox> {
        return this.httpAdaptor.post(`${this.url}/init`, null);
    }
}
