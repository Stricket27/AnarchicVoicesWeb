import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Subject, map, takeUntil } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { GenericService } from 'src/app/share/generic.service';
import { HttpClient } from '@angular/common/http';
import { CommonModule, DatePipe } from '@angular/common';

@Component({
  selector: 'app-orden-compra-vendedor-all',
  templateUrl: './orden-compra-vendedor-all.component.html',
  styleUrls: ['./orden-compra-vendedor-all.component.css']
})
export class OrdenCompraVendedorAllComponent {
  usuarios: any[];
  usuariosCargados = false;
  datos:any;
  destroy$:Subject<boolean>=new Subject<boolean>();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  dataSource= new MatTableDataSource<any>()
  displayedColumns = [ 'id_usuario','producto','cantidad','subtotal','acciones'];

  constructor(private router:Router,
  private route:ActivatedRoute,
  private gService:GenericService,private http: HttpClient,private datePipe: DatePipe) {
  }

  ngAfterViewInit(): void {
  this.listaPedidosVendedor();
  this.listaUsuarios();
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
  
  listaPedidosVendedor() {
  this.gService.list('ordencompra/')
  .pipe(
  takeUntil(this.destroy$),
  map((data: any[]) => data.filter(pedido => pedido.id_usuario == 2))
  )
  .subscribe((filteredData: any[]) => {
  console.log(filteredData);
  this.datos = filteredData;
  this.dataSource = new MatTableDataSource(this.datos);
  this.dataSource.sort = this.sort;
  this.dataSource.paginator = this.paginator;
  });
  }
  
  formatDate(date: string): string {
  return this.datePipe.transform(date, 'dd/MM/yyyy');
  }

  detalle(id:number){
  this.router.navigate(['/orden-compra-vendedor',id],
  {
  relativeTo:this.route
  })
  }

  ngOnDestroy(){
  this.destroy$.next(true);
  this.destroy$.unsubscribe();
  }
  
}
