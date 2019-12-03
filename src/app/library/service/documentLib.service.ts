import { Injectable } from '@angular/core';
import { BaseService, HttpAdaptor } from "app/core";
import { Documentlib } from "app/library/entity/documentlib";

@Injectable()
export class DocumentLibService extends BaseService<Documentlib> {
   constructor(protected httpAdaptor: HttpAdaptor) {
     super(httpAdaptor.http, httpAdaptor, '/api/documents');
   }

   publish(ids: number[]) {
        return this.batchOperate('publish', ids);
    }

    disPublish(ids: number[]) {
        return this.batchOperate('disPublish', ids);
    }

    excellent(ids: number[]) {
        return this.batchOperate('excellent', ids);
    }

    disExcellent(ids: number[]) {
        return this.batchOperate('disExcellent', ids);
    }

}
