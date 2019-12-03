import { Component, OnInit, Input, Output, ViewChild, TemplateRef, EventEmitter, ChangeDetectorRef, ContentChild } from '@angular/core';
import { Pagination } from '../../../core/entity/pagination';
import { LogicGroup } from '../../../system/entity/logic-group';
import { LogicGroupService } from '../../../system/service/logic-group.service';
import { NzMessageService, NzModalSubject, NzModalService } from 'ng-zorro-antd';
import { ControlValueAccessor, FormGroup, FormBuilder } from '@angular/forms';
import { Subject } from 'rxjs/Subject';
import { AuthService } from "../../../core/auth/auth.service";
import { tipMessage } from 'app/account/entity/message-tip';

@Component({
    selector: 'spk-logic-group-select',
    templateUrl: './logic-group-select.component.html',
    styleUrls: ['./logic-group-select.component.scss']
})
export class LogicGroupSelectComponent implements OnInit {

    columns = [
        { title: '名称', data: 'name' },
        { title: '所属组织', tpl: 'userGroup' },
        { title: '创建人', data: 'createdByDisplayName', styleClass: "text-center" },
        { title: '创建日期', tpl: "createdDate", styleClass: "text-center" },
    ];
    logicGroups: Pagination<LogicGroup>;
    selection: LogicGroup[];
    loading: boolean = false;
    searchText;

    userGroupId;
    userGroupIds;
    isCreate: boolean;       // 用于判断添加还是修改用户组信息
    logicGroup: LogicGroup;  // 用于编辑用户组信息


    @Input() showSourceType: boolean = false; // 仅能通过afterSelected事件接受返回的值
    @Input() mode: 'single' | 'multiple' = 'multiple';
    @Input() submitted: Subject<boolean>;
    submitting: boolean = false;

    @ViewChild("lookupDialog") lookupDialog: TemplateRef<any>;
    @ContentChild('echoTpl') echoTpl: TemplateRef<any>;
    @Output() selectOk = new EventEmitter();


    err;


    searchForm: FormGroup;

    modalSubject: NzModalSubject;

    @Input() disabled: boolean;
    value: LogicGroup | LogicGroup[];
    onModelChange: Function = () => { };
    onModelTouched: Function = () => { };


    constructor(
        private cd: ChangeDetectorRef,
        private message: NzMessageService,
        private modal: NzModalService,
        private fb: FormBuilder,
        private logicGroupService: LogicGroupService,
        private authService: AuthService,
    ) { }

    ngOnInit() {
        this.authService.getCurrentUser().subscribe(
            user => {
                if (user.managerGroup) {
                    this.userGroupIds = [user.managerGroup];
                }
                this.loadList();
            })
    }

    writeValue(value: any): void {
        this.value = value;
        this.cd.markForCheck();
    }

    registerOnChange(fn: any): void {
        this.onModelChange = fn;
    }

    registerOnTouched(fn: any): void {
        this.onModelTouched = fn;
    }

    setDisabledState?(isDisabled: boolean): void {
        this.disabled = isDisabled;
    }

    openLookup() {

        this.modalSubject = this.modal.open({
            title: '选择用户组',
            content: this.lookupDialog,
            width: 1000,
            footer: false,
            zIndex: 1003
        });

        this.initSearchForm();
        this.selection = [];
        this.loadList();
    }


    initSearchForm() {
        this.searchForm = this.fb.group({
            searchText: [],
            userGroupIds: []
        });
    }

    // loadList(params?: any, page?: any) {
    loadList(page?: any) {
        this.loading = true;
        this.selection = null;
        let params = {
            name: this.searchText,
            page: page ? page.number : 0,
            size: page ? page.size : '',
            sort: 'lastModifiedDate,desc',
            isPutout: true
        };
        console.log(this.searchText);
        console.log(params);
        if (this.userGroupIds) {
            params['userGroupIds'] = this.userGroupIds.map(it => it.id);
        }
        this.logicGroupService.getAllOfPage(params).subscribe(
            groups => {
                this.logicGroups = groups; this.loading = false;
            },
            err => {
                this.loading = false
            }
        );
    }

    _submitSearchForm(e, v) {
        this.loadList();
    }

    ok(e) {
        if (this.getSelection()) {
            this.value = this.getSelection();
            this.selectOk.emit(this.value);
            this.onModelChange(this.value);
        } else {
            tipMessage('请选择至少一个用户组', 'warning');
            return;
        }
        if (this.submitted) {
            this.submitting = true;
            this.submitted.subscribe(
                () => {
                    this.submitting = false;
                    this.modalSubject.destroy('onOk');
                },
                err => {
                    this.submitting = false;
                    this.modalSubject.destroy('onOk');
                }
            );
        } else {
            this.modalSubject.destroy('onOk');
        }
    }

    cancel(e) {
        this.modalSubject.destroy('onCancel');
    }

    getSelection(): LogicGroup | LogicGroup[] {
        if (this.selection && this.selection.length > 0) {
            return this.mode == 'multiple' ? this.selection : this.selection[0];
        }
    }
    getFullNamePath(value) {
        if (value) {
            if (value.indexOf(',') != -1 || value.indexOf('，') != -1) {
                return value.replace(/\,|\，/g, '/');
            } else {
                return value;
            }
        } else {
            return '---'
        }
    }
}
