import { UserGroup } from './user-group';
import { Site } from './site';

export class User {
    id: number;
    username: string;
    password?: string;

    email?: string;
    firstName?: string;
    lastName?: string;
    displayName?: string;

    phoneNumber?: string;
    sex?: string; // enum Sex {MALE, FAMALE}
    // startDate?: Date;
    // endDate?: Date;
    startDate?: string;
    endDate?: string;
    status?: string; // enum AccountStatus {ACTIVE, LOCKED}

    userGroup?: UserGroup;
    site?: Site;

    language?: string;
}
