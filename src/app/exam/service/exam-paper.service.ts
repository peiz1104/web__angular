/**
 * 试卷管理的API
 */
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { HttpAdaptor } from '../../core/http/http-adaptor';
import { Pagination, HttpUtils } from 'app/core/';
import { FormDataUtil } from 'app/core/utils/form-data-util';

@Injectable()
export class ExamPaperService {
    public paperData: any;
    constructor(private httpAdaptor: HttpAdaptor) { }
    // 获取分区列表
    getPartitionData(examPaperId: any) {
        return this.httpAdaptor.post(`/api/exam/paper/partition/list`, { examPaperId: examPaperId })
            .catch(HttpUtils.handleError);
    }
    // 预览试卷接口
    getPreviewPaper(examPaperId: any) {
        return this.httpAdaptor.get(`/api/exam/paper/show?examPaperId=${examPaperId}`)
            .catch(HttpUtils.handleError);
    }
    // 创建试卷接口
    addPaper(params: any) {
        return this.httpAdaptor.post(`/api/exam/paper/add`, params)
            .catch(HttpUtils.handleError);
    }
    // 获取分区列表
    getPartitionList(examPaperId: any) {
        return this.httpAdaptor.get(`/api/exam/paper/partition_list?epId=${examPaperId}`)
            .catch(HttpUtils.handleError);
    }
    // 获取试卷列表
    getPaperList(params?: any) {
        params = FormDataUtil.searchParamFilter(params);
        return this.httpAdaptor.get(`/api/exam/paper/list`, { params: params })
            .catch(HttpUtils.handleError);
    }
    // 删除试卷
    deletePaper(examPaperId: any) {
        return this.httpAdaptor.delete(`/api/exam/paper/delete?examPaperId=${examPaperId}`);
    }
    // 复制试卷
    copyPaper(examPaperId: any) {
        return this.httpAdaptor.post(`/api/exam/paper/copy?examPaperId=${examPaperId}`, { examPaperId: examPaperId })
            .catch(HttpUtils.handleError);
    }
    // 发布与取消发布
    releaseOrNoPaper(params: any) {
        return this.httpAdaptor.post(`/api/exam/paper/release?examPaperId=${params.examPaperId}&type=${params.type}`, params)
            .catch(HttpUtils.handleError);
    }
    // 迁移试卷
    movePaper(params: any) {
        return this.httpAdaptor.post(`/api/exam/paper/move?epIds=${params.epIds}&userGroupId=${params.userGroupId}`, params)
            .catch(HttpUtils.handleError);
    }
    // 获取试卷信息
    getPaperMessage(examPaperId: any) {
        return this.httpAdaptor.get(`/api/exam/paper/get_paper?epId=${examPaperId}`)
            .catch(HttpUtils.handleError);
    }
    // 更新试卷
    updatePaper(params?: object): Observable<any> {
        let formData: FormData = FormDataUtil.covert(params);
        return this.httpAdaptor.post(`/api/exam/paper/update`, params)
            .catch(HttpUtils.handleError)
    }
    // 预览分区
    getPartitionPreviewData(examPaperId, partitionId): Observable<any> {
        return this.httpAdaptor.get(`/api/exam/paper/partition/show?paperId=${examPaperId}&partitionId=${partitionId}`)
            .catch(HttpUtils.handleError)

    }
    // 删除分区
    deletePartition(partitionId: any): Observable<any> {
        return this.httpAdaptor.delete(`/api/exam/paper/partition/delete?partitionId=${partitionId}`)
            .catch(HttpUtils.handleError)
    }
    // 新增添加分区
    addPartition(params?: object): Observable<any> {
        return this.httpAdaptor.post(`/api/exam/paper/partition/add`, params)
            .catch(HttpUtils.handleError)
    }
    // 修改分区
    updatePartition(params?: object): Observable<any> {
        return this.httpAdaptor.post(`/api/exam/paper/partition/update`, params)
            .catch(HttpUtils.handleError);
    }
    // 获取单个分区信息
    getPartitionMessage(partitionId: any): Observable<any> {
        return this.httpAdaptor.get(`/api/exam/paper/partition/get_partition?partitionId=${partitionId}`)
            .catch(HttpUtils.handleError);
    }
    // 分区上下移动
    movePartition(params: any): Observable<any> {
        return this.httpAdaptor.post(`/api/exam/paper/partition/upordown?partitionId=${params.partitionId}&type=${params.type}`, params)
            .catch(HttpUtils.handleError)
    }
    // 试卷导出Excel
    exportExcelPaper(examPaperId: any): Observable<any> {
        return this.httpAdaptor.get(`/api/exam/paper/exort_exam_excel?epid=${examPaperId}`)
            .catch(HttpUtils.handleError);
    }
    // 试卷导出word
    exportWorldPaper(examPaperId: any): Observable<any> {
        return this.httpAdaptor.get(`/api/exam/paper/exort_exam_word?epid=${examPaperId}`)
            .catch(HttpUtils.handleError);
    }
    // 手工抽题添加选中的题
    postSelectQuestion(ids: any): Observable<any> {
        return this.httpAdaptor.get(`/api/exam/question/getQuestionList?ids=${ids}`)
            .catch(HttpUtils.handleError);
    }
    // 新增试题
    addQuestion(params: any): Observable<any> {
        return this.httpAdaptor.post(`/api/exam/paper/part/question/add`, params)
            .catch(HttpUtils.handleError);
    }
    // 删除试题
    deleteQuestion(params: any): Observable<any> {
        return this.httpAdaptor.delete(`/api/exam/paper/part/question/delete?queId=${params.queId}&paperId=${params.paperId}`)
            .catch(HttpUtils.handleError);
    }
    // 试题排序
    questionSort(params: any): Observable<any> {
        return this.httpAdaptor.post(`/api/exam/paper/part/question/upordown?queId=${params.queId}&type=${params.type}`, params)
            .catch(HttpUtils.handleError);
    }
    // 随机抽题
    getRandomQuestion(params: any): Observable<any> {
        return this.httpAdaptor.post(`/api/exam/paper/part/libpary/add`, params)
            .catch(HttpUtils.handleError);
    }
    // 获取试题数量
    getQuestionNumber(params: any): Observable<any> {
        return this.httpAdaptor.get(`/api/exam/paper/part/libpary/get_que_num`, { params: { ...params } })
            .catch(HttpUtils.handleError);
    }

