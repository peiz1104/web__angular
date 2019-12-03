import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MAIN_MENU } from 'app/newlayout/newheader/routeData'

@Component({
    selector: 'spk-newhome',
    templateUrl: './newhome.component.html',
    styleUrls: ['./newhome.component.scss']
})
export class NewhomeComponent implements OnInit {
    currentApplication: any = [];
    dataInOneArray: any = [];
    parentId: any;
    currentId: any;
    dropIconAndName: any = {
        name: '全部菜单',
        icon: 'icon-appstore'
    }
    constructor(
        private router: Router,
        private routeInfo: ActivatedRoute
    ) { }

    ngOnInit() {
        this.getallList(MAIN_MENU);
        this.currentApplication = MAIN_MENU;
    }
    applicationShow(value) {
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
    goUpperLevel() {
        let rootApplicationArray = this.judgeGoback(this.parentId);
        if (rootApplicationArray.length) {
            this.currentApplication = rootApplicationArray;
        } else {
            this.currentApplication = this.findParent(this.parentId);
            console.log(this.dropIconAndName, this.parentId, 243)
        }

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
                    name: '全部菜单',
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
    getallList(array: any[]) {
        array.map((item) => {
            this.dataInOneArray.push(item);
            if (item.children) {
                this.getallList(item.children);
            }
        })
    }
}
