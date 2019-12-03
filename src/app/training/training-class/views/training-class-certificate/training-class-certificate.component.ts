/*
 * @Author: mozhengqian
 * @Date: 2017-11-21 15:21:56
 * @Last Modified by: mozhengqian
 * @Last Modified time: 2017-11-30 16:17:52
 */
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {
    FormBuilder,
    FormGroup,
    Validators,
    FormControl
} from '@angular/forms';
import { Pagination } from 'app/core/entity/pagination';
import { TrainingClassCertificateService } from 'app/training/training-class/service/training-class-certificate.service'
import { NzModalService } from 'ng-zorro-antd';
import { lang } from 'moment';
import { TrainingClass } from './../../../entity/training-class';
import { tipMessage } from 'app/account/entity/message-tip';
@Component({
    selector: 'spk-training-class-certificate',
    templateUrl: './training-class-certificate.component.html',
    styleUrls: ['./training-class-certificate.component.scss']
})
export class TrainingClassCertificateComponent implements OnInit {
    allData: any = {};
    columns: any = [
        { title: '用户名', data: 'user.username', styleClass: 'text-center' },
        { title: '姓名', data: 'user.displayName', styleClass: 'text-center' },
        { title: '手机号', data: 'user.phoneNumber', styleClass: 'text-center' },
        { title: '所属单位', data: 'user.userGroup.name', styleClass: 'text-center' },
        { title: '颁发状态', data: 'isAward', styleClass: 'text-center' },
        { title: '操作', tpl: 'option', styleClass: 'text-center' },
    ];
    selection: any[] = [];
    _searchForm: FormGroup;
    tbcId: any;
    url: any = '';
    leftData: any = [];
    certTypeList: any = [];
    isVisible: boolean = false;
    selectId: any;
    spinningBool: boolean = true;
    certIds: any = [];
    loading: boolean;
    trainingName: string;
    identify: string = 'TRAININGCLASS';
    constructor(
        private router: Router,
        public activatedRoute: ActivatedRoute,
        private fb: FormBuilder,
        private trainingClassCertificateService: TrainingClassCertificateService,
        private modal: NzModalService
    ) { }

    ngOnInit() {
        this.tbcId = this.activatedRoute.snapshot.params['tbcId'];
        this.activatedRoute.data.subscribe(
            (obj: { trainingClass: any }) => {
                this.trainingName = obj.trainingClass.name;
            }
        );
        this.url = `training/class/${this.tbcId}/certificate`;
        this._searchForm = this.fb.group({
            'certLib.name': [''],
            'certLib.certificateType.id': ['']
        });
        this.loadLeftData();
        this.trainingClassCertificateService.getCertTypeList(this.identify).subscribe(data => this.certTypeList = data);
    }
    loadLeftData(params?: any) {
        this.trainingClassCertificateService.getLeftList(this.tbcId, params).subscribe(data => {
            data.forEach((obj, index) => {
                obj.active = index == 0;
            });
            this.leftData = data;
            // console.log(this.leftData);
            let addData = [];
            data.forEach(e => {
                addData.push(e.certLib.id);
            });
            this.certIds = addData;
            this.selectId = data && data[0] && data[0].certLib && data[0].certLib.id;
            console.log('添加数据：', this.certIds);
            // tslint:disable-next-line:no-unused-expression
            if (this.selectId) {
                this.loadData(null, null, this.selectId, this.tbcId);
            } else {
                this.spinningBool = false;
            }
            // console.log(data);
        });
    }
    loadData(params?: any, page?: Pagination<any>, selectId?: any, tbcId?: any) {
        this.loading = true;
        // tslint:disable-next-line:no-unused-expression
        this.trainingClassCertificateService.getRightList(this.selectId || selectId, this.tbcId || tbcId, params, page).subscribe(data => {
            this.allData = data;
            this.spinningBool = false;
            this.loading = false;
        },
            err => {
                this.loading = false;
            }
        );
    }
    _submitForm($event, value) {
        $event.preventDefault();
        // tslint:disable-next-line:forin
        console.log(value);
        this.loadLeftData(value);
    }
    resetForm($event: MouseEvent) {
        $event.preventDefault();
        this._searchForm.reset();
        // tslint:disable-next-line:forin
        for (const key in this._searchForm.controls) {
            this._searchForm.controls[key].markAsPristine();
        }
    }
    closeLeftCard(id) {
        this.trainingClassCertificateService.deleteCertificate(id).subscribe(
            data => {
                tipMessage('删除成功', 'success');
                this.loadLeftData();
            },
            error => {
                tipMessage(error);
            }

        )
        // this.leftData.splice(index, 1);
    }
    cardLink(selectId, i) {
        this.spinningBool = true;
        this.leftData.forEach((obj, index) => {
            obj.active = index == i;
        });
        this.selectId = selectId;
        this.loadData();
    }
    handleCancel = (e) => {
        this.isVisible = false;
    }
    handleOk = (value) => {
        if (value) {
            this.trainingClassCertificateService.addCertificate(this.tbcId, value).subscribe(data => {
                this.isVisible = false;
                this.loadLeftData();
            });
            // } else {
            //     this.modal.warning({
            //         title: `请选择要添加的列！`
            //     });
            //     return;
        }
    }
    goAdd(obj) {
        this.modal.confirm({
            title: `确定要为选择的学员颁发证书吗？`,
            zIndex: 1003,
            onOk: () => {
                this.trainingClassCertificateService.issuedbyCertificate(this.selectId, this.tbcId, obj).subscribe(
                    ok => {
                        tipMessage('颁发成功', 'success');
                        this.spinningBool = true;
                        this.loadData();
                    },
                    err => tipMessage(err)
                );
            }
        });
    }
    goAllAdd() {
        let obj = [];
        console.log(this.selection);
        if (this.selection.length > 0) {
            this.selection.forEach(data => {
                obj.push(data.user);
            });
            this.goAdd(obj);
        } else {
            this.modal.warning({
                title: `请选择要颁发的学员`,
                zIndex: 1003,
            });
            return;
        }
    }
    goDelete(ids) {
        this.modal.confirm({
            title: `确定要撤销已选择学员的证书吗？`,
            zIndex: 1003,
            onOk: () => {
                this.trainingClassCertificateService.undoCertificate(this.selectId, ids).subscribe(
                    ok => {
                        tipMessage('撤销成功', 'success');
                        this.spinningBool = true;
                        this.loadData();
                    },
                    err => tipMessage('撤销失败')
                );
            }
        });
    }

    goAllDelete() {
        let obj = [];
        if (this.selection.length > 0) {
            this.selection.forEach(data => {
                obj.push(data.user.id);
            });
            this.goDelete(obj);
        } else {
            this.modal.warning({
                title: `请选择要撤销颁发的学员`,
                zIndex: 1003
            });
            return;
        }
    }

}
