import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { OfferingGroup } from 'app/training/entity/offering_group';
import { Router, ActivatedRoute } from '@angular/router';
import { TrainingClassGroupService } from 'app/training/service/training-class-group.service';
import { tipMessage } from 'app/account/entity/message-tip';

@Component({
    selector: 'spk-training-class-group',
    templateUrl: './training-class-group.component.html',
    styleUrls: ['./training-class-group.component.scss']
})
export class TrainingClassGroupComponent implements OnInit {

    groups: OfferingGroup[];
    selected: OfferingGroup;
    trainingId: number;

    _form: FormGroup;
    loading: boolean = false;
    groupId: number;

    constructor(
        private route: ActivatedRoute,
        private fb: FormBuilder,
        private groupApi: TrainingClassGroupService,
    ) { }

    ngOnInit() {
        this.route.data.subscribe(
            (obj: { trainingClass: any }) => {
                this.trainingId = obj.trainingClass.id;
            }
        );
        this.loadGroups();
    }

    loadGroups() {
        this.groupApi.getAllGroup(this.trainingId).subscribe(
            groups => {
                this.groups = groups;
                this.groups.sort((a, b) => a.displayOrder - b.displayOrder);
                this.afterLoadGroups();
            }
        );
    }

    afterLoadGroups() {
        if (this.selected) {
            this.selected = this.groups.find(it => it.id == this.selected.id);
        }

        this.initForm();
    }

    initForm() {
        let m = this.selected || new OfferingGroup();
        this._form = this.fb.group({
            id: [m.id],
            name: [m.name, Validators.required],
            code: [m.code, Validators.required],
            displayOrder: [m.displayOrder]
        });
    }

    getFormControl(name) {
        return this._form.controls[name];
    }

    markAsDirty() {
        for (let key of Object.keys(this._form.controls)) {
            this._form.controls[key].markAsDirty();
        }
    }

    save() {
        this.markAsDirty();
        this.loading = true;
        if (this._form.invalid) {
            tipMessage('表单信息有误，请根据提示修改后重试', 'warning', 4000);
            return;
        }

        let value = this._form.value;
        let operate = value.id ? 'updateGroup' : 'createGroup';

        if (this.groupApi[operate]) {
            this.groupApi[operate](value, this.trainingId).subscribe(
                ok => {
                    this.loading = false;
                    tipMessage('保存成功', 'success');
                    this.loadGroups();
                },
                err => {
                    this.loading = false;
                    tipMessage('保存失败');
                }
            );
        }
    }

    add() {
        this.selected = null;
        this.initForm();
    }

    delete(id) {
        if (!id) {
            return;
        }
        this.groupApi.deleteGroup(id).subscribe(
            ok => {
                tipMessage('删除成功', 'success');
                this.loadGroups();
            },
            err => {
                tipMessage('删除失败');
            }
        );
    }

    onSelect(group) {
        this.selected = group;
        this.initForm();
    }

}
