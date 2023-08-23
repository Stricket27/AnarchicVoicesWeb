import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Subject, takeUntil } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { GenericService } from 'src/app/share/generic.service';

@Component({
  selector: 'app-user-all',
  templateUrl: './user-all.component.html',
  styleUrls: ['./user-all.component.css']
})
export class UserAllComponent {
  usuarios: any[];
  tipoUsuarioCargado: false;
  datos: any;
  destroy$: Subject<boolean> = new Subject<boolean>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  dataSource = new MatTableDataSource<any>();
  displayedColumns = ['NombreCompleto', 'NumeroTelefono', 'CorreoElectronico', 'EstadoActual', 'acciones'];

  constructor(private router: Router,
    private route: ActivatedRoute,
    private gService: GenericService) {
  }

  ngAfterViewInit(): void {
    this.listaUsuarios();
  }

  listaUsuarios() {
    this.gService.list('user/')
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        console.log(data);
        this.datos = data;
        this.dataSource = new MatTableDataSource(this.datos);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      });
  }

  detalle(id: number) {
    this.router.navigate(['/user', id],
      {
        relativeTo: this.route
      })
  }

  crearUsuario() {
    this.router.navigate(['/user/create'], {
      relativeTo: this.route,
    });
  }

  actualizarUsuario(id_usuario: number) {
    this.router.navigate(['/user/update', id_usuario], {
      relativeTo: this.route,
    });
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }














}
