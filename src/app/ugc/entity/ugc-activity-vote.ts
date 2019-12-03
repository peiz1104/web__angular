import { User } from 'app/system/entity/user';

export type UgcActivityVoteType = 'USER_ONCE' | 'USER_ONCE_EVERYDAY';

export class UgcActivityVote {
    id: number;
    activityId: number;
    title: string;
    startDate: Date;
    endDate: Date;
    type: UgcActivityVoteType;
    maxChoice: number;
    isAll: boolean;
    workCount: number;
}
