import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductoRoutingModule } from './producto-routing.module';
import { ProductoAllComponent } from './producto-all/producto-all.component';
import { ProductoDetailComponent } from './producto-detail/producto-detail.component';
import { ProductoDiagComponent } from './producto-diag/producto-diag.component';
import { ProductoFormComponent } from './producto-form/producto-form.component';
import { ProductoIndexComponent } from './producto-index/producto-index.component';


@NgModule({
  declarations: [
    ProductoAllComponent,
    ProductoDetailComponent,
    ProductoDiagComponent,
    ProductoFormComponent,
    ProductoIndexComponent
  ],
  imports: [
    CommonModule,
    ProductoRoutingModule
  ]
})
export class ProductoModule { }
