import { Request, RequestOptionsArgs } from '@angular/http';

export interface RequestParams {
    url: string | Request;
    options?: RequestOptionsArgs;
}
