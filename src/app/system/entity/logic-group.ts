import { Condition } from '../../learning/offering/entity/condition';
import { Site } from './site';
import { User } from './user';
import {UserGroup} from "./user-group";

export class LogicGroup {
    id: number;
    name: string;
    description: string;
    isPrivate: string;
    condition: Condition;
    site: Site;
    userGroup: UserGroup;
    editSettig: boolean;
    isPutout?: boolean;
}
