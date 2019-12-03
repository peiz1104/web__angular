import { UserGroup } from 'app/system/entity/user-group';
export class AccountInfo {
    id: number;
    username: string;
    fistName: string;
    lastName: string;
    displayName: string;
    email: string;
    phoneNumber: string;
    sex: 'MALE' | 'FAMALE';
    startDate: Date;
    endDate: Date;
    status: 'ACTIVE' | 'LOCKED';
    IDCardNumber: string;
    isSystemUser: boolean;

    siteId: number;
    siteName: string;
    siteShortName: string;

    userGroupId: number;
    userGroupName: string;

    managerGroup: UserGroup;

    language: 'zh_CN' | 'en_US';

    defaultRole: 'LEARNER' | 'INSTRUCTOR' | 'ADMINISTRATOR';
}
