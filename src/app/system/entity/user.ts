import { UserGroup } from './user-group';
import { Site } from './site';
import { UserAttribute } from './user-attribute';



export class User {
    id: number;
    username: string;
    password?: string;
    confirmPassword?: string;
    modifyPassword?: string;

    email?: string;
    firstName?: string;
    lastName?: string;
    displayName?: string;

    phoneNumber?: string;
    sex?: string; // enum Sex {MALE, FAMALE}
    // startDate?: Date;
    // endDate?: Date;
    startDate?: Date;
    endDate?: Date;
    status?: string; // enum AccountStatus {ACTIVE, LOCKED}

    userGroup?: UserGroup = new UserGroup();
    site?: Site;

    language?: string;
    nationalMz?: string; // 民族
    politicalFeatures?: string; // 政治面貌
    position?: string; // 岗位
    jobs?: string; // 职级
    cupluralityTitle?: string; // 最高学历学校
    graduatedSchool?: string; // 毕业学
    firstSpecialty?: string; // 所学专业一
    secondSpecialty?: string; // 所学专业2
    cupluralityoNumber?: string; // 从事寿险行业工作年限
    birthday?: string; // 出生年月
    cupluralityPname?: string; // 从事培训工作年限
    officePhoneNumber?: string; // 办公电话
    iDCardNumber?: any; // 身份证号
    userAttribute?: UserAttribute = new UserAttribute();

    avatar?: string; // 用户头像
    isSystemUser: boolean;
    managerGroup:UserGroup = new UserGroup();
    hasPermission: boolean; 
}


