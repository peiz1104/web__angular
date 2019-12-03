import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd';
import { ResearchService } from '../../service/research.service';
import { Pagination } from 'app/core/entity/pagination';
import { DocumentInfo } from '../../entity/document-info';
import {
    FormBuilder,
    FormGroup,
    Validators,
    FormControl
} from '@angular/forms';
import { tipMessage } from 'app/account/entity/message-tip';
@Component({
    selector: 'spk-researchachievements',
    templateUrl: './researchachievements.component.html',
    styleUrls: ['./researchachievements.component.scss']
})
export class ResearchachievementsComponent implements OnInit {
    _form: FormGroup;
    document: any = {};
    devStatus: any;
    phaseId: any;
    devId: any;
    spinning: boolean = false;
    testListData: any;
    name: any;
    selection: any[] = [];
    isVisible: boolean = false;
    btnstate: boolean = false;
    editId: any; // 编辑时的id
    editspinning: boolean = false;
    showdetailData: any = {};
    showModalisVisible: boolean = false;
    modalspinning: boolean = false;
    initFormData: any = {
        name: ['', [Validators.required]],
        remark: [''],
        fileName: ['']
    };
    columns = [
        { title: '成果名称', tpl: 'name', styleClass: 'text-left' },
        { title: '附件名称', tpl: 'fileName', styleClass: 'text-left over-flow' },
        { title: '成果描述', tpl: 'remark', styleClass: 'text-left big-width' },
        { title: '创建时间', tpl: 'createDate', styleClass: 'text-center' },
        { title: '创建人', tpl: 'createBy', styleClass: 'text-left' },
        { title: '操作', tpl: 'actions', styleClass: 'text-center' }
    ];
    // 加载数据
    loadData(page?: Pagination<any>) {
        this.spinning = true;
        let params = {
            page: page ? page.number : 0,
            size: page ? page.size : 10,
            type: 'RESULT',
            name: this.name ? this.name : ''
        };
        this.service.getresearchachiList(this.phaseId, params).subscribe(
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
    // 搜索列表
    searchData() {
        this.loadData();
    }
    // 添加
    addstpachieve(event) {
        this.isVisible = true;
        this._form = this.fb.group(this.initFormData);
    }
    // 编辑
    editCourse(value) {
        this.isVisible = true;
        this.editId = value.id;
        this.editspinning = true;
        this._form = this.fb.group(this.initFormData);
        this.service.showachieve(this.phaseId, this.editId).subscribe(
            res => {
                // console.log(res, 'bianji')
                this.document.documentInfo = res.documentInfo;
                this._form.get('name').setValue(res.name);
                this._form.get('remark').setValue(res.remark);
                this._form.get('fileName').setValue(res.fileName);
                this.editspinning = false;
            },
            error => {
                this.editspinning = false;
                return tipMessage(error);
            }
        )
    }
    // 弹窗的显示影藏
    handleCancel(event) {
        this.isVisible = false;
        this.document = {};
        this.editId = undefined;
    }
    // 上传文件
    initDocument(file) {
        if (file) {
            // console.log(file);
            // console.log(file["fullPath"]);
            // console.log(this.document);
            if (!this.document.documentInfo) {
                this.document.documentInfo = new DocumentInfo();

            }
            this.document.documentInfo.fileSize = file["fileSize"];
            this.document.documentInfo.format = file["extention"].replace(".", "");
            this.document.name = file["originFileName"];
            this.document.documentInfo.originFileName = file["originFileName"];
            this.document.documentInfo.relativePath = file["relativePath"];
            this.document.documentInfo.fileName = file["fileName"];
            this.document.documentInfo.parentDirectoryPath = file["parentDirectoryPath"];
            this.document.documentInfo.fullPath = file["fullPath"];
            this._form.get("fileName").setValue(this.document.name)
        }
    }
    // 保存
    _saveformmessage(event, value) {
        if (this._form.invalid) {
            return tipMessage('请填写成果名');
        }
        this.btnstate = false;
        let obj = {
            ...value,
            documentInfo: this.document.documentInfo,
            type: 'RESULT'
        }
        this.btnstate = true;
        // console.log(obj);
        if (this.editId) {
            this.service.saveachieve(this.phaseId, this.editId, obj).subscribe(
                res => {
                    tipMessage('编辑成功！', 'success');
                    this.btnstate = false;
                    this.isVisible = false;
                    this.document = {};
                    this.editId = false;
                    this.loadData();
                },
                err => {
                    this.btnstate = false;
                    return tipMessage(err);
                }
            )
        } else {
            this.service.addachieve(this.phaseId, obj).subscribe(
                res => {
                    tipMessage('保存成功！', 'success');
                    this.btnstate = false;
                    this.isVisible = false;
                    this.document = {};
                    this.loadData();
                },
                err => {
                    this.btnstate = false;
                    return tipMessage(err);
                }
            )
        }

    }
    // 查看详细
    showdetailModal(value) {

        this.showModalisVisible = true;
        this.modalspinning = true;
        this.service.showachieve(this.phaseId, value.id).subscribe(
            res => {
                // console.log(res, 'bianji')
                this.modalspinning = false;

                this.showdetailData = res;
            },
            error => {

                this.modalspinning = false;
                return tipMessage(error);
            }
        )
    }
    // modal的显示隐藏
    handleCancelModal(event) {
        this.showModalisVisible = false;
        this.showdetailData = {};
    }
    handleOkModal(event) {
        this.showdetailData = {};
        this.showModalisVisible = false;
    }
    // 下载
    downLoad(value) {
        let url;
        if (!window.location.origin) {
            url = window.location.protocol + "//" + window.location.hostname + (window.location.port ? ':' + window.location.port : '');
        } else {
            url = window.location.origin;
        }
        window.open(`${url}/api/phase/${this.phaseId}/assess/result/download/${value.id}`)
    }
    // 批量删除
    mutipledelete(event) {
        if (this.selection.length) {
            let ids = this.getIds(this.selection);
            this.confirmv.confirm({
                title: '删除',
                content: '确定要删除所选项？',
                showConfirmLoading: true,
                zIndex: 1003,
                onOk: () => {
                    this.service.deleteachieve(this.phaseId, ids).subscribe(
                        res => {
                            tipMessage('删除成功！', 'success');
                            this.loadData();
                        },
                        err => {
                            return tipMessage('删除失败！');
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
        array.map((item) => {
            ids.push(item.id)
        })
        return ids;
    }

}
