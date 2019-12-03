import * as moment from 'moment';
export class
    Examination {
    answerDisplay: boolean;            // 类型：Boolean  必有字段  备注：是否可查正确答案
    countmCode?: string;                // 类型：String  必有字段  备注：计分方式
    enrollEnd?: Date;                 // 类型：String  可有字段  备注：报名截止时间
    enrollStart?: Date;               // 类型：String  可有字段  备注：报名开始时间
    enterExamTime?: Date;             // 类型：String  必有字段  备注：允许进入考试的截止时间
    etmCode?: string;                   // 类型：String  必有字段  备注：考试计时方式
    examDesc?: string;                  // 类型：String  必有字段  备注：考试说明
    examName: string;                  // 类型：String  必有字段  备注：考试名称
    examTime?: number;                  // 类型：Number  必有字段  备注：考试时长
    examType?: string;                  // 类型：String  必有字段  备注：考试类型：默认EXAM
    examcount?: number;                 // 类型：Number  必有字段  备注：可重考次数（0：无限）
    isDeleted?: boolean;                // 类型：Boolean  必有字段  备注：无
    isDistributed?: boolean;            // 类型：Boolean  必有字段  备注：是否启用分布式
    isPreGenerated?: boolean;           // 类型：Boolean  必有字段  备注：是否启用预生成
    isPutout?: boolean;                 // 类型：Boolean  必有字段  备注：是否发布
    isSeeExampaper?: boolean;           // 类型：Boolean  必有字段  备注：是否可查看试卷
    lowLine?: number;                   // 类型：Number  必有字段  备注：最低分数线
    moreUser?: string;                  // 类型：String  必有字段  备注：是否启用验证码：ENABLE：启用，但考试不可见，DISBLE：不启用，ENABLE_VISI：启用，且考生可见
    onfocusCount?: number;              // 类型：Number  必有字段  备注：允许切屏次数
    scoreDisplay?: boolean;             // 类型：Boolean  必有字段  备注：是否显示成绩
    screenCode?: string;                // 类型：String  必有字段  备注：切屏管理方式
    siteId?: number;                    // 类型：Number  必有字段  备注：组织ID
    startTime?: Date;                 // 类型：String  必有字段  备注：考试开始时间
    paperId?: number;                   // 类型：Number  必有字段  备注：试卷ID
    paperName?: string;                 // 类型：String    备注：试卷名称
    siteName?: string;                  // 类型：String  必有字段  备注：站点名称
    resultRelease?: Date;              // 类型：String  必有字段  备注：成绩发布时间
    reviewTest?: Date;              // 类型：String  必有字段  备注：可回顾考试时间
    dicType?: string;              // 类型：String  必有字段  备注：考试类型 SHOW_TYPE-试卷显示方式,THE_TITLE_METHODS-出题方式,
    // DISPLAY_ORDER-显示顺序,SCREEN_MANAGER-切屏管理方式,COUNT_METHOD-计分方式，TIME_MEANS-计时方式，STAFF_TYPE-管理人员类型，TEST_STATUS-考试状态
    end_time?: Date;              // 类型：String  必有字段  备注：最迟交卷时间
    isUserInfo?: boolean;         // 类型：boolean 必有字段  备注 阅卷显示学生信息
    examWh?: String;              // 类型： string 必有字段 备注  考试归属类型
    examId?: string;               // 类型  number 必有字段 备注 考试id
    imageUrl?: String;               // 类型： string 必有字段 备注  考试封面地址
    id?: Number               // 类型： number 必有字段  备注  考试活动ID
    name?: String;                  // 类型： string 必有字段 备注  考试名称
    description: String;                  // 类型： string 必有字段 备注  描述
    userGroupId?: number               // 类型： number 必有字段  备注  站点ID
    type?: String                        // 类型 string 必有字段   考试类型
    isPublished?: boolean               // 类型 boolean 必有字段  是否发布
    startDate?: Date              // 必有  考试开始时间
    endDate?: Date              // 必有  考试结束时间
    userGroupName?: string          // 必有  组织机构名
    answerDisplayTime?: Date        // 必有  可回顾考试时间
    scoreDisplayTime?: Date  //  必有  成绩发布时间
};
export class ExamList {
    examName?: string; // 考试名称
    startDateTime?: Date; // 创建开始时间
    endDateTime?: Date; // 创建结束时间
    isPutout?: number; // 是否发布；1：发布，0：未发布
    startTime?: Date; // 考试起始时间
    enterExamTime?: Date; // 考试结束时间
    createdUserName?: string // 创建人
}
