import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { HttpAdaptor } from '../../core/http/http-adaptor';
import { Pagination, HttpUtils } from '../../core/';
import { FormDataUtil } from '../../core/utils/form-data-util';
import { CategoryGroup } from './../entity/category-group';
import { BaseService } from './../../core/service/base.service';

@Injectable()

export class HourService {
    private categoryGroups: CategoryGroup[];

    constructor(private httpAdaptor: HttpAdaptor) {
    }

    // category分类树
    // groups(parentId?: number) {
    //     let url = '/api/period/traintype/list';

    //     return this.httpAdaptor.get(url, { params: { 'parentId': parentId } })
    //         .map(HttpUtils.extractData)
    //         .catch(HttpUtils.handleError);
    // }
    groups(parentId?: number, url?: any, permission?: string[] | string, isRegion: boolean = false) {
        let searchurl = url ? url : '/api/period/traintype/children';
        if (parentId) {
            return this.orgChildren(searchurl, parentId, permission, isRegion);
        } else {
            return this.orgRoots(searchurl, permission, isRegion);
        }
    }

    // 获取分类
    getAll(params?: any): Observable<CategoryGroup[]> {
        if (this.categoryGroups) {
            return Observable.of(this.categoryGroups);
        }
        return this.httpAdaptor.get(`/api/system/category-groups`, { params: params }).map(
            groups => {
                this.categoryGroups = groups;
                return groups;
            });
    }

    getByIdentifier(identifier: string) {
        if (this.categoryGroups) {
            return Observable.of(this.categoryGroups.find(it => it.identifier === identifier));
        }
        return this.httpAdaptor.get(`/api/system/category-groups/identifier/${identifier}`);
    }

    getSelectAll(params?: any) {
        return this.httpAdaptor.get(`/api/system/categories`, { params: params });
    }
    // getselectchoose
    getSelectChoose(url, params?: any) {
        return this.httpAdaptor.get(`${url}`, { params: params })
    }

    // 获取组织的信息
    getCurrentUser() {
        return this.httpAdaptor.get('/api/account');
    }

    // 获取单个学时详情
    getsignlehourdetail(id): Observable<any> {
        return this.httpAdaptor.get(`/api/period/taskrank/${id}`)
            .catch(HttpUtils.handleError);
    }

    // 获取分类的数据api
    orgTree(url, parentId?: number, permission?: string[] | string, isRegion: boolean = false) {
        if (parentId) {
            return this.orgChildren(url, parentId, permission, isRegion);
        } else {
            return this.orgRoots(url, permission, isRegion);
        }
    }

    orgRoots(url, permission?: string[] | string, isRegion: boolean = false) {
        return this.httpAdaptor.get(`${url}`, { params: { permission: permission, isRegion: isRegion } });
    }

    orgChildren(url, parentId: number, permission?: string[] | string, isRegion: boolean = false) {
        return this.httpAdaptor.get(`${url}`, { params: { parentId: parentId, permission: permission, isRegion: isRegion } });
    }

    search(searchText: string, page, size, permission?: string[] | string, isRegion: boolean = false) {
        let url = `/api/userGroups/search`;

        return this.httpAdaptor.get(url, {
            params: {
                searchText: searchText, page: page, size: size,
                permission: permission, isRegion: isRegion
            }
        });
    }

    // 登录的api
    getsiteId() {
        return this.httpAdaptor.get(`/api/loginfo`)
            .catch(HttpUtils.handleError);
    }

    // 学时任务开关列表
    hourswitch(params) {
        return this.httpAdaptor.get(`/api/period/yearstask/list`, { params: params })
            .catch(HttpUtils.handleError);
    }

    // 添加学时开关
    addpriodswitch(params?: any) {
        return this.httpAdaptor.put(`/api/period/yearstask`, params)
            .catch(HttpUtils.handleError);
    }

    // 结转修改
    isCarryover(year?: any, params?: any) {
        let formdata: FormData = FormDataUtil.covert(params);
        return this.httpAdaptor.post(`/api/period/yearstask/${year}`, formdata)
            .catch(HttpUtils.handleError);
    }

