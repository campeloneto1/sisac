import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VeiculosEmprestimosComponent } from './veiculos-emprestimos.component';

describe('EmprestimosComponent', () => {
  let component: VeiculosEmprestimosComponent;
  let fixture: ComponentFixture<VeiculosEmprestimosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VeiculosEmprestimosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VeiculosEmprestimosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
