import { Component, OnInit } from '@angular/core';
import { CuiPagination, CuiLayer } from 'console-ui-ng';
import { TrainBaseService } from '../../service/train-base.service';
import { Router, ActivatedRoute } from '@angular/router';
import { TrainBase } from '../../entity/train-base';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { ImportMessage } from '../../entity/import-message';
import { UserGroup } from 'app/system/entity/user-group';
import { tipMessage } from 'app/account/entity/message-tip';

import {
    FormBuilder,
    FormGroup,
    Validators,
    FormControl
} from '@angular/forms';
import { validateConfig } from '@angular/router/src/config';
import * as moment from 'moment';
import { AuthService } from 'app/core';

@Component({
    templateUrl: './train-base-info.component.html',
    styleUrls: ['./train-base-info.component.scss']
})
export class TrainBaseInfoComponent implements OnInit {
    validateForm: FormGroup;
    _searchForm: FormGroup;
    _validateForm: FormGroup;
    trainBase: TrainBase[];
    pagination: CuiPagination;
    columns;
    loading: boolean = true;
    searchtext;
    TrainBaseWifi; TrainBaseWifiBss;
    selected: number[];
    lookLocationId;
    isLook: boolean = false;
    isVisibleshowWiFi: boolean = false;
    trainBaseId: any; // 某个站点id
    spinningwifi: boolean = false;
    WiFiListData: any;
    WiFiselection: any = [];
    isVisibleaddWiFi: boolean = false;
    editspinning: boolean = false;
    addwifisubmitloading: boolean = false;
    addwifieditid: any;
    isVisibleSecondLevel: boolean = false;
    SecondLevelId: any;
    SecondLevelListData: any;
    spinningbssid: boolean = false;
    isVisibleaddBssid: boolean = false;
    addbssLeveid: any; // 编辑bssid
    editBssSpinning: boolean = false;
    addBssIdsubmitloading: boolean = false;
    isVisibleImportant: boolean = false; // 导入的modal
    taskKey: string;
    progress = 0;
    parsedData;
    tipmessage?: ImportMessage[];
    status: string;
    messageShow: boolean;
    searchBy: {
        name?: string,
        createBy?: any,
        userGroup?: UserGroup,
        trainNo?: any,
        trainType?: any,
    } = {};
    wificolumns = [
        { title: 'SSID', data: 'ssid' },
        { title: '创建人', data: 'createdByDisplayName' },
        { title: '创建时间', tpl: 'createdDate' },
        { title: 'BSSID管理', tpl: 'bssid', styleClass: 'text-center' },
        { title: '操作', tpl: 'actions', styleClass: 'text-center' }
    ];
    // bssid
    SecondLevelcolumns = [
        { title: 'BSSID', data: 'bssid' },
        { title: '创建人', data: 'createdByDisplayName' },
        { title: '创建时间', tpl: 'createdDate' },
        { title: '开始时间', tpl: 'startDate' },
        { title: '结束时间', tpl: 'endDate' },
        { title: '操作', tpl: 'actions', styleClass: 'text-center' }
    ];
    messageColumns = [
        { title: '序号', tpl: 'colsheet', },
        { title: 'ssid', tpl: 'colnumber', },
        { title: 'bssid', tpl: 'bssid' },
        { title: '开始时间', tpl: 'startDate' },
        { title: '结束时间', tpl: 'endDate' },
        { title: '错误信息', tpl: 'colmessage', },
    ];
    constructor(private trainBaseService: TrainBaseService,
        private dialog: CuiLayer,
        private router: Router,
        private message: NzMessageService,
        private confirmServ: NzModalService,
        private traingapiServer: AuthService,
        private fb: FormBuilder,
        private route: ActivatedRoute) {
        this.columns = [
            { title: '基地名称', data: 'baseName', styleClass: 'text-left' },
            { title: '基地编号', data: 'baseNo' },
            { title: '基地类型', data: 'baseType', tpl: 'baseTypeCol', styleClass: 'text-center' },
            { title: '基地面积(平方米)', data: 'buildArea', styleClass: 'text-right' },
            { title: '基地级别', tpl: 'baseLevelCol', styleClass: 'text-left' },
            { title: '所属机构', data: 'userGroup.namePath', styleClass: 'text-left' },
            { title: '基地地址', data: 'baseAddress', styleClass: 'text-left' },
            { title: 'Wifi管理', tpl: 'managewifi', styleClass: 'text-center' },
            { title: '接站地点', tpl: 'look', styleClass: 'text-center' },
        ];
    }

