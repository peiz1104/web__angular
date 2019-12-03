import { DocumentInfo } from './../entity/document-info';
import { Injectable } from '@angular/core';
import { BaseService, HttpAdaptor } from "app/core";
import { Documentlib } from "app/library/entity/documentlib";

@Injectable()
export class DocumentInfoService extends BaseService<DocumentInfo> {
   constructor(protected httpAdaptor: HttpAdaptor) {
     super(httpAdaptor.http, httpAdaptor, '/api/documentInfo');
   }

}
