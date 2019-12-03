import { LogicGroup } from './../../../system/entity/logic-group';
export interface UserInfo {
    id?: number;
    username?: string;
    displayName?: string;
    avatar?: string;
    userGroupId?: number;
    userGroupName?: string;
    phoneNumber?: string;
    email?: string;
}

export interface UserGroupInfo {
    id?: number;
    name?: string;
    code?: string;
}

export interface SiteInfo {
    id?: number;
    name?: string;
}

export interface Term {
    id?: number;

    condition?: { id: number };
    termType?: 'USER' | 'USER_GROUP' | 'LOGIC_GROUP' | 'SITE' | 'ATTRIBUTE';
    matchedType?: 'MATCH_CHILDREN' | 'DONT_MATCH_CHILDREN';

    user?: UserInfo;
    userGroup?: UserGroupInfo;
    matchedSite?: SiteInfo;
    logicalGroup?: LogicGroup;
    judgeTbcMax?: string;
}
