import { HourService, UsernameVerifiedResult } from './../../managementservice/hour.service';
import { CuiPagination, Column } from 'console-ui-ng';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import {
    Component, OnInit, AfterViewInit, forwardRef,
    Input, Output, EventEmitter, ContentChild, TemplateRef, ViewChild
} from '@angular/core';
import { NzModalService, NzModalSubject, NzMessageService } from 'ng-zorro-antd';
import { tipMessage } from 'app/account/entity/message-tip';

@Component({
    selector: 'spk-houruserlookup',
    templateUrl: './houruserlookup.component.html',
    styleUrls: ['./houruserlookup.component.scss'],
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => HouruserlookupComponent),
        multi: true
    }]
})
export class HouruserlookupComponent implements OnInit, AfterViewInit, ControlValueAccessor {
    @Input() modalTitle: any;
    @Input() api: any;
    @Input() selectionType: any;
    @Input() mode: 'single' | 'multiple' = 'multiple';
    @Input() placeholder: string = '请选择用户...';
    @Input() quickAddState: boolean;
    @Input() overflow: number = 50;
    @Input() userListApiUrl: string;
    @Input() privileges: string | string[] = ['SYSTEM:USER:VIEW'];
    @Input() hideDelete: boolean;
    @Input() mergeType: 'override' | 'merge' = 'merge';
    @Output() ok: EventEmitter<any> = new EventEmitter();
    @Output() cancel: EventEmitter<any> = new EventEmitter();
    @Output() remove: EventEmitter<any> = new EventEmitter();

    @ContentChild("echoTpl") echoTpl: TemplateRef<any>;
    @ContentChild("echoItemTpl") echoItemTpl: TemplateRef<any>;

    @ViewChild("lookupModalTitle") lookupModalTitle: TemplateRef<any>;
    @ViewChild("lookupModalContent") lookupModalContent: TemplateRef<any>;
    @ViewChild("lookupModalFooter") lookupModalFooter: TemplateRef<any>;

    _value;
    loading;
    confirming;
    disabled;

    onChange: any = Function.prototype;
    onTouched: any = Function.prototype;

    modalSubject: NzModalSubject;

    users: any[]; // User[];
    pagination: CuiPagination;
    columns: Column[] = [
        { title: 'ID', data: 'id', visible: false },
        { title: '用户名', data: 'username' },
        { title: '姓名', data: 'displayName' },
        { title: '手机号', data: 'phoneNumber' },
        { title: '邮箱', data: 'email' },
        { title: '性别', data: 'sex', tpl: 'sex', styleClass: 'text-center' },
        { title: '所属组织', tpl: 'userGroup', visible: true },
        { title: '开始日期', data: 'startDate', visible: false },
        { title: '到期日期', data: 'endDate', visible: false }
    ];

    searchtext;
    withChildGroup = false;

    isComplexSearch = false;

    target: any;
    tableLoading: boolean = false;
    selection: any[] = [];

    inputUsername: any[] = [];
    inputUsernames: string;
    verifyLoading: boolean = false;
    usernameVerifiedResults: UsernameVerifiedResult[];
    usernameVerifiedSuccess: UsernameVerifiedResult[];
    usernameVerifiedError: UsernameVerifiedResult[];
    usernameVerifiedWarning: UsernameVerifiedResult[];

    currentTab = 0;

    // 仲裁
    @Input() set ZC(value: boolean) {
        this.mode = 'single';
    }
    constructor(
        private modal: NzModalService,
        private userLookupApi: HourService,
        private message: NzMessageService
    ) { }

    ngOnInit() {
        this.currentTab = this.quickAddState ? 0 : 1;
    }
    ngAfterViewInit() {
        if (this.echoTpl) {
            return;
        } else {
            // 设置回显列表模板
            // 设置回显列表项模板
        }
    }


