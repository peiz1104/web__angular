import { Component, OnInit } from '@angular/core';
import { CuiPagination, Column } from 'console-ui-ng';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Pagination } from 'app/core';
import { TrainingClassApiService } from '../../../../service/training-class-api.service'
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AccountService } from 'app/account/service/account.service';

@Component({
    selector: 'spk-training-class-achievement',
    templateUrl: './training-class-achievement.component.html',
    styleUrls: ['./training-class-achievement.component.scss']
})
export class TrainingClassAchievementComponent implements OnInit {
    Resultsgunli: FormGroup;
    loading: boolean = false;
    // 表格数据
    message: any = {};
    trainingId: number;
    Inpvalue: any = {};
    step: number = 0;
    paginations: CuiPagination;
    // 结业证书模态变量
    isVisible = false;
    _isComplexSearch: boolean = false;
    _isComplexSearch1: boolean = false;
    // 下拉变量
    downData = [];
    Privalue: any = {};
    // 部门配置
    accountInfo: any = {};
    managerGroup: any = {};
    columns: Column[] = [
        { title: '用户名', data: 'user.username', styleClass: 'text-center' },
        { title: '姓名', data: 'user.displayName', styleClass: 'text-center' },
        { title: '手机号', data: 'user.phoneNumber', styleClass: 'text-center' },
        { title: '所属单位', data: 'user.userGroup.name', styleClass: 'text-center' },
        { title: '成绩', data: 'score', styleClass: 'text-center' },
        { title: '状态', data: 'scoreState', tpl: 'state', styleClass: 'text-center' }
    ];
    tbcId: any;
    selection: any[];
    constructor(private fb: FormBuilder,
        private trainingClassApiService: TrainingClassApiService,
        private activatedRoute: ActivatedRoute,
        private accountInfoService: AccountService

    ) { }
    ngOnInit() {
        this.tbcId = this.activatedRoute.snapshot.params['tbcId'];
        // 表单初始值设置
        this.Resultsgunli = this.fb.group({
            "user.username": [''],
            "user.displayName": [''],
            "user.userGroup.id": [''],
            "scoreState": [''],
            "userGroup": ['']
        });
        // this.accountInfoService.findUser().subscribe(
        //     user => {
        //         // this.accountInfo = user;
        //         // tslint:disable-next-line:no-unused-expression
        //         this.Resultsgunli && this.Resultsgunli.get("userGroup") && this.Resultsgunli.get("userGroup").setValue(user.managerGroup);
        //     }
        // )

        this.loadData();
    }
    loadData(page?: Pagination<any>, param?: any) {// table组件加载列表数据
        this.loading = true;
        this.paginations = page;
        //  console.log(page)
        let params = {
            ...param,
            page: page ? page.number : 0,
            size: page ? page.size : 10,
            // "trainingClass.id": this.tbcId,
            // sort: page && page.sort ? page.sort : null
        };
        // 信息列表初始读取
        this.trainingClassApiService.getScoreList(this.tbcId, params).subscribe(data => {
            // console.log(data);
            this.message = data.content;
            this.loading = false;
        },
            err => {
                this.loading = false;
            }
        )
    }
    // 表单提交
    submitForm = ($event, value) => {
        $event.preventDefault();
        // this.Inpvalue = value;
        this.loadData(null, value)
        // this.loadData();
        console.log(value)
    };

    // 高级查询方法
    resetForm($event: MouseEvent) {
        $event.preventDefault();
        this.Resultsgunli.reset();
        // tslint:disable-next-line:forin
        for (const key in this.Resultsgunli.controls) {
            this.Resultsgunli.controls[key].markAsPristine();
        }
    }
    _senior($event: MouseEvent) {
        $event.preventDefault();
    }
    // 模态框点击
    showModal = () => {
        this.isVisible = true;
    }

    handleOk = (e) => {
        console.log('点击了确定');
        this.isVisible = false;
    }

    handleCancel = (e) => {
        console.log(e);
        this.isVisible = false;
    }
}


