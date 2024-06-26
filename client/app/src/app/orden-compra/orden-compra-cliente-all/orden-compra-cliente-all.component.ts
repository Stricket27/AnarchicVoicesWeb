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
  vendedor = false;
  datos:any;
  filtrarDato: any;
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

    if (this.currentUser && this.currentUser.user.detalle_usuarioTipo) {
      //SI TIENE 2 TIPOS DE USUARIOS
       if (this.currentUser.user.detalle_usuarioTipo.length === 2) {
         //CLIENTE Y VENDEDOR
         if (
           this.currentUser.user.detalle_usuarioTipo[0].id_tipoUsuario === 2 &&
           this.currentUser.user.detalle_usuarioTipo[1].id_tipoUsuario === 3
         ) {
          
           this.vendedor = true;
         } else {
          
           this.vendedor = false;
         }
       } 
         // SI TIENE 1 TIPO DE USUARIO
       else if (this.currentUser.user.detalle_usuarioTipo.length === 1) {
         // VENDEDOR
         if (this.currentUser.user.detalle_usuarioTipo[0].id_tipoUsuario === 2) {
           this.vendedor = true;
          
           
         } 
         //ADMINISTRADOR
         else if (this.currentUser.user.detalle_usuarioTipo[0].id_tipoUsuario === 1) {
           
           this.vendedor = false;
          
         }
         //CLIENTE
         else {
           this.vendedor = false;
          
         }
       } else {
         // No cumple ningún caso, reiniciar los valores
         this.vendedor = false;
        
       }
     } else {
       // Usuario no autenticado, reiniciar los valores
       this.vendedor = false;
      
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
          this.filtrarDato=this.datos
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
  filtrarDatoPorEstado(ordenarPor: number){
    if(!ordenarPor || ordenarPor == 0 ){
      this.filtrarDato = this.datos.slice();
    }

    if(ordenarPor == 1){
      this.filtrarDato.sort((a, b,c) => b.estado_actual - a.estado_actual);
    }

    if(ordenarPor == 2){
      this.filtrarDato.sort((a, b,c) => a.estado_actual - b.estado_actual);
    }
    if(ordenarPor == 3){
      this.filtrarDato.sort((a, b,c) => a.estado_actual - b.estado_actual);
    }
  }

  ngOnDestroy(){
  this.destroy$.next(true);
  this.destroy$.unsubscribe();
  }
  
}
