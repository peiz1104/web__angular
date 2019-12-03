export class RelevantLogic {
    id: number;
    optionId: number;
    optionQuestionId: number;
    questionId: number;
    paperId: number;
    constructor(opt: {
        id?: number,
        optionId?: number;
        optionQuestionId?: number;
        questionId?: number;
        paperId?: number;

      } = {}) {
      this.id = opt.id || null;
      this.optionId = opt.optionId || null;
      this.optionQuestionId = opt.optionQuestionId || null;
      this.questionId = opt.questionId || null;
      this.paperId = opt.paperId || null;
    }
}
