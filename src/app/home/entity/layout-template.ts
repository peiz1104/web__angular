import { Site } from "app/system/entity/site";

export class LayoutTemplate {
    id?: number;
    name?: string;
    isDefault?: boolean;

    siteId?: number;
    siteName?: string;
    siteShortName?: string;

    isPublished?: boolean;

    createdById?: number;
    createdDate?: Date;
    lastModifiedById?: number;
    lastModifiedDate?: Date;
}
