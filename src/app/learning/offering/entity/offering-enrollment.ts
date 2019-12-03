export type EnrollStatus = 'ENROLLED' | 'APPLIED' | 'REFUSED';
export type EnrollType = 'CLOSED' | 'OPEN' | 'REQUIRED';

export class OfferingEnrollment {

    id?: number;
    offeringId?: number;

    userId?: number;
    userUsername?: string;
    userDisplayName?: string;
    userUserGroupName?: string;

    enrollStatus?: EnrollStatus;
    enrollType?: EnrollType;

    reason?: string;
    approverId?: number;
    approverUsername?: string;
    approverDisplayName?: string;
    approverDate?: Date;

    createdById?: number;
    createdByUsername?: string;
    createdByDisplayName?: string;
    createdDate?: Date;

    lastModifiedById?: number;
    lastModifiedByUsername?: string;
    lastModifiedByDisplayName?: string;
    lastModifiedDate?: Date;
}