    ngOnInit() {
        this._searchForm = this.fb.group({
            name: [''],
            createBy: [''],
            userGroup: [''],
            trainNo: [''],
            trainType: [''],
        })

        this.traingapiServer.getCurrentUser().subscribe(
            user => {
                if (user.managerGroup) {
                    this.searchBy.userGroup = user.managerGroup;
                    this._searchForm.get('userGroup').setValue(user.managerGroup)
                }
                this.loadData();
            }
        )
    }
    // 加载WiFi列表数据
    loadwifiData(page?: CuiPagination) {
        this.spinningwifi = true;
        let paramsObj = {
            'ssid': this.TrainBaseWifi,
            page: page ? page.number : 0,
            size: page ? page.size : 10,
            'trainBase.id': this.trainBaseId,
        };
        this.trainBaseService.getwifilist(paramsObj).subscribe(
            res => {
                this.spinningwifi = false;
                this.WiFiListData = res;
            },
            err => {
                this.spinningwifi = false;
                return tipMessage(err);
            }
        )
    }

    searchData(event, value) {
        this.searchBy = value;
        this.loadData();
    }

    loadData(page?: CuiPagination) {
        this.pagination = page;
        let params = {
            page: page ? page.number : 0,
            size: page ? page.size : '',
            sort: page && page.sort ? page.sort : '',
            baseName: this.searchBy.name ? this.searchBy.name : '',
            'createdBy.displayName': this.searchBy.createBy ? this.searchBy.createBy : '',
            baseNo: this.searchBy.trainNo ? this.searchBy.trainNo : '',
            baseType: this.searchBy.trainType ? this.searchBy.trainType : '',
        };

        if (this.searchBy.userGroup) {
            params['userGroupIds'] = this.searchBy.userGroup.id;
        }
        this.loading = true;
        this.trainBaseService.pageList(params).subscribe(
            pag => {
                this.pagination = pag;
                this.trainBase = pag.content;
                this.loading = false;
            }
        );
    }

    onSelect(selIds: any[]) {
        this.selected = selIds;
    }

    delete(id?) {
        let ids = id ? [id] : this.selected;
        this.dialog.confirm('确认要删除吗？',
            () => {
                this.trainBaseService.delete(ids).subscribe(
                    () => {
                        this.dialog.msg('删除成功');
                        this.loadData();
                    },
                    err => { this.dialog.confirm(err) }
                );
            }
        );
    }



    lookChaZhan(row) {
        this.lookLocationId = row.id;
        this.isLook = true;
    }

    cancelLocation(e) {
        this.isLook = false;
    }


    // g管理WiFimodal
    showmagewifi(id) {
        this.isVisibleshowWiFi = true;
        this.trainBaseId = id;
        // 对应站点下的WiFi列表数据
        this.loadwifiData();
    }
    // 取消确定
    handleCancelWiFi(event) {
        this.isVisibleshowWiFi = false;
        this.trainBaseId = undefined;
    }
    handleOkWiFi(event) {
        this.isVisibleshowWiFi = false;
        this.trainBaseId = undefined;
    }


    // 添加WiFimodal
    addwifi() {
        this.isVisibleaddWiFi = true;
        this.validateForm = this.fb.group({
            ssid: ['', [Validators.required]],
        })
    }
    // tianjiaWiFi弹窗的显示影藏
    handleCanceladdWiFi(event) {
        this.isVisibleaddWiFi = false;
        this.addwifieditid = undefined;
    }
    handleOkaddWiFi(event) {
        this.isVisibleaddWiFi = false;
        this.addwifieditid = undefined;
    }
    // 提交添加WiFi名称
    submitForm(event, value) {
        let params = {
            ...value,
            'trainBase': { id: this.trainBaseId },
        }
        this.addwifisubmitloading = true;
        if (this.addwifieditid) {
            // 编辑WiFi名
            // 先进行名称是否已有的判断
            let paramsObjudge = {
                ...value,
                id: this.addwifieditid
            }
            this.trainBaseService.judgenamerepeat(this.trainBaseId, paramsObjudge).subscribe(
                res => {
                    if (res == 'false') {
                        let paramsObj = {
                            ...params,
                            id: this.addwifieditid
                        }
                        this.trainBaseService.editWiFisave(this.addwifieditid, paramsObj).subscribe(
                            result => {
                                this.isVisibleaddWiFi = false;
                                tipMessage('保存成功！', 'success');
                                this.loadwifiData();
                                this.addwifieditid = undefined;
                                this.addwifisubmitloading = false;
                            },
                            error => {
                                // this.addwifieditid = undefined;
                                this.addwifisubmitloading = false;
                                return tipMessage(error);
                            }
                        )
                    } else {
                        this.addwifisubmitloading = false;
                        return tipMessage('SSID已存在不可添加！');
                    }

                },
                err => {
                    // this.addwifieditid = undefined;
                    this.addwifisubmitloading = false;
                    return tipMessage(err);
                }
            )
        } else {
            // 添加WiFi名
            // 先进行名称是否已有的判断
            let addparams = {
                ...value,
                type: 'add'
            }
            this.trainBaseService.judgenamerepeat(this.trainBaseId, addparams).subscribe(
                res => {
                    if (res == 'false') {
                        this.trainBaseService.addwifiname(params).subscribe(
                            result => {
                                this.isVisibleaddWiFi = false;
                                tipMessage('添加成功！', 'success');
                                this.loadwifiData();
                                this.addwifisubmitloading = false;
                            },
                            error => {
                                this.addwifisubmitloading = false;
                                return tipMessage(error);
                            }
                        )
                    } else {
                        this.addwifisubmitloading = false;
                        return tipMessage('SSID已存在不可添加！');
                    }

                },
                err => {
                    this.addwifisubmitloading = false;
                    return tipMessage(err);
                }
            )
        }


    }
    // 导入modal
    important() {
        this.isVisibleImportant = true;
    }
    // 导入modal的取消
    handleCancelimportant(event) {
        this.isVisibleImportant = false;
        this.taskKey = undefined;
        this.progress = 0;
        this.parsedData = undefined;
        this.loadwifiData();
        this.tipmessage = [];
        this.status = undefined;
        this.messageShow = undefined;
    }
    handleOkimportant(event) {
        this.isVisibleImportant = false;
        this.taskKey = undefined;
        this.progress = 0;
        this.parsedData = undefined;
        this.loadwifiData();
        this.tipmessage = [];
        this.status = undefined;
        this.messageShow = undefined;
    }

