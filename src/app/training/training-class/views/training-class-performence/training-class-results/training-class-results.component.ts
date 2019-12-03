import { NzMessageService } from 'ng-zorro-antd';
import { Component, OnInit } from '@angular/core';
import { CuiPagination, Column } from 'console-ui-ng';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Pagination } from 'app/core';
import { TrainingClassApiService } from '../../../../service/training-class-api.service';
import { TrainingClass } from '../../../../entity/training-class';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AccountService } from 'app/account/service/account.service';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { tipMessage } from 'app/account/entity/message-tip';

@Component({
    selector: 'spk-training-class-results',
    templateUrl: './training-class-results.component.html',
    styleUrls: ['./training-class-results.component.scss']
})
export class TrainingClassResultsComponent implements OnInit {
    Resultsgunli: FormGroup;
    loading: boolean = false;
    spinning: boolean = false;
    // 表格数据
    message: any = {};
    trainingId: number;
    Inpvalue: any = {};
    step: number = 0;
    paginations: any;
    // _isComplexSearch: boolean = false;
    // _isComplexSearch1: boolean = false;
    // 下拉变量
    downData = [];
    Privalue: any = {};
    // 部门配置
    accountInfo: any = {};
    managerGroup: any = {};
    // 编辑模态框
    isVisible: boolean = false;
    // 成绩单假数据
    achievement: any = {};
    // 成绩单分页
    // reportpage: CuiPagination;
    // 编辑成绩单ID
    shmid: number = 0;
    trcid: number = 0;
    achievementLoading: boolean;
    // 用户信息
    usermessage: any = {};
    amisexist: boolean = false;
    trainingClass: TrainingClass;
    isArchived: boolean = false;
    isImprot: boolean = false;

    columns: Column[] = [
        { title: '用户名', data: 'user.username' },
        { title: '姓名', data: 'user.displayName' },
        { title: '所属组织', data: 'user.userGroup', tpl: "userGroupTpl" },
        { title: '成绩', data: 'score', tpl: 'score', styleClass: 'text-center' },
        { title: '状态', data: 'scoreState', tpl: 'state', styleClass: 'text-center' },
        { title: '操作', data: 'scoreId', tpl: 'scoreId', styleClass: 'text-center' }
    ];
    // 课程成绩明细
    courseScoreColumns: Column[] = [
        { title: '课程名称', data: 'courseName' },
        { title: '课程编号', data: 'code', styleClass: 'text-center' },
        { title: '课程类型', data: 'courseType', tpl: "courseType", styleClass: 'text-center' },
        { title: '完成状态', data: 'status', tpl: "state", styleClass: 'text-center' }

    ];
    tbcId: number = 0;
    selection: any[];
    selectionPer: any[];

    exportShow: boolean = false;

    constructor(private fb: FormBuilder,
        private trainingClassApiService: TrainingClassApiService,
        private layer: NzMessageService,
        private activatedRoute: ActivatedRoute,
        private accountInfoService: AccountService,
        private http: Http

    ) { }

    ngOnInit() {
        this.tbcId = this.activatedRoute.snapshot.params['tbcId'];
        this.activatedRoute.data.subscribe(
            res => {
                if (res.trainingClass && res.trainingClass.isArchived) {
                    this.isArchived = res.trainingClass.isArchived;
                    this.isImprot = res.trainingClass.isArchived;
                }
            }
        )

        this.getCountforImprotBut(this.tbcId);


        // 表单初始值设置
        this.Resultsgunli = this.fb.group({
            "user.username": [''],
            "scoreState": ['']
        });
        this.loadData(null, null, this.tbcId);
        this.find_amis_tbc(this.tbcId);
    }

    //导入按钮可用与否
    getCountforImprotBut(tbcId: any) {
        this.trainingClassApiService.getCountforImprotBut(tbcId).subscribe(
            ref => {
                if (ref > 0) {
                    this.isImprot = true;
                }
            }
        );
    }



    exportIsShow() {
        if (!this.message || this.message.length <= 0) {
            this.exportShow = true;
        }
    }

    refresh() {
        this.trainingClassApiService.refresh(this.tbcId).subscribe(
            ok => {
                tipMessage("正在努力为你计算成绩,稍后点击搜索查看结果...", 'info', 4000);
                this.loadData(null, null, this.tbcId);
            },
            err => {
                this.layer.error(err, { nzDuration: 4000 });
            }
        );
    }

    // 成绩管理一加载的成绩列表
    loadData(page?: Pagination<any>, params?: any, tbcId?: any) {// table组件加载列表数据
        this.loading = true;
        this.spinning = true;
        let searchParams = params || this.Resultsgunli.value;
        // 信息列表初始读取
        this.trainingClassApiService.getScoreList(tbcId || this.tbcId, params, page).subscribe(data => {
            // console.log(data);
            this.loading = false;
            this.spinning = false;
            this.paginations = data;
            this.exportIsShow();
        }, err => {
            this.loading = false;
            this.spinning = false;
        })
    }

    // 成绩单的分页
    loadDatamodel(trcid?: any, shmid?: any) {
        this.achievementLoading = true;
        this.trainingClassApiService.Pinformation(trcid, shmid).subscribe(success => {
            this.usermessage = success;
            this.trainingClassApiService.personaltranscript(trcid, shmid).subscribe(data => {
                this.achievement = data;
                this.isVisible = true;
                this.achievementLoading = false;
            });
        })
    }
    // 表单提交
    submitForm = ($event, value) => {
        $event.preventDefault();
        // this.Inpvalue = value;
        this.find_amis_tbc(this.tbcId);
        this.loadData(null, value, this.tbcId)
        // this.loadData();
        // console.log(this.tbcId)
    };

    downloadExcelFile() {
        let url;
        if (!window.location.origin) {
            url = window.location.protocol + "//" + window.location.hostname + (window.location.port ? ':' + window.location.port : '');
        } else {
            url = window.location.origin;
        }
        window.open(url + "/api/trainScores/download?classId=" + this.tbcId);
    }

    // // 高级查询方法
    // resetForm($event: MouseEvent) {
    //     $event.preventDefault();
    //     this.Resultsgunli.reset();
    //     // tslint:disable-next-line:forin
    //     for (const key in this.Resultsgunli.controls) {
    //         this.Resultsgunli.controls[key].markAsPristine();
    //     }
    // }
    // 成绩单模态框
    showModal = (id) => {
        this.shmid = id;
        // 班级id
        this.trcid = this.tbcId;
        // console.log(this.shmid, this.trcid)
        // this.isVisible = true;
        this.loadDatamodel(this.trcid, this.shmid)
    }
    // 隐藏模态框
    handleOk = (e) => {
        this.isVisible = false;
    }
    // 显示模态框
    handleCancel = (e) => {
        this.isVisible = false;
    }
    find_amis_tbc(tbcId) {
        // tslint:disable-next-line:max-line-length
        (this.http.get(`/api/training/base/getAmisIsExists/${tbcId}`).map(res => res.json()) as Observable<Response>).subscribe((data: any) => {
            // console.log(data, 444)
            if (data > 0) {
                this.amisexist = true;
            } else {
                this.amisexist = false;
            }
        });
    }
    tbc_score_send() {
        console.log("tbc_score_send");
        this.trainingClassApiService.sendAmisIsExists(this.tbcId).subscribe(
            ok => {
                this.layer.info("推送成功", { nzDuration: 4000 });
            },
            err => {
                this.layer.error(err, { nzDuration: 4000 });
            }
        );
    }
    tbc_score_sync() { }
}
