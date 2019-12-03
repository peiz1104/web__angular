import { EventEmitter, Input, Output } from '@angular/core';
import {
    Component, OnInit, AfterContentChecked, AfterViewChecked, AfterContentInit

} from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Site } from '../../entity/site';
import { User } from '../../../system/entity/user';
import { HeaderService } from 'app/core/service/header.service';
import { Observable } from 'rxjs/Observable';
import { tipMessage } from 'app/account/entity/message-tip';

@Component({
    selector: 'spk-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, AfterContentInit {

    @Input() site: Site;
    user: User;
    titleId: number = 0;
    noticeNum: number;
    isBlock: boolean = true
    udropDisplay: boolean;
    userimg: any;
    isAdministrator$: Observable<boolean>;
    isInstructor$: Observable<boolean>;

    @Input() isCollapsed: boolean;
    @Output() isCollapsedChange: EventEmitter<boolean> = new EventEmitter();

    constructor(private authService: AuthService, private headerService: HeaderService) {
        authService.getCurrentUser().subscribe(user => this.user = user);
        authService.getCurrentSite().subscribe(site => this.site = site);
        this.isAdministrator$ = authService.isAdministrator();
        this.isInstructor$ = authService.isInstructor();
    }

    ngOnInit() {
        this.getNoticeCount();
        const href = window.location.href;
        if (href.indexOf("/home") !== -1) {
            this.isBlock = false;
        }
        this.authService.getCurrentUser().subscribe(user => {
            this.user = user;
            this.getUserHeadImg(user);
        });
        // console.log(href)
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
        this.headerService.getNoticeCount().subscribe(
            data => {
                this.noticeNum = data.totalElements;
            }
        );
    }
    defaultImgSrc(event) {
        let img = event.srcElement || event.target;
        if (this.user && this.user.sex) {
            if (this.user.sex == 'FAMALE') {
                img.src = "assets/images/woman.png";
                img.onerror = null;
            } else {
                img.src = "assets/images/man.png";
                img.onerror = null;
            }
        } else {
            img.src = "assets/images/man.png";
            img.onerror = null;
        }
    }
}
