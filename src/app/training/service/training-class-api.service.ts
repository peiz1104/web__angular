import { Forum } from './../../forum/ordinary-forum/entity/forum';
import { HttpAdaptor } from 'app/core';
import { TrainingClass } from './../entity/training-class';
import { BaseService } from 'app/core';
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { FormDataUtil } from 'app/core/utils/form-data-util';
import { Pagination } from 'app/core/entity/pagination';
import { HttpUtils } from '../../core';
@Injectable()
export class TrainingClassApiService extends BaseService<TrainingClass> {
    constructor(protected httpAdaptor: HttpAdaptor) {
        super(httpAdaptor.http, httpAdaptor, '/api/training/classes', );
    }
    // 培训班编辑有基地后获取详情
    getOneNew(id: any) {
        return this.httpAdaptor.get(`/api/training/implement/${id}`);
    }
    saveNew(entity: any) {
        if (!entity) {
            return Observable.of(null);
        }

        if (entity['id']) {
            return this.updateNew(entity);
        }
    }
    updateNew(entity: any) {
        let formData: FormData = FormDataUtil.covert(entity);
        return this.httpAdaptor.post(`/api/training/implement/${entity['id']}`, formData);
    }
    // 导出
    totalNum(offeringId): Observable<any> {
        return this.httpAdaptor.get(`/api/export/${offeringId}/enrollments/enrolled/count`);
    }
    // 导出
    export(id): Observable<any> {
        return this.httpAdaptor.get(`/api/offering/${id}/enrollments/userExport?enrollType=&enrollResult=enrolled`);
    }
    downloadCourse(id) {
        window.location.href = `/api/offering/${id}/enrollments/userExport/download`
    }
    // 基础信息
    getInformation(id): Observable<any> {
        return this.httpAdaptor.get(`/api/training/classes/${id}`);
    }
    // 基础信息
    getCourseList(id, param): Observable<any> {
        return this.httpAdaptor.get(`/api/offering/${id}/courses`, { params: param });
    }
    // 设置状态
    setStatus(id: number, params): Observable<any> {
        let formData: FormData = FormDataUtil.covert(params);
        return this.httpAdaptor.post(`/api/training/implement/tbcstatus/${id}`, formData);
    }
    // more
    moreSetStatus(id, params) {
        let formData: FormData = FormDataUtil.covert(params);
        return this.httpAdaptor.post(`/api/training/implement/teacherreview/${id}`, formData);
    }
    // 获取状态
    getStatus(id): Observable<any> {
        return this.httpAdaptor.get(`/api/training/implement/tbcstatus/${id}`);
    }

    // 保存
    teacherSave(params): Observable<any> {
        return this.httpAdaptor.get(`/api/training/teachingrecords/save`, { params: params });
    }
    // 获取讲师对应内容
    getTeacherDetail(id, userId, detailId): Observable<any> {
        return this.httpAdaptor.get(`/api/training/teachingrecords/${id}/${userId}/${detailId}/getassess`);
    }
    // 选择讲师
    chooseTeacher(id, userId): Observable<any> {
        return this.httpAdaptor.get(`/api/training/teachingrecords/${id}/${userId}/getuser`);
    }
    // 选择课程
    chooseCourse(id): Observable<any> {
        return this.httpAdaptor.get(`/api/training/teachingrecords/${id}/getcourse`);
    }
    // 撤销复核
    RevokeReview(params): Observable<any> {
        return this.httpAdaptor.get(`/api/training/teachingrecords/update`, { params: params });
    }
    // 确认复核
    ConfirmationReview(params): Observable<any> {
        return this.httpAdaptor.get(`/api/training/teachingrecords/update`, { params: params });
    }
    // 生成授课记录
    GenerateLessonsUpdate(params): Observable<any> {
        return this.httpAdaptor.get(`/api/training/teachingrecords/update`, { params: params });
    }
    // 生成授课记录
    GenerateLessonsDelete(params): Observable<any> {
        return this.httpAdaptor.get(`/api/training/teachingrecords/delete`, { params: params });
    }
    // 生成授课记录
    GenerateLessons(id): Observable<any> {
        return this.httpAdaptor.get(`/api/training/teachingrecords/${id}/generate`);
    }

