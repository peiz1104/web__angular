import { NgModule } from '@angular/core';
import { SharedModule } from './../../shared/shared.module';
import { AnnualplanListComponent } from './views/annualplan-list/annualplan-list.component';
import { AnnualPlanRoutingModule } from './annualplan-routing.module';
import { AnnualplanService } from './service/annualplan.service';
import { AnnualplanAddComponent } from './views/annualplan-add/annualplan-add.component';
import { AnnualplanFormComponent } from './public/annualplan-form/annualplan-form.component';
import { AnnualplanDetailComponent } from './views/annualplan-detail/annualplan-detail.component';
import { AnnualplanEditComponent } from './views/annualplan-edit/annualplan-edit.component';
import { AnnualplanDetailResolverService } from './service/annualplan-detail-resolver.service';
import { LastYearPlanService } from './service/lastyearplan.service';
import { AccountService } from 'app/account/service/account.service';
@NgModule({
    imports: [
        SharedModule,
        AnnualPlanRoutingModule,
    ],
    // tslint:disable-next-line:max-line-length
    declarations: [AnnualplanListComponent, AnnualplanAddComponent, AnnualplanFormComponent, AnnualplanDetailComponent, AnnualplanEditComponent],
    providers: [AnnualplanService, AnnualplanDetailResolverService, LastYearPlanService, AccountService],
})
export class AnnualplanModule { }
