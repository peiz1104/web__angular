import { Component, OnInit } from '@angular/core';
import { User } from '../../system/entity/user';
import { AuthService } from '../../core/auth/auth.service';

@Component({
  selector: 'spk-assist-home',
  templateUrl: './assist-home.component.html',
  styleUrls: ['./assist-home.component.scss']
})
export class AssistHomeComponent implements OnInit {

  user: User;

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.authService.getCurrentUser().subscribe(user => this.user = user);
  }

}
