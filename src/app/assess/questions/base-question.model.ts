import { Option } from './option.model';
import { LeftQuestion } from './left-question.model';
export class QuestionBase {
    id: number;
    name: string;
    description: string;
    innerDescription: any;
    displayOrder: number;
    // 单选  多选 单项填空 多选填空 矩阵单选 矩阵多选 矩阵填空
    // 'SINGLE'|'MULTIPLE'|'SINGLE_FILL'|'MULTIPLE_FILL'|'MATRIX_SINGLE'|'MATRIX_MULTIPLE'|'MATRIX_FILL'
    type: string;
    options: Option[];
    questions: QuestionBase[];
    required: boolean;
    displayOptionNum: number;
    isBordered: boolean;
    isView: boolean;
    isShow: boolean;
    leftQuestions: LeftQuestion[];

    avgScore: number;

    hasDesc: boolean;
    hasHighEdit: boolean;
    isEdit: boolean; // 当前试题操作状态
    qList: any[];
    constructor(opt: {
        id?: number,
        name?: string,
        description?: string,
        innerDescription?: any,
        displayOrder?: number,
        type?: string
        options?: Option[],
        questions?: QuestionBase[],
        parent?: QuestionBase;
        required?: boolean,
        hasHighEdit?: boolean;
        jumpTo?: number,
        jumpNum?: number,
        displayOptionNum?: number,
        isBordered?: boolean,
        isView?: boolean,
        isShow?: boolean,
        isEdit?: boolean,
        logicQuestion?: number,
        logicOption?: string,
        qList?: any[],
        leftQuestions?: LeftQuestion[],
        avgScore?: number,
    } = {}) {
        this.id = opt.id || null;
        this.name = opt.name || '';
        this.description = opt.description || '';
        this.innerDescription = opt.innerDescription || '';
        this.displayOrder = opt.displayOrder || 0;
        this.type = opt.type || 'SINGLE';
        this.options = opt.options || [];
        this.questions = opt.questions || [];
        this.required = !!opt.required;
        this.hasHighEdit = !!opt.hasHighEdit;
        this.displayOptionNum = opt.displayOptionNum || 1;
        this.isBordered = opt.isBordered || false;
        this.isView = opt.isView || false;
        this.isShow = opt.isShow || true;
        this.hasDesc = this.description == '' ? false : true;
        this.isEdit = !!opt.isEdit;
        this.qList = opt.qList || [];
        this.leftQuestions = opt.leftQuestions || [];
        this.avgScore = opt.avgScore || 0;
    }

    getOptionView() {
        this.displayOptionNum = +this.displayOptionNum;
        let a_len = this.options.length;
        let result = [];
        for (let i = 0; i < a_len; i += this.displayOptionNum) {
            result.push(this.options.slice(i, i + this.displayOptionNum));
        }
        return result;
    }
}
