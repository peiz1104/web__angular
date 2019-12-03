import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { CategoryGroupService } from './../../service/category-group.service';
import { CategoryGroup } from './../../entity/category-group';
import { Component, OnInit, Output, EventEmitter, OnChanges, ViewChild } from '@angular/core';
import { CategoryTreeComponent } from '../category-tree/category-tree.component';


@Component({
    selector: 'spk-category-group',
    templateUrl: './category-group.component.html',
    styleUrls: ['./category-group.component.scss']
})
export class CategoryGroupComponent implements OnInit {

    categoryGroups: CategoryGroup[];
    activeCategoryGroup: CategoryGroup;
    defaultCategoryGroup: CategoryGroup;
    identifier;

    @ViewChild("cateTree") cateTree: CategoryTreeComponent

    constructor(private categoryGroupService: CategoryGroupService, private router: Router,
        private route: ActivatedRoute) { }

    ngOnInit() {
        this.identifier = this.route.snapshot.params.identifier;
        this.categoryGroupService.getAll().subscribe(
            obj => {
                this.categoryGroups = obj;
            }
        );

        this.route.params.subscribe((data: { identifier: string }) => {
            // this.activeCategoryGroup
            this.categoryGroupService.getByIdentifier(data.identifier).subscribe(
                cg => { this.activeCategoryGroup = cg; this.identifier = this.activeCategoryGroup.identifier }
            );
        });
    }
    showCategory(categoryGroup: CategoryGroup) {
        this.categoryGroups.forEach((e, index) => {
            e.isCurrent = false;
        });
        this.activeCategoryGroup = categoryGroup;
        this.activeCategoryGroup.isCurrent = true;
    }

    edit(cgs) {
        console.log(cgs)
        if (cgs) {
            this.router.navigate(['/system/category-group', this.identifier, 'list', { activeCategoryId: cgs[0].id }]);
        }
    }
}
