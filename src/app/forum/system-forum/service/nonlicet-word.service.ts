import { Injectable } from '@angular/core';
import { BaseService, HttpAdaptor } from "app/core";
import { NonlicetWord } from '../entity/nonlicetWord';
@Injectable()
export class NonlicetWordService extends BaseService<NonlicetWord> {
    constructor(protected httpAdaptor: HttpAdaptor) {
        super(httpAdaptor.http, httpAdaptor, '/api/forum/nonlicetWord');
    }
}
