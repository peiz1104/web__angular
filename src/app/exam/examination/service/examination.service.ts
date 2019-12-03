/*
 * @Author: majunfeng
 * @Date: 2017-11-02 18:25:21
 * @Last Modified by: kxx
 * @Last Modified time: 2018-03-13 16:47:55
 */
import { Injectable } from "@angular/core";
import { Http, Response } from "@angular/http";
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";
import { HttpAdaptor } from "../../../core/http/http-adaptor";
import { Pagination, HttpUtils } from "app/core/";
import { BaseService } from "../../../core/service/base.service";
import { FormDataUtil } from "../../../core/utils/form-data-util";

@Injectable()
export class ExaminationService extends BaseService<any> {
    constructor(protected httpAdaptor: HttpAdaptor, public http: Http) {
        super(httpAdaptor.http, httpAdaptor, "/api/exam/manager");
    }

    // 获取关联考试列表
    getExaminationList(parim?: any): Observable<Pagination<any>> {
        let params = FormDataUtil.searchParamFilter(parim);
        return this.httpAdaptor.get("/api/exam/manager/examList", {
            params: { ...params }
        });
    }
    // 获取考试列表
    getExamList(parim?: any): Observable<Pagination<any>> {
        let params = FormDataUtil.searchParamFilter(parim);
        return this.httpAdaptor.get("/api/exam/manager/list", {
            params: { ...params }
        });
    }
    // 获取考试的详细信息
    getExamDetail(examId: string): Observable<any> {
        return this.httpAdaptor.post(`/api/exam/manager/${examId}`, null, {});
    }

    // 发布，取消发布考试 ids 数组，isPutout 布尔
    isPublishExam(ids?: any[], putOut?: boolean): Observable<any> {
        return this.httpAdaptor.post("/api/exam/manager/publish", null, {
            params: { ids: ids, isPutout: putOut }
        });
    }

    // 添加，创建考试
    createNewExam(exam: object): Observable<any> {
        let formData: FormData = FormDataUtil.covert(exam);
        return this.httpAdaptor.post("/api/exam/manager/save", formData);
    }

    // 更新，修改考试信息
    updateExam(examid, parim: object): Observable<any> {
        let parims: object = {
            ...parim,
            examId: examid
        };
        let formData: FormData = FormDataUtil.covert(parims);
        return this.httpAdaptor.post("/api/exam/manager/update", formData);
    }

    // 删除考试
    deleteExam(ids?: any[]) {
        return this.httpAdaptor.delete("/api/exam/manager/delete", {
            params: { ids: ids }
        });
    }

    // 复制考试
    copyExam(examId: any): Observable<any> {
        return this.httpAdaptor.post(`/api/exam/manager/copy/${examId}`, null, {});
    }

    // 迁移考试 ids 考试id数组 siteid 组织id
    moveExams(ids: any, siteId): Observable<any> {
        return this.httpAdaptor.post("/api/exam/manager/move", null, {
            params: { ids: ids, siteId: siteId }
        });
    }

