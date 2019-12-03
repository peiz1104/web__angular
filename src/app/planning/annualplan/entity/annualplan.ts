import { UserGroup } from './../../../system/entity/user-group';
export class AnnualPlan {
    id?: number;
    name?: string;
    trainingBudget?: number = 0;
    researchBudget?: number = 0;
    publishStatus?: boolean;
    approvalStatus?: string;
    createdDate?: string;
    lastModifiedDate?: string;
    userGroupName?: string;
    createdByDisplayName?: string;
    orgName?: string;
    years?: number = new Date().getFullYear();
    org?: UserGroup;
}
