import { Paper } from "./paper.model";
import { UserGroup } from "../system/entity/user-group";
import { OfferingAssess } from './offeringAssess.model';
export class AssessPaper {
    id: number;
    name: string;
    description: string;
    startDate: Date;
    endDate: Date;
    isAnonymous: string;
    status: string;
    isPublished: boolean;
    paper: Paper;
    paperName: string;
    imageUrl: string;
    offeringId: number;
    offeringAssess: OfferingAssess;
}
