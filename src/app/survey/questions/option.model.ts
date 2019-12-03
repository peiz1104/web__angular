export class Option {
    id: number;
    leftQuestionId: number;
    name: string;
    imgPath: string;
    description: string;
    innerDescription: any;
    displayOrder: number;
    allowedFill: boolean;
    required: boolean;
    defaultOpt: boolean;
    jumpTo: number;
    jumpNum: number;
    constructor(opt: {
        id?: number,
        leftQuestionId?: number,
        name?: string,
        imgPath?: string,
        description?: string,
        innerDescription?: any,
        displayOrder?: number,
        allowedFill?: boolean,
        required?: boolean,
        defaultOpt?: boolean
        jumpTo?: number;
        jumpNum?: number;
      } = {}) {
      this.id = opt.id || null;
      this.leftQuestionId = opt.leftQuestionId || null;
      this.name = opt.name || '';
      this.imgPath = opt.imgPath || '';
      this.description = opt.description || '';
      this.innerDescription = opt.innerDescription || '';
      this.displayOrder = opt.displayOrder === undefined ? 1 : opt.displayOrder;
      this.required = !!opt.required;
      this.allowedFill = !!opt.allowedFill;
      this.defaultOpt = !!opt.defaultOpt;
      this.jumpTo = opt.jumpTo;
      this.jumpNum = opt.jumpNum;
    }
}
