import { CategoryGroup } from './category-group';
export class Category {
    id: number;
    name: string;
    categoryGroup: CategoryGroup;
    description?: string;

    hasChildren?: boolean;
    parent?: Category;
    fullPath?: number[];
    pullName?: string[];
}
