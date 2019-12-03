import { Forum } from './../../forum/ordinary-forum/entity/forum';
import { UserGroup } from './../../system/entity/user-group';
import { Category } from '../../system/category/entity/category';
export class SubjectActivity {
    id?: number;
    isPublished: boolean;
    isSuperior: boolean;
    name?: string;
    code?: string;
    description?: string;
    imageUrl?: string;
    siteId?: number;
    siteName?: string;

    upEnabled?: boolean;
    downEnabled?: boolean;

    salesEnabled?: boolean;

    noticeBoxId?: number;
    userGroup?: UserGroup;

    userGroupId?: number;
    userGroupName?: string;
    categoryId?: number;
    categoryName?: string;

    content?: string;
    keyWords?: string;
    innerOuter?: string;
    link?: string;
    displayOrder?: number;

    startDate?: Date;
    endDate?: Date;
    enrollStart?: Date;
    enrollEnd?: Date;
    enrollMax?: number;
    enrollMin?: number;

    openCondition?: { id?: number };
    closedCondition?: { id?: number };
    requiredCondition?: { id?: number };
    messageBoxId?: number;
    category: Category;
    materialGroupId: number;
    forum: Forum;
}
