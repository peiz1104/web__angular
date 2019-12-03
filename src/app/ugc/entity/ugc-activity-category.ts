import { User } from 'app/system/entity/user';

export type UgcActivityCategoryType = 'CATEGORY' | 'SUBJECT';

export class UgcActivityCategory {
    id: number;
    activityId: number;
    name: string;
    parent: UgcActivityCategory;
    type: UgcActivityCategoryType;
    userUpperLimit: number;
    displayOrder: number;
    hasChildren?: boolean;
    description: string;
}
