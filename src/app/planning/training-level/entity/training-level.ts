import { TrainingClassification } from './../../training-classification/entity/training-classification';

export class TrainingLevel {
    id?: number;
    name?: string;
    createdDate?: string;
    createdByDisplayName?: string;
    trainingClassification?: TrainingClassification;
    isAdjust?: any;
    shouldAbsence?: any;
    maxAbsence?: any;

}