    // 获取监考人，复评人列表
    getStaffList(parim?: object): Observable<any> {
        return this.httpAdaptor.get('/api/exam/staff/getStaffList', { params: parim });
    }
    // 提交，更新 监考人，复评人，阅卷人，仲裁人 信息
    setInvigilatorCode(params?: object): Observable<any> {
        // let formData: FormData = FormDataUtil.covert(params);
        return this.httpAdaptor.post('/api/exam/staff/add', null, { params: params });
    }
    // 删除阅卷、仲裁、复评
    deleteMark(params?: object) {
        return this.httpAdaptor.delete('/api/exam/staff/deleteMark', { params: params });
    }
    // 获取主观题列表
    getSubjectiveQuestion(parim?: object) {
        return this.httpAdaptor.get('/api/exam/staff/getSubjectiveQuestion', { params: parim })
    }
    // 切换阅卷方式
    setReadType(parim: object) {
        return this.httpAdaptor.post('/api/exam/staff/setReadType', null, { params: parim })
    }
    //  考试注册、参考人员列表
    getExaminerList(parim?: object): Observable<any> {
        return this.httpAdaptor.get('/api/exam/reg/list', { params: parim })
    }
    // 设置基准分
    setScore(parim?: object) {
        return this.httpAdaptor.post('/api/exam/staff/setScore', null, { params: parim })
    }
    // 获取待复制主观题列表
    getCopyList(parim?: object): Observable<any> {
        return this.httpAdaptor.get('/api/exam/staff/getMarkQuestionList', { params: parim })
    }
    // 复制题目
    copySubject(parim?: object): Observable<any> {
        return this.httpAdaptor.post('/api/exam/staff/copy', null, { params: parim })
    }
    // 成绩管理列表
    getUserScoreList(parim?: object): Observable<any> {
        let params = FormDataUtil.searchParamFilter(parim);
        return this.httpAdaptor.get('/api/exam/manager/userScoreList', { params: params })
    }
    // 导出成绩
    exportScore(parim?: object): Observable<any> {
        return this.httpAdaptor.get('/api/exam/manager/exportScore', { params: parim })
    }
    // 新增活动信息
    saveOffering(parim: object): Observable<any> {
        let formData: FormData = FormDataUtil.covert(parim);
        return this.httpAdaptor.post('/api/exam/offering/save', formData)
    }
    // 修改考试活动
    updateOffering(id: Number, parim: object): Observable<any> {
        parim = {
            ...parim,
            id: id
        }
        let formData: FormData = FormDataUtil.covert(parim);
        return this.httpAdaptor.post('/api/exam/offering/update', formData)
    }
    // 获取考试活动信息
    getOffering(offeringId): Observable<any> {
        return this.httpAdaptor.get(`/api/exam/offering/${offeringId}`, null)
    }
    // 清除阅卷复评设置
    clearnMark(params): Observable<any> {
        return this.httpAdaptor.post(`/api/exam/staff/clearnMark`, null, { params: params })
    }
    // 试卷-获取试卷总分
    getScore(params): Observable<any> {
        return this.httpAdaptor.get(`/api/exam/paper/get_paper_score`, { params: params })
    }
    // 档案轨迹列表查询
    getTrackList(params): Observable<any> {
        return this.httpAdaptor.get(`/api/exam/manager/trackList`, { params: params })
    }
    // 考试参考人员列表
    getJoinUser(params): Observable<any> {
        return this.httpAdaptor.get(`/api/exam/offering/list_join_user`, { params: params })
    }
    // 是否有人参加考试
    isUserJoin(params): Observable<any> {
        return this.httpAdaptor.get(`/api/exam/manager/joinExamCount`, { params: params })
    }
    // 获取考场安排列表
    getExamRoomList(parim?: object): Observable<any> {
        return this.httpAdaptor.get('/api/exam/room/list', { params: parim });
    }
    // 添加考场安排人员
    addExamRoom(params): Observable<any> {
        return this.httpAdaptor.post(`/api/exam/room/add`, params)
    }
    // 删除考场安排人员
    deleteExamRoom(params?: object) {
        return this.httpAdaptor.delete('/api/exam/room/delete', { params: params });
    }
    // 设置审核范围
    setExamRoomAudit(parim?: object): Observable<any> {
        return this.httpAdaptor.get('/api/exam/room/audit', { params: parim });
    }
    // 清除审核范围
    clearExamRoomAudit(parim?: object): Observable<any> {
        return this.httpAdaptor.get('/api/exam/room/eliminateAudit', { params: parim });
    }
    // 获取审批人列表
    getApproverList(parim?: object): Observable<any> {
        return this.httpAdaptor.get('/api/exam/approver/list', { params: parim });
    }
    // 添加审批人
    addApprover(params): Observable<any> {
        return this.httpAdaptor.post(`/api/exam/approver/add`, params)
    }
    // 删除审批人
    deleteApprover(params?: object) {
        return this.httpAdaptor.delete('/api/exam/approver/delete', { params: params });
    }
    // 指定审批人审核范围
    setApproverAudit(parim?: object): Observable<any> {
        return this.httpAdaptor.get('/api/exam/approver/audit', { params: parim });
    }
    // 清除审核范围
    clearApproverAudit(parim?: object): Observable<any> {
        return this.httpAdaptor.get('/api/exam/approver/eliminateAudit', { params: parim });
    }
    // 修改审批人
    updateApprover(params): Observable<any> {
        return this.httpAdaptor.post(`/api/exam/approver/update`, params)
    }
    // 设置阅卷复评时间
    setMarkTime(params): Observable<any> {
        return this.httpAdaptor.post(`/api/exam/staff/setMarkTime`, null, { params: params })
    }
    // 产品版阅卷借口
    // 查询阅卷设置信息
    getSettingInfo(params): Observable<any> {
        return this.httpAdaptor.get('/api/exam/mark/setting/info', { params: params });
    }
    // 添加阅卷组
    addGroup(params): Observable<any> {
        return this.httpAdaptor.post('/api/exam/mark/setting/addGroup', params);
    }
    // 获取阅卷组列表
    getGroupList(params): Observable<any> {
        return this.httpAdaptor.get('/api/exam/mark/setting/groupList', { params: params });
    }
    // 删除阅卷组
    deleteGroup(params): Observable<any> {
        return this.httpAdaptor.get('/api/exam/mark/setting/removeGroup', { params: params });
    }
    changeMarkingModel(params): Observable<any> {
        return this.httpAdaptor.post('/api/exam/mark/setting/toggle', params);
    }
    // 获取新阅卷题目列表
    getSubjective(params): Observable<any> {
        return this.httpAdaptor.get('/api/exam/mark/setting/getSubjectiveQuestion', { params: params });
    }
    // 通过题目获取阅卷组列表
    getGroupListBuQue(params): Observable<any> {
        return this.httpAdaptor.get('/api/exam/mark/setting/groupListByQue', { params: params })
    }
    // 获取参考人数
    getExamUserCount(params): Observable<any> {
        return this.httpAdaptor.get('/api/exam/mark/setting/examUserCount', { params: params })
    }
    // 改版添加阅卷人
    addMarker(params): Observable<any> {
        return this.httpAdaptor.post(`/api/exam/read/paper/add`, null, { params: params })
    }
    // 获取阅卷组信息
    getMarkGroupInfo(params): Observable<any> {
        return this.httpAdaptor.get(`/api/exam/mark/setting/markGroupInfo`, { params: params })
    }
    // 单人修改阅卷人
    updatePerson(params): Observable<any> {
        return this.httpAdaptor.post(` /api/exam/read/paper/updatePerson`, null, { params: params })
    }
    // 设置阅卷组与阅卷题目关系信息
    addMarkGroupQuestion(params): Observable<any> {
        return this.httpAdaptor.post(`/api/exam/mark/setting/addMarkGroupQuestion`, null, { params: params })
    }
    // 获取阅卷组里阅卷老师列表
    getGroupUserList(params): Observable<any> {
        return this.httpAdaptor.get(`/api/exam/mark/setting/groupUserList`, { params: params })
    }
    // 查询待复制题目列表
    getMarkQuestion(params): Observable<any> {
        return this.httpAdaptor.get(`/api/exam/mark/setting/getMarkQuestion`, { params: params })
    }
    // 复制题目
    submitCopy(params): Observable<any> {
        return this.httpAdaptor.post(`/api/exam/mark/setting/copy`, null, { params: params })
    }
    // 编辑阅卷人组信息
    editMarkGroup(params): Observable<any> {
        return this.httpAdaptor.post(`/api/exam/mark/setting/modifyMarkGroup`, params)
    }
    // 获取阅卷组里阅卷老师列表
    getTeacherList(params): Observable<any> {
        return this.httpAdaptor.get(`/api/exam/mark/setting/groupUserList`, { params: params })
    }
    // 删除阅卷人
    deletePerson(params): Observable<any> {
        return this.httpAdaptor.delete(`/api/exam/read/paper/deletePerson`, { params: params })
    }
    // 获取客观题列表
    getImpersonalQuestion(params): Observable<any> {
        return this.httpAdaptor.get(`/api/exam/mark/setting/getImpersonalQuestion`, { params: params })
    }
    // 添加客观题
    addQuestion(body, params): Observable<any> {
        return this.httpAdaptor.post(`/api/exam/mark/setting/addImpersonalQuestion`, body, { params: params })
    }
    // 删除客观题
    removeQuestion(params): Observable<any> {
        return this.httpAdaptor.get('/api/exam/mark/setting/removeQuestion', { params: params })
    }
    // 修改阅卷策略
    toggleMarkScoreMode(params): Observable<any> {
        return this.httpAdaptor.post('/api/exam/mark/setting/toggleMarkScoreMode', null, { params: params })
    }
    // 发布阅卷信息
    publish(params): Observable<any> {
        return this.httpAdaptor.post('/api/exam/mark/setting/publish', null, { params: params })
    }
    // 获取可分配参考人数
    getAllotUserCount(params): Observable<any> {
        return this.httpAdaptor.get('/api/exam/mark/setting/getAllotUserCount', { params: params })
    }
    // 试卷修改后，删除所有与其有关的阅卷设置信息
    deletePJinfo(params): Observable<any> {
        return this.httpAdaptor.get('/api/exam/mark/setting/updateExam', { params: params })
    }
    // 区分是人寿还是产品阅卷
    check_pattern(): Observable<any> {
        return this.httpAdaptor.get('/api/learner/exam/invigilate/check_pattern', null)
        // 设置取消考试公钥
    }
    setJKcode(params): Observable<any> {
        return this.httpAdaptor.post(`/api/exam/staff/setInvigilatorCode`, null, { params: params })
    }
    // 获取下拉列表label字典
    getDictionaries(params): Observable<any> {
        return this.httpAdaptor.get(`/api/exam/manager/getDictionaries`, { params: params })
    }
    // 查看阅卷组列表-按题分配
    viewGroupListByQue(params): Observable<any> {
        return this.httpAdaptor.get(`/api/exam/mark/setting/viewGroupListByQue`, { params: params })
    }
    // 查询考场分配列表-分页
    getRoomList(params): Observable<any> {
        return this.httpAdaptor.get(`/api/learner/exam/room/distribution/roomList`, { params: params })
    }
    // 查询考场信息列表
    getInationRoomList(params): Observable<any> {
        return this.httpAdaptor.get(`/api/learner/exam/room/distribution/roomList`, { params: params })
    }
    // 新增考场分配
    saveDistribution(params): Observable<any> {
        return this.httpAdaptor.post(`/api/learner/exam/room/distribution/save`, params)
    }
    // 批量设置考场时间
    setDistributionTime(params): Observable<any> {
        return this.httpAdaptor.post(`/api/learner/exam/room/distribution/setTime`, null, { params: params })
    }
    // 删除考场分配
    removeDistribution(params): Observable<any> {
        return this.httpAdaptor.delete(`/api/learner/exam/room/distribution/remove`, { params: params })
    }
    // 查询监考老师列表-分页
    getExamStaffList(params): Observable<any> {
        return this.httpAdaptor.get(`/api/learner/exam/room/distribution/examStaffList`, { params: params })
    }
    // 修改考场分配
    modifyDistribution(params): Observable<any> {
        return this.httpAdaptor.post(`/api/learner/exam/room/distribution/modify`, params)
    }
}
