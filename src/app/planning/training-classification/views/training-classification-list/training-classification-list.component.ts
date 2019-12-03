import { Component, OnInit } from '@angular/core';
import { CuiLayer, Column } from 'console-ui-ng';
import { Pagination } from './../../../../core/entity/pagination';
import { TrainingClassification } from './../../entity/training-classification'
import { TrainingClassificationService } from './../../service/training-classification.service';
import { PersonnelClassification } from './../../../personnel-classification/entity/personnel-classification';
import { ActivatedRoute, Router } from '@angular/router';
import {
    FormBuilder,
    FormGroup,
    Validators
} from '@angular/forms';
import { tipMessage } from 'app/account/entity/message-tip';


@Component({
    selector: 'spk-training-classification-list',
    templateUrl: './training-classification-list.component.html',
    styleUrls: ['./training-classification-list.component.scss']

})

export class TrainingClassificationListComponent implements OnInit {
    searchBy: {
        name?: string,
        personnelClassification?: PersonnelClassification
    } = {};
    trainingClassifications: Pagination<TrainingClassification>;
    selection: TrainingClassification[];
    personnelClassifications: PersonnelClassification[];
    columns = [
        { title: '名称', tpl: 'colname', styleClass: 'text-left' },
        { title: '人员分类', tpl: 'colpersonnelclassification', styleClass: 'text-left' },
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
        private trainingClassificationService: TrainingClassificationService,
        private layer: CuiLayer,
        private fb: FormBuilder,
        private routes: Router) {
    }

    ngOnInit() {
        this.validateForm = this.fb.group({
            name: ['', []],
            personnelClassification: [null]
        });
        this.searchBy.name = '';
        this.searchBy.personnelClassification = null;
        this.loadData();
        this.trainingClassificationService.getAllPersonnelClassification().subscribe(
            personnelClassifications => this.personnelClassifications = personnelClassifications
        )
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
        this.trainingClassificationService.getAllOfPage(this.getSearchParams(), page).subscribe(
            trainingClassifications => {
                this.trainingClassifications = trainingClassifications;
                this.loading = false;
            }
        );
    }

    getSearchParams() {
        if (this.searchBy) {
            let params = {};
            params['name'] = this.searchBy.name;
            if (this.searchBy.personnelClassification) {
                params['personnelClassificationId'] = this.searchBy.personnelClassification.id;
            }
            return params;
        }
        return null;
    }

    delete(trainingClassification?: TrainingClassification) {
        this.batchOperate('delete', '删除', trainingClassification, false);
    }

    private batchOperate(action: string, actionName: string, trainingClassification?: TrainingClassification, keepFilter?: boolean) {
        let selected = trainingClassification ? [trainingClassification] : this.selection;
        if (!selected || selected.length == 0) {
            tipMessage(`请选择要${actionName}的培训分类`);
            return;
        }
        this.layer.confirm(`确定要${actionName}选择的培训分类吗？`, () => {
            this.trainingClassificationService[action](selected.map(it => it.id)).subscribe(
                ok => {
                    tipMessage(`${actionName}成功`, 'success');
                    this.loadData();
                },
                err => tipMessage(`${actionName}失败`)
            );
        });
    }

}



