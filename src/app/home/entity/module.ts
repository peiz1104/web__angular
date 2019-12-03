import { LayoutTemplate } from './layout-template';
export class Module {
    id?: number;
    name?: string;
    moduleType?: string;
    displayOrder?: number;
    isPublished?: boolean;
    rotationType?: string;
    moreArticle?: boolean;
    layoutModuleTemplate?: number;
    layout?: LayoutTemplate;
}
