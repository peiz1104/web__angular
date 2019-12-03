import { Component, OnInit } from '@angular/core';
import { PersonnelClassification } from './../../entity/personnel-classification';
import { CuiLayer, Column } from 'console-ui-ng';
import { Pagination } from './../../../../core/entity/pagination';
import { PersonnelClassificationService } from './../../service/personnel-classification.service';
import { ActivatedRoute, Router } from '@angular/router';

import {
    FormBuilder,
    FormGroup,
    Validators
} from '@angular/forms';
import { tipMessage } from 'app/account/entity/message-tip';

@Component({
    selector: 'spk-personnel-classification-list',
    templateUrl: './personnel-classification-list.component.html',
    styleUrls: ['./personnel-classification-list.component.scss']

})

export class PersonnelClassificationListComponent implements OnInit {
    searchBy: {
        name?: string
    } = {};
    personnelClassifications: Pagination<PersonnelClassification>;
    selection: PersonnelClassification[];
    columns = [
        { title: '名称', tpl: 'colname', styleClass: 'text-left' },
        { title: '创建日期', tpl: 'colcreateddate', styleClass: 'text-center' },
        { title: '创建人', tpl: 'colcreatedbydisplayname', styleClass: 'text-left' },
        { title: '操作', styleClass: 'text-center', tpl: 'rowAction' }
    ];
    inputValue: string;
    validateForm: FormGroup;
    loading: boolean = true;

    _submitForm = ($event, value) => {
        $event.preventDefault();
        this.searchBy = value;
        this.loadData();
    };


    constructor(
        private personnelClassificationService: PersonnelClassificationService,
        private layer: CuiLayer,
        private fb: FormBuilder,
        private routes: Router
    ) {
    }

    ngOnInit() {
        this.validateForm = this.fb.group({
            name: ['', []]
        });
        this.searchBy.name = '';
        this.loadData();
    }

    handlePersonnel = () => {
        this.routes.navigate(['/planning/personnelclassification']);
    }
    handleTrainingClass = () => {
        this.routes.navigate(['/planning/trainingclassification']);
    }
    handleTrainingLevel = () => {
        this.routes.navigate(['/planning/traininglevel']);
    }

    loadData(page?: Pagination<any>) {
        this.loading = true;
        this.personnelClassificationService.getAllOfPage(this.getSearchParams(), page).subscribe(
            personnelClassifications => {
                this.personnelClassifications = personnelClassifications;
                this.loading = false;
            }
        );
    }

    getSearchParams() {
        if (this.searchBy) {
            let params = {};
            params['name'] = this.searchBy.name;
            return params;
        }
        return null;
    }

    delete(personnelClassification?: PersonnelClassification) {
        this.batchOperate('delete', '删除', personnelClassification, false);
    }

    private batchOperate(action: string, actionName: string, personnelClassification?: PersonnelClassification, keepFilter?: boolean) {
        let selected = personnelClassification ? [personnelClassification] : this.selection;
        if (!selected || selected.length == 0) {
            tipMessage(`请选择要${actionName}的人员分类`, 'warning');
            return;
        }
        this.layer.confirm(`确定要${actionName}选择的人员分类吗？`, () => {
            this.personnelClassificationService[action](selected.map(it => it.id)).subscribe(
                ok => {
                    tipMessage(`${actionName}成功`, 'success');
                    this.loadData();
                },
                err => tipMessage(`${actionName}失败`)
            );
        });
    }

}



