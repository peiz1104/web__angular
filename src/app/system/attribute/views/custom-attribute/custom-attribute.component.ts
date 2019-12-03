import { AttributeApiService } from './../../service/attribute-api.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'spk-custom-attribute',
  templateUrl: './custom-attribute.component.html',
  styleUrls: ['./custom-attribute.component.scss']
})
export class CustomAttributeComponent implements OnInit {

  entity: any;

  attributes: any[];
  loading: boolean = false;

  selected: any;

  _form: FormGroup;

  _fieldTypes = [
    {value: 'STRING', label: '字符', disabled: false },
    {value: 'NUMBER', label: '数字', disabled: false },
    {value: 'LIST', label: '列表选择', disabled: false },
  ];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private attributeApi: AttributeApiService
  ) { }

  ngOnInit() {
    this.route.data.subscribe((data: {entity: any}) => {
      this.entity = data.entity;

      this.loadAttrs();
    });

    this.initForm();
  }

  loadAttrs() {
    this.loading = true;
    this.attributeApi.getAllOfPage({objectType: this.entity.identifier, page: 0, size: 100}).subscribe(
      data => {
        this.attributes = data.content;
        this.loading = false;
      },
      err => {
        this.loading = false;
      }
    );
  }

  initForm() {
    let m = this.selected || {};
    this._form = this.fb.group({
       id: [m.id],
       name: [m.name],
       identifier: [m.identifier],
       fieldType: [m.fieldType || 'STRING'],
       objectType: [m.objectType],
       isEditable: [m.isEditable],
       isViewable: [m.isViewable],
       isSetAllowed: [m.isSetAllowed],
       isGetAllowed: [m.isGetAllowed],
       isListDisplay: [m.isListDisplay],
       isRequired: [m.isRequired],
       isInbuilt: [m.isInbuilt],
       displayOrder: [m.displayOrder],
       defaultValue: [m.defaultValue],
       validRegex: [m.validRegex],
       validValues: [m.validValues],
    });
  }

  getFormControl(name) {
    return this._form.controls[name];
  }

  markASDirty() {
    for (let key of Object.keys(this._form.controls)) {
      this._form.controls[key].markAsDirty();
    }
  }

  onSelect(attr) {
    if (!this.selected || this.selected.id != attr.id) {
      this.selected =  attr;
      this.initForm();
    }
  }

  addAttribute() {
    this.selected = {};
    this.initForm();
  }

  save() {
    this.markASDirty();

    if (this._form.invalid) {
      return ;
    }

    let value = this._form.value;
    value['objectType'] = this.entity.identifier;

    let operate = value.id ? 'update' : 'create';

    this.attributeApi[operate](value).subscribe(
      ok => {
        this.loadAttrs();
        // TODO 刷新表单
      },
      err => {}
    );
  }

}
