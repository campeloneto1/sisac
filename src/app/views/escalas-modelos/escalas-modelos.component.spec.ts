import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EscalasModelosComponent } from './escalas-modelos.component';

describe('EscalasModelosComponent', () => {
  let component: EscalasModelosComponent;
  let fixture: ComponentFixture<EscalasModelosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EscalasModelosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EscalasModelosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
