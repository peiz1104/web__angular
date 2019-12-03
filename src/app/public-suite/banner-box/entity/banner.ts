import { BannerBox } from "./banner-box";

export class Banner {
    id?: number;
    name?: string;
    imageUrl?: string;
    width?: number;
    height?: number;
    link?: string;
    backgroundColor?: string;
    enabled?: boolean;
    displayOrder?: number;

    // private Site site;
    bannerBox?: BannerBox;
    bannerBoxId?: number;
    siteId?: number;
    siteName?: string;
    siteShortName?: string;
}
