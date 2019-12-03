import { User } from 'app/system/entity/user';



export class UgcActivityAward {
    id: number;
    activityId: number;
    title: string;
    content: string;
    isPublished: boolean;
    createdBy: User;
    createdDate: Date;
}
