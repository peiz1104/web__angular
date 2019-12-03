export class Permission {
    id?: number;
    user?: { id: number, displayName?: string, userName?: string, userGroup?: {id: number, name?: string }};
    role?: { id: number, name?: string };
    privilege?: { id: number, name?: string };
    target?: { id: number, name?: string };
    createdBy?: {id: number, displayName?: string};
    createdDate?: string;
 }
