import { Component } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, map, take, takeUntil } from 'rxjs';
import { AuthenticationService } from 'src/app/share/authentication.service';
import { GenericService } from 'src/app/share/generic.service';

@Component({
  selector: 'app-direccion-index',
  templateUrl: './direccion-index.component.html',
  styleUrls: ['./direccion-index.component.css']
})
export class DireccionIndexComponent {
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
        this.listaDirecciones(this.currentUser.user.id_usuario)
      }
    })
  }


  listaDirecciones(id_usuario: number) {
    this.getDirecionDeUsuario(id_usuario)
      .subscribe((direcciones: any[]) => {
        this.gService.list('direccion')
          .pipe(
            map((data: any[]) => {
              return direcciones.length > 0
                ? data.filter(todoDireccion => direcciones.some(direccion => direccion.id_direccion === todoDireccion.id_direccion))
                : data.filter(todoDireccion => todoDireccion.id_usuario === id_usuario)
            })
          )
          .subscribe((filteredData: any[]) => {
            console.log(filteredData);
            this.datos = filteredData;
          })
      })
    // this.gService.list('direccion/')
    // .pipe(takeUntil(this.destroy$))
    // .subscribe((data:any)=>{
    // console.log(data);
    // this.datos=data;
    // });
  }

  getDirecionDeUsuario(id_usuario: any) {
    return this.gService.list('direccion/')
      .pipe(
        takeUntil(this.destroy$),
        map((data: any[]) => data.filter(direccion => direccion.id_usuario === id_usuario))
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

  crearDireccion() {
    this.router.navigate(['/direccion/create'], {
      relativeTo: this.route,
    });
  }


}
