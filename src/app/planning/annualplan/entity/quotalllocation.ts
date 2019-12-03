import { UserGroup } from './../../../system/entity/user-group';
export class QuotaAllocation {
    id: number;
    quotaCount: number; // 分配数量
    trainingPlanId: number; // 培训计划id
    userGroup: UserGroup; // 机构
}
