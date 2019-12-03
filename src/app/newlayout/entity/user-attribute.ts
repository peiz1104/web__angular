import { UserTypes } from './user-type';

export class UserAttribute {
    id: number;
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
    userTypes?: UserTypes = new UserTypes();
    education?: any
}
