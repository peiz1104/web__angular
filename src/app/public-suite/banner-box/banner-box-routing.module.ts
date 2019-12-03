import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BannerBoxComponent } from './views/banner-box/banner-box.component';

const routes: Routes = [
    { path: '', component: BannerBoxComponent },
];
export class NoticeBoxRoutingModule { }

export const routedComponents = [BannerBoxComponent];
