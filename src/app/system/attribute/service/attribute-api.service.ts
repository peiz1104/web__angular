import { FormDataUtil } from './../../../core/utils/form-data-util';
import { BaseService } from 'app/core';
import { HttpAdaptor } from 'app/core';
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class AttributeApiService extends BaseService<any> {
    constructor(protected httpAdaptor: HttpAdaptor) {
        super(httpAdaptor.http, httpAdaptor, '/api/custom/attributes');
    }

    update(entity): Observable<any> {
        let formData: FormData = FormDataUtil.covert(entity);

        let validValues = entity['validValues'];
        if (validValues && validValues.length > 0) {
            validValues.map((it, index) => {
                for (let key of Object.keys(it)) {
                    if (it[key]) {
                        formData.append(`validValues[${index}].${key}`, it[key]);
                    }
                }
            });
        }

        return this.httpAdaptor.post(`${this.url}/${entity['id']}`, formData);
    }
}
