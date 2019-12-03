import { Injectable, Provider } from '@angular/core';
import {
    Http,
    ConnectionBackend,
    XHRBackend,
    RequestOptions,
    Request,
    Response,
    RequestOptionsArgs,
    RequestMethod,
    BaseRequestOptions
} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/mergeMap';

import { HttpInterceptor } from './http-interceptor';
import { RequestParams } from './request-params';
import { ResponseOptionsArgs, Headers } from '@angular/http';


@Injectable()
export class InterceptedHttp extends Http {
    private interceptors: Array<HttpInterceptor>;

    constructor(protected backend: ConnectionBackend, protected defaultOptions: RequestOptions) {
        super(backend, defaultOptions);
        this.interceptors = [];
    }

    addInterceptor(interceptor: HttpInterceptor) {
        this.interceptors.push(interceptor);
    }

    addInterceptors(...interceptors: HttpInterceptor[]) {
        this.interceptors.push(...interceptors);
    }

    /**
     * Performs any type of http request. First argument is required, and can either be a url or
     * a {@link Request} instance. If the first argument is a url, an optional {@link RequestOptions}
     * object can be provided as the 2nd argument. The options object will be merged with the values
     * of {@link BaseRequestOptions} before performing the request.
     */
    request(url: string | Request, options?: RequestOptionsArgs): Observable<Response> {
        // console.log(url);

        let responseObservable: any;
        /* if (typeof url === 'string' ) {
            responseObservable = this.doRequest();
        } else if (url instanceof Request) {
            responseObservable = this.doRequest();
        } else {
            throw new Error('First argument must be a url string or Request instance.');
        } */
        responseObservable = this.doRequest(url, options);

        return responseObservable;
    }

    private doRequest(url: string | Request, options?: RequestOptionsArgs): Observable<Response> {
        let requestParams: RequestParams = {url: url, options: options};

        return this.runBeforeRequest(requestParams)
            .mergeMap<RequestParams, Response>((value: RequestParams, index: number) => {
                /* return Observable.zip(
                    super.request(value.url, value.options),
                    Observable.of
                ) */
                // console.log(value);
                return super.request(value.url, value.options);
            })
            .catch<Response, Response>((err: any) => {
                // TODO: If it's a cancel, create a fake response and pass it to next interceptors
                // console.log('http request has err', err);
                if (err === 'cancelled') {
                    return Observable.of({
                        body: {},
                        status: 0,
                        statusText: 'intercepted',
                        headers: new Headers()
                    });
                } else {
                    // return Observable.throw(err);
                }

                return Observable.of(err);
            })
            .mergeMap((value: Response, index: number) => {
                // console.log('running http after');
                let startOn = this.interceptors.length - 1;
                return this.runAfterRequest(value, startOn);
            })
            .mergeMap((value: Response, index: number) => {
                if (!value.ok) {
                    return Observable.throw(value);
                }
                return Observable.of(value);
            })
    }

    private runBeforeRequest(requestParams: RequestParams): Observable<RequestParams> {
        let ret: Observable<RequestParams> = Observable.of(requestParams);

        for (let i = 0; i < this.interceptors.length; i++) {
            let bf: HttpInterceptor = this.interceptors[i];
            if (!bf.beforeRquest) {
                continue;
            }

            ret = ret.mergeMap<RequestParams, RequestParams>((value: RequestParams, index?: number) => {
                let newObs: Observable<RequestParams>;
                let res = null;
                try {
                    res = bf.beforeRquest(value);
                } catch (e) {
                    console.error(e);
                }
                if (!res) {
                    newObs = Observable.of(value);
                } else if (!(res instanceof Observable)) {
                    newObs = Observable.of(<any>res);
                } else {
                    newObs = <any>res;
                }

                return newObs.catch((err: any, caught: Observable<RequestParams>) => {
                    // TODO: 处理自定义重复调用
                    if (err === 'cancelled') {
                        // return Observable.throw(err);
                        return Observable.of({
                            body: {},
                            status: 0,
                            statusText: 'intercepted',
                            headers: new Headers()
                        });
                    } else {
                        return Observable.throw(err);
                    }
                });
            });
        }

        return ret;
    }

    private runAfterRequest(response: Response, startOn: number): Observable<Response> {
        let ret: Observable<Response> = Observable.of(response);

        for (let i = startOn; i >= 0; i--) {
            let af: HttpInterceptor = this.interceptors[i];
            if (!af.afterRequest) {
                continue;
            }

            ret = ret.mergeMap<Response, Response>((value: Response, index: number) => {
                let newObs: Observable<Response>;
                let res = null;
                try {
                    res = af.afterRequest(value);
                } catch (e) {
                    console.error(e);
                }
                if (!res) {
                    newObs = Observable.of(value);
                } else if (!(res instanceof Observable)) {
                    newObs = Observable.of(<any>res);
                } else {
                    newObs = <any>res;
                }

                return newObs;
            });
        }

        return ret;
    }

}
