import { CategoryGroup } from './../../entity/category-group';
import { Category } from './../../entity/category';
import { Router, ActivatedRoute } from '@angular/router';
import { CategoryService } from './../../service/category.service';
import { Component, OnInit, Inject, forwardRef } from '@angular/core';
import { CategoryGroupComponent } from '../category-group/category-group.component';

@Component({
  selector: 'spk-category-edit',
  templateUrl: './category-edit.component.html',
  styleUrls: ['./category-edit.component.scss']
})
export class CategoryEditComponent implements OnInit {

  category = new Category();
  categoryGroup: CategoryGroup;
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
    this.route.paramMap.subscribe((params) => {
      this.categoryService.getOne(+params.get('id')).subscribe(c => {
        this.category = c;
      });
    });
  }

  onSubmit(category: Category) {
    this.loading = true;
    this.categoryService.save(category).subscribe(
      ug => {
        this.loading = false;
        // tslint:disable-next-line:max-line-length
        this.categoryGroupComponent.cateTree.refresh(ug);
        this.router.navigate(['../../', 'list', { activeCategoryId: this.category.parent ? this.category.parent.id : '' }], { relativeTo: this.route });
      },
      err => { this.loading = false; }
    );
  }

}
