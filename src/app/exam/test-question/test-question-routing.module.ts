/*
 * @Author: mozhengqian
 * @Date: 2017-11-01 17:52:38
 * @Last Modified by: mozhengqian
 * @Last Modified time: 2017-11-15 15:15:06
 */
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TestListComponent } from './views/test-list/test-list.component';
import { TestAddComponent } from './views/test-add/test-add.component';
import { TestLibraryComponent } from './views/test-library/test-library.component';
// tslint:disable-next-line:max-line-length
import { TestReadingcomprehensionQuestionsListComponent } from './views/test-readingcomprehension-questions-list/test-readingcomprehension-questions-list.component';
import { TestEditComponent } from './views/test-edit/test-edit.component';
import { TestHisComponent } from './views/test-his/test-his.component';


const routes: Routes = [
  { path: '', redirectTo: 'list', pathMatch: 'full' },
  {
    path: 'list', component: TestListComponent
  },
  { path: 'rqList/:queId', component: TestReadingcomprehensionQuestionsListComponent },
  {
    path: 'library', component: TestLibraryComponent
  },
  {
    path: 'add', component: TestAddComponent
  },
  {
    path: 'edit/:queId', component: TestEditComponent
  },
  {
    path: 'his', component: TestHisComponent
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TestQuestionRoutingModule { }

export const routedComponents = [
  TestListComponent,
  TestAddComponent,
  TestLibraryComponent,
  TestReadingcomprehensionQuestionsListComponent
];
