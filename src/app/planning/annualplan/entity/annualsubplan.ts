import { UserGroup } from './../../../system/entity/user-group';
import { TrainingSchool } from './../../trainingschool/entity/trainingschool';
import { PersonnelClassification } from './../../personnel-classification/entity/personnel-classification';
import { TrainingClassification } from './../../training-classification/entity/training-classification';
import { TrainingLevel } from './../../training-level/entity/training-level';
import { AnnualPlan } from './annualplan';
import { QuotaAllocation } from './quotalllocation';
export class AnnualSubPlan {
    id?: number; // 计划id
    annualPlanId?: number; // 年度计划id
    annualPlan?: AnnualPlan;
    name?: string; // 计划名称
    projectNumber?: String; // 计划编号
    planType?: String; // 计划类型
    trainingBudget?: number = 0; // 预算
    trainingPlace?: String; // 培训地点
    approvalStatus?: string; // 审核状态
    createdDate?: string; // 填报日期
    groupName?: string; // 填报单位
    displayName?: string; // 填报人
    createdByDisplayName?: string;
    orgName?: string;
    executingState?: String; // 执行状态
    planIdentifier?: String; // 计划标识
    aheadOpening?: String; // 提前开班
    trainingDate?: string; // 培训时间
    trainingCategory?: string; // 培训分类
    copyCount?: number; // 复制期数
    userGroup?: UserGroup; // 组织
    isEdit?: boolean; // 计划是否可编辑（判断逻辑集成在服务端）
    /********************以下为境内内部培训新加字段********************/
    trainingDays?: number; // 培训天数
    trainingNumber?: number; // 培训人数
    correspondingNumber?: number; // 本级人数
    trainingObject?: string; // 培训对象
    trainingCostPer?: number; // 培训经费标准
    lectuerTransportationFee?: number; // 讲师交通费
    lectuerBoard?: number; // 讲师食宿
    outsideLectuerPretaxFee?: number; // 外部讲师税前授课费
    commission?: number; // 佣金
    wages?: number; // 工资
    otherCosts?: number; // 其它费用
    trafficFee?: number; // 本级交通费
    trafficFeeLower?: number; // 下级交通费
    expenseLevel?: number; // 本级公司承担费用
    expenseLower?: number; // 下级公司承担费用
    trainingContent?: string; // 培训内容
    remark?: string; // 备注
    quotaAllocation: QuotaAllocation[]; // 名额分配

    /********************以下为课件研发新加字段********************/
    meetingCosts?: number; // 会议费
    researchCost?: number; // 研发费用
    transportCosts?: number; // 交通费
    researchContent?: string; // 研发内容

    /********************以下为其它计划新加字段********************/
    category?: string; // 类别
    isTrainingBudget?: boolean; // 是否占用培训预算

    message?: string; // 审批信息
    approvalOperate?: string; // 审批操作

    /********************以下为历史记录新加字段********************/
    lastModifiedDate?: string; // 修改时间

    /*************************整合研修院添加************************/
    isTrainingSchoolPlan: boolean; // 是否是研修院计划
    trainingSchool: TrainingSchool; // 研修院
    schoolId: number; // 研修院id

    /********************人员分类、培训分类、培训级别**************/
    personnelClassification: PersonnelClassification;
    trainingClassification: TrainingClassification;
    trainingLevel: TrainingLevel;
}
