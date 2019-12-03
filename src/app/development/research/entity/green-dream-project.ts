import { ResearchPlan } from "app/planning/annualplan/entity/researchplan";
export class GreenDreamProject {
    id?: number;
    researchPlan?: ResearchPlan; // 年度计划id
    name?: string;
    userType?: string;
    devType?: string;
    devStatus?: string;
    trainingDate?: string;
    startDate?: String;
    endDate?: String;
    trainingPlace?: String;
    trainingDays?: number;
    trainingNumber?: number;
    meetingCosts?: number;
    trainingBudget?: number;
    researchCost?: number;
    transportCosts?: number;
    researchContent?: String;
    remark?: String;
}
