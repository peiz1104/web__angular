import { Component, OnInit } from '@angular/core';
import { AuthService } from 'app/core';
import { User } from 'app/system/entity/user';

@Component({
  selector: 'spk-workspace',
  templateUrl: './workspace.component.html',
  styleUrls: ['./workspace.component.scss']
})
export class WorkspaceComponent implements OnInit {
  user: User;

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.authService.getCurrentUser().subscribe(user => this.user = user);
  }

}
