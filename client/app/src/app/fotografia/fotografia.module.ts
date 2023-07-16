import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FotografiaRoutingModule } from './fotografia-routing.module';
import { FotografiaIndexComponent } from './fotografia-index/fotografia-index.component';
import { FotografiaFormComponent } from './fotografia-form/fotografia-form.component';


@NgModule({
  declarations: [
    FotografiaIndexComponent,
    FotografiaFormComponent
  ],
  imports: [
    CommonModule,
    FotografiaRoutingModule
  ]
})
export class FotografiaModule { }
