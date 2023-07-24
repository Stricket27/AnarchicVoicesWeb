import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FotografiaRoutingModule } from './fotografia-routing.module';
import { FotografiaFormComponent } from './fotografia-form/fotografia-form.component';

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
import { FotografiaAllComponent } from './fotografia-all/fotografia-all.component';

@NgModule({
  declarations: [
    FotografiaFormComponent,
    FotografiaAllComponent,
  ],
  imports: [
    CommonModule,
    FotografiaRoutingModule,

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
  ]
})
export class FotografiaModule { }
