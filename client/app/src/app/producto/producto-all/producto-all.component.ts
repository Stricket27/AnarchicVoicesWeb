import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

import { Subject, map, takeUntil } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { GenericService } from 'src/app/share/generic.service';

@Component({
  selector: 'app-producto-all',
  templateUrl: './producto-all.component.html',
  styleUrls: ['./producto-all.component.css']
})
export class ProductoAllComponent {
  usuarios: any[];
  usuariosCargados = false;
  datos:any;
  destroy$:Subject<boolean>=new Subject<boolean>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  
  dataSource= new MatTableDataSource<any>();
  displayedColumns = ['producto', 'precio', 'cantidad', 'id_usuario', 'acciones'];

  constructor(private router:Router,
  private route:ActivatedRoute,
  private gService:GenericService) {
  }

  ngAfterViewInit(): void {
  this.listaProductos();
  this.listaUsuarios();
  }
  listaProductos(){
  this.gService.list('producto/')
  .pipe(takeUntil(this.destroy$), map((data: any[]) => data.filter(producto => producto.id_usuario == 2)))
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

  getNombreUsuario(id: number): string {
  if (this.usuariosCargados) {
  const usuario = this.usuarios.find(u => u.id_usuario === id);
  return usuario ? usuario.nombre+" "+usuario.apellidos : '';
  } else {
  return '';
  }
  }

  detalle(id:number){
  this.router.navigate(['/producto',id],
  {
  relativeTo:this.route
  })
  }

  actualizarProducto(id: number) {
  this.router.navigate(['/producto/update', id], {
  relativeTo: this.route,
  });
  }

  crearProducto() {
  this.router.navigate(['/producto/create'], {
  relativeTo: this.route,
  });
  }

  ngOnDestroy(){
  this.destroy$.next(true);
  this.destroy$.unsubscribe();
  }

}
