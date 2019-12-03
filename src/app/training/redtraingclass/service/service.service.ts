import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { HttpAdaptor } from '../../../core/http/http-adaptor';
import { Pagination, HttpUtils } from '../../../core/';
import { FormDataUtil } from '../../../core/utils/form-data-util';
@Injectable()
export class ServiceService {

    constructor(
        private httpAdaptor: HttpAdaptor
    ) { }
    // 红班列表api
    getRedList(params) {
        return this.httpAdaptor.get(`/api/red-training-class`, { params: params })
    }
    // 获取红班人员列表
    getRedUserList(tbcId, params) {
        return this.httpAdaptor.get(`/api/red-training-class/user/${tbcId}`, { params: params })
    }
    // 红班培训费用列表
    getTrainFeeList(tbcId, params) {
        return this.httpAdaptor.get(`/api/red-training-class/train-apportion-fee/${tbcId}`, { params: params })
    }
    // 获取交通类型
    gettrafficType() {
        return this.httpAdaptor.get(`/api/trainfee/traffic-manner`)
    }
    // 人员成绩列表
    getUserScoreList(tbcId, params) {
        return this.httpAdaptor.get(`/api/red-training-class/score/${tbcId}`, { params: params })
    }
    // 人员考勤列表
    getUserAttendanceList(tbcId, params) {
        return this.httpAdaptor.get(`/api/red-training-class/attendance/${tbcId}`, { params: params })
    }
    // 个人考勤列表
    attendancepersonlist(params?: any) {
        return this.httpAdaptor.get(`/api/training/implement/attendance/one`, { params: params })
    }
    // 证书列表IAO
    getCertificateList(tbcId, params) {
        return this.httpAdaptor.get(`/api/red-training-class/cert/${tbcId}`, { params: params })
    }
    // 交通费用列表
    getTrafficList(tbcId, params) {
        return this.httpAdaptor.get(`/api/red-training-class/traffic-fee/${tbcId}`, { params: params })
    }
    // 交通费用的审核
    trafficFeeAudit(params) {
        let formData: FormDataUtil = FormDataUtil.covert(params);
        return this.httpAdaptor.post(`/api/trainfee/train-traffice-fee/update-status`, formData)
    }
    // 删除交通费用
    deletetraffic(ids) {
        return this.httpAdaptor.delete(`/api/trainfee/traffic-fee`, { params: { ids: ids } })
    }
    // 交通费添加
    addtraffic(params) {
        let formData: FormData = FormDataUtil.covert(params);
        return this.httpAdaptor.put(`/api/trainfee/traffic-fee`, params)
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
}
