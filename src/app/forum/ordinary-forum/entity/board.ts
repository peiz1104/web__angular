import { UserGroup } from 'app/system/entity/user-group';
export class Board {
    id: number;
    name: string;
    description: string;
    cover: string;
    topicCount: number;
    userCount: number;
    isPublished: boolean;
    isDefault: boolean;
    organization: UserGroup;
    boardType: string;
    createdDate: string;
}
