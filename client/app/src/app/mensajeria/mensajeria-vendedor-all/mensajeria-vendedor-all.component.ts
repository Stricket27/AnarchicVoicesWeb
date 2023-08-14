import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MensajeriaVendedorAllDataSource, MensajeriaVendedorAllItem } from './mensajeria-vendedor-all-datasource';
import { Subject, map, takeUntil } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/share/authentication.service';
import { GenericService } from 'src/app/share/generic.service';

@Component({
  selector: 'app-mensajeria-vendedor-all',
  templateUrl: './mensajeria-vendedor-all.component.html',
  styleUrls: ['./mensajeria-vendedor-all.component.css']
})
export class MensajeriaVendedorAllComponent implements AfterViewInit {
  usuarios: any[];
  usuariosCargados = false;
  productos: any[];
  productosCargados = false;
  datos:any;
  currentUser: any;
  destroy$:Subject<boolean>=new Subject<boolean>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  
  dataSource= new MatTableDataSource<any>();
  displayedColumns = ['asunto', 'mensaje', 'producto','estado_actual', 'usuario', 'acciones'];

  constructor(private router:Router,
  private route:ActivatedRoute,
  private gService:GenericService,private authService: AuthenticationService) {
  }

  ngAfterViewInit(): void {
 
  this.listaUsuarios();
  this.listaProductos();
  this.authService.currentUser.subscribe((user) => {
    this.currentUser = user;
    console.log(this.currentUser)
    if (this.currentUser) {
      this.listaMensajeria(this.currentUser.user.id_usuario);
    }
  });
  }
  listaMensajeria(id_usuario: number) {
    this.gService.list('mensajeria/')
    .pipe(
      map((data: any[]) => data.filter(mensaje => mensaje.id_usuario === id_usuario))
    )
    .subscribe((filteredData: any[]) => {
      console.log(filteredData);
      this.datos = filteredData;
      this.dataSource = new MatTableDataSource(this.datos);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }
  // getProductosDelUsuario(id_usuario: number) {
  //   return this.gService.list('producto/')
  //     .pipe(
  //       takeUntil(this.destroy$),
  //       map((data: any[]) => data.filter(producto => producto.id_usuario === id_usuario))
  //     );
  // }

  listaUsuarios(){
  this.gService.list('user/')
  .pipe(takeUntil(this.destroy$))
  .subscribe((data: any) => {
  console.log(data);
  this.usuarios = data;
  console.log(this.usuarios)
  this.usuariosCargados = true; 
  });   
  }

  listaProductos(){
    this.gService.list('producto/')
    .pipe(takeUntil(this.destroy$))
    .subscribe((data: any) => {
    console.log(data);
    this.productos = data;
    console.log(this.productos)
    this.productosCargados = true; 
    });   
    }

  getNombreUsuario(id: number): string {
  if (this.usuariosCargados) {
  const usuario = this.usuarios.find(u => u.id_usuario === id);
  return usuario ? usuario.nombre+" "+usuario.apellidos : '';
  } else {
  return '';
  }
  }

  getNombreProducto(id: number): string {
    if (this.productosCargados) {
    const producto = this.productos.find(u => u.id_producto === id);
    return producto ? producto.nombre+" "+producto.descripcion : '';
    } else {
    return '';
    }
    }

  detalle(id:number){
  this.router.navigate(['/mensajeria',id],
  {
  relativeTo:this.route
  })
  }

  actualizarMensaje(idProducto:number,id_mensajeria: number) {
    console.log(id_mensajeria)
    this.router.navigate(['/mensajeria-vendedor/update', id_mensajeria], {
    relativeTo: this.route,
    queryParams: { id_producto: idProducto }
    });
    }


  crearMensaje() {
  this.router.navigate(['/mensajeria-cliente/create'], {
  relativeTo: this.route,
  });
  }

  ngOnDestroy(){
  this.destroy$.next(true);
  this.destroy$.unsubscribe();
  }

}
