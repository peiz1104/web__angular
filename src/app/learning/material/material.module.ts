import { MaterialService } from './service/material.service';
import { SharedModule } from 'app/shared';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialPreviewComponent } from './views/material-preview/material-preview.component';
import { MaterialEditComponent } from './views/material-edit/material-edit.component';
import { MaterialAddComponent } from './views/material-add/material-add.component';
import { MaterialsListComponent } from './views/materials-list/materials-list.component';
import { MaterialFormComponent } from './views/material-form/material-form.component';
import { DocumentInfoService } from '../../library/service/documentInfo.service';

@NgModule({
    imports: [
        SharedModule,
    ],
    declarations: [
        MaterialsListComponent,
        MaterialAddComponent,
        MaterialEditComponent,
        MaterialPreviewComponent,
        MaterialFormComponent,
    ],
    entryComponents: [
        MaterialAddComponent,
        MaterialEditComponent,
        MaterialPreviewComponent,
    ],
    providers: [
        MaterialService,
    	DocumentInfoService
    ],
    exports: [
        MaterialsListComponent,
        MaterialFormComponent,
        MaterialAddComponent,    ]
})
export class MaterialModule { }
