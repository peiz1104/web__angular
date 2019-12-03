import { TrainingClass } from 'app/training/entity/training-class';
import { User } from 'app/system/entity/user';

export class TrainClassAttendance {
    id: number;
    score: number;
    status: string;
    trainingClass: TrainingClass;
    user: User
}
