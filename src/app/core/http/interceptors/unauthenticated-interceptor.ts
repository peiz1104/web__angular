import { Request, Response, RequestOptionsArgs, } from '@angular/http';
import { HttpInterceptor } from './http-interceptor';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';

@Injectable()
export class UnauthenticatedInterceptor implements HttpInterceptor {

    constructor(private router: Router) {}

    afterRequest(response: Response): Observable<Response> | Response {
        if (response.status === 401) {
            console.log(`Unauthenticated: ${response.url}`);
            // this.router.navigate(['/login']);
            // location.href = location.origin + '/login';
            window['location']['href'] = window.location.protocol + "//" + window.location.hostname + (window.location.port ? ':' + window.location.port : '') + '/login';

            // throw new Error('cancelled');
            return Observable.throw('cancelled');
        }
        // return response; // Observable.of(response);
        return Observable.of(response);
    }
}
