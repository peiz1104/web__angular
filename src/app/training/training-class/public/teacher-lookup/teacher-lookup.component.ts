import { CuiPagination, Column } from 'console-ui-ng';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import {
    Component, OnInit, AfterViewInit, DoCheck, forwardRef,
    Input, Output, EventEmitter, ContentChild, TemplateRef, ViewChild
} from '@angular/core';
import { NzModalService, NzModalSubject } from 'ng-zorro-antd';
import { TrainingClassApiService } from '../../../service/training-class-api.service';

@Component({
    selector: 'spk-teacher-lookup',
    templateUrl: './teacher-lookup.component.html',
    styleUrls: ['./teacher-lookup.component.scss'],
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => TeacherLookupComponent),
        multi: true
    }]
})
export class TeacherLookupComponent implements OnInit, AfterViewInit, ControlValueAccessor {
    @Input() mode: 'single' | 'multiple' = 'multiple';
    @Input() placeholder: string = '请选择讲师...';
    @Input() overflow: number = 16;
    @Input() offeringId: any;
    @Input() api: string;
    @Input() userListApiUrl: string;
    @Input() ZC: boolean;
    @Input() JK: boolean;
    @Input() privileges: string | string[] = ['SYSTEM:USER:VIEW'];
    @Input() hideDelete: boolean;
    @Input() selectionType: any;
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
        { title: '用户名', data: 'username' },
        { title: '姓名', data: 'displayName' },
        { title: '邮箱', data: 'email' },
        { title: '所属组织', tpl: 'userGroup' },
        // { title: '讲师级别', tpl: 'teacherLevel' },

    ];

    searchtext;
    teacherType;
    searchname;
    isComplexSearch = false;

    target: any;
    tableLoading: boolean = false;
    selection: any[] = [];

    isRemoveBreak;
    constructor(
        private modal: NzModalService,
        private teacherLookupApi: TrainingClassApiService
    ) { }

    ngOnInit() {
    }
    // ngDoCheck() {
    //     if (this.selection.length) {
    //         // 判断是不是没有选择
    //         let iscancelAll = this.judgecancelAll(this.selection);
    //         if (iscancelAll) {
    //             this.selection = [];
    //         } else {
    //             this.selection = this.getchecked(this.selection);
    //         }
    //     }
    // }
    ngAfterViewInit() {
        if (this.echoTpl) {
            return;
        } else {
            // 设置回显列表模板
            // 设置回显列表项模板
        }
    }
    // 判断是不是全部取消
    judgecancelAll(array: any[]) {
        return array.every((item, index) => {
            return item.checked == false
        })
    }
    // 又取消也有没有取消的处理
    getchecked(array: any[]) {
        let nocancel = [];
        array.map((item, index) => {
            if (item.checked) {
                nocancel.push(item)
            }
        })
        return nocancel;
    }
    writeValue(value: any): void {
        // console.log(value)
        this._value = value;
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
        if (this.isRemoveBreak) {
            this.isRemoveBreak = false;
            return;
        }
        if (this.ZC && this._value.length > 0) {
            return;
        }
        this.loadData();
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
        // console.log(page);
        let userGroupIds;
        if (this.teacherType) {
            userGroupIds = this.getuserGroupIds(this.teacherType)
        }
        let params = {
            // 'userGroup.id': this.userGroup && this.userGroup.id ? this.userGroup.id : '',
            displayName: this.searchtext,
            username: this.searchname,
            page: page ? page.number : 0,
            size: page ? page.size : 10
        };
        if (this.offeringId) {
            params['offeringId'] = this.offeringId;
        }
        if (this.api && this.api.indexOf('user') !== -1) {
            params['orgIds'] = userGroupIds
        }
        if (this.api && this.api.indexOf('lower-user') !== -1) {
            params['userGroupId'] = userGroupIds
        }
        if (!this.api) {
            params['userGroupId'] = userGroupIds
        }
        this.tableLoading = true;
        this.teacherLookupApi.localtraffic(this.api, params).subscribe(
            pag => {
                // console.log(pag, 354)
                this.pagination = pag;
                this.users = pag.content;
                this.tableLoading = false;
                this.selection = [];
            }
        );
    }
    userSelectionChange(users) {
        // console.log(users);
        // this.selectionChange.emit(users);
    }
    // 获取组织ids的方法
    getuserGroupIds(array: any[]) {
        let ids = [];
        array.map((item, index) => {
            ids.push(item.id)
        })
        return ids;
    }
    _remove(e, u, v) {
        e.stopPropagation();
        // this.isRemoveBreak = true; // TODO: 临时方案待优化
        // this.selection = this.selection.filter(it => it.id != u.id);
        // this._value = this.selection;
        // this.onChange(this._value);
        // console.log(u, v, 23456);
        if (this.JK) {
            for (let i = 0; i < v.length; i++) {
                if (v[i].id == u.id) {
                    v.splice(i, 1);
                }
            }
        }
        if (this._value.length) {
            this._value = v.filter((item, index) => {
                return item.id !== u.id;
            })
        }
        this.ok.emit(this._value);
        this.remove.emit({ u, v });
    }

    _ok() {
        if (!this.JK) {
            this._value = this.selection;
            this.onChange(this._value);
            this.teacherType = undefined;
            this.searchtext = undefined;
            this.searchname = undefined;
            this.modalSubject.destroy("onOk");
            this.ok.emit(this._value);
        } else {
            if (this.selection && this._value) {
                for (let i = 0; i < this._value.length; i++) {
                    // tslint:disable-next-line:no-unused-expression
                    if (this._value[i].userId) { this._value[i].id = this._value[i].userId; }
                    for (let n = 0; n < this.selection.length; n++) {
                        if (this._value[i].id == this.selection[n].id) {
                            console.log(i, n, 'heh')
                            this.selection.splice(n, 1);
                            break;
                        }
                    }
                }
                this._value = this._value.concat(this.selection);
            } else {
                this._value = this.selection;
            }
            this.onChange(this._value);
            this.teacherType = undefined;
            this.searchtext = undefined;
            this.selection = [];
            this.modalSubject.destroy("onOk");
            this.ok.emit(this._value);
        }
    }

    _cancel() {
        this.modalSubject.destroy("onCancel");
        this.teacherType = undefined;
        this.searchtext = undefined;
        this.searchname = undefined;
        this.selection = [];
        this.cancel.emit();
    }
}
