import { User } from 'app/system/entity/user';
import { UgcActivityCategory } from './ugc-activity-category';



export class UgcActivityEnrollment {
    id: number;
    activityId: number;
    user: User;
    category: UgcActivityCategory;
    createdDate: Date;
}
