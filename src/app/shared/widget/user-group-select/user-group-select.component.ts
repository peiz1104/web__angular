import { TreeComponent } from 'console-ui-ng';
import { CuiTreeConfig, CuiTreeNode } from 'console-ui-ng';
import { OrgTreeApiService } from 'app/shared/api';
import { Observable } from 'rxjs/Observable';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Component, OnInit, Input, forwardRef, ViewChild, ContentChild, TemplateRef, Output, EventEmitter } from '@angular/core';
import { NzModalService, NzModalSubject } from 'ng-zorro-antd';
import * as _ from 'lodash';

@Component({
    selector: 'spk-user-group-select, spk-org-select',
    templateUrl: './user-group-select.component.html',
    styleUrls: ['./user-group-select.component.scss'],
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => UserGroupSelectComponent),
        multi: true
    }]
})
export class UserGroupSelectComponent implements OnInit, ControlValueAccessor {

    // 参数： 模式（单选/多选）、控件类型(下拉、弹框、嵌入)、权限描述、数据订阅、表单绑定、传递属性
    // 显示属性、值属性， treeConfig，

    @Input() mode: 'single' | 'multiple' = 'single';
    @Input() controlType: 'dropdown' | 'modal' | 'inline' = 'modal';
    @Input() expandedMode: 'tree' | 'flat' = 'tree';
    @Input() permissionString: string;
    @Input() dataSource: Observable<any>;
    // @Input() 传递属性
    @Input() valueProperty: string; // 或者是一个function
    @Input() labelProperty: string;
    @Input() treeConfig: any;
    @Input() objectCompare: any; // function call(a, b): boolean;
    @Input() overflow: number = 3;
    @Input() placeholder: string = '请选择组织...';
    @Input() style: any;
    @Input() permission: string[] | string = ['SYSTEM:USER_GROUP:VIEW'];
    @Input() isRegion: boolean = false; // true 时查询 总-省-地市，false 查全部
    @Input() siteSelectable: boolean = false;
    @Input() showSubSite: boolean = false;
    @Input() autoClear: boolean = false;

    @Output() selectOk: EventEmitter<any> = new EventEmitter();

    @ViewChild('tree') tree: TreeComponent;
    @ViewChild("modalTitle") modalTitle: TemplateRef<any>;
    @ViewChild("modalContent") modalContent: TemplateRef<any>;
    @ViewChild("modalFooter") modalFooter: TemplateRef<any>;

    @ContentChild('echoTpl') echoTpl: TemplateRef<any>;
    modalSubject: NzModalSubject;

    // 自定义模板

    // ngBinding
    _value: any[]; // 单个值、单个对象、值数组、对象数组
    @Input() isDisabled: boolean;
    // ngModel access
    onChange: any = Function.prototype;
    onTouched: any = Function.prototype;

    _defaultTreeConfig: CuiTreeConfig;

    expanded: boolean = false;
    treeSelection: CuiTreeNode[] = [];

    ugSearchText;
    ugSearchResult: any; // Pagination<UserGroup>;
    freeSelection: any[] = [];
    searchLoading: boolean = false;

    selection: any[] = [];

    _excludes: any[];
    @Input() set excludes(value: any[]) {
        if (!value) {
            this._excludes = [];
        } else {
            if (Array.isArray(value)) {
                this._excludes = value;
            } else {
                this._excludes = [value];
            }
        }
    };

    get excludes(): any[] {
        return this._excludes || [];
    }

    _disabled: any[];
    @Input() set disabled(value: any[]) {
        if (!value) {
            this._disabled = [];
        } else {
            if (Array.isArray(value)) {
                this._disabled = value;
            } else {
                this._disabled = [value];
            }
        }
    }

    get disabled(): any[] {
        return this._disabled || [];
    }

    constructor(private orgTreeApi: OrgTreeApiService, private modal: NzModalService) { }

    ngOnInit() {
        this._initConfig();
    }