    findOnePeriodswitchByYear(year?: any) {
        return this.httpAdaptor.get(`/api/period/yearstask/${year}`)
    }

    // 查看单个的学时开关
    viewsinglepriodswitch(year?: any, params?: any) {
        return this.httpAdaptor.get(`/api/period/yearstask/${year}`, { params: params })
            .catch(HttpUtils.handleError);
    }

    // 年度学时任务列表
    gettasklist(params?: any) {
        return this.httpAdaptor.get(`/api/period/taskrank/list`, { params: params })
            .catch(HttpUtils.handleError);
    }

    // 查看单个的学时任务
    getsingletask(id) {
        return this.httpAdaptor.get(`/api/period/taskrank/${id}`)
            .catch(HttpUtils.handleError)
    }

    getingleTaskByYear(year) {
        return this.httpAdaptor.get(`/api/period/taskrank/getPeriodTaskRankByYear/${year}`)
            .catch(HttpUtils.handleError)
    }

    // 学时任务的修改编辑接口
    editpriodtask(id?: any, params?: any) {
        let formData: FormData = FormDataUtil.covert(params);
        return this.httpAdaptor.post(`/api/period/taskrank/${id}`, formData)
            .catch(HttpUtils.handleError);
    }

    // 学时任务的添加接口
    addpriodtask(params?: any) {
        return this.httpAdaptor.put(`/api/period/taskrank`, params)
            .catch(HttpUtils.handleError);
    }

    // 学时任务的删除
    deletepriodtask(ids) {
        return this.httpAdaptor.delete(`/api/period/taskrank`, { params: { ids: ids } })
            .catch(HttpUtils.handleError);
    }

    // 员工年度学时查看
    getstaffhourView(params?: any) {
        return this.httpAdaptor.get(`/api/period/usersummary`, { params: params })
            .catch(HttpUtils.handleError);
    }

    // 查看某个学员某年度的学时获得详情列表
    getstaffdetaillist(params?: any) {
        return this.httpAdaptor.get(`/api/period/user/list`, { params: params })
            .catch(HttpUtils.handleError);
    }

    // 批量导出学员学时（单个学员的导出）
    batchexportstaffhour(params) {
        return this.httpAdaptor.post(`/api/period/usersummary/export`, params)
            .catch(HttpUtils.handleError);
    }

    // 学时审核列表
    getauditinglist(params?: any) {
        return this.httpAdaptor.get(`/api/period/active/list`, { params: params })
            .catch(HttpUtils.handleError);
    }

    // 学时审核列表
    getauditdeclarelist(params?: any, id?: any) {
        let url;
        if (id) {
            url = `/api/period/active/period-list/${id}`
        } else {
            url = `/api/period/active/period-list`
        }
        return this.httpAdaptor.get(`${url}`, { params: params })
            .catch(HttpUtils.handleError);
    }

    // 查看单个学时审核信息
    getstaffaduitingmessage(id?: any) {
        return this.httpAdaptor.get(`/api/period/active/${id}/approve`)
            .catch(HttpUtils.handleError);
    }

    // 学时审核的通过和拒绝
    passrefusehour(activeId?: any, params?: any) {
        return this.httpAdaptor.put(`/api/period/active/${activeId}/approve`, params)
            .catch(HttpUtils.handleError);
    }

    // 查看学时申报列表
    getviewdeclarehourlist(params?: any) {
        return this.httpAdaptor.get(`/api/period/active/self-list`, { params: params })
            .catch(HttpUtils.handleError);
    }

    // 管理员申报学时手工添加
    adddeclarehour(params?: any) {
        let formData: FormData = FormDataUtil.covert(params);
        return this.httpAdaptor.put(`/api/period/active`, params)
            .catch(HttpUtils.handleError);
    }

    // 编辑学时
    editdeclarehour(params?: any) {
        let formData: FormData = FormDataUtil.covert(params);
        return this.httpAdaptor.post(`/api/period/active/${params.id}`, formData)
            .catch(HttpUtils.handleError);
    }

