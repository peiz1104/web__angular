import { UserGroup } from './../../../../system/entity/user-group';
export class ApprovalInfo {
    id?: number;
    createdDate?: string;
    approvalStatus?: string;
    comments?: string; // 审批意见
    planType?: string // 计划类型
    planId?: number;
    createdByDisplayName?: string; // 审批人
    userGroup?: UserGroup;
}
