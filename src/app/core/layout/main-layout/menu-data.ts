export const MAIN_MENU = [
    { name: '我的工作台', icon: 'dashboard', route: '/', requirePermission: false },
    { name: '需求管理', icon: 'file-text-o', route: '', requirePermission: { hasPermission: ['REQUIREMENT:*'] } },
    {
        name: '计划管理', icon: 'calendar-o', requirePermission: { hasPermission: ['PLANNING:*'] }, children: [
        ]
    },
    {
        name: '培训管理', icon: 'vcard-o', requirePermission: { hasPermission: ['TRAINING:*'] }, children: [
            // { name: '计划实施', icon: 'calendar', route: '' },
            {
                name: '班级管理', icon: 'bullhorn', route: '/training/class',
                requirePermission: { hasPermission: ['TRAINING:TRAINING_CLASS:*'] }
            },
            // { name: '实施情况分析', icon: 'area-chart', route: '' },
        ]
    },
    {
        name: '课程学习', icon: 'book', requirePermission: { hasPermission: ['LEARNING:*'] }, children: [
            // {name: '课件管理', icon: 'file-zip-o', route: ''},
            {
                name: '课程体系', icon: 'file-text-o', route: '/learning/course/list',
                requirePermission: { hasPermission: ['LEARNING:COURSE:*'] }
            },
            {
                name: '课程培训', icon: 'newspaper-o', route: '/learning/classroom/list',
                requirePermission: { hasPermission: ['LEARNING:CLASSROOM:*'] }
            },
            {
                name: '好课管理', icon: 'connectdevelop', route: '/learning/classroom/recommend',
                requirePermission: { hasPermission: ['LEARNING:CLASSROOM:*'] }
            }
            // {name: '学习路线', icon: 'connectdevelop', route: '/learning/path/list'},
        ]
    },
    {
        name: '调查评估', icon: 'fire', requirePermission: { hasPermission: ['SURVEY:*', 'ASSESS:*'] }, children: [
            {
                name: '调查模板', icon: 'calendar', route: '/survey/tpl',
                requirePermission: { hasPermission: ['SURVEY:SURVEY_PAPER:*'] }
            },
            // {
            //     name: '调查问卷', icon: 'calendar', route: '/survey/paper',
            //     requirePermission: { hasPermission: ['SURVEY:SURVEY_PAPER:*'] }
            // },
            {
                name: '调查管理', icon: 'calendar', route: '/survey/surveyPaper',
                requirePermission: { hasPermission: ['SURVEY:SURVEY_ACT:*'] }
            },
            // { name: '评估问卷', icon: 'calendar', route: '/assess/paper' },
            {
                name: '评估模板', icon: 'calendar', route: '/assess/assesses',
                requirePermission: { hasPermission: ['ASSESS:ASSESS_ACT:*'] }
            },
        ]
    },
    {
        name: '在线考试', icon: 'fire', requirePermission: { hasPermission: ['EXAM:*'] }, children: [
            {
                name: '考试管理', icon: 'calendar', route: '/exam/examination',
                requirePermission: { hasPermission: ['EXAM:EXAMINATION:*'] }
            },
            {
                name: '试卷管理', icon: 'calendar', route: '/exam/exam-paper',
                requirePermission: { hasPermission: ['EXAM:PAPER:*'] }
            },
            {
                name: '试题管理', icon: 'calendar', route: 'exam/test-question',
                requirePermission: { hasPermission: ['EXAM:QUESTION:*'] }
            },
            {
                name: '基础配置', icon: 'calendar', route: '/exam/basic-setting',
                requirePermission: { hasPermission: ['EXAM:SETTING:*'] }
            },
        ]
    },
    {
        name: '资源管理', icon: 'database', requirePermission: { hasPermission: ['RESOURCE:*'] }, children: [
            {
                name: '讲师库', icon: 'calendar', route: '/library/teacher',
                requirePermission: { hasPermission: ['RESOURCE:TEACHER_LIB:*'] }
            },
            {
                name: '文档库', icon: 'file', route: '/library/document/list',
                requirePermission: { hasPermission: ['RESOURCE:DOCUMENT_LIB:*'] }
            },
            // { name: '教材库', icon: 'calendar', route: '' },
            {
                name: '证书库', icon: 'calendar', route: '/library/certificate',
                requirePermission: { hasPermission: ['RESOURCE:CERT_LIB:*'] }
            },
            // { name: '培训基地', icon: 'calendar', route: '/library/trainBase' },
            // { name: '图片管理', icon: 'calendar', route: '/library/image' },
            {
                name: '案例管理', icon: 'calendar', route: '/library/case',
                requirePermission: { hasPermission: ['RESOURCE:CASE_LIB:*'] }
            },
        ]
    },
    {
        name: '组织管理', icon: 'cubes', requirePermission: { hasPermission: ['SYSTEM:*'] }, children: [
            {
                name: '用户管理', icon: 'user-o', route: '/system/user/list',
                requirePermission: { hasPermission: ['SYSTEM:USER:*'] },
            },
            {
                name: '部门管理', icon: 'sitemap', route: '/system/userGroup',
                requirePermission: { hasPermission: ['SYSTEM:USER_GROUP:*'] },
            },
            {
                name: '用户组管理', icon: 'group', route: '/system/logicGroup',
                requirePermission: false,
            },
            {
                name: '角色管理', icon: 'address-book-o', route: '/system/role',
                requirePermission: { hasPermission: ['SYSTEM:ROLE:*'] }
            },
            {
                name: '授权管理', icon: 'id-card-o', route: '/system/permission',
                requirePermission: { hasPermission: ['SYSTEM:PERMISSION:*'] }
            },
        ]
    },
    {
        name: '门户管理', icon: 'desktop', requirePermission: { hasPermission: ['PORTAL:*'] }, children: [
            // {
            //     name: '图片推荐', icon: 'picture-o', route: '/portal/banner',
            //     requirePermission: { hasPermission: ['PORTAL:BANNER:*'] }
            // },
            {
                name: '站点公告', icon: 'bullhorn', route: '/system/notice-box',
                requirePermission: { hasPermission: ['PORTAL:SITE_NOTICE:*'] }
            },
            {
                name: '新闻资讯', icon: 'newspaper-o', route: '/portal/news',
                requirePermission: { hasPermission: ['PORTAL:NEWS:*'] }
            },
            // { name: '页眉页脚', icon: 'newspaper-o', route: '/portal/footer' },
            // { name: '快速链接', icon: 'link', route: '/portal/link'},
            {
                name: '首页配置', icon: 'home', route: '/home/template',
                requirePermission: { hasPermission: ['PORTAL:HOME_TPL:*'] }
            },
        ]
    }, {
        name: '积分管理', icon: 'desktop', requirePermission: { hasPermission: ['POINT:*'] }, children: [
            {
                name: '积分规则', icon: 'picture-o', route: '/points/rule',
            },
            {
                name: '积分信息', icon: 'bullhorn', route: '/points/detaillist',
            },
            {
                name: '积分商城', icon: 'newspaper-o', route: '/points/mall',
            },
            { name: '导入积分', icon: 'newspaper-o', route: '/portal/footer' },
            // { name: '快速链接', icon: 'link', route: '/portal/link'},
        ]
    },
    {
        name: '站点配置', icon: 'cogs', requirePermission: { hasPermission: ['SETTINGS:*'] }, children: [
            {
                name: '站点信息', icon: 'home', route: '/system/site/info',
                requirePermission: { hasPermission: ['SETTINGS:SITE:*'] }
            },
            {
                name: '站点消息', icon: 'home', route: '/system/site/message',
            },
            { name: '策略配置', icon: 'cogs', route: '/system/strategy' },
            // { name: '内容服务器', icon: 'server', route: '/system/server' },
            { name: '系统分类', icon: 'envira', route: '/system/category' },
            { name: '编码配置', icon: 'envira', route: '/system/code' },
            // { name: '安装和配置', icon: 'toggle-on', route: '/system/setting' },
            { name: '证书分类', icon: 'connectdevelop', route: '/system/cert-type' },
            // { name: '主题配置', icon: '', route: '' },
            // { name: '编码配置', icon: '', route: '' },
            /* {
                name: '自定义属性', icon: 'file-text-o', route: '/system/attribute',
                requirePermission: { hasPermission: ['SETTINGS:CUSTOM_ATTRIBUTE:*'] }
            }, */
        ]
    },
    {
        name: '论坛管理', icon: 'cogs', requirePermission: { hasPermission: ['FORUM:*'] }, children: [
            {
                name: '基本设置', icon: 'cogs', route: '/forum/systemForum/base-setting',
            },
            {
                name: '站点论坛', icon: 'home', route: '/forum/systemForum/siteForum',
            },
            // {
            //     name: '分类管理', icon: 'envira', route: '/ugc/example-course',
            // },
            {
                name: '词语过滤', icon: 'envira', route: '/forum/systemForum/nonlicetWord',
            },
            {
                name: '举报管理', icon: 'envira', route: '/forum/systemForum/impeach',
            },
        ]
    },
    {
        name: '课程共创', icon: 'book', requirePermission: { hasPermission: ['UGC:*'] }, children: [
            {
                name: '活动管理', icon: 'bullhorn', route: '/ugc/activity',
                requirePermission: { hasPermission: ['UGC:ACTIVITY:*']}
            },
            {
                name: '样课与教程', icon: 'picture-o', route: '/ugc/example-course',
                requirePermission: { hasPermission: ['UGC:EXAMPLE_COURSE:*'] }
            },
            {
                name: '横幅管理', icon: 'picture-o', route: '/ugc/banner',
                requirePermission: { hasPermission: ['UGC:BANNER:*'] }
            },
            {
                name: '栏目公告', icon: 'bullhorn', route: '/ugc/notice-box',
                requirePermission: { hasPermission: ['UGC:NOTICE:*'] }
            },
        ]
    },
    {
        name: '专区管理', icon: 'desktop', requirePermission: { hasPermission: ['SUBJECT:*'] }, children: [
            {
                name: '专区管理', icon: 'bullhorn', route: '/subject/activity',
                requirePermission: { hasPermission: ['SUBJECT:ACTIVITY:*'] }
            },
            {
                name: '专区公告', icon: 'bullhorn', route: '/subject/notice-box',
                requirePermission: { hasPermission: ['SUBJECT:NOTICE:*'] }
            },
            {
                name: '专区Banner', icon: 'picture-o', route: '/subject/banner-box',
                requirePermission: { hasPermission: ['SUBJECT:BANNER:*'] }
            },
        ]
    }
];