    //下载模板
    download() {
        this.trainBaseService.download();
    }


    // 导入的操作
    onUploadComplete(fileupload) {
        if (fileupload) {
            this.taskKey = fileupload['taskKey'];
            this.status = 'validating';
            this.getImportProgress();

            // console.log(fileupload, 3421)
        }
    }

    import() {
        this.status = 'importing';
        this.trainBaseService.import(this.taskKey, this.trainBaseId).subscribe(
            errorList => {
                if (errorList.length !== 0) {
                    // console.log(111)
                    this.tipmessage = errorList;
                    tipMessage('导入失败');
                    this.status = 'after';
                    this.messageShow = true;
                } else {
                    // console.log(222)
                    tipMessage('导入成功', 'success');
                    setTimeout(() => {
                        this.isVisibleImportant = false;
                        this.loadwifiData();
                        this.trainBaseId = undefined;
                    }, 2000)
                    this.status = 'success';
                    this.messageShow = false;
                }
            }
        )
    }

    getImportProgress() {
        this.trainBaseService.importProgress(this.taskKey).subscribe(
            m => {
                this.progress = m ? (m['progress'] || 0) : 0;
                if (!this.progress || this.progress < 100) {
                    // this.interval = setInterval(this.getImportProgress, 1000)
                    setTimeout(() => {
                        this.getImportProgress();
                    }, 1000);
                } else {
                    this.parsedData = m['parsedData'];
                    this.status = 'before';
                    if (!this.parsedData) {
                        this.getImportProgress();
                    }
                }
            }
        );
    }

