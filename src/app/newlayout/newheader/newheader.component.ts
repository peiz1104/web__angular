import { Component, OnInit, OnChanges } from '@angular/core';
import { AuthService } from '../../core/auth/auth.service';
import { Site } from '../entity/site';
import { User } from '../entity/user';
import { HeaderService } from 'app/core/service/header.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MAIN_MENU } from './routeData'

@Component({
    selector: 'spk-newheader',
    templateUrl: './newheader.component.html',
    styleUrls: ['./newheader.component.scss']
})
export class NewheaderComponent implements OnInit, OnChanges {
    site: Site;
    user: User;
    titleId: number = 0;
    noticeNum: number;
    showProductDrop: boolean = false;
    currentUrl: any;
    currentApplication: any = [];
    dataInOneArray: any = [];
    parentId: any;
    currentId: any;
    dropIconAndName: any = {
        name: '工作台',
        icon: 'icon-appstore'
    }
    constructor(
        private authService: AuthService,
        private headerService: HeaderService,
        private router: Router,
        private routeInfo: ActivatedRoute
    ) {
        authService.getCurrentUser().subscribe(user => this.user = user);
        authService.getCurrentSite().subscribe(site => this.site = site);
    }

    ngOnInit() {
        this.getNoticeCount();
        this.getallList(MAIN_MENU);
        let currentApplicationData = JSON.parse(window.localStorage.getItem('currentApplicationData'));
        if (currentApplicationData && currentApplicationData.parentId) {
            this.parentId = currentApplicationData.parentId;
            this.currentId = currentApplicationData.currentId;
            // 查找parentId相同项
            this.currentApplication = this.dataInOneArray.filter((item) => {
                return item.parentId == this.parentId;
            })
            this.dataInOneArray.map((item) => {
                if (item.id == currentApplicationData.currentId) {
                    this.dropIconAndName = {
                        name: item.name,
                        icon: item.icon
                    }
                }
            })
        } else {
            this.currentApplication = MAIN_MENU;
        }


    }
    ngOnChanges() {
        this.currentUrl = this.router.url;
        console.log(this.currentUrl, 333);
    }
    // 返回学员首页
    goHome(event) {
        let url = window.location.origin + '/learner/home'
        // window.navigate(url)
        window.location.href = url;
    }
    getNoticeCount() {
        this.headerService.getNoticeCount().subscribe(
            data => {
                this.noticeNum = data.totalElements;
            }
        );
    }
    logout() {
        window.localStorage.removeItem('currentApplicationData')
        this.authService.logout().subscribe(
            () => {
            } // this.router.navigate(['/login'])
        );

    }
    toggleClick() {
        this.showProductDrop = !this.showProductDrop;
    }
    // application/all和list
    getIconNameType() {

    }
    showApplication(value) {
        // console.log(value, 22)
        if (value.children) {
            this.parentId = value.id;
            this.currentApplication = value.children;
            this.dropIconAndName = {
                name: value.name,
                icon: value.icon
            }
        } else if (value.route) {
            this.currentId = value.id;
            let localStorageObj = {
                currentId: value.id,
                parentId: value.parentId
            };
            let jsonObj = JSON.stringify(localStorageObj);
            window.localStorage.setItem('currentApplicationData', jsonObj);
            this.router.navigate([value.route])
        }
    }
    // 在menuData中寻找当前点击的data
    getCurrentMenuData(array: any[], id) {
        array.map((item) => {
            if (item.id == id) {
                this.dropIconAndName['name'] = item.name;
                this.dropIconAndName['icon'] = item.icon;
            } else {
                if (item.children) {
                    this.getCurrentMenuData(item.children, id)
                }
            }
        })
    }
    // 如果没有parentId到系统应用
    goUpperLevel() {
        let rootApplicationArray = this.judgeGoback(this.parentId);
        if (rootApplicationArray.length) {
            this.currentApplication = rootApplicationArray;
        } else {
            this.currentApplication = this.findParent(this.parentId);
            console.log(this.dropIconAndName, this.parentId, 243)
        }

    }
    getallList(array: any[]) {
        array.map((item) => {
            this.dataInOneArray.push(item);
            if (item.children) {
                this.getallList(item.children);
            }
        })
    }
    findParent(id) {
        let applicationArray = [];
        this.dataInOneArray.map((item) => {
            if (item.id == id) {
                this.dataInOneArray.map((itemup) => {
                    if (itemup.id == this.parentId) {
                        this.parentId = itemup.parentId;
                        this.dataInOneArray.map((iteml) => {
                            if (iteml.id == this.parentId) {
                                this.dropIconAndName = {
                                    name: iteml.name,
                                    icon: iteml.icon
                                }
                            }
                        })
                    }
                    if (itemup.parentId == item.parentId) {
                        applicationArray.push(itemup);
                    }
                })
            }
        })
        return applicationArray;
    }
    // 判断是否可以返回
    judgeGoback(id) {
        let rootApplicationArray = [];
        this.dataInOneArray.map((item) => {
            if (item.id == id && !item.parentId) {
                this.parentId = undefined;
                this.dropIconAndName = {
                    name: '工作台',
                    icon: 'icon-appstore'
                }
                this.dataInOneArray.map((itemr) => {
                    if (!itemr.parentId) {
                        rootApplicationArray.push(itemr);
                    }
                })
            }
        })
        return rootApplicationArray;
    }
    goApplicationAll(event) {
        window.localStorage.removeItem('currentApplicationData');
        this.currentApplication = MAIN_MENU;
        this.dropIconAndName = {
            name: '工作台',
            icon: 'icon-appstore'
        };
        this.currentId = undefined;
        this.router.navigate(['/application/all'])
    }

}
