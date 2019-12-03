import { NgZorroAntdModule } from 'ng-zorro-antd';
import { NgModule, Provider } from '@angular/core';
import { InterceptedHttp } from './interceptors/intercepted-http';
import { HttpModule } from '@angular/http';
import { UnauthenticatedInterceptor } from './interceptors/unauthenticated-interceptor';
import { ErrorInterceptor } from './interceptors/error-interceptor';
import { HttpInterceptor } from './interceptors/http-interceptor';
import { WithCredentialsIntorceptor } from './interceptors/credentials-interceptor';
import { UrlIntorceptor } from './interceptors/url-interceptor';
import { HttpAdaptor } from './http-adaptor';
import { NoCacheIntorceptor } from './interceptors/no-cache-interceptor';
import {
    Http,
    ConnectionBackend,
    XHRBackend,
    RequestOptions,
    Request,
    Response,
    RequestOptionsArgs,
    RequestMethod,
} from '@angular/http';

export const SPK_INTERCEPTORS = [
    // UrlIntorceptor,
    NoCacheIntorceptor,
    WithCredentialsIntorceptor,
    ErrorInterceptor,
    UnauthenticatedInterceptor
];

export function interceptedHttpFactory(
        xhrBackend: XHRBackend, requestOptions: RequestOptions,
        ...interceptors: HttpInterceptor[]): Http {
    let interceptedHttp = new InterceptedHttp(xhrBackend, requestOptions);
    if (interceptors && interceptors.length > 0 ) {
        interceptedHttp.addInterceptors(...interceptors);
    }
    return interceptedHttp;

}

export const INTERCEPTED_HTTP_PROVIDER: Provider = {
    provide: Http,
    useFactory: interceptedHttpFactory,
    deps: [XHRBackend, RequestOptions,
        ...SPK_INTERCEPTORS
    ]
};

@NgModule({
    imports: [
        HttpModule
    ],
    exports: [],
    declarations: [],
    providers: [INTERCEPTED_HTTP_PROVIDER,
        ...SPK_INTERCEPTORS,
        HttpAdaptor
    ],
})
export class SpkHttpModule { }


