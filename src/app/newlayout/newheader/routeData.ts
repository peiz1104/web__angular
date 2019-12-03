export const MAIN_MENU = [
    {
        name: '计划管理', id: 1, icon: 'icon-jihuaguanli', requirePermission: { hasPermission: ['PLANNING:*'] }, children: [
            // tslint:disable-next-line:max-line-length
            { name: '年度计划', id: 11, parentId: 1, icon: 'icon-ninadujihua', route: '/planning/annualplan/list', requirePermission: { hasPermission: ['PLANNING:ANNUAL_PLAN:*', 'PLANNING:ANNUAL_SUB_PLAN:*'] } },
            { name: '研修院计划', id: 12, parentId: 1, icon: 'icon-yanxiuyuanjihua', route: '/planning/trainingschoolplan/list', requirePermission: { hasPermission: ['PLANNING:TRAINING_SCHOOL_PLAN:*'] } },
            {
                // tslint:disable-next-line:max-line-length
                name: '基础配置', id: 13, parentId: 1, icon: 'icon-jichupeizhi', requirePermission: { hasPermission: ['PLANNING:TRAINING_SCHOOL:*', 'PLANNING:DESIGNATED_PLAN:*', 'PLANNING:SUB_GROUP:*', 'PLANNING:SETTING:ATTRIBUTE'] }, children: [
                    // tslint:disable-next-line:max-line-length
                    { name: '研修院管理', id: 131, parentId: 13, icon: 'icon-yanxiuyuanguanli', route: '/planning/trainingschool/list', requirePermission: { hasPermission: ['PLANNING:TRAINING_SCHOOL:*'] } },
                    { name: '指定计划名录', id: 132, parentId: 13, icon: 'icon-zhidingjihuaminglu', route: '/planning/designatedplan/list', requirePermission: { hasPermission: ['PLANNING:DESIGNATED_PLAN:*'] } },
                    // tslint:disable-next-line:max-line-length
                    { name: '机构分组', id: 133, parentId: 13, icon: 'icon-jigoufenzu', route: '/planning/organize', requirePermission: { hasPermission: ['PLANNING:SUB_GROUP:*'] } },
                    /*{ name: '人员分类', icon: 'th-list', route: '/planning/personnelclassification', requirePermission: { hasPermission: ['PLANNING:SETTING:ATTRIBUTE'] } },*/
                    /*tslint:disable-next-line:max-line-length*/
                    /*{ name: '培训分类', icon: 'th-list', route: '/planning/trainingclassification', requirePermission: { hasPermission: ['PLANNING:SETTING:ATTRIBUTE'] } },*/
                    { name: '培训级别', id: 134, parentId: 13, icon: 'icon-peixunjibie', route: '/planning/traininglevel', requirePermission: { hasPermission: ['PLANNING:SETTING:ATTRIBUTE'] } },
                    // tslint:disable-next-line:max-line-length
                    { name: '研修院交通费', id: 135, parentId: 13, icon: 'icon-chalvfeiyongbaoxiao', route: '/planning/traffic', requirePermission: { hasPermission: ['PLANNING:TRANSPORTATION_FEE:*'] } },
                ]
            }
        ]
    },
    {
        name: '培训管理', id: 2, icon: 'icon-peixunguanli', requirePermission: { hasPermission: ['TRAINING:*'] }, children: [
            { name: '计划实施', id: 21, parentId: 2, icon: 'icon-jihuashishi', route: '/training/planing' },
            {
                name: '班级管理', id: 22, parentId: 2, icon: 'icon-banjiguanli', route: '/training/class',
                requirePermission: { hasPermission: ['TRAINING:TRAINING_CLASS:*'] }
            },
            {
                name: '红班管理', id: 23, parentId: 2, icon: 'icon-chakanmingxi', route: '/training/redclassmanage',
                requirePermission: { hasPermission: ['TRAINING:TRAINING_CLASS:*'] }
            },
            // tslint:disable-next-line:max-line-length
            { name: '拟晋升名单', id: 24, parentId: 2, requirePermission: { hasPermission: ['TRAINING:PROMOTIONUSER:*'] }, icon: 'icon-nijinsheng-mingdan', route: '/training/promotion/proposedpromotion' },
            // tslint:disable-next-line:max-line-length
            { name: '已晋升名单', id: 25, parentId: 2, requirePermission: { hasPermission: ['TRAINING:PROMOTIONUSER:*'] }, icon: 'icon-yijinsheng-mingdan', route: '/training/promotion/haspromotion' }

            // { name: '实施情况分析', icon: 'icon-jihua', route: '' },
        ]
    },
    {
        name: '课程学习', id: 3, icon: 'icon-kechengxuex', requirePermission: { hasPermission: ['LEARNING:*'] }, children: [
            // {name: '课件管理', icon: 'file-zip-o', route: ''},
            {
                name: '课程体系', id: 31, parentId: 3, icon: 'icon-kechengtixi', route: '/learning/course/list',
                requirePermission: { hasPermission: ['LEARNING:COURSE:*'] }
            },
            {
                name: '课程培训', id: 32, parentId: 3, icon: 'icon-kechengpeixun', route: '/learning/classroom/list',
                requirePermission: { hasPermission: ['LEARNING:CLASSROOM:*'] }
            },
            {
                name: '好课管理', id: 33, parentId: 3, icon: 'icon-haokeguanli', route: '/learning/classroom/recommend',
                requirePermission: { hasPermission: ['LEARNING:CLASSROOM:*'] }
            }
            // {name: '学习路线', icon: 'connectdevelop', route: '/learning/path/list'},
        ]
    },
    {
        name: '研发管理', id: 4, icon: 'icon-yanfaguanli', requirePermission: { hasPermission: ['DEVELOPMENT:*'] }, children: [
            // tslint:disable-next-line:max-line-length
            { name: '可执行计划', id: 41, parentId: 4, icon: 'icon-kezhixingjihua', requirePermission: { hasPermission: ['DEVELOPMENT:EXECUTABLE_PLAN:*'] }, route: '/development/implementation/list', },
            { name: '研发项目', id: 42, parentId: 4, icon: 'icon-yanfaxiangmu', requirePermission: { hasPermission: ['DEVELOPMENT:GREEN_DREAMP_ROJECT:*'] }, route: '/development/research/list', },
        ]
    },
    {
        name: '需求调查', id: 5, icon: 'icon-tiaochaguanli', requirePermission: { hasPermission: ['SURVEY:*'] }, children: [
            // { name: '调查模板', icon: 'calendar', route: '/survey/paper/tpl' },
            { name: '调查问卷', id: 51, parentId: 5, icon: 'icon-tiaochawenjuan', route: '/survey/paper' },
            { name: '调查管理', id: 52, parentId: 5, icon: 'icon-tiaochaguanli', route: '/survey/surveyPaper' }
        ]
    },
    {
        name: '评估管理', id: 6, icon: 'icon-pingguguanli', requirePermission: { hasPermission: ['ASSESS:*'] }, children: [
            { name: '评估问卷', id: 61, parentId: 6, icon: 'icon-pingguwenjuan', route: '/assess/paper' },
            { name: '评估管理', id: 62, parentId: 6, icon: 'icon-pingguguanli', route: '/assess/assesses' },
        ]
    },
    {
        name: '组织考试', id: 7, icon: 'icon-zuzhikaoshi', requirePermission: { hasPermission: ['EXAM:*'] }, children: [
            {
                name: '基础配置', id: 71, parentId: 7, icon: 'icon-jichupeizhi', route: '/exam/basic-setting',
                requirePermission: { hasPermission: ['EXAM:SETTING:*'] }
            },
            {
                name: '试题管理', id: 72, parentId: 7, icon: 'icon-shitiguanli', route: '/exam/test-question/list',
                requirePermission: { hasPermission: ['EXAM:QUESTION:*'] }
            },
            {
                name: '试卷管理', id: 73, parentId: 7, icon: 'icon-shijuanguanli', route: '/exam/exam-paper',
                requirePermission: { hasPermission: ['EXAM:PAPER:*'] }
            },
            {
                name: '考试管理', id: 74, parentId: 7, icon: 'icon-kaoshiguanli', route: '/exam/examination',
                requirePermission: { hasPermission: ['EXAM:EXAMINATION:*'] }
            },
        ]
    },
    {
        name: '讲师库', id: 8, icon: 'icon-jiangshiguanli', requirePermission: { hasPermission: ['RESOURCE:*'] }, children: [
            { name: '任职资格管理', id: 81, parentId: 8, icon: 'icon-renzhizigeguanli', route: '/library/teacher/qualification' },
            { name: '聘任公文管理', id: 84, parentId: 8, icon: 'icon-pinrengongwenguanli', route: '/library/teacher/employment/documents' },
            // tslint:disable-next-line:max-line-length
            { name: '讲师管理', id: 82, parentId: 8, icon: 'icon-jiangshiguanli', route: '/library/teacher/main', requirePermission: { hasPermission: ['RESOURCE:TEACHER:*'] } },
            { name: '讲师授权管理', id: 83, parentId: 8, icon: 'icon-jiangshishoukeguanli', route: '/library/teacher/grant', requirePermission: { hasPermission: ['RESOURCE:TEACHER:*'] } },
        ]
    },
    {
        name: '资源管理', id: 9, icon: 'icon-ziyuanguanli', requirePermission: { hasPermission: ['RESOURCE:*'] }, children: [
            // { name: '讲师库', icon: 'icon-jiaolian1', route: '/library/teacher' },
            { name: '文档库', id: 91, parentId: 9, icon: 'icon-wendangku', route: '/library/document/list' },
            // { name: '教材库', icon: 'icon-ziyuanxuqiu', route: '' },
            { name: '证书库', id: 92, parentId: 9, icon: 'icon-zhengshuku', route: '/library/certificate' },
            // tslint:disable-next-line:max-line-length
            { name: '培训基地', id: 93, parentId: 9, icon: 'icon-peixunjidi', route: '/library/trainBase', requirePermission: { hasPermission: ['RESOURCE:TRAINBASE:*'] } },
            { name: '图片管理', id: 94, parentId: 9, icon: 'icon-tupianguanli', route: '/library/image' },
            { name: '案例管理', id: 95, parentId: 9, icon: 'icon-anliguanli', route: '/library/case' },
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
        name: '学时管理', id: 910, icon: 'icon-xueshiguanl', requirePermission: { hasPermission: ['PERIOD:*'] }, children: [
            {
                // tslint:disable-next-line:max-line-length
                name: '年度学时开关', id: 9101, parentId: 910, icon: 'icon-nianduxueshikaiguan', requirePermission: { hasPermission: ['PERIOD:SWITCH:*'] },
                route: '/classhour/hourswitch'
            },
            {
                // tslint:disable-next-line:max-line-length
                name: '年度学时任务', id: 9102, parentId: 910, icon: 'icon-nianduxueshirenwu', requirePermission: { hasPermission: ['PERIOD:TASK:*'] },
                route: '/classhour/hourtask'
            },
            {
                // tslint:disable-next-line:max-line-length
                name: '员工年度学时查看', id: 9103, parentId: 910, icon: 'icon-yuangongnianduxueshichakan', requirePermission: { hasPermission: ['PERIOD:HISTORY:*'] },
                route: '/classhour/hourannual'
            },
            {
                name: '学时审核', id: 9104, parentId: 910, icon: 'icon-xueshishenhe', requirePermission: { hasPermission: ['PERIOD:AUDIT:*'] },
                route: '/classhour/houraduitmanage/hourauditlist'
            },
            {
                // tslint:disable-next-line:max-line-length
                name: '学时申报管理', id: 9105, parentId: 910, icon: 'icon-xueshishenbaoguanli', requirePermission: { hasPermission: ['PERIOD:DECLARE_OTHER:*'] },
                route: '/classhour/houraduitmanage/hourdeclarationlist'
            },
            {
                name: '配置管理', id: 9106, parentId: 910, icon: 'icon-peizhiguanli', requirePermission: {
                    hasPermission: ['PERIOD:TRAINING_TYPE:*',
                        'PERIOD:TRAINING_THEME:*', 'PERIOD:TRAINING_WEY:*', 'PERIOD:TRAINING_SOURCE:*']
                },
                children: [
                    {
                        // tslint:disable-next-line:max-line-length
                        name: '培训类型管理', id: 91061, parentId: 9106, icon: 'icon-peixunleixingguanli', requirePermission: { hasPermission: ['PERIOD:TRAINING_TYPE:*'] },
                        route: '/classhour/hourconfiguration/traintypename'
                    },
                    {
                        // tslint:disable-next-line:max-line-length
                        name: '培训主题管理', id: 91062, parentId: 9106, icon: 'icon-peixunzhutiguanli', requirePermission: { hasPermission: ['PERIOD:TRAINING_THEME:*'] },
                        route: '/classhour/hourconfiguration/traintitem'
                    },
                    {
                        // tslint:disable-next-line:max-line-length
                        name: '培训方式和渠道管理', parentId: 9106, id: 91063, icon: 'icon-peixunfangshi-qudaoguanli', requirePermission: { hasPermission: ['PERIOD:TRAINING_WEY:*'] },
                        route: '/classhour/hourconfiguration/trainchannel'
                    },
                    {
                        // tslint:disable-next-line:max-line-length
                        name: '培训来源管理', id: 91064, parentId: 9106, icon: 'icon-peixunlaiyuanguanli', requirePermission: { hasPermission: ['PERIOD:TRAINING_SOURCE:*'] },
                        route: '/classhour/hourconfiguration/trainsource'
                    }
                ]
            },
        ]
    },
    {
        name: '组织管理', id: 911, icon: 'icon-zuzhiguanli', requirePermission: { hasPermission: ['SYSTEM:*'] }, children: [
            {
                name: '用户管理', id: 9111, parentId: 911, icon: 'icon-yonghuguanli', route: '/system/user/list',
                requirePermission: { hasPermission: ['SYSTEM:USER:*'] },
            },
            {
                name: '部门管理', id: 9112, parentId: 911, icon: 'icon-bumenguanli', route: '/system/userGroup',
                requirePermission: { hasPermission: ['SYSTEM:USER_GROUP:*'] },
            },
            {
                name: '用户组管理', id: 9113, parentId: 911, icon: 'icon-yonghuzuguanli', route: '/system/logicGroup',
                requirePermission: false,
            },
            {
                name: '角色管理', id: 9114, parentId: 911, icon: 'icon-jiaoseguanli', route: '/system/role',
                requirePermission: { hasPermission: ['SYSTEM:ROLE:*'] }
            },
            {
                name: '授权管理', id: 9115, parentId: 911, icon: 'icon-shouquanguanli', route: '/system/permission',

                requirePermission: { hasPermission: ['SYSTEM:PERMISSION:*'] }
            },
        ]
    },
    {

        name: '门户管理', id: 912, icon: 'icon-menhuguanli', requirePermission: { hasPermission: ['PORTAL:*'] }, children: [
            {
                name: '图片推荐', id: 9121, parentId: 912, icon: 'icon-tupianguanli', route: '/portal/banner',
                requirePermission: { hasPermission: ['PORTAL:BANNER:*'] }
            },
            {
                name: '站点公告', id: 9123, parentId: 912, icon: 'icon-zhandiangonggao', route: '/system/notice-box',
                requirePermission: { hasPermission: ['PORTAL:SITE_NOTICE:*'] }
            },
            {
                name: '新闻资讯', id: 9124, parentId: 912, icon: 'icon-news', route: '/portal/news',
                requirePermission: { hasPermission: ['PORTAL:NEWS:*'] }
            },
            { name: '页眉页脚', id: 9125, parentId: 912, icon: 'icon-yemeiyejiao', route: '/portal/footer' },
            { name: '首页配置', id: 9126, parentId: 912, icon: 'icon-shouyepeizhi', route: '/homeconfig/template' },

            // { name: '快速链接', icon: 'link', route: '/portal/link'},
        ]
    }, {
        name: '积分管理', id: 913, icon: 'icon-jifenguanli', requirePermission: { hasPermission: ['POINT:*'] }, children: [
            {
                name: '积分规则', id: 9131, parentId: 913, icon: 'icon-jifenguize', route: '/points/rule',

            },
            {
                name: '积分信息', id: 9132, parentId: 913, icon: 'icon-jifenxinxi', route: '/points/detaillist',

            },
            {
                name: '积分商城', id: 9133, parentId: 913, icon: 'icon-jifenshangcheng', route: '/points/mall',

            },
            { name: '导入积分', id: 9134, parentId: 913, icon: 'icon-daoru1', route: '/portal/footer' },
            // { name: '快速链接', icon: 'link', route: '/portal/link'},
        ]
    },
    {
        name: '站点配置', id: 914, icon: 'icon-zhandianpeizhi', requirePermission: { hasPermission: ['SETTINGS:*'] }, children: [
            {
                name: '站点信息', id: 9141, parentId: 914, icon: 'icon-zhandianxinxi', route: '/system/site/info',
                requirePermission: { hasPermission: ['SETTINGS:SITE:*'] }
            },
            {
                name: '站点消息', id: 9142, parentId: 914, icon: 'icon-73', route: '/system/site/message',
            },
            { name: '策略配置', id: 9143, parentId: 914, icon: 'icon-celvepeizhi', route: '/system/strategy' },
            //{ name: '内容服务器', icon: 'icon-neirongfuwuqi', route: '/system/server' },
            { name: '系统分类', id: 9144, parentId: 914, icon: 'icon-xitongfenlei', route: '/system/category' },
            { name: '编码配置', id: 9145, parentId: 914, icon: 'icon-yemeiyejiao', route: '/system/code' },
            //{ name: '安装和配置', icon: 'icon-anzhuang-peizhi', route: '/system/setting' },
            { name: '证书分类', id: 9146, parentId: 914, icon: 'icon-zhengshufenlei', route: '/system/cert-type' },
            // { name: '主题配置', icon: '', route: '' },
            // { name: '编码配置', icon: '', route: '' },
            /*{
                name: '自定义属性', icon: 'icon-zidingyishuxing', route: '/system/setting/attribute',
                requirePermission: { hasPermission: ['SETTINGS:CUSTOM_ATTRIBUTE:*'] }
            },*/
        ]
    }
];