    // list
    GenerateLessonsList(id, params): Observable<any> {
        return this.httpAdaptor.get(`/api/training/teachingrecords/${id}/list`, { params: params });
    }
    // 生成评估结果
    GenerationEvaluation(params): Observable<any> {
        return this.httpAdaptor.get(`/api/offeringassess/generate`, { params: params });
    }
    // 课程评估
    curriculumEvaluation(params): Observable<any> {
        return this.httpAdaptor.get(`/api/offeringassess/course`, { params: params });
    }
    // 讲师评估
    teacherEvaluation(params): Observable<any> {
        return this.httpAdaptor.get(`/api/offeringassess/teacher`, { params: params });
    }
    // 培训班评估
    trainingClassEvaluation(params): Observable<any> {
        return this.httpAdaptor.get(`/api/offeringassess/trainingclass`, { params: params });
    }
    // 调换评估
    exchange(params): Observable<any> {
        return this.httpAdaptor.get(`/api/offeringassess/exchange`, { params: params });
    }
    publish(ids: number[]) {
        return this.batchOperateChinaLife('publish', ids);
    }

    disPublish(ids: number[]) {
        return this.batchOperateChinaLife('disPublish', ids);
    }

    archive(ids: number[]) {
        return this.batchOperateChinaLife('archive', ids);
    }

    disArchive(ids: number[]) {
        return this.batchOperateChinaLife('disArchive', ids);
    }

    // assess
    getAssessList(params?: any) {
        return this.httpAdaptor.get('/api/assess/papers', { params: params })
    }
    // assess
    getAssessCode(params?: any) {
        return this.httpAdaptor.get('/api/training/classes/trainClassCode', { params: params })
    }

    // survey
    getSurveyList(params?: any) {
        return this.httpAdaptor.get('/api/survey/surveys', { params: params })
    }
    // 培训级别培训班级管理列表api
    planTraininglevelList(params?: any) {
        let param = FormDataUtil.searchParamFilter(params);
        return this.httpAdaptor.get('/api/training/implement', { params: param })
    }
    getTrainClassCode(params?: any): Observable<any> {
        params = params || {};
        let param = FormDataUtil.searchParamFilter(params);
        return this.httpAdaptor.get(this.url + `/trainClassCode`, { params: param });
    }

    // 页面初始 成绩单
    getScoreList(tbcId, params?: any, page?: Pagination<any>): Observable<Pagination<any>> {
        params = params || {};

        params['size'] = page ? page.size : 10;
        params['page'] = page ? page.number : 0;

        params.content = null;
        let param = FormDataUtil.searchParamFilter(params);
        return this.httpAdaptor.get(`/api/trainScores/${tbcId}`, { params: param });
    }
    // 培训班管理授课教师列表获取
    gitTrainingTeacherList(params?: any): Observable<any> {
        let param = FormDataUtil.searchParamFilter(params);
        return this.httpAdaptor.get('/api/training/teachers', { params: param });
    }
    // 培训班管理授课教师人员删除
    deleteTrainingTeacher(params?: any): Observable<any> {
        return this.httpAdaptor.delete('/api/training/teachers/delete', { params: params });
    }

    // 导入培训班成绩接口(校验)
    trainScoresImportVerify(tbcId: number, fullPath: string): Observable<any> {
        return this.httpAdaptor.post(`/api/trainScores/excelImport/${tbcId}`, fullPath);
    }
    // 导入培训班成绩接口(保存)
    saveTrainScoresImport(tbcId: number, fullPath: string): Observable<any> {
        return this.httpAdaptor.post(`/api/trainScores/saveImport/${tbcId}`, fullPath);
    }
    //导入按钮判断
    getCountforImprotBut(tbcId: number): Observable<any> {
        return this.httpAdaptor.get(`/api/trainScores/get/count/for/but/${tbcId}`);
    }

