/*
 * @Author: majunfeng
 * @Date: 2017-11-02 18:25:21
 * @Last Modified by: kxx
 * @Last Modified time: 2017-11-25 16:49:15
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

  // 获取考试列表
  getExaminationList(parim?: any): Observable<Pagination<any>> {
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
    return this.httpAdaptor.get("/api/exam/staff/getStaffList", {
      params: parim
    });
  }
  // 提交，更新 监考人，复评人，阅卷人，仲裁人 信息
  setInvigilatorCode(params?: object): Observable<any> {
    // let formData: FormData = FormDataUtil.covert(params);
    return this.httpAdaptor.post("/api/exam/staff/add", null, {
      params: params
    });
  }
  // 删除阅卷、仲裁、复评
  deleteMark(params?: object) {
    return this.httpAdaptor.delete("/api/exam/staff/deleteMark", {
      params: params
    });
  }
  // 获取主观题列表
  getSubjectiveQuestion(parim?: object) {
    return this.httpAdaptor.get("/api/exam/staff/getSubjectiveQuestion", {
      params: parim
    });
  }
  // 切换阅卷方式
  setReadType(parim: object) {
    return this.httpAdaptor.post("/api/exam/staff/setReadType", null, {
      params: parim
    });
  }
  //  考试注册、参考人员列表
  getExaminerList(parim?: object): Observable<any> {
    return this.httpAdaptor.get("/api/exam/reg/list", { params: parim });
  }
  // 设置基准分
  setScore(parim?: object) {
    return this.httpAdaptor.post("/api/exam/staff/setScore", null, {
      params: parim
    });
  }
  // 获取待复制主观题列表
  getCopyList(parim?: object): Observable<any> {
    return this.httpAdaptor.get("/api/exam/staff/getMarkQuestionList", {
      params: parim
    });
  }
  // 复制题目
  copySubject(parim?: object): Observable<any> {
    return this.httpAdaptor.post("/api/exam/staff/copy", null, {
      params: parim
    });
  }
  // 成绩管理列表
  getUserScoreList(parim?: object): Observable<any> {
    let params = FormDataUtil.searchParamFilter(parim);
    return this.httpAdaptor.get("/api/exam/manager/userScoreList", {
      params: params
    });
  }
  // 导出成绩
  exportScore(parim?: object): Observable<any> {
    return this.httpAdaptor.get("/api/exam/manager/exportScore", {
      params: parim
    });
  }
  // 新增活动信息
  saveOffering(parim: object): Observable<any> {
    let formData: FormData = FormDataUtil.covert(parim);
    return this.httpAdaptor.post("/api/exam/offering/save", formData);
  }
  // 修改考试活动
  updateOffering(id: Number, parim: object): Observable<any> {
    parim = {
      ...parim,
      id: id
    };
    let formData: FormData = FormDataUtil.covert(parim);
    return this.httpAdaptor.post("/api/exam/offering/update", formData);
  }
  // 获取考试活动信息
  getOffering(offeringId): Observable<any> {
    return this.httpAdaptor.get(`/api/exam/offering/${offeringId}`, null);
  }
  // 清除阅卷复评设置
  clearnMark(params): Observable<any> {
    return this.httpAdaptor.post(`/api/exam/staff/clearnMark`, null, {
      params: params
    });
  }
  // 试卷-获取试卷总分
  getScore(params): Observable<any> {
    return this.httpAdaptor.get(`/api/exam/paper/get_paper_score`, {
      params: params
    });
  }
  // 档案轨迹列表查询
  getTrackList(params): Observable<any> {
    return this.httpAdaptor.get(`/api/learner/exam/examFile/trackList`, {
      params: {
        page: 0,
        size: 100,
        ...params
      }
    });
  }
  // 考试参考人员列表
  getJoinUser(params): Observable<any> {
    return this.httpAdaptor.get(`/api/exam/offering/list_join_user`, {
      params: params
    });
  }
  // 是否有人参加考试
  isUserJoin(params): Observable<any> {
    return this.httpAdaptor.get(`/api/exam/manager/joinExamCount`, {
      params: params
    });
  }
  // 获取审批人列表
  getApproverList(parim?: object): Observable<any> {
    return this.httpAdaptor.get("/api/exam/approver/list", { params: parim });
  }
  // 添加审批人
  addApprover(params): Observable<any> {
    return this.httpAdaptor.post(`/api/exam/approver/add`, params);
  }
  // 删除审批人
  deleteApprover(params?: object) {
    return this.httpAdaptor.delete("/api/exam/approver/delete", {
      params: params
    });
  }
  // 指定审批人审核范围
  setApproverAudit(parim?: object): Observable<any> {
    return this.httpAdaptor.get("/api/exam/approver/audit", { params: parim });
  }
  // 修改审批人
  updateApprover(params): Observable<any> {
    return this.httpAdaptor.post(`/api/exam/approver/update`, params);
  }
}
