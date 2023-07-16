import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { GenericService } from 'src/app/share/generic.service';
import { CommonModule, DatePipe } from '@angular/common';

@Component({
  selector: 'app-orden-compra-vendedor-detail',
  templateUrl: './orden-compra-vendedor-detail.component.html',
  styleUrls: ['./orden-compra-vendedor-detail.component.css']
})
export class OrdenCompraVendedorDetailComponent {
  usuarios: any[];
  usuariosCargados = false;
  datos:any;

  destroy$:Subject<boolean>=new Subject<boolean>()
  
  constructor(private gService:GenericService,
  private route: ActivatedRoute,private datePipe: DatePipe){
  let id=this.route.snapshot.paramMap.get('id');
  if(!isNaN(Number(id))){
  this.obtenerOrdenCompra(Number(id));
  }
  }

  ngAfterViewInit(): void {
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
 
  formatDate(date: string): string {
  return this.datePipe.transform(date, 'dd/MM/yyyy');
  }
  
  getNombreUsuario(id: number): string {
  if (this.usuariosCargados) {
  const usuario = this.usuarios.find(u => u.id_usuario === id);
  return usuario ? usuario.nombre+" "+usuario.apellidos : '';
  } else {
  return '';
  }
  }

  obtenerOrdenCompra(id:any){
  this.gService
  .get('ordencomprav',id)
  .pipe(takeUntil(this.destroy$))
  .subscribe((data:any)=>{
  console.log(data);
  this.datos=data; 
  });
  }

   ngOnDestroy() {
     this.destroy$.next(true);
     this.destroy$.unsubscribe();
   } 
   
}
