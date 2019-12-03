import { Injectable } from '@angular/core';

@Injectable()
export class TrainingClassXType {
    public xtype: 'MANAGE' | 'ASSIST';

    constructor() { }

    get isAssist() {
        return this.xtype && this.xtype == 'ASSIST';
    }

    get isManage() {
        return !this.xtype || this.xtype == 'MANAGE';
    }
}

export function xtypeFactory(xtype): TrainingClassXType {
    const xt = new TrainingClassXType();
    xt.xtype = xtype;
    return xt;
}

export function assistXtypeFactory() {
    return xtypeFactory('ASSIST');
}

export function manageXtypeFactory() {
    return xtypeFactory('MANAGE');
}