    // 获取单个的学员学时申报信息
    getperioddeclarmessage(id?: any) {
        return this.httpAdaptor.get(`/api/period/active/${id}`)
            .catch(HttpUtils.handleError);
    }

    // 获取单个申报学时下的所有人员
    getprioddeclaruserlist(params?: any) {
        return this.httpAdaptor.get(`/api/period/userinfo/list`, { params: params })
    }

    // 获取单个申报学时附件列表
    getprioddeclarfilelist(periodActiveInformation?: any) {
        return this.httpAdaptor.get(`/api/period/attach/list`, { params: periodActiveInformation })
            .catch(HttpUtils.handleError);
    }

    // 删除学时活动下人员
    deletedeclaruser(ids) {
        return this.httpAdaptor.delete(`/api/period/userinfo`, { params: { ids: ids } })
            .catch(HttpUtils.handleError);
    }

    // 删除学时活动下的附件
    deletedeclarfile(ids) {
        return this.httpAdaptor.delete(`/api/period/attach`, { params: { ids: ids } })
            .catch(HttpUtils.handleError);
    }

    // 删除添加的学时
    deletedeclarhour(ids) {
        return this.httpAdaptor.delete(`/api/period/active`, { params: { ids: ids } })
            .catch(HttpUtils.handleError);
    }

    // 批量导入学时申报
    batchimportdeclarhour(params) {
        return this.httpAdaptor.post(`/api/period/active/excelImport`, params)
            .catch(HttpUtils.handleError);
    }

    // 导入学时申报的进度，和导入学时
    importProgress(taskKey: string): Observable<any> {
        return this.httpAdaptor.get(`/api/period/active/importProgress`, { params: { taskKey: taskKey } });
    }

    import(taskKey: string) {
        // tslint:disable-next-line:max-line-length
        return this.httpAdaptor.put(`/api/period/active/import`, null, { params: { taskKey: taskKey } });
    }

    // 学时申报管理人员列表批量添加人员
    adduserlist(params) {
        return this.httpAdaptor.put(`/api/period/userinfo`, params)
    }

    // 培训方式
    gettrainweyall() {
        return this.httpAdaptor.get(`/api/period/trainwey/all`);
    }

    // peixun主题
    gettraintheme() {
        return this.httpAdaptor.get(`/api/period/traintheme/all`)
    }

    // 培训来源
    gettrainsource() {
        return this.httpAdaptor.get(`/api/period/trainsource/all`)
    }

    // 配置管理
    // 获取培训类型列表
    gettraintypelist(parent_id) {
        return this.httpAdaptor.get(`/api/period/traintype/list`, { params: parent_id })
            .catch(HttpUtils.handleError);
    }

    // 培训类型列表
    gettrainthemelist(params) {
        return this.httpAdaptor.get(`/api/period/traintheme/list`, { params: params })
            .catch(HttpUtils.handleError);
    }

    // 培训方式列表
    gettrainweylist(params) {
        return this.httpAdaptor.get(`/api/period/trainwey/list`, { params: params })
            .catch(HttpUtils.handleError);
    }

    // 培训来源列表
    gettrainsourcelist(params) {
        return this.httpAdaptor.get(`/api/period/trainsource/list`, { params: params })
            .catch(HttpUtils.handleError);
    }

    // 获取全部分类类型
    gettraintypeall() {
        return this.httpAdaptor.get(`/api/period/traintype/all`)
            .catch(HttpUtils.handleError);
    }

    // 查询某个子集的所有父级的培训类型
    getparentTraintype(id) {
        return this.httpAdaptor.get(`/api/period/traintype/parents`, { params: { id: id } })
    }

    // 添加培训类型
    addtraintype(params?: any) {
        let formData: FormData = FormDataUtil.covert(params);
        return this.httpAdaptor.put(`/api/period/traintype`, params)
            .catch(HttpUtils.handleError);
    }

