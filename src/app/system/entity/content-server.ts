export class ContentServer {
    id?: number;
    name?:string;
    scheme?: 'http'|'https'|null;
    host?: string;
    ip?: string;
    port?:number;
    maxNumber?:number;
    physicalDirectory?: string;
    virtualDirectory?: string;
    useSecureFtp?:boolean;
    enabled?:boolean;
    isDefault?:boolean;
    isDeleted?:boolean;
 }