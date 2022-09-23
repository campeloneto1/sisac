import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArmamentosTiposComponent } from './armamentos-tipos.component';

describe('ArmamentosTiposComponent', () => {
  let component: ArmamentosTiposComponent;
  let fixture: ComponentFixture<ArmamentosTiposComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArmamentosTiposComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArmamentosTiposComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
