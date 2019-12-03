import { UserLookupApiService, UsernameVerifiedResult } from './../../api/user-lookup-api.service';
import { CuiPagination, Column } from 'console-ui-ng';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import {
    Component, OnInit, AfterViewInit, forwardRef,
    Input, Output, EventEmitter, ContentChild, TemplateRef, ViewChild
} from '@angular/core';
import { NzModalService, NzModalSubject, NzMessageService } from 'ng-zorro-antd';
import { tipMessage } from 'app/account/entity/message-tip';

@Component({
    selector: 'spk-chinalife-public-user-lookup',
    templateUrl: './chinalife-public-user-lookup.component.html',
    styleUrls: ['./chinalife-public-user-lookup.component.scss'],
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => ChinalifePublicUserLookupComponent),
        multi: true
    }]
})
export class ChinalifePublicUserLookupComponent implements OnInit, AfterViewInit, ControlValueAccessor {
    @Input() selectionType: any;
    @Input() mode: 'single' | 'multiple' = 'multiple';
    @Input() placeholder: string = '请选择用户...';
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
        { title: '性别', data: 'sex', tpl: 'sex' },
        { title: '所属组织', data: 'userGroup.name', visible: true },
        { title: '开始日期', data: 'startDate', visible: false },
        { title: '到期日期', data: 'endDate', visible: false },
        { title: '状态', data: 'status', tpl: 'statusCol' }
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

    // 监考
    @Input() set JK(value: boolean) {
        this.mergeType = 'merge';
    }
    constructor(
        private modal: NzModalService,
        private userLookupApi: UserLookupApiService,
        private message: NzMessageService
    ) { }
    ngAfterViewInit() {
        if (this.echoTpl) {
            return;
        } else {
            // 设置回显列表模板
            // 设置回显列表项模板
        }
    }
    ngOnInit() {
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
        this.currentTab = 0;
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

            /* if (this.target['type'] == 'USER_GROUP') {
              params['userGroup.id'] = this.target['id'];
            } */
        }

        this.tableLoading = true;
        this.userLookupApi.users(null, params).map(_page => {
            if (_page && _page.content) {
                _page.content.forEach(it => {
                    it.checked = this._value && this._value.some(v => v.id == it.id);
                    it.checkable = !it.checked;
                });
            }
            return _page;
        }).subscribe(
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
        // console.log(targets)
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

        this.onChange(this._value);
        if (this._value.length == 0) {
            return tipMessage('无人员可添加');
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

      //  blur搜索
      blurSearch(event) {
        this.searchUserMethod();
    }
    // keydown搜索
    keydownSearch(event) {
        if (event.keyCode == 13) {
            this.searchUserMethod();
        }

    }
    deleteUser(event, value) {
        event.stopPropagation ? event.stopPropagation() : event.cancelBubble = true
        // console.log(value, this.usernameVerifiedSuccess);
        this.usernameVerifiedSuccess = this.usernameVerifiedSuccess.filter((item) => {
            return item.userInfo.id != value.userInfo.id
        })
    }
    deleteErrorUser(event, value) {
        event.stopPropagation ? event.stopPropagation() : event.cancelBubble = true
        let deleteArray = [];
        deleteArray = this.usernameVerifiedError.filter((item) => {
            return item.username != value.username
        })
        this.usernameVerifiedError = deleteArray;
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

     // 搜索人员方法
     searchUserMethod() {
        const inputUsernames = this.inputUsernames.replace(/^\s*|\s*$/g, '');
        if (inputUsernames && inputUsernames.length > 0) {
            let usernames = inputUsernames.split(/,|;|:|，|；|：|\n/).map(it => it.trim()).filter(it => it.length > 0);

            this.userLookupApi.verifyUsernames(usernames).subscribe(
                result => {
                    this.usernameVerifiedResults = result;
                    this.usernameVerifiedSuccess = result.filter(it => it.result == 'OK');
                    this.usernameVerifiedError = result.filter(it => it.result != 'OK');
                },
                err => {
                    tipMessage(err);
                }
            );
        } else {
            return tipMessage('请输入要添加的用户');
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
}
