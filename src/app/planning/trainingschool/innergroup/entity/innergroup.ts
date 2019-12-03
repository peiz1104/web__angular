import { UserGroup } from './../../../../system/entity/user-group';
import { TrainingSchool } from './../../entity/trainingschool';

export class InnerGroup {
    id?: number;
    trainingSchoolId?: number;
    trainingSchool?: TrainingSchool;
    org?: UserGroup;
}
