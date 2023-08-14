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