    // 编辑WiFi管理
    editwifi(id) {
        // 获取edit的对应数
        this.editspinning = true;
        this.isVisibleaddWiFi = true;
        this.addwifieditid = id;
        this.validateForm = this.fb.group({
            ssid: ['', [Validators.required]],
        })
        this.trainBaseService.geteditmesage(id).subscribe(
            res => {
                this.validateForm = this.fb.group({
                    ssid: [res.ssid, [Validators.required]],
                })
                this.editspinning = false;
            },
            err => {
                return tipMessage(err);
            }
        )
    }
    // 删除WiFi
    deletewifi(id) {
        let self = this;
        let ids = [id];
        this.confirmServ.confirm({
            title: '删除！',
            content: '确定要删除？',
            showConfirmLoading: true,
            zIndex: 1003,
            onOk() {
                self.trainBaseService.deleteaddWiFi(ids).subscribe(
                    res => {
                        tipMessage('删除成功！', 'success');
                        self.loadwifiData();
                    },
                    err => {
                        return tipMessage(err);
                    }
                )
            },
            onCancel() { }
        })

    }
    // 加载bssid的列表数据
    loadSecondLevelData(page?: CuiPagination) {
        this.spinningbssid = true;
        let paramsObj = {
            bssid: this.TrainBaseWifiBss,
            page: page ? page.number : 0,
            size: page ? page.size : 10,
            'trainBaseWifi.id': this.SecondLevelId,
        };
        this.trainBaseService.getbssidList(paramsObj).subscribe(
            res => {
                this.spinningbssid = false;
                this.SecondLevelListData = res;
            },
            err => {
                this.spinningbssid = false;
                return tipMessage(err);
            }
        )
    }
    // bssid管理
    bssidmange(id) {
        this.isVisibleSecondLevel = true;
        this.SecondLevelId = id;
        this.loadSecondLevelData();
    }
    // bssid弹窗的显示影藏
    handleCancelSecondLevel(event) {
        this.isVisibleSecondLevel = false;
        this.SecondLevelId = undefined;
    }
    handleOkSecondLevel(event) {
        this.isVisibleSecondLevel = false;
        this.SecondLevelId = undefined;
    }
    // 添加bssid
    addbssid() {
        this.isVisibleaddBssid = true;
        this._validateForm = this.fb.group({
            bssid: ['', [Validators.required]],
            startDate: [null, [Validators.required]],
            endDate: [null, [Validators.required]]
        })
    }
    // bssid弹窗的显示隐藏
    handleCanceladdBssid(event) {
        this.isVisibleaddBssid = false;
        this.addbssLeveid = undefined;

    }
    handleOkaddBssid() {
        this.isVisibleaddBssid = false;
        this.addbssLeveid = undefined;
    }
    // 提交bssid编辑
    _submitForm(event, value) {
        let params = {
            ...value,
            startDate: moment(value.startDate).format('YYYY-MM-DD'),
            endDate: moment(value.endDate).format('YYYY-MM-DD'),
            'trainBaseWifi': { id: this.SecondLevelId },
        }
        this.addBssIdsubmitloading = true;
        if (this.addbssLeveid) {
            // 先进行名称是否已有的判断
            let paramsObjudge = {
                ...params,
                id: this.addbssLeveid
            }
            this.trainBaseService.judgebssidrepeat(this.SecondLevelId, paramsObjudge).subscribe(
                res => {

                    if (res == 'false') {
                        let paramsObj = {
                            ...params,
                            id: this.addbssLeveid
                        }
                        this.trainBaseService.editbbsIdsave(this.addbssLeveid, paramsObj).subscribe(
                            result => {
                                this.isVisibleaddBssid = false;
                                tipMessage('保存成功！', 'success');
                                this.loadSecondLevelData();
                                this.addbssLeveid = undefined;
                                this.addBssIdsubmitloading = false;
                            },
                            error => {
                                // this.addwifieditid = undefined;
                                this.addBssIdsubmitloading = false;
                                return tipMessage(error);
                            }
                        )
                    } else {
                        this.addBssIdsubmitloading = false;
                        return tipMessage('BSSID已存在不可添加！');
                    }

                },
                err => {
                    // this.addwifieditid = undefined;
                    this.addBssIdsubmitloading = false;
                    return tipMessage(err);
                }
            )

        } else {
            // 先进行名称是否已有的判断
            let addparams = {
                ...value,
                startDate: moment(value.startDate),
                endDate: moment(value.endDate),
                type: 'add'
            }
            this.trainBaseService.judgebssidrepeat(this.SecondLevelId, addparams).subscribe(
                res => {
                    if (res == 'false') {
                        this.trainBaseService.addbssid(params).subscribe(
                            result => {
                                this.isVisibleaddBssid = false;
                                tipMessage('添加成功！', 'success');
                                this.loadSecondLevelData();
                                this.addBssIdsubmitloading = false;
                                this.addbssLeveid = undefined;
                            },
                            error => {

                                this.addBssIdsubmitloading = false;
                                return tipMessage(error);
                            }
                        )
                    } else {
                        this.addBssIdsubmitloading = false;
                        return tipMessage('BSSID已存在不可添加！');
                    }

                },
                err => {
                    this.addBssIdsubmitloading = false;
                    return tipMessage(err);
                }
            )
        }
    }
    // 编辑bssid
    editbssid(id) {
        this.addbssLeveid = id;
        this.editBssSpinning = true;
        this.isVisibleaddBssid = true;
        this._validateForm = this.fb.group({
            bssid: ['', [Validators.required]],
            startDate: [null, [Validators.required]],
            endDate: [null, [Validators.required]]
        })
        this.trainBaseService.geteditbssidmesage(id).subscribe(
            res => {
                this._validateForm = this.fb.group({
                    bssid: [res.bssid, [Validators.required]],
                    startDate: [moment(res.startDate), [Validators.required]],
                    endDate: [moment(res.endDate), [Validators.required]]
                })
                this.editBssSpinning = false;
            },
            err => {
                this.editBssSpinning = false;
                return tipMessage(err);
            }
        )
    }
    // 删除
    deletebssid(id) {
        let self = this;
        let ids = [id];
        this.confirmServ.confirm({
            title: '删除！',
            content: '确定要删除？',
            showConfirmLoading: true,
            zIndex: 1003,
            onOk() {
                self.trainBaseService.deletebssid(ids).subscribe(
                    res => {
                        tipMessage('删除成功！', 'success');
                        self.loadSecondLevelData();
                    },
                    err => {
                        return tipMessage(err);
                    }
                )
            },
            onCancel() { }
        })
    }

}
