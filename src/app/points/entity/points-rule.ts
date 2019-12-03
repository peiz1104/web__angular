import { PointsRuleType } from './points-rule-type';

export class PointsRule {
    id?: number;
    name?: string;
    cycleTime?: string;
    points?: number;

    // private Points_type pointstype;
    typeId?:number;
    createdById?: number;
    createdByUsername?: string;
    createdByDisplayName?: string;
    createdDate?: Date;
    pointsRuleType?: PointsRuleType;
    // private Site site;
    orgId?: number;
    ugName?: string;
    ugshortName?: string;
}
