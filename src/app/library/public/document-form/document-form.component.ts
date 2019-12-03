import { DocumentInfo } from './../../entity/document-info';
import { UserGroup } from './../../../system/entity/user-group';
import { Category } from './../../../system/category/entity/category';
import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { Documentlib } from "app/library/entity/documentlib";
import { FileuploadComponent } from 'console-ui-ng';
import { NgForm, FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'spk-document-form',
  templateUrl: './document-form.component.html',
  styleUrls: ['./document-form.component.scss']
})
export class DocumentFormComponent implements OnInit {

  @Input() document: Documentlib;
  @Input() loading: Documentlib;
  category: Category = new Category();
  userGroup: UserGroup = new UserGroup();

  @Output() doSubmit: EventEmitter<any> = new EventEmitter();
  @Output() next: EventEmitter<any> = new EventEmitter();
  @ViewChild(FileuploadComponent) fu: FileuploadComponent;

  categoryType: boolean = false;
  userGroupType: boolean = false;
  fileType: boolean = false;
  isFile: boolean = true;
  nameType: boolean = false;
  _form: FormGroup;

  get isCreate() {
    return this.document && !this.document.id;
  }

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.category.id = this.document.categoryId;
    this.category.name = this.document.categoryName;
    this.userGroup.id = this.document.userGroupId;
    this.userGroup.name = this.document.userGroupName;
    this._initForm();
  }
  _initForm() {
    let m = this.document || new Documentlib();
    this._form = this.fb.group({
      id: [m.id],
      name: [m.name, Validators.required],
      summary: [m.summary],
      categoryTemp: [m.categoryTemp || this.category, Validators.required],
      userGroupTemp: [m.userGroupTemp || this.userGroup, Validators.required],
      isExcellent: [m.isExcellent],
      isPublished: [m.isPublished],
      categoryId: [null],
      userGroupId: [null],
      documentInfo: [null],
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
  resetForm () {
     this.fu.uploader.queue.length = 0;
     this.fileType = false;
     this.isFile = true;
     this.document = new Documentlib();
     this.category = new Category();
     this.userGroup = new UserGroup();
     this._initForm();
  }
  initDocument(file) {
    if (file) {
      if (!this.document.documentInfo) {
        this.document.documentInfo = new DocumentInfo();
      }
      this.document.documentInfo.fileSize = file["fileSize"];
      this.document.documentInfo.format = file["extention"].replace(".", "");
      if (!this.document.name) {
        this.document.name = file["originFileName"];
      }
      this.document.documentInfo.originFileName = file["originFileName"];
      this.document.documentInfo.relativePath = file["relativePath"];
      this.document.documentInfo.fileName = file["fileName"];
      this.document.documentInfo.parentDirectoryPath = file["parentDirectoryPath"];
      this.document.documentInfo.fullPath = file["fullPath"];
      this._form.get('documentInfo').setValue(this.document.documentInfo);
    }
    this.isFile = file ? false : true;
    this.fileType = file ? false : true;
  }

  saveAndNext() {
    let isPass = this.validateForm();
    if (isPass) {
      this._form.get('categoryId').setValue(this.getFormControl('categoryTemp').value.id);
      this._form.get('userGroupId').setValue(this.getFormControl('userGroupTemp').value.id);
      this.next.emit({ originalEvent: event, value: this._form.value });
    }
  }
  onSubmit(event: Event) {
    let isPass = this.validateForm();
    if (isPass) {
      this._form.get('categoryId').setValue(this.getFormControl('categoryTemp').value.id);
      this._form.get('userGroupId').setValue(this.getFormControl('userGroupTemp').value.id);
      this.doSubmit.emit({ originalEvent: event, value: this._form.value });
    }
  }

  validateForm() {
    this.category = this.getFormControl('categoryTemp').value;
    this.userGroup = this.getFormControl('userGroupTemp').value;
    this.categoryType = this.category.id ? false : true;
    this.userGroupType = this.userGroup ? (this.userGroup.id ? false : true) : true;
    this.nameType = this.document.name ? false : true;
    this.fileType = this.isFile;
    if (this.document && this.document.id) {
      this.fileType = false;
    }
    if (this.categoryType || this.userGroupType || this.fileType || this.nameType) {
      return false;
    }
    return true;
  }
  logSelectCategory(event) {
    this.categoryType = event ? false : true;
  }
  logSelectGroup(event) {
    this.userGroupType = event ? false : true;
  }
}
