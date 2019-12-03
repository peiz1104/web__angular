import { HttpAdaptor, FormDataUtil } from 'app/core';
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Permission } from 'app/system/entity/permission';

@Injectable()
export class OrgTreeApiService {
    constructor(protected httpAdaptor: HttpAdaptor) { }

    orgTree(parentId?: number, permission?: string[] | string, isRegion: boolean = false) {
        if (parentId) {
            return this.orgChildren(parentId, permission, isRegion);
        } else {
            return this.orgRoots(permission, isRegion);
        }
    }

    orgRoots(permission?: string[] | string, isRegion: boolean = false) {
        return this.httpAdaptor.get(`/api/userGroups/tree`, { params: { permission: permission, isRegion: isRegion } });
    }

    orgChildren(parentId: number, permission?: string[] | string, isRegion: boolean = false) {
        return this.httpAdaptor.get(`/api/userGroups/tree`, { params: { parentId: parentId, permission: permission, isRegion: isRegion } });
    }

    search(searchText: string, page, size, permission?: string[] | string, isRegion: boolean = false) {
        let url = `/api/userGroups/search`;

        return this.httpAdaptor.get(url, {
            params: {
                searchText: searchText, page: page, size: size,
                permission: permission, isRegion: isRegion
            }
        }).map(it => {
            if (it && it.content) {
                it.content.forEach(item => {
                    item.type = 'USER_GROUP';
                });
            }
            return it;
        });
    }
}
