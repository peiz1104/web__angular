import { setTimeout } from 'timers';
import { Component, OnInit } from '@angular/core';
import { CuiPagination } from 'console-ui-ng';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd';
import { HomeTemplateApiService } from '../../services/home-template-api.service';
import { LayoutTemplate } from '../../entity/layout-template';
import { Module } from '../../entity/module';
import { Location } from '@angular/common';
import { SortablejsOptions } from 'angular-sortablejs';
import { tipMessage } from 'app/account/entity/message-tip';


@Component({
    selector: 'spk-home-template-modules',
    templateUrl: './home-template-modules.component.html',
    styleUrls: ['./home-template-modules.component.scss']
})
export class HomeTemplateModulesComponent implements OnInit {

    templateId: number;
    moduleType: string = 'ALL';
    modules: any;
    modulesNew: any = {};
    curId: number;
    curModule: any;
    isView: boolean = false;
    loading: boolean = false;
    viewLoading: boolean = false;
    allLoad: any = [];
    allLoadView: any = [];
    newAdd: boolean = false;

    constructor(
        private templateService: HomeTemplateApiService,
        private router: Router,
        private modal: NzModalService,
        private route: ActivatedRoute,
        private location: Location,
    ) { }

    ngOnInit() {
        this.route.params.subscribe(
            (params: Params) => {
                this.templateId = params['id'] as number;
            });
        this.getModules();
    }

    getModules() {
        this.loading = true;
        this.allLoad = [];
        this.templateService.getModule(this.templateId).subscribe(
            obj => {
                this.modules = obj;
                this.templateService.configInfoAll = this.modules;
                this.restModule(obj);
            },
            err => {
                tipMessage(err);
                this.loading = false;
            }
        )
    }
    // 判断每个模块是否加载完
    onLoad(bool) {
        if (!this.isView) {
            this.allLoad.push(bool);
            if (this.allLoad.length == this.modules.length) {
                this.loading = false;
                if (this.newAdd) {
                    this.curId = this.curModule.id;
                    this.moduleType = this.curModule.moduleType;
                }
            }
        } else {
            this.allLoadView.push(bool);
            if (this.allLoadView.length == this.modules.length) {
                this.viewLoading = false;
            }
        }
    }
    restModule(obj) {
        this.modulesNew = {
            center: [],
        };
        obj.forEach(item => {
            if (item.moduleType == 'LOGO') {
                this.modulesNew.logo = item;
            } else if (item.moduleType == 'FOOTER') {
                this.modulesNew.footer = item;
            } else {
                this.modulesNew.center.push(item);
                this.modulesNew.center.sort((a, b) => a.displayOrder - b.displayOrder);
            }
        });
    }
    onAdd(moduleType: string) {
        let isAdd = true;
        let typeString = (moduleType === 'BANNER' ? 'BANNER' : '页眉页脚');
        if (moduleType === 'LOGO' || moduleType === 'FOOTER' || moduleType === 'BANNER') {
            this.modules.forEach(e => {
                if (e.moduleType === moduleType) {
                    tipMessage(typeString + '版块只能创建一个');
                    isAdd = false;
                }
            });
        }
        if (isAdd) {
            this.addModule(moduleType);
        }
    }
    addModule(type) {
        let m = new Module();
        // this.curModule = m;
        m.layout = new LayoutTemplate();
        m.moduleType = type;
        m.layout.id = this.templateId;
        // 如果新增文章或者课程版块,讲师模块，排序需要改变
        if (type == 'ARTICLE' || type == 'COURSE' || type == 'TEACHER') {
            this.moduleType = type;
            let index = this.modulesNew.center.length - 1;
            m.displayOrder = this.modulesNew.center[index].displayOrder + 1;
        }
        this.modules.push(m);
    }

    // 删除模块
    deleteModule(module) {
        this.modal.confirm({
            title: `确定要删除吗？`,
            zIndex: 1003,
            onOk: () => {

                this.templateService.deleteModule(module.id).subscribe(
                    ok => {
                        tipMessage('删除成功', 'success');
                        this.modules.forEach((e, index) => {
                            if (e.id == module.id) {
                                this.modules.splice(index, 1);
                            }
                        });
                        this.restModule(this.modules);
                        this.backConfig();
                    },
                    error => {
                        tipMessage('删除失败');
                    }
                )
            }
        });
    }

    switchType(e) {
        this.moduleType = e.moduleType;
        this.curId = e.id;
        // this.curModule = e;
    }
    // 返回初始化配置页
    backConfig() {
        this.moduleType = 'ALL';
        this.curId = null;
    }
    refresh(m?: any) {
        if (m) {
            this.newAdd = true;
            this.curModule = m;
        } else {
            this.newAdd = false;
        }
        this.getModules();
    }
    showView() {
        this.isView = true;
        this.allLoadView = [];
        this.viewLoading = true;
    }
    handleCancel() {
        this.isView = false;
        this.viewLoading = false;
    }
    //  返回列表页
    onCancel() {
        this.location.back();
    }
    // 排序的相关处理
    // tslint:disable-next-line:member-ordering
    eventOptions: SortablejsOptions = {
        dragClass: 'none',
        onUpdate: (e) => {
            this.modulesNew.center.forEach((item, i) => {
                item.displayOrder = i;
            });
            // this.loading = true;
            this.templateService.sortModule(this.modulesNew.center).subscribe(
                ok => {
                    this.newAdd = false;
                    // this.loading = false;
                    // this.getModules();
                },
                err => {
                    tipMessage(err);
                    this.loading = false;
                }
            )
        }
    };
}
