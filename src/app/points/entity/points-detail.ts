import { UserGroup } from 'app/system/entity/user-group';
import { Site } from 'app/system/entity/site';
import { User } from 'app/system/entity/user';
export class PointsDeatil {

    id: number;
    user?:User;
    userGroup?: UserGroup;
    site?: Site;

    operScore?: Float32Array;
}
