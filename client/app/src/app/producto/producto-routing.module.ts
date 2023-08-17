import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProductoAllComponent } from './producto-all/producto-all.component';
import { ProductoDetailComponent } from './producto-detail/producto-detail.component';
import { ProductoFormComponent } from './producto-form/producto-form.component';
import { ProductoIndexComponent } from './producto-index/producto-index.component';
import { AuthGuard } from '../share/guards/auth.guard';

const routes: Routes = [
    {path: 'producto', component: ProductoIndexComponent},
    {path: 'producto/all' , canActivate:[AuthGuard], data:{roles:[2],}, component: ProductoAllComponent},
    {path: 'producto/create', canActivate:[AuthGuard], data:{roles:[2],}, component: ProductoFormComponent},
    {path: 'producto/:id', canActivate:[AuthGuard], data:{roles:[2],},component: ProductoDetailComponent},
    {path: 'producto/update/:id', canActivate:[AuthGuard], data:{roles:[2],}, component: ProductoFormComponent}
];

@NgModule({
imports: [RouterModule.forChild(routes)],
exports: [RouterModule]
})

export class ProductoRoutingModule { }



// canActivate:[AuthGuard], data:{roles:[2],}
