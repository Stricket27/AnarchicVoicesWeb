import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductoRoutingModule } from './producto-routing.module';
import { ProductoAllComponent } from './producto-all/producto-all.component';
import { ProductoDetailComponent } from './producto-detail/producto-detail.component';
import { ProductoDiagComponent } from './producto-diag/producto-diag.component';
import { ProductoFormComponent } from './producto-form/producto-form.component';
import { ProductoIndexComponent } from './producto-index/producto-index.component';

import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card'; 
import { MatIconModule } from '@angular/material/icon'; 
import { MatButtonModule } from '@angular/material/button'; 
import { MatDividerModule} from '@angular/material/divider';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';  
import { MatMenuModule } from '@angular/material/menu';
import { MatDialogModule} from "@angular/material/dialog";
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { ReactiveFormsModule } from '@angular/forms';
import { CurrencyPipe } from '@angular/common';
import { NgxDropzoneModule } from 'ngx-dropzone';

import { CarouselModule } from 'ngx-bootstrap/carousel';
import { MatChipsModule} from '@angular/material/chips';

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
    ProductoRoutingModule,

    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatDividerModule,
    MatDialogModule,
    MatInputModule,
    MatSelectModule,
    MatRadioModule,
    ReactiveFormsModule,
    NgxDropzoneModule,
    CarouselModule,
    MatChipsModule
  ],
  providers:[
    CurrencyPipe
  ]
})
export class ProductoModule { }
