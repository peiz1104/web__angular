import { Injectable } from '@angular/core';
import { BaseService, HttpAdaptor } from "app/core";
import { ContentServer } from "app/system/entity/content-server";

@Injectable()
export class ContentServerService extends BaseService<ContentServer> {

  constructor(protected httpAdaptor: HttpAdaptor) {
        super(httpAdaptor.http, httpAdaptor, '/api/contentServers');
    }

}
