/*
 * @Author: mozhengqian
 * @Date: 2017-11-12 16:35:30
 * @Last Modified by: kxx
 * @Last Modified time: 2018-03-13 10:20:25
 */

/**
 * 试题分类API
 */
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { HttpAdaptor } from 'app/core/http/http-adaptor';
import { Pagination, HttpUtils } from 'app/core/';
import { FormDataUtil } from 'app/core/utils/form-data-util';
@Injectable()
export class BasicSettingService {
    constructor(private http: HttpAdaptor) { }
    getQuestionKonwledgeData(param?: object): Observable<any> {// 试题列表
        let formData = FormDataUtil.searchParamFilter(param);

        return this.http.get('/api/exam/questionKonwledge/list', { params: formData })
            .catch(HttpUtils.handleError);
    }
    // 获取试题分类树父级数据、试题分类树子级数据
    classTrueParentlist(param?: object): Observable<any> {
        let formData = FormDataUtil.searchParamFilter(param);
        return this.http.get('/api/exam/questionKonwledge/classTrueParent', { params: formData });
    }
    classTrueChildlist(param?: object): Observable<any> {
        let formData = FormDataUtil.searchParamFilter(param);
        return this.http.get('/api/exam/questionKonwledge/classTrueChild', { params: formData });
    }
    changeQuestionKonwledge(param?: any, isEdit?: boolean): Observable<any> {// 添加/修改试题分类
        if (isEdit) {
            // tslint:disable-next-line:max-line-length
            return this.http.post(`/api/exam/questionKonwledge/update?knowledgeId=${param.knowledgeId}&qkName=${param.qkName}&qkDesc=${param.qkDesc}`, param).catch(HttpUtils.handleError);
        }
        return this.http.put('/api/exam/questionKonwledge/add', param).catch(HttpUtils.handleError);
    }
    delete(id: number | number[]): Observable<void> {// 添加/修改试题分类
        if (id instanceof Number) {
            id = [].push(id);
        }
        return this.http.delete('/api/exam/questionKonwledge/delete', { params: { knowledgeId: id } })
            .catch(HttpUtils.handleError);
    }

    // 获取试题类型列表
    getQuestionTypeList(params?: any) {
        return this.http.get(`/api/exam/questionType/list`, { params: params })
            .catch(HttpUtils.handleError);
    }
    // 试题类型下拉列表
    getTypeSelectOption(params?: any) {
        return this.http.get(`/api/exam/questionType/query`, { params: params })
            .catch(HttpUtils.handleError);
    }
    // 新增 编辑试题类型
    changeQuestionType(param?: any): Observable<any> {// 添加/修改试题类型
        if (param.isEdit) {
            // tslint:disable-next-line:max-line-length
            return this.http.post(`/api/exam/questionType/update?id=${param.id}&typeName=${param.typeName}&typeDesc=${param.typeDesc}&isStart=${param.isStart}`, param).catch(HttpUtils.handleError);
        }
        return this.http.post('/api/exam/questionType/add', param).catch(HttpUtils.handleError);
    }
    // 获取单条编辑数据
    getOneQuestionTpye(params?: any) {
        return this.http.get(`/api/exam/questionType/getOne`, { params: params })
            .catch(HttpUtils.handleError);
    }

    // 获取试题难度列表
    getQADifficultyList(params?: any) {
        return this.http.get(`/api/exam/difficulty/list`, { params: params })
            .catch(HttpUtils.handleError);
    }
    // 新增 编辑试题难度
    changeQADifficulty(param?: any): Observable<any> {// 添加/修改试题类型
        if (param.isEdit) {
            // tslint:disable-next-line:max-line-length
            return this.http.post(`/api/exam/difficulty/update?id=${param.id}&diffName=${param.diffName}&diffDesc=${param.diffDesc}&isStart=${param.isStart}`, param).catch(HttpUtils.handleError);
        }
        return this.http.post('/api/exam/difficulty/add', param).catch(HttpUtils.handleError);
    }
    // 判断类型名称是否已存在
    isExsitTypeName(params?: any) {
        return this.http.get(`/api/exam/questionType/typeName`, { params: params })
            .catch(HttpUtils.handleError);
    }
    // 判断类型编码是否已存在
    isExsitTypeCode(params?: any) {
        return this.http.get(`/api/exam/questionType/typeCode`, { params: params })
            .catch(HttpUtils.handleError);
    }
    // 获取单条试题难度
    getOneQADifficulty(params?: any) {
        return this.http.get(`/api/exam/difficulty/getOne`, { params: params })
            .catch(HttpUtils.handleError);
    }
    // 列表更改发布状态
    updateDifficultyStart(params?: any) {
        return this.http.post(`/api/exam/difficulty/isStart?id=${params.id}&isStart=${params.isStart}`, params)
            .catch(HttpUtils.handleError);
    }
    // 删除单条试题难度
    deleteDifficulty(params?: any) {
        return this.http.delete(`/api/exam/difficulty/delete?id=${params.id}`, params)
            .catch(HttpUtils.handleError);
    }
    // 判断难度名称是否已存在
    isExsitDiffName(params?: any) {
        return this.http.get(`/api/exam/difficulty/diffName`, { params: params })
            .catch(HttpUtils.handleError);
    }
    // 查询考场信息列表
    getInationRoomList(params): Observable<any> {
        return this.http.get(`/api/exam/inationRoom/list`, { params: params })
    }
    // 获取字典信息
    getDictionaries(params): Observable<any> {
        return this.http.get(`/api/exam/manager/getDictionaries`, { params: params })
    }
    // 新增场地信息
    addInationRoom(params): Observable<any> {
        return this.http.post(`/api/exam/inationRoom/add`, params)
    }
    // 验证场地名称是否重复
    checkRoomName(params): Observable<any> {
        return this.http.get(`/api/exam/inationRoom/roomName`, { params: params })
    }
    // 查询单行数据
    getRoomDetail(params): Observable<any> {
        return this.http.get(`/api/exam/inationRoom/getOne`, { params: params })
    }
    // 修改考场信息
    updateRoom(params): Observable<any> {
        return this.http.post(`/api/exam/inationRoom/update`, params)
    }
    // 删除场地信息
    deleteInationRoom(params): Observable<any> {
        return this.http.delete(`/api/exam/inationRoom/delete`, { params: params })
    }
    // 更改发布状态
    isStatus(params): Observable<any> {
        return this.http.post(`/api/exam/inationRoom/isStatus`, null, { params: params })
    }
}