    // 添加培训主题
    addtraintheme(params?: any) {
        return this.httpAdaptor.put(`/api/period/traintheme`, params)
            .catch(HttpUtils.handleError);
    }

    // 添加培训方式
    addtrainway(params?: any) {
        return this.httpAdaptor.put(`/api/period/trainwey`, params)
            .catch(HttpUtils.handleError);
    }

    // 添加培训来源
    addtrainsource(params?: any) {
        return this.httpAdaptor.put(`/api/period/trainsource`, params)
            .catch(HttpUtils.handleError);
    }

    // 删除培训类型
    deletetraintype(ids?: any) {
        return this.httpAdaptor.delete(`/api/period/traintype`, { params: { ids: ids } })
            .catch(HttpUtils.handleError);
    }

    // 删除培训主题
    deletetraintheme(ids?: any) {
        return this.httpAdaptor.delete(`/api/period/traintheme`, { params: { ids: ids } })
            .catch(HttpUtils.handleError);
    }

    // 删除培训方式
    deletetrainway(ids?: any) {
        return this.httpAdaptor.delete(`/api/period/trainwey`, { params: { ids: ids } })
            .catch(HttpUtils.handleError);
    }

    // 删除培训来源
    deletetrainsource(ids?: any) {
        return this.httpAdaptor.delete(`/api/period/trainsource`, { params: { ids: ids } })
            .catch(HttpUtils.handleError);
    }

    // 培训类型的编辑
    gettraintypeedit(id) {
        return this.httpAdaptor.get(`/api/period/traintype/${id}`)
            .catch(HttpUtils.handleError);
    }

    // 培训主题的编辑
    gettrainthemeedit(id) {
        return this.httpAdaptor.get(`/api/period/traintheme/${id}`)
            .catch(HttpUtils.handleError);
    }

    // 培训方式编辑
    gettrainwayedit(id) {
        return this.httpAdaptor.get(`/api/period/trainwey/${id}`)
            .catch(HttpUtils.handleError);
    }

    // 培训来源编辑
    gettrainsourceedit(id) {
        return this.httpAdaptor.get(`/api/period/trainsource/${id}`)
            .catch(HttpUtils.handleError);
    }

    // 培训类型修改保存
    edittarintype(id, params) {
        let formData: FormData = FormDataUtil.covert(params);
        return this.httpAdaptor.post(`/api/period/traintype/${id}`, formData)
            .catch(HttpUtils.handleError);
    }

    // edittraintheme培训主题编辑保存
    edittraintheme(id, params) {
        let formData: FormData = FormDataUtil.covert(params);
        return this.httpAdaptor.post(`/api/period/traintheme/${id}`, formData)
    }

    // 培训方式编辑保存
    edittrainway(id, params) {
        let formData: FormData = FormDataUtil.covert(params);
        return this.httpAdaptor.post(`/api/period/trainwey/${id}`, formData)
            .catch(HttpUtils.handleError);
    }

    // 培训来源编辑保存
    edittrainsource(id, params) {
        let formData: FormData = FormDataUtil.covert(params);
        return this.httpAdaptor.post(`/api/period/trainsource/${id}`, formData);
    }
    // 学时审核拒绝多人员
    userRefuseList(params) {
        return this.httpAdaptor.get(`/api/period/userinfo/list`, { params: params })
    }
    // 学时申报提交
    periodDeclaresubmit(params) {
        let formData: FormData = FormDataUtil.covert(params);
        return this.httpAdaptor.post(`/api/period/active/refer`, formData)
    }
    // 员工年度学时列表的导出
    exportHour(params: any) {
        return this.httpAdaptor.post(`/api/period/usersummary/export`, null, { params: params });
    }
    // 员工年度学时详情列表导出
    exportDetailHour(params: any) {
        return this.httpAdaptor.post(`/api/period/user/export`, null, { params: params })
    }
    // 员工学时申报导出
    exportDeclarationHour(params: any) {
        return this.httpAdaptor.post(`/api/period/active/exportPeriodActiveInformation`, null, { params: params })
    }

