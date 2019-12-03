import { Component, OnInit, AfterViewChecked } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { ASSIST_MENU } from './assist-menu-data';
declare let $: any;

@Component({
    selector: 'spk-assist-layout',
    templateUrl: './assist-layout.component.html',
    styleUrls: ['./assist-layout.component.scss']
})
export class AssistLayoutComponent implements OnInit, AfterViewChecked {

    isCollapsed = false;
    navItems = ASSIST_MENU;
    ieDrageStatus: boolean = false;
    antdpagestate: boolean = false;
    removeClassStatus: boolean = false;
    otherMessageState: boolean = false;
    constructor(private router: Router, private authService: AuthService) {
    }

    ngOnInit() {
        // this.router.navigateByUrl('/assist/home');
    }
    toggleCollapsed() {
        this.isCollapsed = !this.isCollapsed;
    }
    /* navItemClick(item) {
        if (item && item.route) {
            this.router.navigateByUrl(item.route);
        }
    } */

    logout() {
        this.authService.logout().subscribe(
            () => { } // this.router.navigate(['/login'])
        );

    }

    ngAfterViewChecked() {
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
            //         $(parentsNodes[parentsNodes.length - 3]).addClass('page-antd-index-show-modal');
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
