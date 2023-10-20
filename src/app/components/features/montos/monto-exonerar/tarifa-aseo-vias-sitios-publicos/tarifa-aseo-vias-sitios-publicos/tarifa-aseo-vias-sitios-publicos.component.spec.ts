import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TarifaAseoViasSitiosPublicosComponent } from './tarifa-aseo-vias-sitios-publicos.component';

describe('TarifaAseoViasSitiosPublicosComponent', () => {
  let component: TarifaAseoViasSitiosPublicosComponent;
  let fixture: ComponentFixture<TarifaAseoViasSitiosPublicosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TarifaAseoViasSitiosPublicosComponent]
    });
    fixture = TestBed.createComponent(TarifaAseoViasSitiosPublicosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
