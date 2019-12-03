import { Component, OnInit } from '@angular/core';
import { AuthService } from 'app/core/auth/auth.service';

@Component({
    selector: 'spk-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
    name: any = '某某某';
    constructor(
        private authService: AuthService,
    ) { }

    ngOnInit() {
        this.loginfo();
    }
    loginfo = () => {
        this.authService.loginfo().subscribe(
            (data) => {
                console.log(data)
                this.name = data.user.displayName;
            }
        );
    }

}
