import { BaseService, HttpAdaptor } from 'app/core';
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { LayoutTemplate } from '../entity/layout-template';

@Injectable()
export class HomeTemplateApiService extends BaseService<LayoutTemplate> {
    configInfoAll: any = [];
    constructor(protected httpAdaptor: HttpAdaptor) {
        super(httpAdaptor.http, httpAdaptor, '/api/portal/template');
    }
    // 获取模块
    getModule(id: number) {
        return this.httpAdaptor.get(`${this.url}/module/${id}`, null);
    }
    setDefault(id: number) {
        return this.httpAdaptor.post(`${this.url}/default/${id}`, null);
    }

    addModule(id: number, param: any) {
        return this.httpAdaptor.put(`${this.url}/module/${id}`, param);
    }
    // 删除模块
    deleteModule(id: number) {
        return this.httpAdaptor.delete(`/api/portal/template/module/${id}`);
    }
    // 切换模块顺序
    sortModule(params) {
        return this.httpAdaptor.post(`/api/portal/template/module/order`, params);
    }
    getCourseTree(course): Observable<any> {
        return this.httpAdaptor.get(`/api/learner/category/tree`, { params: { 'identifier': course } });
    }

    /*********页眉模块**********/
    getLogoInfo(id: number) {
        return this.httpAdaptor.get(`/api/portal/module/${id}/logo`, null);
    }
    saveLogo(id: number, param, navigations) {
        return this.httpAdaptor.post(`/api/portal/module/${id}/logo`, navigations, { params: param });
    }

    /*********页脚模块**********/
    getFooterInfo(id: number) {
        return this.httpAdaptor.get(`/api/portal/footer/${id}`, null);
    }
    saveFooter(id: number, param) {
        return this.httpAdaptor.post(`/api/portal/footer/${param.id}`, null, { params: param });
    }

    /*********banner模块**********/
    getBannerInfo(id: number) {
        return this.httpAdaptor.get(`/api/portal/module/${id}/banner`, null);
    }
    getBannerList(id: number, arrId, param) {
        return this.httpAdaptor.post(`/api/portal/module/${id}/banner/cite`, arrId, { params: param });
    }
    saveBanner(id: number, param) {
        return this.httpAdaptor.post(`/api/portal/module/${id}/banner`, param);
    }

    /*********课程模块**********/
    getCourseInfo(id: number) {
        return this.httpAdaptor.get(`/api/portal/module/course/${id}`, null);
    }
    getCourseStyle() {
        return this.httpAdaptor.get(`/api/portal/template/style`);
    }
    getCourseList(param?: any) {
        return this.httpAdaptor.get(`/api/portal/module/course/recommend`, { params: param });
    }
    getStrategory(param?: any) {
        return this.httpAdaptor.get(`/api/portal/module/course/strategory`, { params: param });
    }
    saveCourse(param) {
        return this.httpAdaptor.post(`/api/portal/module/course/save`, param);
    }

    /*********文章模块**********/
    getArticleInfo(id: number) {
        return this.httpAdaptor.get(`/api/portal/module/article/${id}`, null);
    }
    getNewsGroup(id: number, param) {
        return this.httpAdaptor.get(`/api/portal/module/article/group`, null);
    }
    getNewsArticles(id: number) {
        return this.httpAdaptor.get(`/api/portal/module/article/${id}/list`, null);
    }
    saveNewsArticles(param) {
        return this.httpAdaptor.post(`/api/portal/module/article`, param);
    }

    /*********讲师模块*********/
    getModuleTeacher(id: number) {
        return this.httpAdaptor.get(`/api/portal/module/teacher/${id}`, null);
    }
    getTeacherLIst(id: number, arrId, param) {
        return this.httpAdaptor.post(`/api/portal/module/teacher/list`, arrId, {params: param });
    }
    saveLectuer(param) {
        return this.httpAdaptor.post(`/api/portal/module/teacher`, param);
    }

    getNotice(param): Observable<any> {
        return this.httpAdaptor.get('/api/portal/template/notice', { params: param });
    }

}
