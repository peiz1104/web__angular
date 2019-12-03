export const MAIN_MENU = [
    { name: '我的工作台', icon: 'icon-kongzhitai-', requirePermission: false },
    { name: '需求管理', icon: 'icon-icon1', requirePermission: { hasPermission: ['REQUIREMENT:*'] } },
    {
        name: '计划管理', icon: 'icon-jihuaguanli', requirePermission: { hasPermission: ['PLANNING:*'] }, children: [
            // tslint:disable-next-line:max-line-length
            { name: '年度计划', icon: 'icon-ninadujihua', route: '/planning/annualplan/list', requirePermission: { hasPermission: ['PLANNING:ANNUAL_PLAN:*', 'PLANNING:ANNUAL_SUB_PLAN:*'] } },
            { name: '研修院计划', icon: 'icon-yanxiuyuanjihua', route: '/planning/trainingschoolplan/list', requirePermission: { hasPermission: ['PLANNING:TRAINING_SCHOOL_PLAN:*'] } },
            {
                // tslint:disable-next-line:max-line-length
                name: '基础配置', icon: 'icon-jichupeizhi', requirePermission: { hasPermission: ['PLANNING:TRAINING_SCHOOL:*', 'PLANNING:DESIGNATED_PLAN:*', 'PLANNING:SUB_GROUP:*', 'PLANNING:SETTING:ATTRIBUTE', 'PLANNING:TRANSPORTATION_FEE:*'] }, children: [
                    // tslint:disable-next-line:max-line-length
                    { name: '研修院管理', icon: 'icon-yanxiuyuanguanli', route: '/planning/trainingschool/list', requirePermission: { hasPermission: ['PLANNING:TRAINING_SCHOOL:*'] } },
                    { name: '指定计划名录', icon: 'icon-zhidingjihuaminglu', route: '/planning/designatedplan/list', requirePermission: { hasPermission: ['PLANNING:DESIGNATED_PLAN:*'] } },
                    // tslint:disable-next-line:max-line-length
                    { name: '机构分组', icon: 'icon-jigoufenzu', route: '/planning/organize', requirePermission: { hasPermission: ['PLANNING:SUB_GROUP:*'] } },
                    /*{ name: '人员分类', icon: 'th-list', route: '/planning/personnelclassification', requirePermission: { hasPermission: ['PLANNING:SETTING:ATTRIBUTE'] } },*/
                    /*tslint:disable-next-line:max-line-length*/
                    /*{ name: '培训分类', icon: 'th-list', route: '/planning/trainingclassification', requirePermission: { hasPermission: ['PLANNING:SETTING:ATTRIBUTE'] } },*/
                    { name: '培训级别', icon: 'icon-peixunjibie', route: '/planning/traininglevel', requirePermission: { hasPermission: ['PLANNING:SETTING:ATTRIBUTE'] } },
                    // tslint:disable-next-line:max-line-length
                    { name: '研修院交通费', icon: 'icon-chalvfeiyongbaoxiao', route: '/planning/traffic', requirePermission: { hasPermission: ['PLANNING:TRANSPORTATION_FEE:*'] } },
                ]
            }
        ]
    },
    {
        name: '培训管理', icon: 'icon-peixunguanli', requirePermission: { hasPermission: ['TRAINING:*'] }, children: [
            {
                name: '计划实施', icon: 'icon-jihuashishi', route: '/training/planing',
                requirePermission: { hasPermission: ['PLANNING:ANNUAL_SUB_PLAN:VIEW'] }
            },
            {
                name: '研修院计划实施', icon: 'icon-yanxiuyuanjihua', route: '/training/researchplan',
                requirePermission: { hasPermission: ['TRAINING:RESEARCHPLAN'] }
            },
            {
                name: '研修院班级管理', icon: 'icon-yijinsheng-mingdan', route: '/training/planmanagement',
                requirePermission: { hasPermission: ['TRAINING:RESEARCHTBC'] }
            },
            {
                name: '班级管理', icon: 'icon-banjiguanli', route: '/training/class/list',
                requirePermission: { hasPermission: ['TRAINING:TRAINING_CLASS:*'] }
            },
            {
                name: '统计报表', icon: 'icon-banjiguanli', route: '/training/statistics',
                requirePermission: { hasPermission: ['TRAINING:ENDCLASS:PUSHRAMIS'] }
            },
            {
                name: '红班管理', icon: 'icon-chakanmingxi', route: '/training/redclassmanage',
                requirePermission: { hasPermission: ['TRAINING:REDCLASS:*'] }
            },
            { name: '拟晋升名单', requirePermission: { hasPermission: ['TRAINING:PROMOTIONUSER:*'] }, icon: 'icon-nijinsheng-mingdan', route: '/training/promotion/proposedpromotion' },
            { name: '已晋升名单', requirePermission: { hasPermission: ['TRAINING:PROMOTIONUSER:*'] }, icon: 'icon-yijinsheng-mingdan', route: '/training/promotion/haspromotion' }

            // { name: '实施情况分析', icon: 'icon-jihua', route: '' },
        ]
    },
    {
        name: '课程学习', icon: 'icon-kechengxuex', requirePermission: { hasPermission: ['LEARNING:*'] }, children: [
            // {name: '课件管理', icon: 'file-zip-o', route: ''},
            {
                name: '课程体系', icon: 'icon-kechengtixi', route: '/learning/course/list',
                requirePermission: { hasPermission: ['LEARNING:COURSE:*'] }
            },
            {
                name: '课程培训', icon: 'icon-kechengpeixun', route: '/learning/classroom/list',
                requirePermission: { hasPermission: ['LEARNING:CLASSROOM:*'] }
            },
            {
                name: '课程学习情况', icon: 'icon-book', route: '/learning/classroom/status',
                requirePermission: { hasPermission: ['LEARNING:REPORT:*'] }
            },
            {
                name: '好课管理', icon: 'icon-haokeguanli', route: '/learning/classroom/recommend',
                requirePermission: { hasPermission: ['LEARNING:CLASSROOM:*'] }
            }
            // {name: '学习路线', icon: 'connectdevelop', route: '/learning/path/list'},
        ]
    },
    {
        name: '研发管理', icon: 'icon-yanfaguanli', requirePermission: { hasPermission: ['DEVELOPMENT:*'] },
        children: [
            // tslint:disable-next-line:max-line-length
            { name: '可执行计划', icon: 'icon-kezhixingjihua', requirePermission: { hasPermission: ['DEVELOPMENT:EXECUTABLE_PLAN:*'] }, route: '/development/implementation/list', },
            { name: '研发项目', icon: 'icon-yanfaxiangmu', requirePermission: { hasPermission: ['DEVELOPMENT:GREEN_DREAMP_ROJECT:*'] }, route: '/development/research/list', },
        ]
    },
    {
        name: '调查评估', icon: 'icon-tiaochaguanli', requirePermission: { hasPermission: ['SURVEY:*', 'ASSESS:*'] },
        children: [
            { name: '调查模板', icon: 'icon-calendar', route: '/survey/tpl', requirePermission: { hasPermission: ['SURVEY:SURVEY_PAPER:*'] } },
            // tslint:disable-next-line:max-line-length
            { name: '调查管理', icon: 'icon-tiaochaguanli', route: '/survey/surveyPaper', requirePermission: { hasPermission: ['SURVEY:SURVEY_ACT:*'] } },
            { name: '评估模板', icon: 'icon-jihuashishi', route: '/assess/assesses', requirePermission: { hasPermission: ['ASSESS:ASSESS_ACT:*'] } }
        ]
    },
    /* {
        name: '评估管理', icon: 'icon-pingguguanli', requirePermission: { hasPermission: ['ASSESS:*'] }, children: [
            { name: '评估问卷', icon: 'icon-pingguwenjuan', route: '/assess/paper' },
            { name: '评估管理', icon: 'icon-pingguguanli', route: '/assess/assesses' },
            { name: '评估模板', icon: 'icon-jihuashishi', route: '/assess/assesses' },
        ]
    }, */
    {
        name: '在线考试', icon: 'icon-zuzhikaoshi', requirePermission: { hasPermission: ['EXAM:*'] }, children: [
            {
                name: '基础配置', icon: 'icon-jichupeizhi', route: '/exam/basic-setting',
                requirePermission: { hasPermission: ['EXAM:SETTING:*'] }
            },
            {
                name: '试题管理', icon: 'icon-shitiguanli', route: '/exam/test-question/list',
                requirePermission: { hasPermission: ['EXAM:QUESTION:*'] }
            },
            {
                name: '试卷管理', icon: 'icon-shijuanguanli', route: '/exam/exam-paper',
                requirePermission: { hasPermission: ['EXAM:PAPER:*'] }
            },
            {
                name: '考试管理', icon: 'icon-kaoshiguanli', route: '/exam/examination',
                requirePermission: { hasPermission: ['EXAM:EXAMINATION:*'] }
            },
        ]
    },
    {
        name: '讲师库', icon: 'icon-jiangshiguanli', requirePermission: { hasPermission: ['TEACHER:*'] }, children: [
            { name: '任职资格管理', requirePermission: { hasPermission: ['TEACHER:QUALIFICATION:*'] }, icon: 'icon-renzhizigeguanli', route: '/library/teacher/qualification' },
            { name: '讲师管理', requirePermission: { hasPermission: ['TEACHER:MANAGEMENT:*'] }, icon: 'icon-jiangshiguanli', route: '/library/teacher/main' },
            { name: '讲师授权管理', requirePermission: { hasPermission: ['TEACHER:EMPOWERMENT:*'] }, icon: 'icon-jiangshishoukeguanli', route: '/library/teacher/grant' },
            { name: '聘任公文管理', requirePermission: { hasPermission: ['TEACHER:OFFICE_QUALIFICATIONS:*'] }, icon: 'icon-pinrengongwenguanli', route: '/library/teacher/employment/documents' },
        ]
    },
    {
        name: '资源管理', icon: 'icon-ziyuanguanli', requirePermission: { hasPermission: ['RESOURCE:*'] }, children: [
            // { name: '讲师库', icon: 'icon-jiaolian1', route: '/library/teacher' },
            { name: '文档库', icon: 'icon-wendangku', route: '/library/document/list', requirePermission: { hasPermission: ['RESOURCE:DOCUMENT_LIB:*'] } },
            // { name: '教材库', icon: 'icon-ziyuanxuqiu', route: '' },
            { name: '证书库', icon: 'icon-zhengshuku', route: '/library/certificate', requirePermission: { hasPermission: ['RESOURCE:CERT_LIB:*'] } },
            // tslint:disable-next-line:max-line-length
            { name: '培训基地', icon: 'icon-peixunjidi', route: '/library/trainBase', requirePermission: { hasPermission: ['RESOURCE:TRAINBASE:*'] } },
            { name: '条线文件管理', icon: 'icon-peixunleixingguanli', route: '/library/barfile', requirePermission: { hasPermission: ['RESOURCE:CALENDAR:*'] } }
            // { name: '图片管理', icon: 'icon-tupianguanli', route: '/library/image' }, 
            /* { name: '案例管理', icon: 'icon-anliguanli', route: '/library/case' }, */
            /* {
                name: '资源库管理', icon: 'icon-ziyuankuguanli', children: [
                    { name: '栏目管理', icon: 'icon-lanmuguanli', route: '/system/program-management' },
                    { name: '适用对象管理', icon: 'icon-shiyongduixiangguanli', route: '/system/applicable-objects' },
                    { name: '类型管理', icon: 'icon-peixunleixingguanli', route: '/system/type-management' },
                    { name: '动态图管理', icon: 'icon-dongtaituguanli' },
                    { name: '资源库管理', icon: 'icon-ziyuankuguanli' },
                ]
            }, */
        ]
    },
    {
        name: '学时管理', icon: 'icon-xueshiguanl', requirePermission: { hasPermission: ['PERIOD:*'] }, children: [
            {
                name: '年度学时开关', icon: 'icon-nianduxueshikaiguan', requirePermission: { hasPermission: ['PERIOD:SWITCH:*'] },
                route: '/classhour/hourswitch'
            },
            {
                name: '年度学时任务', icon: 'icon-nianduxueshirenwu', requirePermission: { hasPermission: ['PERIOD:TASK:*', 'PERIOD:USER:*'] },
                route: '/classhour/hourtask/rulelist'
            },
            {
                name: '年度学时查看', icon: 'icon-yuangongnianduxueshichakan', requirePermission: { hasPermission: ['PERIOD:HISTORY:*'] },
                route: '/classhour/hourannual/managementhourlist'
            },
            {
                name: '机构学时查看', icon: 'icon-yuangongnianduxueshichakan', requirePermission: { hasPermission: ['PERIOD:USER_GROUP:*'] },
                route: '/classhour/grouphour/grouphourlist'
            },
            // {
            // name: '学时审核管理', icon: 'icon-shijian1', requirePermission:
            //   { hasPermission: ['PERIOD:DECLARE_OTHER:*', 'PERIOD:AUDIT:*' ] }, children: [
            {
                // tslint:disable-next-line:max-line-length
                name: '学时申报审核', icon: 'icon-xueshishenhe', requirePermission: { hasPermission: ['PERIOD:AUDIT:*', 'PERIOD:DECLARE_OTHER:*'] },
                route: '/classhour/houraduitmanage/hourauditdeclarelist'
            },
            {
                name: '教辅管理', icon: 'icon-yijinsheng-mingdan', requirePermission: { hasPermission: ['PERIOD:ASSISTANT:*'] },
                route: '/classhour/hourassist'
            },
            {
                name: '部门学时管理', icon: 'icon-jiaoseguanli',
                requirePermission: { hasPermission: ['PERIOD:AUDIT:*', 'PERIOD:DECLARE_OTHER:*'] },
                route: '/classhour/deparmenthour'
            },
            {
                name: '配置管理', icon: 'icon-peizhiguanli', requirePermission: {
                    hasPermission: ['PERIOD:TRAINING_TYPE:*',
                        'PERIOD:TRAINING_THEME:*', 'PERIOD:TRAINING_WEY:*', 'PERIOD:TRAINING_SOURCE:*']
                },
                children: [
                    {
                        name: '培训类型管理', icon: 'icon-peixunleixingguanli', requirePermission: { hasPermission: ['PERIOD:TRAINING_TYPE:*'] },
                        route: '/classhour/hourconfiguration/traintypename'
                    },
                    {
                        name: '培训主题管理', icon: 'icon-peixunzhutiguanli', requirePermission: { hasPermission: ['PERIOD:TRAINING_THEME:*'] },
                        route: '/classhour/hourconfiguration/traintitem'
                    },
                    {
                        name: '培训方式管理', icon: 'icon-peixunfangshi-qudaoguanli', requirePermission: { hasPermission: ['PERIOD:TRAINING_WEY:*'] },
                        route: '/classhour/hourconfiguration/trainchannel'
                    },
                    {
                        name: '培训来源管理', icon: 'icon-peixunlaiyuanguanli', requirePermission: { hasPermission: ['PERIOD:TRAINING_SOURCE:*'] },
                        route: '/classhour/hourconfiguration/trainsource'
                    }
                ]
            },
        ]
    },
    {
        name: '组织管理', icon: 'icon-zuzhiguanli', requirePermission: { hasPermission: ['SYSTEM:*'] }, children: [
            {
                name: '用户管理', icon: 'icon-yonghuguanli', route: '/system/user/list',
                requirePermission: { hasPermission: ['SYSTEM:USER:*'] },
            },
            {
                name: '部门管理', icon: 'icon-bumenguanli', route: '/system/userGroup',
                requirePermission: { hasPermission: ['SYSTEM:USER_GROUP:*'] },
            },
            {
                name: '用户组管理', icon: 'icon-yonghuzuguanli', route: '/system/logicGroup',
                requirePermission: false,
            },
            {
                name: '角色管理', icon: 'icon-jiaoseguanli', route: '/system/role',
                requirePermission: { hasPermission: ['SYSTEM:ROLE:*'] }
            },
            {
                name: '授权管理', icon: 'icon-shouquanguanli', route: '/system/permission',

                requirePermission: { hasPermission: ['SYSTEM:PERMISSION:*'] }
            },
        ]
    },
    {

        name: '门户管理', icon: 'icon-menhuguanli', requirePermission: { hasPermission: ['PORTAL:*'] }, children: [
            {
                name: '图片库', icon: 'icon-tupianguanli', route: '/portal/banner',
                requirePermission: { hasPermission: ['PORTAL:BANNER:*'] }
            },
            /* {
                name: '站点公告', icon: 'icon-zhandiangonggao', route: '/system/notice-box',
                requirePermission: { hasPermission: ['PORTAL:SITE_NOTICE:*'] }
            }, */
            {
                name: '新闻资讯', icon: 'icon-news', route: '/portal/news',
                requirePermission: { hasPermission: ['PORTAL:NEWS:*'] }
            },
            /* { name: '页眉页脚', icon: 'icon-yemeiyejiao', route: '/portal/footer' }, */
            // tslint:disable-next-line:max-line-length
            { name: '首页配置', requirePermission: { hasPermission: ['PORTAL:HOME_TPL:*'] }, icon: 'icon-shouyepeizhi', route: '/homeconfig/template' }

            // { name: '快速链接', icon: 'link', route: '/portal/link'},
        ]
    }, {
        name: '积分管理', icon: 'icon-jifenguanli', requirePermission: { hasPermission: ['POINT:*'] }, children: [
            {
                name: '积分规则', icon: 'icon-jifenguize', route: '/points/rule',

            },
            {
                name: '积分信息', icon: 'icon-jifenxinxi', route: '/points/detaillist',

            },
            {
                name: '积分商城', icon: 'icon-jifenshangcheng', route: '/points/mall',

            },
            { name: '导入积分', icon: 'icon-daoru1', route: '/portal/footer' },
            // { name: '快速链接', icon: 'link', route: '/portal/link'},
        ]
    },
    {
        name: '站点配置', icon: 'icon-zhandianpeizhi', requirePermission: { hasPermission: ['SETTINGS:*'] }, children: [
            {
                name: '站点信息', icon: 'icon-zhandianxinxi', route: '/system/site/info',
                requirePermission: { hasPermission: ['SETTINGS:SITE:*'] }
            },
            /*  {
                 name: '站点消息', icon: 'icon-73', route: '/system/site/message',
             }, */
            { name: '策略配置', icon: 'icon-celvepeizhi', route: '/system/strategy/site/list' },
            //{ name: '内容服务器', icon: 'icon-neirongfuwuqi', route: '/system/server' },
            { name: '系统分类', icon: 'icon-xitongfenlei', route: '/system/category' },
            { name: '编码配置', icon: 'icon-yemeiyejiao', route: '/system/code' },
            //{ name: '安装和配置', icon: 'icon-anzhuang-peizhi', route: '/system/setting' },
            { name: '证书分类', icon: 'icon-zhengshufenlei', route: '/system/cert-type' },
            // { name: '主题配置', icon: '', route: '' },
            // { name: '编码配置', icon: '', route: '' },
            /*{
                name: '自定义属性', icon: 'icon-zidingyishuxing', route: '/system/setting/attribute',
                requirePermission: { hasPermission: ['SETTINGS:CUSTOM_ATTRIBUTE:*'] }
            },*/
            {
                name: '手动调用接口', icon: 'icon-zhengshufenlei', route: '/system/manual-call-interface',
                requirePermission: { hasPermission: 'TRAINING:ENDCLASS:PUSHRECORD' }
            },
            /* {
                 name: '报表查看', icon: 'icon-baobiaofenxi', route: '/system/reportform',
                 requirePermission: { hasPermission: 'TRAINING:ENDCLASS:PUSHRECORD' }
             },*/
        ]
    },
    /* {
        name: '论坛管理', icon: 'icon-yonghuzuguanli', children: [
            {
                name: '基本设置', icon: 'icon-yanxiuyuanguanli', route: '/forum/base-setting',
            },
            // {
            //     name: '分类管理', icon: 'envira', route: '/ugc/example-course',
            // },
            {
                name: '词语过滤', icon: 'icon-065chakandingdan', route: '/forum/nonlicetWord',
            },
            // {
            //     name: '用户举报', icon: 'user-o', route: '/ugc/banner',
            // },
        ]
    }, */
    /* {
        name: '课程共创', icon: 'book', requirePermission: { hasPermission: ['UGC:*'] }, children: [
            {
                name: '活动管理', icon: 'bullhorn', route: '/ugc/activity'
                // requirePermission: { hasPermission: ['SETTINGS:SETTINGS_activity:*']}
            },
            {
                name: '样课与教程', icon: 'picture-o', route: '/ugc/example-course',
                // requirePermission: { hasPermission: ['UGC:UGC:*'] }
            },
            {
                name: '横幅管理', icon: 'picture-o', route: '/ugc/banner',
                // requirePermission: { hasPermission: ['UGC:UGC:*'] }
            },
            {
                name: '栏目公告', icon: 'bullhorn', route: '/ugc/notice-box',
                // requirePermission: { hasPermission: ['UGC:UGC:*'] }
            },
        ]
    } */
];
