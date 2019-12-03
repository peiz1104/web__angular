import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { OrgTreeApiService } from 'app/shared/api';
import { HttpAdaptor } from 'app/core';

@Injectable()
export class AssistOrgTreeApiService extends OrgTreeApiService {

    constructor(protected httpAdaptor: HttpAdaptor) {
        super(httpAdaptor);
    }

    orgRoots(permission?: string[] | string, isRegion: boolean = false) {
        return this.httpAdaptor.get(`/api/userGroups/assistant/tree`, { params: { isRegion: isRegion } });
    }

    orgChildren(parentId: number, permission?: string[] | string, isRegion: boolean = false) {
        return this.httpAdaptor.get(`/api/userGroups/assistant/tree`, { params: { parentId: parentId, isRegion: isRegion } });
    }
}
