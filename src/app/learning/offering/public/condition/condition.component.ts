import { NzModalService, NzMessageService, NzModalSubject } from 'ng-zorro-antd';
import { UserGroup } from './../../../../system/entity/user-group';
import { TermService } from './../../service/term.service';
import { User } from './../../../../system/entity/user';
import { Column } from 'console-ui-ng';
import { Term } from './../../entity/term';
import { Pagination } from './../../../../core/entity/pagination';
import { Condition } from './../../entity/condition';
import { Component, OnInit, Input, ViewChild, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { UserLookupComponent } from '../../../../shared/widget/user-lookup/user-lookup.component';
import { tipMessage } from 'app/account/entity/message-tip';

@Component({
    selector: 'spk-condition',
    templateUrl: './condition.component.html',
    styleUrls: ['./condition.component.scss']
})
export class ConditionComponent implements OnInit {
    @Input() promotionState: any;
    @Input() condition: Condition;
    @Input() matchAttribute: boolean = false;
    @Input() matchUser: boolean = true;
    @Input() matchUserGroup: boolean = true;
    @Input() matchLogicalGroup: boolean = false;
    @Input() matchSite: boolean = false;
    @Input() matchImport: boolean = true;
    @Input() trainingClass: any;

    _searchForm: FormGroup;
    userSelected: User[];
    userGroupSelected: UserGroup[];
    terms: Pagination<Term>;
    selected;
    exportShow: boolean = false;

    userLookupModal: NzModalSubject;
    ugLookupModal: NzModalSubject;
    searchName: string;
    loading: boolean = true;
    isVisible: boolean = false;
    pronotionData: any;
    selection: any[] = [];
    spinning: boolean = false;
    addPromotion: boolean = false;
    isArchived: boolean = false;
    searchBy: {
        pid?: string,
        psnName?: string,
        currLeader?: string,
        userGroup?: UserGroup

    } = {};

    pronotionColumns = [
        { title: '工号', data: 'pid', styleClass: 'text-left' },
        { title: '姓名', data: 'psnName', styleClass: 'text-left' },
        { title: '所属组织', tpl: 'group' },
        { title: '晋升前职级', data: 't09BeforeRank', styleClass: 'text-center' },
        { title: '晋升后职级', data: 't09AfterRank', styleClass: 'text-center' },
        { title: '当前主管工号', data: 'currLeader', styleClass: 'text-center' }
    ]
    columns: Column[] = [
        // { title: 'ID', data: 'id' },
        { title: '名称/条件', tpl: 'name' },
        { title: '所属组织', tpl: 'intro' },
        { title: '类型', tpl: 'type' },
        { title: '操作', tpl: 'actions', styleClass: 'text-right' },
    ];

    constructor(
        private termService: TermService,
        private modal: NzModalService,
        private message: NzMessageService,
        private fb: FormBuilder
    ) { }

    ngOnInit() {
        this.loadTerms();
        this.isArchived = this.trainingClass ? this.trainingClass.isArchived : false;
    }

    loadTerms(page?) {
        this.loading = true;
        // console.log("loadTerms", this.loading);
        this.termService.getAllOfPage(this.condition.id, null, page).subscribe(
            terms => {
                this.loading = false;
                this.terms = terms;
                console.log(this.terms,111)
                this.exportIsShow();
            },
            err => {
                this.loading = false;
            }
        );
    }

    exportIsShow() {
        if (!this.terms.content || this.terms.content.length <= 0) {
            this.exportShow = true;
        } else {
            this.exportShow = false;
        }
    }

    search(page?) {
        let params = {};
        params["search"] = this.searchName;
        this.termService.getAllOfPage(this.condition.id, params, page).subscribe(
            terms => this.terms = terms
        );
    }

    delete(row?, flag?: boolean) {
        let id = row ? [row.id] : this.selected;
        let type = row ? this.getTypeText(row) : '数据';
        if (!id || id.length == 0) {
            tipMessage(`请选择想要删除的${type}`, 'warning');
            return;
        }
        if (flag) {
            this.termService.delete(id, this.condition.id).subscribe(
                ok => {
                    tipMessage(`删除成功`, 'success');
                    this.loadTerms();
                },
                err => tipMessage(`删除失败`, 'error')
            );
        } else {
            this.modal.confirm({
                title: `确定要删除选择的${type}吗？`,
                zIndex: 1003,
                onOk: () => {
                    this.termService.delete(id, this.condition.id).subscribe(
                        ok => {
                            tipMessage('删除成功', 'success');
                            this.loadTerms();
                        },
                        err => {
                            tipMessage('删除失败');
                        }
                    );
                }
            });
        }
    }

    getName(term: Term) {
        let name = '';
        switch (term.termType) {
            case 'USER':
                name = term.user.displayName;
                break;
            case 'USER_GROUP':
                name = term.userGroup.name;
                break;
            case 'LOGIC_GROUP':
                name = term.logicalGroup.name;
                break;
            case 'SITE':
                name = term.matchedSite.name;
                break;
            case 'ATTRIBUTE':
                break;
            default:
                break;
        }
        return name;
    }
    onSelect(selIds: any[]) {
        this.selected = selIds;
    }
    getTypeText(term: Term) {
        const typeTextMap = {
            'USER': '用户',
            'USER_GROUP': '组织',
            'LOGIC_GROUP': '逻辑组',
            'SITE': '站点',
            'ATTRIBUTE': '用户属性'
        };
        return typeTextMap[term.termType];
    }

    openUserLookupDialog(titleTpl, contentTpl, footerTpl) {
        this.userLookupModal = this.modal.open({
            title: titleTpl,
            content: contentTpl,
            footer: footerTpl,
            maskClosable: false,
            width: 1000,
            zIndex: 1003
        });
    }

    userLookupOk(selected) {
        // let selected = this.userSelected;
        if (selected && selected.length > 0) {
            // TODO: send to server
            this.termService.addUser(this.condition.id, selected).subscribe(
                ok => {
                    if (ok.judgeTbcMax == 'Y') {
                        return tipMessage('添加人数超过最大注册人数，添加失败！', '', 5000);
                    } else {
                        tipMessage('添加用户成功', 'success');
                        this.loadTerms();
                        // this.layerRef.close();
                        this.userLookupModal.destroy('onOk');
                    }

                },
                err => {
                    tipMessage('添加用户失败');
                }
            );
        } else {
            this.modal.warning({ title: '请选择要添加的用户！', zIndex: 1200 });
            return;
        }
    }

    userImport(_value) {
        tipMessage('添加用户成功', 'success');
        this.loadTerms();
    }

    termExport() {
        this.exportShow = true;
        let params = {};
        params["search"] = this.searchName;
        params["selected"] = this.selected;

        this.termService.export(this.trainingClass.id, params).subscribe(
            ok => {
                this.termExcelDownload();
            },
            err => {
                tipMessage(err);
                this.exportShow = false;
            }
        );
    }

    termExcelDownload() {
        this.exportShow = false;
        let url;
        if (!window.location.origin) {
            url = window.location.protocol + "//" + window.location.hostname + (window.location.port ? ':' + window.location.port : '');
        } else {
            url = window.location.origin;
        }
        // window.open(`${url}/api/condition/${this.condition.id}/terms/termExport/download`, '_blank');
        window.open(`${url}/api/offering/${this.trainingClass.id}/enrollments/userExport/download`, '_blank');
    }

    userLookupCancel() {
        this.userLookupModal.destroy('onCancel');
    }

    userGroupLookupOk(selected) {
        // let selected = this.userGroupSelected;
        if (selected && selected.length > 0) {
            // TODO: send to server
            this.termService.addUserGroup(this.condition.id, selected).subscribe(
                ok => {
                    if (ok.judgeTbcMax == 'Y') {
                        return tipMessage('添加人数超过最大注册人数，添加失败！', '', 5000);
                    } else {
                        tipMessage('添加组织成功', 'success');
                        this.loadTerms();
                        // this.layerRef.close();
                    }

                },
                err => {
                    tipMessage('添加组织失败');
                }
            );
        } else {
            this.modal.warning({ title: '你没有选择组织，将不做修改！', zIndex: 1003 });
            return;
        }
    }
    // tslint:disable-next-line:indent
    logicGroupLookupOk(selected) {
        if (selected && selected.length > 0) {
            // tslint:disable-next-line:indent
            this.termService.addLogicGroup(this.condition.id, selected).subscribe(
                ok => {
                    if (ok.judgeTbcMax == 'Y') {
                        return tipMessage('添加人数超过最大注册人数，添加失败！', '', 5000);
                    } else {
                        tipMessage('添加用户组成功', 'success');
                        this.loadTerms();
                    }

                },
                err => {
                    tipMessage('添加用户组失败');
                }
            );
        } else {
            this.modal.warning({ title: '你没有选择用户组，将不做修改！', zIndex: 1003 });
            return;
        }
    }

    loadPronotionData(page?: any) {
        let params = {
            size: page && page.size || 10,
            page: page && page.number || 0,
            type: 'E'
        }
        if (this.searchBy.userGroup) {
            params['userGroupId'] = this.searchBy.userGroup.id;
        }
        if (this.searchBy.pid) {
            params['pid'] = this.searchBy.pid.trim();
        }
        if (this.searchBy.currLeader) {
            params['currLeader'] = this.searchBy.currLeader.trim();
        }
        if (this.searchBy.psnName) {
            params['psnName'] = this.searchBy.psnName.trim();
        }
        this.spinning = true;
        this.termService.promotionData(params).subscribe((res) => {
            this.pronotionData = res;
            this.spinning = false;
            this.selection = [];
        },
            err => {
                this.spinning = false;
                tipMessage(err);
            }
        )
    }
    // 添加拟晋升人员
    planforPromotion() {
        this.isVisible = true;
        this._searchForm = this.fb.group({
            pid: [''],
            currLeader: [''],
            psnName: [''],
            userGroup: ['']

        })
        this.loadPronotionData();
    }
    searchData(event, value) {
        this.searchBy = value;
        this.loadPronotionData();
    }
    handleCancel(event) {
        this.isVisible = false;
        this.selection = [];
        this.spinning = false;
        this.addPromotion = false;
    }
    handleOk(event) {
        if (this.selection.length) {
            this.addPromotion = true;

            let promotionIds = this.getPromotionIds(this.selection);
            // console.log(this.selection, promotionIds, 444)
            this.termService.addPromotionUser(this.condition.id, promotionIds).subscribe(
                ok => {
                    if (ok.judgeTbcMax == 'Y') {
                        this.addPromotion = false;
                        return tipMessage('添加人员超过最大注册人数，添加失败！', '', 5000);
                    } else {
                        tipMessage('添加用户成功', 'success');
                        this.loadTerms();
                        // this.layerRef.close();
                        this.isVisible = false;
                        this.addPromotion = false;
                        this.selection = [];
                    }

                },
                err => {
                    this.addPromotion = false;
                    tipMessage('添加用户失败');
                }
            );
        } else {
            return tipMessage('请选择人员', 'warning');
        }

    }

    userGroupLookupCancel() {
        // this.layerRef.close();
    }

    selectUser(users) {
        this.userSelected = users;
    }

    selectUserGroup(userGroups) {
        this.userGroupSelected = userGroups;
    }

    openUserGroupLookupDialog(titleTpl, contentTpl, footerTpl) {
        this.ugLookupModal = this.modal.open({
            title: titleTpl,
            content: contentTpl,
            footer: footerTpl,
            maskClosable: false,
            width: 360,
            zIndex: 1003
        });
    }

    getPromotionIds(array: any[]) {
        let ids = [];
        array.map((item, index) => {
            ids.push(item.userId)
        })
        return ids;
    }
    // 转化路径
    getgroupFullpath(value) {
        if (value) {
            if (value.indexOf(',') !== -1 || value.indexOf('，') !== -1) {
                return value.replace(/(\,)|(\，)/g, '/')
            } else {
                return value;
            }
        } else {
            return '--'
        }
    }
    getNamePath(value) {
        if (value) {
          return value.split(',').join(' / ');
        }
    }
}