    // 删除策略
    deleteLibpary(params: any): Observable<any> {
        return this.httpAdaptor.delete(`/api/exam/paper/part/libpary/delete?plId=${params.plId}&paperId=${params.paperId}`)
            .catch(HttpUtils.handleError);
    }

    // 修改策略时获取策略信息
    updateLibpary(params: any): Observable<any> {
        return this.httpAdaptor.get(`/api/exam/paper/part/libpary/get`, { params: { ...params } })
            .catch(HttpUtils.handleError);
    }

    // 修改策略
    alertLibPary(params: any): Observable<any> {
        return this.httpAdaptor.post(`/api/exam/paper/part/libpary/update`, params)
            .catch(HttpUtils.handleError);
    }

    // 获取回顾阅卷
    getReviewPapers(param): Observable<any> {
        // tslint:disable-next-line:max-line-length
        return this.httpAdaptor.get(`/api/exam/manager/reviewMarking`, { params: param }).catch(HttpUtils.handleError)
    }

    // 下拉列表请求
    getDownDrag(param): Observable<any> {
        // tslint:disable-next-line:max-line-length
        return this.httpAdaptor.get(`/api/exam/manager/getDictionaries`, { params: param }).catch(HttpUtils.handleError)
    }

    // 获取导入试题进度
    getUploadProess(params) {
        return this.httpAdaptor.get(`/api/exam/paper/session_load`, { params: params }).catch(HttpUtils.handleError);
    }
}
