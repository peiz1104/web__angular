import { FileuploadComponent } from 'console-ui-ng';
import { UserGroup } from 'app/system/entity/user-group';
import { Category } from './../../../../system/category/entity/category';
import { FormGroup, FormBuilder, Validators, FormControl, AbstractControl } from '@angular/forms';
import { Material } from './../../entity/material';
import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { NzModalService, NzMessageService, NzModalSubject } from 'ng-zorro-antd';
import { tipMessage } from 'app/account/entity/message-tip';

@Component({
  selector: 'spk-material-form',
  templateUrl: './material-form.component.html',
  styleUrls: ['./material-form.component.scss']
})
export class MaterialFormComponent implements OnInit {

  @Input() material: Material;
  @Input() loading: boolean;

  @Output() save = new EventEmitter();
  @Output() cancel = new EventEmitter();

  _formGroup: FormGroup;

  @ViewChild("fileUpload") fu: FileuploadComponent;
  fileType: boolean = false;
  isFile: boolean = false;

  constructor(private fb: FormBuilder, public message: NzMessageService) { }

  ngOnInit() {
    this.material = this.material || new Material();
    this.initForm();
  }

  initForm() {
    let entity: Material = this.material;
    this._formGroup = this.fb.group({
      'name': [entity.name, Validators.required],
      'description': [entity.description]
    });

    if (this.isNew()) {
      this._formGroup.addControl('entryOnOff', new FormControl(false));
      this._formGroup.addControl('userGroup', new FormControl(null));
      this._formGroup.addControl('category', new FormControl(null));
    }
  }

  getFormControl(name): AbstractControl {
    return this._formGroup.controls[name];
  }

  getFormData() {
    if (this.isNew()) {
      let summary = this.getFormControl('description').value;
      this._formGroup.addControl('summary', new FormControl(summary ? summary : ''));
      if (this.getFormControl('entryOnOff').value) {
        if (this.getFormControl('userGroup').value) {
          this._formGroup.addControl('groupId', new FormControl(this.getFormControl('userGroup').value.id));
        }
        if (this.getFormControl('category').value) {
          this._formGroup.addControl('categoryId', new FormControl(this.getFormControl('category').value.id));
        }
        this._formGroup.addControl('type', new FormControl('library'));
      } else {
        this._formGroup.addControl('type', new FormControl('course'));
      }
    } else {
      this._formGroup.addControl('documentInfo.id', new FormControl(this.material.documentInfo.id));
      // this._formGroup.addControl('id', new FormControl(this.material.id));
    }
    return this._formGroup.value;
  }

  _save(event) {
    if ( this.getFormControl('entryOnOff') && this.getFormControl('entryOnOff').value) {
      if (this.getFormControl('userGroup').value && this.getFormControl('category').value) {
        if (this._formGroup.valid) {
          if (this.isFile || !this.isNew()) {
            this.save.emit({ originalEvent: event, data: this.getFormData(), next: false });
          } else {
            this.fileType = true;
          }
        }
      } else {
        tipMessage('请选择分类或组织', 'warning');
      }
    } else {
      if (this._formGroup.valid) {
        if (this.isFile || !this.isNew()) {
          this.save.emit({ originalEvent: event, data: this.getFormData(), next: false });
        } else {
          this.fileType = true;
        }
      }
    }
  }

  _saveAndNext(event) {
    if ( this.getFormControl('entryOnOff').value) {
      if (this.getFormControl('userGroup').value && this.getFormControl('category').value && this.getFormControl('entryOnOff').value) {
        if (this._formGroup.valid) {
          if (this.isFile || !this.isNew()) {
            this.fu.uploader.queue.length = 0;
            this.save.emit({ originalEvent: event, data: this.getFormData(), next: true });
          } else {
            this.fileType = true;
          }
        }
      } else {
        tipMessage('请选择分类或组织', 'warning');
      }
    } else {
      if (this._formGroup.valid) {
        if (this.isFile || !this.isNew()) {
          this.fu.uploader.queue.length = 0;
          this.save.emit({ originalEvent: event, data: this.getFormData(), next: true });
        } else {
          this.fileType = true;
        }
      }
    }
  }

  _cancel(event) {
    this.cancel.emit({ originalEvent: event });
  }

  isNew() {
    return !this.material || !this.material.id;
  }

  onUploadComplete(fileupload) {
    if (fileupload) {
      let nameVal = this.getFormControl('name').value;
      this.getFormControl('name').setValue(nameVal || fileupload['originFileName']);
      this._formGroup.addControl('originFileName', new FormControl(fileupload['originFileName']));
      // this._formGroup.addControl('format', new FormControl(fileupload["extention"]));
      this._formGroup.addControl('relativePath', new FormControl(fileupload['relativePath']));
      this._formGroup.addControl('fileSize', new FormControl(fileupload['fileSize']));
      this._formGroup.addControl('fullPath', new FormControl(fileupload['fullPath']));
      this._formGroup.addControl('fileName', new FormControl(fileupload['fileName']));
      this._formGroup.addControl('parentDirectoryPath', new FormControl(fileupload['parentDirectoryPath']));
    }
    this.isFile = !fileupload ? false : true;
    this.fileType = fileupload ? false : true;
  }

}
