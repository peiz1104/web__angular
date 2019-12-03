import { Survey } from "app/survey/survey.model";
import { UserGroup } from "../system/entity/user-group";
import { OfferingSurvey } from "app/survey/offeringSurvey.model";
export class SurveyPaper {
    id: number;
    name: string;
    description: string;
    imageUrl: string;
    startDate: Date;
    endDate: Date;
    isAnonymous: string;
    status: string;
    isPublished: boolean;
    offeringSurvey: OfferingSurvey;
    offeringId: number;
    paper: Survey;
    paperName: string;
    userGroup: UserGroup;
    openCondition?: { id?: number };
    closedCondition?: { id?: number };
    requiredCondition?: { id?: number };
}
