import { Injectable } from '@angular/core';
import { HttpInterceptor } from './http-interceptor';
import { RequestParams } from './request-params';
import { Observable } from 'rxjs/Observable';
import { Request } from '@angular/http';

@Injectable()
export class WithCredentialsIntorceptor implements HttpInterceptor {
    beforeRquest(requestParams: RequestParams): Observable<RequestParams> | RequestParams {
        if (requestParams.url instanceof Request) {
            requestParams.url.withCredentials = true;
        } else {
            if (requestParams && requestParams.options) {
                requestParams.options.withCredentials = true;
            } else {
                requestParams.options = {withCredentials: true};
            }
        }
        return requestParams;
    }
}
