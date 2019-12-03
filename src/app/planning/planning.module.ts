import { NgModule } from '@angular/core';
import { SharedModule } from './../shared/shared.module';
import { PlanningRoutingModule } from './../planning/planning-routing.module';
import { PersonClassificationListComponent } from './person-classification/views/person-classification-list/person-classification-list.component';
import { PersonClassificationAddComponent } from './person-classification/views/person-classification-add/person-classification-add.component';
import { PersonClassificationFromComponent } from './person-classification/public/person-classification-from/person-classification-from.component';
import { PersonClassificationSelectComponent } from './person-classification/public/person-classification-select/person-classification-select.component';
import { PersonClassificationService } from './person-classification/service/person-classification.service';
import { PersonClassificationTreeComponent } from './person-classification/public/person-classification-tree/person-classification-tree.component';
import { PersonClassificationEditComponent } from './person-classification/views/person-classification-edit/person-classification-edit.component';
import { PersonClassificationActivedResolver } from 'app/planning/person-classification/service/person-classification-actived-resolver.service';
import { PersonClassificationDetailResolver } from 'app/planning/person-classification/service/person-classification-detail-resolver.service';

@NgModule({
    imports: [
        SharedModule,
        PlanningRoutingModule,
    ],
    declarations: [
        PersonClassificationListComponent,
        PersonClassificationAddComponent,
        PersonClassificationFromComponent,
        PersonClassificationSelectComponent,
        PersonClassificationTreeComponent,
        PersonClassificationEditComponent,
    ],
    providers: [
        PersonClassificationService,
        PersonClassificationActivedResolver,
        PersonClassificationDetailResolver,
    ],
})
export class PlanningModule { }
