/*
 * @Author: majunfeng
 * @Date: 2017-11-02 18:25:35
 * @Last Modified by: kxx
 * @Last Modified time: 2017-11-25 14:03:54
 */
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { ExamListComponent } from "./views/exam-list/exam-list.component";
import { ExamAddComponent } from "./views/exam-add/exam-add.component";
import { ExamEditComponent } from "./views/exam-edit/exam-edit.component";
import { ExamAllotComponent } from "./views/exam-allot/exam-allot.component";
import { ExamConditionComponent } from "./views/exam-condition/exam-condition.component";
import { ExamGradeComponent } from "./views/exam-grade/exam-grade.component";
import { ExamDetailResolver } from "./service/examination-resolver";
import { ExamPersonComponent } from "./views/exam-person/exam-person.component";
import { ExamInfoComponent } from "./views/exam-info/exam-info.component";
import { CanDeactivateGuard } from "../service/can-deactivate-guard.service";
import { ExamReviewComponent } from "./views/exam-review/exam-review.component";
import { ReviewPapersFrameComponent } from "./views/review-papers-frame/review-papers-frame.component";
import { ExamNewAllotComponent } from "./views/exam-new-allot/exam-new-allot.component";
import { ExamAddGroupComponent } from "./views/exam-add-group/exam-add-group.component";
const routes: Routes = [
  { path: "", redirectTo: "list", pathMatch: "full" },
  { path: "list", component: ExamListComponent },
  { path: "add/:siteId", component: ExamAddComponent },
  {
    path: "edit/:exam_id",
    component: ExamEditComponent,
    resolve: { examination: ExamDetailResolver },
    children: [
      {
        path: "",
        children: [
          { path: "", redirectTo: "add", pathMatch: "full" },
          { path: "add", component: ExamAddComponent },
          { path: "allot", component: ExamAllotComponent },
          { path: "newAllot", component: ExamNewAllotComponent },
          { path: "condition", component: ExamConditionComponent },
          { path: "person", component: ExamPersonComponent },
          { path: "grade", component: ExamGradeComponent },
          {
            path: "info",
            component: ExamInfoComponent,
            canDeactivate: [CanDeactivateGuard]
          },
          { path: "review", component: ExamReviewComponent },
          { path: "addGroup", component: ExamAddGroupComponent }
        ]
      }
    ]
  },
  {
    path: "papers/:uceId",
    component: ReviewPapersFrameComponent
  },
  { path: "allot", component: ExamAllotComponent },
  { path: "condition", component: ExamConditionComponent },
  { path: "newAllot", component: ExamNewAllotComponent },
  { path: ":id/addGroup", component: ExamAddGroupComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExaminationRoutingModule { }

export const routedComponents = [
  ExamListComponent,
  ExamAddComponent,
  ExamEditComponent,
  ExamAllotComponent,
  ExamConditionComponent,
  ExamGradeComponent,
  ExamPersonComponent,
  ExamInfoComponent
];
