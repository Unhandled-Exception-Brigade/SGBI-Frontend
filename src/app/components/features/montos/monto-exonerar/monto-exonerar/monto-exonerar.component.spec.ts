import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MontoExonerarComponent } from './monto-exonerar.component';

describe('MontoExonerarComponent', () => {
  let component: MontoExonerarComponent;
  let fixture: ComponentFixture<MontoExonerarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MontoExonerarComponent]
    });
    fixture = TestBed.createComponent(MontoExonerarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
