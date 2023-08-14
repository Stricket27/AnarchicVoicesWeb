import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

import { Subject, map, takeUntil } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { GenericService } from 'src/app/share/generic.service';
import { AuthenticationService } from 'src/app/share/authentication.service';

@Component({
  selector: 'app-producto-all',
  templateUrl: './producto-all.component.html',
  styleUrls: ['./producto-all.component.css']
})
export class ProductoAllComponent {
  usuarios: any[];
  usuariosCargados = false;
  categorias: any[];
  categoriasCargadas = false;
  datos: any;
  currentUser: any;
  destroy$: Subject<boolean> = new Subject<boolean>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  dataSource = new MatTableDataSource<any>();
  displayedColumns = ['producto', 'precio', 'cantidad', 'id_usuario', 'acciones'];

  constructor(private router: Router,
    private route: ActivatedRoute,
    private gService: GenericService,
    private authService: AuthenticationService) {
  }

  ngAfterViewInit(): void {
    this.listaUsuarios();

    this.authService.currentUser.subscribe((user) => {
      this.currentUser = user;
      console.log(this.currentUser)
      if (this.currentUser) {
        this.listaProductos(this.currentUser.user.id_usuario)
      }
    })
  }

  listaProductos(id_usuario: number) {
    this.getProductosDeUsuario(id_usuario)
      .subscribe((productos: any[]) => {
        this.gService.list('producto/')
          .pipe(
            map((data: any[]) => {
              return productos.length > 0
                ? data.filter(todoProducto => productos.some(producto => producto.id_producto === todoProducto.id_producto))
                : data.filter(todoProducto => todoProducto.id_usuario === id_usuario);
            })
          )
          .subscribe((filteredData: any[]) => {
            console.log(filteredData);
            this.datos = filteredData;
            this.dataSource = new MatTableDataSource(this.datos);
            this.dataSource.sort = this.sort;
            this.dataSource.paginator = this.paginator;
          });
      });
  }

  getProductosDeUsuario(id_usuario: number) {
    return this.gService.list('producto/')
      .pipe(
        takeUntil(this.destroy$),
        map((data: any[]) => data.filter(producto => producto.id_usuario === id_usuario))
      );
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

  getNombreUsuario(id: number): string {
    if (this.usuariosCargados) {
      const usuario = this.usuarios.find(u => u.id_usuario === id);
      return usuario ? usuario.nombre + " " + usuario.apellidos : '';
    } else {
      return '';
    }
  }

  detalle(id: number) {
    this.router.navigate(['/producto', id],
      {
        relativeTo: this.route
      })
  }

  actualizarProducto(id_producto: number) {
    console.log(id_producto)
    this.router.navigate(['/producto/update', id_producto], {
      relativeTo: this.route,
      // queryParams: { id_producto: id_producto }
    });
  }

  crearProducto() {
    this.router.navigate(['/producto/create'], {
      relativeTo: this.route,
    });
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

}
