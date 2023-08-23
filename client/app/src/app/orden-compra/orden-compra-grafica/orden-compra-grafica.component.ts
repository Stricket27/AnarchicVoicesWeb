import { AfterViewInit, Component, ViewChild } from '@angular/core';
import Chart from 'chart.js/auto';
import { Subject, takeUntil } from 'rxjs';
import { GenericService } from 'src/app/share/generic.service';

@Component({
  selector: 'app-orden-compra-grafica',
  templateUrl: './orden-compra-grafica.component.html',
  styleUrls: ['./orden-compra-grafica.component.css']
})
export class OrdenCompraGraficaComponent implements AfterViewInit {
  canvas: any;
  ctx: any;
  @ViewChild('graficoCanvas') graficoCanvas!: { nativeElement: any };
  grafico: any;
  datos: any;
  mesList: any;
  filtro= new Date().getMonth();
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private gService: GenericService
  ) {
    this.listaMeses();
  }
  listaMeses() {
    this.mesList = [
      { Value: 1, Text: 'Enero' },
      { Value: 2, Text: 'Febrero' },
      { Value: 3, Text: 'Marzo' },
      { Value: 4, Text: 'Abril' },
      { Value: 5, Text: 'Mayo' },
      { Value: 6, Text: 'Junio' },
      { Value: 7, Text: 'Julio' },
      { Value: 8, Text: 'Agosto' },
      { Value: 9, Text: 'Septiembre' },
      { Value: 10, Text: 'Octubre' },
      { Value: 11, Text: 'Noviembre' },
      { Value: 12, Text: 'Diciembre' }
    ]
  }

  ngAfterViewInit(): void {
    this.inicioGrafico(this.filtro);
  }

  inicioGrafico(newValue:any){
    this.filtro = newValue;
    if(this.filtro){
      this.gService
      .get('ordenCompra/vProducto', this.filtro)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data:any) => {
        this.datos = data;
        this.graficoBrowser();
      })
    }
  }

  graficoBrowser(): void {
    this.canvas=this.graficoCanvas.nativeElement;
    this.ctx = this.canvas.getContext('2d');
    //Si existe destruir el Canvas para mostrar el grafico
    if(this.grafico){
     this.grafico.destroy();
    }
    this.grafico= new Chart(this.ctx,{
     type:'pie',
     data:{
       //Etiquetas debe ser un array
       labels: this.datos.map(x => x.nombre),
       datasets:[
         {
           backgroundColor: [
             'rgba(255, 99, 132, 0.2)',
             'rgba(255, 159, 64, 0.2)',
             'rgba(255, 205, 86, 0.2)',
             'rgba(75, 192, 192, 0.2)',
             'rgba(54, 162, 235, 0.2)',
             'rgba(153, 102, 255, 0.2)',
             'rgba(201, 203, 207, 0.2)'
         ],
         //Datos del grafico, debe ser un array
         data: this.datos.map(x => x.suma)
         },
       ]
     },
         options:{
           responsive:false,
           maintainAspectRatio: false,
         },
       
    });
   }


   ngOnDestroy() {
    this.destroy$.next(true);
    // Desinscribirse
    this.destroy$.unsubscribe();
  }


}
