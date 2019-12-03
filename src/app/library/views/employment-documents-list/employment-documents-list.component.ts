import { Component, OnInit } from '@angular/core';
import { EmploymentDocuments } from "app/library/entity/employment-documents";
import { DocumentInfo } from 'app/library/entity/document-info';
import { Pagination } from "app/core";
import { NzMessageService } from 'ng-zorro-antd';
import { Column, CuiLayer } from 'console-ui-ng';
import { Router, ActivatedRoute } from '@angular/router';
import { EmploymentDocumentsService } from "app/library/service/employment-documents.service";

@Component({
    selector: 'spk-employment-documents-list',
    templateUrl: './employment-documents-list.component.html',
    styleUrls: ['./employment-documents-list.component.scss']
})
export class EmploymentDocumentsListComponent implements OnInit {
    document: EmploymentDocuments = new EmploymentDocuments();
    documentInfo: DocumentInfo = new DocumentInfo();
    documents: Pagination<EmploymentDocuments>;
    checkDocuments: EmploymentDocuments[];
    columns: Column[];
    loading: boolean = true;
    size: number = 10;
    isLook: boolean = false;
    lookTeacherIds: any[];
    selected: number[];

    constructor(
        private documentService: EmploymentDocumentsService,
        private message: NzMessageService,
        private layer: CuiLayer,
        private route: Router,
        private routeInfo: ActivatedRoute
    ) { }

    ngOnInit() {
        this.columns = [
            { title: '文档名称', tpl: 'nameCol' },
            { title: '转码状态', tpl: 'convertStatusCol', styleClass: 'text-center' },
            { title: '查看讲师', tpl: 'look', styleClass: 'text-center' },
            { title: '操作', tpl: 'actions', styleClass: 'text-center' }
        ]

        this.searchDocument();
    }


    searchDocument(page?) {
        this.loading = true;
        // tslint:disable-next-line:no-unused-expression
        page ? page : { "size": this.size, "number": 0 };
        this.documentService.getAllOfPage(this.getSearchParams(), page).subscribe(
            it => {
                this.documents = it;
                this.loading = false;
                this.checkDocuments = [];
            }
        );
    }




    getSearchParams() {
        if (this.document) {
            let params = {};
            params['docName'] = this.document.docName;
            if (this.documentInfo.transcodeStatus && 'null' != this.documentInfo.transcodeStatus) {
                params['documentInfo.transcodeStatus'] = this.documentInfo.transcodeStatus;
            }
            return params;
        }
        return null;
    }


    lookTeacher(row) {
        let teacherId = [];
        const teacherIds = row.teacher;
        for (let i = 0; i < teacherIds.length; i++) {
            teacherId.push(teacherIds[i].id);
        }
        this.lookTeacherIds = teacherId;
        this.isLook = true;
    }

    cancelTeacher(e) {
        this.isLook = false;
    }
    // 添加任聘公文
    adddocument() {
        this.route.navigate([`/library/teacher/add`])
    }
    // 编辑
    edit(id) {
        this.route.navigate([`/library/teacher/add`], { queryParams: { id: id } })
    }



    onSelect(selIds: any[]) {
        this.selected = selIds;
    }
    delete(id?) {
        let ids = id ? [id] : this.selected;
        this.layer.confirm('确认要删除吗？',
            () => {
                this.documentService.delete(ids).subscribe(
                    () => {
                        this.layer.msg('删除成功');
                        this.searchDocument();
                    },
                    err => { this.layer.confirm(err) }
                );
            }
        );
    }

}
