import { Option } from './option.model';
import { LeftQuestion } from './left-question.model';
import { RelevantLogic } from './relevant-logic.model';
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
    leftQuestions: LeftQuestion[];
    parent: QuestionBase;
    required: boolean;
    hasLogic: boolean;
    relevantLogic: RelevantLogic[];
    jumpTo: number;
    jumpNum: number;
    displayOptionNum: number;
    isBordered: boolean;
    isView: boolean;
    isShow: boolean;
    logicQuestion: number; // 关联的题目
    logicOption: string; // 关联的选项

    hasJump: boolean;
    hasDesc: boolean;
    hasHighEdit: boolean;
    hasOptionJump: boolean;
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
        leftQuestions?: LeftQuestion[],
        parent?: QuestionBase;
        required?: boolean,
        hasLogic?: boolean,
        hasHighEdit?: boolean;
        relevantLogic?: RelevantLogic[],
        jumpTo?: number,
        jumpNum?: number,
        displayOptionNum?: number,
        isBordered?: boolean,
        isView?: boolean,
        isShow?: boolean,
        isEdit?: boolean,
        logicQuestion?: number,
        logicOption?: string,
        qList?: any[]
    } = {}) {
        this.id = opt.id || null;
        this.name = opt.name || '';
        this.description = opt.description || '';
        this.innerDescription = opt.innerDescription || '';
        this.displayOrder = opt.displayOrder || 0;
        this.type = opt.type || 'SINGLE';
        this.options = opt.options || [];
        this.questions = opt.questions || [];
        this.leftQuestions = opt.leftQuestions || [];
        this.parent = opt.parent || null;
        this.required = !!opt.required;
        this.hasLogic = !!opt.hasLogic;
        this.hasHighEdit = !!opt.hasHighEdit;
        this.relevantLogic = opt.relevantLogic || [];
        this.jumpTo = opt.jumpTo || null;
        this.jumpNum = opt.jumpNum || null;
        this.displayOptionNum = opt.displayOptionNum || 1;
        this.isBordered = opt.isBordered || false;
        this.isView = opt.isView || false;
        this.isShow = opt.isShow || true;
        this.hasJump = this.jumpTo > 0 ? true : false;
        this.hasDesc = this.description == '' ? false : true;
        this.hasOptionJump = !!this.options.find(o => o.jumpTo > 0);
        this.isEdit = !!opt.isEdit;
        this.logicQuestion = opt.logicQuestion || 0;
        this.logicOption = opt.logicOption || null;
        this.qList = opt.qList || [];
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
