import { Component, OnInit } from '@angular/core';
import { NgForm, FormBuilder, Validators } from '@angular/forms';
import { FormDataUtil } from '../../../../core';
import { FormGroup } from '@angular/forms/src/model';
import { NzMessageService } from 'ng-zorro-antd';
import { Router, ActivatedRoute } from '@angular/router';
import { HourService } from '../../../managementservice/hour.service';
import * as moment from 'moment';
import { tipMessage } from 'app/account/entity/message-tip';

@Component({
    selector: 'spk-taskedit',
    templateUrl: './taskedit.component.html',
    styleUrls: ['./taskedit.component.scss']
})
export class TaskeditComponent implements OnInit {
    _form: FormGroup;
    demoValue = 45; // 普通员工老师
    staffValue = 90; // 普通员工学时
    startDate = null;
    endDate = null;
    spinning: boolean = false;
    btnstate: boolean = false; // 按钮的loading效果
    id: any = undefined;
    isEdit: boolean = false;
    year: any = new Date().getFullYear();
    formData = {
        year: [this.year, [Validators.required]], // 学时任务所属年份
        staffPeriod: [90, [Validators.required, Validators.pattern(/^[0-9]*$/)]], // 员工学时任务
        staffHeadquartersPeriod: ['', [Validators.required, Validators.pattern(/^[0-9]*$/)]],
        staffCompanyPeriod: ['', [Validators.required, Validators.pattern(/^[0-9]*$/)]],
        staffTeacherPeriod: ['', [Validators.required, Validators.pattern(/^[0-9]*$/)]],
        leaderTeacherPeriod: ['', [Validators.required, Validators.pattern(/^[0-9]*$/)]], // 处级以上员工老师学时任务
        leaderPeriod: ['110', [Validators.required, Validators.pattern(/^[0-9]*$/)]],
        leaderHeadquartersPeriod: ['', [Validators.required, Validators.pattern(/^[0-9]*$/)]],
        leaderCompanyPeriod: ['', [Validators.required, Validators.pattern(/^[0-9]*$/)]],
        startDate: [null, [Validators.required]],
        remark: [],
        endDate: [null, [Validators.required]]
    }

    constructor(private fb: FormBuilder,
        private _message: NzMessageService,
        private route: Router,
        private routeInfo: ActivatedRoute,
        private hourservice: HourService) {
    }

    initForm() {
        this._form = this.fb.group(this.formData)
    }

    ngOnInit() {
        this.initForm();
        this.routeInfo.queryParams.subscribe((params) => {
            if (params.type == 'addtask') {

            } else {
                this.spinning = true;
                // 请求对应学时任务的数据
                this.id = params.id;
                this.hourservice.getsingletask(this.id).subscribe(
                    (res) => {
                        // console.log(res, 222);
                        let resData = res;
                        this.spinning = false;
                        this.isEdit = true;
                        // tslint:disable-next-line:forin
                        for (let key in this.formData) {
                            let bool = key != 'remark';
                            // console.log(key, 6666)
                            // this.formData[key] = [res[key], bool ? [Validators.required] : []];
                            this.formData[key] = [resData[key], this.formData[key][1]];
                        }
                        console.log(this.formData, 444)
                        this.initForm();
                    },
                    err => {
                        this.spinning = false;
                        return tipMessage(err);
                    }
                )
            }
        })

    }

    _save(event, value) {
        // console.log(value, 222)
        let paramsobj = {
            ...value,
            startDate: moment(value.startDate).format('YYYY-MM-DD'),
            endDate: moment(value.endDate).format('YYYY-MM-DD')
        }
        this.btnstate = true;
        this.routeInfo.queryParams.subscribe((params) => {
            if (params.type == 'addtask') {
                this.hourservice.getingleTaskByYear(paramsobj.year).subscribe(
                    result => {
                        if (result == null || result.year == null) {
                            // 添加创建学时任务
                            this.hourservice.addpriodtask(paramsobj).subscribe(
                                res => {
                                    console.log(res);
                                    this.btnstate = false;
                                    tipMessage('创建学时任务成功!', 'success');
                                    // 创建学时成功后返回到列表页
                                    this.route.navigate(['/classhour/hourtask/tasklist'])
                                },
                                err => {
                                    this.btnstate = false;
                                    return tipMessage(err);
                                }
                            )
                        } else {
                            this.btnstate = false;
                            return tipMessage('该年度学时已创建');
                        }
                    },
                    error2 => {
                        this.btnstate = false;
                        return tipMessage(error2);
                    }
                );
            } else if (params.id || params.id == 0) {
                // 修改已创建的学时任务
                this.hourservice.editpriodtask(params.id, paramsobj).subscribe(
                    res => {
                        // console.log(res);
                        this.btnstate = false;
                        tipMessage('编辑学时任务成功!', 'success');
                        // 编辑成功后返回到列表页
                        this.route.navigate(['/classhour/hourtask/tasklist'])
                    },
                    err => {
                        this.btnstate = false;
                        return tipMessage(err);
                    }
                )
            }
        })

        // console.log(paramsobj, 444)
    }

    // 返回列表页
    goBack() {
        window.history.back()
    }

    // 结束时间不能小于开始时间
    _startValueChange = () => {
        if (this.startDate > this.endDate) {
            this.endDate = null;
        }
    };
    _endValueChange = () => {
        if (this.startDate > this.endDate) {
            this.startDate = null;
        }
    };
    _disabledStartDate = (startValue) => {
        if (!startValue || !this.endDate) {
            return false;
        }
        return startValue.getTime() >= this.endDate.getTime();
    };
    _disabledEndDate = (endValue) => {
        if (!endValue || !this.startDate) {
            return false;
        }
        return endValue.getTime() <= this.startDate.getTime();
    };

}
