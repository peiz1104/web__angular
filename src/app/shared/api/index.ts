import { OrgTreeApiService } from './org-tree-api.service';
import { UserLookupApiService } from './user-lookup-api.service';

export { OrgTreeApiService } from './org-tree-api.service';
export { UserLookupApiService } from './user-lookup-api.service';


export const SHARED_APIS = [
    OrgTreeApiService,
    UserLookupApiService
];
