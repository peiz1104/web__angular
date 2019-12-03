import { Request, Response, RequestOptionsArgs, RequestOptions, ResponseOptionsArgs } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { RequestParams } from './request-params';

export interface HttpInterceptor {
    // beforeRequest?(request: Request): Observable<Request> | Request;
    // afterRequest?(request: Request, response: Response): Observable<Response> | Response;

    // beforeRequest?(requestOptions: RequestOptionsArgs): Observable<RequestOptionsArgs> | RequestOptionsArgs;
    beforeRquest?(requestParams: RequestParams): Observable<RequestParams> | RequestParams;
    afterRequest?(response: Response): Observable<Response> | Response;
}
