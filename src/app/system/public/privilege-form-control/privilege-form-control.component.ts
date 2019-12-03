import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Privilege } from './../../entity/privilege';
import { RoleService } from './../../service/role.service';
import { Component, OnInit, forwardRef } from '@angular/core';
import { AuthzService } from 'app/shared/authz/authz.service';

@Component({
    selector: 'spk-privilege-form-control',
    templateUrl: './privilege-form-control.component.html',
    styleUrls: ['./privilege-form-control.component.scss'],
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => PrivilegeFormControlComponent),
        multi: true
    }]
})
export class PrivilegeFormControlComponent implements OnInit, ControlValueAccessor {

    _data: Privilege[];
    _modules: Privilege[];

    _value: any[] = [];
    onChange: any = Function.prototype;
    onTouched: any = Function.prototype;
    disabled: boolean;
    arrowArray: any[] = [];

    constructor(private roleApi: RoleService, private authzService: AuthzService) { }

    ngOnInit() {
        // this.loadData();
    }

    writeValue(value: any): void {
        this._value = value;
        this.loadData();
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

    loadData() {
        this.roleApi.getPrivilegeTree().subscribe(
            data => {
                this._data = data;
                this.parseData();
            }
        );
    }

    parseData() {
        if (!this._data) {
            return;
        }

        let privs = this._data.filter(it => !!it.identifier).map(it => {
            it['path'] = it.identifier.split(':')
            it['checked'] = this._value && this._value.some(i => i.id == it.id);
            it['value'] = it.id;
            it['label'] = it.name;
            it['disabled'] = !this.authzService._hasAnyPermission(it.identifier + ':*');
            return it;
        });

        this._modules = this._parseDeepin(privs);
    }

    _parseDeepin(privs: any[], parents?: any[]) {
        if (!parents) {
            let roots = privs.filter(it => it.path.length == 1);
            parents = roots;
        }
        if (parents) {
            parents.forEach(it => {
                it.children = privs.filter(i => i.path.length == it.path.length + 1 && i.identifier.startsWith(it.identifier + ':'));
                if (it.children) {
                    it.children.forEach(child => {
                        child.parent = it;
                    });
                    this._parseDeepin(privs, it.children);
                }
            });
        }

        privs.forEach(it => {
            if (!it.children && it.parent) {
                this.updateSingleChecked(it.parent);
            }
        });

        return parents;
    }

    updateAllChecked(curr) {
        let checked = curr.checked;
        curr.indeterminate = false;
        if (curr.children) {
            curr.children.forEach(it => {
                it.checked = checked;
                if (it.children) {
                    this.updateAllChecked(it);
                }
            });
        }

        if (curr.parent) {
            this.updateSingleChecked(curr.parent);
        }
    }

    updateSingleChecked(pare) {
        if (pare.children.every(it => !it.checked && !it.indeterminate)) {
            pare.checked = false;
            pare.indeterminate = false;
        } else if (pare.children.every(it => !!it.checked)) {
            pare.checked = true;
            pare.indeterminate = false;
        } else {
            pare.checked = false;
            pare.indeterminate = true;
        }

        if (pare.parent) {
            this.updateSingleChecked(pare.parent);
        }

    }

    //   onItemChange(curr, isSingle?) {
    //     if (isSingle) {
    //       this.updateSingleChecked(curr);
    //     } else {
    //       this.updateAllChecked(curr);
    //     }

    onItemChange(curr, isSingle) {
        event.stopPropagation();
        // console.log(curr, isSingle, 231);
        if (isSingle) {
            this.updateSingleChecked(curr);
        } else {
            this.updateAllChecked(curr);
        }

        this._value = this._data.filter(it => it['checked']);
        this.onChange(this._value);
    }
    openclose(value) {
        if (this.arrowArray.indexOf(value.id) != -1) {
            this.arrowArray = this.arrowArray.filter((item) => {
                return item != value.id;
            })
        } else {
            this.arrowArray.push(value.id);
        }
        // console.log(value.id, this.arrowArray, 44);
    }
}
