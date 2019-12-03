import { NzMessageService } from 'ng-zorro-antd';
import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup, FormBuilder } from '@angular/forms';
import { SubjectActivity } from './../../../entity/subject-activity';
import { ActivatedRoute } from '@angular/router';
import { SubjectActivityApiService } from '../../../service/subject-activity-api.service';
import { Category } from '../../../../system/category/entity/category';
import { UserGroup } from '../../../../system/entity/user-group';
import { tipMessage } from 'app/account/entity/message-tip';

@Component({
  selector: 'spk-subject-activity-content',
  templateUrl: './subject-activity-content.component.html',
  styleUrls: ['./subject-activity-content.component.scss']
})
export class SubjectActivityContentComponent implements OnInit {

  loading: boolean = false;
  _form: FormGroup;
  subjectActivity: SubjectActivity;

  constructor(
    private fb: FormBuilder,
    private message: NzMessageService,
    private subjectService: SubjectActivityApiService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.route.data.subscribe(({ subjectActivity }: { subjectActivity: SubjectActivity }) => {
      this.subjectActivity = subjectActivity;
    });
    this.subjectService.getOne(this.subjectActivity.id).subscribe(
      data => {
        this.subjectActivity = data;
        this._initForm();
      }
    );
  }

  _initForm() {
    let m = this.subjectActivity || new SubjectActivity();
    let userGroup: UserGroup;
    if (m.userGroupId && m.userGroupName) {
      userGroup = new UserGroup();
      userGroup.id = m.userGroupId;
      userGroup.name = m.userGroupName;
    }
    let category: Category;
    if (m.categoryId && m.categoryName) {
      category = new Category();
      category.id = m.categoryId;
      category.name = m.categoryName;
    }
    this._form = this.fb.group({
      id: [m.id],
      content: [m.content],
      userGroup: [m.userGroup || userGroup],
      category: [m.category || category],
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

  onSubmit(event) {
    this.loading = true;
    this.subjectService.update(this._form.value).subscribe(
      subject => {
        this.loading = false;
        this.subjectActivity = subject;
        tipMessage('保存成功', 'success');
      },
      err => {
        this.loading = false;
        tipMessage(err);
      }
    );
  }

}
