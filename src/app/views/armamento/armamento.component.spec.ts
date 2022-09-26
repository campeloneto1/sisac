import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArmamentoComponent } from './armamento.component';

describe('ArmamentoComponent', () => {
  let component: ArmamentoComponent;
  let fixture: ComponentFixture<ArmamentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArmamentoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArmamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
