import { Category } from './../../../system/category/entity/category';
import { UserGroup } from './../../../system/entity/user-group';
import { Rco } from './rco';

export class Course {
    id?: number;
    name?: string;
    description?: string;
    code?: string;
    duration?: number;  // 课程时长
    period?: number;    // 学时数
    version?: string;
    imageUrl?: string;
    point?: number;     // 学分积分
    courseType?: 'ONLINE' | 'LIVE' | 'OFFLINE' | null;
    platform?: 'NONE' | 'PC' | 'MOBILE' | 'ALL' | null;
    isPublished?: boolean;
    isArchived?: boolean;
    browsers?: string[];

    keyWords?: string;

    rco?: Rco;
    userGroup?: UserGroup;
    category?: Category;

    courseTrainCount: number = 0;

    materialGroupId?: number;
    sourceType: 'ORIGINAL' | 'REFERENCED' | 'COPIED';
    authorization?: string;
    turnAuthorization?: string;
    motherId?: number;
    bigId?: number;
    smallId?:  number;
}
