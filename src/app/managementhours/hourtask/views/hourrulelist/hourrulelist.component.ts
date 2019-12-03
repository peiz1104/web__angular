import { Component, OnInit, AfterContentInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { Pagination } from 'app/core/entity/pagination';
import { HourService } from '../../../managementservice/hour.service';
import { AuthService } from 'app/core/auth/auth.service';
import {
    FormBuilder,
    FormGroup,
    Validators,
    FormControl
} from '@angular/forms';
declare let $: any;
@Component({
    selector: 'spk-hourrulelist',
    templateUrl: './hourrulelist.component.html',
    styleUrls: ['./hourrulelist.component.scss']
})
export class HourrulelistComponent implements OnInit, AfterContentInit {
    _searchForm: FormGroup;
    _form: FormGroup;
    periodYearTaskId: any;
    nowYear: any;
    spinning: boolean = false;
    testListData: any;
    selection: any[] = [];
    isVisible: boolean = false;
    editId: any;
    btnstate: boolean = false;
    options: any[] = [];
    editSpinning: boolean = false;
    isCarryover: boolean = false;
    isRunable: boolean = false;
    site: any;
    columns: any = [
        { title: '规则名称', data: 'name' },
        { title: '学时数', data: 'periodNumber', styleClass: 'text-right' },
        { title: '是否默认', tpl: 'isDefault', styleClass: 'text-center' },
        { title: '管理学时人员', tpl: 'adduser', styleClass: 'text-center' },
        { title: '操作', tpl: 'actions', styleClass: 'text-center' },
    ];
    constructor(
        private router: Router,
        private routeInfo: ActivatedRoute,
        private service: HourService,
        private message: NzMessageService,
        private confrim: NzModalService,
        private fb: FormBuilder,
        private authService: AuthService
    ) { }

    ngOnInit() {
        this._searchForm = this.fb.group({
            year: []
        });
        this.authService.getCurrentSite().subscribe((site) => {
            this.site = site;
        });
        this.service.getHourRuleListSearchYear().subscribe((res) => {
            if (res.years) {
                this.options = res.years;
                let nowyear = res.years.filter((item) => {
                    return item.year == res.nowYear;
                })
                if (nowyear.length) {
                    this.nowYear = res.nowYear;
                    this.periodYearTaskId = nowyear[0].id;
                    this._searchForm = this.fb.group({
                        year: [nowyear[0].id]
                    })
                    this.isCarryover = nowyear[0].isCarryover == 'false' ? false : true;
                    this.isRunable = nowyear[0].isRunable
                } else {
                    this.nowYear = res.years[res.years.length - 1].year;
                    this.periodYearTaskId = res.years[res.years.length - 1].id;
                    this._searchForm = this.fb.group({
                        year: [res.years[res.years.length - 1].id]
                    })
                    this.isCarryover = res.years[res.years.length - 1].isCarryover == 'false' ? false : true;
                    this.isRunable = res.years[res.years.length - 1].isRunable
                }
                this.loadData();
            }

        })
    }
    ngAfterContentInit() {
        this.authService.getCurrentSite().subscribe((site) => {
            this.site = site;
        });
    }
    loadData(page?: Pagination<any>) {
        let params = {
            page: page ? page.number : 0,
            size: page ? page.size : 10,
        };
        if (this._searchForm.value.year) {
            params['periodYearsTask.id'] = this._searchForm.value.year || this.periodYearTaskId;
        }
        this.spinning = true;
        this.service.gethourRuleList(params).subscribe(
            (res) => {
                this.testListData = res;
                this.spinning = false;
                this.selection = [];
            },
            err => {
                this.spinning = false;
                $.toast({
                    icon: 'error',
                    text: err,
                    position: 'top-center',
                    allowToastClose: false,
                    hideAfter: 1000
                })
            }
        )
    }
    _submitForm($event, value) {
        $event.preventDefault();
        // tslint:disable-next-line:forin
        if (value.year) {
            this.periodYearTaskId = value.year;
            this.nowYear = this.chooseNowYear()[0].year;
            this.isCarryover = this.chooseNowYear()[0].isCarryover == 'false' ? false : true;
            this.isRunable = this.chooseNowYear()[0].isRunable
        } else {
            this.periodYearTaskId = this.options[this.options.length - 1].id;
        }
        this.loadData();
        return;
    }
    addhourrule(evnet) {
        this.isVisible = true;
        this._form = this.fb.group({
            periodNumber: ['', [Validators.required, Validators.pattern(/^\d*\.?\d+$/)]],
            name: ['', [Validators.required]],
            headquartersPeriod: ['', [Validators.required, Validators.pattern(/^\d*\.?\d+$/)]],
            companyPeriod: ['', [Validators.required, Validators.pattern(/^\d*\.?\d+$/)]],
            teacherPeriod: ['', [Validators.required, Validators.pattern(/^\d*\.?\d+/)]]
        })

    }
    mutipledelete(event) {
        if (this.selection.length == 0) {
            return $.toast({
                icon: 'error',
                text: '请选择要删除的项',
                position: 'top-center',
                allowToastClose: false,
                hideAfter: 1000
            })
        }
        let ids = this.getIds(this.selection);
        this.confrim.confirm({
            title: '删除',
            content: '确定要删除所选项？',
            showConfirmLoading: true,
            zIndex: 1003,
            onOk: () => {
                this.service.deleteRule(ids).subscribe((res) => {
                    this.loadData();
                    $.toast({
                        icon: 'success',
                        text: '删除成功',
                        position: 'top-center',
                        allowToastClose: false,
                        hideAfter: 1000
                    })
                },
                    error => {
                        $.toast({
                            icon: 'error',
                            text: error,
                            position: 'top-center',
                            allowToastClose: false,
                            hideAfter: 1000
                        })
                    }
                )
            },
            onCancel: () => { }
        })
    }
    deleteSingle(ids) {
        this.confrim.confirm({
            title: '删除',
            content: '确定要删除此项？',
            showConfirmLoading: true,
            zIndex: 1003,
            onOk: () => {
                this.service.deleteRule(ids).subscribe((res) => {
                    this.loadData();
                    $.toast({
                        icon: 'error',
                        text: '删除成功',
                        position: 'top-center',
                        allowToastClose: false,
                        hideAfter: 1000
                    })
                },
                    error => {
                        $.toast({
                            icon: 'error',
                            text: error,
                            position: 'top-center',
                            allowToastClose: false,
                            hideAfter: 1000
                        })
                    }
                )
            },
            onCancel() { }
        })
    }
    editHourRule(value) {
        this.editId = value.id;
        this.isVisible = true;
        this.editSpinning = true;
        this._form = this.fb.group({
            periodNumber: ['', [Validators.required, Validators.pattern(/^\d*\.?\d+$/)]],
            name: ['', [Validators.required]],
            headquartersPeriod: ['', [Validators.required, Validators.pattern(/^\d*\.?\d+$/)]],
            companyPeriod: ['', [Validators.required, Validators.pattern(/^\d*\.?\d+$/)]],
            teacherPeriod: ['', [Validators.required, Validators.pattern(/^\d*\.?\d+/)]]
        })
        this.service.getsingleRule(this.editId).subscribe(
            res => {
                this.editSpinning = false;
                this._form = this.fb.group({
                    periodNumber: [res.periodNumber, [Validators.required, Validators.pattern(/^\d*\.?\d+$/)]],
                    name: [res.name, [Validators.required]],
                    headquartersPeriod: [res.headquartersPeriod, [Validators.required, Validators.pattern(/^\d*\.?\d+$/)]],
                    companyPeriod: [res.companyPeriod, [Validators.required, Validators.pattern(/^\d*\.?\d+$/)]],
                    teacherPeriod: [res.teacherPeriod, [Validators.required, Validators.pattern(/^\d*\.?\d+/)]]
                })
            },
            err => {
                this.editSpinning = false;
                $.toast({
                    icon: 'error',
                    text: err,
                    position: 'top-center',
                    allowToastClose: false,
                    hideAfter: 1000
                })
            }
        )

    }
    _save(event, value) {
        event.stopPropagation ? event.stopPropagation() : event.cancelBubble = true;
        event.preventDefault ? event.preventDefault() : event.returnValue = false;
        let params = {
            ...value,
            'periodYearsTask': { id: this.periodYearTaskId }
        }
        if (this.site && this.site.id != 30) {
            this._form.removeControl('headquartersPeriod');
            this._form.removeControl('companyPeriod');
            this._form.removeControl('teacherPeriod');
            delete params.headquartersPeriod;
            delete params.companyPeriod;
            delete params.teacherPeriod;
        }
        if (!this._form.valid) {
            return $.toast({
                icon: 'error',
                text: '请按要求填写',
                position: 'top-center',
                allowToastClose: false,
                hideAfter: 1000
            });
        }
        this.btnstate = true;
        if (this.editId) {
            this.service.editSaveRule(this.editId, params).subscribe(
                res => {
                    $.toast({
                        icon: 'success',
                        text: '编辑学时规则成功！',
                        position: 'top-center',
                        allowToastClose: false,
                        hideAfter: 1000
                    })
                    this.btnstate = false;
                    this.isVisible = false;
                    this.editId = false;
                    this.loadData();
                },
                error => {
                    $.toast({
                        icon: 'error',
                        text: error,
                        position: 'top-center',
                        allowToastClose: false,
                        hideAfter: 1000
                    });
                    this.btnstate = false;
                }
            )
        } else {
            this.service.createHourRule(params).subscribe(
                res => {
                    $.toast({
                        icon: 'success',
                        text: '添加学时规则成功！',
                        position: 'top-center',
                        allowToastClose: false,
                        hideAfter: 1000
                    })
                    this.btnstate = false;
                    this.isVisible = false;
                    this.editId = false;
                    this.loadData();
                },
                err => {
                    $.toast({
                        icon: 'error',
                        text: err,
                        position: 'top-center',
                        allowToastClose: false,
                        hideAfter: 1000
                    })
                    this.btnstate = false;
                }
            )
        }

    }
    handleCancel() {
        this.isVisible = false;
        this.editId = undefined;
        this.btnstate = false;
    }
    changePeriodNumber(event) {
        // console.log(event, 444);
        let formControl = this._form.controls.periodNumber;
        let value = event.trim();
        // console.log(value);
        if (this.site && this.site.id == 30) {
            if (/^\d*\.?\d+/.test(value)) {
                this._form.get('headquartersPeriod').setValue((value * 0.6).toFixed(2));
                this._form.get('companyPeriod').setValue((value * 0.4).toFixed(2));
                this._form.get('teacherPeriod').setValue((value * 0.5).toFixed(2));
            }
        }
    }
    getIds(array: any[]) {
        let ids = [];
        array.map((item) => {
            ids.push(item.id);
        })
        return ids;
    }
    // 获取当前选择的年份
    chooseNowYear() {
        return this.options.filter((item) => {
            return item.id == this.periodYearTaskId;
        })
    }
    onDefault(id) {
        let params = {
            periodYearsTaskId: this.periodYearTaskId
        }
        this.confrim.confirm({
            title: `设置当前默认将会取消当前年份下其它默认规则，确定设置吗？`,
            zIndex: 1003,
            onOk: () => {
                this.service.setDefault(id, params).subscribe(
                    papers => {
                        $.toast({
                            icon: 'success',
                            text: '设置成功',
                            position: 'top-center',
                            allowToastClose: false,
                            hideAfter: 1000
                        })
                        this.loadData();
                    }
                );
            }
        });
    }
    onCancleDefault(id) {
        this.confrim.confirm({
            title: `确定要取消吗？`,
            zIndex: 1003,
            onOk: () => {
                this.service.cancleDefault(id).subscribe(
                    papers => {
                        $.toast({
                            icon: 'success',
                            text: '取消成功',
                            position: 'top-center',
                            allowToastClose: false,
                            hideAfter: 1000
                        })
                        this.loadData();
                    }
                );
            }
        });
    }
}
