export class Course {
    id: number;
    name: string;
    imageUrl: string;
    imgurl: string;
    positionTable: number;
    constructor(opt: {
        id?: number;
        name?: string;
        imageUrl?: string;
        imgurl?: string;
        positionTable?: number;
    } = {}) {
        this.id = opt.id || null;
        this.name = opt.name || '';
        this.imageUrl = opt.imageUrl || '';
        this.imgurl = opt.imageUrl || '';
        this.positionTable = opt.positionTable || null;
    }
}
