export class ResearchPlan {
    id?: number;
    annualPlanId?: number; // 年度计划id
    name?: string;
    trainingBudget?: number = 0;
    researchBudget?: number = 0;
    publishStatus?: boolean;
    approvalStatus?: string;
    createdDate?: string;
    userGroupName?: string;
    createdByDisplayName?: string;
    orgName?: string;
    years?: number = new Date().getFullYear();
}
