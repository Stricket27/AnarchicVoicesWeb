import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DireccionFormComponent } from './direccion-form/direccion-form.component';
import { DireccionIndexComponent } from './direccion-index/direccion-index.component';

const routes: Routes = [

{path: 'direccion', component: DireccionIndexComponent},
{path: 'direccion/create', component: DireccionFormComponent},
{path: 'direcion/update/id', component: DireccionFormComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DireccionRoutingModule { }