    // 导入课程成绩接口(校验)
    courseTrainScoreImportVerify(tbcId: number, fullPath: string): Observable<any> {
        return this.httpAdaptor.post(`/api/courses/${tbcId}/coursePerformance/excelImport`, fullPath);
    }
    // 导入课程成绩接口(保存)
    savecourseTrainScoreImport(tbcId: number, fullPath: string): Observable<any> {
        return this.httpAdaptor.post(`/api/courses/${tbcId}/coursePerformance/saveImport`, fullPath);
    }

    // 课程成绩模板下载校验
    canGetExcelModel(tbcId: number): Observable<any> {
        return this.httpAdaptor.get(`/api/courses/${tbcId}/coursePerformance/can/excelModel`);
    }

    // 导出成绩接口
    // downloadInfo(tbcId: number, fullPath: string): Observable<any> {
    //     return this.httpAdaptor.post(`/api/trainScores/saveImport/${tbcId}`, fullPath);
    // }

    // 获取个人成绩详情的接口

    personaltranscript(offeringId, userId): Observable<any> {
        return this.httpAdaptor.get(`/api/offering/${offeringId}/user/${userId}/performaces`);
    }
    // 和人信息的读取
    Pinformation(trcid, shmid): Observable<any> {
        return this.httpAdaptor.get(`/api/trainScores/${trcid}/Transcripts/${shmid}`);
    }

    initMaterialGroup(id: number) {
        return this.httpAdaptor.post(`${this.url}/${id}/initMaterialGroup`, null);
    }

    getForum(id: any): Observable<Forum> {
        return this.httpAdaptor.get(`${this.url}/${id}/Forum`);
    }
    refresh(offeringId): Observable<any> {
        let param = { offeringId: offeringId };
        return this.httpAdaptor.post(`/api/trainScores/refresh`, null, { params: param });
    }


    getAnnualPlanId(params?: any) {
        return this.httpAdaptor.get('/api/planImplement/getAnnualPlanId', { params: params });
    }
    // 计划实施列表
    getplanlist(params?: any) {
        return this.httpAdaptor.get(`/api/planImplement/list`, { params: params })
    }
    // 研修计划实施列表
    getResearchplanlist(params?: any) {
        return this.httpAdaptor.get(`/api/planImplement/research/list`, { params: params })
    }
    // 生成培训班计划
    createtrainingplan(ids) {
        return this.httpAdaptor.post(`/api/planImplement/generate`, null, { params: { ids: ids } })
    }
    // 考勤管理课程列表
    attendancecourselist(params?: any) {
        // 考勤管理已经不再查询课程列表  如需查询 可调用 `/api/trainingclass/${offeringId}/courses/list`
        return this.httpAdaptor.get(`/api/training/implement/courseList`, { params: params })
    }
    // 考勤管理考勤列表信息
    attendancemessagelist(params?: any) {
        return this.httpAdaptor.get(`/api/training/implement/attendance/list`, { params: params })
    }
    // 个人考勤列表
    attendancepersonlist(params?: any) {
        return this.httpAdaptor.get(`/api/training/implement/attendance/one`, { params: params })
    }
    // 导出
    attendancemessagenewExport(params) {
        return this.httpAdaptor.get(`/api/training/implement/attendance/export?tbcId=${params.tbcId}&ids=${params.ids}`, params)
    }
    // 导出
    download(fullPath: string, fileName: string) {
        // tslint:disable-next-line:max-line-length
        window.location.href = `/api/training/implement` + '/download?fullPath=' + encodeURIComponent(fullPath) + '&fileName=' + encodeURIComponent(fileName);
    }

