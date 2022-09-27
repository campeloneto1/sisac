import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VeiculoEmprestimoComponent } from './veiculo-emprestimo.component';

describe('EmprestimoComponent', () => {
  let component: VeiculoEmprestimoComponent;
  let fixture: ComponentFixture<VeiculoEmprestimoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VeiculoEmprestimoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VeiculoEmprestimoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
