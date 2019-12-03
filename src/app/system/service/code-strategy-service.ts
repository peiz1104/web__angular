import { BaseService } from 'app/core';
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { HttpAdaptor } from 'app/core/http/http-adaptor';
import { CodeStrategy } from 'app/system/entity/code-strategy';


@Injectable()
export class CodeStrategyService extends BaseService<CodeStrategy> {
    constructor(protected httpAdaptor: HttpAdaptor) {
        super(httpAdaptor.http, httpAdaptor, `/api/codeStrategy`);
    }

    getCodeStrategy(type: any): Observable<CodeStrategy> {
        return this.httpAdaptor.get(this.url, { params: { type: type } });
    }

    getCodeModel(codeFormat: any) {
        let param = {
            format: codeFormat
        }
        return this.httpAdaptor.get(this.url + "/codeModel", { params: param });
    }
}