import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Subject, map, takeUntil } from 'rxjs';
import { GenericService } from 'src/app/share/generic.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-producto-diag',
  templateUrl: './producto-diag.component.html',
  styleUrls: ['./producto-diag.component.css']
})

export class ProductoDiagComponent implements OnInit {
  datos: any;
  datosDialog: any;
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    @Inject(MAT_DIALOG_DATA) data, private router: Router,
    private route: ActivatedRoute,
    private dialogRef: MatDialogRef<ProductoDiagComponent>,
    private gService: GenericService, public dialog: MatDialog
  ) {
    this.datosDialog = data;
  }

  ngOnInit(): void {
    if (this.datosDialog.id_producto) {
      this.obtenerProducto(this.datosDialog.id_producto);
    }
  }

  obtenerProducto(id: any) {
    this.gService
      .get('producto', id)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        this.datos = data;
        console.log(data);
      });
  }

  crearMensaje() {
    this.router.navigate(['/mensajeria-cliente/create'], {
      relativeTo: this.route,
      queryParams: { id_producto: this.datosDialog.id_producto }
    });
    this.close();
  }

  crearFotografia() {
    this.router.navigate(['/fotografia/create'], {
      relativeTo: this.route,
      queryParams: { id_producto: this.datosDialog.id_producto }
    });
    this.close();
  }

  // editarFotografia(){
  // this.router.navigate(['/fotografia/'], {
  // relativeTo: this.route,
  // queryParams: { id_producto: this.datosDialog.id_producto }
  // });
  // this.close();
  // }

  close() {
    this.dialogRef.close();
  }

}
