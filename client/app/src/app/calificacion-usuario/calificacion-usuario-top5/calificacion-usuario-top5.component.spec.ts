import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalificacionUsuarioTop5Component } from './calificacion-usuario-top5.component';

describe('CalificacionUsuarioTop5Component', () => {
  let component: CalificacionUsuarioTop5Component;
  let fixture: ComponentFixture<CalificacionUsuarioTop5Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CalificacionUsuarioTop5Component]
    });
    fixture = TestBed.createComponent(CalificacionUsuarioTop5Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
