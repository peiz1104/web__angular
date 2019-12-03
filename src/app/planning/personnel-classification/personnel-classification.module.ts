import { NgModule } from '@angular/core';
import { SharedModule } from './../../shared/shared.module';
import { PersonnelClassificationListComponent } from './views/personnel-classification-list/personnel-classification-list.component';
import { PersonnelClassificationRoutingModule } from './personnel-classification-routing.module';
import { PersonnelClassificationAddComponent } from './views/personnel-classification-add/personnel-classification-add.component';
import { PersonnelClassificationEditComponent } from './views/personnel-classification-edit/personnel-classification-edit.component';
import { PersonnelClassificationService } from './service/personnel-classification.service';

@NgModule({
  imports: [
    SharedModule,
    PersonnelClassificationRoutingModule,
  ],
  // tslint:disable-next-line:max-line-length
  declarations: [PersonnelClassificationListComponent, PersonnelClassificationAddComponent, PersonnelClassificationEditComponent],
  providers: [PersonnelClassificationService],
})
export class PersonnelClassificationModule { }
