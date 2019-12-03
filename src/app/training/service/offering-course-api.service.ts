import { HttpAdaptor } from 'app/core';
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { FormDataUtil } from 'app/core/utils/form-data-util';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Course } from '../../learning/course/entity/course';
import { Forum } from '../../forum/ordinary-forum/entity/forum';

@Injectable()
export class OfferingCourseApiService {
    constructor(protected httpAdaptor: HttpAdaptor) { }
    /* download(type: string) {
        window.location.href = this.url + '/download?type=' + type;
    } */
    importProgress(taskKey: string, radioValue: string): Observable<any> {
        if (radioValue == 'T') {
            return this.httpAdaptor.get(`/api/traingclass/courseteacher/importprogress`, { params: { taskKey: taskKey } });
        } else {
            return this.httpAdaptor.get(`/api/traingclass/courseuser/courseteacher/importprogress`, { params: { taskKey: taskKey } });
        }

    }
    exhibitionData(params): Observable<any> {
        return this.httpAdaptor.get(`/api/traingclass/courseuser/list`, { params: params });
    }
    import(taskKey: string, tbcId: number, radioValue: string) {
        if (radioValue == "T") {
            return this.httpAdaptor.put(`/api/traingclass/courseteacher/import`, null, { params: { taskKey: taskKey } });
        } else {
            return this.httpAdaptor.put(`/api/traingclass/courseuser/courseteacher/import`, null, { params: { taskKey: taskKey, tbcId: tbcId } });
        }
    }

    getCourses(offeringId: number, page?, params = {}): Observable<any> {

        // console.log("-----", page);
        if (page) {
            params['size'] = page.size;
            params['page'] = page.page;

            if (page.serchCourse == '') {
                params['serchCourse'] = "";
            } else {
                params['serchCourse'] = page.serchCourse;
            }
        }

        // console.log("-----", params);
        params = FormDataUtil.searchParamFilter(params)
        return this.httpAdaptor.get(`/api/trainingclass/${offeringId}/courses/list`, { params: params });
    }

    getGroupCourses(offeringId: number, page?, params = {}): Observable<any> {
        if (page) {
            params['size'] = page.size;
            params['page'] = page.number;
        }
        params = FormDataUtil.searchParamFilter(params)
        return this.httpAdaptor.get(`/api/offering/${offeringId}/courses/group`, { params: params });
    }

    addRefresh(offeringId: number, courseIds: number[]): Observable<void> {
        // tslint:disable-next-line:max-line-length
        return this.httpAdaptor.post(`/api/trainingclass/${offeringId}/courses/addRefresh`, null, { params: { courseIds: courseIds } });
    }
    // 课程体系添加课程
    addCourseSystem(offeringId: number, courseIds: number[], sourceType: any) {
        // tslint:disable-next-line:max-line-length
        return this.httpAdaptor.post(`/api/trainingclass/${offeringId}/courses/addRefresh`, null, { params: { courseIds: courseIds, sourceType: sourceType } });
    }
    addRefreshCourseTeacher(offeringId: number, courseIds: number[]) {
        // tslint:disable-next-line:max-line-length
        return this.httpAdaptor.post(`/api/trainingclass/${offeringId}/courses/add-course-teacher`, null, { params: { courseIds: courseIds } })
    }
    // 设置状态
    export(params, type): Observable<any> {
        let formData: FormData = FormDataUtil.covert(params);
        if (type == 'T') {
            return this.httpAdaptor.post(`/api/traingclass/courseteacher/export`, formData);
        } else {
            return this.httpAdaptor.post(`/api/traingclass/courseuser/courseuser/export`, formData);
        }

    }
    // 设置状态
    download(type) {
        if (type == 'T') {
            window.location.href = "/api/traingclass/courseteacher/download"
        } else {
            window.location.href = "/api/traingclass/courseuser/download"
        }

        // return this.httpAdaptor.get(`/api/traingclass/courseteacher/download`);
    }

    addFromCurriculum(offeringId: number, courseIds: number[], sourctType: 'REFRESHED' | 'COPIED' = 'COPIED'): Observable<void> {
        return this.httpAdaptor.post(`/api/offering/${offeringId}/courses/addFromCurriculum`, null,
            { params: { courseIds: courseIds, sourceType: sourctType } });
    }

    delete(offeringId: number, courseIds: number[]): Observable<void> {
        return this.httpAdaptor.delete(`/api/trainingclass/${offeringId}/courses/delete`, { params: { courseIds: courseIds } });
    }

    create(offeringId: number, course: Course): Observable<any> {
        return this.httpAdaptor.put(`/api/trainingclass/${offeringId}/courses/add`, course);
    }
    importProgressCourse(taskKey) {
        return this.httpAdaptor.get(`/api/traingclass/courseteacher/importprogress`, { params: { taskKey: taskKey } })
    }
    importCheckExcel(taskKey) {
        return this.httpAdaptor.get(`/api/traingclass/courseteacher/check`, { params: { taskKey: taskKey } })
    }
    importCourse(taskKey) {
        return this.httpAdaptor.put(`/api/traingclass/courseteacher/import`, null, { params: { taskKey: taskKey, } })
    }
    importProgressUser(taskKey) {
        return this.httpAdaptor.get(`/api/traingclass/courseuser/importprogress`, { params: { taskKey: taskKey } })
    }
    importCheckExcelUser(taskKey) {
        return this.httpAdaptor.get(`/api/traingclass/courseuser/check`, { params: { taskKey: taskKey } })
    }
    importUser(taskKey, tbcId) {
        return this.httpAdaptor.put(`/api/traingclass/courseuser/import`, null, { params: { taskKey: taskKey, tbcId: tbcId } })
    }
    getForum(offeringId: any, courseId: any): Observable<Forum> {
        return this.httpAdaptor.get(`/api/offering/${offeringId}/courses/forum`, { params: { offeringId: offeringId, courseId: courseId } });
    }

    iniForum(offeringId: number, courseId: number): Observable<Forum> {
        // tslint:disable-next-line:max-line-length
        return this.httpAdaptor.get(`/api/offering/${offeringId}/courses/initforum`, { params: { offeringId: offeringId, courseId: courseId } });
    }

    addCourseToGroup(offeringId: number, courseId: number, groupId: number): Observable<void> {
        return this.httpAdaptor.post(`/api/offering/${offeringId}/courses/addCourseToGroup`, null,
            { params: { courseId: courseId, groupId: groupId } });
    }

    getCourse(offeringId: number, courseId: number): Observable<any> {
        return this.httpAdaptor.get(`/api/offering/${offeringId}/courses/${courseId}`);
    }
}