    // 学时的下载
    exportdownloadHour(res) {
        window.location.href = "/api/period/usersummary/exportdownload?sessionName=" + res.sessionName;
    }
    // 学时申报判断是否可以添加与批量导入
    judgeImportantAdd() {
        return this.httpAdaptor.get(`/api/period/active/isOpen`)
    }
    // 查看某一年度员工学时任务列表
    getYearHourList(params) {
        return this.httpAdaptor.get(`/api/period/usersummary/user-period-list`, { params: params })
    }
    updatePeriod(params) {
        let formData: FormData = FormDataUtil.covert(params);
        return this.httpAdaptor.post(`/api/period/usersummary/user-period-update`, formData)
    }
    // 学时任务批量导入
    importProgressHourTask(taskKey: string): Observable<any> {
        return this.httpAdaptor.get(`/api/period/usersummary/importProgress`, { params: { taskKey: taskKey } });
    }

    importHourTask(taskKey: string, year: any) {
        // tslint:disable-next-line:max-line-length
        return this.httpAdaptor.put(`/api/period/usersummary/import`, null, { params: { taskKey: taskKey, year: year } });
    }
    // 批量跟新学时
    mutipleUpdate(params) {
        let formData: FormData = FormDataUtil.covert(params);
        return this.httpAdaptor.post(`/api/period/active/update`, formData)
            .catch(HttpUtils.handleError);
    }
    // 批量审核
    mutipleRfuse(params) {
        let formData: FormData = FormDataUtil.covert(params);
        return this.httpAdaptor.post(`/api/period/active/approvenew`, formData)
    }
    importProgressPeriod(taskKey) {
        return this.httpAdaptor.get(`/api/period/active/importprogress`, { params: { taskKey: taskKey } })
    }
    importCheckExcelPeriod(taskKey) {
        return this.httpAdaptor.get(`/api/period/active/check`, { params: { taskKey: taskKey } })
    }
    importPeriod(taskKey) {
        return this.httpAdaptor.put(`/api/period/active/import`, null, { params: { taskKey: taskKey } })
    }
    // 获取学时规则查询年份
    getHourRuleListSearchYear() {
        return this.httpAdaptor.get(`/api/period/yearstask/year-list`)
    }
    // 学时规则列表
    gethourRuleList(params) {
        return this.httpAdaptor.get(`/api/period/strategy/strategy-list`, { params: params })
    }
    // 学时规则创建
    createHourRule(params) {
        return this.httpAdaptor.put(`/api/period/strategy`, params);
    }
    // 单个学时规则
    getsingleRule(id) {
        return this.httpAdaptor.get(`/api/period/strategy/${id}`)
    }
    // 编辑保存
    editSaveRule(id, params) {
        let param = FormDataUtil.covert(params);
        return this.httpAdaptor.post(`/api/period/strategy/${id}`, param)
    }
    deleteRule(ids) {
        return this.httpAdaptor.delete(`/api/period/strategy`, { params: { ids: ids } })
    }
    // 规则人员列表
    getruleUserList(id, params) {
        let param = FormDataUtil.searchParamFilter(params);
        return this.httpAdaptor.get(`/api/period/strategy/strategy-user-list/${id}`, { params: param })
    }
    // 删除规则学员
    deleruleUser(params) {
        let formData: FormData = FormDataUtil.covert(params);
        return this.httpAdaptor.post(`/api/period/strategy/delete-strategyuser`, formData)
    }
    importProgressPeriodRule(taskKey) {
        return this.httpAdaptor.get(`/api/period/strategy/importprogress`, { params: { taskKey: taskKey } })
    }
    importCheckExcelPeriodRule(taskKey) {
        return this.httpAdaptor.get(`/api/period/strategy/check`, { params: { taskKey: taskKey } })
    }
    importPeriodRule(taskKey, strategyId, year) {
        // tslint:disable-next-line:max-line-length
        return this.httpAdaptor.put(`/api/period/strategy/import`, null, { params: { taskKey: taskKey, strategyId: strategyId, year: year } })
    }
    // 学时添加人员组织树
    users(api?: string, params?: any): Observable<Pagination<any>> {
        let url = api || '/api/users/lookupList';

        return this.httpAdaptor.get(url, { params: params });
    }

