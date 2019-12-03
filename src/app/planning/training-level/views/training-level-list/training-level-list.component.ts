import { Component, OnInit } from '@angular/core';
import { CuiLayer, Column } from 'console-ui-ng';
import { Pagination } from './../../../../core/entity/pagination';
import { TrainingLevel } from './../../entity/training-level'
import { TrainingLevelService } from './../../service/training-level.service';
import { TrainingClassification } from './../../../training-classification/entity/training-classification';
import { ActivatedRoute, Router } from '@angular/router';
import {
    FormBuilder,
    FormGroup,
    Validators
} from '@angular/forms';
import { tipMessage } from 'app/account/entity/message-tip';

@Component({
    selector: 'spk-training-level-list',
    templateUrl: './training-level-list.component.html',
    styleUrls: ['./training-level-list.component.scss']

})

export class TrainingLevelListComponent implements OnInit {
    searchBy: {
        name?: string,
        trainingClassification?: TrainingClassification
    } = {};
    trainingLevels: Pagination<TrainingLevel>;
    selection: TrainingLevel[];
    trainingClassifications: TrainingClassification[];
    columns = [
        { title: '名称', tpl: 'colname', styleClass: 'text-left' },
        { title: '培训分类', tpl: 'coltrainingclassification', styleClass: 'text-left' },
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
        private trainingLevelService: TrainingLevelService,
        private layer: CuiLayer,
        private fb: FormBuilder,
        private routes: Router
    ) {
    }

    ngOnInit() {
        this.validateForm = this.fb.group({
            name: ['', []],
            trainingClassification: [null]
        });
        this.searchBy.name = '';
        this.searchBy.trainingClassification = null;
        this.loadData();
        this.trainingLevelService.getAllTrainingClassification().subscribe(
            trainingClassifications => this.trainingClassifications = trainingClassifications
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
        this.trainingLevelService.getAllOfPage(this.getSearchParams(), page).subscribe(
            trainingLevels => {
                this.trainingLevels = trainingLevels;
                this.loading = false;
            }
        );
    }

    getSearchParams() {
        if (this.searchBy) {
            let params = {};
            params['name'] = this.searchBy.name;
            if (this.searchBy.trainingClassification) {
                params['trainingClassificationId'] = this.searchBy.trainingClassification.id;
            }
            return params;
        }
        return null;
    }

    delete(trainingLevel?: TrainingLevel) {
        this.batchOperate('delete', '删除', trainingLevel, false);
    }

    private batchOperate(action: string, actionName: string, trainingLevel?: TrainingLevel, keepFilter?: boolean) {
        let selected = trainingLevel ? [trainingLevel] : this.selection;
        if (!selected || selected.length == 0) {
            tipMessage(`请选择要${actionName}的培训级别`, 'warning', 5000);
            return;
        }
        this.layer.confirm(`确定要${actionName}选择的培训级别吗？`, () => {
            this.trainingLevelService[action](selected.map(it => it.id)).subscribe(
                ok => {
                    tipMessage(`${actionName}成功`, 'success');
                    this.loadData();
                },
                err => tipMessage(`${actionName}失败`)
            );
        });
    }

}



