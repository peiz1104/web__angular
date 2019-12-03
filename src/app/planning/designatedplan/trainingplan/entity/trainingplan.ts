import { UserGroup } from './../../../../system/entity/user-group';
import { PersonnelClassification } from './../../../personnel-classification/entity/personnel-classification';
import { TrainingClassification } from './../../../training-classification/entity/training-classification';
import { TrainingLevel } from './../../../training-level/entity/training-level';
export class TrainingPlan {
    id?: number; // 计划id
    annualPlanId?: number; // 年度计划id
    name?: string; // 计划名称
    projectNumber?: String; // 计划编号
    trainingBudget?: number = 0; // 预算
    approvalStatus?: string; // 审核状态
    createdDate?: string; // 填报日期
    createdByDisplayName?: string; // 填报人
    lastModifiedByDisplayName?: string; // 修改人
    trainingDate?: string; // 培训时间
    trainingPlace?: string; // 培训地点
    staffCategory?: string; // 人员分类
    trainingCategory?: string; // 培训分类
    copyCount?: number; // 复制期数
    userGroup?: UserGroup; // 组织
    trainingDays?: number; // 培训天数
    trainingNumber?: number; // 培训人数
    correspondingNumber?: number; // 本级人数
    trainingObject?: string; // 培训对象
    trainingCostPer?: number; // 培训经费标准
    otherCosts?: number; // 其它费用
    trafficFee?: number; // 交通费用
    expenseLevel?: number; // 本级公司承担费用
    expenseLower?: number; // 下级公司承担费用
    trainingContent?: string; // 培训内容
    remark?: string; // 备注
    isDesignatingCourse?: boolean; // 是否指定课程
    isCompulsory?: boolean; // 是否必修
    isQuote?: boolean; // 是否必办
    isDesignated?: boolean; // 是否指定


    message?: string; // 审批信息
    approvalOperate?: string; // 审批操作
    lastModifiedDate?: string; // 修改时间

    personnelClassification: PersonnelClassification;
    trainingClassification: TrainingClassification;
    trainingLevel: TrainingLevel;
}
