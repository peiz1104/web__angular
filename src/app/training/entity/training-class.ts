import { Forum } from './../../forum/ordinary-forum/entity/forum';
import { User } from 'app/system/entity/user';
import { NoticeBox } from './../../public-suite/notice-box/entity/notice-box';
export type TrainingClassStage = 'PREPARE' | 'APPLY' | 'IN_PROGRESS' | 'FINISHED';
export type TrainingType = 'ONLINE' | 'OFFLINE' | 'MIXED';

export class TrainingClass {
    id?: number;
    name?: string;
    code?: string;
    description?: string;
    imageUrl?: string;
    siteId?: number;
    siteName?: string;

    noticeBoxId?: number;
    noticeBox?: NoticeBox;
    // type?: string;
    isPublished?: boolean;
    userGroupId?: number;
    userGroupName?: string;

    startDate?: Date;
    endDate?: Date;
    enrollStart?: Date;
    enrollEnd?: Date;
    enrollMax?: number;
    enrollMin?: number;

    // openConditonId?: number;
    // closedConditonId?: number;
    // requiredConditonId?: number;
    openCondition?: { id?: number };
    closedCondition?: { id?: number };
    requiredCondition?: { id?: number };
    messageBoxId?: number;
    stage?: TrainingClassStage; // string;
    trainingType?: TrainingType;
    categoryId?: number;
    categoryName?: string;

    address?: string;
    // sponsorDept: UserGroup; 主办单位
    // undertakeDept: UserGroup; 协办单位
    triningAddress?: string
    belongedProject?: string;
    leaders?: User[];
    performers?: User[];
    sponsorDeptId?: number;
    sponsorDeptName?: string;
    undertakeDeptId?: number;
    undertakeDeptName?: string;

    materialGroupId: number;

    salesEnabled?: boolean;
    originalPrice?: number;
    price?: number;
    monetaryUnit?: string;

    selfElective?: boolean;
    ratedPeriod?: number;
    forum: Forum;
    regPersonNumber?: number;
    isArchived?: boolean;
}
