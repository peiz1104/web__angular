import { UserGroup } from 'app/system/entity/user-group';
import { User } from 'app/system/entity/user';


export class UgcActivityAuditor {
    id: number;
    activityId: number;
    user: User;
    scopes: UserGroup[];
}
