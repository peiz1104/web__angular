import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Programmanagement} from "../../entity/programmanagement";
import {ProgrammanagementGroup} from "../../entity/programmanagement-group";
import {NgForm} from '@angular/forms';
@Component({
  selector: 'spk-program-management-form',
  templateUrl: './program-management-form.component.html',
  styleUrls: ['./program-management-form.component.scss']
})
export class ProgramManagementFormComponent implements OnInit {

  @Input() programManagement: Programmanagement;
  @Input() programManagementGroup: ProgrammanagementGroup;

  @Output() private doSubmit = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }
  onSubmit(f: NgForm) {
    if (this.programManagement && this.programManagement.name) {
      this.programManagement.programmanagermentGroup = this.programManagementGroup;
      this.doSubmit.emit(this.programManagement);
    }
  }
}
