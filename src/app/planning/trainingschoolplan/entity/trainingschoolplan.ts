import { PersonnelClassification } from './../../personnel-classification/entity/personnel-classification';
import { TrainingClassification } from './../../training-classification/entity/training-classification';
import { TrainingLevel } from './../../training-level/entity/training-level';
import { UserGroup } from 'app/system/entity/user-group';

export class TrainingSchoolPlan {
    id?: number; // 计划id
    annualPlanId?: number;
    name?: string; // 计划名称
    projectNumber?: String; // 计划编号
    planType?: String; // 计划类型
    planIdentifier?: String; // 计划标识 P:普通计划、Z:指定计划、F:分配计划、L:临时计划、Y:延续计划
    trainingDate?: String; // 培训时间
    trainingPlace?: String; // 培训地点
    trainingDays?: number; // 培训天数
    trainingNumber?: number; // 培训人数
    correspondingNumber?: number; // 本级人数
    trainingObject?: String; // 培训对象
    trainingCategory?: String; // 培训分类 Z:制式 F：非制式
    trainingTeachers?: String; // 培训师资
    trainingCostPer?: number; // 培训经费标准
    lectuerTransportationFee?: number; // 讲师交通费
    lectuerBoard?: number; // 讲师食宿
    outsideLectuerPretaxFee?: number; // 外部讲师税前授课费
    commission?: number; // 佣金
    wages?: number; // 工资
    otherCosts?: number; // 其它费用
    trafficFee?: number; // 本级交通费
    trainingBudget?: number; // 培训经费预算
    expenseLevel?: number; // 本级公司承担费用
    expenseLower?: number; // 下级公司承担费用
    trainingDistribution?: String; // 培训名额分配情况
    trainingContent?: String; // 培训内容
    remark?: String; // 备注
    approvalStatus?: string; // 审批状态：N：未提交  A：待审核	P：已通过  R：已拒绝    C：已取消
    executingState?: String; // 执行状态 ：N：未执行 O：已开班  E：已执行
    personnelClassification: PersonnelClassification;
    trainingClassification: TrainingClassification;
    trainingLevel: TrainingLevel;
    userGroup?: UserGroup;
}
