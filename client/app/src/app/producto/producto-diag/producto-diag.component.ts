import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Subject, map, takeUntil } from 'rxjs';
import { GenericService } from 'src/app/share/generic.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/share/authentication.service';


@Component({
  selector: 'app-producto-diag',
  templateUrl: './producto-diag.component.html',
  styleUrls: ['./producto-diag.component.css']
})

export class ProductoDiagComponent implements OnInit {
  datos: any;
  isAutenticated: boolean;
  currentUser: any;
  mensaje:boolean;
  datosDialog: any;
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    @Inject(MAT_DIALOG_DATA) data, private router: Router,
    private route: ActivatedRoute,
    private dialogRef: MatDialogRef<ProductoDiagComponent>,
    private gService: GenericService, public dialog: MatDialog,private authService: AuthenticationService
  ) {
    this.datosDialog = data;
  }

  ngOnInit(): void {
    //Suscripción a la información del usuario actual
    this.authService.currentUser.subscribe((x) => (this.currentUser = x))
    //Suscripción al booleano que indica si esta autenticado
    this.authService.isAuthenticated.subscribe(
      (valor) => (this.isAutenticated = valor)
    )
    if (this.datosDialog.id_producto) {
      this.obtenerProducto(this.datosDialog.id_producto);
    }

    if (this.currentUser && this.currentUser.user.detalle_usuarioTipo) {
      //SI TIENE 2 TIPOS DE USUARIOS
       if (this.currentUser.user.detalle_usuarioTipo.length === 2) {
         //CLIENTE Y VENDEDOR
         if (
           this.currentUser.user.detalle_usuarioTipo[0].id_tipoUsuario === 2 &&
           this.currentUser.user.detalle_usuarioTipo[1].id_tipoUsuario === 3
         ) {
          
           this.mensaje = true;
         } else {
          
           this.mensaje= false;
         }
       } 
         // SI TIENE 1 TIPO DE USUARIO
       else if (this.currentUser.user.detalle_usuarioTipo.length === 1) {
         // VENDEDOR
         if (this.currentUser.user.detalle_usuarioTipo[0].id_tipoUsuario === 2) {
           this.mensaje = false;
          
           
         } 
         //ADMINISTRADOR
         else if (this.currentUser.user.detalle_usuarioTipo[0].id_tipoUsuario === 1) {
           
           this.mensaje = false;
          
         }
         //CLIENTE
         else {
           this.mensaje = true;
          
         }
       } else {
         // No cumple ningún caso, reiniciar los valores
         this.mensaje = false;
        
       }
     } else {
       // Usuario no autenticado, reiniciar los valores
       this.mensaje = false;
      
     }
  }

  obtenerProducto(id: any) {
    this.gService
      .get('producto', id)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        this.datos = data;
        console.log(data);
      });
  }

  crearMensaje() {
    if (this.currentUser.user.detalle_usuarioTipo.length === 2) {
      const secondDetalle = this.currentUser.user.detalle_usuarioTipo[1];
      if (secondDetalle.id_tipoUsuario === 3) {
        this.router.navigate(['/mensajeria-vendedor/create'], {
          relativeTo: this.route,
          queryParams: { id_producto: this.datosDialog.id_producto }
        });
      } else {
        this.router.navigate(['/mensajeria-vendedor/create'], {
          relativeTo: this.route,
          queryParams: { id_producto: this.datosDialog.id_producto }
        });
      }
    } else {
      const firstDetalle = this.currentUser.user.detalle_usuarioTipo[0];
      if (firstDetalle.id_tipoUsuario === 3) {
        this.router.navigate(['/mensajeria-cliente/create'], {
          relativeTo: this.route,
          queryParams: { id_producto: this.datosDialog.id_producto }
        });
      } else {
        this.router.navigate(['/mensajeria-vendedor/create'], {
          relativeTo: this.route,
          queryParams: { id_producto: this.datosDialog.id_producto }
        });
      }
    }
     
    this.close();
  }

  // editarFotografia(){
  // this.router.navigate(['/fotografia/'], {
  // relativeTo: this.route,
  // queryParams: { id_producto: this.datosDialog.id_producto }
  // });
  // this.close();
  // }

  close() {
    this.dialogRef.close();
  }

}
