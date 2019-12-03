/*
 * @Author: mozhengqian
 * @Date: 2017-11-01 17:52:02
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2017-12-02 10:58:09
 */
/**
 * 试题管理的API
 */
import { Injectable } from "@angular/core";
import { Http, Response } from "@angular/http";
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";
import { HttpAdaptor } from "app/core/http/http-adaptor";
import { Pagination, HttpUtils } from "app/core/";
import { FormDataUtil } from "app/core/utils/form-data-util";
@Injectable()
export class TestQuestionService {
  // api/exam/question/list
  constructor(private http: HttpAdaptor) {}
  getTestListData(
    param?: any,
    page?: Pagination<any>
  ): Observable<Pagination<any>> {
    // 试题列表
    let params = {
      ...param,
      page: page ? page.number : 0,
      size: page ? page.size : 10
      // sort: page && page.sort ? page.sort : null
    };
    let formData = FormDataUtil.searchParamFilter(params);
    return this.http
      .get("/api/exam/question/list", { params: formData })
      .catch(HttpUtils.handleError);
  }
  getDifficulty() {
    // 试题难度
    return this.http
      .get("/api/exam/difficulty/queryAll", null)
      .catch(HttpUtils.handleError);
  }
  getQuestionType() {
    // 试题类型
    return this.http
      .get("/api/exam/questionType/queryAll")
      .catch(HttpUtils.handleError);
  }
  addQuestion(params?: any) {
    // 添加试题
    return this.http
      .put("/api/exam/question/add", params)
      .catch(HttpUtils.handleError);
  }
  getParentNodes(params?: any) {
    return this.http
      .get("/api/exam/questionKonwledge/classTrueParent", { params: params })
      .catch(HttpUtils.handleError);
  }
  getChildNodes(params) {
    return this.http
      .get("/api/exam/questionKonwledge/classTrueChild", { params: params })
      .catch(HttpUtils.handleError);
  }
  getQuestionInfo(id) {
    return this.http
      .get(`/api/exam/question/${id}`)
      .catch(HttpUtils.handleError);
  }
  getPaperQuestionInfo(id) {
    // 获取试卷里的试题信息
    return this.http
      .get(`/api/exam/paper/part/question/get`, { params: { queId: id } })
      .catch(HttpUtils.handleError);
  }
  getUploadProess(params) {
    // 获取导入试题进度
    return this.http
      .get(`/api/exam/question/session_load`, { params: params })
      .catch(HttpUtils.handleError);
  }
  questionDelete(params) {
    return this.http
      .delete(`/api/exam/question/delete`, { params: params })
      .catch(HttpUtils.handleError);
  }
  questionUpdate(params) {
    return this.http
      .put(`/api/exam/question/update`, params)
      .catch(HttpUtils.handleError);
  }
  questionPaperUpdate(params) {
    return this.http
      .post(`/api/exam/paper/part/question/update`, params)
      .catch(HttpUtils.handleError);
  }
  uploadTest(params) {
    // 导入试题
    return this.http
      .post(`/api/exam/question/import`, params)
      .catch(HttpUtils.handleError);
  }
  getSiteInfo() {
    return this.http.get("/api/loginfo").catch(HttpUtils.handleError);
  }
  getTestViewList(url, params, type?: any) {
    return this.http.get(url, { params: params }).catch(HttpUtils.handleError);
  }
  getHisList(param?: any, page?: Pagination<any>): Observable<Pagination<any>> {
    // 修改历史列表
    let params = {
      ...param,
      page: page ? page.number : 0,
      size: page ? page.size : 10
      // sort: page && page.sort ? page.sort : null
    };
    let formData = FormDataUtil.searchParamFilter(params);
    return this.http
      .get("/api/exam/question/backList", { params: formData })
      .catch(HttpUtils.handleError);
  }
  migration(params) {
    // 迁移试题
    return this.http
      .post(`/api/exam/question/move`, params)
      .catch(HttpUtils.handleError);
  }
  getExamList(
    param?: any,
    page?: Pagination<any>
  ): Observable<Pagination<any>> {
    // 获取考试列表
    let params = {
      ...param,
      page: page ? page.number : 0,
      size: page ? page.size : 10
    };
    let formData = FormDataUtil.searchParamFilter(params);
    return this.http
      .get(`/api/exam/manager/examList`, { params: formData })
      .catch(HttpUtils.handleError);
  }
  // 获取下拉列表label字典
  getDictionaries(params): Observable<any> {
    return this.http.get(`/api/exam/manager/getDictionaries`, {
      params: params
    });
  }
  synchroExam(ids?: any, queId?): Observable<any> {
    // 同步试题到考试
    return this.http
      .post("/api/exam/manager/synchroExam", null, {
        params: { examIds: ids, queId: queId }
      })
      .catch(HttpUtils.handleError);
  }
}
