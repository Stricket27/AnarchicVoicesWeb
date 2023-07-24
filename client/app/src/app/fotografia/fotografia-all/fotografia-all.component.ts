import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Subject, takeUntil } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { GenericService } from 'src/app/share/generic.service';

@Component({
  selector: 'app-fotografia-all',
  templateUrl: './fotografia-all.component.html',
  styleUrls: ['./fotografia-all.component.css']
})
export class FotografiaAllComponent {
  productos: any[];
  productosCargados = false;
  datos:any;
  destroy$:Subject<boolean>=new Subject<boolean>();
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  dataSource= new MatTableDataSource<any>();
  displayedColumns = ['fotografia', 'id_producto', 'estado_actual', 'acciones'];

  constructor(private router:Router,
    private route:ActivatedRoute,
    private gService:GenericService) {
  }

  ngAfterViewInit(): void {
   this.listaFotografias();
   
  }
  listaFotografias(){
    this.gService.list('fotografia/')
      .pipe(takeUntil(this.destroy$))
      .subscribe((data:any)=>{
        console.log(data);
        this.datos=data;
        this.dataSource = new MatTableDataSource(this.datos);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;        
      });   
  }

  getNombreProducto(id: number): string {
    if (this.productosCargados) {
    const producto = this.productos.find(p => p.id_producto === id);
    return producto ? producto.nombre : '';
    } else {
    return '';
    }
    }
    
  detalle(id:number){
    this.router.navigate(['/fotografia',id],
    {
      relativeTo:this.route
    })
  }
  
  actualizarFotografia(id: number) {
    this.router.navigate(['/fotografia/update', id], {
      relativeTo: this.route,
    });
  }

  crearFotografia() {
    this.router.navigate(['/fotografia/create'], {
      relativeTo: this.route,
    });
  }

  ngOnDestroy(){
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
