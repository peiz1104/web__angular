import { Component, OnInit,AfterContentChecked } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'spk-barfile',
    templateUrl: './barfile.component.html',
    styleUrls: ['./barfile.component.scss']
})
export class BarfileComponent implements OnInit,AfterContentChecked {
    routeLinkActive: any = [
        { name: '总公司文件', index: 0, route: '/library/barfile/headofficefile', hasPermission:{hasPermission: 'RESOURCE:CALENDAR:VIEW'} },
        { name: '总公司通知', index: 1, route: '/library/barfile/headofficemessage', hasPermission:{hasPermission: 'RESOURCE:CALENDAR:VIEW'} },
        { name: '总公司报送材料模板', index: 2, route: '/library/barfile/headofficematerialtemplate', hasPermission:{hasPermission: 'RESOURCE:CALENDAR:VIEW'}  },
        { name: '教育培训制度', index: 3, route: '/library/barfile/educationsystem', hasPermission:{hasPermission: 'RESOURCE:CALENDAR:VIEW'} },
        { name: '行事历', index: 4, route: '/library/barfile/headofficecalendar', hasPermission:{hasPermission: 'RESOURCE:CALENDAR:VIEW'} }
    ];
    url: string;
    constructor(
        private routeInfo: ActivatedRoute,
        private router: Router,
    ) { }

    ngOnInit() {
        this.url = this.router.url;
    }
    ngAfterContentChecked(){
        this.url = this.router.url;
    }
    goActiveRoute(value) {
        this.router.navigateByUrl(value.route);
        this.url = value.route;
    }

}
