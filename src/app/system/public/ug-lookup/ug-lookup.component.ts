import { UserGroup } from './../../entity/user-group';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'spk-ug-lookup',
  templateUrl: './ug-lookup.component.html',
  styleUrls: ['./ug-lookup.component.scss']
})
export class UgLookupComponent implements OnInit {

  @Output() selectionChange: EventEmitter<any> = new EventEmitter<any>();
  userGroups: UserGroup[];
  constructor() { }

  ngOnInit() {
  }

  onUgSelectionChange(userGroups) {
    this.selectionChange.emit(userGroups);
  }
}
