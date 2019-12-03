import { User } from 'app/system/entity/user';
import { UgcActivityEnrollment } from './ugc-activity-enrollment';
import { UgcActivityCategory } from './ugc-activity-category';
import { UgcCourse } from './ugc-course';

export type UgcActivityWorkStatus = 'APPLIED' | 'REFUSED' | 'ENROLLED' | 'ARCHIVE';

/**
 *作品课程类型：
 *  ORIGINAL 原生课程，可修改
 *  REFERENCED 引用课程， 不可修改
 */
export type UgcActivityWorkSourceType = 'ORIGINAL' | 'REFERENCED';


export class UgcActivityWork {
    id: number;
    activityId: number;
    courseId: number;
    courseName: string;
    courseImageUrl: string;
    courseIntro: string;
    course: UgcCourse;
    sourceType: UgcActivityWorkSourceType;
    code: number;
    isExcellent: Boolean;
    category: UgcActivityCategory;
    auditorUser: User;
    ownerUser: User;
    status: UgcActivityWorkStatus;
    reason: string;
    siteId: number;
    siteName: string;
    createdDate: Date;
}
