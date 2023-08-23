import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalificacionUsuarioTop3Component } from './calificacion-usuario-top3.component';

describe('CalificacionUsuarioTop3Component', () => {
  let component: CalificacionUsuarioTop3Component;
  let fixture: ComponentFixture<CalificacionUsuarioTop3Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CalificacionUsuarioTop3Component]
    });
    fixture = TestBed.createComponent(CalificacionUsuarioTop3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
