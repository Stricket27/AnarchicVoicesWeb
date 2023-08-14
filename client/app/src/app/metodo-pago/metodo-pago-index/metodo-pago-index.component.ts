import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subject, map, take, takeUntil } from 'rxjs';
import { AuthenticationService } from 'src/app/share/authentication.service';
import { GenericService } from 'src/app/share/generic.service';
import { NotificacionService, TipoMessage } from 'src/app/share/notification.service';

@Component({
  selector: 'app-metodo-pago-index',
  templateUrl: './metodo-pago-index.component.html',
  styleUrls: ['./metodo-pago-index.component.css']
})
export class MetodoPagoIndexComponent {
  usuariosCargados = false;
  usuarios: any[];
  datos: any;
  currentUser: any;
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private router: Router,
    private route: ActivatedRoute,
    private gService: GenericService,
    private dialog: MatDialog,
    private authService: AuthenticationService
  ) { }

  ngAfterViewInit(): void {
    this.listaUsuarios();

    this.authService.currentUser.subscribe((user) => {
      this.currentUser = user;
      console.log(this.currentUser)
      if (this.currentUser) {
        this.listaMetodoPago(this.currentUser.user.id_usuario)
      }
    })
  }

  listaMetodoPago(id_usuario: number) {
    this.getMetodoPagoDeUsuario(id_usuario)
      .subscribe((metodoPagos: any[]) => {
        this.gService.list('metodoPago')
          .pipe(
            map((data: any[]) => {
              return metodoPagos.length > 0
                ? data.filter(todoMetodoPago => metodoPagos.some(metodoPago => metodoPago.id_metodoPago === todoMetodoPago.id_metodoPago))
                : data.filter(todoMetodoPago => todoMetodoPago.id_usuario === id_usuario)
            })
          )
          .subscribe((filteredData: any[]) => {
            console.log(filteredData);
            this.datos = filteredData;
          })
      })
  }

  getMetodoPagoDeUsuario(id_usuario: any) {
    return this.gService.list('metodoPago/')
      .pipe(
        takeUntil(this.destroy$),
        map((data: any[]) => data.filter(metodoPago => metodoPago.id_usuario === id_usuario))
      );
  }

  getNombreUsuario(id: number): string {
    if (this.usuariosCargados) {
      const usuario = this.usuarios.find(u => u.id_usuario === id);
      return usuario ? usuario.nombre + " " + usuario.apellidos : '';
    } else {
      return '';
    }
  }

  listaUsuarios() {
    this.gService.list('user/')
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        console.log(data);
        this.usuarios = data;
        console.log(this.usuarios)
        this.usuariosCargados = true;
      });
  }

  crearMetodoPago() {
    this.router.navigate(['/metodoPago/create'], {
      relativeTo: this.route,
    });
  }











}
