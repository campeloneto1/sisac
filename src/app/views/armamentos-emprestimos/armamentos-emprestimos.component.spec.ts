import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArmamentosEmprestimosComponent } from './armamentos-emprestimos.component';

describe('ArmamentosEmprestimosComponent', () => {
  let component: ArmamentosEmprestimosComponent;
  let fixture: ComponentFixture<ArmamentosEmprestimosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArmamentosEmprestimosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArmamentosEmprestimosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
