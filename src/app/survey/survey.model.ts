import { UserGroup } from "app/system/entity/user-group";
export class Survey {
    id: number;
    name: string;
    description: string;
    startDate: string;
    endDate: string;
    userGroup: UserGroup;
    type: string;
    isPublished: boolean;

    imageUrl;
}
