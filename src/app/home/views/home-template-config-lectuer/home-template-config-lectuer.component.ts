import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { HomeTemplateApiService } from '../../services/home-template-api.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {
    FormBuilder,
    FormGroup,
    Validators,
    FormControl
} from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { style } from '@angular/animations';
import { tipMessage } from 'app/account/entity/message-tip';

@Component({
    selector: 'spk-config-lectuer',
    templateUrl: './home-template-config-lectuer.component.html',
    styleUrls: ['./home-template-config-lectuer.component.scss']
})
export class HomeTemplateConfigLectuerComponent implements OnInit, OnChanges {

    @Input() id?: number;
    @Output() back = new EventEmitter<any>();
    @Output() refresh = new EventEmitter<any>();
    columns;
    isVisible = false;
    isConfirmLoading = false;
    loading = true;
    moduleInfo?: any;
    lectuerInfo: any = [];
    templateId: number; // 模板id
    validateForm: FormGroup;
    selection: any;
    saveLoading: boolean = false;

    searchtext: string;

    teacherData?: any; // 讲师列表
    selected: number;
    constructor(
        private fb: FormBuilder,
        private templateService: HomeTemplateApiService,
        private route: ActivatedRoute,
    ) {
        this.columns = [
            { title: '名称', data: 'name' },
            { title: '描述', data: 'description', tpl: 'descriptionTpl', style: { 'width': '300px' } },
            { title: '专业', data: 'major' },
            { title: '毕业学校', data: 'schoolName' }
        ];
    }

    ngOnInit() {
    }
    ngOnChanges() {
        this.route.params.subscribe(
            (params: Params) => {
                this.templateId = params['id'] as number;
            }
        );
        this.templateService.configInfoAll.forEach(e => {
            if (e.id == this.id) {
                this.moduleInfo = { ...e };
                this.lectuerInfo = e.itemInfo ? [...e.itemInfo] : [];
            }
        });
        this.initForm();
    }
    initForm() {
        let m = this.moduleInfo || {};
        this.validateForm = this.fb.group({
            id: [m && m.id],
            moduleType: [m && m.moduleType || 'TEACHER'],
            layout: { id: this.templateId },
            displayOrder: m && m.displayOrder,
            name: [m && m.name, [Validators.required], this.trimAsyncValidator],
            moreArticle: [m && m.moreArticle || false, [Validators.required]],
            layoutModuleObject: [m && m.layoutModuleObject],
        });
    }
    getFormControl(name) {
        return this.validateForm.controls[name];
    }
    trimAsyncValidator = (control: FormControl): any => {
        return Observable.create(function (observer) {
            if (control.value.trim() == '') {
                observer.next({ required: true });
            } else {
                observer.next(null);
            }
            observer.complete();
        });
    };

    // 加载讲师列表
    loadData() {
        let params = {
            page: this.teacherData ? this.teacherData.number : 0,
            size: this.teacherData ? this.teacherData.size : '10',
            name: this.searchtext
        };
        let arrId = [];
        this.lectuerInfo.forEach(e => {
            if (e.id) {
                arrId.push(e.id)
            }
        });
        this.templateService.getTeacherLIst(this.id || 1, arrId, params).subscribe(
            pag => {
                this.loading = false;
                this.teacherData = pag;
            }
        );
    }
    onSelect(selId: number) {
        this.selected = selId;
    }

    // 选择讲师
    selectTeacher() {
        this.loadData();
        this.teacherData = {};
        this.isVisible = true;
    };
    // 删除讲师
    deleteTeacher(index) {
        this.lectuerInfo.splice(index, 1);
    }
    // 讲师确定
    handleOk(e) {
        if (this.selected) {
            this.isVisible = false;
            this.selection.forEach(item => {
                item = {
                    ...item,
                    imgUrl: item.user && item.user.avatar
                }
                this.lectuerInfo.push(item);
            });
        } else {
            tipMessage('请至少选择一项');
        }
    };
    // 点击取消
    handleCancel(e) {
        this.isVisible = false;
    };
    // 保存
    save() {
        // tslint:disable-next-line:forin
        for (const i in this.validateForm.controls) {
            this.validateForm.controls[i].markAsDirty();
        }
        if (this.validateForm.invalid) {
            return;
        }
        let arr = [];
        this.lectuerInfo.forEach(item => {
            arr.push({ id: item.id })
        });
        this.validateForm.controls['layoutModuleObject'].setValue(arr);
        this.saveLoading = true;
        let param = this.validateForm.value;
        this.templateService.saveLectuer(param).subscribe(
            obj => {
                tipMessage('保存成功', 'success');
                this.saveLoading = false;
                this.refresh.emit(obj);
            },
            err => {
                tipMessage(err);
                this.saveLoading = false;
            }
        );
    }
    onBack() {
        this.back.emit()
    }

    rankFn(rank) {
        if (rank == 'I') {
            return '预备讲师'
        } else if (rank == 'II') {
            return '助理讲师'
        } else if (rank == 'III') {
            return '中级讲师'
        } else if (rank == 'IV') {
            return '高级讲师'
        } else {
            return '暂无'
        }
    }

}
