import { Item } from './item';
import { User } from 'app/system/entity/user';

export class CertType {
    id: number;
    name: string;
    items: Item[];
    lastModifiedDate: Date;
    createdByDisplayName: string;
    identify: string;
}
