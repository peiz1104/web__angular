import { Category } from './../../../system/category/entity/category';
import { Forum } from './../../../forum/ordinary-forum/entity/forum';
import { NoticeBox } from './../../../public-suite/notice-box/entity/notice-box';
import { UserGroup } from './../../../system/entity/user-group';
import { OfferingCourse } from './offering-course';
export class Classroom {
    id?: number;
    name?: string;
    description?: string;
    startDate?: string;
    endDate?: string;
    enrollStart?: string;
    enrollEnd?: string;
    userGroupName?: string;
    siteId?: number;
    userGroup: UserGroup;
    category: Category;
    isPublished?: boolean;
    enrollMax?: number;
    enrollMin?: number;
    offeringCourse?: OfferingCourse;
    courseId?: number;
    noticeBox?: NoticeBox;
    enableWaitList?: boolean;
    enableAccredit?: boolean;
    forum?: Forum;
}
