export class Option {
    id: number;
    leftQuestionId: number;
    name: string;
    score: number;
    imgPath: string;
    description: string;
    innerDescription: any;
    displayOrder: number;
    allowedFill: boolean;
    required: boolean;
    defaultOpt: boolean;
    content: string;
    constructor(opt: {
        id?: number,
        leftQuestionId?: number,
        name?: string,
        score?: number,
        imgPath?: string,
        description?: string,
        innerDescription?: any,
        displayOrder?: number,
        allowedFill?: boolean,
        required?: boolean,
        defaultOpt?: boolean,
        content?: string
    } = {}) {
        this.id = opt.id || null;
        this.leftQuestionId = opt.leftQuestionId || null;
        this.name = opt.name || '';
        this.score = opt.score || null;
        this.imgPath = opt.imgPath || '';
        this.description = opt.description || '';
        this.innerDescription = opt.innerDescription || '';
        this.displayOrder = opt.displayOrder === undefined ? 1 : opt.displayOrder;
        this.required = !!opt.required;
        this.allowedFill = !!opt.allowedFill;
        this.defaultOpt = !!opt.defaultOpt;
        this.content = opt.content || '';
    }
}
