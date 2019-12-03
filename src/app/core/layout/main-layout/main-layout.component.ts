import { MAIN_MENU } from './menu-data-custom';
import { Message } from 'console-ui-ng';
import { Component, OnInit, ElementRef, AfterContentChecked } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { Subject } from 'rxjs/Subject';
import { IeDrage } from 'app/account/entity/message-tip';
import { setTimeout } from 'timers';
declare let $: any;
@Component({
    selector: 'spk-main-layout',
    templateUrl: './main-layout.component.html',
    styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent implements OnInit, AfterContentChecked {
    msg: Message[];
    isCollapsed = false;
    navItems = MAIN_MENU;
    ieDrageStatus: boolean = false;
    antdpagestate: boolean = false;
    removeClassStatus: boolean = false;
    otherMessageState: boolean = false;
    public subject: Subject<any> = new Subject();
    constructor(private router: Router, private authService: AuthService, private element: ElementRef) {
    }

    ngOnInit() {
    }

    toggleCollapsed() {
        this.isCollapsed = !this.isCollapsed;
    }
    navItemClick(item) {
        if (item && item.route) {
            this.router.navigateByUrl(item.route);
        }
    }
    goScroll(el) {
        let top = el.srcElement.scrollTop
        if (top <= 90) {
            this.subject.next("小于");
        } else {
            this.subject.next(top);
        }

    }
    logout() {
        this.authService.logout().subscribe(
            () => { } // this.router.navigate(['/login'])
        );

    }
    ngAfterContentChecked() {
        if ($('.nz-overlay-container')[0]) {
            if ($('.nz-overlay-pane>div').length > 0) {
                if (!this.ieDrageStatus) {
                    $('.nz-overlay-container').css({ 'height': '100%', 'z-index': 1006 });
                    if (!!window["ActiveXObject"] || "ActiveXObject" in window) {
                        if ($('.nz-overlay-pane>.ant-calendar-picker-container>.ant-calendar').length) {
                            setTimeout(() => {
                                $('.nz-overlay-container').css({ 'z-index': 1008 });
                            }, 1000)
                        }
                        if ($('.nz-overlay-pane>.ant-select-dropdown>div>.ant-select-dropdown-menu').length) {
                            setTimeout(() => {
                                $('.nz-overlay-container').css({ 'z-index': 1008 });
                            }, 1000)
                        }
                    }
                    this.ieDrageStatus = true;
                }
                if (this.ieDrageStatus) {
                    setTimeout(() => {
                        if ($('.nz-overlay-pane>div').length == 0) {
                            $('.nz-overlay-container').css({ 'height': '0%', 'z-index': 1 });
                        }
                    }, 0)
                }
            } else {
                if (this.ieDrageStatus) {
                    $('.nz-overlay-container').css({ 'height': '0%', 'z-index': 1 });
                    this.ieDrageStatus = false;
                }
                if ($('.cdk-free-overlay-wrapper>div').length > 0 && !this.ieDrageStatus && !this.otherMessageState) {
                    $('.nz-overlay-container').css({ 'height': '0%', 'z-index': 1 });
                    this.otherMessageState = true;
                }
            }
            // if ($('.nz-overlay-pane>div').length > 0) {
            //     this.ieDrageStatus = true;
            // }
            // if (this.ieDrageStatus) {
            //     setTimeout(() => {
            //         this.ieDrageStatus = false;
            //     }, 10)
            // }
            // if (!this.antdpagestate) {
            // tslint:disable-next-line:max-line-length
            //     if ($('.ant-select-dropdown-menu,.ant-select-dropdown-menu-vertical,.ant-select-dropdown-menu-root').parents().length == 6) {
            // tslint:disable-next-line:max-line-length
            //         let parentsNodes = $('.ant-select-dropdown-menu,.ant-select-dropdown-menu-vertical,.ant-select-dropdown-menu-root').parents();
            //         setTimeout(() => {
            //             $(parentsNodes[parentsNodes.length - 3]).addClass('page-antd-index-show-modal');
            //         }, 10)
            //         this.antdpagestate = true;
            //         this.removeClassStatus = false;
            //     }
            // }
            // if (!this.removeClassStatus && $('.page-antd-index-show-modal')[0]) {
            // tslint:disable-next-line:max-line-length
            //     if ($('.ant-select-dropdown-menu,.ant-select-dropdown-menu-vertical,.ant-select-dropdown-menu-root').parents().length == 0) {
            //         $('.page-antd-index-show-modal').removeClass('page-antd-index-show-modal');
            //         this.removeClassStatus = true;
            //         this.antdpagestate = false;
            //     }
            // }
        }
    }
}
