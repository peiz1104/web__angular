import { EventEmitter, Input, Output } from '@angular/core';
import {
    Component, OnInit, AfterContentChecked, AfterViewChecked, AfterContentInit

} from '@angular/core';
import { Router, NavigationEnd, } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { Site } from '../../entity/site';
import { User } from '../../../system/entity/user';
import { HeaderService } from 'app/core/service/header.service';
import { Observable } from 'rxjs/Observable';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { tipMessage } from 'app/account/entity/message-tip';

@Component({
    selector: 'spk-assist-header',
    templateUrl: './assist-header.component.html',
    styleUrls: ['./assist-header.component.scss']
})
export class AssistHeaderComponent implements OnInit, AfterContentInit {

    @Input() site: Site;
    user: User = new User();
    titleId: number = 0;
    noticeNum: number;
    isBlock: boolean = true
    udropDisplay: boolean;
    notReadMessageNumber: number = 0;
    hasPermission: boolean = false;
    userimg: any;
    menu: any = [
        { name: '首页', path: '/assist/home', index: 0 },
        { name: '培训班管理', path: '/assist/tbc', index: 1 },
        { name: '我的学时', path: '/assist/period', index: 2 },
        { name: '代理报名', path: '/assist/proxy', index: 4 }
    ]
    menuClassIndex: number = 0;

    isAdministrator$: Observable<boolean>;
    isInstructor$: Observable<boolean>;

    @Input() isCollapsed: boolean;
    @Output() isCollapsedChange: EventEmitter<boolean> = new EventEmitter();

    constructor(private router: Router, private http: Http, private authService: AuthService, private headerService: HeaderService) {
        authService.getCurrentUser().subscribe(user => this.user = user);
        authService.getCurrentSite().subscribe(site => this.site = site);
        this.isAdministrator$ = authService.isAdministrator();
        this.isInstructor$ = authService.isInstructor();
        this.authService.getCurrentUser().subscribe((user) => {
            this.user = user;
        });
    }

    ngOnInit() {
        const href = window.location.href;
        let currenturl = this.router.url;
        this.menu.forEach((item) => {
            if (currenturl.indexOf(item.path) !== -1) {
                this.menuClassIndex = item.index;
            }
        })
        // console.log(currenturl, this.menuClassIndex, 44)
        this.authService.getCurrentUser().subscribe((user) => {
            this.user = user;
            this.hasPermission = user.hasPermission;
            this.getUserHeadImg(user);
        });
        // console.log(href)
        // tslint:disable-next-line:max-line-length
        (this.http.get(`/api/period/assistant/manager/is-assistant`).map(res => res.json()) as Observable<Response>).subscribe((data: any) => {
            if (data) {
                this.menu = [
                    { name: '首页', path: '/assist/home', index: 0 },
                    { name: '培训班管理', path: '/assist/tbc', index: 1 },
                    { name: '学时管理', path: '/assist/period', index: 2 },
                    { name: '代理报名', path: '/assist/proxy', index: 4 }
                ]
            } else {
                this.menu = [
                    { name: '首页', path: '/assist/home', index: 0 },
                    { name: '培训班管理', path: '/assist/tbc', index: 1 },
                    { name: '代理报名', path: '/assist/proxy', index: 4 }
                ]
            }
        });
    }
    // 获取用户头像
    getUserHeadImg(currentUser) {
        this.authService.getuserheadimg(currentUser.id).subscribe(
            res => {
                // console.log(res, 223);
                this.userimg = res.avatar
            },
            err => {
                tipMessage('请求用户头像失败');
            }
        )
    }
    ngAfterContentInit() {
        this.authService.getCurrentSite().subscribe((site) => {
            this.site = site;
        });
        this.getNoticeCount();
    }
    logout() {
        this.authService.logout().subscribe(
            () => { } // this.router.navigate(['/login'])
        );

    }
    handleOnClick(index: number) {
        this.titleId = index;
    }
    // 返回学员首页
    goHome(event) {
        let url = window.location.origin + '/learner/home'
        // window.navigate(url)
        window.location.href = url;
    }

    toggleCollapsed() {
        this.isCollapsed = !this.isCollapsed;
        this.isCollapsedChange.emit(this.isCollapsed);
    }
    getNoticeCount() {
        this.headerService.getNotReadTotal().subscribe(
            data => {
                if (Object.prototype.toString.call(data) == "[object Object]") {
                    this.notReadMessageNumber = 0;
                } else {
                    this.notReadMessageNumber = data;
                }
            }
        );
    }
    handelClickMenu = (index, url) => {
        this.menuClassIndex = index;
        this.router.navigate([url]);
    }
    defaultImgSrc(event) {
        let img = event.srcElement || event.target;
        if (this.user && this.user.sex) {
            if (this.user.sex == 'FAMALE') {
                img.src = "./assets/images/woman.png";
                img.onerror = null;
            } else {
                img.src = "./assets/images/man.png";
                img.onerror = null;
            }
        }
    }

}
