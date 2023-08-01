import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { GenericService } from 'src/app/share/generic.service';

@Component({
  selector: 'app-mensajeria-detail',
  templateUrl: './mensajeria-detail.component.html',
  styleUrls: ['./mensajeria-detail.component.css']
})
export class MensajeriaDetailComponent {
  datos:any;
  destroy$:Subject<boolean>=new Subject<boolean>();

  constructor( private gService: GenericService,
  private route:ActivatedRoute
  ){
  let id=this.route.snapshot.paramMap.get('id');
  if(!isNaN(Number(id))){
  this.obtenerMensaje(Number(id));
  }
  }

  obtenerMensaje(id:any){
  this.gService
  .get('mensajeria',id)
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
