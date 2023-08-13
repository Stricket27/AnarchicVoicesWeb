import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';

import { UserAllComponent } from './user-all/user-all.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { UserFormComponent } from './user-form/user-form.component';
import { UserIndexComponent } from './user-index/user-index.component';
import { UserCreateComponent } from './user-create/user-create.component';
import { UserLoginComponent } from './user-login/user-login.component';

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

import { MatTabsModule} from '@angular/material/tabs';

import { LayoutModule } from '@angular/cdk/layout';
import { MatChipsModule} from '@angular/material/chips';

@NgModule({
  declarations: [
    UserAllComponent,
    UserDetailComponent,
    UserFormComponent,
    UserIndexComponent,
    UserCreateComponent,
    UserLoginComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,

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
    MatTabsModule,
    MatChipsModule,

    LayoutModule,

    ReactiveFormsModule, //Gestionar Formularios
  ]
})
export class UserModule { }
