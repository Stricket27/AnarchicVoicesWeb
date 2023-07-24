import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FotografiaAllComponent } from './fotografia-all/fotografia-all.component';
import { FotografiaDetailComponent } from './fotografia-detail/fotografia-detail.component';
import { FotografiaFormComponent } from './fotografia-form/fotografia-form.component';

const routes: Routes = [
  {path: 'fotografia/all', component: FotografiaAllComponent},
  {path: 'fotografia/:id', component: FotografiaDetailComponent},
  {path: 'fotografia/create', component: FotografiaFormComponent},
  {path: 'fotografia/update/:id', component: FotografiaFormComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FotografiaRoutingModule { }
