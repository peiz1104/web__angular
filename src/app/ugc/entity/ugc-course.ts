import { Category } from "../../system/category/entity/category";



export class UgcCourse {
    id: number;
    name: string;
    intro: string;
    imageUrl: string;
    category: Category
    chapterCount: number;
    siteId: number;
    siteName: string;

    createdDate: Date;
}