    verifyUsernames(usernames: string[]): Observable<any[]> {
        let url = '/api/users/verifyUsernames';
        let formData = FormDataUtil.toArrayFileds('usernames', usernames);

        return this.httpAdaptor.post(url, formData);
    }
    // 添加学时规则人员
    addRuleUser(id, params) {
        // let formData = FormDataUtil.covert(params);
        return this.httpAdaptor.put(`/api/period/strategy/add-strategyuser/${id}`, params);
    }
    // daochu错误信息
    exporterrorfile(params) {
        return this.httpAdaptor.get(`/api/period/active/exportErrorList`, { params: params })
    }
    exportdownloaderror(res) {
        window.location.href = "/api/period/usersummary/exportdownload?fileName=" + res.fileName + "&sessionName=" + res.sessionName;
    }
    downloadhourfile(res?: any) {
        return this.httpAdaptor.get(`/api/period/active/tmp-download`)
    }
    // 获取最小结转年份
    getCarryOverYear() {
        return this.httpAdaptor.get(`/api/period/yearstask/max-period-isCarryOver`)
    }
    // 设置默认规则
    setDefault(id, params) {
        let param = FormDataUtil.searchParamFilter(params);
        return this.httpAdaptor.post(`/api/period/strategy/default/${id}`, null, { params: params })
    }
    // 取消默认规则
    cancleDefault(id) {
        return this.httpAdaptor.post(`/api/period/strategy/cancel-default/${id}`, null);
    }

    // 机构年度学时列表
    getPeriodUserGroup(params?: any) {
        return this.httpAdaptor.get(`/api/period/user/group`, { params: params })
            .catch(HttpUtils.handleError);
    }
    //机构年度查询详细列表
    getChildGroupPeriodList(id,params?: any) {
        return this.httpAdaptor.get(`/api/period/user/group/${id}`, { params: params })
            .catch(HttpUtils.handleError);
    }

    // 机构年度学时详情列表导出
    exportUserGroupHour(params: any) {
        return this.httpAdaptor.post(`/api/period/user/group/export`, null, { params: params })
    }
    // 机构年度学时的下载
    downloadUserGroupHour(res) {
        window.location.href = "/api/period/user/group/exportdownload?sessionName=" + res.sessionName + "&fileName="+res.fileName;
    }
    // 机构年度学时详情列表导出
    exporChildGroupHour(params: any) {
        return this.httpAdaptor.post(`/api/period/user/group/export/child`, null, { params: params })
    }
    
    // 教辅管理列表
    getHourAssistList(params) {
        return this.httpAdaptor.get(`/api/period/assistant/manager`, { params: params })
    }
    // 教辅人员添加
    addAssistUser(params) {
        let param = FormDataUtil.covert(params);
        return this.httpAdaptor.put(`/api/period/assistant/manager`, params);
    }
    // shanchu
    deleteAssistUser(ids) {
        return this.httpAdaptor.delete(`/api/period/assistant/manager`, { params: { ids: ids } })
    }
    // 单个用户
    getHourAssistDetail(id) {
        return this.httpAdaptor.get(`/api/period/assistant/manager/${id}`)
    }
    editHourAssistUser(id, params) {
        let param = FormDataUtil.covert(params);
        return this.httpAdaptor.post(`/api/period/assistant/manager/${id}`, param)
    }
    departmentList(params) {
        return this.httpAdaptor.get(`/api/period/project/manager`, { params: params })
    }
    // depar
    departmentGetDetail(id) {
        return this.httpAdaptor.get(`/api/period/project/${id}`)
    }
}
export interface UsernameVerifiedResult {
    username: string;
    result: 'OK' | 'NOT_FOUND' | 'FORBBIDEN';
    userInfo?: {
        id: number;
        username: string;
        displayName: string;
        userGroupName: string;
        avatar: string;
    }
}
