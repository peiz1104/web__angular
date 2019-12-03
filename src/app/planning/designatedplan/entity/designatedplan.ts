import { UserGroup } from './../../../system/entity/user-group';
export class DesignatedPlan {
    id?: number;
    name?: string;
    createdDate?: string;
    userGroupName?: string;
    createdByDisplayName?: string;
    org: UserGroup;
}
