import { NzMessageService } from 'ng-zorro-antd';
import { UgcActivityCategory } from './../../../entity/ugc-activity-category';
import { ActivatedRoute, Router } from '@angular/router';
import { UgcActivity } from './../../../entity/ugc-activity';
import { UgcActivityCategoryService } from './../../../service/ugc-activity-category.service';
import { Course } from './../../../../learning/course/entity/course';
import { CuiLayer, Column } from 'console-ui-ng';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Pagination } from 'app/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { UgcActivityCategoryTreeComponent } from '../../../public/ugc-activity-category-tree/ugc-activity-category-tree.component';

@Component({
    selector: 'spk-ugc-activity-category',
    templateUrl: './ugc-activity-category.component.html',
    styleUrls: ['./ugc-activity-category.component.scss']
})
export class UgcActivityCategoryComponent implements OnInit {

    activityId;
    activedClassification: UgcActivityCategory;
    @ViewChild("cateTree") cateTree: UgcActivityCategoryTreeComponent
    constructor(
        private route: ActivatedRoute,
        private router: Router,
    ) { }

    ngOnInit() {
        this.route.data.subscribe((data: { ugcActivity: UgcActivity }) => {
            this.activityId = data.ugcActivity.id;
        });
    }

    edit(cgs) {
        if (cgs) {
            this.router.navigate(['ugc/activity/' + this.activityId, "category", 'list', { activeCategoryId: cgs[0].id }]);
        }
    }
}
