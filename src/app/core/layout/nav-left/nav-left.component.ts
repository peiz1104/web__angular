import { Component, OnInit, AfterViewChecked, AfterViewInit, OnChanges, Input, Output, EventEmitter, HostBinding } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
    selector: 'spk-nav-left',
    templateUrl: './nav-left.component.html',
    styleUrls: ['./nav-left.component.scss']
})
export class NavLeftComponent implements OnInit, AfterViewInit {
    @Input()
    navItems: any;
    @Input()
    // @HostBinding('class.cui-layout-sider-collapsed')
    isCollapsed: boolean;
    @Input() isSubMenu = false;
    url: string;
    urlArray: any;
    routeName: any = {};
    constructor(
        private routeInfo: ActivatedRoute,
        private router: Router,
    ) {
    }

    ngOnInit() {
        this.url = this.router.url;

    }
    ngAfterViewInit() {
        this.getroutenamerelative(this.navItems);
    }
    // toggleCollapsed() {
    //     this.isCollapsed = !this.isCollapsed;
    // }

    hasChildren(item) {
        return item.children ? item.children.length : item.children;
    }
    getOpen(item, index) {
        if (item.name == this.routeName[this.url]) {
            return true;
        } else {
            return false;
        }
    }
    // 获取对应路由name数据
    getroutenamerelative(naveItem: any[]) {

        naveItem.forEach((item, index) => {
            if (item.children && item.children.length) {

                item.children.map((data) => {
                    if (data.children && data.children.length) {
                        data.children.map((next) => {
                            this.routeName[next.route] = item.name;
                        })
                    } else {
                        this.routeName[data.route] = item.name;
                    }
                })
            }
        })
    }
}
