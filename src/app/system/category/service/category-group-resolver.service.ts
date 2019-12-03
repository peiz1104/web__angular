import { CategoryGroup } from './../entity/category-group';
import { CategoryGroupService } from './category-group.service';
import { Resolve, Router, ActivatedRoute, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';

/**
 * 分类管理功能处理器， 根据分组标识查找分组，
 * 如果分组存在则返回分组对象，默认返回第一个分组对象
 * @export
 * @class CategoryGroupResolver
 * @implements {Resolve<CategoryGroup>}
 */
@Injectable()
export class CategoryGroupResolver implements Resolve<CategoryGroup> {
    constructor(private cgs: CategoryGroupService, private router: Router) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<CategoryGroup> {
        let identifier = route.paramMap.get('identifier');
        let categoryGroup: CategoryGroup;
        if (!identifier) {
            return this.cgs.getAll().toPromise().then(categoryGroups => {
                if (categoryGroups && categoryGroups.length > 0) {
                    this.router.navigate(['/system/category-group', categoryGroups[0].identifier, 'list']);
                    categoryGroup =  categoryGroups[0];
                    return categoryGroup;
                } else { // 如果分类组为空，跳转到分组添加页面
                    // this.router.navigate(['add'], {relativeTo: route});
                    return null;
                }
            });
        } else {
            return this.cgs.getByIdentifier(identifier).toPromise().then(
                cg => {
                    // debugger;
                    categoryGroup = cg;
                    return categoryGroup;
                }
            );
        }
    }
}
