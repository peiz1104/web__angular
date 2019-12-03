import { Component, OnInit } from '@angular/core';
import { TrainingSchool } from './../../entity/trainingschool'
import { CuiLayer, Column } from 'console-ui-ng';
import { Pagination } from './../../../../core/entity/pagination';
import { TrainingSchoolService } from './../../service/trainingschool.service';
import { tipMessage } from 'app/account/entity/message-tip';


import {
    FormBuilder,
    FormGroup,
    Validators
} from '@angular/forms';


@Component({
    selector: 'spk-trainingschool-list',
    templateUrl: './trainingschool-list.component.html',
    styleUrls: ['./trainingschool-list.component.scss']

})

export class TrainingSchoolListComponent implements OnInit {
    searchBy: {
        name?: string
    } = {};
    trainingSchools: Pagination<TrainingSchool>;
    selection: TrainingSchool[];
    columns = [
        { title: '研修院名称', tpl: 'colname' },
        { title: '所属机构', tpl: 'colusergroupname' },
        { title: '创建日期', tpl: 'colcreateddate', styleClass: 'text-center ' },
        { title: '辖内机构', tpl: 'colorganization', styleClass: 'text-center ' },
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


    constructor(private trainingSchoolService: TrainingSchoolService,
        private layer: CuiLayer, private fb: FormBuilder) {
    }

    ngOnInit() {
        this.validateForm = this.fb.group({
            name: ['', []]
        });
        this.searchBy.name = '';
        this.loadData();
    }

    loadData(page?: Pagination<any>) {
        this.loading = true;
        this.trainingSchoolService.getAllOfPage(this.getSearchParams(), page).subscribe(
            trainingSchools => {
                this.trainingSchools = trainingSchools;
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

    delete(trainingSchool?: TrainingSchool) {
        this.batchOperate('delete', '删除', trainingSchool, false);
    }

    private batchOperate(action: string, actionName: string, trainingSchool?: TrainingSchool, keepFilter?: boolean) {
        let selected = trainingSchool ? [trainingSchool] : this.selection;
        if (!selected || selected.length == 0) {
            tipMessage(`请选择要${actionName}的研修院`, 'warning', 4000);
            return;
        }
        this.layer.confirm(`确定要${actionName}选择的研修院吗？`, () => {
            this.trainingSchoolService[action](selected.map(it => it.id)).subscribe(
                ok => {
                    tipMessage(`${actionName}成功`, 'success');
                    this.loadData();
                },
                err => tipMessage(`${actionName}失败`)
            );
        });
    }

}



