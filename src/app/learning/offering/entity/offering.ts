import { Condition } from './condition';

export interface Offering {
    id?: number;
    name?: string;

    requiredCondition?: Condition;
    openCondition?: Condition;
    closedCondition?: Condition;
    isArchived?: boolean;
}
