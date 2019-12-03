import { AuthzService } from './authz.service';

import {
    Directive, EmbeddedViewRef, Input, OnChanges, SimpleChange,
    SimpleChanges, TemplateRef, ViewContainerRef, HostBinding
} from '@angular/core';

@Directive({
    selector: '[spkAuthzIf]'
})
export class AuthzIfDirective {
    private _context: AuthzContext = new AuthzContext();
    private _thenTemplateRef: TemplateRef<AuthzContext> | null = null;
    private _elseTemplateRef: TemplateRef<AuthzContext> | null = null;
    private _thenViewRef: EmbeddedViewRef<AuthzContext> | null = null;
    private _elseViewRef: EmbeddedViewRef<AuthzContext> | null = null;

    // @Input() spkAuthzIf: string;
    // @HostBinding('class.authzed') _hasPrivilege = false;
    // @HostBinding('class.unauthzed') _nothHavePrivilege = true;
    _roles: string[];
    _permissions: string[];

    constructor(private _viewContainer: ViewContainerRef, private authzService: AuthzService, templateRef: TemplateRef<AuthzContext>) {
        this._thenTemplateRef = templateRef;
    }


    @Input()
    set spkAuthzIf(condition: any) {
        // console.log(condition)
        this._context.$implicit = this._context.spkAuthzIf = condition;
        if (condition instanceof Object) {
            if (Object.keys(condition).some(it => it == 'hasPermission' || it == 'hasAnyPermission')) {
                this._permissions = condition['hasPermission'] || condition['hasAnyPermission'];
            }
        }
        this._updateView();
    }

    @Input()
    set spkAuthzIfThen(templateRef: TemplateRef<AuthzContext>) {
        this._thenTemplateRef = templateRef;
        this._thenViewRef = null;  // clear previous view if any.
        this._updateView();
    }

    @Input()
    set spkAuthzIfElse(templateRef: TemplateRef<AuthzContext>) {
        this._elseTemplateRef = templateRef;
        this._elseViewRef = null;  // clear previous view if any.
        this._updateView();
    }

    // 有某个角色
    @Input()
    set spkAuthzIfHasRole(privs: string[] | string) {
    }

    // 有某个角色
    @Input()
    set spkAuthzIfHasAnyRoles(privs: string[] | string) {
    }

    // 没有角色
    @Input()
    set spkAuthzIfLacksRole(privs: string[] | string) {
    }

    @Input()
    set spkAuthzIfHasPermission(privs: string[] | string) {
        const permissions = Array.isArray(privs) ? privs : privs.split(' ');
        this._permissions = permissions.filter(p => !!p);
        this._updateView();
    }

    @Input()
    set spkAuthzIfHasAnyPermission(privs: string[] | string) {
        const permissions = Array.isArray(privs) ? privs : privs.split(' ');
        this._permissions = permissions.filter(p => !!p);
        this._updateView();
    }

    @Input()
    set spkAuthzIfLacksPermission(privs: string[] | string) {
    }

    @Input()
    set spkAuthzIfLacksAnyPermission(privs: string[] | string) {
    }

    private _updateView() {
        if (this._permissions && this._permissions.length > 0) {
            this.authzService.hasAnyPermission(this._permissions).subscribe(
                hasPermission => {
                    // console.log(this._permissions, hasPermission, 5556)
                    this._outputView(hasPermission);
                }
            );
        }
    }

    private _outputView(hasPrivilege: boolean) {
        if (hasPrivilege) {
            if (!this._thenViewRef) {
                this._viewContainer.clear();
                this._elseViewRef = null;
                if (this._thenTemplateRef) {
                    this._thenViewRef =
                        this._viewContainer.createEmbeddedView(this._thenTemplateRef, this._context);
                }
            }
        } else {
            if (!this._elseViewRef) {
                this._viewContainer.clear();
                this._thenViewRef = null;
                if (this._elseTemplateRef) {
                    this._elseViewRef =
                        this._viewContainer.createEmbeddedView(this._elseTemplateRef, this._context);
                }
            }
        }
    }
}

export class AuthzContext {
    public $implicit: any = null;
    public spkAuthzIf: any = null;
}
