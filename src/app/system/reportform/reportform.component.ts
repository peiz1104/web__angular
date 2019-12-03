import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {UserTypesService} from "../service/user-types.service";
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import * as $ from 'jquery';

@Component({
    selector: 'spk-reportform',
    templateUrl: './reportform.component.html',
    styleUrls: ['./reportform.component.scss']
})
export class ReportformComponent implements OnInit {
    spinning: boolean = false;
    userText;
    constructor(
        private router: Router,
        private routeInfo: ActivatedRoute,
        private userTypesService: UserTypesService,
        private  http: Http
    ) { }

    ngOnInit() {
    }
    reportformview() {
        this.spinning = true;
        // 进行参数初始化https://www.cnblogs.com/amy-1205/p/5888082.html
        this.userTypesService.getUserText().subscribe(c => {
          this.userText = c.userText;

          (this.http.get(`http://localhost:8080/api/sso/authenticate/${this.userText}`).map(res => res.json()) as Observable<Response>).subscribe((data: any) => {
            console.log(data, 333)
            if(data.success) {
              window.open(`http://localhost:8080`, '_blank');
            }
          })

          // this.userTypesService.getLogin(this.userText).subscribe(cc => {
          //   console.log("----------------", cc);
          // })

        });

   /*     setTimeout(() => {
            window.open(`http://localhost:8080/api/sso/authenticate/${this.userText}`, '_blank');
            this.spinning = false;
        }, 3000)*/
    }
}
