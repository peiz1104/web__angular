import { CategoryGroup } from './../../entity/category-group';
import { Category } from './../../entity/category';
import { NgForm } from '@angular/forms';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'spk-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss']
})
export class CategoryFormComponent implements OnInit {

  @Input() category: Category;
  @Input() loading: boolean;
  @Input() categoryGroup: CategoryGroup;

  @Output() doSubmit = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  onSubmit(f: NgForm) {
    if (this.category && this.category.name) {
      this.category.categoryGroup = this.categoryGroup;
      this.doSubmit.emit(this.category);
    }
  }
}
