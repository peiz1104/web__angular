import { User } from 'app/system/entity/user';

export type UgcActivityVoteType = 'USER_ONCE' | 'USER_ONCE_EVERYDAY';

export class UgcActivityVoteOption {
    id: number;
    voteId: number;
    work: string;
    votes: number;
}
