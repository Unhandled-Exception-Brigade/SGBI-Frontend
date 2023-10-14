import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TarifaMantenimientoParquesObrasOrnatoComponent } from './tarifa-mantenimiento-parques-obras-ornato.component';

describe('TarifaMantenimientoParquesObrasOrnatoComponent', () => {
  let component: TarifaMantenimientoParquesObrasOrnatoComponent;
  let fixture: ComponentFixture<TarifaMantenimientoParquesObrasOrnatoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TarifaMantenimientoParquesObrasOrnatoComponent]
    });
    fixture = TestBed.createComponent(TarifaMantenimientoParquesObrasOrnatoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
