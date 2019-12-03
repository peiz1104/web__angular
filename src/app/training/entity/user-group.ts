
export class UserGroup {
    id: number;
    name: string;
    code: string;
    description?: string;
    regionType?: string;
    hasChildren?: boolean;
    parent?: UserGroup;

    fullPath?: number[];
    pullName?: string[];

    parents: UserGroup[]; // 已废弃

    idPath: string;
    namePath: string;
}