    _initConfig() {
        this._defaultTreeConfig = {
            async: {
                enable: true,
                loadChildren: (node: CuiTreeNode): Observable<any> => {
                    return this.orgTreeApi.orgTree(node.data.id, this.permission, this.isRegion);
                },
                dataFilter: (data, node: CuiTreeNode) => {
                    if (!node.parent && node.data.virtual) {
                        if (data && data.length > 0) {
                            // data[0]['selected'] = true;
                            if (data.length == 1) {
                                data[0]['expanded'] = true;
                            }
                            // TODO: acitve value with path
                        }
                    } else {
                        if (!this.showSubSite) {
                            data = data.filter(it => it.type !== 'SITE');
                        }
                    }
                    // console.log(node);
                    if (this.isSelected(node) && this.isMultiple) {
                        //data.forEach(it => it['disabled'] = true);
                    }

                    data = data.filter(it => !this._isInExcludes(it)).map(it => {
                        if (this.isInFreeSelect(it)) {
                            it['selected'] = true;
                            this.removeFromFreeSelect(it);
                        }
                        if (it.type == 'SITE') {
                            it.icon = 'fa-sitemap text-secondary';
                            //it['selectable'] = this.siteSelectable;
                        }
                        // if (this._isInDisabled(it) || node.disabled) {
                        //    it['disabled'] = true;
                        // }
                        return it
                    });

                    return data;
                }
            },
            data: {
                key: {
                    id: this.valueProperty || 'id',
                    label: this.labelProperty || 'name',
                    children: 'children'
                }
            }
        };
    }

    _isInExcludes(ug: any) {
        return this._isInSet(ug, this.excludes);
    }

    _isInDisabled(ug: any) {
        return this._isInSet(ug, this.disabled);
    }

    _isInSet(ug: any, ugs: any[]) {
        if (!ugs || ugs.length == 0) {
            return false;
        }

        let ugsIds = ugs.map(it => it.id);
        return _.findIndex(ugsIds, ug.id) >= 0;
    }

    writeValue(value: any): void {
        if (Array.isArray(value)) {
            this._value = value;
        } else {
            this._value = value ? [value] : [];
        }
    }

    registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }

    setDisabledState?(isDisabled: boolean): void {
        this.isDisabled = isDisabled;
    }

    get isSingle() {
        return this.mode != 'multiple';
    }

    get isMultiple() {
        return this.mode == 'multiple';
    }

    openLookup() {
        this.expanded = true;
        this.modalSubject = this.modal.open({
            title: this.modalTitle,
            content: this.modalContent,
            footer: this.modalFooter,
            maskClosable: false,
            zIndex: 10001,
            width: 1000,
            onOk: () => {
            },
            onCancel: () => {
            }
        });
    }

    handleOk() {
        this.modalSubject.destroy("onOk");
        this.expanded = false;
        // this.selectOk.emit({originalEvent: event, value: this._value}); // TODO: has bugs
        let outputVal = this._value ? [...this._value] : [];
        this.selectOk.emit(outputVal);
        if (this.autoClear) {
            this.clearSelection();
        }
    }

    handleCancel() {
        this.modalSubject.destroy("onCancel");
        this.expanded = false;
        if (this.autoClear) {
            this.clearSelection();
        }
    }

    clearSelection() {
        this.tree.selection = [];
        this.selection = [];
        this.freeSelection = [];
        this.treeSelection = [];
        this._value = [];
    }

    // onSelectionChange(value: CuiTreeNode[]) {
    //   this.treeSelection = value;
    // }
    getTreeSelection() {
        let selection = this.tree.selection;
        if (_.isArray(selection)) {
            selection = selection.filter(it => {
                if (this.siteSelectable) {
                    if (it && it.parent) {
                        if (this.tree.isSelected(it.parent)) {
                            return false;
                        }
                    }
                } else {
                    if (it.data.type == 'SITE') {
                        return false;
                    }
                    if (it && it.parent && it.parent.data.type != 'SITE') {
                        if (this.tree.isSelected(it.parent)) {
                            return false;
                        }
                    }
                }
                return true;
            });
        }
        return selection;
    }

    mergeSelection(latest?) {
        let treeSel = this.treeSelection.filter(it => !it.disabled).map(it => it.data);

        // this._value = [...treeSel, ...this.freeSelection];
        let allSel = [...treeSel, ...this.freeSelection];
        allSel = _.uniqBy(allSel, 'id');
        // console.log(this._value);
        this._value = allSel;

        if (this.isSingle) {
            this._value = latest ? [latest] : (this._value ? this._value.slice(0, 1) : []);
            this.onChange(this._value && this._value.length > 0 ? this._value[0] : null);
        } else {
            this.onChange(this._value);
        }
        // this.onChange(this._value); // 兼容以前的写法，暂时都返回数组
    }

    onNodeSelect(e) {
        // console.log('onNodeSelect', e.node);
        this.treeSelection = this.getTreeSelection();
        //this.propagateDisabled(e.node, true);
        this.mergeSelection(e.node.data);
    }

    onNodeUnselect(e) {
        // console.log('unselect', e.node);
        this.treeSelection = this.getTreeSelection();
        //this.propagateDisabled(e.node, false);
        this.mergeSelection(e.node.data);
    }

    propagateDisabled(node: CuiTreeNode, disabled: boolean) {
        if (!this.isMultiple) {
            return;
        }
        if (node.children && node.children.length > 0) {
            for (let child of node.children) {
                child.disabled = disabled;
                if (!this.isSelected(child)) {
                    this.propagateDisabled(child, disabled);
                }
            }
        }
    }

    isSelected(node: CuiTreeNode) {
        return this.tree.isSelected(node);
    }

    unselect(ug) {
        this.freeSelection = this.freeSelection.filter(it => it.id != ug.id);

        this.treeSelection = this.treeSelection.filter(it => it.id != ug.id);
        this.tree.selection = this.treeSelection;
        this.mergeSelection();
    }

    onUserGroupSearch(searchText) {
        if (searchText) {
            this.searchLoading = true;
            this.orgTreeApi.search(searchText, 0, 20, this.permission, this.isRegion).subscribe(
                ugs => {
                    console.log(ugs)
                    this.ugSearchResult = ugs;
                    this.searchLoading = false;
                },
                err => {
                    this.searchLoading = false;
                }
            )
        } else {
            this.ugSearchResult = null;
        }
    }

    onFreeSelect(ug) {
        console.log('onFreeSelect', ug)
        let node = this.tree.getNodeById(ug.id);
        console.log(node);
        if (node) {
            this.tree.selectNode(node);
        } else {
            this.freeSelection = this.freeSelection ? [...this.freeSelection, ug] : [ug];
            this.mergeSelection(ug);
        }
    }

    isInFreeSelect(ug): boolean {
        return this.freeSelection.some(it => it.id == ug.id);
    }

    addToFreeSelect(ug) {
        this.freeSelection = this.freeSelection ? [...this.freeSelection, ug] : [ug];
    }

    removeFromFreeSelect(ug) {
        this.freeSelection = this.freeSelection.filter(it => it.id != ug.id);
    }
    clearAllSelection() {
        this.clearSelection();
    }

    freeSelectAll() {
        if (this.searchLoading) {
            return;
        }

        if (!this.ugSearchText || !(this.ugSearchResult && this.ugSearchResult.content && this.ugSearchResult.content.length > 0)) {
            return;
        }

        let ugs = this.ugSearchResult.content;
        ugs.forEach(ug => {
            let node = this.tree.getNodeById(ug.id);
            if (node) {
                this.tree.selectNode(node);
            }
        });
        this.freeSelection = this.freeSelection ? [...this.freeSelection, ...ugs] : [...ugs];
        this.mergeSelection();
    }
}