    // 考勤列表 new
    attendancemessagenewList(params?: any) {
        return this.httpAdaptor.get(`/api/training/implement/attendanceList`, { params: params })
    }
    // 个人考勤列表 new
    attendancepersonnewList(params?: any) {
        return this.httpAdaptor.get(`/api/training/implement/attendanceUserList`, { params: params })
    }

    // 培训级别api
    trainingapi() {
        return this.httpAdaptor.get(`/api/planning/personnelclassification/attributes`)
    }
    // 获取traiinLevel对应的是否可以进行最大缺勤次数最大应考勤次数
    getattendancemessage() {
        return this.httpAdaptor.get(`/api/training/implement/train-level`);
    }
    // 获取编辑培训班信息
    getedittrainmessage(id?: any) {
        return this.httpAdaptor.get(`/api/training/classes/${id}`)
    }
    // 编辑培训班
    editTrainingClass(id?: any, params?: any) {
        let formData: FormData = FormDataUtil.covert(params);
        console.log(formData, 9999)
        return this.httpAdaptor.post(`/api/training/classes/${id}`, formData)
    }
    // 获取代理注册人员列表
    getreglist(params?: any) {
        return this.httpAdaptor.get(`/api/training/implement/proxyRegister/authorUser`, { params: params })
    }
    // 添加授权注册人
    addregperson(params?: any) {
        return this.httpAdaptor.put(`/api/training/implement/proxyRegister`, params)
    }
    // 删除授权注册人员
    deletereguser(ids) {
        // console.log(ids, 3345)
        return this.httpAdaptor.delete(`/api/training/implement/proxyRegister`, { params: { ids: ids } })
    }
    // 授权注册添加用户组
    adduserGroup(groupIds) {
        let formData = new FormData();
        /* groupIds.map((item) => {
            formData.append('logicalIds', '' + item.id)
        }) */
        return this.httpAdaptor.put(`/api/training/implement/proxyRegister/logical`, groupIds);
    }
    // 获取人员api
    getusrelist(permission?: any, isRegion?: any) {
        return this.httpAdaptor.get(`/api/userGroups`, { params: { permission: permission, isRegion: isRegion } });
    }
    // 某个组织下查看人员列表userGroup.id:34783;username:131001;page:0;size:10;sort:
    orguserlist(params?: any) {
        return this.httpAdaptor.get(`/api/users`, { params: params })
    }
    // 创建培训班判断是否有年度计划
    judgeAnnualPlan() {
        return this.httpAdaptor.get(`/api/training/implement/isHaveAnnualPlan`)
    }
    // 生成年度计划api
    saveAnnualPlan(params) {
        return this.httpAdaptor.get(`/api/planImplement/saveAnnualPlan`, { params: params })
    }
    // 获取培训班年度计划ByYearAndOrg
    getAnnualPlan() {
        return this.httpAdaptor.get(`/api/training/implement/getAnnualPlan`)
    }
    // 获取组织的信息
    getCurrentUser() {
        return this.httpAdaptor.get('/api/account');
    }
    // 生成培训班
    createAnnualPlan(params?: any, annplanId?: any) {
        let formData: FormData = FormDataUtil.covert(params);
        return this.httpAdaptor.post(`/api/training/implement/add?annualPlanId=${annplanId}`, formData)
    }



