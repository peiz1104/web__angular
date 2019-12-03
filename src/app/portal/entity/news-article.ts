export class NewsArticle {
    id?: number;
    title?: string;
    author?: string;
    keywords?: string;
    thumbnail?: string;
    summary?: string;
    content?: string;
    flags?: string[];
    startDate?: Date;
    endDate?: Date;

    // private Site site;
    siteId?: number;
    siteName?: string;
    siteShortName?: string;

    newsGroupId?: number;
    newsGroupName?: string;

    isPublished?: boolean;
    publisherId?: number;
    publisherUsername?: string;
    publisherDisplayName?: string;
    publishedDate?: Date;

    createdById?: number;
    createdByUsername?: string;
    createdByDisplayName?: string;
    createdDate?: Date;
    lastModifiedById?: number;
    lastModifiedByUsername?: string;
    lastModifiedByDisplayName?: string;
    lastModifiedDate?: Date;

    viewCount?: number;
}
