import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {TypeManagement} from "../../entity/type-management";
import {TypeManagementService} from "../../service/type-management.service";
import {ActivatedRoute} from "@angular/router";
import {FormBuilder, FormGroup, Validators, FormControl} from "@angular/forms";

@Component({
  selector: 'spk-type-management-form',
  templateUrl: './type-management-form.component.html',
  styleUrls: ['./type-management-form.component.scss']
})
export class TypeManagementFormComponent implements OnInit {

  @Input()  typeManagement: TypeManagement;
  @Output() doSubmit: EventEmitter<any> = new EventEmitter();
  @Output() cancel: EventEmitter<any> = new EventEmitter();

  itemOption: any = [];
  selectedMultipleOption: any = [];

  _form: FormGroup;
  constructor(private typeManagementService: TypeManagementService, private route: ActivatedRoute, private fb: FormBuilder) { }

  ngOnInit() {
   this._initForm();
  }

  _initForm() {
    let m = this.typeManagement || new TypeManagement();

    this._form = this.fb.group({
      id: [m.id],
      name: [m.name, Validators.required],
      programmanagement: [m.programmanagement, Validators.required],
    });
  }

  onSubmit(event: Event) {
    this.doSubmit.emit({ originalEvent: event, value: this._form.value });
  }

  doCancel(event) {
    this.cancel.emit({originalEvent: event});
  }

}
