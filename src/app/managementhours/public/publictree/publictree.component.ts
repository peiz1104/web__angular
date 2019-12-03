import { Component, OnInit, Input, forwardRef, ViewChild, ContentChild, TemplateRef, Output, EventEmitter } from '@angular/core';
import { TreeComponent } from 'console-ui-ng';
import { CuiTreeConfig, CuiTreeNode } from 'console-ui-ng';
import { Observable } from 'rxjs/Observable';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { HourService } from '../../managementservice/hour.service';

@Component({
    selector: 'spk-publictree',
    templateUrl: './publictree.component.html',
    styleUrls: ['./publictree.component.scss'],
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => PublictreeComponent),
        multi: true
    }]
})
export class PublictreeComponent implements OnInit, ControlValueAccessor {
    // 参数： 模式（单选/多选）、控件类型(下拉、弹框、嵌入)、权限描述、数据订阅、表单绑定、传递属性
    // 显示属性、值属性， treeConfig，

    @Input() treeType: string;
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
    @Input() placeholder: string = '请选择分类...';
    @Input() style: any;
    @Input() permission: string[] | string = ['SYSTEM:USER_GROUP:VIEW'];
    @Input() isRegion: boolean = false; // true 时查询 总-省-地市，false 查全部

    @Input() autoClear: boolean = false;
    @Output() selectOk: EventEmitter<any> = new EventEmitter();

    @ViewChild('tree') tree: TreeComponent;

    @ContentChild('echoTpl') echoTpl: TemplateRef<any>;

    _value: any[]; // 单个值、单个对象、值数组、对象数组
    isDisabled: boolean;
    // ngModel access
    onChange: any = Function.prototype;
    onTouched: any = Function.prototype;

    _defaultTreeConfig: CuiTreeConfig;

    expanded: boolean = false;
    treeSelection: CuiTreeNode[] = [];

    ugSearchText;
    ugSearchResult: any; // Pagination<UserGroup>;
    freeSelection: any[] = [];

    selection: any[] = [];
    constructor(
        private hourservice: HourService
    ) { }

    ngOnInit() {
        this._initConfig();
    }
    // 初始化
    _initConfig() {
        this._defaultTreeConfig = {
            async: {
                enable: true,
                loadChildren: (node: CuiTreeNode): Observable<any> => {
                    let url;
                    if (this.treeType == 'traintype') {
                        url = '/api/period/traintype/all';
                    } else if (this.treeType == "traintheme") {
                        url = '/api/period/traintheme/list';
                    } else if (this.treeType == 'trainmode') {
                        url = '/api/period/trainwey/list';
                    } else if (this.treeType == "trainsource") {
                        url = '/api/period/trainsource/list'
                    } else {
                        url = '/api/userGroups'
                    }
                    return this.hourservice.orgTree(url, node.data.id, this.permission, this.isRegion);
                },
                dataFilter: (data, node: CuiTreeNode) => {
                    // console.log(data, 245)
                    let treedata = data.content || data;
                    if (!node.parent && node.data.virtual) {
                        if (treedata && treedata.length > 0) {
                            // data[0]['selected'] = true;
                            // data[0]['expanded'] = true;
                            // TODO: acitve value with path
                        }
                    }
                    // console.log(node);
                    if (this.isSelected(node) && this.isMultiple) {
                        treedata.forEach(it => it['disabled'] = true);
                    }

                    treedata.forEach(it => {
                        if (this.isInFreeSelect(it)) {
                            it['selected'] = true;
                            this.removeFromFreeSelect(it);
                        }
                    });
                    return treedata;
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

    // 
    openLookup() {
        this.expanded = true;
    }

    handleOk() {
        this.expanded = false;
        // this.selectOk.emit({originalEvent: event, value: this._value}); // TODO: has bugs
        let outputVal = this._value ? [...this._value] : [];
        this.selectOk.emit(outputVal);
        if (this.autoClear) {
            this.clearSelection();
        }
    }

    handleCancelModal() {
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
        return this.tree.selection;
    }

    mergeSelection(latest?) {
        let treeSel = this.treeSelection.filter(it => !it.disabled).map(it => it.data);

        // this._value = [...treeSel, ...this.freeSelection];
        let allSel = [...treeSel, ...this.freeSelection];
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
        this.propagateDisabled(e.node, true);
        this.mergeSelection(e.node.data);
    }

    onNodeUnselect(e) {
        // console.log('unselect', e.node);
        this.treeSelection = this.getTreeSelection();
        this.propagateDisabled(e.node, false);
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
            this.hourservice.search(searchText, 0, 20, this.permission, this.isRegion).subscribe(
                ugs => {
                    this.ugSearchResult = ugs;
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

}
