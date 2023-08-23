import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatTable, MatTableDataSource} from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Observable, Subject, map, takeUntil } from 'rxjs';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { GenericService } from 'src/app/share/generic.service';
import { HttpClient } from '@angular/common/http';
import { CommonModule, DatePipe } from '@angular/common';
import { AuthenticationService } from 'src/app/share/authentication.service';

@Component({
  selector: 'app-orden-compra-cliente-all',
  templateUrl: './orden-compra-cliente-all.component.html',
  styleUrls: ['./orden-compra-cliente-all.component.css']
})
export class OrdenCompraClienteAllComponent {
  usuarios: any[];
  usuariosCargados = false;
  datos:any;
  currentUser: any;
  destroy$:Subject<boolean>=new Subject<boolean>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  dataSource= new MatTableDataSource<any>()

  displayedColumns = ['id_ordenCompra', 'fecha', 'id_usuario','estado_actual','acciones'];

  constructor(private router:Router,
  private route:ActivatedRoute,
  private gService:GenericService,private http: HttpClient,private datePipe: DatePipe,private authService: AuthenticationService) {
  }

  ngAfterViewInit(): void {
 
  this.listaUsuarios();
  this.authService.currentUser.subscribe((user) => {
    this.currentUser = user;
    console.log(this.currentUser)
    if (this.currentUser) {
      this.listaPedidos(this.currentUser.user.id_usuario);
    }
  });
  }

  listaPedidos(id_usuario: number) {
    this.getProductosDelUsuario(id_usuario)
    .subscribe((producto: any[]) => {
      this.gService.list('ordenCompra/')
        .pipe(
          map((data: any[]) => {
            return producto.length > 0
              ? data.filter(pedido => producto.some(pedidos => pedidos.id_producto === pedido.id_producto))
              : data.filter(pedido => pedido.id_usuario === id_usuario);
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
  getProductosDelUsuario(id_usuario: number) {
    return this.gService.list('producto/')
      .pipe(
        takeUntil(this.destroy$),
        map((data: any[]) => data.filter(producto => producto.id_usuario === id_usuario))
      );
  }
 
  formatDate(date: string): string {
  return this.datePipe.transform(date, 'dd/MM/yyyy');
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
  actualizarOrdenCompra(id_ordenCompra: number) {
    console.log(id_ordenCompra)
    this.router.navigate(['/orden-compra/update', id_ordenCompra], {
    relativeTo: this.route,
   
    });
    }

  detalle(id:number){
  this.router.navigate(['/orden-compra-cliente',id],
  {
  relativeTo:this.route
  })
  }

  ngOnDestroy(){
  this.destroy$.next(true);
  this.destroy$.unsubscribe();
  }
  
}
