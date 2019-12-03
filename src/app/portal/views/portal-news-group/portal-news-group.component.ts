
import { NzMessageService } from 'ng-zorro-antd';
import { NewsGroupApiService } from './../../service/news-group-api.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NewsGroup } from './../../entity/news-group';
import { Component, OnInit } from '@angular/core';
import { tipMessage } from 'app/account/entity/message-tip';

@Component({
  selector: 'spk-portal-news-group',
  templateUrl: './portal-news-group.component.html',
  styleUrls: ['./portal-news-group.component.scss']
})
export class PortalNewsGroupComponent implements OnInit {

  groups: NewsGroup[];
  selected: NewsGroup;

  _form: FormGroup;
  loading: boolean = false;
  groupId: number;

  constructor(private fb: FormBuilder, private groupApi: NewsGroupApiService,
    private message: NzMessageService) { }

  ngOnInit() {
    this.loadGroups();
  }

  loadGroups() {
    this.groupApi.getAll().subscribe(
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
    let m = this.selected || new NewsGroup();
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
      tipMessage('表单信息有误，请根据提示修改后重试', 'warning');
      return;
    }

    let value = this._form.value;
    let operate = value.id ? 'update' : 'create';

    if (this.groupApi[operate]) {
      this.groupApi[operate](value).subscribe(
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

    let ids = [id];
    this.groupApi.delete(ids).subscribe(
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
