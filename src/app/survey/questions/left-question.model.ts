import { Option } from './option.model';
export class LeftQuestion {
    id: number;
    name: string;
    type: string;
    displayOrder: number;
    options: Option[];
    constructor(opt: {
        id?: number,
        name?: string,
        type?: string,
        displayOrder?: number,
        options?: Option[]
    } = {}) {
        this.id = opt.id || null;
        this.name = opt.name || '';
        this.type = opt.type;
        this.displayOrder = opt.displayOrder === undefined ? 1 : opt.displayOrder;
        this.options = opt.options || [];
    }
}
