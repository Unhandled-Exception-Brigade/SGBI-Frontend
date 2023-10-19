import { TestBed } from '@angular/core/testing';

import { RegistrarTarifaService } from './registrar-tarifa.service';

describe('RegistrarTarifaService', () => {
  let service: RegistrarTarifaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegistrarTarifaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