    // 结班管理费用管理
    pullcostdatalist(params?: any) {
        return this.httpAdaptor.get(`/api/trainfee/base-fee-sap`, { params: params })
    }
    // 添加从sap拉取基础费用
    addpullcost(params) {
        return this.httpAdaptor.put(`/api/trainfee/base-fee-sap`, params)
    }
    // 结班管理基本费用列表
    endclassmanagebaselist(params) {
        return this.httpAdaptor.get(`/api/trainfee/base-fee-list`, { params: params })
    }
    // 判断基本费用是否审批通过
    judgeapproval(id) {
        return this.httpAdaptor.get(`/api/training/implement/tbcstatus/${id}`)
    }
    // 某个培训班下的进行费用审核
    costapproval(id, params) {
        let formData: FormData = FormDataUtil.covert(params);
        return this.httpAdaptor.post(`/api/training/implement/tbcstatus/${id}`, formData)
    }
    //撤销费用分摊
    revokeApportionFee(id) {
        return this.httpAdaptor.get(`/api/trainfee/revoke/apportion-fee/${id}`)
    }
    //撤销费用复核
    revokeBaseFee(id) {
        return this.httpAdaptor.get(`/api/trainfee/revoke/base-fee/${id}`)
    }

    // 手工添加基本费用
    handeladdbasecost(params) {
        // let formData: FormData = FormDataUtil.covert(params);
        return this.httpAdaptor.put(`/api/trainfee/base-fee`, params)
    }
    // 获取费用类型
    getcostType() {
        return this.httpAdaptor.get(`/api/trainfee/fee-type`)
    }
    // 查询单个费用
    getlooksinglecost(id) {
        return this.httpAdaptor.get(`/api/trainfee/base-fee/${id}`)
    }
    // 删除基本费用
    deletebasecost(ids?: any) {
        return this.httpAdaptor.delete(`/api/trainfee/base-fee`, { params: { ids: ids } })
    }
    // 导出费用
    exportfile(params) {
        return this.httpAdaptor.get(`/api/trainfee/export`, { params: params });
    }
    // 下载费用文件
    downloadcostfile(fullPath?: any, fullName?: any) {
        window.location.href = `/api/trainfee/download`;
        // return this.httpAdaptor.get(`/api/trainfee/download`)
    }
    // 分摊费用列表
    sharecostlist(params) {
        return this.httpAdaptor.get(`/api/trainfee/apportion-fee-list`, { params: params })
    }
    // 分摊费用的添加
    sharecostAdd(params) {
        let formData: FormData = FormDataUtil.covert(params);
        return this.httpAdaptor.put(`/api/trainfee/apportion-fee`, params)
    }
    // 分摊人员列表接口
    users(api?: string, params?: any): Observable<Pagination<any>> {
        let url = api || '/api/training/implement/enrolledUsers';

        return this.httpAdaptor.get(url, { params: params })
            .catch(HttpUtils.handleError);
    }
    // 本级交通费用
    localtraffic(api?: string, params?: any) {
        let url = api || '/api/training/implement/enrolledUsers';
        return this.httpAdaptor.get(url, { params: params })
            .catch(HttpUtils.handleError);
    }
    // 分摊费用的删除
    sharecostDelete(ids) {
        return this.httpAdaptor.delete(`/api/trainfee/apportion-fee`, { params: { ids: ids } })
    }
    // 获取单个分摊费用
    getsinglesharecost(id) {
        return this.httpAdaptor.get(`/api/trainfee/apportion-fee/${id}`)
    }
    // 获取分摊费用的人员
    getsharecostuser(id) {
        return this.httpAdaptor.get(`/api/trainfee/do-apportion-fee/${id}`)
    }
    // 分摊费用人员列表将获取的list对象返回去
    submitshareuserlist(id, params) {
        return this.httpAdaptor.post(`/api/trainfee/save-apportion-fees/${id}`, params)
    }
    // 分摊费用获取总的费用
    getsharetotalfee(id) {
        return this.httpAdaptor.get(`/api/trainfee/train-fee-total/${id}`)
    }
    // 获取费用一览表
    getfeeviewlist(offeringId) {
        return this.httpAdaptor.get(`/api/trainfee/apportion-group-fee-list/${offeringId}`)
    }
    // 获取分摊是否分摊完成或基本费用是否已经审批
    getbasesharestatus(id) {
        return this.httpAdaptor.get(`/api/training/implement/tbcstatus/${id}`);
    }
    // 获取交通费用列表
    gettrafficlist(params) {
        return this.httpAdaptor.get(`/api/trainfee/traffic-fee-list`, { params: params })
    }
    // 删除交通费用
    deletetraffic(ids) {
        return this.httpAdaptor.delete(`/api/trainfee/traffic-fee`, { params: { ids: ids } })
    }
    trafficFeeAudit(params) {
        let formData: FormDataUtil = FormDataUtil.covert(params);
        return this.httpAdaptor.post(`/api/trainfee/train-traffice-fee/update-status`, formData)
    }
    // 添加
    addtraffic(params) {
        let formData: FormData = FormDataUtil.covert(params);
        return this.httpAdaptor.put(`/api/trainfee/traffic-fee`, params)
    }
    // 获取交通类型
    gettrafficType() {
        return this.httpAdaptor.get(`/api/trainfee/traffic-manner`)
    }
    // 获取单个的交通费用
    getsingletraffic(id) {
        return this.httpAdaptor.get(`/api/trainfee/traffic-fee/${id}`)
    }
    // 编辑交通费用
    edittraffic(id, params) {
        let formData: FormData = FormDataUtil.covert(params);
        return this.httpAdaptor.post(`/api/trainfee/traffic-fee/${id}`, params)
    }
    // 文档信息
    getdocumentnformation(id, params) {
        return this.httpAdaptor.get(`/api/materialGroup/${id}/materials`, { params: params })
    }
    // 获取课程列表
    getcoursemessage(id, params) {
        return this.httpAdaptor.get(`/api/trainingclass/${id}/courses/list-material`, { params: params })
    }
    batchOperateChinaLife(action: string, ids: number[]) {
        return this.httpAdaptor.post(`/api/training/implement/${action}`, null, { params: { ids: ids } });
    }
    // 获取用户数据
    getLeadersuserList(params) {
        return this.httpAdaptor.get(`/api/user/expand/getUser`, { params: params })
    }
    pageList(params?: any) {
        return this.httpAdaptor.get('/api/training/base/listtrainbase', { params: params })
    }
    lookWifi(params?: any) {
        let param = FormDataUtil.searchParamFilter(params);
        return this.httpAdaptor.get('/api/training/base/wifilist', { params: param })
    }
    getTeacherList(params?: any) {
        return this.httpAdaptor.get(`/api/teacher/management/chooseTeacher`, { params: params })
    }
    // 查询培训班列表
    getAllTrainList(params) {
        return this.httpAdaptor.get(`/api/training/implement/all-list`, { params: params })
    }
    // 课程列报表
    getAllCourseList(id, params) {
        return this.httpAdaptor.get(`/api/trainingclass/${id}/courses/all-list`, { params: params })
    }


    toAmisTeacherRecord(id): Observable<any> {
        return this.httpAdaptor.get(`/api/training/implement/toAmisTeacherRecord/${id}`);
    }
    // 获取课程列表
    getTeacherRecord(id, params) {
        return this.httpAdaptor.get(`/api/training/implement/getTeacherRecord/${id}`, { params: params })
    }
    // 易学堂是否以已经推送培训班
    getAmisIsExists(id) {
        return this.httpAdaptor.get(`/api/training/base/getAmisIsExists/${id}`);
    }
    sendAmisIsExists(id) {
        return this.httpAdaptor.get(`/api/training/base/sendAmisIsExists/${id}`);
    }
    // 培训班考试进入
    goexame(id, trainlevelId) {
        return this.httpAdaptor.get(`/api/training/classes/${id}/init-exam/${trainlevelId}`);
    }
    // 培训基地修改
    trainBaseSave(offeringId, trainBasesId) {
        return this.httpAdaptor.put(`/api/training/base/${offeringId}/${trainBasesId}`, null)
    }
    deleteTrainBase(offeringId, ids) {
        return this.httpAdaptor.delete(`/api/training/base/${offeringId}`, { params: { ids: ids } })
    }
}
