import { UserGroup } from './../../../system/entity/user-group';

export class TrainingSchool {
    id?: number;
    name?: string;
    createdDate?: string;
    userGroupName?: string;
    createdByDisplayName?: string;
    userGroup?: UserGroup;
}
