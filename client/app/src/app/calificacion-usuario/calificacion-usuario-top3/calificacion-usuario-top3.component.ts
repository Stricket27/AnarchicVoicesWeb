import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, take, takeUntil } from 'rxjs';
import { GenericService } from 'src/app/share/generic.service';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-calificacion-usuario-top3',
  templateUrl: './calificacion-usuario-top3.component.html',
  styleUrls: ['./calificacion-usuario-top3.component.css']
})
export class CalificacionUsuarioTop3Component implements OnInit{
  datos: any[] = [];
  destroy$: Subject<boolean> = new Subject<boolean>();
  constructor(private gService: GenericService) { }

  ngOnInit(): void {
    this.gService
      .list('calificacionUsuario/vUsuarioTop3')
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        this.datos = data;
      });
    
  }

  openPDF() {
    let DATA: any = document.getElementById('htmlData');
    html2canvas(DATA).then((canvas) => {
      //Configuración del ancho y alto del Canvas de la imagen
      let fileWidth = 208;
      let fileHeight = (canvas.height * fileWidth) / canvas.width;
      //devuelve un data URI,el cual contiene una representación
      // de la imagen en el formato especificado por el parámetro type
      const FILEURI = canvas.toDataURL('image/png');
      //Orientación, unidad, formato
      let PDF = new jsPDF('p', 'mm', 'a4');
      let position = 0;
      //Agregar imagen al PDF
      PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight);
      PDF.save('reporte.pdf');
    });
  }








}
