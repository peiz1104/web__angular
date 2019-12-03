import { User } from 'app/system/entity/user';
import { UgcCourse } from './ugc-course';

export type UgcExampleType = 'EXAMPLE' | 'TUTORIAL';

export class UgcExampleCourse {
    id: number;
    courseId: number;
    courseName: string;
    courseImageUrl: string;
    courseIntro: string;
    course: UgcCourse;
    type: UgcExampleType;
    displayOrder: number;
    isPublished: boolean;
    createdBy: User;
    createdDate: Date;
}
