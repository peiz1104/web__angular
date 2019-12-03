import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { environment } from './../environments/environment';
import { Component, OnInit, Inject, AfterViewChecked } from '@angular/core';
import { AuthService } from 'app/core';
import { Title } from '@angular/platform-browser';
import { setTimeout } from 'timers';
@Component({
    selector: 'spk-root',
    template: '<router-outlet></router-outlet>',
    styles: []
})
export class AppComponent implements OnInit {
    // title = 'spk';
    // 认证检查
    // 加载权限
    // 加载菜单
    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private authService: AuthService,
        private title: Title
    ) { }

    ngOnInit() {
        this.router.events.subscribe((event) => {
            // see also
            if (event instanceof NavigationEnd) {
                document.body.scrollTop = 0;
                let contentDiv = document.getElementById('cui-layout-workbench');
                // console.log('contentDiv', contentDiv);
                if (contentDiv) {
                    contentDiv.scrollTop = 0;
                }
            };
        });

        // 设置应用名称
        // TODO: 现在是加载的站点名称，缺失登录信息的情况下，如登录页，则有问题
        this.authService.getCurrentSite().subscribe(site => {
            this.title.setTitle(site.name);
        });
    }

}
