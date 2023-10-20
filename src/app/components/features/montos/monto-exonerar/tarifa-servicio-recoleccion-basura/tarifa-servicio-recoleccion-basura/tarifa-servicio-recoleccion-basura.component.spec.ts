import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TarifaServicioRecoleccionBasuraComponent } from './tarifa-servicio-recoleccion-basura.component';

describe('TarifaServicioRecoleccionBasuraComponent', () => {
  let component: TarifaServicioRecoleccionBasuraComponent;
  let fixture: ComponentFixture<TarifaServicioRecoleccionBasuraComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TarifaServicioRecoleccionBasuraComponent]
    });
    fixture = TestBed.createComponent(TarifaServicioRecoleccionBasuraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
