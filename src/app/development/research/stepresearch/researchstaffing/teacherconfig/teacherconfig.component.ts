import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd';
import { ResearchService } from '../../../service/research.service';
import { Pagination } from 'app/core/entity/pagination';
import {
    FormBuilder,
    FormGroup,
    Validators,
    FormControl
} from '@angular/forms';
import { tipMessage } from 'app/account/entity/message-tip';

@Component({
    selector: 'spk-teacherconfig',
    templateUrl: './teacherconfig.component.html',
    styleUrls: ['./teacherconfig.component.scss']
})
export class TeacherconfigComponent implements OnInit {
    spinning: boolean = true;
    testListData: any;
    teacherListData: any;
    selection: any[] = [];
    teacherselection: any[] = [];
    devStatus: any;
    phaseId: any;
    devId: any;
    isVisible: boolean = false; // 讲师列表modal
    teacherspinning: boolean = false;
    loadingstate: boolean = false;
    teacherNo: any; // 讲师编号
    name: any; // 讲师姓名
    teacherType: any = '';
    teacherTyeBig: any = '';
    nameBig: any;
    username: any;
    columns: any = [
        { title: '讲师编号', tpl: 'teacherNo', styleClass: 'text-left' },
        { title: '讲师工号', tpl: 'usernameCol', styleClass: 'text-left' },
        { title: '讲师姓名', tpl: 'name', styleClass: 'text-left' },
        // { title: '性别', tpl: 'sex', styleClass: 'text-center' },
        { title: '讲师类别', tpl: 'teacherType', styleClass: 'text-center' },
        { title: '所属机构', tpl: 'userGroup', styleClass: 'text-left' },
        { title: '联系方式', tpl: 'phone', styleClass: 'text-center' },
        { title: '开始时间', tpl: 'startDateCol', styleClass: 'text-center' },
        { title: '结束时间', tpl: 'endDateCol', styleClass: 'text-center' }
    ];
    teachercolums: any = [
        { title: '讲师编号', data: 'teacherNo', styleClass: 'text-center' },
        { title: '讲师姓名', tpl: 'name', styleClass: 'text-center' },
        { title: '讲师类型', tpl: 'teacherType', styleClass: 'text-center' },
        { title: '讲师级别', tpl: 'teacherLevel', styleClass: 'text-center' },
    ];
    loadTeacherData(page?: Pagination<any>) {
        this.teacherspinning = true;
        let params = {
            page: page ? page.number : 0,
            size: page ? page.size : 10,
            teacherNo: this.teacherNo ? this.teacherNo : '',
            name: this.name ? this.name : '',
            teacherType: this.teacherType ? this.teacherType : ''
        }
        this.service.addteacherList(this.phaseId, params).subscribe(
            res => {
                this.teacherListData = res;
                this.teacherspinning = false;
                this.teacherselection = [];
            },
            err => {
                this.teacherspinning = false;
                return tipMessage(err);
            }
        )
    }
    loadData(page?: Pagination<any>) {
        this.spinning = true;
        let params = {
            page: page ? page.number : 0,
            size: page ? page.size : 10,
            name: this.nameBig,
            username: this.username,
            teacherType: this.teacherTyeBig
            // knowledgeId: this.selectTreeId
        };
        this.service.getteacherList(this.phaseId, params).subscribe(
            res => {
                this.testListData = res;
                this.spinning = false;
                this.selection = [];
                // console.log(res, 44)
            },
            err => {
                this.spinning = false;
                return tipMessage(err);
            }
        )

    }
    constructor(
        private route: Router,
        private routeInfo: ActivatedRoute,
        private service: ResearchService,
        private confirmv: NzModalService,
        private fb: FormBuilder
    ) { }


    ngOnInit() {
        this.routeInfo.paramMap.subscribe(
            params => {
                this.phaseId = params.get('stepId');
                this.devId = params.get('id');
            }
        )
        this.routeInfo.queryParams.subscribe(
            params => {
                this.devStatus = params.status;
            }
        )
        this.loadData();

    }
    addstpteacher(event) {
        this.isVisible = true;

        this.loadTeacherData();

    }
    // 搜素老师列表
    searchTeacherData() {
        this.loadTeacherData();
    }
    // modal框的显示影藏
    handleCancel(event) {
        this.isVisible = false;
        this.name = undefined;
        this.teacherNo = undefined;
        this.teacherType = undefined;
    }
    handleOk(event) {
        if (this.teacherselection.length) {
            this.loadingstate = true;
            let ids = this.getIds(this.teacherselection);
            this.service.addteacher(this.phaseId, { teacherIds: ids }).subscribe(
                res => {
                    this.isVisible = false;
                    this.name = undefined;
                    this.teacherNo = undefined;
                    this.teacherType = undefined;
                    tipMessage('添加成功', 'success');
                    this.loadData();
                    this.loadingstate = false;
                },
                error => {
                    this.loadingstate = false;
                    return tipMessage('添加失败');
                }
            )
        } else {
            return tipMessage('请选择讲师！');
        }

    }
    // mutipledelete批量删除
    mutipledelete(event) {
        if (this.selection.length) {
            let ids = this.getIds(this.selection);
            this.confirmv.confirm({
                title: '删除',
                content: '确定要删除所选项？',
                showConfirmLoading: true,
                zIndex: 1003,
                onOk: () => {
                    this.service.deleteteachers(this.phaseId, ids).subscribe(
                        res => {
                            tipMessage('删除成功', 'success');
                            this.loadData();
                        },
                        err => {
                            return tipMessage('删除失败');
                        }
                    )
                },
                onCancel() { }
            })

        } else {
            return tipMessage('请选择要操作的项！');
        }
    }
    // 获取ids
    getIds(array: any[]) {
        let ids = [];
        array.map((item, index) => {
            ids.push(item.id)
        })
        return ids;
    }

    // 所属机构全路径处理
    namePath(str) {
        if (str) {
            return str.replace(/,/g, '/');
        }
    }

}
