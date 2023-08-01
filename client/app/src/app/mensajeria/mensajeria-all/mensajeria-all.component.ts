import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MensajeriaAllDataSource, MensajeriaAllItem } from './mensajeria-all-datasource';
import { Subject, map, takeUntil } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { GenericService } from 'src/app/share/generic.service';

@Component({
  selector: 'app-mensajeria-all',
  templateUrl: './mensajeria-all.component.html',
  styleUrls: ['./mensajeria-all.component.css']
})
export class MensajeriaAllComponent implements AfterViewInit {
  usuarios: any[];
  usuariosCargados = false;
  productos: any[];
  productosCargados = false;
  datos:any;
  destroy$:Subject<boolean>=new Subject<boolean>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  
  dataSource= new MatTableDataSource<any>();
  displayedColumns = ['asunto', 'mensaje', 'producto','estado_actual', 'usuario', 'acciones'];

  constructor(private router:Router,
  private route:ActivatedRoute,
  private gService:GenericService) {
  }

  ngAfterViewInit(): void {
  this.listaMensajeria();
  this.listaUsuarios();
  this.listaProductos();
  }
  
  listaMensajeria(){
    this.gService.list('mensajeria/')
    .pipe(takeUntil(this.destroy$), map((data: any[]) => data.filter(mensaje => mensaje.id_usuario == 2)))
    .subscribe((data:any)=>{
    console.log(data);
    this.datos=data;
    this.dataSource = new MatTableDataSource(this.datos);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;        
    });   
    }
  

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

  actualizarMensaje(id: number,idProducto:number) {
    this.router.navigate(['/mensajeria-cliente/update', id], {
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
