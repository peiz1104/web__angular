import { NzMessageService } from 'ng-zorro-antd';
import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { OfferingGroupService } from '../../service/offering-group-api.service';
import { OfferingGroup } from 'app/training/entity/offering_group';
import { tipMessage } from 'app/account/entity/message-tip';

@Component({
  selector: 'spk-offering-course-group',
  templateUrl: './offering-course-group.component.html',
  styleUrls: ['./offering-course-group.component.scss']
})
export class OfferingCourseGroupComponent implements OnInit {

  @Input() offeringId: number;

  groups: OfferingGroup[];
  selected: OfferingGroup;
  // trainingId: number;

  _form: FormGroup;
  loading: boolean = false;
  groupId: number;
  isCodeExist: boolean = true;
  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private groupApi: OfferingGroupService,
    private message: NzMessageService) { }

  ngOnInit() {
    this.loadGroups();
  }

  loadGroups() {
    this.groupApi.getAllGroup(this.offeringId).subscribe(
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
      code: [m.code, [Validators.required], [this.codeExist]],
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
      tipMessage('表单信息有误，请根据提示修改后重试', 'warning');
      return;
    }

    let value = this._form.value;
    let operate = value.id ? 'updateGroup' : 'createGroup';

    if (this.groupApi[operate]) {
      this.groupApi[operate](value, this.offeringId).subscribe(
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
  codeExist = (control: FormControl): any  => {
      this.isCodeExist = true;
      return  this.groupApi.checkCodeIsUnique(this.offeringId, {code: control.value}).map(
        count => {
          if (count > 0) {
            this.isCodeExist = true;
            return {notUnique: true, error: true };
          }else {
            this.isCodeExist = false;
            return null;
          }
        },
        err => {
          this.isCodeExist = true;
          return {checkError: true, error: true };
        }
      )
  }
}
