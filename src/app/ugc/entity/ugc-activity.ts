import { User } from 'app/system/entity/user';
import { Category } from '../../system/category/entity/category';
import { Forum } from '../../forum/ordinary-forum/entity/forum';
export type UgcActivityStatus = 'DRAFT' | 'PREPARE' | 'GOING' | 'FINISHED';

export class UgcActivity {
    id: number;
    title: string;
    thumbnail?: string;
    cover?: string;
    userGroupId: number;
    userGroupName: string;
    startDate: Date;
    endDate: Date;
    enrollStartDate: Date;
    enrollEndDate: Date;
    content: string;
    noticeBoxId?: number;
    messageBoxId?: number;
    status: UgcActivityStatus;
    isAudit: boolean;
    leaders?: User[];
    siteId: number;
    siteName: string;
    workCount: number;
    enrollmentCount: number;
    viewCount: number;
    condition?: { id?: number };
    category: Category;
    voteId: number;
    forum: Forum;
    isPublished: boolean;

    uploadStartDate: Date;
    uploadEndDate: Date;
}
