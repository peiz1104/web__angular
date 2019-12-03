import { CategoryGroup } from './../../entity/category-group';
import { Router, ActivatedRoute } from '@angular/router';
import { CategoryService } from './../../service/category.service';
import { Category } from './../../entity/category';
import { Component, OnInit, Inject, forwardRef } from '@angular/core';
import { CategoryGroupComponent } from '../category-group/category-group.component';

@Component({
  selector: 'spk-category-add',
  templateUrl: './category-add.component.html',
  styleUrls: ['./category-add.component.scss']
})
export class CategoryAddComponent implements OnInit {

  category = new Category();
  categoryGroup: CategoryGroup;
  parentId: string;
  err;
  loading: boolean = false;

  constructor(private categoryService: CategoryService,
    private router: Router,
    private route: ActivatedRoute,
    @Inject(forwardRef(() => CategoryGroupComponent)) private categoryGroupComponent: CategoryGroupComponent
  ) { }

  ngOnInit() {
    this.route.data
      .subscribe((data: { categoryGroup: CategoryGroup }) => {
        console.log('categoryGroup', data.categoryGroup);
        this.categoryGroup = data.categoryGroup;
      });
    this.route.paramMap.subscribe(
      params => {
        this.parentId = params.get('parentId');
        if (this.parentId) {
          this.categoryService.getOne(this.parentId).subscribe(
            parent => this.category.parent = parent
          );
        }
      }
    );
  }

  onSubmit(category: Category) {
    this.loading = true;
    this.categoryService.save(category).subscribe(
      ug => {
        this.loading = false;
        // tslint:disable-next-line:max-line-length
        this.categoryGroupComponent.cateTree.refresh(this.category.parent, false);
        this.router.navigate(['../', 'list', { activeCategoryId: this.category.parent ? this.category.parent.id : '' }], { relativeTo: this.route });
      },
      err => { this.loading = false; }
    );
  }

}
