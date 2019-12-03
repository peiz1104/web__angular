import { PersonnelClassification } from './../../personnel-classification/entity/personnel-classification';

export class TrainingClassification {
    id?: number;
    name?: string;
    createdDate?: string;
    createdByDisplayName?: string;
    personnelClassification?: PersonnelClassification;
}
