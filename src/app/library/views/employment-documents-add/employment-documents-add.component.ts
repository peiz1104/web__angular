import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Documentlib } from "app/library/entity/documentlib";
import { DocumentInfo } from './../../entity/document-info';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { NgForm, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { TeacherService } from '../../service/teacher.service';
import { tipMessage } from 'app/account/entity/message-tip';

@Component({
    selector: 'spk-employment-documents-add',
    templateUrl: './employment-documents-add.component.html',
    styleUrls: ['./employment-documents-add.component.scss']
})
export class EmploymentDocumentsAddComponent implements OnInit {
    document: any = {};
    _form: FormGroup;
    id: any;
    spinning: boolean = false;
    submitstate: boolean = false;
    docName: any;
    constructor(
        private route: Router,
        private routeInfo: ActivatedRoute,
        private message: NzMessageService,
        private confirmServ: NzModalService,
        private fb: FormBuilder,
        private teacherservice: TeacherService
    ) { }
    // 初始化表单
    initForm() {
        this._form = this.fb.group({
            docName: ['', [Validators.required]], // 名称
            'teacherIds': ['', [Validators.required]],
            summary: [''], // 描述
        })
    }
    ngOnInit() {
        this.initForm();
        this.routeInfo.queryParams.subscribe((params) => {
            this.id = params.id;
        })
        if (this.id) {
            this.spinning = true;
            this.teacherservice.geteditdetail(this.id).subscribe(
                res => {
                    // console.log(res, 23);
                    this.spinning = false;
                    this._form = this.fb.group({
                        docName: [res.docName, [Validators.required]], // 名称
                        'teacherIds': [res['teacher'], [Validators.required]],
                        summary: [res.summary], // 描述
                    })
                    this.document.documentInfo = res.documentInfo;
                    this.docName = res.docName
                },
                err => {
                    this.spinning = false;
                    return tipMessage(err);
                }
            )
        }

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

            if (this.docName && this.docName.replace(/^\s*|\s*$/g, '')) {
                // this.docName = this.document.name
                this._form.get("docName").setValue(this.docName)
            } else {
                this.docName = this.document.name
                this._form.get("docName").setValue(this.document.name)
            }
        }
    }
    // 提交表单
    _save(event, value) {
        // console.log(value);
        if (this._form.invalid) {
            return tipMessage('请按要求填写完整！');
        }
        if (!this.document.documentInfo) {
            return tipMessage('请上传文件！');
        }
        const ids = this.getids(value['teacherIds']);

        let paramsobj = {
            ...value,
            'teacherIds': ids,
            documentInfo: this.document.documentInfo
        }
        let params = {
            ...value,
            'teacherIds': ids,
        }
        if (this.id !== undefined) {
            paramsobj.id = this.id;
        }
        this.submitstate = true;

        if (this.id !== undefined) {// 编辑保存
            this.teacherservice.updatedocumentput(params, this.id).subscribe(
                res => {
                    tipMessage('保存成功！', 'success');
                    this.route.navigate([`/library/teacher/employment/documents`]);
                    this.submitstate = false;
                },
                err => {
                    this.submitstate = false;
                    return tipMessage(err);
                }
            )
        } else { // 新建保存
            this.teacherservice.adddocumentput(paramsobj).subscribe(
                res => {
                    tipMessage('保存成功！', 'success');
                    this.route.navigate([`/library/teacher/employment/documents`]);
                    this.submitstate = false;
                },
                err => {
                    this.submitstate = false;
                    return tipMessage(err);
                }
            )
        }

    }
    getids(array: any[]) {
        let ids = [];
        array.map((item, index) => {
            ids.push(item.id);
        })
        return ids;
    }
    remove(value) {
        // console.log(value, 2344);
        if (value.v.length) {
            let m = value.v.filter((item, index) => {
                return item.id !== value.u.id;
            })
            // console.log(m)
            this._form.get("teacherIds").setValue(m)
        }
    }
    // 返回
    goBack() {
        window.history.back()
    }
}