    writeValue(value: any): void {
        this._value = value;
        this.selection = value;
    }
    registerOnChange(fn: any): void {
        this.onChange = fn;
    }
    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }
    setDisabledState?(isDisabled: boolean): void {
        this.disabled = isDisabled;
    }

    get isSingle() {
        return this.mode != 'multiple';
    }

    get isMultiple() {
        return this.mode == 'multiple';
    }

    openLookup() {
        if (this.disabled) {
            return;
        }
        this.currentTab = this.quickAddState ? 0 : 1;
        this.modalSubject = this.modal.open({
            title: this.lookupModalTitle,
            content: this.lookupModalContent,
            footer: this.lookupModalFooter,
            maskClosable: false,
            width: 1000,
            zIndex: 1003,
            onOk: () => { },
            onCancel: () => { }
        });
    }

    loadData(page?: CuiPagination) {
        this.pagination = page;
        // console.log(page);
        let params = {
            // 'userGroup.id': this.userGroup && this.userGroup.id ? this.userGroup.id : '',
            searchtext: this.searchtext,
            withChildGroup: this.withChildGroup,
            permissions: this.privileges,
            page: page ? page.number : 0,
            size: page ? page.size : '',
            sort: page && page.sort ? page.sort : ''
        };

        if (this.target && this.target['id']) {
            if (this.target['type'] == 'SITE') {
                params['site.id'] = this.target['id'];
            } else {
                params['userGroup.id'] = this.target['id'];
            }
        }

        this.tableLoading = true;
        this.userLookupApi.users(this.api, params).subscribe(
            _page => {
                this.pagination = _page;
                this.users = _page.content;
                this.tableLoading = false;
            },
            err => {
                this.tableLoading = false;
            }
        );
    }

    onUgSelectionChange(targets) {
        // console.log(targets, 221)
        targets = targets && Array.isArray(targets) ? targets : (targets ? [targets] : []);
        let ug = targets[0];
        this.target = ug;
        this.loadData();
    }

    userSelectionChange(users) {
        // console.log(users);
        // this.selectionChange.emit(users);
    }

    _remove(e, u, v) {
        e.stopPropagation();

        if (this.disabled) {
            return;
        }

        this.selection = this.selection.filter(it => it.id != u.id);
        this._value = this.selection;
        this.onChange(this._value);
        this.remove.emit({ u, v });
    }

    clear(e) {
        e.stopPropagation();

        if (this.disabled) {
            return;
        }

        let _value = this._value;
        this.selection = [];
        this._value = [];
        this.onChange(this._value);
    }

    _ok() {
        this._refreshValue();

        this._value = this.selection;
        this.onChange(this._value);
        if (this._value.length == 0) {
            return tipMessage('请选择要添加的人员');
        }
        this.modalSubject.destroy("onOk");
        this.ok.emit(this._value);
    }

    _cancel() {
        this.modalSubject.destroy("onCancel");
        this.cancel.emit();
    }

    _tabChange({ index }) {
        this.currentTab = index;
    }

    verifyUsernames() {
        // console.log(this.inputUsernames);
        const inputUsernames = this.inputUsernames;
        this.verifyLoading = true;
        if (inputUsernames && inputUsernames.length > 0) {
            let usernames = inputUsernames.split(/,|;|:|，|；|：|\n/).map(it => it.trim()).filter(it => it.length > 0);

            this.userLookupApi.verifyUsernames(usernames).subscribe(
                result => {
                    this.usernameVerifiedResults = result;
                    this.usernameVerifiedSuccess = result.filter(it => it.result == 'OK');
                    this.usernameVerifiedError = result.filter(it => it.result != 'OK');

                    this.verifyLoading = false;
                },
                err => {
                    this.verifyLoading = false;
                }
            );
        }
    }

    _refreshValue() {
        let users = [];
        if (this.currentTab == 0) {
            users = this.usernameVerifiedSuccess ? this.usernameVerifiedSuccess.map(it => it.userInfo) : [];
        }
        if (this.currentTab == 1) {
            users = this.selection;
        }

        if (this.isSingle) {
            if (users && users.length > 0) {
                this._value = users.slice(0, 1);
            }
        } else {
            if (this.mergeType == 'merge') {
                if (users && this._value) {
                    let valueIds: any[] = this._value.map(it => it.id);
                    users = users.filter(it => !valueIds.includes(it.id));

                    this._value = this._value.concat(users);
                } else {
                    this._value = users;
                }
            } else {
                this._value = users;
            }
        }
    }
    getFullPath(value) {
        if (value) {
            if (value.indexOf(',') != -1 || value.indexOf('，') != -1) {
                return value.replace(/(\,|\，)/g, '/');
            } else {
                return value;
            }
        } else {
            return '---'
        }
    }
}
